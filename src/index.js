// Reload page when content changes
new EventSource('/esbuild').addEventListener('change', () => location.reload());

const canvas = document.getElementById('canvas_e');

simulate();

const tau = 0.1;

async function simulate() {
    let t = 0;
    while(true) {
        const eX = Array.from({ length: canvas.width }, (_, index) => Math.exp(-Math.pow(((index * 0.01 - t) + 0.2) / tau, 2)));
        t += 0.005;
        draw(canvas, eX);
        await wait(1);
    }
}

function draw(canvas, eX) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (canvas.width !== eX.length) {
        throw new Error('ctx.width !== eX.length');
    }

    ctx.fillStyle = 'red';
    for (let i = 0; i < canvas.width; i++) {
        const height = eX[i] * (canvas.height / 2);
    
        ctx.fillRect(i, canvas.height / 2 - height, 1, 1);
    }
}

async function wait(timeMs) {
    return new Promise(resolve => setTimeout(resolve, timeMs));
}
