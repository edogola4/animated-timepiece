// Selecting Clock hands elements

const hours = document.querySelector(".hrs");
const minutes = document.querySelector(".mins");
const seconds = document.querySelector(".secs");

// alarm functionality
let alarmTime = null;
let alarmTimeout = null;
let isAlarmSet = false;
let alarmSound = new Audio("alarm.mp3");
function updateTime() {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();

  const hourDeg = (hour % 12) * 30 + minute * 0.5;
  const minuteDeg = minute * 6 + second * 0.1;
  const secondDeg = second * 6;

  hours.style.transform = `rotate(${hourDeg}deg)`;
  minutes.style.transform = `rotate(${minuteDeg}deg)`;
  seconds.style.transform = `rotate(${secondDeg}deg)`;

  // Check if alarm time is reached
  if (alarmTime && hour === alarmTime.getHours() && minute === alarmTime.getMinutes() && second === 0) {
    playAlarm();
  }
}

// function to set alarm time
function setAlarmTime(value) {
  const alarmInput = document.getElementById("alarmTime");
  const  [alarmHour, alarmMinute] = value.split(":");
  alarmTime = { hours: parseInt(alarmHour), minutes: parseInt(alarmMinute) } 
  alert(`Alarm set for ${alarmHour}:${alarmMinute}`);
}

// check if current time matches alarm time
function checkAlarm() {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();

  if (alarmTime && hour === alarmTime.hours && minute === alarmTime.minutes) {
    playAlarm();
  }
}

// function to play alarm sound
function playAlarm() {
  alarmSound.play();
  alert("Wake up!");
}

// function to stop alarm sound
function stopAlarm() {
  alarmSound.pause();
  alarmSound.currentTime = 0;
}

// function to snooze alarm
function snoozeAlarm() {
  stopAlarm();
  setTimeout(playAlarm, 300000); // Snooze for 5 minutes (300000 milliseconds)
}

// function to update clock hands based on current time
function updateClock() {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();

  const hourDeg = (hour % 12) * 30 + minute * 0.5;
  const minuteDeg = minute * 6 + second * 0.1;
  const secondDeg = second * 6;

  hours.style.transform = `rotate(${hourDeg}deg)`;
  minutes.style.transform = `rotate(${minuteDeg}deg)`;
  seconds.style.transform = `rotate(${secondDeg}deg)`;
}

// set the transform style for clock hands
hours.style.transformOrigin = `rotateZ(${hr + (min / 12)}deg)`;
minutes.style.transformOrigin = `rotateZ(${min}deg)`;
seconds.style.transformOrigin = `rotateZ(${sec}deg)`;

checkAlarm(now); // Check alarm on page load

setInterval(updateClock, 1000);

// set interval to update clock every second
setInterval(updateTime, 1000);

// event listener for set alarm button
document.getElementById("setAlarm").addEventListener("click", function () {
  const alarmTime = document.getElementById("alarmTime").value;
  setAlarmTime(alarmTime);
});

// event listener for stop alarm button
document.getElementById("stopAlarm").addEventListener("click", function () {
  stopAlarm();
});

// event listener for snooze alarm button
document.getElementById("snoozeAlarm").addEventListener("click", function () {
  snoozeAlarm();
});

// update clock every second
setInterval(updateTime, 1000);

