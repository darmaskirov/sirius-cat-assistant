// Указываем версию сайта, тайтл и ссылку на иконку
const version = "v1.2.5a";
const siteTitle = "SiriusCat!!";
const faviconURL = "./css/favicons/favicon-1.png"; // Ссылка на иконку кота
const favicon = document.createElement('link');

// Устанавливаем версию на странице
const versionContainer = document.getElementById('site-version');
if (versionContainer) {
    versionContainer.textContent = `Версія: ${version}`;
}

// Устанавливаем тайтл сайта
document.title = `${siteTitle} (${version})`;

// Устанавливаем иконку сайта

favicon.rel = 'icon';
favicon.href = faviconURL;
document.head.appendChild(favicon);