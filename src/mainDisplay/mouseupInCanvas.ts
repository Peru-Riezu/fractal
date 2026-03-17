import type { MainDisplayState } from "./stateOfMainDisplay";

export function mouseupInCanvas(e : PointerEvent, stateOfMainDisplay : MainDisplayState) : void
{
	if
	(
		stateOfMainDisplay.canvasElement.value != null
		&&
		stateOfMainDisplay.canvasElement.value.hasPointerCapture(e.pointerId)
	)
	{
		stateOfMainDisplay.canvasElement.value.releasePointerCapture(e.pointerId);
	}

	stateOfMainDisplay.mousedown = false;
}
