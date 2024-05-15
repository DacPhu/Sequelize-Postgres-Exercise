document.querySelectorAll(".category").forEach(function (category) {
  category.addEventListener("click", function (event) {
    event.preventDefault();

    document.querySelectorAll(".category").forEach(function (cat) {
      if (cat !== category) {
        cat.classList.remove("selected");
      }
    });

    category.classList.toggle("selected");
    filterContent();
  });
});

document.querySelectorAll(".tag").forEach(function (tag) {
  tag.addEventListener("click", function () {
    this.classList.toggle("selected");
    filterContent();
  });
});

function filterContent() {
  var selectedCategory = document.querySelector(
    ".category.selected:not([data-id='all']"
  );
  var selectedCategoryId = selectedCategory ? selectedCategory.dataset.id : "";

  var selectedTags = Array.from(document.querySelectorAll(".tag.selected")).map(
    function (tag) {
      return tag.dataset.value;
    }
  );

  var url = window.location.href;

  if (selectedCategoryId !== "") {
    if (url.includes("category=")) {
      url = url.replace(/(category=)[^&]+/, "$1" + selectedCategoryId); // Replace category parameter
    } else {
      url += (url.includes("?") ? "&" : "?") + "category=" + selectedCategoryId; // Append category parameter
    }
  }

  if (selectedTags.length > 0) {
    if (url.includes("tags=")) {
      url = url.replace(
        /(tag=)[^&]+/,
        "$1" + encodeURIComponent(selectedTags.join(","))
      ); // Replace tags parameter
    } else {
      url +=
        (url.includes("?") ? "&" : "?") +
        "tag=" +
        encodeURIComponent(selectedTags.join(",")); // Append tags parameter
    }
  }

  window.location.href = url;
}
