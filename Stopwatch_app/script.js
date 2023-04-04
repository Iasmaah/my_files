let hours = 0;
let minutes = 0;
let seconds = 0;
let timer = false;
let hours_text = document.querySelector("#hours");
let mins_text = document.querySelector("#mins");
let sec_text = document.querySelector("#sec");
let start_btn = document.querySelector("#start");
let stop_btn = document.querySelector("#stop");
let reset_btn = document.querySelector("#reset");

// make stop button disabled by default
stop_btn.disabled = true;
stop_btn.classList.add("disabled");


// Events listeners
start_btn.addEventListener("click", function () {
    timer = true;
    start_timer();
})

stop_btn.addEventListener("click", function () {
    timer = false;

    start_btn.disabled = false;
    start_btn.innerHTML = "Continue"
    start_btn.classList.remove("disabled");

    stop_btn.disabled = true;
    stop_btn.classList.add("disabled");
})

reset_btn.addEventListener("click", function () {
    timer = false;
    hours = 0;
    minutes = 0;
    seconds = 0;

    hours_text.innerHTML = "00";
    mins_text.innerHTML = "00";
    sec_text.innerHTML = "00";

    start_btn.disabled = false;
    start_btn.classList.remove("disabled");
    start_btn.innerHTML = "Start"

    stop_btn.disabled = true;
    stop_btn.classList.add("disabled");


})

// stop watch function
function start_timer() {

    if (timer) {
        seconds++;

        if (seconds == 60) {
            minutes++;
            seconds = 0;

        }
        if (minutes == 60) {
            hours++;
            minutes = 0;
            second = 0;

        }
        let hrString = hours;
        let minString = minutes;
        let secString = seconds;


        if (hours < 10) {
            hrString = "0" + hrString;
        }

        if (minutes < 10) {
            minString = "0" + minString;
        }

        if (seconds < 10) {
            secString = "0" + secString;
        }

        hours_text.innerHTML = hrString;
        mins_text.innerHTML = minString;
        sec_text.innerHTML = secString;

        start_btn.disabled = true;
        start_btn.classList.add("disabled");

        stop_btn.disabled = false;
        stop_btn.classList.remove("disabled");

        setTimeout(start_timer, 1000);
    }

}

// modes code
let dark_btn = document.querySelector("#dark_btn");
let light_btn = document.querySelector("#light_btn");
let body = document.querySelector("body");

light_btn.addEventListener("click", function () {
    body.style.backgroundColor = "#fff";
    body.style.color = "#000";
    light_btn.classList.add("active");
    dark_btn.classList.remove("active");
})
dark_btn.addEventListener("click", function () {
    body.style.backgroundColor = "#000";
    body.style.color = "#fff";

    light_btn.classList.remove("active");
    dark_btn.classList.add("active");
})