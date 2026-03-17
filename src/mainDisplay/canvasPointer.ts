import { type ComplexPoint, viewportPointToComplex } from "./complexPlane";

export function clientPointToComplex
(
	clientX : number,
	clientY : number,
	canvasElement : HTMLCanvasElement,
	scale : number,
	xOfOrigin : number,
	yOfOrigin : number
) : ComplexPoint
{
	const rect : DOMRect = canvasElement.getBoundingClientRect();
	const column : number = Math.floor(clientX - rect.left);
	const row : number = Math.floor(clientY - rect.top);

	return (
		viewportPointToComplex
		(
			column,
			row,
			canvasElement.clientWidth,
			canvasElement.clientHeight,
			scale,
			xOfOrigin,
			yOfOrigin
		)
	);
}
