window.onload = function() {
var vector = {
  _x: 1,
  _y: 0,

  create: function(x, y) {
    var obj = Object.create(this);
    obj.setX(x);
    obj.setY(y);
    return obj;
  },

  setX: function(value) {
    this._x = value;
  },

  getX: function() {
    return this._x;
  },

  setY: function(value) {
    this._y = value;
  },

  getY: function() {
    return this._y;
  },

  setAngle: function(angle) {
    var length = this.getLength();
    this._x = length * Math.cos(angle);
    this._y = length * Math.sin(angle);
  },

  getAngle: function() {
    return Math.atan2(this._y, this._x);
  },

  setLength: function(length) {
    var angle = this.getAngle();
    this._x = length * Math.cos(angle);
    this._y = length * Math.sin(angle);
  },

  getLength: function() {
    return Math.sqrt(this._x * this._x + this._y * this._y);
  },

  add: function(v2) {
    return vector.create(this._x + v2.getX(), this._y + v2.getY());
  },

  substract: function(v2) {
    return vector.create(this._x - v2.getX(), this._y - v2.getY());
  },

  multiply: function(val) {
    return vector.create(this._x * val, this._y * val);
  },

  divide: function(val) {
    return vector.create(this._x / val, this._y / val);
  },

  addTo: function(v2) {
    this._x += v2.getX();
    this._y += v2.getY();
  },

  substractFrom: function(v2){
    this._x -= v2.getX();
    this._y -= v2.getY();
  },

  multiplyBy: function(val) {
    this._x *= val;
    this._y *= val;
  },

  divideBy: function(v2) {
    this._x /= val;
    this._y /= val;
  }
}
var particle = {
  position: null,
  velocity: null,
  gravity: null,

  create: function(x, y, speed, direction, grav) {
    var obj = Object.create(this);
    obj.position = vector.create(x, y);
    obj.velocity = vector.create(0, 0);
    obj.gravity = vector.create(0, grav || 0);
    obj.velocity.setLength(speed);
    obj.velocity.setAngle(direction);
    return obj;
  },

  accelerate: function(accel) {
    this.velocity.addTo(accel);
  },

  update: function(){
    this.velocity.addTo(this.gravity);
    this.position.addTo(this.velocity);
  }

}
var canvas = document.querySelector("canvas"),
    ctx = canvas.getContext("2d"),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight,
    fireworks = [],
    numFireworks = 5;

for(var i = 0; i < numFireworks; i++){
  var particles = createRocket();
  fireworks[i] = particles;
}

update();

function update() {

  ctx.clearRect(0, 0, width, height);
  fireworks.forEach(function(particles){
    particles.forEach(function(p){
      ctx.beginPath();
      p.update();
      ctx.fillStyle = `rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`
      ctx.arc(Math.floor(p.position.getX()), Math.floor(p.position.getY()), 2, 0, 2 * Math.PI, false);
      ctx.fill();
      ctx.closePath(); 
    });
  });
  fireworks.forEach(function(particles, i){
    var fade = 0;
    particles.forEach(function(p){
      var test = p.position.getY() >= height / 2;
      if(test){
        fade++;
      }
    });
    if(fade >= particles.length / 3){
      fireworks[i] = createRocket();
    }
  })
  requestAnimationFrame(update);
}

function createRocket(){
  var particles = [],
      numParticles = 100,
      x = Math.random() * width,
      y = Math.random() * height / 3;
  for(var i = 0; i < numParticles; i++){
    var p = particle.create(
      x, y,
      Math.random() * 5 + 2, Math.random() * 2 * Math.PI, 0.1);
    particles.push(p);
  };
  return particles;
}
}