function createPalette(size) {
    paletteList.innerHTML = ''; 
    for (let i = 0; i < size; i++) {
        const item = document.createElement('li');
        const button = document.createElement('button');
        button.className = 'paletteColor';
        const color = generarColorAleatorio();
        button.style.backgroundColor = color;
        const code = document.createElement('span');
        code.className = 'colorCode';
        code.textContent = color;
        button.appendChild(code);
        item.appendChild(button);
        paletteList.appendChild(item);
    }
}

function generarColorAleatorio() {
    if (colorFormat.value === 'rgba') {
        return `rgba(${numeroAleatorio(0, 255)}, ${numeroAleatorio(0, 255)}, ${numeroAleatorio(0, 255)}, 1)`;
    }
    return `hsl(${numeroAleatorio(0, 360)}, ${numeroAleatorio(50, 100)}%, ${numeroAleatorio(40, 60)}%)`;
}

function numeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

generatePalette.addEventListener('click', () => {
    createPalette(Number(paletteSize.value));
});

createPalette(Number(paletteSize.value));