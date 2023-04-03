let box = document.querySelector(".box");
let blocks = [];
let iter = 0;

function createItem (color, type, code) {

  let i = document.createElement("div");
    if(type == "HEX") {
      i.style.backgroundColor = code;
    } else {
      i.style.backgroundColor = type + "(" + code + ")";
    }
  
  i.className = "item";
  box.appendChild(i);

  let ic = document.createElement("div");
  ic.className = "item-content";
  i.appendChild(ic);

  let h3 = document.createElement("h3");
  h3.innerText = color;
  ic.appendChild(h3);

  let p1 = document.createElement("p");
  p1.className = "color-type";
  p1.innerText = type;
  ic.appendChild(p1);

  let p2 = document.createElement("p");
  p2.className = "color-code";
  p2.innerText = code;
  ic.appendChild(p2);

  blocks[iter] = {};
  blocks[iter].color = color.toLowerCase();
  blocks[iter].type = type;
  blocks[iter].code = code;
  iter++
}

createItem("LIGHTVIOLET", "rgb", "158, 53, 176")
createItem("Lipstick", "rgba", "192, 24, 86, 0.5")
createItem("Herbal", "HEX", "#73C018")

let form = document.querySelector("form");
let colorName = document.getElementById("color");
let codeName = document.getElementById("code");
let typeName = document.getElementById("type");


let colorTemp = /\D/;

let rgbTemp = /([01]?\d\d?|2[0-4]\d|25[0-5])(\,\s*)([01]?\d\d?|2[0-4]\d|25[0-5])(\,\s*)([01]?\d\d?|2[0-4]\d|25[0-5])$/

let rgbaTemp = /([01]?\d\d?|2[0-4]\d|25[0-5])(\,\s*)([01]?\d\d?|2[0-4]\d|25[0-5])(\,\s*)([01]?\d\d?|2[0-4]\d|25[0-5])(\,\s*)(0\.\d|1)$/

let hexTemp = /(#[a-fA-F0-9]{6})|(#[a-fA-F0-9]{3})/;


form.addEventListener("submit", function(e) {
  e.preventDefault();
  let errors = 0;
  let find = 0;
  
  codeHelp.className = "form-text";
  codeHelp.innerText = "";
  colorHelp.className = "form-text"
  colorHelp.innerText = "";

  for(el = 0; el < blocks.length; el++){
    if(colorName.value.toLowerCase() == blocks[el].color) {
      find++
      errors++
    }
  }

  if(find > 0) {
    colorHelp.className += " text-danger"
    colorHelp.innerText = "Такое название уже есть на странице"
    errors++
  }

  if(!colorTemp.test(colorName.value)) {
    colorHelp.className += " text-danger"
    colorHelp.innerText = "Введите буквенное название цвета"
    errors++
  } 
  if(colorName.value == "") {
    colorHelp.className += " text-danger"
    colorHelp.innerText = "Заполните поле"
    errors++
  }

  if(typeName.value == "RGB" && !rgbTemp.test(codeName.value)) {
    codeHelp.className += " text-danger"
    codeHelp.innerText = "Формат цвета RGB - 3 числа через запятую в диапазоне от 0 до 255"
    errors++
  }
  if(typeName.value == "RGBA" && !rgbaTemp.test(codeName.value)) {
    codeHelp.className += " text-danger"
    codeHelp.innerText = "Формат цвета RGBA - 4 числа через запятую, первые 3 числа в диапазоне от 0 до 255, последнее число от 0.0 до 1"
    errors++
  }
  if(typeName.value == "HEX" && !hexTemp.test(codeName.value)) {
    codeHelp.className += " text-danger"
    codeHelp.innerText = "Формат цвета HEX - символ # и 6 цифр или букв от A до F"
    errors++
  }
  if(codeName.value == "") {
    codeHelp.style.display = "block"
    codeHelp.className += " text-danger"
    codeHelp.innerText = "Заполните поле"
    errors++
  }

  if(errors == 0) {
    createItem(colorName.value, typeName.value, codeName.value)
  }
  
})