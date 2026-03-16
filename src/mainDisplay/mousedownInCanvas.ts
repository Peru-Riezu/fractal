import { stateOfMainDisplay } from "./stateOfMainDisplay";
import { stateOfParameters } from "@/parameters/stateOfParameters";

export function mousedownInCanvas(e: MouseEvent) : void
{
	if (e.altKey == true)
	{
		return;
	}

	const rect : DOMRect = stateOfMainDisplay.canvasElement!.getBoundingClientRect();
	const column : number = Math.floor(e.clientX - rect.left);
	const row : number = Math.floor(e.clientY - rect.top);
	const currentNormalizedX : number = ((column / (stateOfMainDisplay.canvasElement!.clientWidth - 1)) * 2) - 1;
	const currentNormalizedY : number = ((row / (stateOfMainDisplay.canvasElement!.clientHeight - 1)) * -2) + 1;
	const scaleOfXtoY: number = (1 / stateOfMainDisplay.canvasElement!.clientHeight) * stateOfMainDisplay.canvasElement!.clientWidth;
	const currentScaledX : number = currentNormalizedX * (stateOfParameters.scale / 2) * scaleOfXtoY;
	const currentScaledY : number = currentNormalizedY * (stateOfParameters.scale / 2);

	stateOfMainDisplay.xOfPosOnmousedown = currentScaledX + stateOfParameters.xOfOrigin;
	stateOfMainDisplay.yOfPosOnmousedown = currentScaledY + stateOfParameters.yOfOrigin;
	stateOfMainDisplay.mousedown = true;
}

