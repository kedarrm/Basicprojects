let innerCursor = document.querySelector(".inner-cursor");
let outerCursor = document.querySelector(".outer-cursor");

document.addEventListener("mousemove", moveCursor);

function moveCursor(e) {
  let x = e.clientX;
  let y = e.clientY;

  innerCursor.style.left = `${x}px`;
  innerCursor.style.top = `${y}px`;
  outerCursor.style.left = `${x}px`;
  outerCursor.style.top = `${y}px`;

  const hue = (x + y) % 360;
  const color = `hsl(${hue}, 100%, 50%)`;

  innerCursor.style.backgroundColor = color;
  innerCursor.style.boxShadow = `
    0 0 15px ${color},
    0 0 30px ${color},
    0 0 45px ${color},
    0 0 60px ${color}
  `;

  outerCursor.style.borderColor = color;
  outerCursor.style.boxShadow = `
    0 0 10px ${color},
    0 0 20px ${color}
  `;
}

