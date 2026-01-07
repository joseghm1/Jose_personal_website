const w = 450
const h = 450
const can1 = document.getElementById('dots')
const ctx1 = can1.getContext('2d')
const can2 = document.getElementById('particles')
const ctx2 = can2.getContext('2d')
const orbitCenter = document.getElementById('orbit');
let skillHeader = document.getElementById('#skill-header');

let dots = []
let particles = []
let stepCount = 0
let hue = 182
let mode = 0 // 0: Dots & tree, 1: dots and points, 2: tree
let killDist = 4


const orbits = [
  // { radius: 40, angle: 0, speed: 0.03 },
  // { radius: 80, angle: 0, speed: 0.02 },
  { radius: 150, angle: 0, speed: 0.015 },
];

const pLanguages = ['Python', 'Java', 'C', 'JavaScript', 'TypeScript', 'HTML5', 'CSS', 'SQL']
const toolsPlatforms = ['AWS', 'Postman', 'Git', 'Azure', 'Jira', 'Windows', 'Storybook', 'Vercel', 'VSCode', 'Figma']
const languages = ['English', 'Spanish', 'French']
const libraries = ['ReactJS', 'NextJS', 'Angular', 'Sass', 'PostgreSQL', 'MongoDB', 'PyTorch', 'TensorFlow']



function orbitDestroyer() {
  // orbitCenterChild = orbitCenter.children;
  // orbitCenterChild.remove()
  const childSattelites = orbit.children;
  while (childSattelites.length !== 0) {
    childSattelites[0].remove()
  }
}

function orbitMaker(array) {

  const arrayLength = array.length;
  const step = 360 / arrayLength;

  let deg = 0; // must be here and must be LET
  const newOrbit = document.createElement('div')
  newOrbit.classList.add('orbit')

  array.forEach((skill) => {

    const newSkill = document.createElement('div');
    newSkill.classList.add('satellite')
    newSkill.style.setProperty('--angle', `${deg}deg`);
    newSkill.style.setProperty('--radius', '150px')

    const newBtn = document.createElement('button');
    newBtn.classList.add('skill-btn-rot');
    newBtn.textContent = skill;

    newSkill.appendChild(newBtn);
    newOrbit.appendChild(newSkill);

    deg += step; // now increments correctly
  });

  orbitCenter.appendChild(newOrbit)

}




function drawOrbitalRings() {
  const cx = w / 2;
  const cy = h / 2;

  // Draw faint ring circles
  ctx2.lineWidth = 1;
  ctx2.strokeStyle = 'rgba(255,255,255,0.08)';

  orbits.forEach(o => {
    ctx2.beginPath();
    ctx2.arc(cx, cy, o.radius, 0, 2 * Math.PI);
    ctx2.stroke();
    ctx2.closePath();
  });


}

// Not relevant
class Dot {
  x; y; r; hue; kill; id;
  constructor(x = w / 2, y = h / 2, r = 3) {
    this.x = x
    this.y = y
    this.r = r
    this.hue = hue + 30 * Math.random()
    this.kill = false
    this.id = Math.floor(1000000000 * Math.random())
  }
  plot(color) {
    ctx1.fillStyle = color || ('rgb(' + 54 + ', 234, 238)')
    ctx1.beginPath()
    ctx1.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
    ctx1.fill()
    ctx1.closePath()
  }
}

// Constructor for the shapes
class Particle {
  x; y; r; visionLength; mobility; lifetime; age; kill; hasMoved;
  constructor(x = w / 2, y = h / 2, r = .5, visionLength = 35, mobility = .5, lifetime = 300) {
    this.x = x
    this.y = y
    this.r = r
    this.visionLength = visionLength
    this.mobility = mobility
    this.lifetime = lifetime
    this.age = 0
    this.kill = false
    this.hasMoved = false;
  }
  draw() {
    let a = mode !== 0 ? 1 : .2
    ctx2.fillStyle = 'rgba(55, 234, 238, ' + a + ')'
    ctx2.beginPath()
    let r = mode !== 0 ? 1 : this.r
    ctx2.arc(this.x, this.y, r, 0, 2 * Math.PI)
    if (this.hasMoved || mode !== 0) ctx2.fill()
    ctx2.closePath()
  }
}

// Initialize Canvas
let configureCanvas = (ctx, width, height) => {
  ctx.canvas.width = width * window.devicePixelRatio
  ctx.canvas.height = height * window.devicePixelRatio
  ctx.canvas.style.width = width + "px"
  ctx.canvas.style.height = height + "px"
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
  ctx.lineWidth = 1
  ctx.lineCap = "round"
}

//  Get dots if needed
let getDotById = (id) => {
  return dots.filter((d) => { return d.id == id })[0]
}

// Initialize Dots 
let initDots = () => {
  // Random positions
  let iterations = 10000, i = 0, minDist = 10
  while (i++ < iterations) {
    let r = 0.01
    //let x = r + (w - 2*r) * Math.random()
    //let y = r + (h - 2*r) * Math.random()
    let rad = r + (w / 2 - 2 * r) * Math.random()
    let angle = 2 * Math.PI * Math.random()
    x = w / 2 + rad * Math.cos(angle)
    y = h / 2 + rad * Math.sin(angle)

    // Accept only if not overlapping another dot (with midDist minimal distance)
    let accepted = true
    dots.forEach((el) => {
      if (dist1(el.x, el.y, x, y) < minDist) {
        accepted = false
      }
    })
    if (accepted) {
      dots.push(new Dot(x, y, r))
    }
  }
}


let initParticles = () => {
  let r0 = 3, pop = 100
  for (let i = 0; i < pop; i++) {
    let particle = new Particle(w / 2 + r0 * Math.cos(2 * Math.PI * i / pop), h / 2 + r0 * Math.sin(2 * Math.PI * i / pop))
    particles.push(particle)
  }
}
let dist1 = (x1, y1, x2, y2) => {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
}



// Setup
configureCanvas(ctx1, w, h)
configureCanvas(ctx2, w, h)
initDots()

function drawEaterParticles() {
  particles.forEach((p) => {
    // Check for neighbours
    let neighbours = []
    dots.forEach((dot) => {
      let distance = dist1(p.x, p.y, dot.x, dot.y)
      if (distance < p.visionLength) {
        dot.distance = distance
        neighbours.push(dot)
      }
    })

    // Move towards all neighbours a bit
    neighbours.forEach((n) => {
      p.x += p.mobility * (n.x - p.x) / n.distance
      p.y += p.mobility * (n.y - p.y) / n.distance
    })

    // If close enough to neighbour, mark neighbour as killable, also check if has been moved (set to true the first time, remains true afterwards)
    neighbours.forEach((n) => {
      let newDistance = dist1(p.x, p.y, n.x, n.y)
      if (newDistance < killDist) {
        getDotById(n.id).kill = true
      }
      if (newDistance !== n.distance) p.hasMoved = true
    })

    // Draw
    p.draw()

    // Age
    p.age++
    if (p.age > p.lifetime) {
      p.kill = true
    }
  })
}


// Loop
let step = () => {
  stepCount++
  // Update dots canvas
  ctx1.clearRect(0, 0, w, h)
  // if (mode == 0 || mode == 1) {
  //   dots.forEach(dot => dot.plot())
  // }

  // Update particles canvas
  if (mode !== 0) ctx2.clearRect(0, 0, w, h)
  // if (mode == 0) ctx2.clearRect(0, 0, w, h)

  // Inject a new particle each step
  let angle = 2 * Math.PI * stepCount / 100
  let r = 20 - 15 * Math.cos(stepCount / 203)
  let particle = new Particle(w / 2 + r * Math.cos(angle), h / 2 + r * Math.sin(angle))
  particles.push(particle)


  drawEaterParticles();

  if (mode !== 0) {
    drawOrbitalRings();

    // drawSkillOrbits();    // skill labels orbiting

  }

  // Kill all marked dots
  dots = dots.filter(d => { return !d.kill })

  // Kill all marked particles
  particles = particles.filter(p => { return !p.kill })

  // Next
  window.requestAnimationFrame(step)
}
window.requestAnimationFrame(step)

// Click toggles
let next = () => {
  orbitCenter.classList.remove('animate');   // remove animation class
  void orbitCenter.offsetWidth;              // 🔥 force browser reflow (resets animation)
  orbitCenter.classList.add('animate');

  skillHeader.classList.remove('animate-1');
  void orbitCenter.offsetWidth;              // 🔥 force browser reflow (resets animation) // remove animation class
  skillHeader.classList.add('animate-1');
  ctx1.clearRect(0, 0, w, h)
  ctx2.clearRect(0, 0, w, h)
  skillHeader.textContent = 'Click to explore my skills';
  // skillHeader.textContent = 'Languages';
  // eraseParticlesReverse();
  let retArray;
  orbitDestroyer();

  stepCount = 0
  particles = []
  dots = []
  hue = (Math.random() < 0.5 ? 10 : 190) + 20 * Math.random()
  mode = (mode + 1) % 4
  if (mode !== 0) {
    switch (mode) {
      case 1:
        skillHeader.textContent = 'Programming Languages';
        retArray = pLanguages;

        break;
      case 2:
        skillHeader.textContent = 'Tools & Platforms';
        retArray = toolsPlatforms;
        break;
      case 3:
        skillHeader.textContent = 'Libraries & Frameworks';
        retArray = libraries
        break;
      case 4:
        skillHeader.textContent = 'Languages';
        retArray = languages;
        break;
    }

    orbitMaker(retArray)
  }

  initDots()
}




orbitCenter.addEventListener('click', next)
document.getElementById('toggle').addEventListener('click', next)


