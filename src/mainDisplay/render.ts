import { stateOfMainDisplay } from "./stateOfMainDisplay";
import { stateOfParameters } from "@/parameters/stateOfParameters";
import { spinWheel } from "./spinWheel";

export function render() : void
{
	stateOfMainDisplay.stopSpiningWheelCoroutine = false;
	if (stateOfMainDisplay.wheelSpiningCoroutineUp == false)
	{
		stateOfMainDisplay.wheelSpiningCoroutineUp = true;
		spinWheel();
	}
	if (stateOfMainDisplay.renderingWorker != null)
	{
		stateOfMainDisplay.renderingWorker.terminate();
	}

	stateOfMainDisplay.renderingWorker = new Worker(new URL("./fractal.worker.ts", import.meta.url), {type: "module"});

	stateOfMainDisplay.renderingWorker.addEventListener
		(
			"message",
			(e: MessageEvent<{buffer: ArrayBuffer}>) =>
			{
				const buffer : ArrayBuffer = e.data.buffer;

				const pixels : Uint8ClampedArray<ArrayBuffer> = new Uint8ClampedArray<ArrayBuffer>(buffer);
				const img : ImageData =
					new ImageData(pixels, stateOfMainDisplay.dprAdjustedWidthOfCanvas!, stateOfMainDisplay.dprAdjustedHeigthOfCanvas!);

				stateOfMainDisplay.stopSpiningWheelCoroutine = true;
				stateOfMainDisplay.canvasRenderingContext!.putImageData(img, 0, 0);
			}
		);

	const buffer : ArrayBuffer =
		new ArrayBuffer(stateOfMainDisplay.dprAdjustedWidthOfCanvas! * stateOfMainDisplay.dprAdjustedHeigthOfCanvas! * 4);

	stateOfMainDisplay.renderingWorker.postMessage
		(
			{
				buffer: buffer,
				dprAdjustedWidth: stateOfMainDisplay.dprAdjustedWidthOfCanvas,
				dprAdjustedHeigth: stateOfMainDisplay.dprAdjustedHeigthOfCanvas,
				scale: stateOfParameters.scale,
				x: stateOfParameters.xOfOrigin,
				y: stateOfParameters.yOfOrigin,
				scapeRadius: stateOfParameters.scapeRadius,
				maxIterations: stateOfParameters.maxIterations,
				antialiasLevel: stateOfParameters.antialiasLevel
			},
			[buffer]
		)
}
