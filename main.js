const main = document.querySelector("main");
const ground = document.querySelector(".ground");
const plane = document.createElement("img");

plane.src = "./plan2.png";
plane.className = "plane";
main.appendChild(plane);
let yPos = document.body.clientHeight - 150;
plane.style.transform = `translate(${document.body.clientWidth / 2}px, ${
  document.body.clientHeight - 150
}px)`;
let buildings = [];
const size = document.body.clientWidth / 100;
const sizeH = document.body.clientHeight / 100;
function generateGround() {
  for (let y = 0; y < 100; y++) {
    for (let x = 0; x < 100; x++) {
      const div = document.createElement("div");
      div.style.width = size + "px";
      div.style.height = sizeH + "px";
      div.style.background = Math.random() < 0.2 ? "green" : "#0d4a18";
      div.className = "grounder";
      ground.appendChild(div);
    }
  }
}
generateGround();
setInterval(() => {
  const building = document.createElement("img");
  building.className = "building";
  const r = Math.floor(Math.random() * (250 - 150 + 1)) + 150;
  building.src = "./clouds.png";
  building.style.width = `${r}px`;
  building.style.height = `${r}px`;
  building.style.transform = `translate(${Math.floor(
    Math.random() * document.body.clientWidth
  )}px, -300px)`;
  main.appendChild(building);
  buildings.push(building);
}, 1000);

function moveBuildings() {
  const grEl = document.querySelectorAll(".grounder");

  [...grEl].slice(grEl.length - 100).forEach((e) => e.remove());
  for (let x = 0; x < 100; x++) {
    const div = document.createElement("div");
    div.style.width = size + "px";
    div.style.height = sizeH + "px";
    div.style.background = Math.random() < 0.5 ? "green" : "#0d4a18";
    div.className = "grounder";

    ground.prepend(div);
  }
  buildings.forEach((building) => {
    const bounds = building.getBoundingClientRect();
    building.style.transform = `translate(${bounds.x}px, ${bounds.y + 5}px)`;
    if (bounds.y > document.body.clientHeight) {
      building.remove();
      buildings = buildings.filter((x) => x !== building);
    }
  });
}
const isDown = {
  d: false,
  a: false,
  w: false,
  s: false,
};
const position = plane.getBoundingClientRect();
let newPositionX = position.x;
let newPositionY = yPos;
function start() {
  let shouldSkew = "";

  if (isDown.a) {
    const position = plane.getBoundingClientRect();
    newPositionX = position.x - 10;
    shouldSkew = `skewY(345deg)`;
  }
  if (isDown.d) {
    const position = plane.getBoundingClientRect();
    newPositionX = position.x + 10;
    shouldSkew = "skewY(8deg)";
  }
  if (isDown.w) {
    newPositionY -= 10;
  }

  if (isDown.s) {
    newPositionY += 10;
  }
  yPos = newPositionY;
  plane.style.transform = `translate(${newPositionX}px, ${newPositionY}px) ${
    shouldSkew.length ? shouldSkew : "skewY(0deg)"
  }`;
  moveBuildings();
  requestAnimationFrame(start);
}
start();

document.addEventListener("keydown", ({ key }) => {
  const k = key.toLocaleLowerCase();
  isDown[k] = true;
});

document.addEventListener("keyup", ({ key }) => {
  const position = plane.getBoundingClientRect();
  plane.style.transform = `translate(${position.x + 1}px, ${yPos}px)`;
  const k = key.toLocaleLowerCase();
  isDown[k] = false;
});
