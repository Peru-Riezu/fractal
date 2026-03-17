import { type Ref, ref } from "vue";

export type PixelDataState =
{
	valuesOfEachIteration : Ref<Array<string> | undefined>
};

export function createStateOfPixelData() : PixelDataState
{
	return (
		{
			valuesOfEachIteration: ref(undefined)
		}
	);
}
