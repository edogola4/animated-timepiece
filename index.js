// Selectors
const hours = document.querySelector(".hrs");
const minutes = document.querySelector(".min");
const seconds = document.querySelector(".sec");
const greeting = document.getElementById("greeting");
const alarmInput = document.getElementById("alarm-time");
const setAlarmButton = document.getElementById("set-alarm");
const alarmMessage = document.getElementById("alarm-message");

let alarmTime = null;

// Function to Update Clock
function updateClock() {
    const now = new Date();
    const hr = now.getHours() * 30; // Convert hours to degrees (360°/12 hours)
    const min = now.getMinutes() * 6; // Convert minutes to degrees (360°/60 minutes)
    const sec = now.getSeconds() * 6; // Convert seconds to degrees (360°/60 seconds)

    hours.style.transform = `rotateZ(${hr + min / 12}deg)`; // Add gradual movement based on minutes
    minutes.style.transform = `rotateZ(${min}deg)`;
    seconds.style.transform = `rotateZ(${sec}deg)`;

    updateGreeting(now.getHours());
    checkAlarm(now);
}

// Function to Update Greeting
function updateGreeting(hour) {
    if (hour < 12) {
        greeting.textContent = "Good Morning!";
    } else if (hour < 18) {
        greeting.textContent = "Good Afternoon!";
    } else {
        greeting.textContent = "Good Evening!";
    }
}

// Function to Set Alarm
setAlarmButton.addEventListener("click", () => {
    const alarmValue = alarmInput.value;
    if (alarmValue) {
        alarmTime = alarmValue;
        alarmMessage.textContent = `Alarm set for ${alarmTime}`;
        alarmMessage.style.color = "#4caf50"; // Success color
    } else {
        alarmMessage.textContent = "Please select a valid time.";
        alarmMessage.style.color = "#e91e63"; // Error color
    }
});

// Function to Check Alarm
function checkAlarm(now) {
    if (alarmTime) {
        const [alarmHour, alarmMinute] = alarmTime.split(":").map(Number);
        if (
            now.getHours() === alarmHour &&
            now.getMinutes() === alarmMinute &&
            now.getSeconds() === 0
        ) {
            // Trigger alarm
            triggerAlarm();
        }
    }
}

// Function to Trigger Alarm
function triggerAlarm() {
    alert("Alarm Ringing!");
    alarmMessage.textContent = "Alarm Ringing!";
    alarmMessage.style.color = "#e91e63"; // Alert color
    alarmTime = null; // Reset the alarm
}

// Initialize the Clock
setInterval(updateClock, 1000);
updateClock(); // Call once immediately to avoid delay

// DOM Content Loaded Event
document.addEventListener("DOMContentLoaded", () => {
    // Initialize Greeting
    updateGreeting(new Date().getHours());
});
