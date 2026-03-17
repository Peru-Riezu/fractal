<script setup lang="ts">
	import { toggleFullscreen } from './toggleFullscreen';
	import { setupMainDisplay } from './setUpMainDisplay';
	import { onFullscreenChange } from './onFullscreenChange';
	import { onMounted, onUnmounted, watch } from 'vue';
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

	const { mainDisplayState, parametersState, pixelDataState } = defineProps
	<
		{
			mainDisplayState : MainDisplayState,
			parametersState : ParametersState,
			pixelDataState : PixelDataState
		}
	>();

	let resizeObserver : ResizeObserver | null = null;

	watch
		(
			() =>
			[
				parametersState.antialiasLevel.value.value,
				parametersState.maxIterations.value.value,
				parametersState.scale.value.value,
				parametersState.scapeRadius.value.value,
				parametersState.xOfOrigin.value.value,
				parametersState.yOfOrigin.value.value
			],
			() => render(mainDisplayState, parametersState)
		);

	function handleFullscreenChange() : void
	{
		onFullscreenChange(mainDisplayState);
	}

	function handlePointerDown(e : PointerEvent) : void
	{
		mousedownInCanvas(e, mainDisplayState, parametersState);
	}

	function handlePointerMove(e : PointerEvent) : void
	{
		mouseMoveInCanvas(e, mainDisplayState, parametersState, pixelDataState);
	}

	function handlePointerUp(e : PointerEvent) : void
	{
		mouseupInCanvas(e, mainDisplayState);
	}

	function handlePointerLeave(e : PointerEvent) : void
	{
		mouseLeftCanvas(e, mainDisplayState, pixelDataState);
	}

	function handleDoubleClick(e : MouseEvent) : void
	{
		doubleClickInCanvas(e, mainDisplayState, parametersState);
	}

	function handleWheel(e : WheelEvent) : void
	{
		wheelMoveInCanvas(e, mainDisplayState, parametersState);
	}

	onMounted
			(
				() =>
				{
					setupMainDisplay(mainDisplayState, parametersState);
					document.addEventListener('fullscreenchange', handleFullscreenChange);
					if (mainDisplayState.canvasElement.value != null)
					{
						resizeObserver = new ResizeObserver(() => resize(mainDisplayState, parametersState));
						resizeObserver.observe(mainDisplayState.canvasElement.value);
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
					mainDisplayState.renderingWorker?.terminate();
					mainDisplayState.renderingWorker = null;
					mainDisplayState.canvasRenderingContext = null;
					mainDisplayState.frameIsRendering.value = false;
					mainDisplayState.showFullScreenButton.value = false;
					mainDisplayState.onFullscreenMode.value = false;
					mainDisplayState.mousedown = false;
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
