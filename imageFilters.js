
var ImageFilters = {};

ImageFilters.draw = function(image, filter, filterArgs) {
  var c   = document.getElementById('canvas');
  var ctx = c.getContext('2d');
  ctx.clearRect(0,0,c.width,c.height);
  ctx.drawImage(image,0,0);
  if (filter) {
    var data   = ctx.getImageData(0,0,c.width,c.height);
    filterArgs = filterArgs || [];
    filterArgs.unshift(data);
    var filtered = filter.apply(null, filterArgs);
    ctx.putImageData(filtered,0,0);
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
