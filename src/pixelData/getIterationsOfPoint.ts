import { stateOfParameters } from "../parameters/stateOfParameters.ts";

export function getIterationsOfPoint(x : number, y : number) : Array<string>
{
	const res : Array<string> = new Array<string>();
	let count : number = 1;
	const a : number = x;
	const b : number = y;
	const scapeRadiusSquared : number = stateOfParameters.scapeRadius.value.value * stateOfParameters.scapeRadius.value.value;
	let z : {a : number, b : number} = {a: a, b: b};

	while (count <= stateOfParameters.maxIterations.value.value)
	{
		const abs : number = (z.a * z.a) + (z.b * z.b);

		res.push(`abs(${z.a}+(${z.b}i)) = ${abs}`);
		if (abs > (scapeRadiusSquared))
		{
			break;
		}
		z = {a: (z.a * z.a) - (z.b * z.b) + a, b: z.a * z.b * 2 + b};
		count++;
	}
	return (res);
}
