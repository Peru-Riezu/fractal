export const stateOfMainDisplay :
{
	goingFullScreen : boolean,
	canvasElement : HTMLCanvasElement | null,
	stopSpiningWheelCoroutine : boolean,
	wheelSpiningCoroutineUp : boolean,
	dprAdjustedWidthOfCanvas : number | null,
	dprAdjustedHeigthOfCanvas : number | null,
	renderingWorker : Worker | null,
	canvasRenderingContext : CanvasRenderingContext2D | null,
	mousedown : boolean,
	xOfPosOnmousedown : number,
	yOfPosOnmousedown : number
}
=
{
	goingFullScreen: false,
	canvasElement: null,
	stopSpiningWheelCoroutine: true,
	wheelSpiningCoroutineUp: false,
	dprAdjustedHeigthOfCanvas: null,
	dprAdjustedWidthOfCanvas: null,
	renderingWorker: null,
	canvasRenderingContext: null,
	mousedown: false,
	xOfPosOnmousedown: 0,
	yOfPosOnmousedown: 0
};

