import type { MainDisplayState } from "./stateOfMainDisplay";
import type { ParametersState } from "@/parameters/stateOfParameters";

function finishRender(worker : Worker, stateOfMainDisplay : MainDisplayState) : void
{
	if (stateOfMainDisplay.renderingWorker === worker)
	{
		stateOfMainDisplay.renderingWorker = null;
		stateOfMainDisplay.frameIsRendering.value = false;
	}
	worker.terminate();
}

export function render(stateOfMainDisplay : MainDisplayState, stateOfParameters : ParametersState) : void
{
	if
	(
		stateOfMainDisplay.canvasRenderingContext == null
		||
		stateOfMainDisplay.dprAdjustedWidthOfCanvas == null
		||
		stateOfMainDisplay.dprAdjustedHeigthOfCanvas == null
	)
	{
		return;
	}

	stateOfMainDisplay.frameIsRendering.value = true;

	if (stateOfMainDisplay.renderingWorker != null)
	{
		stateOfMainDisplay.renderingWorker.terminate();
		stateOfMainDisplay.renderingWorker = null;
	}

	const worker : Worker = new Worker(new URL("./fractal.worker.ts", import.meta.url), {type: "module"});
	stateOfMainDisplay.renderingWorker = worker;

	worker.addEventListener
			(
				"message",
				(e: MessageEvent<{buffer: ArrayBuffer}>) =>
				{
					if (stateOfMainDisplay.renderingWorker !== worker)
					{
						return;
					}

					const buffer : ArrayBuffer = e.data.buffer;

					const pixels : Uint8ClampedArray<ArrayBuffer> = new Uint8ClampedArray<ArrayBuffer>(buffer);
						const img : ImageData =
							new ImageData(pixels, stateOfMainDisplay.dprAdjustedWidthOfCanvas!, stateOfMainDisplay.dprAdjustedHeigthOfCanvas!);

						stateOfMainDisplay.canvasRenderingContext!.putImageData(img, 0, 0);
						finishRender(worker, stateOfMainDisplay);
					}
				);

	worker.addEventListener("error", () => finishRender(worker, stateOfMainDisplay), {once: true});
	worker.addEventListener("messageerror", () => finishRender(worker, stateOfMainDisplay), {once: true});

	const buffer : ArrayBuffer =
		new ArrayBuffer(stateOfMainDisplay.dprAdjustedWidthOfCanvas! * stateOfMainDisplay.dprAdjustedHeigthOfCanvas! * 4);

	try
	{
		worker.postMessage
			(
				{
					buffer: buffer,
					dprAdjustedWidth: stateOfMainDisplay.dprAdjustedWidthOfCanvas,
					dprAdjustedHeigth: stateOfMainDisplay.dprAdjustedHeigthOfCanvas,
					scale: stateOfParameters.scale.value.value,
					x: stateOfParameters.xOfOrigin.value.value,
					y: stateOfParameters.yOfOrigin.value.value,
					scapeRadius: stateOfParameters.scapeRadius.value.value,
					maxIterations: stateOfParameters.maxIterations.value.value,
					antialiasLevel: stateOfParameters.antialiasLevel.value.value
				},
				[buffer]
			);
	}
	catch
	{
		finishRender(worker, stateOfMainDisplay);
	}
}
