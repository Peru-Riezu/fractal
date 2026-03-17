export type ComplexPoint = {x : number, y : number};

export function viewportPointToComplex
(
	column : number,
	row : number,
	width : number,
	height : number,
	scale : number,
	xOfOrigin : number,
	yOfOrigin : number
) : ComplexPoint
{
	const normalizedX : number = ((column / (width - 1)) * 2) - 1;
	const normalizedY : number = ((row / (height - 1)) * -2) + 1;
	const scaleOfXtoY : number = width / height;
	const scaledX : number = normalizedX * (scale / 2) * scaleOfXtoY;
	const scaledY : number = normalizedY * (scale / 2);

	return ({x: scaledX + xOfOrigin, y: scaledY + yOfOrigin});
}
