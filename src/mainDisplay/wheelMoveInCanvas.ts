import type { MainDisplayState } from "./stateOfMainDisplay";
import type { ParametersState } from "@/parameters/stateOfParameters";
import { clientPointToComplex } from "./canvasPointer";
import type {ComplexPoint} from "./complexPlane";

export function wheelMoveInCanvas(e : WheelEvent, stateOfMainDisplay : MainDisplayState, stateOfParameters : ParametersState) : void
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
	const scaler : number = 0.5;

	if (e.deltaY < 0)
	{
		stateOfParameters.scale.update(stateOfParameters.scale.value.value * scaler);
		stateOfParameters.xOfOrigin.update(currentPosition.x + (changeInXToOrigin * scaler));
		stateOfParameters.yOfOrigin.update(currentPosition.y + (changeInYToOrigin * scaler));
		return;
	}
	stateOfParameters.scale.update(stateOfParameters.scale.value.value * (1 / scaler));
	stateOfParameters.xOfOrigin.update(currentPosition.x + (changeInXToOrigin * (1 / scaler)));
	stateOfParameters.yOfOrigin.update(currentPosition.y + (changeInYToOrigin * (1 / scaler)));
}
