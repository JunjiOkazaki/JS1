(function(){
    'use strict';

    var timer = document.getElementById('timer');
    var start = document.getElementById('start');
    var stop = document.getElementById('stop');
    var reset = document.getElementById('reset');

    var startTime;
    var elapsedTime = 0;
    var timerId;
    var timeToadd = 0;

    function updateTimetText(){

        var m = Math.floor(elapsedTime / 60000);
        var s10 = Math.floor(elapsedTime % 60000 / 10000);
        var s = Math.floor(elapsedTime % 60000 / 1000);
        var ms = Math.floor(elapsedTime % 60000 / 100);

        m = ('0' + m).slice(-1);
        s10 = ('0' + s10).slice(-1); 
        s = ('0' + s).slice(-1);
        ms = ('0' + ms).slice(-1);
        
        timer.textContent = m + ':' + s10 + ':' + s + ':' + ms;
    }


    function countUp(){

        timerId = setTimeout(function(){

            elapsedTime = Date.now() - startTime + timeToadd;
            updateTimetText()

            countUp();

        },10);
    }

    start.addEventListener('click',function(){

        startTime = Date.now();

        countUp();
    });

    stop.addEventListener('click',function(){

       clearTimeout(timerId);

       timeToadd += Date.now() - startTime;
    });

    reset.addEventListener('click',function(){

        elapsedTime = 0;

        timeToadd = 0;

        updateTimetText();

    });
})();

$(document).ready(function(){
  $("#start").click(function() {
    $("#start").removeClass("start_light");
    $("#start").addClass("add_start_dark");
    $("#stop").removeClass("stop_dark");
    $("#stop").addClass("add_stop_light");
    $("#reset").removeClass("reset_dark");
    $("#reset").addClass("add_reset_light");
  });
  $("#stop").click(function() {
    $("#stop").toggleClass("stop_dark add_stop_light");
    $("#start").toggleClass("start_light add_start_dark");
  });
  $("#reset").click(function() {
    $("#reset").toggleClass("reset_dark add_reset_light");
  });
});