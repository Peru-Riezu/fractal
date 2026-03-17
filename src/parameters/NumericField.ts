import { type Ref, ref } from "vue";

export class NumericField
{
	value : Ref<number>;
	input : Ref<string>;

	constructor(initialValue : number)
	{
		this.value = ref(initialValue);
		this.input = ref(String(initialValue));
	}

	updateIfInputValid() : void
	{
		const trimmed : string = this.input.value.trim()
		const parsed : number = Number(trimmed)

		if (!trimmed || !Number.isFinite(parsed))
		{
			return;
		}

		this.value.value = parsed;
		return;
	}

	update(newValue : number) : void
	{
		this.value.value = newValue;
		this.input.value = String(newValue);
	}

	normalizeInput() : void
	{
		this.input.value = String(this.value.value);
	}
}
