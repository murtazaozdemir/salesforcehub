// Progressive enhancement only: the page works without this file.
(function () {
  // Lets CSS run the one entrance animation only when JS is present,
  // so no-JS visitors never see rows stuck at opacity 0.
  document.documentElement.classList.add("js");

  var form = document.querySelector(".signup-form");
  if (!form) return;

  // Links like /?about=xhibit#contact arrive with that app already chosen.
  var about = new URLSearchParams(location.search).get("about");
  if (about && form.elements.app.querySelector('option[value="' + about.replace(/[^a-z-]/g, "") + '"]')) {
    form.elements.app.value = about;
  }
  var status = form.querySelector(".form-status");
  var button = form.querySelector("button[type=submit]");

  function show(message, kind) {
    status.textContent = message;
    status.classList.toggle("is-error", kind === "error");
    status.classList.toggle("is-ok", kind === "ok");
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var email = form.elements.email;
    if (!email.value.trim() || !email.checkValidity()) {
      show("Enter an email address like name@example.com.", "error");
      email.focus();
      return;
    }
    button.disabled = true;
    show("Sending…");
    fetch(form.action, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new FormData(form),
    })
      .then(function (res) {
        return res.json().catch(function () { return {}; }).then(function (body) {
          if (!res.ok) throw new Error(body.error || "The message wasn't sent (error " + res.status + "). Try again in a minute.");
        });
      })
      .then(function () {
        form.reset();
        show("Message sent. We'll reply by email.", "ok");
      })
      .catch(function (err) {
        show(err.message || "The message wasn't sent. Check your connection and try again.", "error");
      })
      .finally(function () {
        button.disabled = false;
      });
  });
})();
