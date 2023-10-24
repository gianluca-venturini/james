import { simulate } from './simulate';

// Reload page when content changes
new EventSource('/esbuild').addEventListener('change', () => location.reload());

const canvasEElement: HTMLCanvasElement | null = document.getElementById('canvas_e') as HTMLCanvasElement;
const canvasHElement: HTMLCanvasElement | null = document.getElementById('canvas_h') as HTMLCanvasElement;
const timeElement: HTMLDivElement | null = document.getElementById('t') as HTMLDivElement;

simulate(canvasEElement, canvasHElement, timeElement);
