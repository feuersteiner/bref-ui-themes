export type RunStatus = 'queued' | 'running' | 'completed' | 'cancelled';
export type Message = { id: number; role: 'user' | 'agent'; text: string };
export type RunNode = {
	name: string;
	purpose: string;
	result: string;
	progress: number;
	output?: string;
};
export type Run = {
	id: number;
	title: string;
	workflow: number;
	status: RunStatus;
	step: number;
	instruction: string;
	draft: string;
	messages: Message[];
	nodes: RunNode[];
};

export const workflows = [
	{
		name: 'Plan a product launch',
		prompt: 'Plan a calm, focused launch for a small creative tool.',
		report: {
			icon: 'rocket_launch',
			title: 'A focused launch plan',
			summary: 'Start small. Learn from real work before opening the doors.',
			findings: [
				{
					icon: 'group',
					title: 'Audience',
					text: 'Independent designers building a regular creative practice.'
				},
				{
					icon: 'lightbulb',
					title: 'The angle',
					text: 'Fewer steps from the first idea to finished work.'
				},
				{
					icon: 'calendar_month',
					title: 'Three weeks',
					text: 'Invite 12 early users. Share three real workflows. Open a small public release.'
				}
			],
			next: 'Schedule 12 early-user conversations before widening the launch.'
		},
		steps: [
			[
				'Find the angle',
				'Identify the audience and the clearest reason to care.',
				'Start with independent designers. Lead with fewer steps from idea to finished work.'
			],
			[
				'Shape the plan',
				'Turn the research into a practical sequence.',
				'Week 1: invite 12 early users. Week 2: share three real workflows. Week 3: open a small public release.'
			],
			[
				'Write the brief',
				'Bring the decisions together.',
				'Audience: independent designers. Promise: fewer steps to finished work. Success: 12 conversations before a wider launch.'
			]
		]
	},
	{
		name: 'Shape a landing page',
		prompt: 'Outline a simple landing page for a thoughtful note-taking app.',
		report: {
			icon: 'web',
			title: 'A little space to think',
			summary: 'Keep loose thoughts, useful links and next steps in one quiet place.',
			findings: [
				{
					icon: 'edit_note',
					title: 'Capture',
					text: 'Save an idea without breaking focus. Show one real note above the fold.'
				},
				{
					icon: 'link',
					title: 'Connect',
					text: 'Bring related notes together when a pattern appears.'
				},
				{ icon: 'search', title: 'Find', text: 'Pick up the thread again with a simple search.' }
			],
			next: 'Close with one invitation: Start a notebook.'
		},
		steps: [
			[
				'Explore the idea',
				'Clarify the visitor’s need.',
				'Visitors need a quiet place to keep ideas together. Show that value in one glance.'
			],
			[
				'Map the story',
				'Choose a short page structure.',
				'One clear promise, a real example, three useful details and an invitation to try it.'
			],
			[
				'Draft the page',
				'Prepare the outline for review.',
				'A little space to think. Capture ideas, connect related notes and find the thread again. Call to action: Start a notebook.'
			]
		]
	},
	{
		name: 'Summarize customer notes',
		prompt: 'Find the useful patterns in a sample set of customer interview notes.',
		report: {
			icon: 'forum',
			title: 'Make the first session count',
			summary: 'Setup feels uncertain. A working example can build confidence sooner.',
			findings: [
				{
					icon: 'flag',
					title: '4 of 6 interviews',
					text: 'Setup friction is the most common theme in the sample.'
				},
				{
					icon: 'visibility',
					title: '3 want examples',
					text: 'Show a useful starting point before adding more onboarding steps.'
				},
				{
					icon: 'group',
					title: '2 ask for sharing',
					text: 'Shared workspaces matter, but the first-session experience comes first.'
				}
			],
			next: 'Test one working example and a short setup checklist with three new users.'
		},
		steps: [
			[
				'Read the notes',
				'Review six sample interviews.',
				'Four mention setup friction, three want clearer examples and two request shared workspaces.'
			],
			[
				'Find the patterns',
				'Separate repeated needs from individual requests.',
				'Confidence during setup is the strongest pattern. Improve examples before adding workspace features.'
			],
			[
				'Share the findings',
				'Summarize evidence and the next step.',
				'Setup feels uncertain. Add one working example and a short first-run checklist. Test with three new users.'
			]
		]
	}
] as const;

export function createRuns() {
	let serial = 0;
	let messageSerial = 0;
	let runs = $state<Run[]>([]);
	let selectedId = $state(1);
	let timer: ReturnType<typeof setInterval> | undefined;
	const selected = $derived(runs.find((run) => run.id === selectedId)!);
	const canCreate = $derived(
		runs.length < 12 || runs.some((run) => ['completed', 'cancelled'].includes(run.status))
	);

	function say(run: Run, role: Message['role'], text: string) {
		run.messages = [...run.messages, { id: ++messageSerial, role, text }].slice(-40);
	}

	function make(workflow: number, prompt: string, completed = false): Run {
		const recipe = workflows[workflow];
		return {
			id: ++serial,
			title: recipe.name,
			workflow,
			status: completed ? 'completed' : 'queued',
			step: completed ? recipe.steps.length : 0,
			instruction: prompt === recipe.prompt ? '' : prompt,
			draft: '',
			messages: [
				{ id: ++messageSerial, role: 'user', text: prompt },
				{
					id: ++messageSerial,
					role: 'agent',
					text: completed ? 'Report ready.' : 'Preparing the brief.'
				}
			],
			nodes: recipe.steps.map(([name, purpose, result]) => ({
				name,
				purpose,
				result,
				progress: completed ? 100 : 0,
				output: completed ? result : undefined
			}))
		};
	}

	function advanceQueue() {
		if (runs.some((run) => run.status === 'running')) return;
		const next = [...runs].reverse().find((run) => run.status === 'queued');
		if (next) next.status = 'running';
	}

	function create(workflow: number, prompt: string) {
		if (!prompt.trim() || !canCreate || !workflows[workflow]) return false;
		if (runs.length >= 12) {
			const oldest = [...runs]
				.reverse()
				.find((run) => run.status === 'completed' || run.status === 'cancelled');
			runs = runs.filter((run) => run.id !== oldest?.id);
		}
		const run = make(workflow, prompt.trim().slice(0, 1000));
		runs = [run, ...runs];
		selectedId = run.id;
		advanceQueue();
		return true;
	}

	function cancel(run: Run) {
		if (run.status !== 'running' && run.status !== 'queued') return;
		run.status = 'cancelled';
		say(run, 'agent', 'Run cancelled.');
		advanceQueue();
	}

	function retry(run: Run) {
		if (run.status === 'running' || run.status === 'queued') return;
		run.status = 'queued';
		run.step = 0;
		run.nodes.forEach((node) => {
			node.progress = 0;
			node.output = undefined;
		});
		// A retry joins behind work that is already queued.
		runs = [run, ...runs.filter((item) => item.id !== run.id)];
		say(run, 'agent', 'Starting again.');
		advanceQueue();
	}

	function explain(run: Run) {
		if (run.status === 'completed') {
			const report = workflows[run.workflow].report;
			say(run, 'agent', `${report.summary}\n\n${report.next}`);
		} else {
			const node = run.nodes[Math.min(run.step, run.nodes.length - 1)];
			say(run, 'agent', `${node.name}: ${node.output ?? node.purpose}`);
		}
	}

	function send(run: Run) {
		const text = run.draft.trim();
		if (!text) return;
		run.draft = '';
		say(run, 'user', text.slice(0, 1000));
		if (/^(cancel|stop)[.!]?$/i.test(text)) {
			if (run.status === 'running' || run.status === 'queued') cancel(run);
			else say(run, 'agent', 'Run already stopped.');
		} else if (/^(retry|rerun)[.!]?$/i.test(text)) {
			if (run.status === 'completed' || run.status === 'cancelled') retry(run);
			else say(run, 'agent', 'Run already active.');
		} else if (text.endsWith('?') || /^(explain|show|summarize)\b/i.test(text)) {
			explain(run);
		} else {
			run.instruction = text.slice(0, 1000);
			if (run.status === 'completed') retry(run);
			else
				say(run, 'agent', run.status === 'cancelled' ? 'Brief saved for retry.' : 'Brief updated.');
		}
	}

	function step() {
		const run = runs.find((item) => item.status === 'running');
		if (!run) return;
		const node = run.nodes[run.step];
		node.progress = Math.min(100, node.progress + 5);
		if (node.progress < 100) return;
		node.output = node.result;
		run.step += 1;
		if (run.step === run.nodes.length) {
			run.status = 'completed';
			say(run, 'agent', 'Report ready.');
			advanceQueue();
		}
	}

	const first = make(0, workflows[0].prompt);
	const previous = make(2, workflows[2].prompt, true);
	runs = [first, previous];
	advanceQueue();

	return {
		get runs() {
			return runs;
		},
		get selected() {
			return selected;
		},
		get canCreate() {
			return canCreate;
		},
		select(id: number) {
			if (runs.some((run) => run.id === id)) selectedId = id;
		},
		create,
		cancel,
		retry,
		send,
		start() {
			if (!timer) timer = setInterval(step, 300);
		},
		stop() {
			clearInterval(timer);
			timer = undefined;
		}
	};
}

export function nodeStatus(run: Run, index: number) {
	if (run.nodes[index].progress === 100) return 'done';
	if (run.status === 'cancelled') return 'cancelled';
	if (index === run.step && run.status === 'running') return 'running';
	return 'queued';
}
