<script setup lang="ts">
	import { stateOfParameters } from './stateOfParameters';
	import { watch } from 'vue';
	import { render } from '@/mainDisplay/render';

	watch
		(
			stateOfParameters.scaleInput,
			() =>
			{
				if ((stateOfParameters.scaleInput.value.trim() !== "") && Number.isFinite(Number(stateOfParameters.scaleInput.value)))
				{
					stateOfParameters.scale = Number(stateOfParameters.scaleInput.value);
					render();
				}
			}
		)

	watch
		(
			stateOfParameters.yOfOriginInput,
			() =>
			{
				if ((stateOfParameters.yOfOriginInput.value.trim() !== "") && Number.isFinite(Number(stateOfParameters.yOfOriginInput.value)))
				{
					stateOfParameters.yOfOrigin = Number(stateOfParameters.yOfOriginInput.value);
					render();
				}
			}
		)

	watch
		(
			stateOfParameters.xOfOriginInput,
			() =>
			{
				if ((stateOfParameters.xOfOriginInput.value.trim() !== "") && Number.isFinite(Number(stateOfParameters.xOfOriginInput.value)))
				{
					stateOfParameters.xOfOrigin = Number(stateOfParameters.xOfOriginInput.value);
					render();
				}
			}
		)

	watch
		(
			stateOfParameters.scapeRadiusInput,
			() =>
			{
				if 
					(
						(stateOfParameters.scapeRadiusInput.value.trim() !== "")
						&&
						Number.isFinite(Number(stateOfParameters.scapeRadiusInput.value)
						)
					)
				{
					stateOfParameters.scapeRadius = Number(stateOfParameters.scapeRadiusInput.value);
					render();
				}
			}
		)

	watch
		(
			stateOfParameters.maxIterationsInput,
			() =>
			{
				if
					(
						(stateOfParameters.maxIterationsInput.value.trim() !== "")
						&&
						Number.isFinite(Number(stateOfParameters.maxIterationsInput.value)
						)
					)
				{
					stateOfParameters.maxIterations = Number(stateOfParameters.maxIterationsInput.value);
					render();
				}
			}
		)

	watch
		(
			stateOfParameters.antialiasLevelInput,
			() =>
			{
				if
					(
						(stateOfParameters.antialiasLevelInput.value.trim() !== "")
						&&
						Number.isFinite(Number(stateOfParameters.antialiasLevelInput.value)
						)
					)
				{
					stateOfParameters.antialiasLevel = Number(stateOfParameters.antialiasLevelInput.value);
					render();
				}
			}
		)

</script>

<template>
	<div id="parameters">
		<form id="scale_form">
			<label
				id="scale_label"
				for="scale_input"
			>
				change on the vertical axis (scale):
			</label>
			<input
				id="scale_input"
				v-model="stateOfParameters.scaleInput.value"
				type="text"
				placeholder="2"
			>
		</form>
		<form id="origin_form">
			<legend> origin (where to look): </legend>
			<div id="origin_x_label_input_pair">
				<label
					id="origin_x_label"
					for="origin_x_input"
				>
					x (position in the horizontal axis):
				</label>
				<input
					id="origin_x_input"
					v-model="stateOfParameters.xOfOriginInput.value"
					type="text"
					placeholder="0"
				>
			</div>
			<div id="origin_y_label_input_pair">
				<label
					id="origin_y_label"
					for="origin_y_input"
				>
					y (position in the vertical axis):
				</label>
				<input
					id="origin_y_input"
					v-model="stateOfParameters.yOfOriginInput.value"
					type="text"
					placeholder="0"
				>
			</div>
		</form>
		<form id="scape_radius_form">
			<label
				id="scape_radius_label"
				for="scape_radius_input"
			>
				scape radius:
			</label>
			<input
				id="scape_radius_input"
				v-model="stateOfParameters.scapeRadiusInput.value"
				type="text"
				placeholder="2"
			>
		</form>
		<form id="max_iterations_form">
			<label
				id="max_iterations_label"
				for="max_iterations_input"
			>
				max iterations:
			</label>
			<input
				id="max_iterations_input"
				v-model="stateOfParameters.maxIterationsInput.value"
				type="text"
				placeholder="150"
			>
		</form>
		<form id="antialiasing_level_form">
			<label
				id="antialiasing_level_label"
				for="antialiasing_level_input"
			>
				antialiasing level:
			</label>
			<input
				id="antialiasing_level_input"
				v-model="stateOfParameters.antialiasLevelInput.value"
				type="text"
				placeholder="0"
			>
		</form>
	</div>
</template>

<style>
	#parameters
	{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-items: center;
		width: fit-content;
		overflow: auto;
		height: 120px;
	}

	#scale_form, #scape_radius_form, #max_iterations_form, #antialiasing_level_form
	{
		display: flex;
		flex-direction: row;
		width: min-content;
		padding-top: 10px;
	}

	#scale_label, #scape_radius_label, #max_iterations_label, #antialiasing_level_label
	{
		width: max-content;
		padding-right: 10px;
	}

	#scale_input, #scape_radius_input, #max_iterations_input, #antialiasing_level_input
	{
		width: 5ch;
		text-align: right;
	}

	#origin_form
	{
		padding-top: 10px;
		padding-bottom: 10px;
		display: flex;
		flex-direction: column;
	}

	#origin_x_label_input_pair,
	#origin_y_label_input_pair
	{
		padding-left: 10px;
		padding-top: 3px;
	}

	#origin_x_input,
	#origin_y_input
	{
		width: 5ch;
		text-align: right;
	}

	#origin_y_input
	{
		margin-left: 17px;
	}

	#scape_radius_input
	{
		margin-left: 140px;
	}

	#max_iterations_input
	{
		margin-left: 127px;
	}

	#antialiasing_level_input
	{
		margin-left: 110px;
	}
</style>
