![easeTo](https://raw.github.com/flovan/easeto/master/demo/img/easeto.gif)

#easeTo.js v0.1.0

A zero-dependency script to scroll a webpage to a certain point through common easing functions.  
~1KB minified and gzipped.

[&rarr; Demo page &larr;](http://htmlpreview.github.io/?https://github.com/flovan/easeto/blob/master/demo/index.html)

## Examples

```javascript
// Ease to a specific offset
easeTo(500);

// To a specific element (with jQuery)
easeTo($('.my-el').get(0));

// Change the options
easeTo(document.body.offsetHeight, {
  easing: 'easeInOutExpo',
  duration: 1500
});

// To a specific element
easeTo(document.getElementById('target-el'));

// To center an element on the page
var el = document.getElementById('target-el');
easeTo(el, {
  offset: -(el.offsetHeight/2)
})

// Scroll an element's `overflow: scroll` content and
// attach a function to its completion
var el = document.querySelector('.overflow-content')
easeTo(el.scrollHeight, {
  container: el
  callback: function () {,
    alert('I\'m done!');
  }
});
```

## API

**`scrollTo([target], [options])`**

Scroll the page to the passed in target—either a number or a Node element.

Available options (with their default values):
```javascript
{
  // Which easing to use
  easing: 'linear',

  // How long the animation takes
  duration: 250,

  // Offset vertically
  offset: 0,

  // Which element to scroll
  container: window,

  // Call a function when the scrolling completes
  callback: null
}
```

## Browser support

IE9+, Chrome 39+, Safari 8+, Opera 26+, FF 35+

> **Note:** Modern browser support will probably be better than listed above. If you tested an earlier version, feel free to send a PR with updated versions.

## TODO

- Add `requestAnimationFrame` and use it when possible
- Test setInterval` performance (sometimes scrolls seem to glitch out)
- Try to fix scrollTop of 0 in IE8 and test further down
- Maybe add "start" and "complete" instead of "callback"
- Instead of requiring a native element, allow jQuery object
- Add start delay to options

## Changelog

* **0.1.0**
  * Initial release
* **0.0.2**
  * Expanded API
* **0.0.1**
  * First commit, WIP

[Gif source](http://giphy.com/gifs/slide-sliding-l7G89coKCSf3q)
