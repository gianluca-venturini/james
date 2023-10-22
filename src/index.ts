import { draw } from './canvas';
import { wait } from './util';

// Reload page when content changes
new EventSource('/esbuild').addEventListener('change', () => location.reload());

const canvas: HTMLCanvasElement | null = document.getElementById('canvas_e') as HTMLCanvasElement;

simulate(canvas);

const tau = 0.1;

async function simulate(canvas: HTMLCanvasElement) {
    let t = 0;
    // eslint-disable-next-line no-constant-condition
    while(true) {
        const eX = Array.from({ length: canvas.width }, (_, index) => Math.exp(-Math.pow(((index * 0.01 - t) + 0.2) / tau, 2)));
        t += 0.005;
        draw(canvas, eX);
        await wait(1);
    }
}


