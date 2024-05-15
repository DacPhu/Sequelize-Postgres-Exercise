document.addEventListener("DOMContentLoaded", function () {
  const nextPageBtn = document.getElementById("nextPage");
  const prevPageBtn = document.getElementById("prevPage");

  let currentPage = 1;
  const numPages = parseInt("{{num_pages}}");

  nextPageBtn.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default behavior of the link
    if (currentPage <= numPages) {
      currentPage++;
      document.querySelector(".blog__pagination a:nth-child(2)").textContent =
        currentPage;
    }

    var url = window.location.href;
    if (url.includes("#")) {
      url = url.replace("#", "");
      window.history.replaceState({}, document.title, url);
    }

    if (url.includes("page=")) {
      url.replace(/(page=)[^&]+/, "page=" + currentPage);
    } else {
      if (
        url.includes("category") ||
        url.includes("tag") ||
        url.includes("keyword")
      )
        url += "&page=" + currentPage;
      else {
        url += "?page=" + currentPage;
      }
    }
    window.location.href = url;
  });

  prevPageBtn.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default behavior of the link
    if (currentPage >= 1) {
      currentPage--;
      document.querySelector(".blog__pagination a:nth-child(2)").textContent =
        currentPage;
    }

    var url = window.location.href;

    if (url.includes("#")) {
      url = url.replace("#", "");
      window.history.replaceState({}, document.title, url);
    }

    if (url.includes("page=")) {
      url.replace(/(page=)[^&]+/, "page=" + currentPage);
    } else {
      if (
        url.includes("category") ||
        url.includes("tag") ||
        url.includes("keyword")
      )
        url += "&page=" + currentPage;
      else {
        url += "?page=" + currentPage;
      }
    }
    window.location.href = url;
  });
});
