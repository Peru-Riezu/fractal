<script setup lang="ts">
	import MainDisplay from "./mainDisplay/MainDisplay.vue";
	import Parameters from "./parameters/Parameters.vue";
	import PixelData from "./pixelData/PixelData.vue";

</script>

<template>
	<div id="content_container">
		<h1 id="title">
			Fractal
		</h1>
		<MainDisplay />
		<div id="footer">
			<Parameters />
			<PixelData />
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

	#summary_pixel_data
	{
		display: flex;
		flex-direction: row;
		justify-items: center;
		justify-content: space-evenly;
		align-items: center;
	}
</style>
