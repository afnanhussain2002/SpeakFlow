const startBtn = document.getElementById("startBtn");
const output = document.getElementById("output");


const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = "en-US";

let isListening = false; // Track if recognition is running

startBtn.addEventListener("click", () => {
    if (isListening) {
        recognition.stop();
        startBtn.textContent = "Start Listening";
    } else {
        recognition.start();
        startBtn.textContent = "Stop Listening";
    }
    isListening = !isListening; // Toggle the state
});

recognition.onresult = (event) => {
    let transcript = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
    }
    output.textContent = transcript;
};

// When recognition stops, reset the button
recognition.onend = () => {
    isListening = false;
    startBtn.textContent = "Start Listening";
};

recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
};
