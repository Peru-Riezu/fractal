import { stateOfMainDisplay } from "./stateOfMainDisplay";
import { render } from "./render";

export function resize() : void
{
	const dpr : number = window.devicePixelRatio;

	stateOfMainDisplay.dprAdjustedWidthOfCanvas = Math.floor(stateOfMainDisplay.canvasElement.value!.clientWidth * dpr);
	stateOfMainDisplay.dprAdjustedHeigthOfCanvas = Math.floor(stateOfMainDisplay.canvasElement.value!.clientHeight * dpr);
	stateOfMainDisplay.canvasElement.value!.width = stateOfMainDisplay.dprAdjustedWidthOfCanvas;
	stateOfMainDisplay.canvasElement.value!.height = stateOfMainDisplay.dprAdjustedHeigthOfCanvas;
	render();
}

