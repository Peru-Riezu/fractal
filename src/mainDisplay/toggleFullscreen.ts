import { stateOfMainDisplay } from "./stateOfMainDisplay";
import { render } from "./render";
import { resize } from "./resize";

export async function toggleFullscreen() : Promise<void>
{
	stateOfMainDisplay.goingFullScreen = true;
	await document.getElementById("main_display")!.requestFullscreen();
	if (document.fullscreenElement == document.getElementById("main_display"))
	{
		stateOfMainDisplay.canvasElement!.style.width = "100vw";
		stateOfMainDisplay.canvasElement!.style.height = "100vh";
		document.getElementById("fullscreen_icon")!.style.opacity = "0";
		resize();
		render();
	}
}

