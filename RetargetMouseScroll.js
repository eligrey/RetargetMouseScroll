/*
* RetargetMouseScroll JavaScript Library v0.0.2
* 2009-07-30
* By Eli Grey, http://eligrey.com
*
* http://github.com/eligrey/RetargetMouseScroll/tree/master
*
* Licensed under the MIT License
*   See https://github.com/eligrey/RetargetMouseScroll/blob/master/LICENSE.md
*/

/*! @source http://purl.eligrey.com/github/RetargetMouseScroll/blob/master/
 *          RetargetMouseScroll.js
 */

if (typeof this.RetargetMouseScroll !== "function") (function() {
	var mouseScrollEvents = ["DOMMouseScroll", "mousewheel"];

	function handleScroll (evt, target, preventDefault, scrollMultiplier) {
		if (preventDefault) {
	        if (evt.preventDefault) {
	            evt.preventDefault();
	        } else {
	            event.returnValue = false;
	        }
	    }

		var scrollAmount = evt.detail
		                   || (-evt.wheelDelta / 40); // convert wheelData to lines
		scrollAmount *= 19; // convert lines to pixels

		if (typeof scrollMultiplier === "number" && !isNaN(scrollMultiplier))
			scrollAmount *= scrollMultiplier;

		if (evt.wheelDeltaX || ("axis" in evt && "HORIZONTAL_AXIS" in evt && evt.axis == evt.HORIZONTAL_AXIS))
			// horizontal scroll
			if (target.scrollBy)
				target.scrollBy(scrollAmount, 0);
			else
				target.scrollLeft += scrollAmount;
		else // vertical scroll
			if (target.scrollBy)
				target.scrollBy(0, scrollAmount);
			else
				target.scrollTop += scrollAmount;
	};

	this.RetargetMouseScroll = function (elem, target, preventDefault, scrollMultiplier, preventRetarget) {
		if (!elem)
			elem = document;

		if (!target)
			target = window;

		if (typeof preventDefault !== "boolean")
			preventDefault = true;

		if (typeof preventRetarget !== "function")
			preventRetarget = null;

		var addListener, removeListener, restoreFn,
		handler = function (evt) {
			evt = evt || window.event;
			if(preventRetarget && preventRetarget.call(this, evt)) return;
			handleScroll(evt, target, preventDefault, scrollMultiplier);
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