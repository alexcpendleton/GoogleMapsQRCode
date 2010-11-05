// ==UserScript==
// @name           Google Maps QR
// @namespace      http://userscripts.org/users/120060
// @include        http://maps.google.com/maps*
// @description    Generates a QR code for the current map for scanning to your phone or other device.
// ==/UserScript==

(function() {
	var settings = {
		size:"500",
		top:"10px",
		left:"10px"
	}
	var img = undefined;
	var baseQRuri = "http://chart.apis.google.com/chart?cht=qr&chs="+ settings.size + "x" + settings.size + "&chl=";
	function getFullQRuri() {
		return baseQRuri + encodeURIComponent(document.getElementById('link').href);
	}
	function createQRimage() {
		var img = document.createElement("img");
		img.setAttribute("id", "qrimg");
		var uri = getFullQRuri();
		img.setAttribute("src", uri);
		img.style.display = "none";
		img.style.position = "absolute";
		img.style.top = settings.top;
		img.style.left = settings.left;
		img.style.zIndex = "5";
		return img;	
	}
	function toggle() {
		if(img.style.display=="block") { 
			hide();
		} else {
			show();
		}
	}
	function show() {
		var uri = getFullQRuri();
		img.setAttribute("src", uri);
		img.style.display = "block";
	}
	function hide() {
		img.style.display = "none";
	}
	
	function addQRLink() {
		var targets = document.getElementById('link');
		if (targets != undefined) {
			var divider = document.createElement("img");
			divider.setAttribute("class","bar-icon-divider bar-divider");
			divider.setAttribute("src", "http://maps.gstatic.com/intl/en_us/mapfiles/transparent.png");
			divider.setAttribute("jstcache", "0");
			
			var link = document.createElement("a");
			link.setAttribute("id", "qrlink");
			link.setAttribute("href", "javascript:void(0)");
			link.addEventListener("click", toggle, false);
			
			var icon = document.createElement("img");
			icon.setAttribute("class","bar-icon bar-icon-link2");
			icon.setAttribute("src", "http://maps.gstatic.com/intl/en_us/mapfiles/transparent.png");
			icon.setAttribute("jstcache", "0");
			link.appendChild(icon);
			
			var linkText = document.createElement("span");
			linkText.appendChild(document.createTextNode("QR"));
			linkText.setAttribute("class", "link-text");
			link.appendChild(linkText);
						
			targets.parentNode.appendChild(divider);
			targets.parentNode.appendChild(link);
			
			img = createQRimage();
			document.getElementById("main").appendChild(img);
		}
	}

	addQRLink();
})();