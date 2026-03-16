import { stateOfMainDisplay } from "./stateOfMainDisplay";

export async function spinWheel() : Promise<void>
{
	const wheel : HTMLElement = document.getElementById("loading_icon")!;

	while (stateOfMainDisplay.stopSpiningWheelCoroutine == false)
	{
		wheel.style.opacity = "1";
		wheel.style.rotate = ((Number(wheel.style.rotate.replace("deg", "")) + 10) % 360).toString() + "deg";
		await new Promise(resolve => setTimeout(resolve, 100));
	}
	stateOfMainDisplay.wheelSpiningCoroutineUp = false;
	wheel.style.opacity = "0";
	wheel.style.rotate = "0";
}

