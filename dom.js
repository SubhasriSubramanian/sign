/* ===============================
   CAMERA-BASED SIGN & EMOTION DEMO
   (SIMULATED – AI READY)
================================ */

const cameraFeed = document.getElementById("camera-feed");
const startCameraBtn = document.getElementById("start-camera-btn");
const scanCameraBtn = document.getElementById("scan-camera-btn");
const cameraEmotionOutput = document.getElementById("camera-emotion-output");
const cameraTextOutput = document.getElementById("camera-text-output");
const cameraSignOutput = document.getElementById("camera-sign-output");

// SAFETY CHECK – prevents JS crash
if (
  cameraFeed &&
  startCameraBtn &&
  scanCameraBtn &&
  cameraEmotionOutput &&
  cameraTextOutput &&
  cameraSignOutput
) {
  let cameraStreamStarted = false;

  // ▶ START CAMERA
  startCameraBtn.addEventListener("click", async () => {
    if (cameraStreamStarted) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      cameraFeed.srcObject = stream;
      cameraStreamStarted = true;
    } catch (err) {
      alert("Camera permission denied or not supported.");
    }
  });

  // 🔍 ANALYZE CAMERA (SIMULATION)
  scanCameraBtn.addEventListener("click", () => {
    cameraSignOutput.innerHTML = "";

    /* ---- SIMULATED AI OUTPUT ---- */
    const samples = [
      { emotion: "Happy 😄", sign: "HAPPY", mode: "emotion" },
      { emotion: "Neutral 👤", sign: "HELLO", mode: "sign" },
      { emotion: "Neutral 👤", sign: "THANKYOU", mode: "sign" }
    ];

    const result = samples[Math.floor(Math.random() * samples.length)];

    cameraEmotionOutput.textContent = result.emotion;

    // CASE 1: Deaf person HAPPY → show symbol
    if (result.mode === "emotion") {
      cameraTextOutput.textContent = "—";

      showCameraSigns("HAPPY");
    }

    // CASE 2: Deaf person shows SIGN → show TEXT
    else {
      cameraTextOutput.textContent = result.sign;

      showCameraSigns(result.sign);
    }
  });

  // DISPLAY SIGN LETTERS
  function showCameraSigns(word) {
    const letters = word.split("");

    letters.forEach(letter => {
      const img = document.createElement("img");
      img.src = ASL_IMAGE_PATHS[letter] || getFallbackUrl(letter);
      img.alt = letter;
      img.style.width = "70px";
      img.style.margin = "5px";

      img.onerror = function () {
        this.src = getFallbackUrl(letter);
      };

      cameraSignOutput.appendChild(img);
    });
  }
}


