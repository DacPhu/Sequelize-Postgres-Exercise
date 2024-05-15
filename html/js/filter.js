document.querySelectorAll(".tag").forEach(function (tag) {
  tag.addEventListener("click", function () {
    this.classList.toggle("selected");
    filterContent();
  });
});

function filterContent() {
  var selectedTags = Array.from(document.querySelectorAll(".tag.selected")).map(
    function (tag) {
      return tag.dataset.value;
    }
  );

  var url = window.location.href;

  if (url.includes("#")) url.replace("#", "");

  if (selectedTags.length > 0) {
    if (url.includes("tag=")) {
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
