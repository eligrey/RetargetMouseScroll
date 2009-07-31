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

    var win      = window.open("/", "example", "w="+screen.availWidth/3.5+",h="+screen.availHeight/3.5+",scrollbars=yes"),
    retargetting = RetargetMouseScroll(document, win),
    closedCheck  = setInterval(function() {
    	if (win.closed) {
    		retargetting.restore();
    		clearInterval(closedCheck);
    	}
    }, 1000);

In the previous example, all mouse scrolling on the main document is retargetted to the popup until it is closed.

Supported Browsers \*
--------------------

* Firefox 3.5

**\*** *I know the list is terribly small, I'll add more browsers soon*
