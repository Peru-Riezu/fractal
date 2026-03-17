import { stateOfMainDisplay } from "./stateOfMainDisplay";
import { resize } from "./resize";

export function setupMainDisplay() : void
{
//	stateOfMainDisplay.canvasElement = document.querySelector<HTMLElement>("canvas")! as HTMLCanvasElement;
	stateOfMainDisplay.canvasRenderingContext = stateOfMainDisplay.canvasElement.value!.getContext("2d")!;

//	window.addEventListener("mousemove", mouseMoveInCanvas);
//	window.addEventListener("dblclick", doubleClickInCanvas);
//	window.addEventListener("wheel", wheelMoveInCanvas);
//	window.addEventListener("mousedown", mousedownInCanvas);
//	window.addEventListener("mouseup", mouseupInCanvas);
	resize();
}

