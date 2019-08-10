// https://jsfiddle.net/Lamik/9rky6fco/

export const hsv2hsl = (h, s, v, l = v - (v * s) / 2, m = Math.min(l, 1 - l)) => [
  h,
  m ? (v - l) / m : 0,
  l
];

export function hsv2hsl_indirect(h, s, v) {
  return rgb2hsl_wiki(...hsv2rgb_wiki(h, s, v));
}

export function hsv2rgb_wiki(h, s, v) {
  let c = v * s;
  let k = h / 60;
  let x = c * (1 - Math.abs((k % 2) - 1));

  let [r1, g1, b1] = [0, 0, 0];

  // let r1 = (g1 = b1 = 0);

  if (k >= 0 && k <= 1) {
    r1 = c;
    g1 = x;
  }
  if (k > 1 && k <= 2) {
    r1 = x;
    g1 = c;
  }
  if (k > 2 && k <= 3) {
    g1 = c;
    b1 = x;
  }
  if (k > 3 && k <= 4) {
    g1 = x;
    b1 = c;
  }
  if (k > 4 && k <= 5) {
    r1 = x;
    b1 = c;
  }
  if (k > 5 && k <= 6) {
    r1 = c;
    b1 = x;
  }

  let m = v - c;

  return [r1 + m, g1 + m, b1 + m];
}

export const rgb2hsl_wiki = (r, g, b) => {
  let a = Math.max(r, g, b); //max
  let i = Math.min(r, g, b); //min
  let n = a - i; //chroma
  let l = (a + i) / 2; //lum
  let f = 1 - Math.abs(a + i - 1);
  let s = f ? n / f : 0;
  let h = 0;
  if (n) {
    if (a === r) h = 60 * (0 + (g - b) / n);
    if (a === g) h = 60 * (2 + (b - r) / n);
    if (a === b) h = 60 * (4 + (r - g) / n);
  }

  return [(h < 0 ? h + 360 : h) % 360, s, l];
};

// https://github.com/Qix-/color-convert/blob/HEAD/conversions.js
export const rgb_2_hsl = rgb => {
  const r = rgb[0] / 255;
  const g = rgb[1] / 255;
  const b = rgb[2] / 255;
  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);
  const delta = max - min;
  let h;
  let s;

  if (max === min) {
    h = 0;
  } else if (r === max) {
    h = (g - b) / delta;
  } else if (g === max) {
    h = 2 + (b - r) / delta;
  } else if (b === max) {
    h = 4 + (r - g) / delta;
  }

  h = Math.min(h * 60, 360);

  if (h < 0) {
    h += 360;
  }

  const l = (min + max) / 2;

  if (max === min) {
    s = 0;
  } else if (l <= 0.5) {
    s = delta / (max + min);
  } else {
    s = delta / (2 - max - min);
  }

  return [h, s * 100, l * 100];
};

//http://jscolor.com/examples/
// line ~1133
// line ~1312

// r: 0-255
// g: 0-255
// b: 0-255
//
// returns: [ 0-360, 0-100, 0-100 ]
//
function RGB_HSV(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  var n = Math.min(Math.min(r, g), b);
  var v = Math.max(Math.max(r, g), b);
  var m = v - n;
  if (m === 0) {
    return [null, 0, 100 * v];
  }
  var h = r === n ? 3 + (b - g) / m : g === n ? 5 + (r - b) / m : 1 + (g - r) / m;
  return [60 * (h === 6 ? 0 : h), 100 * (m / v), 100 * v];
}

// h: 0-360
// s: 0-100
// v: 0-100
//
// returns: [ 0-255, 0-255, 0-255 ]
//
function HSV_RGB(h, s, v) {
  var u = 255 * (v / 100);

  if (h === null) {
    return [u, u, u];
  }

  h /= 60;
  s /= 100;

  var i = Math.floor(h);
  var f = i % 2 ? h - i : 1 - (h - i);
  var m = u * (1 - s);
  var n = u * (1 - s * f);
  switch (i) {
    case 6:
    case 0:
      return [u, n, m];
    case 1:
      return [n, u, m];
    case 2:
      return [m, u, n];
    case 3:
      return [m, n, u];
    case 4:
      return [n, m, u];
    case 5:
      return [u, m, n];
  }
}
