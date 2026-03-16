import { stateOfMainDisplay } from "./stateOfMainDisplay";
import { ignoreSubmit } from "./ignoreSubmit";
import { mouseupInCanvas } from "./mouseupInCanvas";
import { doubleClickInCanvas } from "./doubleClickInCanvas";
import { wheelMoveInCanvas } from "./wheelMoveInCanvas";
import { mousedownInCanvas } from "./mousedownInCanvas";
import {mouseMoveInCanvas} from "./mouseMoveInCanvas";
import { resize } from "./resize";
import { render } from "./render";

export function setupMainDisplay() : void
{
	document.getElementById('scale_form')!.addEventListener('submit', ignoreSubmit);

	stateOfMainDisplay.canvasElement = document.querySelector<HTMLElement>("canvas")! as HTMLCanvasElement;
	stateOfMainDisplay.canvasRenderingContext = stateOfMainDisplay.canvasElement.getContext("2d")!;

	window.addEventListener("mousemove", mouseMoveInCanvas);
	window.addEventListener("dblclick", doubleClickInCanvas);
	window.addEventListener("wheel", wheelMoveInCanvas);
	window.addEventListener("mousedown", mousedownInCanvas);
	window.addEventListener("mouseup", mouseupInCanvas);
	resize();
	render();
}

