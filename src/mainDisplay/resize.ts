import type { MainDisplayState } from "./stateOfMainDisplay";
import type { ParametersState } from "@/parameters/stateOfParameters";
import { render } from "./render";

export function resize(stateOfMainDisplay : MainDisplayState, stateOfParameters : ParametersState) : void
{
	if (stateOfMainDisplay.canvasElement.value == null)
	{
		return;
	}

	const dpr : number = window.devicePixelRatio;
	const dprAdjustedWidthOfCanvas : number = Math.floor(stateOfMainDisplay.canvasElement.value.clientWidth * dpr);
	const dprAdjustedHeigthOfCanvas : number = Math.floor(stateOfMainDisplay.canvasElement.value.clientHeight * dpr);

	if (dprAdjustedWidthOfCanvas <= 0 || dprAdjustedHeigthOfCanvas <= 0)
	{
		return;
	}

	if
	(
		stateOfMainDisplay.dprAdjustedWidthOfCanvas === dprAdjustedWidthOfCanvas
		&&
		stateOfMainDisplay.dprAdjustedHeigthOfCanvas === dprAdjustedHeigthOfCanvas
	)
	{
		return;
	}

	stateOfMainDisplay.dprAdjustedWidthOfCanvas = dprAdjustedWidthOfCanvas;
	stateOfMainDisplay.dprAdjustedHeigthOfCanvas = dprAdjustedHeigthOfCanvas;
	stateOfMainDisplay.canvasElement.value.width = dprAdjustedWidthOfCanvas;
	stateOfMainDisplay.canvasElement.value.height = dprAdjustedHeigthOfCanvas;
	render(stateOfMainDisplay, stateOfParameters);
}
