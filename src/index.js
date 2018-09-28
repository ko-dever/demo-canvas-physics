'use strict';

import Playground from './Playground';


;(( doc ) => {

  let CANVAS;


  /**
   * Render the canvas using same dimensions as its parent.
   * Setting these properties with CSS (width 100%, flexbox, ...) make it blurry
   *
   * @param {HTMLCanvasElement} canvas - The DOM node of a <canvas> to use
   */
  const resizeCanvas = function resizeCanvas( canvas ) {

    if ( !canvas ) {
      throw new Error( 'Canvas is missing, unable to resize it' );
    }

    const parentNode = /** @type {HTMLElement} */ (canvas.parentNode);
    const styles     = /** @type {CSSStyleDeclaration} */ (getComputedStyle( parentNode ));

    canvas.width  = parseInt( styles.width, 10 );
    canvas.height = parseInt( styles.height, 10 );
    canvas.classList.add( 'ready' );
  };


  doc.addEventListener( 'DOMContentLoaded', () => {

    CANVAS = doc.querySelector( '[data-playground] canvas' );

    resizeCanvas( CANVAS );
    window.addEventListener( 'resize', () => {
      resizeCanvas( CANVAS );
    });

    new Playground( CANVAS );
  });

})( document );