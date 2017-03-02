/**
 * @fileoverview dragscroll-zoom - scroll area by dragging and zoom in~out
 * @version 1.0.1
 *
 * @license MIT, see https://github.com/cymakr/dragscroll-zoom
 * @copyright 2017 cymakr <cymakr@gmail.com>
 *
 * This project began as a fork of dragscroll https://github.com/asvd/dragscroll
 */

(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports !== 'undefined') {
        factory(exports);
    } else {
        factory((root.dragscroll = {}));
    }
}(this, function(exports) {
    var _window = window;
    var _document = document;
    var mousemove = 'mousemove';
    var mouseup = 'mouseup';
    var mousedown = 'mousedown';
    var EventListener = 'EventListener';
    var addEventListener = 'add' + EventListener;
    var removeEventListener = 'remove' + EventListener;
    var newScrollX, newScrollY;

    var dragged = [];
    var reset = function(i, el) {
        for (i = 0; i < dragged.length;) {
            el = dragged[i++];
            el = el.container || el;
            el[removeEventListener](mousedown, el.md, 0);
            _window[removeEventListener](mouseup, el.mu, 0);
            _window[removeEventListener](mousemove, el.mm, 0);
        }

        // cloning into array since HTMLCollection is updated dynamically
        dragged = [].slice.call(_document.getElementsByClassName('dragscroll'));
        for (i = 0; i < dragged.length;) {
            (function(el, lastClientX, lastClientY, pushed, scroller, cont) {
                (cont = el.container || el)[addEventListener](
                    mousedown,
                    cont.md = function(e) {
                        if (!el.hasAttribute('nochilddrag') ||
                            _document.elementFromPoint(
                                e.pageX, e.pageY
                            ) == cont
                        ) {
                            pushed = 1;
                            lastClientX = e.clientX;
                            lastClientY = e.clientY;

                            e.preventDefault();
                        }
                    }, 0
                );

                _window[addEventListener](
                    mouseup, cont.mu = function() { pushed = 0; }, 0
                );

                _window[addEventListener](
                    mousemove,
                    cont.mm = function(e) {
                        if (pushed) {
                            (scroller = el.scroller || el).scrollLeft -=
                                newScrollX = (-lastClientX + (lastClientX = e.clientX));
                            scroller.scrollTop -=
                                newScrollY = (-lastClientY + (lastClientY = e.clientY));
                            if (el == _document.body) {
                                (scroller = _document.documentElement).scrollLeft -= newScrollX;
                                scroller.scrollTop -= newScrollY;
                            }
                        }
                    }, 0
                );
            })(dragged[i++]);
        }
    };


    if (_document.readyState == 'complete') {
        reset();
    } else {
        _window[addEventListener]('load', reset, 0);
    }

    exports.reset = reset;
}));

function zoomIn(n) {
    var imgSize = document.getElementById('dragsimg').style.width;
    var zoom = Number(imgSize.replace(/[^0-9]/g, '')) + n;
    document.getElementById('dragsimg').style.width = zoom + '%';
}

function zoomOut(n) {
    var imgSize = document.getElementById('dragsimg').style.width;

    if (Number(imgSize.replace(/[^0-9]/g, '')) <= 100) {
        return false;
    }

    var zoom = Number(imgSize.replace(/[^0-9]/g, '')) - n;
    document.getElementById('dragsimg').style.width = zoom + '%';
}