import { stateOfMainDisplay } from "./stateOfMainDisplay";
import { stateOfParameters } from "@/parameters/stateOfParameters";

export function wheelMoveInCanvas(e : WheelEvent) : void
{
	if (e.altKey == true)
	{
		return;
	}

	const rect : DOMRect = stateOfMainDisplay.canvasElement.value!.getBoundingClientRect();
	const column : number = Math.floor(e.clientX - rect.left);
	const row : number = Math.floor(e.clientY - rect.top);
	const currentNormalizedX : number = ((column / (stateOfMainDisplay.canvasElement.value!.clientWidth - 1)) * 2) - 1;
	const currentNormalizedY : number = ((row / (stateOfMainDisplay.canvasElement.value!.clientHeight - 1)) * -2) + 1;
	const scaleOfXtoY: number =
		(1 / stateOfMainDisplay.canvasElement.value!.clientHeight) * stateOfMainDisplay.canvasElement.value!.clientWidth;
	const currentScaledX : number = currentNormalizedX * (stateOfParameters.scale.value.value / 2) * scaleOfXtoY;
	const currentScaledY : number = currentNormalizedY * (stateOfParameters.scale.value.value / 2);
	const currentPositonAdjustedX : number = currentScaledX + stateOfParameters.xOfOrigin.value.value;
	const currentPositonAdjustedY : number = currentScaledY + stateOfParameters.yOfOrigin.value.value;
	const changeInXToOrigin : number = stateOfParameters.xOfOrigin.value.value - currentPositonAdjustedX;
	const changeInYToOrigin : number = stateOfParameters.yOfOrigin.value.value - currentPositonAdjustedY;
	const scaler : number = 0.5;

	if (e.deltaY < 0)
	{
		stateOfParameters.scale.update(stateOfParameters.scale.value.value * scaler);
		stateOfParameters.xOfOrigin.update(currentPositonAdjustedX + (changeInXToOrigin * scaler));
		stateOfParameters.yOfOrigin.update(currentPositonAdjustedY + (changeInYToOrigin * scaler));
		return;
	}
	stateOfParameters.scale.update(stateOfParameters.scale.value.value * (1 / scaler));
	stateOfParameters.xOfOrigin.update(currentPositonAdjustedX + ((changeInXToOrigin * (1 / scaler))));
	stateOfParameters.yOfOrigin.update(currentPositonAdjustedY + ((changeInYToOrigin * (1 / scaler))));
}

