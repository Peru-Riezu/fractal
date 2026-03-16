import { stateOfMainDisplay } from "./stateOfMainDisplay";

export function resize() : void
{
	const dpr : number = window.devicePixelRatio;

	stateOfMainDisplay.dprAdjustedWidthOfCanvas = Math.floor(stateOfMainDisplay.canvasElement!.clientWidth * dpr);
	stateOfMainDisplay.dprAdjustedHeigthOfCanvas = Math.floor(stateOfMainDisplay.canvasElement!.clientHeight * dpr);
	stateOfMainDisplay.canvasElement!.width = stateOfMainDisplay.dprAdjustedWidthOfCanvas;
	stateOfMainDisplay.canvasElement!.height = stateOfMainDisplay.dprAdjustedHeigthOfCanvas;
}

