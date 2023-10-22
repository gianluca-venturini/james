export function draw(canvas: HTMLCanvasElement, eX: number[]) {
    const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
    if (!ctx) {
        throw new Error('ctx is null');
    }
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