<script setup lang="ts">
	import { stateOfPixelData } from './stateOfPixelData';

</script>

<template>
	<div id="pixel_data">
		<h1 id="pixel_data_header">
			Pixel Data (hold alt to hold pixel):
		</h1>
		<div id="summary_pixel_data">
			<div id="iteration_count_of_pixel">
				iteration count: {{ stateOfPixelData.valuesOfEachIteration.value?.length }}
			</div>
		</div>
		<div id="abs_value_of_each_iteration">
			<h1 id="abs_value_of_each_iteration_header">
				Absolute value after each iteration:
			</h1>
			<div id="values_of_each_iteration">
				{{ stateOfPixelData.valuesOfEachIteration.value?.join("\n") }}
			</div>
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
