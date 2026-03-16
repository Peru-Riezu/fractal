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

	const rect : DOMRect = stateOfMainDisplay.canvasElement!.getBoundingClientRect();
	const column : number = Math.floor(e.clientX - rect.left);
	const row : number = Math.floor(e.clientY - rect.top);

	if (e.clientX < rect.left || e.clientY < rect.top || e.clientX > rect.right || e.clientY > rect.bottom)
	{
		stateOfMainDisplay.mousedown = false;
		stateOfPixelData.valuesOfEachIteration.value = undefined;
		document.getElementById("fullscreen_icon")!.style.opacity = "0";
		return;
	}

	document.getElementById("fullscreen_icon")!.style.opacity = "1";
	if (stateOfMainDisplay.goingFullScreen == true || document.fullscreenElement == document.getElementById("main_display"))
	{
		document.getElementById("fullscreen_icon")!.style.opacity = "0";
	}

	const currentNormalizedX : number = ((column / (stateOfMainDisplay.canvasElement!.clientWidth - 1)) * 2) - 1;
	const currentNormalizedY : number = ((row / (stateOfMainDisplay.canvasElement!.clientHeight - 1)) * -2) + 1;
	const scaleOfXtoY: number = (1 / stateOfMainDisplay.canvasElement!.clientHeight) * stateOfMainDisplay.canvasElement!.clientWidth;
	const currentScaledX : number = currentNormalizedX * (stateOfParameters.scale / 2) * scaleOfXtoY;
	const currentScaledY : number = currentNormalizedY * (stateOfParameters.scale / 2);
	const currentPositonAdjustedX : number = currentScaledX + stateOfParameters.xOfOrigin;
	const currentPositonAdjustedY : number = currentScaledY + stateOfParameters.yOfOrigin;

	stateOfPixelData.valuesOfEachIteration.value = getIterationsOfPoint(currentPositonAdjustedX, currentPositonAdjustedY);
}
