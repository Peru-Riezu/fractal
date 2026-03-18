<script setup lang="ts">
	import { toggleFullscreen } from './toggleFullscreen';
	import { setupMainDisplay } from './setUpMainDisplay';
	import { onFullscreenChange } from './onFullscreenChange';
	import { onMounted, onUnmounted, watch, type ModelRef } from 'vue';
	import { resize } from './resize';
	import { mousedownInCanvas } from './mousedownInCanvas';
	import { mouseLeftCanvas } from './mouseLeftCanvas';
	import { mouseMoveInCanvas } from './mouseMoveInCanvas';
	import { mouseupInCanvas } from './mouseupInCanvas';
	import { wheelMoveInCanvas } from './wheelMoveInCanvas';
	import { doubleClickInCanvas } from './doubleClickInCanvas';
	import type { MainDisplayState } from './stateOfMainDisplay';
	import type { ParametersState } from '@/parameters/stateOfParameters';
	import type { PixelDataState } from '@/pixelData/stateOfPixelData';
	import { render } from './render';

	const mainDisplayState : ModelRef<MainDisplayState> = defineModel<MainDisplayState>('main-display-state', {required: true});
	const parametersState : ModelRef<ParametersState> = defineModel<ParametersState>('parameters-state', {required: true});
	const pixelDataState : ModelRef<PixelDataState> = defineModel<PixelDataState>('pixel-data-state', {required: true});

	let resizeObserver : ResizeObserver | null = null;

	watch
		(
			() =>
				[
					parametersState.value.antialiasLevel.value.value,
					parametersState.value.maxIterations.value.value,
					parametersState.value.scale.value.value,
					parametersState.value.scapeRadius.value.value,
					parametersState.value.xOfOrigin.value.value,
					parametersState.value.yOfOrigin.value.value
				],
			() => render(mainDisplayState.value, parametersState.value)
		);

	function handleFullscreenChange() : void
	{
		onFullscreenChange(mainDisplayState.value);
	}

	function handlePointerDown(e : PointerEvent) : void
	{
		mousedownInCanvas(e, mainDisplayState.value, parametersState.value);
	}

	function handlePointerMove(e : PointerEvent) : void
	{
		mouseMoveInCanvas(e, mainDisplayState.value, parametersState.value, pixelDataState.value);
	}

	function handlePointerUp(e : PointerEvent) : void
	{
		mouseupInCanvas(e, mainDisplayState.value);
	}

	function handlePointerLeave(e : PointerEvent) : void
	{
		mouseLeftCanvas(e, mainDisplayState.value, pixelDataState.value);
	}

	function handleDoubleClick(e : MouseEvent) : void
	{
		doubleClickInCanvas(e, mainDisplayState.value, parametersState.value);
	}

	function handleWheel(e : WheelEvent) : void
	{
		wheelMoveInCanvas(e, mainDisplayState.value, parametersState.value);
	}

	onMounted
		(
			() =>
			{
				setupMainDisplay(mainDisplayState.value, parametersState.value);
				document.addEventListener('fullscreenchange', handleFullscreenChange);
				if (mainDisplayState.value.canvasElement.value != null)
				{
					resizeObserver = new ResizeObserver(() => resize(mainDisplayState.value, parametersState.value));
					resizeObserver.observe(mainDisplayState.value.canvasElement.value);
				}
			}
		);

	onUnmounted
		(
			() =>
			{
				resizeObserver?.disconnect();
				resizeObserver = null;
				document.removeEventListener('fullscreenchange', handleFullscreenChange);
				mainDisplayState.value.renderingWorker?.terminate();
				mainDisplayState.value.renderingWorker = null;
				mainDisplayState.value.canvasRenderingContext = null;
				mainDisplayState.value.frameIsRendering.value = false;
				mainDisplayState.value.showFullScreenButton.value = false;
				mainDisplayState.value.onFullscreenMode.value = false;
				mainDisplayState.value.mousedown = false;
			}
		);
</script>

<template>
	<div
		id="main_display"
		:ref="mainDisplayState.mainDisplayElement"
	>
		<div
			v-show="mainDisplayState.frameIsRendering.value"
			id="loading_icon"
		>
			❌
		</div>
		<button
			v-show="mainDisplayState.showFullScreenButton.value && mainDisplayState.onFullscreenMode.value == false"
			id="fullscreen_icon"
			@click="toggleFullscreen(mainDisplayState)"
		>
			📺
		</button>
		<canvas
			id="canvas"
			:ref="mainDisplayState.canvasElement"
			@pointerdown="handlePointerDown"
			@pointermove="handlePointerMove"
			@pointerup="handlePointerUp"
			@pointercancel="handlePointerUp"
			@pointerleave="handlePointerLeave"
			@dblclick="handleDoubleClick"
			@wheel.prevent="handleWheel"
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
		animation: spin 1s linear infinite;
		position: fixed;
		pointer-events: none;
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

	#main_display:fullscreen #canvas
	{
		width: 100vw;
		height: 100vh;
	}
</style>
