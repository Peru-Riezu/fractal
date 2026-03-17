import type { MainDisplayState } from "./stateOfMainDisplay";
import type { ParametersState } from "@/parameters/stateOfParameters";
import { resize } from "./resize";

export function setupMainDisplay(stateOfMainDisplay : MainDisplayState, stateOfParameters : ParametersState) : void
{
	if (stateOfMainDisplay.canvasElement.value == null)
	{
		return;
	}

	stateOfMainDisplay.canvasRenderingContext = stateOfMainDisplay.canvasElement.value.getContext("2d");
	if (stateOfMainDisplay.canvasRenderingContext == null)
	{
		return;
	}

	resize(stateOfMainDisplay, stateOfParameters);
}
