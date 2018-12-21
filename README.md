dragscroll-zoom
==========

Dragscroll-Zoom is a micro JavaScript library (910 bytes minified) which
enables scrolling via holding the mouse button ("drag and drop" or
"click and hold" style, [online
demo](http://0w07.github.io/dragscroll-zoom.html)). It has no dependencies and
is written in vanilla JavaScript (which means it works anywhere).  

And I added a zoom function. (It is getting better)

### Usage


Install it using [Bower](http://bower.io/):

```sh
$ bower install dragscroll-zoom
```

or npm:

```sh
$ npm install dragscroll-zoom
```

Load the `dragscroll.js` in a preferable way (that is an UMD module):

```html
<script src="path/to/dragscroll.js"></script>
```

Add the `dragscroll` class to a scrollable element:
```html
<button id="zoom-in" onclick="zoomIn(20);">+</button>
<button id="zoom-out" onclick="zoomOut(20);">-</button>
<div class="dragscroll">
  <!-- dragsimg's style(width) specify arbitrary values. DON'T USE CSS -->
  <img id="dragsimg" src="./test.png" style="width:100%"/>
</div>
```
 
That's it! Now you can scroll it by dragging. You can also add the
`dragscroll` class to the `<body>` element and drag the whole page.

Keep in mind that now it is not possible to select the content with
mouse, so apply the `cursor: default;` CSS style to prevent confusing
the users (or even `cursor: grab;` in case the content is not a text).

You can use `zoom-in(number)`,`zoom-out(number)` to zoom in and zoom out a `dragsimg`.  
You have to put a number in `zoom-in(number)`,`zoom-out(number)`.  
The image's size changes by a `number`.

If you add or remove the `dragscroll` class dynamically, invoke
`dragscroll.reset()` to update the listeners.

You can also add the `nochilddrag` attribute to a scrollable element,
which will only enable drag-scrolling for an element itself, but not
for its subchildren. This can be usefull, if you want to enable the
scrolling the area by dragging its empty space, but keep the
opportunity to select the text (see
[example](http://asvd.github.io/jailed/demos/web/process/)).

Thank you for use this lib.

-

This project began as a fork of [dragscroll](https://github.com/asvd/dragscroll)
