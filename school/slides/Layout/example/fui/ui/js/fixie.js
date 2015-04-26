function fixPNG(element, scale) {
	var src;

	if (element.tagName=='IMG'||element.tagName=='INPUT') {
		if (/\.png$/.test(element.src)) {
			src = element.src;
			element.src = 'ui/js/blank.gif';
		}
	} else {
		src = element.currentStyle.backgroundImage.match(/url\("(.+\.png)"\)/i);
		if (src) {
			src = src[1];
			element.runtimeStyle.backgroundImage="none";
		}
	}

	if (src) {
		element.runtimeStyle.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + src + "',sizingMethod='" + (scale ? 'scale' : 'crop') + "')";
	}
};