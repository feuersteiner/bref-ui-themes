<script lang="ts">
	import { Button, Pill } from '#lib/relay/index.js';
	import { onDestroy, tick } from 'svelte';
	import { flip } from 'svelte/animate';
	import { quintOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import { prefersReducedMotion } from 'svelte/motion';
	import { SvelteMap } from 'svelte/reactivity';
	import TaskCompletion from './task-completion.svelte';
	import type { Task, Project } from './tasks.js';
	let {
		tasks,
		projects,
		onEdit,
		onToggle
	}: {
		tasks: Task[];
		projects: Project[];
		onEdit: (task: Task) => void;
		onToggle: (id: number) => void;
	} = $props();
	const firstCompleted = $derived(tasks.find((task) => task.done)?.id);
	const pending = new SvelteMap<number, { done: boolean; timer: ReturnType<typeof setTimeout> }>();
	let board: HTMLUListElement;

	async function toggle(task: Task, done: boolean, input: HTMLInputElement) {
		const previous = pending.get(task.id);
		if (previous) clearTimeout(previous.timer);
		const settle = async () => {
			pending.delete(task.id);
			const current = tasks.find((item) => item.id === task.id) ?? task;
			if (current.done === done) return;
			const hadFocus = document.activeElement === input;
			const index = tasks.findIndex((item) => item.id === task.id);
			onToggle(task.id);
			await tick();
			// Moving keyed DOM nodes can drop focus; filters can remove the row entirely.
			if (
				hadFocus &&
				(document.activeElement === input || document.activeElement === document.body)
			) {
				const next =
					tasks.find((item) => item.id === task.id) ??
					tasks[Math.min(Math.max(index, 0), tasks.length - 1)];
				const target = next
					? board.querySelector<HTMLInputElement>(`[data-task-id="${next.id}"] input`)
					: board.closest<HTMLElement>('[role="tabpanel"]');
				target?.focus({ preventScroll: true });
			}
		};
		if (prefersReducedMotion.current) await settle();
		else pending.set(task.id, { done, timer: setTimeout(settle, done ? 560 : 440) });
	}

	onDestroy(() => {
		for (const { timer } of pending.values()) clearTimeout(timer);
	});
</script>

<ul data-task-board aria-label="Project tasks" bind:this={board}>
	{#each tasks as task (task.id)}
		<li
			data-task
			data-task-id={task.id}
			data-done={pending.get(task.id)?.done ?? task.done}
			transition:fly={{
				y: prefersReducedMotion.current ? 0 : 8,
				duration: prefersReducedMotion.current ? 0 : 180
			}}
			animate:flip={{
				duration: prefersReducedMotion.current ? 0 : 560,
				easing: quintOut
			}}
		>
			{#if task.id === firstCompleted}<h3 data-completed-heading>Completed</h3>{/if}
			{#key pending.get(task.id)}
				{#if pending.has(task.id)}
					<span data-task-wash data-completing={pending.get(task.id)?.done} aria-hidden="true"
					></span>
				{/if}
			{/key}
			<TaskCompletion
				done={pending.get(task.id)?.done ?? task.done}
				active={pending.has(task.id)}
				title={task.title}
				onchange={(done, input) => toggle(task, done, input)}
			/>
			<div data-task-content><h3><span data-task-title>{task.title}</span></h3></div>
			<div data-task-tags>
				<Pill
					label={projects.find((item) => item.id === task.project)?.label ?? 'Project'}
					icon={projects.find((item) => item.id === task.project)?.icon ?? { name: 'folder' }}
					size="small"
					variant="soft"
					color={task.project === 'website' ? 'primary' : 'secondary'}
					glass
				/>
				<Pill
					label={task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
					icon={{
						name:
							task.priority === 'high'
								? 'priority_high'
								: task.priority === 'medium'
									? 'flag'
									: 'low_priority'
					}}
					size="small"
					variant="neutral"
					color={task.priority === 'high' ? 'secondary' : 'muted'}
					glass
				/>
			</div>
			<span data-assignee>
				<span data-avatar aria-hidden="true">{task.assignee.slice(0, 1)}</span>
				{task.assignee}
			</span>
			<Button
				variant="neutral"
				glass
				rounded
				size="small"
				icon={{ name: 'edit', label: `Edit ${task.title}` }}
				onClick={() => onEdit(task)}
			/>
		</li>
	{/each}
	{#if !tasks.length}<li data-empty>No matching tasks.</li>{/if}
</ul>

<style>
	[data-task] {
		position: relative;
		isolation: isolate;
	}
	[data-task] [data-task-content] h3 {
		text-decoration: none;
		transition: color 320ms ease;
	}
	[data-task-title] {
		background: linear-gradient(currentColor, currentColor) no-repeat left 55% / 0% 1px;
		transition: background-size 320ms cubic-bezier(0.22, 1, 0.36, 1);
	}
	[data-task][data-done='true'] [data-task-content] h3 {
		text-decoration: none;
	}
	[data-done='true'] [data-task-title] {
		background-size: 100% 1px;
	}
	[data-task-wash] {
		position: absolute;
		inset: 0;
		z-index: -1;
		border-radius: inherit;
		pointer-events: none;
		background: linear-gradient(100deg, #587da825, #9cb8d50c 70%, transparent);
		transform-origin: left;
		animation: complete-wash 560ms ease-out both;
	}
	[data-task-wash][data-completing='false'] {
		background: linear-gradient(100deg, #ffffff99, #ffffff33 70%, transparent);
		animation: reopen-wash 440ms ease-out both;
	}
	@keyframes complete-wash {
		0% {
			opacity: 0;
			transform: scaleX(0.05);
		}
		35% {
			opacity: 1;
		}
		70% {
			opacity: 0.8;
			transform: scaleX(1);
		}
		100% {
			opacity: 0;
			transform: scaleX(1);
		}
	}
	@keyframes reopen-wash {
		0% {
			opacity: 0;
			transform: scaleX(0.15);
		}
		35% {
			opacity: 1;
		}
		100% {
			opacity: 0;
			transform: scaleX(1);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		[data-task] [data-task-content] h3,
		[data-task-title] {
			transition: none;
		}
		[data-task-wash] {
			animation: none;
		}
	}
</style>
