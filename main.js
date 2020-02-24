const maxColorListSize = 5;
const colors = getInitial();

function genColor() {
  //const hex = '#' + Math.random().toString(16).slice(2, 8);
  const min = 50;
  const max = 200; //0 < max < 255

  const getNumber = () => parseInt(Math.random() * (max - min)) + min;
  const toHex = n => ("0" + n.toString(16)).slice(-2)

  const r = toHex(getNumber());
  const g = toHex(getNumber());
  const b = toHex(getNumber());
  const hex = "#" + r + g + b;

  setColors(hex);
  addColorToList(hex);
  saveColor(hex);
}

function setColors(hex) {
  document.querySelector("body").style.backgroundColor = hex;
  document.querySelector("#gen-color").style.color = hex;
  document.querySelector("#hex-code").innerHTML = hex;
  document.title = hex.toUpperCase();
}

function saveColor(hex) {
  if (colors.length === maxColorListSize) colors.shift();
  colors.push(hex);
  localStorage.setItem("colors", colors.join());
}

function addColorToList(hex) {
  const list = document.querySelector("#color-list");

  const listItem = document.createElement("li");
  const colorButton = document.createElement("button");
  colorButton.style.backgroundColor = hex;
  colorButton.title = hex;
  colorButton.onclick = () => setColors(hex);

  listItem.appendChild(colorButton);

  if (list.childElementCount >= maxColorListSize) {
    list.removeChild(list.childNodes[0]);
  }

  list.appendChild(listItem);
}

function getColors() {
  let colors = localStorage.getItem("colors");
  if (colors) {
    colors = colors.split(',');
    colors.forEach(color => addColorToList(color));
    setColors(colors.slice(-1)[0]);
  }
}

function getInitial() {
  let colors = localStorage.getItem("colors");
  if (colors) return colors.split(',');
  else return [];
}

document.onload = getColors();
