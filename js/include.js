document.addEventListener("DOMContentLoaded", () => {
  const isEnglish = window.location.pathname.startsWith("/en/");
  const headerPath = isEnglish
    ? "../static/en/header.html"
    : "static/header.html";
  const footerPath = isEnglish
    ? "../static/en/footer.html"
    : "static/footer.html";

  function loadPartial(path, containerId) {
    fetch(path)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load ${path}: ${response.statusText}`);
        }
        return response.text();
      })
      .then((html) => {
        document.getElementById(containerId).innerHTML = html;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  loadPartial(headerPath, "header");
  loadPartial(footerPath, "footer");
});
