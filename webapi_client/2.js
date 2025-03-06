// Так, ви можете замінити подію кнопки на перевірку тексту, як у вашому випадку з if (text.includes("👋")). 
// Давайте я запропоную універсальний підхід для "підключення" анімацій 
// на основі голосових команд без глибокого втручання в код іншої людини.

// Структура Підключення
// Імпорт анімацій: Підключіть файл із анімаціями (наприклад, animations.js).
// Функція-посередник: Створіть функцію triggerAnimation(), яка просто викликатиме відповідну анімацію.
// Прив'язка до голосових команд: Перевіряйте ключові слова у тексті й запускайте відповідну анімацію.

// Приклад Імплементації
// animations.js
// javascript
// Копировать
// Редактировать

export function wavePaw(times = 3, interval = 500) {
    const paw = document.getElementById('paw');
    if (!paw) return;

    paw.style.display = "block";
    let waveCount = 0;

    const waveInterval = setInterval(() => {
        paw.style.display = paw.style.display === "block" ? "none" : "block";
        waveCount++;
        if (waveCount >= times * 2) {
            clearInterval(waveInterval);
            paw.style.display = "none";
        }
    }, interval);
}

export function startDynamicTalkingAnimation() {
    const cat = document.querySelector('.cat');
    if (!cat) return;

    cat.classList.add('talking');
    setTimeout(() => {
        cat.classList.remove('talking');
    }, 3000);
}
// index.js
// javascript
// Копировать
// Редактировать
import { wavePaw, startDynamicTalkingAnimation } from './animations.js';

function triggerAnimation(text) {
    if (text.includes("👋")) wavePaw(3, 300);
    if (text.includes("🕺")) startDynamicTalkingAnimation();
}

// Симуляція голосової команди
const voiceCommand = "Привіт! 👋";
triggerAnimation(voiceCommand);