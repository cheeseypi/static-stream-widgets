const timer = {
    isRunning: false,
    duration: new URLSearchParams(document.location.search).get('duration') || 300,
    endTime: null
}


timer.endTime = new Date(new Date().getTime() + timer.duration * 1000)
timer.isRunning = true

updateTimer();

var timeInterval;

function numberPadAndSpan(number) {
    let str = number.toString().padStart(2, '0');
    return '<span class="FWNum">' + str.split('').join('</span><span class="FWNum">') + '</span>'
}

function getTimerString(totalSeconds) {
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor(totalSeconds / 60) - (hours * 60);
    let seconds = Math.floor(totalSeconds % 60);
    let timeString = numberPadAndSpan(hours) + ":" + numberPadAndSpan(minutes) + ":" + numberPadAndSpan(seconds);
    return "-" + timeString;
}

function updateTimer() {
    let timeElement = document.getElementById("time")
    clearInterval(timeInterval);
    if (timer.isRunning && timer.endTime) {
        timeInterval = setInterval(() => {
            diff = (new Date(timer.endTime).getTime() - new Date().getTime()) / 1000
            if (diff <= 0) {
                timeElement.innerHTML = getTimerString(0);
                clearInterval();
            }
            else {
                timeElement.innerHTML = getTimerString(diff);
            }
        }, 200);
    }
    else if (timer.duration) {
        timeElement.innerHTML = getTimerString(timer.duration);
    }
}