import { stateOfMainDisplay } from "./stateOfMainDisplay";
import { resize } from "./resize";

export async function toggleFullscreen() : Promise<void>
{
	stateOfMainDisplay.goingFullScreen = true;
	await document.getElementById("main_display")!.requestFullscreen();
	if (document.fullscreenElement == document.getElementById("main_display"))
	{
		stateOfMainDisplay.onFullscreenMode.value = true;
		resize();
	}
}

