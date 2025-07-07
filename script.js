 const allTranslations = {
   start: [
     { english: "Can I have your license", chinese: "我可以看一下你的驾照吗？" },
     { english: "Please verify your name and date of birth", chinese: "请核对您的姓名和出生日期。" },
     { english: "Please start your vehicle", chinese: "请启动您的车辆。" },
     { english: "We're going to start with a quick vehicle check.", chinese: "我们先做一个简短的车辆检查。" },
     { english: "Can you please turn on your left signal", chinese: "你能打开左转灯吗？" },
     { english: "Can you please turn on your right signal", chinese: "你能打开右转向灯吗？" },
     { english: "Press your brake on and off", chinese: "踩下和松开刹车。" },
     { english: "Press the horn, please", chinese: "请按喇叭。" }
   ],
   mid: [
     { english: "At the next traffic light, turn left.", chinese: "在下一个红绿灯处左转。" },
     { english: "At the next traffic light, turn right.", chinese: "在下一个红绿灯处右转。" },
     { english: "At the stop sign turn left.", chinese: "在停牌标志处左转。" },
     { english: "Change lanes when safe right.", chinese: "安全时变道到右。" },
     { english: "Please merge onto the highway when it's safe.", chinese: "请在安全的情况下并入高速公路。" },
     { english: "The speed limit here is 100 kilometers per hour", chinese: "这里的限速是每公里100小时" },
     { english: "Take the next exit", chinese: "从下一个出口出去。" },

     { english: "Pull over to the curb", chinese: "靠路边停车。" },
     { english: "Stop the car here", chinese: "把车停在这里。" },
     { english: "stay in this lane", chinese: "留在这条线上行驶" },
     { english: "Parallel parking", chinese: "平行停车" },
     { english: "Uphill parking", chinese: "上坡停车" },
     { english: "Downhill parking", chinese: "下坡停车" },
     { english: "Three point turn", chinese: "三点转弯" },
     { english: "slow down", chinese: "减速。" },
     { english: "Emergency Stop", chinese: "紧急停车" },
     { english: "Back in", chinese: "尾进。" },
     { english: "Head in", chinese: "头进" },
     { english: "At the traffic light, turn left", chinese: "在交通处左转" },
     { english: "When it is safe, lane change to the left and then back to the right", chinese: "安全时，向左变道，然后再回到右侧" }
   ],
   end: [
     { english: "Congratulations, you have met ministry standards.", chinese: "恭喜，您已达到了路考的标准/通过。" }
   ]
 };


document.querySelectorAll(".module").forEach(module => {
  const section = module.getAttribute("data-section");
  const translations = allTranslations[section];
  let index = 0;

  const englishText = document.createElement("textarea");
  const chineseText = document.createElement("textarea");
  englishText.readOnly = true;
  chineseText.readOnly = true;

  const btnGroup = document.createElement("div");
  btnGroup.className = "button-group";

  const startBtn = document.createElement("button");
  startBtn.className = "start-btn";
  startBtn.textContent = "Start/开始";

  const nextBtn = document.createElement("button");
  nextBtn.className = "next-btn";
  nextBtn.textContent = "Next/下一个";
  nextBtn.disabled = true;

  const repeatBtn = document.createElement("button");
  repeatBtn.className = "repeat-btn";
  repeatBtn.textContent = "🔁 Repeat/重复";
  repeatBtn.disabled = true;

  btnGroup.append(startBtn, nextBtn, repeatBtn);
  module.append(englishText, chineseText, btnGroup);

  function showTranslation() {
    const item = translations[index];
    englishText.value = item.english;
    chineseText.value = item.chinese;
    playAudio(item.english);
  }

  function playAudio(text) {
    if (!text) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.8;

    // Disable Next while audio plays
    nextBtn.disabled = true;

    utterance.onend = () => {
      nextBtn.disabled = false;
    };

    speechSynthesis.speak(utterance);
  }

  // Event: Start
  startBtn.addEventListener("click", () => {
    index = 0;
    showTranslation();
    repeatBtn.disabled = false;
    startBtn.disabled = true;
  });

  // Event: Next
  nextBtn.addEventListener("click", () => {
    index++;
    if (index < translations.length) {
      showTranslation();
    } else {
      englishText.value = "All instructions shown.";
      chineseText.value = "所有指令已显示。";
      nextBtn.disabled = true;
      repeatBtn.disabled = true;
      startBtn.disabled = false;

      // Reveal next section
      const allModules = Array.from(document.querySelectorAll(".module"));
      const currentModuleIndex = allModules.indexOf(module);
      const nextModule = allModules[currentModuleIndex + 1];

      if (nextModule) {
        const nextSection = nextModule.parentElement;
        nextSection.classList.remove("hidden");

        setTimeout(() => {
          nextSection.scrollIntoView({ behavior: "smooth" });

          const nextStartBtn = nextModule.querySelector(".start-btn");
          if (nextStartBtn) {
            setTimeout(() => nextStartBtn.click(), 1000);
          }
        }, 1000);
      }
    }
  });

  // Event: Repeat
  repeatBtn.addEventListener("click", () => {
    const current = translations[index];
    if (current) {
      playAudio(current.english);
    }
  });
});
