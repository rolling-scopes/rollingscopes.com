var el = document.getElementById('nav');
var navBtn = document.getElementById('nav-btn');

window.toggleClass = function() {
    if (el.className == 'vertical-mode-closed') {
        el.className = 'vertical-mode';
        navBtn.innerHTML = 'x';
    } else {
        el.className = 'vertical-mode-closed';
        navBtn.innerHTML = '&#x2261;';
    }
};

window.onresize = function () {
    el.className = 'vertical-mode-closed';
    navBtn.innerHTML = '&#x2261;';
};

nav.onclick = function () {
    el.className = 'vertical-mode-closed';
    navBtn.innerHTML = '&#x2261;';
};

window.signupForUpdates = function(){
    var email = document.querySelector('.sign-up-field').value.toLowerCase();
    var subscribeBtn = document.querySelector('.sign-up-btn');

    var valid = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email);

    if (email && valid){
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/subscribe');
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        xhr.onreadystatechange = function(){
            if (xhr.readyState === 4){
                if (xhr.status == 200 && xhr.responseText == 'done'){

                    window.setTimeout(function(){
                        subscribeBtn.classList.remove('btn-inprogress');
                        subscribeBtn.classList.add('btn-complete');
                        subscribeBtn.innerHTML = '<i class="fa fa-check"></i> <span>You are subscribed!</span>';
                        window.signupForUpdates = function(){};
                    }, 1500);

                } else {
                    alert('An error occurred. Please try again later.');
                }
            }
        };

        subscribeBtn.innerHTML = '<i class="fa fa-cog"></i> <span>please wait ...</span>';
        subscribeBtn.classList.add('btn-inprogress');

        xhr.send(JSON.stringify({
          email: email
        }));
    }
};

var sigup = document.querySelector('.sign-up-field');
if (sigup) {
    sigup.onkeyup = function(e){
        if (e.keyCode == 13) {
            window.signupForUpdates();
        }
    };
}

if ('ontouchstart' in window){
    document.body.className += ' isTouch';
} else {
    document.body.className += ' isDesktop';
}
