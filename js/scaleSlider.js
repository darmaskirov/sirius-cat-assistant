  // Отримуємо посилання на повзунок та контейнер
  const scaleSlider = document.getElementById('scaleSlider');
  const catContainer = document.querySelector('.cat-container');

  // Додаємо обробник події 'input'
  scaleSlider.addEventListener('input', () => {
    // Зчитуємо поточне значення з повзунка
    const scaleValue = scaleSlider.value;
    // Змінюємо CSS-трансформацію контейнера кота
    catContainer.style.transform = `scale(${scaleValue})`;
  });