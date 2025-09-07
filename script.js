const timerbox = document.getElementsByClassName("timerbox")[0];
const motivationpanel = document.getElementsByClassName("motivationpanel")[0];
const timerhead = document.getElementsByClassName("timerhead")[0];
const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");
const streakpanel = document.getElementsByClassName("streakpanel")[0];
const streakupdate = document.getElementsByClassName("streakupdate")[0];
const timerpanel = document.getElementsByClassName("timerpanel")[0];
const timeDisplay = document.getElementById("timedisplay");
const Pomodorobtn = document.getElementById("Pomodorobtn");
const Shortbtn = document.getElementById("Shortbtn");
const Longbtn = document.getElementById("Longbtn");
const inputBox = document.getElementById("inputBox");
const noteBox = document.getElementById("noteBox");
const listContainer = document.getElementById("listContainer");
const noteslistContainer = document.getElementById("noteslistContainer");
const alarmSound = document.getElementById("alarmSound");



let timeleft = 1500;
let interval;

// updates timer //
const updatetimer = () => {
    const minutes = Math.floor(timeleft / 60);
    const seconds = timeleft % 60;

    timeDisplay.textContent = `${minutes.toString().padStart(2, "0")} : ${seconds.toString().padStart(2, "0")}`;

};

let streakCount = 0;
const streakEmoji = "🎯";

// starts timer //
const startTimer = () => {
    if (interval) return;
    interval = setInterval(() => {
        timeleft--;
        updatetimer();

        if (timeleft === 0) {
            clearInterval(interval);
            interval = null;
           // alert("Times up !");
            alarmSound.play();
            document.getElementById("Stop-btn").style.display = "flex" ;
            document.querySelector(".timerbox").classList.add("show-stop");
            streakCount++ ;
            streakupdate.textContent = streakEmoji.repeat(streakCount);

            timeleft = 1500;
            updatetimer();

        }
    }, 1000);
    timeDisplay.classList.remove("blink");
};

document.getElementById("Stop-btn").addEventListener("click" , ()=> {
    alarmSound.pause();
    alarmSound.currentTime=0;
    document.getElementById("Stop-btn").style.display = "none" ;
    document.querySelector(".timerbox").classList.remove("show-stop");
})

// stops timer //

const stopTimer = () => {
    clearInterval(interval);
    interval = null;
    timeDisplay.classList.add("blink");

};
// Reset timer //
const resetTimer = () => {
    clearInterval(interval);

    streakCount= 0;
    streakupdate.textContent= " ";
    timeleft = 1500;
    updatetimer();
    timeDisplay.classList.remove("blink");
};
// pomodoro button //
Pomodorobtn.addEventListener("click", () => {
 clearInterval(interval);
 timeleft=1500;
 updatetimer();
});

// short break button //
Shortbtn.addEventListener("click", () => {
 clearInterval(interval);
 timeleft=300;
 updatetimer();
});

// long break button //
Longbtn.addEventListener("click", () => {
 clearInterval(interval);
 timeleft=900;
 updatetimer();
});

const motivationQuotes = [
    "Stay focused. You're doing great!",
    "One step at a time!",
    "Keep pushing forward!",
    "Small progress is still progress.",
];

// Generate random Quotes //
const showrandomQuote = () => {
const randomQuote = motivationQuotes[Math.floor(Math.random() * motivationQuotes.length )];
 motivationpanel.textContent = randomQuote ;
}

start.addEventListener("click", startTimer);
stop.addEventListener("click", stopTimer);
reset.addEventListener("click", resetTimer);
updatetimer();
showrandomQuote();

// Adds Tasks //
function addTask() {
    if(inputBox.value === " "){
        alert("Please write something");
    }
    else{
        let li= document.createElement("li");
        li.innerHTML = inputBox.value ;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value=" ";
    savetaskData();
}

// Adds Notes //
function addNote() {
    if(noteBox.value === " "){
        alert("Please write something");
    }
    else{
        let li= document.createElement("li");
        li.innerHTML = noteBox.value ;
        noteslistContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    noteBox.value=" ";
    savenotesData();
}

listContainer.addEventListener("click", function (e){
    if( e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        savetaskData();
    }
    else if( e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        savetaskData();
    }
},false );


noteslistContainer.addEventListener("click", function (e){
    if( e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        savenotesData();
    }
    else if( e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        savenotesData();
    }
},false );

function savetaskData() {
    localStorage.setItem("task", listContainer.innerHTML);
}

// Stores task in local storage //
function showTask() {
    listContainer.innerHTML = localStorage.getItem("task") || "" ;
}

function savenotesData() {
    localStorage.setItem("notes", noteslistContainer.innerHTML);
}

// Stores notes in local storage //
function showNote() {
    noteslistContainer.innerHTML = localStorage.getItem("notes") || "";
}
showTask();

showNote();
