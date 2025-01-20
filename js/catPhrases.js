const phrases = [
    "Час перевірити, чи все на своїх місцях.", 
    "Я спокійний, але спостерігаю за всім.", 
    "Година тиші, не турбуйте мене.", 
    "Мій хвіст завжди в русі.", 
    "Чую звук, цікаво, що це?", 
    "Це місце виглядає зручним для відпочинку."
];

saySomethingButton.addEventListener('click', () => {
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    speechBubble.textContent = randomPhrase;
    speechBubble.style.display = 'block';

    setTimeout(() => {
        speechBubble.style.display = 'none';
    }, 10000); // Показ фразы на 3 секунды
});