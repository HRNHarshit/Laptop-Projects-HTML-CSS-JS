const sortableList = document.querySelector(".sortable-list");
const items = sortableList.querySelectorAll(".item");

items.forEach((item) => {
  item.addEventListener("dragstart", () => {
    setTimeout(() => {
      item.classList.add("dragging");
    }, 0);
  });
  item.addEventListener("dragend", () => {
    item.classList.remove("dragging");
  });
});

const initSoratableList = (event) => {
  event.preventDefault();
  const draggingItem = sortableList.querySelector(".dragging");
  const siblings = [...sortableList.querySelectorAll(".item:not(.dragging)")];

  let nextSibling = siblings.find((sibling) => {
    return event.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
  });
  sortableList.insertBefore(draggingItem, nextSibling);
};

sortableList.addEventListener("dragover", initSoratableList);
sortableList.addEventListener("dragenter", event => event.preventDefault());
