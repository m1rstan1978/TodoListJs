const listBlock = document.getElementById("list");
const createTodo = document.getElementById("createTodo");
let deleteTodo;

const createInput = document.getElementById("inputCreate");
const searchInput = document.getElementById("searchInput");

let arrObjects = [
  {
    data: 1702287840048,
    dataN: "Размещено 7 сек. назад",
    inputVal: "Почистить зубы",
    htmlEl: `<div
    class="flex items-center justify-between rounded w-full bg-white p-2 mb-5"
    id="delBtn2"
    >
    <div class="flex items-center p-2">
      <p>2.</p>
      <p class="ml-2">Размещено 1 мин. назад</p>
      <p class="ml-5">Здарова</p>
    </div>
    <p class="text-red-500 cursor-pointer deleteTodo">Удалить</p>
    </div>`,
  },
  {
    data: 1702087820202,
    dataN: "Размещено 7 сек. назад",
    inputVal: "Почистить туалет",
    htmlEl: `<div
    class="flex items-center justify-between rounded w-full bg-white p-2 mb-5"
    id="delBtn2"
    >
    <div class="flex items-center p-2">
      <p>2.</p>
      <p class="ml-2">Размещено 1 мин. назад</p>
      <p class="ml-5">Здарова</p>
    </div>
    <p class="text-red-500 cursor-pointer deleteTodo">Удалить</p>
    </div>`,
  },
];

createTodo.onclick = () => {
  let data = new Date().getTime();
  let name = createInput.value;

  const infObject = {
    data: data,
    name: createInput.value,
  };

  createItem(infObject);
};

function createItem(itemC) {
  const getTime = setTime(itemC);
  arrObjects.unshift({
    data: itemC.data,
    dataN: getTime,
    htmlEl: null,
    inputVal: createInput.value,
  });
  render();
}

function setTime(elTime) {
  const diffTime = new Date().getTime() - elTime.data;
  const timeS = Math.floor(diffTime / 1000);
  const timeM = Math.floor(diffTime / 1000 / 60);
  const timeH = Math.floor(diffTime / 1000 / 60 / 60);
  const timeD = Math.floor(diffTime / 1000 / 60 / 60 / 24);

  let newTime = "";

  if (timeS <= 60) {
    timeS === 0
      ? (newTime = `Размещено только что`)
      : (newTime = `Размещено ${timeS} сек. назад`);
  } else if (timeM <= 60) {
    newTime = `Размещено ${timeM} мин. назад`;
  } else if (timeH <= 24) {
    newTime = `Размещено ${timeH} час. назад`;
  } else {
    newTime = `Размещено ${timeD} дн. назад`;
  }
  return newTime;
}

function render(filterArr) {
  listBlock.innerHTML = "";

  const newArr = filterArr ? filterArr : arrObjects;

  newArr.forEach((el, idx) => {
    const newTime = setTime(el);
    el.dataN = newTime;
    el.htmlEl = `<div
    class="flex items-center justify-between rounded w-full bg-white p-2 mb-5"
    id="delBtn${idx + 1}"
    >
    <div class="flex items-center p-2">
      <p>${idx + 1}.</p>
      <p class="ml-2">${newTime}</p>
      <p class="ml-5">${el.inputVal}</p>
    </div>
    <p class="text-red-500 cursor-pointer deleteTodo">Удалить</p>
    </div>`;
    const div = document.createElement("div");
    div.innerHTML = el.htmlEl;
    listBlock.appendChild(div);

    deleteTodo = document.getElementById(`delBtn${idx + 1}`).onclick = () => {
      const findIdx = arrObjects.findIndex((item) => item.data === el.data);
      arrObjects.splice(findIdx, 1);
      document.getElementById(`delBtn${idx + 1}`).remove();
      render();
    };
  });
  createInput.value = "";
}

render();

searchInput.addEventListener("input", () => {
  let arr = arrObjects.filter((el) =>
    el.inputVal.toUpperCase().includes(searchInput.value.toUpperCase())
  );
  render(arr);
});
