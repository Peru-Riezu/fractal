import { type Ref, ref } from "vue";

export type MainDisplayState =
{
	mainDisplayElement : Ref<HTMLDivElement | null>,
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
};

export function createStateOfMainDisplay() : MainDisplayState
{
	return (
		{
			mainDisplayElement: ref(null),
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
		}
	);
}
