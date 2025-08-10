let color1 = document.querySelector(".c1");
let color2 = document.querySelector(".c2");
let color3 = document.querySelector(".c3");
let color4 = document.querySelector(".c4");
let gradientCont = document.querySelector("#gradient-cont");
let btn = document.querySelector(".randomColorBtn");
let copyBtn = document.querySelector(".copyColorBtn");

function getGradientCSS() {
  return `linear-gradient(${color1.value}, ${color2.value}, ${color3.value}, ${color4.value})`;
}

copyBtn.addEventListener("click", () => {
  const gradientCSS = getGradientCSS();

  // Create a temporary textarea to copy the text from
  const textarea = document.createElement("textarea");
  textarea.value = gradientCSS;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);

  // Optional: notify user
  alert("Gradient CSS copied to clipboard:\n" + gradientCSS);
});


function makeColor() {
  let randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return randomColor;
}

function generateGradient() {
  color1.value = "#" + makeColor();
  color2.value = "#" + makeColor();
  color3.value = "#" + makeColor();
  color4.value = "#" + makeColor();
  gradientCont.style.background = `linear-gradient(${color1.value}, ${color2.value}, ${color3.value}, ${color4.value})`;
}

function setGradient() {
  gradientCont.style.background = `linear-gradient(${color1.value}, ${color2.value}, ${color3.value}, ${color4.value})`;
}

document.body.addEventListener("load", generateGradient());
color1.addEventListener("input", setGradient);
color2.addEventListener("input", setGradient);
color3.addEventListener("input", setGradient);
color4.addEventListener("input", setGradient);
btn.addEventListener("click", generateGradient);
