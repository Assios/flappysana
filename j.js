var end = new Date('04/13/2017 01:23 PM');

var _second = 1000;
var _minute = _second * 60;
var _hour = _minute * 60;
var _day = _hour * 24;
var timer;

function showRemaining() {
    var now = new Date();
    var distance = end - now;
    if (distance < 0) {

        clearInterval(timer);
        document.getElementById('countdown').innerHTML = ' ... ';

        return;
    }
    var days = Math.floor(distance / _day);
    var hours = Math.floor((distance % _day) / _hour);
    var minutes = Math.floor((distance % _hour) / _minute);
    var seconds = Math.floor((distance % _minute) / _second);

    document.getElementById('k').innerHTML = days + ' ';
    document.getElementById('k').innerHTML += hours + ' ';
    document.getElementById('k').innerHTML += minutes + ' ';
    document.getElementById('k').innerHTML += seconds + ' ';
}

timer = setInterval(showRemaining, 1000);
