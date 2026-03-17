import type { MainDisplayState } from "./stateOfMainDisplay";

export async function toggleFullscreen(stateOfMainDisplay : MainDisplayState) : Promise<void>
{
	if (stateOfMainDisplay.mainDisplayElement.value == null)
	{
		return;
	}

	try
	{
		if (document.fullscreenElement === stateOfMainDisplay.mainDisplayElement.value)
		{
			await document.exitFullscreen();
			return;
		}
		await stateOfMainDisplay.mainDisplayElement.value.requestFullscreen();
	}
	catch
	{
		stateOfMainDisplay.onFullscreenMode.value =
			document.fullscreenElement === stateOfMainDisplay.mainDisplayElement.value;
	}
}
