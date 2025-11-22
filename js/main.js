// main.js - Slider, Nav Toggle, Password Toggle, Login Check, Load Materials

document.addEventListener('DOMContentLoaded', () => {

  /* -------------------- SLIDER -------------------- */
  const slides = document.querySelectorAll('.slide');
  let idx = 0;

  const show = i => {
    slides.forEach(s => s.classList.remove('active'));
    slides[i].classList.add('active');
  };

  document.getElementById('prev')?.addEventListener('click', () => {
    idx = (idx - 1 + slides.length) % slides.length;
    show(idx);
  });

  document.getElementById('next')?.addEventListener('click', () => {
    idx = (idx + 1) % slides.length;
    show(idx);
  });

  setInterval(() => {
    idx = (idx + 1) % slides.length;
    show(idx);
  }, 6000);


  /* -------------------- NAV TOGGLE (HAM menu) -------------------- */
  const menuBtn = document.getElementById("navToggle");
  const menu = document.querySelector(".nav-links");

  if (menuBtn && menu) {
    menuBtn.addEventListener("click", () => {
      menu.classList.toggle("open");
    });
  }


  /* -------------------- SHOW/HIDE PASSWORD -------------------- */
  const passInput = document.getElementById('password');
  const toggleBtn = document.getElementById('toggle-pass');

  if (passInput && toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const isText = passInput.type === "text";
      passInput.type = isText ? "password" : "text";
      toggleBtn.innerText = isText ? "Show" : "Hide";
    });
  }


  /* -------------------- ADMIN LOGIN (HASHED PASSWORD) -------------------- */
  const loginForm = document.getElementById('admin-login');

  // SHA-256 hashed version of password: "GTU@2025"
  const ADMIN_PASS_HASH = "279fa3ad77cdad5f6a97d209b917c586ec1a0c327b71fc59f870ce1e6126ef77";

  async function sha256(text) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hash = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hash))
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");
  }

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const user = document.getElementById("username").value.trim();
      const pass = document.getElementById("password").value.trim();

      const hash = await sha256(pass);

      if (user === "admin" && hash === ADMIN_PASS_HASH) {
        window.location.href = "admin.html";
      } else {
        alert("Invalid username or password!");
      }
    });
  }


  /* -------------------- LOAD MATERIALS -------------------- */
  if (!window.loadMaterials) {
    window.loadMaterials = function (type = null, targetId = null) {
      fetch('/materials.json')
        .then(r => r.json())
        .then(data => {
          const target = targetId
            ? document.getElementById(targetId)
            : document.getElementById('materials-list');

          if (!target) return;

          target.innerHTML = '';

          Object.keys(data).forEach(code => {
            const item = data[code];
            const mats = item.materials || [];
            const filtered = type ? mats.filter(m => m.type === type) : mats;

            if (filtered.length === 0) return;

            const section = document.createElement('div');
            section.className = 'card';

            section.innerHTML =
              `<h3>${item.title} (${code})</h3>` +
              filtered.map(m =>
                `<div class="mat">
                  <div>
                    <strong>${m.name}</strong>
                    <div class="muted">${m.type}</div>
                  </div>
                  <div>
                    <a href="${m.link}" target="_blank" class="btn">Open</a>
                  </div>
                </div>`
              ).join('');

            target.appendChild(section);
          });
        })
        .catch(() => console.warn("materials.json not found or invalid."));
    };
  }

  if (document.getElementById('materials-list')) loadMaterials();
});
// ===== MOBILE NAV MENU TOGGLE =====
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}