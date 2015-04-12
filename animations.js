
var Animations = {

  init: function() {
    this.canvas  = document.getElementById('canvas');
    this.context = canvas.getContext('2d');
  },

  startAnimating: function(animation, image) {
    Animations.stopAnimating();
    var animationArgs = [image];
    function animate() {
      window.currentFrame = window.requestAnimationFrame(animate);
      animation.apply(null, animationArgs);
    }
    animate();
  },

  stopAnimating: function() {
    window.cancelAnimationFrame(window.currentFrame);
  },

  bounceZoom: function(image) {
    if (!image.maxFrames) {
      image.maxFrames = 10000;
      image.atFrame   = 1;
      image.scaleRate = 0.00004;
      image.scaleDir  = 1;
      image.scale     = 1.0;
    }
    if (image.scaleDir > 0) {
      if (image.atFrame < image.maxFrames) {
        image.atFrame++;
        image.scale = 1.0 + image.scaleRate;
      } else {
        image.scaleDir *= -1;
      }
    } else {
      if (image.atFrame > 0) {
        image.atFrame--;
        image.scale = 1.0 - image.scaleRate;
      } else {
        image.scaleDir *= -1;
      }
    }
    Animations.context.scale(image.scale,image.scale);
    Animations.context.drawImage(image,0,0);
  }

};
