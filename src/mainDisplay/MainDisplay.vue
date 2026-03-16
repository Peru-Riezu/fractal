<script setup lang="ts">
	import { toggleFullscreen } from './toggleFullscreen';
	import { setupMainDisplay } from './setUpMainDisplay';
	import { onFullscreenChange } from './onFullscreenChange';
	import { onMounted } from 'vue';

	onMounted(setupMainDisplay);
	window.addEventListener("resize", setupMainDisplay);
	window.addEventListener('fullscreenchange', onFullscreenChange);
</script>

<template>
	<div id="main_display">
		<div id="loading_icon">
			❌
		</div>
		<button
			id="fullscreen_icon"
			@click="toggleFullscreen"
		>
			📺
		</button>
		<canvas id="canvas" />
	</div>
</template>

<style>
	#main_display
	{
		display: flex;
		flex-direction: column;
	}

	#loading_icon
	{
		position: fixed;
		opacity: 0;
		rotate: 0deg;
		filter:
			grayscale(1) brightness(0)
			drop-shadow(1px 0 0 white)
			drop-shadow(-1px 0 0 white)
			drop-shadow(0 1px 0 white)
			drop-shadow(0 -1px 0 white);
		margin-top: 10px;
		margin-left: 10px;
	}

	#fullscreen_icon
	{
		position: fixed;
		opacity: 0;
		font-size: 20px;
		z-index: 1;
		margin-top: 10px;
		margin-left: calc(90vw - 45px);
	}

	#canvas
	{
		background: black;
		width: 90vw;
		height: 70vh;
	}
</style>
