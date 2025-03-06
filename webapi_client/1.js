//Так, існують різні підходи для роботи з функціями між файлами в JavaScript. 
// Все залежить від середовища розробки та способу підключення скриптів.

////1. Підхід через глобальні функції (без імпорту)
//Якщо не використовувати модулі (import/export), можна підключати скрипти 
// звичайним способом через <script> у HTML і робити функції доступними глобально.

//Приклад
//animations.js
//javascript
//Копировать
//Редактировать

function wavePaw(times = 3, interval = 500) {
    console.log(`Лапка махне ${times} разів.`);
}

function startDynamicTalkingAnimation() {
    console.log("Запущена анімація розмови.");
}

// Робимо функції глобальними
window.wavePaw = wavePaw;
window.startDynamicTalkingAnimation = startDynamicTalkingAnimation;

// index.js
// javascript
// Копировать
// Редактировать

if (text.includes("👋")) wavePaw(3, 300);
if (text.includes("🕺")) startDynamicTalkingAnimation();

// index.html
// html
// Копировать
// Редактировать

// script src="animations.js"></script
// script src="index.js"></script

// Як це працює:
// Функції у файлі animations.js оголошуються глобально через window.wavePaw.
// index.js звертається до цих функцій без імпорту, бо вони вже глобально доступні.
// Коли використовувати
// Якщо ваш проєкт простий і не використовує модульну систему.
// Коли важливо зберігати сумісність із старими браузерами.
// 2. Через Події DOM
// Замість прямих викликів функцій можна додавати слухачі подій у різних скриптах.

// Приклад
// animations.js
// javascript
// Копировать
// Редактировать

document.addEventListener('wavePawEvent', () => wavePaw(3, 300));
document.addEventListener('talkingEvent', startDynamicTalkingAnimation);

// index.js
// javascript
// Копировать
// Редактировать

if (text.includes("👋")) document.dispatchEvent(new Event('wavePawEvent'));
if (text.includes("🕺")) document.dispatchEvent(new Event('talkingEvent'));

// Що краще обрати?
// Для сучасних проектів: Використовуйте import/export.
// Для простих проектів: Підхід із глобальними функціями (window).
// Для асинхронності та розширюваності: Використовуйте події DOM.
// Якщо вам потрібна простота та сумісність, глобальні функції або події можуть бути ідеальними.