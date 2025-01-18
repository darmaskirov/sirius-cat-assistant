// Скрипт для взаимодействия с котом
const body = document.body;
const catContainer = document.getElementById('cat-container');
const eyes = document.querySelectorAll('.eye');
const pupils = document.querySelectorAll('.pupil');
const talkButton = document.getElementById('talk-button');
const animationButton = document.getElementById('animation-button');
const bgButtons = document.querySelectorAll('.bg-button');
const styleButtons = document.querySelectorAll('.style-buttons-container .action-button');
// Получаем элементы лапки и кнопки
const paw = document.getElementById("paw");
const showPawButton = document.getElementById("showPawButton");

// Добавляем обработчик события на кнопку
showPawButton.addEventListener("click", () => {
    // Показываем лапку
    paw.style.display = "block";

    // Устанавливаем таймер на 10 секунд для скрытия лапки
    setTimeout(() => {
        paw.style.display = "none";
    }, 3000); // 10000 миллисекунд = 10 секунд
});

styleButtons.forEach(button => {
    button.addEventListener('click', () => {
        const styleClass = button.getAttribute('data-style');
        document.body.className = styleClass; // Устанавливаем стиль для body
    });
});

const phrases = [
    "Привет, друг!", 
    "Как у тебя дела?", 
    "Муррр, я счастлив!", 
    "Смотри, какая классная погода!", 
    "АХАХАХАХАХАХАХХА!", 
    "Я КОТ ЧТОООО???!"
];

const saySomethingButton = document.getElementById('say-something-button');
const speechBubble = document.querySelector('.speech-bubble');

saySomethingButton.addEventListener('click', () => {
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    speechBubble.textContent = randomPhrase;
    speechBubble.style.display = 'block';

    setTimeout(() => {
        speechBubble.style.display = 'none';
    }, 10000); // Показ фразы на 3 секунды
});

// Указываем версию сайта, тайтл и ссылку на иконку
const version = "v1.2.5";
const siteTitle = "SiriusCat";
const faviconURL = "https://cdn-icons-png.flaticon.com/512/25/25694.png"; // Ссылка на иконку кота

// Устанавливаем версию на странице
const versionContainer = document.getElementById('site-version');
if (versionContainer) {
    versionContainer.textContent = `Версия: ${version}`;
}

// Устанавливаем тайтл сайта
document.title = `${siteTitle} (${version})`;

// Устанавливаем иконку сайта
const favicon = document.createElement('link');
favicon.rel = 'icon';
favicon.href = faviconURL;
document.head.appendChild(favicon);


// Функция для запуска разговора
function startTalking() {
    catContainer.classList.add('talking');
    setTimeout(() => {
        catContainer.classList.remove('talking'); // Останавливаем анимацию через 10 секунд
    }, 20000); // Продолжительность 10 секунд
}

// Привязываем функцию к кнопке "Разговаривать"
document.getElementById('talk-button').addEventListener('click', startTalking);

function showSpeechBubble() {
    speechBubble.style.display = 'block';
    setTimeout(() => {
        speechBubble.style.display = 'none';
    }, 2000); // Убираем через 2 секунды
}

catContainer.addEventListener('click', showSpeechBubble);

// Обработка клика по кнопке
bgButtons.forEach(button => {
    button.addEventListener('click', () => {
        const gradientClass = button.getAttribute('data-bg'); // Получаем имя градиента
        body.className = gradientClass; // Устанавливаем соответствующий класс на body
    });
});

// Обработка клика для смены состояния рта
catContainer.addEventListener('click', () => {
    catContainer.classList.toggle('active'); // Переключаем между закрытым и улыбающимся состоянием
});


// Обработка движения зрачков
document.addEventListener('mousemove', (event) => {
    const rect = catContainer.getBoundingClientRect();
    const eyeCenterX = rect.width / 2;
    const eyeCenterY = rect.height / 2;

    // Получаем координаты курсора
    const offsetX = Math.min(Math.max(event.clientX - rect.left - eyeCenterX, -10), 10);
    const offsetY = Math.min(Math.max(event.clientY - rect.top - eyeCenterY, -10), 10);

    // Применяем смещение к зрачкам
    pupils.forEach(pupil => {
        pupil.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))`;
    });
});

// Обработка мобильных устройств (замена движения глаз анимацией)
if ('ontouchstart' in window) {
    pupils.forEach(pupil => {
        pupil.style.animation = 'pupilMove 3s infinite';
    });
}

// Анимация появления речи
catContainer.addEventListener('click', () => {
    catContainer.classList.toggle('active');
    setTimeout(() => {
        catContainer.classList.remove('active');
    }, 2000);
});


// Обработка кнопки "Говорити"
const button = document.querySelector('button');
button.addEventListener('click', () => {
    catContainer.classList.add('active');
    setTimeout(() => {
        catContainer.classList.remove('active');
    }, 2000);
});

// Активация разговора
talkButton.addEventListener('click', () => {
    const speechBubble = document.querySelector('.speech-bubble');
    speechBubble.style.display = 'block';
    setTimeout(() => {
        speechBubble.style.display = 'none';
    }, 2000); // Убираем пузырь через 2 секунды
});

// Активация второй анимации
animationButton.addEventListener('click', () => {
    const cat = document.querySelector('.cat');
    cat.classList.add('second-animation');
    setTimeout(() => {
        cat.classList.remove('second-animation');
    }, 2000); // Сбрасываем анимацию через 2 секунды
});

// Функция для активации анимации рта с боковым сужением
function startDynamicTalkingAnimation() {
    const cat = document.querySelector('.cat');
    cat.classList.add('talking');

    // Удаляем класс "talking" через 3 секунды, чтобы остановить анимацию
    setTimeout(() => {
        cat.classList.remove('talking');
    }, 3000);
}

// Привязываем функцию к кнопке "Разговаривать"
document.getElementById('talk-button').addEventListener('click', startDynamicTalkingAnimation);


// Получаем элемент иконки
const themeIcon = document.getElementById('theme-icon');

// Установка начальной темы
let isDarkMode = true;

// Функция переключения темы
themeIcon.addEventListener('click', () => {
    if (isDarkMode) {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
        themeIcon.src = "https://cdn-icons-png.flaticon.com/512/869/869853.png"; // Иконка луны для светлой темы
    } else {
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
        themeIcon.src = "https://cdn-icons-png.flaticon.com/512/869/869869.png"; // Иконка солнца для тёмной темы
    }
    isDarkMode = !isDarkMode; // Переключаем состояние
});