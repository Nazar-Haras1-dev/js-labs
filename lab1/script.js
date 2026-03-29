const titleElement = document.querySelector('h1');
titleElement.innerText = 'Hello world!';

function showNameWarning() {
    console.warn('Назарій Гарас');
}

const actionButton = document.querySelector('button');

actionButton.onmousemove = showNameWarning;