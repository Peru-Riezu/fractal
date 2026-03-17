import { stateOfMainDisplay } from "./stateOfMainDisplay.ts";
import { dragFrame } from "./dragFrame.ts";
import {stateOfPixelData} from "@/pixelData/stateOfPixelData";
import { stateOfParameters } from "@/parameters/stateOfParameters";
import { getIterationsOfPoint } from "@/pixelData/getIterationsOfPoint.ts";

export function mouseMoveInCanvas(e : MouseEvent) : void
{
	if (e.altKey == true)
	{
		stateOfMainDisplay.mousedown = false;
		return;
	}

	if (stateOfMainDisplay.mousedown == true)
	{
		dragFrame(e);
		return;
	}

	const rect : DOMRect = stateOfMainDisplay.canvasElement.value!.getBoundingClientRect();
	const column : number = Math.floor(e.clientX - rect.left);
	const row : number = Math.floor(e.clientY - rect.top);
	const currentNormalizedX : number = ((column / (stateOfMainDisplay.canvasElement.value!.clientWidth - 1)) * 2) - 1;
	const currentNormalizedY : number = ((row / (stateOfMainDisplay.canvasElement.value!.clientHeight - 1)) * -2) + 1;
	const scaleOfXtoY: number =
		(1 / stateOfMainDisplay.canvasElement.value!.clientHeight) * stateOfMainDisplay.canvasElement.value!.clientWidth;
	const currentScaledX : number = currentNormalizedX * (stateOfParameters.scale.value.value / 2) * scaleOfXtoY;
	const currentScaledY : number = currentNormalizedY * (stateOfParameters.scale.value.value / 2);
	const currentPositonAdjustedX : number = currentScaledX + stateOfParameters.xOfOrigin.value.value;
	const currentPositonAdjustedY : number = currentScaledY + stateOfParameters.yOfOrigin.value.value;

	stateOfMainDisplay.showFullScreenButton.value = true;
	stateOfPixelData.valuesOfEachIteration.value = getIterationsOfPoint(currentPositonAdjustedX, currentPositonAdjustedY);
}
