*Version 0.0.2*

RetargetMouseScroll implements a simple API to retarget mouse scroll events.

Usage
-----

    RetargetMouseScroll(
        element         :Node,    // default: document
        targetWindow    :Window,  // default: window
        preventDefault  :Boolean, // default: true
        scrollMultiplier:Number   // default: 1.0
    )

`RetargetMouseScroll` returns an object containing a `restore` method. Calling the method restores the default scrolling.

Examples
--------

 * `RetargetMouseScroll(myElement, myFrame)` - Per-element mouse scroll retargetting to a frame
 * `RetargetMouseScroll(document, window, true, 0.5)` - Slow down scrolling
 * `RetargetMouseScroll(document, window, true, -1)` - Invert scrolling
 * `RetargetMouseScroll(document, window, true, 2)` - Speed up scrolling

More advanced example using a popup:

    var win = window.open("/", "example", "w=" + (screen.availWidth / 3.5)
                                          + ",h=" + (screen.availHeight / 3.5)
                                          + ",scrollbars=yes,resize=yes");
    win.addEventListener("DOMContentLoaded", function() {
        var retargetting = RetargetMouseScroll(document, win);
        win.onunload = function () {
    	    retargetting.restore();
        };
    }, false);

In the previous example, all mouse scrolling on the main document is retargetted to the popup until it is closed.

Known Supported Browsers
--------------------

* Firefox
   * 1.5? \*
   * 2 \*
   * 3
   * 3.5
* Opera \*
   * 9
   * 10
* Internet Explorer \*
   * 7?
   * 8
* Google Chrome
   * 1?
   * 2
   * 3
* Safari \*
   * 3?
   * 4

**\*** *Does not support horizontal scroll capturing and retargetting*

If the version number is followed by a "?", I'm assuming it works but I haven't tested it yet.

Testers Needed
--------------

I need testers to contact me if RetargetMouseScroll works (or doesn't work) in their browsers. Please make sure to mention if it also works with horizontal scrolling.

