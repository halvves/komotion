var komotion = {
  cb: function(onStart, onEnd) {
    var cb = {
      "animationStart": onStart,
      "animationEnd": onEnd
    };
    return cb;
  },
  config: function(delay, duration) {
    var conf = {
      "delay": delay,
      "iterationCount": 1,
      "fillMode": kony.anim.FILL_MODE_FORWARDS,
      "duration": duration
    };
    return conf;
  },
  fromTo: function(props, easing) {
    var animObj = {
      "0": {},
      "100": {
        "stepConfig": {
          "timingFunction": komotion.timing[easing]
        }
      }
    };
    if (typeof props[0][0] !== "undefined" && props[0].constructor === Array) {
      // 2 Dimensional Array For Multiple Properties
      for (var i = 0; i < props.length; i++) {
        animObj["0"][props[i][0]] = props[i][1];
        animObj["100"][props[i][0]] = props[i][2];
      }
    } else {
      // Single Dimensional Array, Only One Property
      animObj["0"][props[0]] = props[1];
      animObj["100"][props[0]] = props[2];
    }
    return kony.ui.createAnimation(animObj);
  },
  timing: {
    linear: [0.250, 0.250, 0.750, 0.750],
    ease: [0.250, 0.100, 0.250, 1.000],
    easeIn: [0.420, 0.000, 1.000, 1.000],
    easeOut: [0.000, 0.000, 0.580, 1.000],
    easeInOut: [0.420, 0.000, 0.580, 1.000],
    easeInQuad: [0.550, 0.085, 0.680, 0.530],
    easeInCubic: [0.550, 0.055, 0.675, 0.190],
    easeInQuart: [0.895, 0.030, 0.685, 0.220],
    easeInQuint: [0.755, 0.050, 0.855, 0.060],
    easeInSine: [0.470, 0.000, 0.745, 0.715],
    easeInExpo: [0.950, 0.050, 0.795, 0.035],
    easeInCirc: [0.600, 0.040, 0.980, 0.335],
    easeOutQuad: [0.250, 0.460, 0.450, 0.940],
    easeOutCubic: [0.215, 0.610, 0.355, 1.000],
    easeOutQuart: [0.165, 0.840, 0.440, 1.000],
    easeOutQuint: [0.230, 1.000, 0.320, 1.000],
    easeOutSine: [0.390, 0.575, 0.565, 1.000],
    easeOutExpo: [0.190, 1.000, 0.220, 1.000],
    easeOutCirc: [0.075, 0.820, 0.165, 1.000],
    easeInOutQuad: [0.455, 0.030, 0.515, 0.955],
    easeInOutCubic: [0.645, 0.045, 0.355, 1.000],
    easeInOutQuart: [0.770, 0.000, 0.175, 1.000],
    easeInOutQuint: [0.860, 0.000, 0.070, 1.000],
    easeInOutSine: [0.445, 0.050, 0.550, 0.950],
    easeInOutExpo: [1.000, 0.000, 0.000, 1.000],
    easeInOutCirc: [0.785, 0.135, 0.150, 0.860]
  },
  transform: function(trans) {
    var t = kony.ui.makeAffineTransform();
    if (typeof trans[0][0] !== "undefined" && trans[0].constructor === Array) {
      // 2 Dimensional Array For Multiple Transforms
      for (var i = 0; i < trans.length; i++) {
        if (trans[i][0] === "rotate") {
          t[trans[i][0]](trans[i][1]);
        } else {
          t[trans[i][0]](trans[i][1], trans[i][2]);
        }
      }
    } else {
      // Single Dimensional Array, Only One Transform
      if (trans[0] === "rotate") {
        t[trans[0]](trans[1]);
      } else {
        t[trans[0]](trans[1], trans[2]);
      }
    }
    return t;
  },
  dpToInt: function(input) {
    var output = parseInt(input.replace("dp",""));
    return output;
  }
};
