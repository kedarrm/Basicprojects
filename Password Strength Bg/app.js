const password = document.getElementById("password");
const bg = document.querySelector(".background-image");
const copyBtn = document.querySelectorAll("button")[1];

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(password.value);
  alert("Password copied to clipboard!");
});

password.addEventListener("input", (e) => {
  const input = e.target.value;
  const length = input.length;
  const blurness = 20 - length * 2;
  bg.style.filter = `blur(${blurness}px)`;
});
