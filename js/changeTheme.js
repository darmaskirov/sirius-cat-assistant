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
