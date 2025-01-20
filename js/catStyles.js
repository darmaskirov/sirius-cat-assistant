// Список стилів для підключення
const catStyles = [
    "./css/cat/cat.css",
    "./css/cat/animations.css",
    "./css/cat/brows.css",
    "./css/cat/ears.css",
    "./css/cat/eyes.css",
    "./css/cat/mouth.css",
    "./css/cat/nose.css",
    "./css/cat/paw.css",
    "./css/cat/response.css",
    "./css/cat/speech-bubble.css",
    "./css/cat/whiskers.css"
];

// Функція для підключення стилів
function loadCatStyles(styles) {
    styles.forEach(style => {
        const link = document.createElement("link"); // Створюємо <link> елемент
        link.rel = "stylesheet"; // Вказуємо, що це таблиця стилів
        link.href = style; // Встановлюємо шлях до CSS-файлу
        document.head.appendChild(link); // Додаємо <link> в <head>
    });
}

// Виклик функції для завантаження стилів
loadCatStyles(catStyles);
