import { stateOfMainDisplay } from "./stateOfMainDisplay";
import { stateOfPixelData } from "@/pixelData/stateOfPixelData";

export function mouseLeftCanvas(e : PointerEvent) : void
{
	const rect : DOMRect = stateOfMainDisplay.canvasElement.value!.getBoundingClientRect();

	if ((e.clientX < rect.left || e.clientY < rect.top || e.clientX > rect.right || e.clientY > rect.bottom) == false)
	{
		return;
	}

	stateOfMainDisplay.mousedown = false;

	if (e.altKey == true)
	{
		return;
	}

	stateOfPixelData.valuesOfEachIteration.value = undefined;
	stateOfMainDisplay.showFullScreenButton.value = false;
}
