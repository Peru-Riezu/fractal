import { viewportPointToComplex, type ComplexPoint } from "./complexPlane";

type Color = {r : number, g : number, b : number};

const colorTable : Array<Color> =
[
	{r:5,	g:10,	b: 70},
	{r:8,	g:18,	b: 95},
	{r:10,	g:25,	b: 125},
	{r:12,	g:35,	b: 155},
	{r:8,	g:50,	b: 190},
	{r:0,	g:70,	b: 220},
	{r:0,	g:95,	b: 245},
	{r:20,	g:120,	b: 255},
	{r:45,	g:150,	b: 255},
	{r:70,	g:180,	b: 255},
	{r:95,	g:205,	b: 255},
	{r:120,	g:225,	b: 255},
	{r:0,	g:240,	b: 255},
	{r:0,	g:255,	b: 235},
	{r:0,	g:255,	b: 200},
	{r:0,	g:255,	b: 160},
	{r:253,	g:93,	b: 200},
	{r:162,	g:254,	b: 108},
	{r:114,	g:125,	b: 254},
	{r:254,	g:139,	b: 108},
	{r:93,	g:253,	b: 173},
	{r:216,	g:73,	b: 253},
	{r:236,	g:253,	b: 57},
	{r:51,	g:177,	b: 253},
	{r:253,	g:57,	b: 122},
	{r:57,	g:253,	b: 71},
	{r:253,	g:174,	b: 57},
	{r:91,	g:57,	b: 253},
	{r:57,	g:253,	b: 225},
	{r:253,	g:57,	b: 234},
	{r:200,	g:253,	b: 57},
	{r:57,	g:120,	b: 253},
	{r:253,	g:89,	b: 57},
	{r:57,	g:253,	b: 136},
	{r:156,	g:57,	b: 253},
	{r:57,	g:253,	b: 240},
	{r:253,	g:57,	b: 153},
	{r:57,	g:253,	b: 91},
	{r:253,	g:212,	b: 57},
	{r:120,	g:57,	b: 253},
	{r:57,	g:189,	b: 253},
	{r:253,	g:57,	b: 208},
	{r:216,	g:253,	b: 57},
	{r:57,	g:253,	b: 173},
	{r:253,	g:125,	b: 57},
	{r:57,	g:73,	b: 253},
	{r:253,	g:57,	b: 122},
	{r:57,	g:253,	b: 71},
	{r:253,	g:174,	b: 57},
	{r:91,	g:57,	b: 253},
	{r:57,	g:253,	b: 225},
	{r:253,	g:57,	b: 234},
	{r:200,	g:253,	b: 57},
	{r:57,	g:120,	b: 253},
	{r:253,	g:89,	b: 57},
	{r:57,	g:253,	b: 136},
	{r:156,	g:57,	b: 253},
	{r:57,	g:253,	b: 240},
	{r:253,	g:57,	b: 153},
	{r:57,	g:253,	b: 91},
	{r:253,	g:212,	b: 57},
	{r:120,	g:57,	b: 253},
	{r:57,	g:189,	b: 253},
	{r:253,	g:57,	b: 208},
	{r:216,	g:253,	b: 57},
	{r:57,	g:253,	b: 173},
	{r:253,	g:125,	b: 57},
	{r:57,	g:73,	b: 253},
	{r:253,	g:57,	b: 122},
	{r:57,	g:253,	b: 71},
	{r:253,	g:174,	b: 57},
	{r:91,	g:57,	b: 253},
	{r:57,	g:253,	b: 225},
	{r:253,	g:57,	b: 234},
	{r:200,	g:253,	b: 57},
	{r:57,	g:120,	b: 253},
	{r:253,	g:89,	b: 57},
	{r:57,	g:253,	b: 136},
	{r:156,	g:57,	b: 253},
	{r:57,	g:253,	b: 240},
	{r:253,	g:57,	b: 153},
	{r:57,	g:253,	b: 91},
	{r:253,	g:212,	b: 57},
	{r:120,	g:57,	b: 253},
	{r:57,	g:189,	b: 253},
	{r:253,	g:57,	b: 208},
	{r:145,	g:135,	b: 1},
	{r:1,	g:109,	b: 139},
	{r:122,	g:1,	b: 61},
	{r:21,	g:102,	b: 1},
	{r:9,	g:1,	b: 85},
	{r:79,	g:31,	b: 1},
	{r:1,	g:84,	b: 58},
	{r:94,	g:1,	b: 97},
	{r:82,	g:110,	b: 1},
	{r:1,	g:52,	b: 116},
];

function getColorFromIterations(iterations : number) : Color
{

	if (iterations == -1)
	{
		return ({r: 0, g: 0, b: 0});
	}

	const point1 : Color = colorTable[Math.floor(iterations) % colorTable.length]!;
	const point2 : Color = colorTable[(Math.floor(iterations) + 1) % colorTable.length]!;
	const dR : number = (point1.r - point2.r) * (iterations % 1);
	const dG : number = (point1.g - point2.g) * (iterations % 1);
	const dB : number = (point1.b - point2.b) * (iterations % 1);
	const finalPoint : Color = {r: point1.r - dR, g: point1.g - dG, b: point1.b - dB};

	return (finalPoint);
}

function countIterationsOfPoint(x : number, y : number, scapeRadius : number, maxIterations : number) : number
{
	let count : number = 1;
	const scapeRadiusSquared : number = scapeRadius * scapeRadius;
	const a : number = x;
	const b : number = y;
	let z : {a : number, b : number} = {a: a, b: b};

	while (count < maxIterations)
	{
		const abs : number = (z.a * z.a) + (z.b * z.b);

		if (abs > scapeRadiusSquared)
		{
			return (Math.max((count - ((Math.log(Math.log(abs) / Math.log(scapeRadiusSquared))) / (Math.log(2)))), 0));
		}
		z = {a: (z.a * z.a) - (z.b * z.b) + a, b: z.a * z.b * 2 + b};
		count++;
	}
	return (-1);
}

function getIterationsFromPos
(
	column : number,
	row : number,
	dprAdjustedWidth : number,
	dprAdjustedHeigth : number,
	scale : number,
	x : number,
	y : number,
	scapeRadius : number,
	maxIterations : number
) : number
{
	const currentPositonAdjusted : ComplexPoint = viewportPointToComplex
	(
		column,
		row,
		dprAdjustedWidth,
		dprAdjustedHeigth,
		scale,
		x,
		y
	);
	const countOfIterationsOfPoint : number =
		countIterationsOfPoint(currentPositonAdjusted.x, currentPositonAdjusted.y, scapeRadius, maxIterations);

	return (countOfIterationsOfPoint);
}

function getAntialiasedColorOfPoint
(
	column : number,
	row : number,
	dprAdjustedWidth : number,
	dprAdjustedHeigth : number,
	scale : number,
	x : number,
	y : number,
	scapeRadius : number,
	maxIterations : number,
	antialiasLevel : number
) : Color
{
	let red : number = 0;
	let green : number = 0;
	let blue : number = 0;
	let sampleCount : number = 0;

	function addSample(sampleColumn : number, sampleRow : number) : void
	{
		const color : Color =
			getColorFromIterations
			(
				getIterationsFromPos
				(
					sampleColumn,
					sampleRow,
					dprAdjustedWidth,
					dprAdjustedHeigth,
					scale,
					x,
					y,
					scapeRadius,
					maxIterations
				)
			);

		red += color.r;
		green += color.g;
		blue += color.b;
		sampleCount++;
	}

	addSample(column, row);

	for (let i : number = 0; i < antialiasLevel; i++)
	{
		const offset : number = (1 / 2 / (antialiasLevel + 1)) * (i + 1);
		const sampleOffsets : Array<{columnOffset : number, rowOffset : number}> =
		[
			{columnOffset: 0, rowOffset: offset},
			{columnOffset: 0, rowOffset: -offset},
			{columnOffset: offset, rowOffset: offset},
			{columnOffset: offset, rowOffset: -offset},
			{columnOffset: offset, rowOffset: 0},
			{columnOffset: -offset, rowOffset: offset},
			{columnOffset: -offset, rowOffset: -offset},
			{columnOffset: -offset, rowOffset: 0}
		];

		for (const sampleOffset of sampleOffsets)
		{
			addSample(column + sampleOffset.columnOffset, row + sampleOffset.rowOffset);
		}
	}

	return ({
		r: red / sampleCount,
		g: green / sampleCount,
		b: blue / sampleCount
	});
}

export function fillPixelArray
(
	pixels : Uint8ClampedArray<ArrayBuffer>,
	dprAdjustedWidth : number,
	dprAdjustedHeigth : number,
	scale : number,
	x : number,
	y : number,
	scapeRadius : number,
	maxIterations : number,
	antialiasLevel : number
) : void
{
	for (let i : number = 0; i < (pixels.byteLength / 4); i++)
	{
		const currentColumn : number = i % dprAdjustedWidth;
		const currentRow : number = Math.floor(i / dprAdjustedWidth);
		const color : Color =
			getAntialiasedColorOfPoint
			(
				currentColumn,
				currentRow,
				dprAdjustedWidth,
				dprAdjustedHeigth,
				scale,
				x,
				y,
				scapeRadius,
				maxIterations,
				antialiasLevel
			);

		pixels[i * 4] = color.r;
		pixels[i * 4 + 1] = color.g;
		pixels[i * 4 + 2] = color.b;
		pixels[i * 4 + 3] = 255;
	}
}
