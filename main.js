const maxColorListSize = 5;

function genColor() {
  //const hex = '#' + Math.random().toString(16).slice(2, 8);
  const min = 50;
  const max = 200; //0 < max < 255

  const r = parseInt(Math.random() * (max - min)) + min;
  const g = parseInt(Math.random() * (max - min)) + min;
  const b = parseInt(Math.random() * (max - min)) + min;

  const hexr = ("0" + r.toString(16)).slice(-2);
  const hexg = ("0" + g.toString(16)).slice(-2);
  const hexb = ("0" + b.toString(16)).slice(-2);
  const hex = `#${hexr}${hexg}${hexb}`;

  setColors(hex);
  addColorToList(hex);
}

function setColors(hex) {
  document.querySelector("body").style.backgroundColor = hex;
  document.querySelector("#gen-color").style.color = hex;
  document.querySelector("#hex-code").innerHTML = hex;
  document.title = hex.toUpperCase();

  localStorage.setItem("hex", hex);
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
  const hex = localStorage.getItem("hex");
  setColors(hex);
  addColorToList(hex);
}

document.onload = getColors();