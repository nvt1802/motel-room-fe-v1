$(window).scroll(fixedTopNav);
function fixedTopNav() {

    if (($(window).scrollTop() >= 60)) {
        $('#fixedTopNav').css({ 'top': '0' });
    } else {
        $('#fixedTopNav').css({ 'top': '-100px' });
    }
}