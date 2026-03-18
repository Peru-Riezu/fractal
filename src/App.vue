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
			v-model:pixel-data-state="pixelDataState"
			v-model:main-display-state="mainDisplayState"
			v-model:parameters-state="parametersState"
		/>
		<div id="footer">
			<Parameters v-model="parametersState" />
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
