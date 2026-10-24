<script lang="ts">
	import { asset } from '$app/paths';
	import { Icon, Progress, Surface } from 'bref-ui';
	import { Tween, prefersReducedMotion } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { projectPhotos, type Project } from './tasks.js';
	let {
		project,
		photo,
		projectName,
		completed,
		total
	}: {
		project: string;
		photo: Project['photo'];
		projectName: string;
		completed: number;
		total: number;
	} = $props();
	const progress = Tween.of(() => (total ? completed / total : 0), {
		duration: () => (prefersReducedMotion.current ? 0 : 400),
		easing: cubicOut
	});
</script>

<header data-project-stage data-project={project}>
	<img src={asset(projectPhotos[photo].src)} alt="" width="1600" height="900" />
	<div data-project-caption>
		<h1>{projectName}</h1>
		<div data-project-progress>
			<Surface
				glass
				variant="filled"
				color="background"
				radius="medium"
				spacing="medium"
				width="fit"
			>
				<span><Icon name="check_circle" />Completed {completed} of {total}</span>
				<Progress value={progress.current} label="Project completion" />
			</Surface>
		</div>
	</div>
</header>

<style>
	h1 {
		font-weight: 500;
		line-height: 1.15;
	}
	img {
		display: block;
		max-width: 100%;
	}
	[data-project-stage] {
		position: relative;
		isolation: isolate;
		height: 244px;
		border-radius: 24px;
		overflow: hidden;
		background: #dce5ef;
	}
	[data-project-stage] > img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center 55%;
		z-index: -2;
	}
	[data-project-stage]::after {
		content: '';
		position: absolute;
		inset: 0;
		z-index: -1;
		background: linear-gradient(90deg, #18283c99, #18283c0a);
	}
	[data-project-stage][data-project='website'] > img {
		object-position: center 65%;
	}
	[data-project-stage][data-project='website']::after {
		background: linear-gradient(90deg, #27395088, #27395000);
	}
	[data-project-caption] {
		height: 100%;
		display: flex;
		align-items: end;
		justify-content: space-between;
		gap: 24px;
		padding: 32px;
	}
	[data-project-stage] h1 {
		font:
			450 clamp(30px, 4vw, 44px)/1.1 'Inter Variable',
			sans-serif;
		letter-spacing: -0.05em;
		color: white;
	}
	@media (max-width: 650px) {
		[data-project-stage] {
			height: 260px;
			border-radius: 20px;
		}

		[data-project-caption] {
			align-items: start;
			justify-content: end;
			flex-direction: column;
			gap: 20px;
			padding: 24px;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		* {
			transition-duration: 0ms;
		}
	}
	[data-project-progress] {
		min-width: 208px;
		font-size: 12px;
	}
	[data-project-progress] span {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-bottom: 12px;
	}
</style>
