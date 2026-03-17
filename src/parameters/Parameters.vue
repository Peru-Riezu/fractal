<script setup lang="ts">
	import type { NumericField } from './NumericField';

	const
		{
			scaleField,
			xOfOriginField,
			yOfOriginField,
			scapeRadiusField,
			maxIterationsField,
			antialiasLevelField
		} =
			defineProps
				<
					{
						scaleField : NumericField,
						xOfOriginField : NumericField,
						yOfOriginField : NumericField,
						scapeRadiusField : NumericField,
						maxIterationsField : NumericField,
						antialiasLevelField : NumericField
					}
				>();

</script>

<template>
	<div id="parameters">
		<div id="scale_form">
			<label
				id="scale_label"
				for="scale_input"
			>
				change on the vertical axis (scale):
			</label>
			<input
				id="scale_input"
				:value="scaleField.input.value"
				type="text"
				inputmode="decimal"
				placeholder="2"
				@input="scaleField.updateIfInputValid()"
				@blur="scaleField.normalizeInput()"
			>
		</div>
		<fieldset id="origin_form">
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
					:value="xOfOriginField.input.value"
					type="text"
					inputmode="decimal"
					placeholder="0"
					@input="xOfOriginField.updateIfInputValid()"
					@blur="xOfOriginField.normalizeInput()"
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
					:value="yOfOriginField.input.value"
					type="text"
					inputmode="decimal"
					placeholder="0"
					@input="yOfOriginField.updateIfInputValid()"
					@blur="yOfOriginField.normalizeInput()"
				>
			</div>
		</fieldset>
		<div id="scape_radius_form">
			<label
				id="scape_radius_label"
				for="scape_radius_input"
			>
				scape radius:
			</label>
			<input
				id="scape_radius_input"
				:value="scapeRadiusField.input.value"
				type="text"
				inputmode="decimal"
				placeholder="2"
				@input="scapeRadiusField.updateIfInputValid()"
				@blur="scapeRadiusField.normalizeInput()"
			>
		</div>
		<div id="max_iterations_form">
			<label
				id="max_iterations_label"
				for="max_iterations_input"
			>
				max iterations:
			</label>
			<input
				id="max_iterations_input"
				:value="maxIterationsField.input.value"
				type="text"
				inputmode="numeric"
				placeholder="150"
				@input="maxIterationsField.updateIfInputValid()"
				@blur="maxIterationsField.normalizeInput()"
			>
		</div>
		<div id="antialiasing_level_form">
			<label
				id="antialiasing_level_label"
				for="antialiasing_level_input"
			>
				antialiasing level:
			</label>
			<input
				id="antialiasing_level_input"
				:value="antialiasLevelField.input.value"
				type="text"
				inputmode="numeric"
				placeholder="0"
				@input="antialiasLevelField.updateIfInputValid()"
				@blur="antialiasLevelField.normalizeInput()"
			>
		</div>
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
		border: none;
		margin: 0;
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
