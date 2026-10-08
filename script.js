function playSound(fileName) {
    const audio = new Audio("audio/" + fileName);
    audio.play();
}
function checkAnswer(isCorrect) {
    const result = document.getElementById("quiz-result");
    const celebration = document.getElementById("celebration");

    if (isCorrect) {
         score++;
    document.getElementById("score-display").textContent =
        "⭐ " + score + " Correct";
        const correctSound = new Audio("audio/correct.mp3");
correctSound.play();
        result.textContent = "Correct! 🎉";
        result.className = "correct-answer";

        celebration.textContent = "⭐ 🎉 ⭐ 🎊 ⭐";
        celebration.className = "celebrate";
    

      setTimeout(() => {
    celebration.textContent = "";
    celebration.className = "";
    result.textContent = "";
    result.className = "";

    if (score >= 6) {
        document.querySelector(".quiz-question").style.display = "none";
        document.querySelector(".quiz-options").style.display = "none";
        document.getElementById("game-complete").style.display = "block";
    } else {
        newQuestion();
    }

}, 2000);

    } else {const wrongSound = new Audio("audio/wrong.mp3");
wrongSound.play();
        result.textContent = "Try again!";
        result.className = "wrong-answer";

        celebration.textContent = "";
        celebration.className = "";
    }
}
const quizAnimals = [
    {
        mandinka: "Baa",
        english: "goat",
        image: "images/goat.png"
    },
    {
        mandinka: "Nyingso",
        english: "cow",
        image: "images/cow.png"
    },
    {
        mandinka: "Sajiyo",
        english: "sheep",
        image: "images/sheep.png"
    },
    {
        mandinka: "Sisewo",
        english: "chicken",
        image: "images/chicken.png"
    },
    {
        mandinka: "Nyankumo",
        english: "cat",
        image: "images/cat.png"
    },
    {
        mandinka: "Falo",
        english: "donkey",
        image: "images/donkey.png"
    }
];
let currentAnimal;
let previousAnimal;
let score = 0;

function newQuestion() {
    // Choose one animal randomly
    do {
    currentAnimal =
        quizAnimals[Math.floor(Math.random() * quizAnimals.length)];
} while (currentAnimal === previousAnimal);

previousAnimal = currentAnimal;

    // Change the question
    document.getElementById("question-mandinka").textContent =
        currentAnimal.mandinka + " be minto le?";

    document.getElementById("question-english").textContent =
        "Where is the " + currentAnimal.english + "?";

    // Pick two wrong animals
    const wrongAnimals = quizAnimals
        .filter(animal => animal !== currentAnimal)
        .sort(() => Math.random() - 0.5)
        .slice(0, 2);

    // Put correct + wrong answers together
    const choices = [currentAnimal, ...wrongAnimals]
        .sort(() => Math.random() - 0.5);

    // Put them into the 3 buttons
    choices.forEach((animal, index) => {
        const button = document.getElementById("option-" + (index + 1));
        const image = document.getElementById("option-img-" + (index + 1));

        image.src = animal.image;
        image.alt = animal.english;

        button.onclick = function () {
            checkAnswer(animal === currentAnimal);
        };
    });
}

if (document.getElementById("question-mandinka")) {
    newQuestion();
}
function restartGame() {
    score = 0;

    document.getElementById("score-display").textContent = "⭐ 0 Correct";

    document.getElementById("game-complete").style.display = "none";

    document.querySelector(".quiz-question").style.display = "";
    document.querySelector(".quiz-options").style.display = "";

    previousAnimal = null;

    newQuestion();
}

// GAMKIDS SPEAKING GAME

const recordButton = document.getElementById("recordButton");
const playRecordingButton =
    document.getElementById("playRecordingButton");
const recordingMessage =
    document.getElementById("recordingMessage");

if (recordButton && playRecordingButton) {
    let mediaRecorder;
    let audioChunks = [];
    let recordedAudioURL;
window.clearSpeakingRecording = function () {
    if (recordedAudioURL) {
        URL.revokeObjectURL(recordedAudioURL);
        recordedAudioURL = null;
    }

    playRecordingButton.disabled = true;
};
    recordButton.addEventListener("click", async () => {
        if (mediaRecorder && mediaRecorder.state === "recording") {
            mediaRecorder.stop();
           recordButton.textContent = "🔄 Record Again";
            recordingMessage.textContent = "Recording complete!";
            return;
        }

        try {
            const stream =
                await navigator.mediaDevices.getUserMedia({
                    audio: true
                });

            audioChunks = [];
            playRecordingButton.disabled = true;

            mediaRecorder = new MediaRecorder(stream);

            mediaRecorder.ondataavailable = (event) => {
                audioChunks.push(event.data);
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunks, {
                    type: mediaRecorder.mimeType
                });

                if (recordedAudioURL) {
                    URL.revokeObjectURL(recordedAudioURL);
                }

                recordedAudioURL =
                    URL.createObjectURL(audioBlob);

                playRecordingButton.disabled = false;

                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorder.start();

            recordButton.textContent = "⏹ Stop Recording";
            recordingMessage.textContent =
                "Listening... Say Kiling!";
        } catch (error) {
            recordingMessage.textContent =
                "Please allow microphone access.";
        }
    });

   let playbackAudio;

playRecordingButton.addEventListener("click", () => {
    if (!recordedAudioURL) return;

    if (playbackAudio && !playbackAudio.paused) {
        playbackAudio.pause();
        playbackAudio.currentTime = 0;
        playRecordingButton.textContent = "▶️ Listen to My Voice";
        return;
    }

    playbackAudio = new Audio(recordedAudioURL);
    playRecordingButton.textContent = "⏹️ Stop Playback";

    playbackAudio.onended = () => {
        playRecordingButton.textContent = "▶️ Listen to My Voice";
    };

    playbackAudio.play();
});
}

const speakingNumbers = [
    { mandinka: "Kiling", english: "One", audio: "1.m4a" },
    { mandinka: "Fula", english: "Two", audio: "2.m4a" },
    { mandinka: "Saba", english: "Three", audio: "3.m4a" },
    { mandinka: "Nani", english: "Four", audio: "4.m4a" },
    { mandinka: "Lulu", english: "Five", audio: "5.m4a" },
    { mandinka: "Woro", english: "Six", audio: "6.m4a" },
    { mandinka: "Worowula", english: "Seven", audio: "7.m4a" },
    { mandinka: "Sai", english: "Eight", audio: "8.m4a" },
    { mandinka: "Kononto", english: "Nine", audio: "9.m4a" },
    { mandinka: "Tang", english: "Ten", audio: "10.m4a" }
];

let speakingIndex = 0;

function nextSpeakingNumber() {
    speakingIndex++;
window.clearSpeakingRecording?.();
recordButton.textContent = "🎤 Record My Voice";
    if (speakingIndex >= speakingNumbers.length) {
        speakingIndex = 0;
    }
    const number = speakingNumbers[speakingIndex];
    const game = document.querySelector("main");

document.getElementById("speaking-number").textContent = number.mandinka;
document.getElementById("speaking-english").textContent = number.english;
    game.querySelector(".listen-button").onclick = function () {
        playSound(number.audio);
    };
    document.getElementById("recordingMessage").textContent =
        "Listen first, then say " + number.mandinka + "!";
}
const speakingFamily = [
    { mandinka: "Nmaa", english: "Mother", audio: "Mum.m4a" },
    { mandinka: "Baba", english: "Father", audio: "Dad.m4a" },
    { mandinka: "Tata", english: "Older Brother / Sister", audio: "Tata.m4a" },
    { mandinka: "Ndoma", english: "Little Brother / Sister", audio: "Ndoma.m4a" },
    { mandinka: "Mama Muso", english: "Grandmother", audio: "Grandma.m4a" },
    { mandinka: "Mama Ke", english: "Grandfather", audio: "Grandpa.m4a" }
];

let familyIndex = 0;

function nextSpeakingFamily() {
    familyIndex++;

    if (familyIndex >= speakingFamily.length) {
        familyIndex = 0;
    }

    const member = speakingFamily[familyIndex];

  
    document.querySelector(".mandinka-speaking-word").textContent = member.mandinka;
    document.querySelector(".english-speaking-word").textContent = member.english;

    document.querySelector(".listen-button").onclick = function () {
        playSound(member.audio);
    };

    window.clearSpeakingRecording?.();
    document.getElementById("recordButton").textContent = "🎤 Record My Voice";
    document.getElementById("recordingMessage").textContent =
        "Listen first, then say " + member.mandinka + "!";
}
