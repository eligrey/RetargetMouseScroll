/*
* RetargetWindowMouseScroll JavaScript Library v0.0.2
* 2009-07-30
* By Elijah Grey, http://eligrey.com
*
* http://github.com/eligrey/RetargetMouseScroll/tree/master
*
* License: GNU GPL v3 and the X11/MIT license
*   See COPYING.md or http://eligrey.com/blog/about/license
*/

if (typeof this.RetargetMouseScroll !== "function") (function() {
	var mouseScrollEvents = ["DOMMouseScroll", "mousewheel"];
	
	function handleScroll (evt, targetWindow, preventDefault, scrollMultiplier) {
		if (preventDefault && evt.preventDefault)
			evt.preventDefault();
		
		var scrollAmount = evt.detail
		                   || (-evt.wheelDelta / 40); // convert wheelData to lines
		scrollAmount *= 19; // convert lines to pixels
		
		if (typeof scrollMultiplier === "number" && !isNaN(scrollMultiplier))
			scrollAmount *= scrollMultiplier;
		
		if (evt.wheelDeltaX || ("axis" in evt && "HORIZONTAL_AXIS" in evt && evt.axis == evt.HORIZONTAL_AXIS))
			// horizontal scroll
			targetWindow.scrollBy(scrollAmount, 0);
		else // vertical scroll
			targetWindow.scrollBy(0, scrollAmount);
	};
	
	this.RetargetMouseScroll = function (elem, targetWindow, preventDefault, scrollMultiplier) {
		if (!elem)
			elem = document;
		
		if (!targetWindow)
			targetWindow = window;
		
		if (typeof preventDefault !== "boolean")
			preventDefault = true;
		
		var addListener, removeListener, restoreFn,
		handler = function (evt) {
			evt = evt || window.event;
			handleScroll(evt, targetWindow, preventDefault, scrollMultiplier);
		};
		
		if (addListener = elem.addEventListener) {
			addListener.call(elem, mouseScrollEvents[0], handler, false);
			addListener.call(elem, mouseScrollEvents[1], handler, false);
		}
		else if (addListener = elem.attachEvent)
			addListener.call(elem, "on"+mouseScrollEvents[1], handler);
		
		if (removeListener = elem.removeEventListener)
			restoreFn = function () {
				removeListener.call(elem, mouseScrollEvents[0], handler, false);
				removeListener.call(elem, mouseScrollEvents[1], handler, false);
			};
		else if (removeListener = elem.detachEvent)
			restoreFn = function () {
				removeListener.call(elem, "on"+mouseScrollEvents[1], handler);
			};
		
		return {
			restore: restoreFn
		};
	};
}).call(this);
