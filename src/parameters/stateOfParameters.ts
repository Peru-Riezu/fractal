import { NumericField } from "./NumericField";

export const stateOfParameters :
{
	scale : NumericField,
	xOfOrigin : NumericField,
	yOfOrigin : NumericField,
	scapeRadius : NumericField,
	maxIterations : NumericField,
	antialiasLevel : NumericField
}
=
{
	scale : new NumericField(2),
	xOfOrigin : new NumericField(0),
	yOfOrigin : new NumericField(0),
	scapeRadius : new NumericField(2),
	maxIterations : new NumericField(150),
	antialiasLevel : new NumericField(0)
};

