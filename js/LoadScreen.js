document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const content = document.getElementById('content');
    const percentage = document.getElementById('percentage');

    let load = 0;
    const interval = setInterval(() => {
        load++;
        percentage.textContent = `${load}%`;

        if (load === 100) {
            clearInterval(interval);
            loadingScreen.style.opacity = 0;
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                content.style.display = 'block';
                document.body.style.overflow = 'auto';
            }, 500); // Затримка для плавного зникнення
        }
    }, 30); // Час між збільшенням на 1%
});