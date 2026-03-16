import { stateOfMainDisplay } from "./stateOfMainDisplay";
import { stateOfPixelData } from "../pixelData/stateOfPixelData.ts";
import { stateOfParameters } from "../parameters/stateOfParameters.ts";

export function dragFrame(e : MouseEvent) : void
{
	const rect : DOMRect = stateOfMainDisplay.canvasElement!.getBoundingClientRect();
	const column : number = Math.floor(e.clientX - rect.left);
	const row : number = Math.floor(e.clientY - rect.top);

	if (e.clientX < rect.left || e.clientY < rect.top || e.clientX > rect.right || e.clientY > rect.bottom)
	{
		stateOfMainDisplay.mousedown = false;
		stateOfPixelData.valuesOfEachIteration.value = undefined;
		return;
	}

	const currentNormalizedX : number = ((column / (stateOfMainDisplay.canvasElement!.clientWidth - 1)) * 2) - 1;
	const currentNormalizedY : number = ((row / (stateOfMainDisplay.canvasElement!.clientHeight - 1)) * -2) + 1;
	const scaleOfXtoY: number = (1 / stateOfMainDisplay.canvasElement!.clientHeight) * stateOfMainDisplay.canvasElement!.clientWidth;
	const currentScaledX : number = currentNormalizedX * (stateOfParameters.scale / 2) * scaleOfXtoY;
	const currentScaledY : number = currentNormalizedY * (stateOfParameters.scale / 2);

	stateOfParameters.xOfOriginInput.value = (stateOfMainDisplay.xOfPosOnmousedown - currentScaledX).toString();
	stateOfParameters.yOfOriginInput.value = (stateOfMainDisplay.yOfPosOnmousedown - currentScaledY).toString();
}

