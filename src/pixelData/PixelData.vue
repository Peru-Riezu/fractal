<script setup lang="ts">
	import type { PixelDataState } from './stateOfPixelData';

	const { pixelDataState } = defineProps<{pixelDataState : PixelDataState}>();
</script>

<template>
	<div id="pixel_data">
		<h1 id="pixel_data_header">
			Pixel Data (hold alt to hold pixel):
		</h1>
		<div id="iteration_count_of_pixel">
			iteration count: {{ pixelDataState.valuesOfEachIteration.value?.length }}
		</div>
		<div id="abs_value_of_each_iteration">
			<h1 id="abs_value_of_each_iteration_header">
				Absolute value after each iteration:
			</h1>
			<pre id="values_of_each_iteration">{{ pixelDataState.valuesOfEachIteration.value?.join("\n") }}</pre>
		</div>
	</div>
</template>

<style>
	#pixel_data
	{
		display: flex;
		flex-direction: column;
		overflow: auto;
		margin-left: 20px;
		margin-top: 9px;
		border: 2px;
		border-radius: 3px;
		border-color: black;
		border-style: solid;
		width: 250px;
		height: 100px;
	}

	#pixel_data_header, #abs_value_of_each_iteration_header
	{
		font-size: 12px;
		align-self: center;
		justify-self: center;
	}

	#iteration_count_of_pixel
	{
		font-size: 11px;
		margin-top: 2px;
		align-self: center;
	}

	#abs_value_of_each_iteration
	{
		display: flex;
		flex-direction: column;
	}

	#values_of_each_iteration
	{
		font-size: 10px;
		margin: 5px;
	}
</style>
