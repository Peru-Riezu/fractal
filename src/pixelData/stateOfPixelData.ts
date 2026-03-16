import { type Ref, ref } from "vue";

export const stateOfPixelData :
{
	valuesOfEachIteration : Ref<Array<string> | undefined>
}
=
{
	valuesOfEachIteration: ref(undefined)
};

