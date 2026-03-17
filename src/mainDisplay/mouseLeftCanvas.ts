import type { MainDisplayState } from "./stateOfMainDisplay";
import type { PixelDataState } from "@/pixelData/stateOfPixelData";

export function mouseLeftCanvas(e : PointerEvent, stateOfMainDisplay : MainDisplayState, stateOfPixelData : PixelDataState) : void
{
	if (stateOfMainDisplay.canvasElement.value == null)
	{
		return;
	}

	const rect : DOMRect = stateOfMainDisplay.canvasElement.value.getBoundingClientRect();

	if ((e.clientX < rect.left || e.clientY < rect.top || e.clientX > rect.right || e.clientY > rect.bottom) == false)
	{
		return;
	}

	stateOfMainDisplay.showFullScreenButton.value = false;

	if (stateOfMainDisplay.mousedown == true || e.altKey == true)
	{
		return;
	}

	stateOfPixelData.valuesOfEachIteration.value = undefined;
}
