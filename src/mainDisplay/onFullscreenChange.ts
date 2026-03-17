import type { MainDisplayState } from "./stateOfMainDisplay";

export function onFullscreenChange(stateOfMainDisplay : MainDisplayState) : void
{
	stateOfMainDisplay.onFullscreenMode.value = document.fullscreenElement === stateOfMainDisplay.mainDisplayElement.value;
	if (stateOfMainDisplay.onFullscreenMode.value == true)
	{
		stateOfMainDisplay.showFullScreenButton.value = false;
	}
}
