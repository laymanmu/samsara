
var ImageFilters = {

  init: function() {
    this.canvas     = document.getElementById('canvas');
    this.context    = this.canvas.getContext('2d');
    this.tmpCanvas  = document.createElement('canvas');
    this.tmpContext = this.tmpCanvas.getContext('2d');
    this.tmpCanvas.width  = this.canvas.width;
    this.tmpCanvas.height = this.canvas.height;
  },

  draw: function(image, filter, filterArgs) {
    this.tmpContext.clearRect(0,0,this.tmpCanvas.width,this.tmpCanvas.height);
    this.tmpContext.drawImage(image,0,0);
    var data = this.tmpContext.getImageData(0,0,this.tmpCanvas.width,this.tmpCanvas.height);
    if (filter) {
      filterArgs = filterArgs || [];
      filterArgs.unshift(data);
      data = filter.apply(null, filterArgs);
    }
    this.context.putImageData(data,0,0);
  }
};

ImageFilters.grayscale = function(imageData) {
  var d = imageData.data;
  for (var i=0; i<d.length; i+=4) {
    var r = d[i];
    var g = d[i+1];
    var b = d[i+2];
    d[i]  = d[i+1] = d[i+2] = (r+g+b)/3;
  }
  return imageData;
};

ImageFilters.brightness = function(pixels, adjustment) {
  var d = pixels.data;
  for (var i=0; i<d.length; i+=4) {
    d[i] += adjustment;
    d[i+1] += adjustment;
    d[i+2] += adjustment;
  }
  return pixels;
};

ImageFilters.threshold = function(pixels, threshold) {
  var d = pixels.data;
  for (var i=0; i<d.length; i+=4) {
    var r = d[i];
    var g = d[i+1];
    var b = d[i+2];
    var v = (0.2126*r + 0.7152*g + 0.0722*b >= threshold) ? 255 : 0;
    d[i] = d[i+1] = d[i+2] = v
  }
  return pixels;
};

ImageFilters.convolute = function(pixels, weights, opaque) {
  var side = Math.round(Math.sqrt(weights.length));
  var halfSide = Math.floor(side/2);
  var src = pixels.data;
  var sw = pixels.width;
  var sh = pixels.height;
  // pad output by the convolution matrix
  var w = sw;
  var h = sh;
  var output = this.tmpContext.createImageData(w, h);
  var dst = output.data;
  // go through the destination image pixels
  var alphaFac = opaque ? 1 : 0;
  for (var y=0; y<h; y++) {
    for (var x=0; x<w; x++) {
      var sy = y;
      var sx = x;
      var dstOff = (y*w+x)*4;
      // calculate the weighed sum of the source image pixels that
      // fall under the convolution matrix
      var r=0, g=0, b=0, a=0;
      for (var cy=0; cy<side; cy++) {
        for (var cx=0; cx<side; cx++) {
          var scy = sy + cy - halfSide;
          var scx = sx + cx - halfSide;
          if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
            var srcOff = (scy*sw+scx)*4;
            var wt = weights[cy*side+cx];
            r += src[srcOff] * wt;
            g += src[srcOff+1] * wt;
            b += src[srcOff+2] * wt;
            a += src[srcOff+3] * wt;
          }
        }
      }
      dst[dstOff] = r;
      dst[dstOff+1] = g;
      dst[dstOff+2] = b;
      dst[dstOff+3] = a + alphaFac*(255-a);
    }
  }
  return output;
};

ImageFilters.sharpen = function(pixels, mat3) {
  mat3 = mat3 || [0,-1,0, -1,5,-1, 0,-1,0];
  return ImageFilters.convolute(pixels, mat3, null);
};

ImageFilters.blur = function(pixels, mat3) {
  var v = 1/9;
  mat3 = mat3 || [v,v,v, v,v,v, v,v,v];
  return ImageFilters.convolute(pixels, mat3, null);
};
