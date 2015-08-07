![easeTo](https://raw.github.com/flovan/easeto/master/demo/img/easeto.gif)

#easeTo.js v0.0.2

A zero-dependency script to scroll a webpage to a certain point through common easing functions.  
~1KB minified and gzipped.

[&rarr; Demo page &larr;](http://htmlpreview.github.io/?https://github.com/flovan/easeto/blob/master/demo/index.html)

## Example

```javascript
// Ease to a specific offset
easeTo(500);

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
	offset: el.offsetHeight/2
})
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
   callback: null
}
```

## Browser support

Chrome 39+, Safari 8+, Opera 26+, FF 35+

> **Note:** Modern browser support will probably be better than listed above. If you tested an earlier version, feel free to send a PR with updated versions.

## TODO

- Test IE

## Changelog

* **0.0.2**
  * Expanded API
* **0.0.1**
  * First commit, WIP

[Gif source](http://giphy.com/gifs/slide-sliding-l7G89coKCSf3q)
