import { stateOfPixelData } from "@/pixelData/stateOfPixelData";
import { stateOfParameters } from "@/parameters/stateOfParameters";
import { stateOfMainDisplay } from "./stateOfMainDisplay";

export function doubleClickInCanvas(e : MouseEvent) : void
{
	if (e.altKey == true)
	{
		return;
	}

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
	const currentPositonAdjustedX : number = currentScaledX + stateOfParameters.xOfOrigin.value.value;
	const currentPositonAdjustedY : number = currentScaledY + stateOfParameters.yOfOrigin.value.value;
	const changeInXToOrigin : number = stateOfParameters.xOfOrigin.value.value - currentPositonAdjustedX;
	const changeInYToOrigin : number = stateOfParameters.yOfOrigin.value.value - currentPositonAdjustedY;

	stateOfParameters.scale.update(stateOfParameters.scale.value.value * 0.5);
	
	stateOfParameters.xOfOrigin.update(stateOfParameters.xOfOrigin.value.value - (changeInXToOrigin * 0.5));
	stateOfParameters.yOfOrigin.update(stateOfParameters.yOfOrigin.value.value - (changeInYToOrigin * 0.5));
}

