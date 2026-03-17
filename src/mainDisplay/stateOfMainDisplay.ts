import { type Ref, ref } from "vue";

export const stateOfMainDisplay :
{
	goingFullScreen : boolean,
	canvasElement : Ref<HTMLCanvasElement | null>,
	frameIsRendering : Ref<boolean>,
	showFullScreenButton : Ref<boolean>,
	onFullscreenMode : Ref<boolean>,
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
	canvasElement: ref(null),
	showFullScreenButton: ref(false),
	onFullscreenMode: ref(false),
	frameIsRendering: ref(false),
	dprAdjustedHeigthOfCanvas: null,
	dprAdjustedWidthOfCanvas: null,
	renderingWorker: null,
	canvasRenderingContext: null,
	mousedown: false,
	xOfPosOnmousedown: 0,
	yOfPosOnmousedown: 0
};

