# Komotion

At work there have been a few clients who prefer their applications built in the Kony platform. I have been tasked with creating the animations in these projects. Writing simple animations in Kony has seemed a little weird to me. I found myself writing the same code 80% of the time. Komotion is a simple utility to make writing simple animations easier and more sensible (more complex keyframes will still need to directly use the kony animation API).

## Use

Using Komotion is just a matter of dropping `komotion.js` into your `project/modules/` folder.

## Example

Writing basic from/to animations in Kony can be needlessly complicated:
```javascript
function myAnimation() {
  var element = myForm.myFlex.myElement;

  var elTo = kony.ui.makeAffineTransform();
  elTo.translate(150, 150);
  elTo.scale(3, 3);
  elTo.rotate(-55);

  var elFrom = kony.ui.makeAffineTransform();
  elFrom.translate(0, 0);
  elFrom.scale(1, 1);
  elFrom.rotate(0);

  var before = function() {
    alert('starting animation');
  };

  var after = function() {
    alert('animation end');
  }

  var anim = kony.ui.createAnimation({
    0: {
      "opacity": 0,
      "transform": elFrom
    },
    100: {
      "stepConfig": {
        "timingFunction": [0.445, 0.050, 0.550, 0.950]
      },
      "opacity": 1,
      "transform": elTo
    }
  });

  var config = {
    "duration": 2,
    "iterationCount": 1,
    "delay": 1,
    "fillMode": kony.anim.FILL_MODE_FORWARDS
  };

  var callbacks = {
    "animationStart": before,
    "animationEnd": after
  };

  element.animate(anim, config, callbacks);
}
```


The same animation written using Komotion:
```javascript
function myAnimation() {
  var element = myForm.myFlex.myElement;

  var elTo = komotion.transform([
    ["translate", 150, 150],
    ["scale", 3, 3],
    ["rotate", -55]
  ]);

  var elFrom = komotion.transform([
    ["translate", 0, 0],
    ["scale", 1, 1],
    ["rotate", 0]
  ]);

  var before = function() {
    alert('starting animation');
  };

  var after = function() {
    alert('animation end');
  }

  element.animate(
    komotion.fromTo([
      ["opacity", 0, 1],
      ["transform", elFrom, elTo]
    ], "easeInOutSine"),
    komotion.config(1, 2),
    komotion.cb(before, after)
  );
}
```
