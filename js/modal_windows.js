document.addEventListener("DOMContentLoaded", function() {
    const modal = document.querySelector(".modal");
    const overlay = document.querySelector(".modal-overlay");

    // Показуємо модальне вікно після завантаження сторінки
    modal.style.display = "block";
    overlay.style.display = "block";

    // Закриваємо модальне вікно при кліку на фон
    overlay.addEventListener("click", function() {
        modal.style.display = "none";
        overlay.style.display = "none";
    });
});