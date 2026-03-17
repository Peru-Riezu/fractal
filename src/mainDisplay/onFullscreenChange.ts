import { stateOfMainDisplay } from "./stateOfMainDisplay";
import { resize } from "./resize";

export function onFullscreenChange() : void
{
	if (stateOfMainDisplay.goingFullScreen != true)
	{
		stateOfMainDisplay.onFullscreenMode.value = false;
		resize();
	}
	stateOfMainDisplay.goingFullScreen = false;
}

