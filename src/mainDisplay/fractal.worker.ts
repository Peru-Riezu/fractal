/// <reference lib="webworker" />

import {fillPixelArray} from "./fillPixelArray";

type Job = {
	buffer: ArrayBuffer;
	dprAdjustedWidth: number;
	dprAdjustedHeigth: number;
	scale: number;
	x: number;
	y: number;
	scapeRadius : number;
	maxIterations : number;
	antialiasLevel : number;
};

const workerSelf : DedicatedWorkerGlobalScope = self as unknown as DedicatedWorkerGlobalScope;

workerSelf.addEventListener
(
	"message",
	(e: MessageEvent<Job>) =>
	{
		const {buffer, dprAdjustedWidth, dprAdjustedHeigth, scale, x, y, scapeRadius, maxIterations, antialiasLevel} = e.data;

		const pixels : Uint8ClampedArray<ArrayBuffer> = new Uint8ClampedArray(buffer);
		fillPixelArray(pixels, dprAdjustedWidth, dprAdjustedHeigth, scale, x, y, scapeRadius, maxIterations, antialiasLevel);

		(workerSelf as DedicatedWorkerGlobalScope).postMessage({buffer: buffer}, [buffer]);
	}
);
