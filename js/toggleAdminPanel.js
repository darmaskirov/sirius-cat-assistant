const closeAdminPanel = document.querySelector('.all-buttons-container');
const Cat = document.querySelector('.cat');
const Ears = document.querySelector('.ears-container');
const bubble = document.querySelector('.speech-bubble');

closeAdminPanel.style.display = 'flex'; // 1

function closeAdm()
{
    if(closeAdminPanel.style.display === 'none')
    {
        closeAdminPanel.style.display = 'flex';
        Cat.style.top = '45%';
        Ears.style.top = '35%';
        console.log("Ви бачите адмін панель");
    } else {
        closeAdminPanel.style.display = 'none';
        Cat.style.top = '120%';
        Ears.style.top = '115%';
        bubble.style.top = '95%';
        console.log("Адмін панель закрита");
    }
}

const toggleAdmin1 = document.querySelector('#closeAdm');
if(toggleAdmin1)
{
    toggleAdmin1.addEventListener('click', closeAdm);
    console.log("Кнопка закриття спрацювала");
}