import { draw } from './canvas';
import { wait } from './util';

export const N = 1000;
const C0 = 299_792_458; // speed of light [m/s]

const NUM_STEPS = 1_000_000_000;

function pulse(t: number, tau: number, t0: number) {
    return Math.exp(-Math.pow((t - t0) / tau, 2));
}

export async function simulate(canvasEElement: HTMLCanvasElement, canvasHElement: HTMLCanvasElement, timeElement: HTMLDivElement) {
    if (canvasEElement.width !== canvasHElement.width || canvasEElement.width !== N) {
        throw new Error('The canvas should have the same width of N');
    }

    const fMax = 1_000; // max frequency [Hz]
    const lambdaMin = C0 / fMax; // min wavelenght [m]
    const deltaZ = lambdaMin / N / 100;

    const mu = 1.256_637_062_12e-6; // magnetic constant [H/m]
    const epsilon = 8.854_187_812_8e-12; // electric constant [F/m]
    // const c = 1 / Math.sqrt(mu * epsilon); // speed of light, from mu and epsilon [m/s]

    // const nu = Math.sqrt(mu * epsilon);
    const deltaT = 0.9 * deltaZ / C0; // time step [s]

    const tau = 1e-7; // pulse width [s]
    const t0 = 5 * tau; // pulse delay [s]

    // TODO: change epsilon and mu in different spaces in z
    const mEY = Array.from({ length: N }, () => deltaT / (epsilon * deltaZ));
    const mHX = Array.from({ length: N }, () => deltaT / (mu * deltaZ));


    for (let i = 700; i < 800; i++) {
        mEY[i] = mEY[i] / 2;
        mHX[i] = mHX[i] / 2;
    }

    const eY = Array.from({ length: N }, () => 0);
    const hX = Array.from({ length: N }, () => 0);

    let t = 0;

    function step() {
        for (let i = 0; i < N; i++) {
            const nextEY = i < N - 1 ? eY[i + 1] : 0;
            hX[i] = hX[i] + mHX[i] * (nextEY - eY[i]);
        }

        for (let i = 1; i < N; i++) {
            const prevHX = i > 0 ? hX[i - 1] : 0;
            eY[i] = eY[i] + mEY[i] * (hX[i] - prevHX);
        }

        const source = pulse(t, tau, t0);
        eY[Math.floor(N/2)] += source;
    }

    for (let i = 0; i < NUM_STEPS; i++) {
        step();

        draw(canvasEElement, eY, 1, 'red');
        draw(canvasHElement, hX, 2 * 1e-3, 'blue');
        timeElement.innerText = t.toString();
        await wait(10);

        t += deltaT;
    }
}
