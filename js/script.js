window.addEventListener("load", function () {
  let btnStart = document.querySelector(".btn-start");
  let timerBox = document.querySelector(".timer");
  let btnReset = document.querySelector(".btn-reset");
  let recordBox = document.querySelector(".records");
  function StopWatch() {
    let timer = null;
    let sec = 0,
      min = 0,
      hr = 0,
      ms = 0;

    function updateTime() {
      ms++;
      if (ms > 99) {
        sec++;
        ms = 0;
      }
      if (sec > 59) {
        min++;
        sec = 0;
      }
      if (min > 59) {
        hr++;
        min = 0;
      }

      timerBox.innerHTML =
        formatTime(hr) +
        " : " +
        formatTime(min) +
        " : " +
        formatTime(sec) +
        " : <span>" +
        formatTime(ms) +
        "</span>";
    }
    function formatTime(n) {
      return n < 10 ? "0" + n : n;
    }
    this.isOn = false;
    this.start = function () {
      if (!this.isOn) {
        timer = setInterval(updateTime, 10);
        this.isOn = true;
      }
    };
    this.stop = function () {
      if (this.isOn) {
        clearInterval(timer);
        this.isOn = false;
      }
    };
    this.reset = function () {
      hr = 0;
      min = 0;
      sec = 0;
      ms = 0;
    };
    this.getTime = function (check = false) {
      if (check && hr == 0 && min == 0 && sec === 0) {
        return false;
      }
      return (
        formatTime(hr) +
        " : " +
        formatTime(min) +
        " : " +
        formatTime(sec) +
        " : " +
        formatTime(ms)
      );
    };
  }
  let watch = new StopWatch();
  btnStart.addEventListener("click", function () {
    if (!btnStart.classList.contains("stop")) {
      watch.start();
      btnStart.classList.add("stop");
      btnStart.innerHTML = "Stop";
    } else {
      watch.stop();
      btnStart.classList.remove("stop");
      btnStart.innerHTML = "Start";
      if (watch.getTime(true)) {
        recordBox.innerHTML += "<p>- " + watch.getTime() + "</p>";
      }
    }
  });
  btnReset.addEventListener("click", function () {
    watch.reset();
    timerBox.innerHTML = watch.getTime();
    recordBox.innerHTML = "";
    if (watch.isOn) btnStart.click();
  });
});
