<script setup lang="ts">
	import MainDisplay from "./mainDisplay/MainDisplay.vue";
	import Parameters from "./parameters/Parameters.vue";
	import PixelData from "./pixelData/PixelData.vue";
	import { createStateOfMainDisplay, type MainDisplayState } from "./mainDisplay/stateOfMainDisplay";
	import { createStateOfParameters, type ParametersState } from "./parameters/stateOfParameters";
	import { createStateOfPixelData, type PixelDataState } from "./pixelData/stateOfPixelData";

	const mainDisplayState : MainDisplayState  = createStateOfMainDisplay();
	const parametersState : ParametersState = createStateOfParameters();
	const pixelDataState : PixelDataState = createStateOfPixelData();
</script>

<template>
	<div id="content_container">
		<h1 id="title">
			Fractal
		</h1>
		<MainDisplay
			:main-display-state="mainDisplayState"
			:parameters-state="parametersState"
			:pixel-data-state="pixelDataState"
		/>
		<div id="footer">
			<Parameters
				:scale-field="parametersState.scale"
				:x-of-origin-field="parametersState.xOfOrigin"
				:y-of-origin-field="parametersState.yOfOrigin"
				:scape-radius-field="parametersState.scapeRadius"
				:max-iterations-field="parametersState.maxIterations"
				:antialias-level-field="parametersState.antialiasLevel"
			/>
			<PixelData :pixel-data-state="pixelDataState" />
		</div>
	</div>
</template>

<style scoped>
	#content_container
	{
		position: fixed;
		inset: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		flex-wrap: nowrap;
		height: 100vh;
		width: 100vw;
	}

	#footer
	{
		display: flex;
		flex-direction: row;
	}
</style>
