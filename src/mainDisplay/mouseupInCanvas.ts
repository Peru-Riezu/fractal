import { stateOfMainDisplay } from "./stateOfMainDisplay";

export function mouseupInCanvas() : void
{
	stateOfMainDisplay.mousedown = false;
}

