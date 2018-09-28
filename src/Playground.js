'use strict';

/**
 * Generates a random color in hexadecimal format
 *
 * @returns {string} Hexadecimal code of the color
 */
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color     = '#';

  for (let i = 0; i < 6; ++i) {
    color += letters[ Math.floor( Math.random() * 16 ) ];
  }

  return color;
};


export default class {

  constructor( canvas ) {

    if ( !canvas ) {
      throw new Error( 'Canvas is missing, unable to initialise Playground.' );
    }

    this.canvas  = canvas;
    this.context = this.canvas.getContext( '2d' );
    this.collProjectiles = [];

    this.bindEvents();
    this.animate();
  }


  /** Bind DOM events */
  bindEvents() {
    this.canvas.addEventListener( 'click', ( event ) => {
      this.storeNewProjectile( event );
    });
  }


  /** Animate the canvas and the projectiles created */
  animate() {
    const COLLISION = .9;
    const GRAVITY   = .8;
    const { canvas: CANVAS } = this;

    window.requestAnimationFrame(() => {
      this.clear();

      this.collProjectiles = this.collProjectiles.filter( (projectile) => {
        this.drawProjectile( projectile );

        // tentative new y
        const y1 = projectile.y + projectile.vy + GRAVITY / 2;

        if ( y1 + projectile.radius > CANVAS.height || y1 - projectile.radius < 0 ) {
          // what the projectile is bouncing against
          const wall = y1 - projectile.radius > 0 ? CANVAS.height - projectile.radius : projectile.radius;
          const dist = wall - projectile.y;

          // velocity when it reached the floor/ceiling
          const v1 = Math.sign(y1 - wall) * Math.sqrt(projectile.vy * projectile.vy + 2 * GRAVITY * dist);
          const v2 = -v1 * COLLISION; // velocity after it bounced

          const t1 = (v1 - projectile.vy) / GRAVITY; // time to reach floor/ceiling
          const t2 = 1 - t1; // remaining time

          projectile.vy = v2 + GRAVITY * t2; // final velocity
          projectile.y  = wall + (v2 + projectile.vy) / 2 * t2; // final position

          if ( CANVAS.height - projectile.y < projectile.radius ) {
            // velocity too low, remove projectile
            return false;
          }
        } else {
          projectile.y = y1;
          projectile.vy += GRAVITY;
        }

        // tentative new x
        const x1 = projectile.x + projectile.vx;

        if ( x1 + projectile.radius > CANVAS.width || x1 - projectile.radius < 0 ) {
          const wall = x1 - projectile.radius > 0 ? CANVAS.width - projectile.radius : projectile.radius;
          const dist = wall - projectile.x;

          projectile.x  = wall + COLLISION * (dist - projectile.vx);
          projectile.vx = -projectile.vx * COLLISION;
        } else {
          projectile.x = x1;
        }

        return true;
      });

      this.animate();
    });
  }


  /** Clear the canvas */
  clear() {
    const { canvas } = this;
    this.context.clearRect( 0, 0, canvas.width, canvas.height );
  }


  /**
   * Store internally a new projectile and its params, without displaying it
   *
   * @param {object} event - Event's object
   * @param {number} event.clientX - X coordinate of the triggered event
   * @param {number} event.clientY - Y coordinate of the triggered event
   */
  storeNewProjectile( event ) {

    let {
      clientX: posX,
      clientY: posY,
    } = event;

    const {
      width : canvasWidth,
      height: canvasHeight,
    } = this.canvas;

    const RADIUS = 10;


    // check horizontal limits
    posX = posX - RADIUS < 0 ? RADIUS : posX;
    posX = posX + RADIUS > canvasWidth ? canvasWidth - RADIUS : posX;

    // check vertical limits
    posY = posY - RADIUS < 0 ? RADIUS : posY;
    posY = posY + RADIUS > canvasHeight ? canvasHeight - RADIUS : posY;

    this.collProjectiles.push({
      radius: RADIUS,
      x     : posX,
      y     : posY,
      vx    : ( Math.random() * 10 ) - 5,
      vy    : ( Math.random() * 10 ) - 5,
      color : getRandomColor(),
    });
  }


  /**
   * Create and display a projectile
   *
   * @param {object} proj The projectile to create / show
   * @param {number} proj.radius
   * @param {number} proj.x
   * @param {number} proj.y
   * @param {number} proj.vx
   * @param {number} proj.vy
   * @param {string} proj.color
   */
  drawProjectile( proj ) {
    const { context } = this;

    // draw projectile
    context.beginPath();
    context.arc( proj.x, proj.y, proj.radius, 0, 2 * Math.PI );
    context.closePath();
    context.fillStyle = proj.color;
    context.fill();

    // add a border
    context.lineWidth = 1;
    context.strokeStyle = '#000';
    context.stroke();
  }
}