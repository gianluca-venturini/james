export function draw(canvas: HTMLCanvasElement, x: number[], maxX: number, color: string) {
    const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
    if (!ctx) {
        throw new Error('ctx is null');
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (canvas.width !== x.length) {
        throw new Error('ctx.width !== x.length');
    }

    ctx.fillStyle = color;
    for (let i = 0; i < canvas.width; i++) {
        const height = x[i] / maxX * (canvas.height / 2);
    
        ctx.fillRect(i, canvas.height / 2 - height, 1, 1);
    }
}