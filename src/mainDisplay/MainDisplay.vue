<script setup lang="ts">
	import { toggleFullscreen } from './toggleFullscreen';
	import { setupMainDisplay } from './setUpMainDisplay';
	import { onFullscreenChange } from './onFullscreenChange';
	import { onMounted } from 'vue';
	import {resize} from './resize';
	import {mousedownInCanvas} from './mousedownInCanvas';
	import { mouseLeftCanvas } from './mouseLeftCanvas';
	import {mouseMoveInCanvas} from './mouseMoveInCanvas';
	import {mouseupInCanvas} from './mouseupInCanvas';
	import {wheelMoveInCanvas} from './wheelMoveInCanvas';
	import {doubleClickInCanvas} from './doubleClickInCanvas';
	import { stateOfMainDisplay } from './stateOfMainDisplay';

	onMounted(setupMainDisplay);
	window.addEventListener("resize", resize);
	window.addEventListener('fullscreenchange', onFullscreenChange);
</script>

<template>
	<div id="main_display">
		<div
			v-show="stateOfMainDisplay.frameIsRendering.value"
			id="loading_icon"
		>
			❌
		</div>
		<button
			v-show="stateOfMainDisplay.showFullScreenButton.value && stateOfMainDisplay.onFullscreenMode.value == false"
			id="fullscreen_icon"
			@click="toggleFullscreen"
		>
			📺
		</button>
		<canvas
			id="canvas"
			:ref="stateOfMainDisplay.canvasElement"
			@pointerdown="mousedownInCanvas"
			@pointermove="mouseMoveInCanvas"
			@pointerup="mouseupInCanvas"
			@pointerleave="mouseLeftCanvas"
			@dblclick="doubleClickInCanvas"
			@wheel.prevent="wheelMoveInCanvas"
		/>
	</div>
</template>

<style>
	#main_display
	{
		display: flex;
		flex-direction: column;
	}

	@keyframes spin
	{
		from
		{
			transform: rotate(0deg);
		}
		to
		{
			transform: rotate(360deg);
		}
	}

	#loading_icon
	{
		animation: spin 5s linear infinite;
		position: fixed;
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
		font-size: 20px;
		margin-top: 10px;
		margin-left: calc(90vw - 45px);
	}

	#canvas
	{
		background: black;
		width: 90vw;
		height: 70vh;
	}

	#main_display:fullscreen #canvas
	{
		width: 100vw;
		height: 100vh;
	}
</style>
