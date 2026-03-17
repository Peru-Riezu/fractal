import type { MainDisplayState } from "./stateOfMainDisplay";
import type { ParametersState } from "@/parameters/stateOfParameters";
import { clientPointToComplex } from "./canvasPointer";
import type {ComplexPoint} from "./complexPlane";

export function mousedownInCanvas(e: PointerEvent, stateOfMainDisplay : MainDisplayState, stateOfParameters : ParametersState) : void
{
	if (e.altKey == true)
	{
		return;
	}

	if (stateOfMainDisplay.canvasElement.value == null)
	{
		return;
	}

	stateOfMainDisplay.canvasElement.value.setPointerCapture(e.pointerId);
	const positionOnMousedown : ComplexPoint = clientPointToComplex
	(
		e.clientX,
		e.clientY,
		stateOfMainDisplay.canvasElement.value,
		stateOfParameters.scale.value.value,
		stateOfParameters.xOfOrigin.value.value,
		stateOfParameters.yOfOrigin.value.value
	);

	stateOfMainDisplay.xOfPosOnmousedown = positionOnMousedown.x;
	stateOfMainDisplay.yOfPosOnmousedown = positionOnMousedown.y;
	stateOfMainDisplay.mousedown = true;
	stateOfMainDisplay.showFullScreenButton.value = false;
}
