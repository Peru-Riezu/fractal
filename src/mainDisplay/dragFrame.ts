import { stateOfMainDisplay } from "./stateOfMainDisplay";
import { stateOfPixelData } from "../pixelData/stateOfPixelData.ts";
import { stateOfParameters } from "../parameters/stateOfParameters.ts";

export function dragFrame(e : MouseEvent) : void
{
	const rect : DOMRect = stateOfMainDisplay.canvasElement.value!.getBoundingClientRect();
	const column : number = Math.floor(e.clientX - rect.left);
	const row : number = Math.floor(e.clientY - rect.top);

	if (e.clientX < rect.left || e.clientY < rect.top || e.clientX > rect.right || e.clientY > rect.bottom)
	{
		stateOfMainDisplay.mousedown = false;
		stateOfPixelData.valuesOfEachIteration.value = undefined;
		return;
	}

	const currentNormalizedX : number = ((column / (stateOfMainDisplay.canvasElement.value!.clientWidth - 1)) * 2) - 1;
	const currentNormalizedY : number = ((row / (stateOfMainDisplay.canvasElement.value!.clientHeight - 1)) * -2) + 1;
	const scaleOfXtoY: number =
		(1 / stateOfMainDisplay.canvasElement.value!.clientHeight) * stateOfMainDisplay.canvasElement.value!.clientWidth;
	const currentScaledX : number = currentNormalizedX * (stateOfParameters.scale.value.value / 2) * scaleOfXtoY;
	const currentScaledY : number = currentNormalizedY * (stateOfParameters.scale.value.value / 2);

	stateOfParameters.xOfOrigin.update(stateOfMainDisplay.xOfPosOnmousedown - currentScaledX);
	stateOfParameters.yOfOrigin.update(stateOfMainDisplay.yOfPosOnmousedown - currentScaledY);
}

