import type { ParametersState } from "@/parameters/stateOfParameters";
import type { MainDisplayState } from "./stateOfMainDisplay";
import { clientPointToComplex } from "./canvasPointer";
import type {ComplexPoint} from "./complexPlane";

export function doubleClickInCanvas(e : MouseEvent, stateOfMainDisplay : MainDisplayState, stateOfParameters : ParametersState) : void
{
	if (e.altKey == true)
	{
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
	const changeInXToOrigin : number = stateOfParameters.xOfOrigin.value.value - currentPosition.x;
	const changeInYToOrigin : number = stateOfParameters.yOfOrigin.value.value - currentPosition.y;

	stateOfParameters.scale.update(stateOfParameters.scale.value.value * 0.5);
	stateOfParameters.xOfOrigin.update(stateOfParameters.xOfOrigin.value.value - (changeInXToOrigin * 0.5));
	stateOfParameters.yOfOrigin.update(stateOfParameters.yOfOrigin.value.value - (changeInYToOrigin * 0.5));
}
