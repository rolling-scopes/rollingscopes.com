window.onload = function(){
    var el = document.getElementById("nav");
    var navBtn = document.getElementById("nav-btn");

    window.toggleClass = function() {
        if (el.className == "vertical-mode-closed") {
            el.className = "vertical-mode";
            navBtn.innerHTML = 'x';
        } else {
            el.className = "vertical-mode-closed";
            navBtn.innerHTML = '&#x2261;';
        }
    }

    window.onresize = function () {
        el.className = "vertical-mode-closed";
        navBtn.innerHTML = '&#x2261;';
    }
}

if ("ontouchstart" in window){
    document.body.className += "isTouch";
} else {
    document.body.className += "isDesktop";
}