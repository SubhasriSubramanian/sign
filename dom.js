/* ===============================
   CAMERA + SIGN SIMULATION LOGIC
================================ */

const camera = document.getElementById('camera');
const startCameraBtn = document.getElementById('start-camera-btn');
const scanBtn = document.getElementById('scan-btn');
const cameraEmotion = document.getElementById('camera-emotion');
const cameraText = document.getElementById('camera-text');
const cameraSignOutput = document.getElementById('camera-sign-output');

let streamStarted = false;

// Start Camera
startCameraBtn.addEventListener('click', async () => {
    if (streamStarted) return;

    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        camera.srcObject = stream;
        streamStarted = true;
    } catch (err) {
        alert("Camera access denied.");
    }
});

// Scan Frame (SIMULATED AI)
scanBtn.addEventListener('click', () => {
    cameraSignOutput.innerHTML = '';

    /* -----------------------------
       SIMULATED DETECTION LOGIC
       (Replace with ML later)
    ------------------------------ */

    const emotions = ["Happy 😄", "Neutral 👤"];
    const signs = ["HELLO", "THANK YOU"];

    const detectedEmotion = emotions[Math.floor(Math.random() * emotions.length)];
    const detectedSign = signs[Math.floor(Math.random() * signs.length)];

    // CASE 1: Deaf person HAPPY → show symbol
    if (detectedEmotion.includes("Happy")) {
        cameraEmotion.textContent = detectedEmotion;
        cameraText.textContent = "—";

        const img = document.createElement('img');
        img.src = ASL_IMAGE_PATHS["H"];
        img.onerror = () => img.src = getFallbackUrl("H");
        cameraSignOutput.appendChild(img);
    }

    // CASE 2: Deaf person shows sign → show text
    else {
        cameraEmotion.textContent = detectedEmotion;
        cameraText.textContent = detectedSign;

        simulateCameraFingerspelling(detectedSign);
    }
});

// Display sign letters from camera
function simulateCameraFingerspelling(word) {
    const letters = word.split('');
    letters.forEach(letter => {
        const img = document.createElement('img');
        img.src = ASL_IMAGE_PATHS[letter];
        img.onerror = () => img.src = getFallbackUrl(letter);
        cameraSignOutput.appendChild(img);
    });
}
// ================= CAMERA MODULE =================

const cameraFeed = document.getElementById("camera-feed");
const startCameraBtn = document.getElementById("start-camera-btn");
const scanCameraBtn = document.getElementById("scan-camera-btn");
const cameraEmotionOutput = document.getElementById("camera-emotion-output");
const cameraTextOutput = document.getElementById("camera-text-output");
const cameraSignOutput = document.getElementById("camera-sign-output");

// SAFETY CHECK (very important)
if (cameraFeed && startCameraBtn && scanCameraBtn) {

  let cameraStream = null;

  startCameraBtn.addEventListener("click", async () => {
    try {
      cameraStream = await navigator.mediaDevices.getUserMedia({ video: true });
      cameraFeed.srcObject = cameraStream;
    } catch (err) {
      alert("Camera access denied or not available.");
    }
  });

  scanCameraBtn.addEventListener("click", () => {
    // 🔴 DEMO LOGIC (simulation – no AI model)
    const demoResults = [
      { emotion: "Happy 😄", sign: "HAPPY" },
      { emotion: "Sad 😢", sign: "SAD" },
      { emotion: "Angry 😠", sign: "ANGRY" },
      { emotion: "Neutral 👤", sign: "HELLO" }
    ];

    const result = demoResults[Math.floor(Math.random() * demoResults.length)];

    cameraEmotionOutput.textContent = result.emotion;
    cameraTextOutput.textContent = result.sign;

    // Show sign images
    cameraSignOutput.innerHTML = "";
    const letters = result.sign.split("");

    letters.forEach(letter => {
      const img = document.createElement("img");
      img.src = `images/${letter}.png`;
      img.alt = letter;
      img.style.width = "70px";
      img.style.margin = "5px";

      img.onerror = function () {
        this.src = `https://placehold.co/70x70/0056b3/ffffff?text=${letter}`;
      };

      cameraSignOutput.appendChild(img);
    });
  });
}

