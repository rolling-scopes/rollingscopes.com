window.onload = function () {
	var getBrowser = function () {
		var matchName = navigator.userAgent.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i); // match list of browsers
		if (matchName) {
			var matchVersion = navigator.userAgent.match(/version\/([\.\d]+)/i);
			matchName[2] = (matchVersion !== null) ? matchVersion[1] : matchName[2];

			return {
				name: matchName[1].toLowerCase(),
				version: matchName[2] ? parseFloat(matchName[2]) : 0
			};
		}
		return {};
	};

	var browser = getBrowser();
	if (browser.name === 'msie') {
		var body = document.getElementsByTagName("body")[0];
		body.className += " ie" + browser.version;
	}
}