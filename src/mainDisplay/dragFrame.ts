import type { MainDisplayState } from "./stateOfMainDisplay";
import type { ParametersState } from "../parameters/stateOfParameters.ts";
import { clientPointToComplex } from "./canvasPointer";
import type {ComplexPoint} from "./complexPlane.ts";

export function dragFrame(e : PointerEvent, stateOfMainDisplay : MainDisplayState, stateOfParameters : ParametersState) : void
{
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

	stateOfParameters.xOfOrigin.update
	(
		stateOfMainDisplay.xOfPosOnmousedown - currentPosition.x + stateOfParameters.xOfOrigin.value.value
	);
	stateOfParameters.yOfOrigin.update
	(
		stateOfMainDisplay.yOfPosOnmousedown - currentPosition.y + stateOfParameters.yOfOrigin.value.value
	);
}
