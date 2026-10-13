/* Hero interaktif bertema kamera:
   - parallax halus (nama, lingkaran, foto, chip bergerak beda kecepatan)
   - kotak fokus (AF) mengikuti kursor dan mengunci ke wajah saat melewati foto
   - klik/tap = efek shutter
   - timecode REC berjalan selama hero terlihat
   Semua dimatikan otomatis jika perangkat memilih "kurangi gerakan". */
(function () {
  "use strict";

  var hero = document.getElementById("hero");
  if (!hero) return;
  var solo = document.getElementById("solo");
  var focus = document.getElementById("focus");
  var label = document.getElementById("focusLabel");
  var flash = document.getElementById("flash");
  var tc = document.getElementById("tc");

  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;

  // Posisi wajah relatif terhadap foto (hasil ukur dari gambar)
  var FACE = { x: 0.455, y: 0.097, w: 0.46, h: 0.19 };

  var tx = 0, ty = 0, cx = 0, cy = 0;          // parallax: target & nilai halus (-0.5..0.5)
  var px = 0, py = 0, fx = 0, fy = 0;          // posisi pointer & posisi kotak fokus (px relatif hero)
  var fw = 76, fh = 76, locked = false;
  var inside = false, visible = true, running = false, hideTimer = 0;
  var t0 = performance.now(), lastTc = 0;

  function pad(n, l) { n = String(n); while (n.length < l) n = "0" + n; return n; }

  function timecode(ms) {
    var total = ms / 1000;
    var h = Math.floor(total / 3600), m = Math.floor(total / 60) % 60, s = Math.floor(total) % 60;
    var f = Math.floor((total % 1) * 24);
    return pad(h, 2) + ":" + pad(m, 2) + ":" + pad(s, 2) + ":" + pad(f, 2);
  }

  function updateFocusTarget() {
    var hr = hero.getBoundingClientRect();
    var sr = solo.getBoundingClientRect();
    var gx = hr.left + px, gy = hr.top + py;   // pointer dalam koordinat layar
    var over = gx > sr.left && gx < sr.right && gy > sr.top && gy < sr.bottom;
    if (over) {
      locked = true;
      fx = sr.left + sr.width * FACE.x - hr.left;
      fy = sr.top + sr.height * FACE.y - hr.top;
      fw = Math.max(70, sr.width * FACE.w);
      fh = Math.max(80, sr.height * FACE.h);
    } else {
      locked = false;
      fx = px; fy = py; fw = 76; fh = 76;
    }
  }

  var fxc = 0, fyc = 0;                         // posisi kotak fokus yang sudah dihaluskan
  function frame(now) {
    if (!visible) { running = false; return; }
    cx += (tx - cx) * 0.08;
    cy += (ty - cy) * 0.08;
    hero.style.setProperty("--mx", cx.toFixed(4));
    hero.style.setProperty("--my", cy.toFixed(4));

    if (inside) {
      updateFocusTarget();
      fxc += (fx - fxc) * 0.2;
      fyc += (fy - fyc) * 0.2;
      focus.style.transform = "translate3d(" + fxc.toFixed(1) + "px," + fyc.toFixed(1) + "px,0)";
      focus.style.width = fw + "px";
      focus.style.height = fh + "px";
      focus.style.marginLeft = -fw / 2 + "px";
      focus.style.marginTop = -fh / 2 + "px";
      label.textContent = locked ? "Fokus terkunci" : "AF";
    }

    if (now - lastTc > 41) { lastTc = now; tc.textContent = timecode(now - t0); }
    requestAnimationFrame(frame);
  }

  function start() { if (!running && visible) { running = true; requestAnimationFrame(frame); } }

  hero.addEventListener("pointermove", function (e) {
    var r = hero.getBoundingClientRect();
    px = e.clientX - r.left; py = e.clientY - r.top;
    tx = px / r.width - 0.5;
    ty = py / r.height - 0.5;
    if (!inside) { fxc = px; fyc = py; }
    inside = true;
    focus.classList.add("on");
    clearTimeout(hideTimer);
    if (e.pointerType !== "mouse") hideTimer = setTimeout(function () { focus.classList.remove("on"); inside = false; }, 1100);
    start();
  });

  hero.addEventListener("pointerleave", function (e) {
    if (e.pointerType !== "mouse") return;
    inside = false; tx = 0; ty = 0;
    focus.classList.remove("on");
  });

  hero.addEventListener("click", function (e) {
    if (e.target.closest("a,button")) return;
    flash.classList.remove("go");
    void flash.offsetWidth;                    // restart animasi
    flash.classList.add("go");
  });

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (en) {
      visible = en[0].isIntersecting;
      if (visible) start();
    }, { threshold: 0.05 }).observe(hero);
  }

  start();
})();
