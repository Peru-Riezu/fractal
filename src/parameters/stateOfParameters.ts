import { type Ref, ref } from "vue";

export const stateOfParameters :
{
	scale : number,
	xOfOrigin : number,
	yOfOrigin : number,
	scapeRadius : number,
	maxIterations : number,
	antialiasLevel : number
	scaleInput : Ref<string>,
	xOfOriginInput : Ref<string>,
	yOfOriginInput : Ref<string>,
	scapeRadiusInput : Ref<string>,
	maxIterationsInput : Ref<string>,
	antialiasLevelInput : Ref<string>
}
=
{
	scale : 2,
	xOfOrigin : 0,
	yOfOrigin : 0,
	scapeRadius : 2,
	maxIterations : 150,
	antialiasLevel : 0,
	scaleInput: ref<string>("2"),
	xOfOriginInput: ref<string>("0"),
	yOfOriginInput: ref<string>("0"),
	scapeRadiusInput: ref<string>("2"),
	maxIterationsInput: ref<string>("150"),
	antialiasLevelInput: ref<string>("0")
};

