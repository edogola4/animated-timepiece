// Selectors
const hours = document.querySelector(".hrs");
const minutes = document.querySelector(".min");
const seconds = document.querySelector(".sec");
const greeting = document.getElementById("greeting");
const alarmInput = document.getElementById("alarm-time");
const setAlarmButton = document.getElementById("set-alarm");
const alarmMessage = document.getElementById("alarm-message");

// Create snooze and stop buttons dynamically
const snoozeButton = document.createElement("button");
const stopButton = document.createElement("button");

snoozeButton.textContent = "Snooze";
stopButton.textContent = "Stop";

snoozeButton.style.display = "none";
stopButton.style.display = "none";

document.querySelector(".alarm-container").append(snoozeButton, stopButton);

//let alarmTime = null;
let alarmTimeout = null;
let isAlarmRinging = false;


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

    // Show snooze and stop buttons
    snoozeButton.style.display = "inline-block";
    stopButton.style.display = "inline-block";

    playAlarmSound();
}
// Function to Play Alarm Sound
function playAlarmSound() {
    const audio = new Audio("https://www.soundjay.com/button/beep-07.wav");
    audio.loop = true; // Repeat sound until stopped
    audio.play();

    // Attach to global so we can stop the sound
    snoozeButton.addEventListener("click", () => {
        alarmTime = getSnoozeTime(5); // Snooze for 5 minutes
        alarmMessage.textContent = `Alarm snoozed for 5 minutes.`;
        alarmMessage.style.color = "#4caf50"; // Success color
        stopAlarm(audio); // Stop current alarm sound
    });

    stopButton.addEventListener("click", () => {
        alarmTime = null; // Clear the alarm
        alarmMessage.textContent = `Alarm stopped.`;
        alarmMessage.style.color = "#4caf50"; // Success color
        stopAlarm(audio); // Stop current alarm sound
    });
}
// Function to Stop Alarm Sound
function stopAlarm(audio) {
    isAlarmRinging = false;
    snoozeButton.style.display = "none";
    stopButton.style.display = "none";
    audio.pause();
    audio.currentTime = 0; // Reset sound to the beginning
}
// Function to Calculate Snooze Time
function getSnoozeTime(minutes) {
    const now = new Date();
    now.setMinutes(now.getMinutes() + minutes); // Add snooze duration
    const snoozeHours = String(now.getHours()).padStart(2, "0");
    const snoozeMinutes = String(now.getMinutes()).padStart(2, "0");
    return `${snoozeHours}:${snoozeMinutes}`;
}
// Initialize the Clock
setInterval(updateClock, 1000);
updateClock(); // Call once immediately to avoid delay

// DOM Content Loaded Event
document.addEventListener("DOMContentLoaded", () => {
    // Initialize Greeting
    updateGreeting(new Date().getHours());
});


snoozeButton.className = "alarm-button snooze-button";
stopButton.className = "alarm-button stop-button";


// Styling for the Snooze Button
snoozeButton.style.padding = "10px 20px";
snoozeButton.style.margin = "10px";
snoozeButton.style.border = "none";
snoozeButton.style.backgroundColor = "#4caf50"; // Green color
snoozeButton.style.color = "white";
snoozeButton.style.borderRadius = "5px";
snoozeButton.style.fontSize = "16px";
snoozeButton.style.cursor = "pointer";

// Styling for the Stop Button
stopButton.style.padding = "10px 20px";
stopButton.style.margin = "10px";
stopButton.style.border = "none";
stopButton.style.backgroundColor = "#e91e63"; // Pink color
stopButton.style.color = "white";
stopButton.style.borderRadius = "5px";
stopButton.style.fontSize = "16px";
stopButton.style.cursor = "pointer";
