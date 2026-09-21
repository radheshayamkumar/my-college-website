/* ==========================================================================
   GHRCEM Jalgaon — Shared behaviour
   Kept in plain, commented JS on purpose: this file doubles as teaching
   material for the Coder's Club session.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
  initNavToggle();
  setFooterYear();
  initForms();
});

/* --------------------------------------------------------------------
   1. Mobile nav toggle
   -------------------------------------------------------------------- */
function initNavToggle() {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", function () {
    var isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  // Close the menu when a link is tapped (useful on mobile).
  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* --------------------------------------------------------------------
   2. Footer year — avoids hard-coding a year that goes stale
   -------------------------------------------------------------------- */
function setFooterYear() {
  var el = document.querySelector("[data-year]");
  if (el) el.textContent = new Date().getFullYear();
}

/* --------------------------------------------------------------------
   3. Form handling (Admissions enquiry + Contact form)
   Both forms are front-end only for this demo: there is no backend, so
   submission is simulated. Swap `fakeSubmit` for a real fetch() call to
   your own API or form-handling service (see README) when you deploy
   this for real use.
   -------------------------------------------------------------------- */
function initForms() {
  document.querySelectorAll("form[data-validate]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var isValid = validateForm(form);
      var status = form.querySelector(".form-status");

      if (!isValid) {
        if (status) {
          status.textContent = "Please fix the highlighted fields and try again.";
          status.className = "form-status show";
        }
        return;
      }

      fakeSubmit(form).then(function () {
        if (status) {
          status.textContent =
            "Thanks! Your message has been recorded. (Demo only — connect a backend to send this for real.)";
          status.className = "form-status show success";
        }
        form.reset();
      });
    });
  });
}

function validateForm(form) {
  var valid = true;
  form.querySelectorAll("[required]").forEach(function (field) {
    var wrapper = field.closest(".field");
    var value = field.value.trim();
    var fieldValid = value.length > 0;

    if (field.type === "email" && fieldValid) {
      fieldValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }
    if (field.type === "tel" && fieldValid) {
      fieldValid = /^[0-9+\-\s]{7,15}$/.test(value);
    }

    if (wrapper) wrapper.classList.toggle("has-error", !fieldValid);
    if (!fieldValid) valid = false;
  });
  return valid;
}

function fakeSubmit() {
  // Simulates network latency so the loading/success state is visible.
  return new Promise(function (resolve) {
    setTimeout(resolve, 400);
  });
}
