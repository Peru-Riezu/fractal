import { stateOfPixelData } from "@/pixelData/stateOfPixelData";
import { stateOfParameters } from "@/parameters/stateOfParameters";
import { stateOfMainDisplay } from "./stateOfMainDisplay";

export function doubleClickInCanvas(e : MouseEvent) : void
{
	if (e.altKey == true)
	{
		return;
	}

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
	const currentPositonAdjustedX : number = currentScaledX + stateOfParameters.xOfOrigin;
	const currentPositonAdjustedY : number = currentScaledY + stateOfParameters.yOfOrigin;
	const changeInXToOrigin : number = stateOfParameters.xOfOrigin - currentPositonAdjustedX;
	const changeInYToOrigin : number = stateOfParameters.yOfOrigin - currentPositonAdjustedY;

	stateOfParameters.scale *= 0.5;
	stateOfParameters.scaleInput.value = stateOfParameters.scale.toString();
	stateOfParameters.xOfOriginInput.value = (stateOfParameters.xOfOrigin - (changeInXToOrigin * 0.5)).toString();
	stateOfParameters.yOfOriginInput.value = (stateOfParameters.yOfOrigin - (changeInYToOrigin * 0.5)).toString();
}

