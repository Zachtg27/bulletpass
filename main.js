title = "BULLET PASS";

description = `
[Press] 
Throw ball to 
your color 
players
`;

characters = [
  `
  ll
  l
 llll
l l
 l  l
l  l
`,
  `
  lc
  11
  ll
`,
  `
  rr
r r  r
 rrrr
  r
 r rrr
r   
`,
  `
 cc      
  c
cccc     
  c c
c  c
 c  c
`,
];

options = {
  isPlayingBgm: true,
  isReplayEnabled: true,
  seed: 2,
  theme: "pixel",
};

let y;
let vy;
let isJumping;
let spikes;
let spikeAddDist;
let scrolling;
let player;
let shots;
let enemy;

function update() {
  if (!ticks) {
    y = vy = 0;
    isJumping = false;
    spikes = [];
    enemy = [];
    player = { pos: vec(50, 95), vx: 0, shotTicks: 0 };
    shots = [];
    spikeAddDist = 0;
    scrolling = 1;
  }
  scrolling = difficulty;
  score += scrolling / 10;
  spikeAddDist -= scrolling;
  if(spikeAddDist < 0) {
    const y = rnd() < 0.33 ? (rnd() < 0.5 ? 8 : 60) : rnd(50, 70);
    if(rnd(0, 10) > 5) {
      enemy.push({pos: vec(5, y)}), 1000;
    }else {
      spikes.push({pos: vec(5, y)}), 1000;
    }
    spikeAddDist += rnd(30, 60);
  }
  enemy.forEach((lb) => {
    lb.pos.x += 0.5;
    color("cyan");
    char("c", lb.pos);
  })
  spikes.forEach((lb) => {
    lb.pos.x += 0.5;
    color("red");
    char("d", lb.pos);
  })


  color("cyan");
  char("a", player.pos);
  if (input.isJustPressed) {
      play("laser");
      shots.push({pos: vec(player.pos.x, player.pos.y)});
  }
  // Updating and drawing bullets
  shots.forEach((fb) => {
    // Move the bullets upwards
    fb.pos.y -= 1.7;
    
    // Drawing
    color("yellow");
    char("b", fb.pos);
});
remove(spikes, (e) => {
        color("black");
        // Shorthand to check for collision against another specific type
        // Also draw the sprite
        const isCollidingWithFBullets = char("d", e.pos).isColliding.char.b;

        // Check whether to make a small particle explosin at the position
        if (isCollidingWithFBullets) {
            color("yellow");
            particle(e.pos);
        }

        // Also another condition to remove the object
        return (isCollidingWithFBullets || e.pos.y > 150);
    });
    remove(enemy, (e) => {
      color("black");
      // Shorthand to check for collision against another specific type
      // Also draw the sprite
      const isCollidingWithFBullets = char("c", e.pos).isColliding.char.b;

      // Check whether to make a small particle explosin at the position
      if (isCollidingWithFBullets) {
          color("yellow");
          particle(e.pos);
          end("Game Over");
      }

      // Also another condition to remove the object
      return (isCollidingWithFBullets || e.pos.y > 150);
  });

 }

