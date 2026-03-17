import { stateOfMainDisplay } from "./stateOfMainDisplay";
import { stateOfParameters } from "@/parameters/stateOfParameters";

export function mousedownInCanvas(e: MouseEvent) : void
{
	if (e.altKey == true)
	{
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

	stateOfMainDisplay.xOfPosOnmousedown = currentScaledX + stateOfParameters.xOfOrigin.value.value;
	stateOfMainDisplay.yOfPosOnmousedown = currentScaledY + stateOfParameters.yOfOrigin.value.value;
	stateOfMainDisplay.mousedown = true;
}

