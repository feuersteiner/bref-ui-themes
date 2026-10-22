<script lang="ts">
	let {
		done,
		active,
		title,
		onchange
	}: {
		done: boolean;
		active: boolean;
		title: string;
		onchange: (done: boolean, input: HTMLInputElement) => void;
	} = $props();
</script>

<div data-checkbox data-motion={active ? (done ? 'complete' : 'undo') : undefined}>
	<input
		type="checkbox"
		checked={done}
		aria-label={`${done ? 'Reopen' : 'Complete'} ${title}`}
		onchange={(event) => onchange(event.currentTarget.checked, event.currentTarget)}
	/>
	<svg data-check viewBox="0 0 24 24" fill="none" aria-hidden="true">
		<path d="m5 12 4.5 4.5L19 7" pathLength="1" />
	</svg>
	<span data-ring aria-hidden="true"></span>
	{#each [0, 1, 2, 3] as ray (ray)}
		<span data-ray style={`--angle: ${ray * 90 + 45}deg`} aria-hidden="true"></span>
	{/each}
</div>

<style>
	[data-checkbox] {
		position: relative;
		display: grid;
		place-items: center;
		inline-size: 1.375rem;
		block-size: 1.375rem;
		border: 1px solid #6e829e;
		color: white;
		touch-action: manipulation;
	}
	input {
		position: absolute;
		z-index: 1;
		inset: -8px;
		inline-size: calc(100% + 16px);
		block-size: calc(100% + 16px);
		margin: 0;
		opacity: 0;
		cursor: pointer;
	}
	[data-checkbox]:has(input:focus-visible) {
		outline: 2px solid var(--color-primary);
		outline-offset: 4px;
	}
	[data-check] {
		inline-size: 19px;
		block-size: 19px;
		pointer-events: none;
		transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1);
	}
	path {
		stroke: currentColor;
		stroke-width: 2.5;
		stroke-linecap: round;
		stroke-linejoin: round;
		stroke-dasharray: 1;
		stroke-dashoffset: 1;
		transition: stroke-dashoffset 220ms ease-in;
	}
	input:checked + svg path {
		stroke-dashoffset: 0;
		transition: stroke-dashoffset 300ms 70ms cubic-bezier(0.16, 1, 0.3, 1);
	}
	[data-ring],
	[data-ray] {
		position: absolute;
		pointer-events: none;
		opacity: 0;
		color: #587da8;
	}
	[data-ring] {
		inset: -7px;
		border: 1.5px solid currentColor;
		border-radius: 50%;
	}
	[data-ray] {
		inline-size: 3px;
		block-size: 5px;
		border-radius: 2px;
		background: currentColor;
		transform: rotate(var(--angle)) translateY(-13px);
	}
	[data-motion='complete'] {
		animation: press-and-pop 520ms both;
	}
	[data-motion='complete'] [data-ring] {
		animation: release-ring 500ms 70ms ease-out both;
	}
	[data-motion='complete'] [data-ray] {
		animation: release-rays 460ms 100ms ease-out both;
	}
	[data-motion='undo'] {
		animation: undo-pop 420ms both;
	}
	[data-motion='undo'] [data-ring] {
		animation: gather-ring 380ms ease-out both;
	}
	@keyframes press-and-pop {
		0% {
			transform: scale(1);
		}
		18% {
			transform: scale(0.82) rotate(-8deg);
		}
		48% {
			transform: scale(1.22) rotate(5deg);
		}
		72% {
			transform: scale(0.96) rotate(-2deg);
		}
		100% {
			transform: scale(1);
		}
	}
	@keyframes undo-pop {
		0% {
			transform: scale(1);
		}
		25% {
			transform: scale(0.84) rotate(7deg);
		}
		65% {
			transform: scale(1.12) rotate(-3deg);
		}
		100% {
			transform: scale(1);
		}
	}
	@keyframes release-ring {
		0% {
			opacity: 0.65;
			transform: scale(0.6);
		}
		100% {
			opacity: 0;
			transform: scale(1.6);
		}
	}
	@keyframes gather-ring {
		0% {
			opacity: 0;
			transform: scale(1.5);
		}
		30% {
			opacity: 0.5;
		}
		100% {
			opacity: 0;
			transform: scale(0.55);
		}
	}
	@keyframes release-rays {
		0% {
			opacity: 0;
			transform: rotate(var(--angle)) translateY(-12px) scale(0.5);
		}
		25% {
			opacity: 0.8;
		}
		100% {
			opacity: 0;
			transform: rotate(var(--angle)) translateY(-25px) scale(0.4);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		[data-checkbox],
		[data-ring],
		[data-ray] {
			animation: none;
		}
		[data-check],
		path,
		input:checked + svg path {
			transition: none;
		}
	}
	@media (forced-colors: active) {
		[data-checkbox] {
			color: CanvasText;
		}
		[data-checkbox]:has(input:checked) {
			color: HighlightText;
			background: Highlight;
		}
		[data-checkbox]:has(input:focus-visible) {
			outline-color: Highlight;
		}
	}
</style>
