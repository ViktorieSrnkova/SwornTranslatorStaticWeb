document.addEventListener("DOMContentLoaded", () => {
  const isEnglish = window.location.pathname.startsWith("/en/");
  const headerPath = isEnglish
    ? "../static/en/header.html"
    : "static/header.html";
  const footerPath = isEnglish
    ? "../static/en/footer.html"
    : "static/footer.html";
  const formPath = isEnglish ? "../static/en/form.html" : "static/form.html";

  function loadPartial(path, containerId, callback) {
    fetch(path)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load ${path}: ${response.statusText}`);
        }
        return response.text();
      })
      .then((html) => {
        document.getElementById(containerId).innerHTML = html;
        if (callback) callback();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  loadPartial(headerPath, "header", () => {
    const currentPath = window.location.pathname;
    const headerNavLinks = document.querySelectorAll(
      "header .header-nav ul li a"
    );
    headerNavLinks.forEach((link) => {
      if (link.getAttribute("href") === currentPath) {
        link.classList.add("active");
      }
    });
  });

  loadPartial(footerPath, "footer", () => {
    const currentPath = window.location.pathname;
    const footerNavLinks = document.querySelectorAll(
      "footer .footer-nav ul li a"
    );
    footerNavLinks.forEach((link) => {
      if (link.getAttribute("href") === currentPath) {
        link.classList.add("active");
      }
    });
  });
  if (document.getElementById("form")) {
    loadPartial(formPath, "form", () => {
      emailjs.init("9-8UDT4yOARdsOl42");

      const form = document.getElementById("contact-form");
      const loader = document.getElementById("loader");
      if (!form) return;

      form.addEventListener("submit", function (e) {
        e.preventDefault();

        if (loader) loader.style.display = "grid";

        // Honeypot kontrola
        const honeypot = document.getElementById("website").value;
        if (honeypot) {
          console.log("Spam detekován - formulář nebyl odeslán.");
          return;
        }

        emailjs.sendForm("service_n05yo4s", "template_r6rw30q", this).then(
          function () {
            if (loader) loader.style.display = "none";
            alert("Zpráva úspěšně odeslána!");
            form.reset();
          },
          function (error) {
            console.error("Chyba při odesílání:", error);
            alert("Něco se pokazilo, zkuste to prosím později.");
          }
        );
      });
    });
  }
});
