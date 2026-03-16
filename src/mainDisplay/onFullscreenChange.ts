import { stateOfMainDisplay } from "./stateOfMainDisplay";
import { resize } from "./resize";
import { render } from "./render";

export function onFullscreenChange() : void
{
	if (stateOfMainDisplay.goingFullScreen != true)
	{
		stateOfMainDisplay.canvasElement!.style.width = "90vw";
		stateOfMainDisplay.canvasElement!.style.height = "70vh";
		resize();
		render();
	}
	stateOfMainDisplay.goingFullScreen = false;
}

