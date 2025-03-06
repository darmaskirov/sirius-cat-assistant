import '../js/catPhrases.js';
import '../js/catStyles.js';
import '../js/changeTheme.js';
import '../js/LoadScreen.js';
import '../js/modal_windows.js';
import '../js/script.js';
import '../js/ToggleNavbar.js';
import '../js/version.js';

let isMicActive = false; // Стан мікрофона
let mediaStream = null;
let recognizerProcessor = null;
let audioContext = null;

async function init() {
    try {
        const resultsContainer = document.getElementById('recognition-result');
        const partialContainer = document.getElementById('partial');
        const ireneMode = document.getElementById('irenemode');

        const channel = new MessageChannel();
        const model = await Vosk.createModel('/webapi_client/model.tar.gz');
        model.registerPort(channel.port1);

        const sampleRate = 48000;

        const recognizer = new model.KaldiRecognizer(sampleRate);
        recognizer.setWords(true);

        recognizer.on("result", (message) => {
            const result = message.result;

            updateRecognitionResult(result.text);

            if (result.text !== "") {
                processServerResponse(result.text, ireneMode.value);
            }
        });

        recognizer.on("partialresult", (message) => {
            partialContainer.textContent = message.result.partial;
        });

        mediaStream = await navigator.mediaDevices.getUserMedia({
            audio: {
                echoCancellation: true,
                noiseSuppression: true,
                channelCount: 1,
            },
        });

        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        await audioContext.audioWorklet.addModule('recognizer-processor.js');
        recognizerProcessor = new AudioWorkletNode(audioContext, 'recognizer-processor', { channelCount: 1 });
        recognizerProcessor.port.postMessage({ action: 'init', recognizerId: recognizer.id }, [channel.port2]);
        recognizerProcessor.connect(audioContext.destination);

        const source = audioContext.createMediaStreamSource(mediaStream);
        source.connect(recognizerProcessor);
    } catch (error) {
        console.error("Помилка ініціалізації мікрофона:", error);
        alert("Не вдалося активувати мікрофон. Перевірте дозволи.");
    }
}

function toggleMic() {
    const trigger = document.getElementById('trigger');

    if (isMicActive) {
        trigger.textContent = "Слухати";
        if (mediaStream) {
            mediaStream.getTracks().forEach(track => track.stop());
        }
        if (audioContext) {
            audioContext.close();
        }
        isMicActive = false;
    } else {
        trigger.textContent = "Вимкнути мікрофон";
        init();
        isMicActive = true;
    }
}

function sanitizeText(input) {
    return input.replace(/[#\w]*|[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}]+/gu, '').trim();
}

async function processServerResponse(text, mode) {
    const sanitizedText = sanitizeText(text);
    const url = `/sendRawTxt?returnFormat=${mode}&rawtxt=${sanitizedText}`;
    console.log("Запит URL:", url);

    try {
        const response = await fetch(url);
        const res = await response.json();

        if ("restxt" in res) {
            console.log("Відповідь сервера:", res.restxt);
            displayTextInDialog(res.restxt);

            if (res.restxt.includes("відміна")) {
                stopAllProcesses();
                return;
            }

            speakTextWithModifications(res.restxt); 
            if (res.restxt.includes("👋")) wavePaw(3, 300); // Лапка махне 5 разів з інтервалом 300 мс
            if (res.restxt.includes("🕺")) wavePaw(3, 300);
            if (res.restxt.includes("😡")) {
                startTalking();
                showMiddleFinger();
            }
        }

        if ("wav_base64" in res) {
            const snd = Sound("data:audio/wav;base64," + res.wav_base64);
        }
    } catch (error) {
        console.error("Помилка запиту до сервера:", error);
    }
}

function stopAllProcesses() {
    speechSynthesis.cancel();
    console.log("Відтворення тексту і голосу зупинено.");
}

function updateRecognitionResult(text) {
    const recognitionResult = document.getElementById('recognition-result');
    recognitionResult.textContent = text;
}

function displayTextInDialog(fullText) {
    const dialogBubble = document.getElementById('comic-dialog');
    const words = fullText.split(' ');
    let index = 0;

    const displayChunk = () => {
        if (index < words.length) {
            const chunk = words.slice(index, index + 6).join(' ');
            dialogBubble.textContent = chunk;
            index += 6;

            setTimeout(displayChunk, 2000);
        }
    };

    displayChunk();
}

async function speakTextWithModifications(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'uk-UA';
    utterance.rate = 1.1;
    utterance.pitch = 0,5;

    speechSynthesis.speak(utterance);

    utterance.onend = async () => {
        console.log("Відтворення завершено");
        startDynamicTalkingAnimation(); // Запуск анімації
    };
}

document.getElementById('trigger').addEventListener('click', () => {
    const utterance = new SpeechSynthesisUtterance("вітаю людино я- котик Ссіріус.");
    utterance.lang = 'uk-UA';
    utterance.rate = 1.1;
    utterance.pitch = 0,5;

    speechSynthesis.speak(utterance);

    utterance.onstart = () => {
        console.log("Відтворення розпочато.");
    };

    utterance.onend = () => {
        console.log("Відтворення завершено.");
    };
});

var Sound = (function () {
    var df = document.createDocumentFragment();
    return function Sound(src) {
        var snd = new Audio(src);
        df.appendChild(snd);
        snd.addEventListener('ended', function () {
            df.removeChild(snd);
        });
        snd.play();
        return snd;
    };
})();



let context, analyser, src, array, audioLevel;
const num = 64; // Кількість точок для аналізу
array = new Uint8Array(num);

window.onload = () => {
    const trigger = document.getElementById('trigger');
    trigger.addEventListener('click', toggleMic);
};

window.onclick = function () {
    if (context) return;

    context = new AudioContext(); // Створюємо новий екземпляр AudioContext
    analyser = context.createAnalyser(); // Аналізатор для звуку

    // Підключаємо мікрофон
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            src = context.createMediaStreamSource(stream);
            src.connect(analyser);
            loop(); // Запускаємо анімацію рота
        })
        .catch(error => {
            alert(error + '\r\n\ Отклонено. Страница будет обновлена!');
            location.reload();
        });
}

function loop() {
    window.requestAnimationFrame(loop);
    analyser.getByteFrequencyData(array);

    let sum = 0;
    for (let i = 0; i < num; i++) {
        sum += array[i]; // Обчислюємо середній рівень звуку
    }

    audioLevel = sum / num;

    // Оновлюємо розмір рота кота залежно від рівня звуку
    updateCatMouth(audioLevel);
}

function updateCatMouth(level) {
    const catMouth = document.getElementById('cat-mouth');
    
    // Змінюємо висоту чи форму рота кота на основі звуку
    const mouthSize = Math.min(30, level / 5); // обмеження на максимальний розмір
    catMouth.style.height = `${10 + mouthSize}px`; // базова висота плюс реакція на звук
}



 
// Додавання кнопки для дублювання свайпу
const swipeButton = document.createElement("button");
swipeButton.textContent = "Свайп спрацював";
Object.assign(swipeButton.style, {
    position: "fixed",
    bottom: "90px",
    left: "10px",
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    zIndex: "1000"
});
document.body.appendChild(swipeButton);

// Обробник для кнопки
swipeButton.addEventListener("click", () => {
    const ireneMode = document.getElementById('irenemode');
    if (ireneMode) {
        console.log(`Кнопка свайп: ireneMode=${ireneMode.value}`);
        processServerResponse2("Сіріус кухня", ireneMode.value); // Виклик функції
    } else {
        console.error("Елемент ireneMode не знайдено!");
    }
});

// Нова функція для обробки відповіді сервера після свайпу
async function processServerResponse2(text, mode) {
    const sanitizedText = sanitizeText(text); // Санітизація тексту
    const url = `/sendRawTxt?returnFormat=${mode}&rawtxt=${sanitizedText}`;
    console.log("Запит URL:", url);

    try {
        const response = await fetch(url); // Асинхронний запит до сервера
        const res = await response.json();

        if ("restxt" in res) {
            console.log("Відповідь сервера:", res.restxt);
            displayTextInDialog(res.restxt); // Відображення тексту у вікні діалогу

            if (res.restxt.includes("відміна")) {
                stopAllProcesses(); // Зупинити всі процеси, якщо є слово "відміна"
                return;
            }

            speakTextWithModifications(res.restxt); // Синтез мови з модифікаціями

            // Виклик функцій на основі відповіді сервера
            if (res.restxt.includes("🕺")) wavePaw(3, 300); // Лапка махне 5 разів з інтервалом 300 мс 
              
            if (res.restxt.includes("😡")) {
                startAngry();
                showMiddleFinger();
            }
        }

        // Відтворення аудіо, якщо є base64
        if ("wav_base64" in res) {
            const snd = Sound("data:audio/wav;base64," + res.wav_base64);
        }
    } catch (error) {
        console.error("Помилка запиту до сервера:", error);
    }
}

// Інтеграція зі свайпом
document.addEventListener("touchstart", (event) => {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
    console.log(`Touchstart: (${touchStartX}, ${touchStartY})`);
});

document.addEventListener("touchend", (event) => {
    touchEndX = event.changedTouches[0].clientX;
    touchEndY = event.changedTouches[0].clientY;
    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;

    console.log(`Touchend: (${touchEndX}, ${touchEndY}), DiffX: ${diffX}, DiffY: ${diffY}`);

    // Перевірка свайпу знизу вгору
    if (Math.abs(diffX) < 50 && diffY < -50) {
        console.log("Свайп знизу вгору розпізнано");
        showSwipeIndicator();

        const ireneMode = document.getElementById('irenemode');
        if (ireneMode) {
            console.log(`ireneMode: ${ireneMode.value}`);
            processServerResponse2("Сіріус кухня", ireneMode.value); // Виклик нової функції
        } else {
            console.error("Елемент ireneMode не знайдено!");
        }
    }
});






