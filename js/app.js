function getTextColor(backgroundColor) {
    const [r, g, b] = backgroundColor.match(/\d+/g).map(Number);
    const brightness = (r + g + b) / 3;
    return brightness < 128 ? '#fff' : '#000';
}

function toHex(n) {
   return n.toString(16).padStart(2, '0');
}

function colorToHex(backgroundColor) {
    const [r, g, b] = backgroundColor.match(/\d+/g).map(Number);
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

function updatePalette(size) {
    for (let i = 0; i < size; i++) {
        if (!palette[i] || !palette[i].locked) {
            palette[i] = { color: generarColorAleatorio(), locked: false };
        }
    }
    palette.length = size;
}

function renderPalette() {
    paletteList.innerHTML = ''; 

    palette.forEach((item, index) => {
        const li = document.createElement('li');

        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'paletteColor';
        button.style.backgroundColor = item.color;
        button.title = 'Click para copiar';

        const lockBtn = document.createElement('button');
        lockBtn.type = 'button';
        lockBtn.className = 'lockButton';
        

        const code = document.createElement('span');
        code.className = 'colorCode';
        code.textContent = item.color;
        
        function updateLockButton() {
            lockBtn.innerHTML = item.locked ? ICON_LOCK : ICON_UNLOCK;
            lockBtn.title = item.locked ? 'Clic para desbloquear' : 'Clic para bloquear';
            lockBtn.setAttribute('aria-pressed', item.locked);
            lockBtn.setAttribute('aria-label',`${item.locked ? 'Desbloquear' : 'Bloquear'} color ${index + 1}`);
        }

        updateLockButton();

        lockBtn.addEventListener('click', () => {
            item.locked = !item.locked;
            updateLockButton();
        });

        button.appendChild(code);
        li.appendChild(button);
        li.appendChild(lockBtn);
        paletteList.appendChild(li);
        button.style.color = getTextColor(getComputedStyle(button).backgroundColor);
        const textColor = getTextColor(getComputedStyle(button).backgroundColor);
        button.style.color = textColor;
        lockBtn.style.color = textColor;
        const hex = colorToHex(getComputedStyle(button).backgroundColor);

        button.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(hex);
                showToast(`¡Color copiado ${hex}!`);
            } catch {
                showToast('No se pudo copiar');
            }
        });

    });
}

function createPalette(size) {
    updatePalette(size);
    renderPalette();
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
    showToast('¡Paleta generada!');
});

const ICON_LOCK = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="currentColor"><path d="M9.44,36.67q-1.15,0-1.96-0.82T6.67,33.89V16.28q0-1.15 0.82-1.96T9.44,13.5h2.5V9.72q0-3.34 2.36-5.7T20,1.67t5.7,2.36t2.35,5.7V13.5h2.5q1.15,0 1.96,0.82t0.82,1.96V33.89q0,1.15-0.82,1.96t-1.96,0.82H9.44Zm0-2.78H30.56V16.28H9.44V33.89ZM22.3,27.39q0.95-0.94 0.95-2.26q0-1.29-0.96-2.3T20,21.83T17.7,22.84t-0.95,2.31t0.96,2.24T20,28.33t2.29-0.94ZM14.72,13.5H25.28V9.72q0-2.2-1.54-3.74T20,4.44T16.26,5.98T14.72,9.72V13.5ZM9.44,33.89V16.28V33.89Z"/></svg>`;

const ICON_UNLOCK = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="currentColor"><path d="M9.44,33.89H30.56V16.28H9.44V33.89ZM22.3,27.39q0.95-0.94 0.95-2.26q0-1.29-0.96-2.3T20,21.83T17.7,22.84t-0.95,2.31t0.96,2.24T20,28.33t2.29-0.94ZM9.44,33.89V16.28V33.89Zm0,2.78q-1.15,0-1.96-0.82T6.67,33.89V16.28q0-1.15 0.82-1.96T9.44,13.5H22.5V9.72q0-3.34 2.36-5.7t5.7-2.36t5.7,2.36t2.35,5.7H35.83q0-2.19-1.54-3.74T30.56,4.44T26.82,5.98T25.28,9.72V13.5h5.28q1.15,0 1.96,0.82t0.82,1.96V33.89q0,1.15-0.82,1.96t-1.96,0.82H9.44Z"/></svg>`;

const ICON_DELETE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="24px" width="24px" fill="#000000"><path d="M7,21q-0.82,0-1.41-0.59T5,19V6H4V4H9V3h6V4h5V6H19V19q0,0.82-0.59,1.41T17,21H7ZM17,6H7V19H17V6ZM9,17h2V8H9v9Zm4,0h2V8H13v9ZM7,6V19V6Z"/></svg>`;

const ICON_VISUALIZE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="24px" width="24px" fill="#000000"><path d="M15.19,14.69q1.31-1.31 1.31-3.19T15.19,8.31T12,7T8.81,8.31T7.5,11.5t1.31,3.19T12,16t3.19-1.31Zm-5.1-1.28Q9.3,12.63 9.3,11.5t0.79-1.91T12,8.8t1.91,0.79q0.79,0.79 0.79,1.91t-0.79,1.91T12,14.2t-1.91-0.79ZM5.35,16.96Q2.35,14.93 1,11.5Q2.35,8.07 5.35,6.04T12,4t6.65,2.04T23,11.5q-1.35,3.42-4.35,5.46T12,19T5.35,16.96ZM12,11.5Zm5.19,4.01q2.36-1.49 3.61-4.01q-1.25-2.53-3.61-4.01T12,6Q9.18,6 6.81,7.49T3.2,11.5q1.25,2.52 3.61,4.01T12,17t5.19-1.49Z"/></svg>`;


let palette = [];

createPalette(Number(paletteSize.value));

const toast = document.getElementById('toast');
let toastTimeout;

function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 1500);
}

const addFavorite = document.getElementById('addFavorite');
const favoritesList = document.getElementById('favoritesList');

let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

function saveFavorites() {
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

function renderFavorites() {
    favoritesList.innerHTML = '';

    favorites.forEach((fav, index) => {
        const li = document.createElement('li');
        li.className = 'favorite';

        const header = document.createElement('div');
        header.className = 'favoriteHeader';

        const title = document.createElement('h4');
        title.className = 'favoriteTitle';
        title.textContent = `Paleta ${index + 1}`;

        const actions = document.createElement('div');
        actions.className = 'favoriteActions';

        const loadBtn = document.createElement('button');
        loadBtn.type = 'button';
        loadBtn.className = 'loadFavorite';
        loadBtn.innerHTML = ICON_VISUALIZE;
        loadBtn.title = 'Cargar paleta';
loadBtn.setAttribute('aria-label', `Cargar paleta`);
        loadBtn.addEventListener('click', () => {
            palette = JSON.parse(JSON.stringify(fav));
            renderPalette();
            showToast('¡Paleta cargada!');
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.type = 'button';
        deleteBtn.className = 'favoriteBtn';
        deleteBtn.innerHTML = ICON_DELETE;
        deleteBtn.title = 'Eliminar paleta';
        deleteBtn.setAttribute('aria-label', `Eliminar paleta`);
        deleteBtn.addEventListener('click', () => {
            favorites.splice(index, 1);
            saveFavorites();
            renderFavorites();
            showToast('¡Paleta eliminada!');
        });

        const colors = document.createElement('div');
        colors.className = 'favoriteColors';
        fav.forEach(item => {
            const box = document.createElement('span');
            box.className = 'favoriteColor';
            box.style.backgroundColor = item.color;
            colors.appendChild(box);
        });

        actions.appendChild(loadBtn);
        actions.appendChild(deleteBtn);
        header.appendChild(title);
        header.appendChild(title);
        header.appendChild(actions);

        li.appendChild(header);
        li.appendChild(colors);

        favoritesList.appendChild(li);
    });
}

function paletteKey(p){
    return p.map(item => item.color).join('|');
}

addFavorite.addEventListener('click', () => {
    const key = paletteKey(palette);
    const exists = favorites.some(fav => paletteKey(fav) === key);
    if (exists) {
        showToast('Esa paleta ya existe en favoritos!');
        return;
    }
    favorites.push(JSON.parse(JSON.stringify(palette)));
    saveFavorites();
    renderFavorites();
    showToast('¡Paleta agregada a favoritos!');
});

renderFavorites();
