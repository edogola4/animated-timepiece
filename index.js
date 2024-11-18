/*const hours = document.querySelector(".hrs");
const minutes = document.querySelector(".min");
const seconds = document.querySelector(".sec");

function setTime() {
    let now = new Date();
    let hr = now.getHours() * 30;
    let min = now.getMinutes() * 6;
    let sec = now.getSeconds() * 6;

    hours.style.transform = `rotateZ(${hr+(min / 12)}deg)`;
    minutes.style.transform = `rotateZ(${min}deg)`;
    seconds.style.transform = `rotateZ(${sec}deg)`;
}

setInterval(setTime);*/


const hours = document.querySelector(".hrs");
const minutes = document.querySelector(".min");
const seconds = document.querySelector(".sec");
const greeting = document.getElementById("greeting");
const alarmInput = document.getElementById("alarm-time");
const setAlarmButton = document.getElementById("set-alarm");

let alarmTime = null;
let alarmTimeout = null;

// Update Clock
function setTime() {
    const now = new Date();
    const hr = now.getHours() * 30;
    const min = now.getMinutes() * 6;
    const sec = now.getSeconds() * 6;

    hours.style.transform = `rotateZ(${hr + min / 12}deg)`;
    minutes.style.transform = `rotateZ(${min}deg)`;
    seconds.style.transform = `rotateZ(${sec}deg)`;

    // Update Greeting
    updateGreeting(now.getHours());

    // Check Alarm
    checkAlarm(now);
}

// Update Greeting Based on Time
function updateGreeting(hour) {
    if (hour < 12) {
        greeting.textContent = "Good Morning!";
    } else if (hour < 18) {
        greeting.textContent = "Good Afternoon!";
    } else {
        greeting.textContent = "Good Evening!";
    }
}

// Set Alarm
setAlarmButton.addEventListener("click", () => {
    const alarmValue = alarmInput.value;
    if (alarmValue) {
        alarmTime = alarmValue;
        alert(`Alarm set for ${alarmTime}`);
    } else {
        alert("Please select a valid time.");
    }
});

// Check Alarm
function checkAlarm(now) {
    if (alarmTime) {
        const [alarmHour, alarmMinute] = alarmTime.split(":").map(Number);
        if (
            now.getHours() === alarmHour &&
            now.getMinutes() === alarmMinute &&
            now.getSeconds() === 0
        ) {
            alert("Alarm Ringing!");
            alarmTime = null; // Reset Alarm
        }
    }
}

setInterval(setTime, 1000);
