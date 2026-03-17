import type { MainDisplayState } from "./stateOfMainDisplay.ts";
import { dragFrame } from "./dragFrame.ts";
import type { PixelDataState } from "@/pixelData/stateOfPixelData";
import type { ParametersState } from "@/parameters/stateOfParameters";
import { getIterationsOfPoint } from "@/pixelData/getIterationsOfPoint.ts";
import { clientPointToComplex } from "./canvasPointer";
import type {ComplexPoint} from "./complexPlane.ts";

export function mouseMoveInCanvas
(
	e : PointerEvent,
	stateOfMainDisplay : MainDisplayState,
	stateOfParameters : ParametersState,
	stateOfPixelData : PixelDataState
) : void
{
	if (e.altKey == true)
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
		return;
	}

	if (stateOfMainDisplay.mousedown == true)
	{
		dragFrame(e, stateOfMainDisplay, stateOfParameters);
		return;
	}

	if (stateOfMainDisplay.canvasElement.value == null)
	{
		return;
	}

	const currentPosition : ComplexPoint = clientPointToComplex
	(
		e.clientX,
		e.clientY,
		stateOfMainDisplay.canvasElement.value,
		stateOfParameters.scale.value.value,
		stateOfParameters.xOfOrigin.value.value,
		stateOfParameters.yOfOrigin.value.value
	);

	stateOfMainDisplay.showFullScreenButton.value = stateOfMainDisplay.onFullscreenMode.value == false;
	stateOfPixelData.valuesOfEachIteration.value = getIterationsOfPoint(currentPosition.x, currentPosition.y, stateOfParameters);
}
