// Вибір елемента навбару
const navbar = document.querySelector('nav');

// Початковий стан навбару (відключений)
navbar.style.display = 'none';

// Функція для увімкнення/вимкнення навбару
function toggleNavbar() {
    if (navbar.style.display === 'none') {
        navbar.style.display = 'flex'; // Увімкнути навбар
    } else {
        navbar.style.display = 'none'; // Вимкнути навбар
    }
}
// Приклад використання: додаємо слухач подій на кнопку
const toggleButton = document.querySelector('#toggle-navbar-button'); // Кнопка для перемикання
if (toggleButton) {
    toggleButton.addEventListener('click', toggleNavbar);
}