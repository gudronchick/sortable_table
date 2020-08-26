const table = document.querySelector("table");
let currentCells;
let count = JSON.parse(localStorage.getItem("nums"))
  ? JSON.parse(localStorage.getItem("nums"))[1]
  : 0;

document.addEventListener("DOMContentLoaded", (e) => {
  table.querySelectorAll("td").forEach((cell) => {
    cell.style.opacity = 1;
  });
});

const renderRows = (c, currentCells, id) => {
  let tbodies = table.querySelectorAll("tbody");
  currentCells.sort((a, b) => {
    a = a.innerText;
    b = b.innerText;
    if (id != 4) {
      a = +a;
      b = +b;
    }
    if (c % 2) {
      if (a > b) return 1;
      if (a < b) return -1;
    } else {
      if (a < b) return 1;
      if (a > b) return -1;
    }
  });
  currentCells.forEach((cell, i) => {
    tbodies[i].appendChild(cell.closest("tr"));
  });
};

if (localStorage.getItem("nums")) {
  let nums = JSON.parse(localStorage.getItem("nums"));
  currentCells = [...table.querySelectorAll(`tbody td:nth-child(${nums[0]})`)];
  renderRows(nums[1], currentCells, nums[0]);
}

const sortCell = (e) => {
  if (!e.target.dataset.id) return;
  let id = e.target.dataset.id;
  currentCells = [...table.querySelectorAll(`tbody td:nth-child(${id})`)];
  count++;
  renderRows(count, currentCells, id);
  location.hash = `sorted_by_${e.target.dataset.name}`;
  localStorage.setItem("nums", JSON.stringify([+id, count]));
};

const highlightCell = (e) => {
  if (e.target.tagName !== "TD") return;
  document.querySelector(".highlighted")
    ? document.querySelector(".highlighted").classList.remove("highlighted")
    : 1;
  e.target.classList.add("highlighted");
  if (e.ctrlKey || e.metaKey) {
    e.target.classList.remove("highlighted");
    e.target.closest("tr").classList.add("highlighted");
  }
};

table.addEventListener("click", (e) => {
  sortCell(e);
  highlightCell(e);
});
