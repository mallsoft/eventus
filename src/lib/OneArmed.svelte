<script>
	import { createEventDispatcher, onMount } from 'svelte';
	const WHEEL_COUNT = 3; // most of the code assumes 3 wheels, but it should be easy to modify

	const segments = ['💎', '🍓', '🔔', '🧸', '🍀', '💎', '🍓', '🎰', '🔔', '🧸', '🍀'];

	const positions = Array(WHEEL_COUNT).fill(0);
	const animating = Array(WHEEL_COUNT);
	const locked = Array(WHEEL_COUNT);

	export let coin = 3000;
	let wheels = Array(WHEEL_COUNT); // wheel bindings
	let winningIcon = null;

	$: canLock = !winningIcon;
	$: noMoney = coin - cost < 0;
	$: noPlay = animating.includes(true) || noMoney; // is already running or cant afford to play
	$: lockCost = locked.filter((x) => x).length ** 2 * 50; // should cost more to lock wheels
	$: cost = Math.max(lockCost, 20);

	function spin(idx, immediate) {
		if (locked[idx]) return; // don't spin locked wheels

		const frames = [];
		const wheel = wheels[idx];
		const segSize = 360 / segments.length;

		frames[0] = { transform: `rotateX(${positions[idx] * segSize}deg)` };
		positions[idx] = Math.floor(Math.random() * segments.length);
		frames[1] = {
			transform: `rotateX(${positions[idx] * segSize - 360 * Math.floor(2 * Math.random() + 3)}deg)`
		};

		const timing = {
			easing: `cubic-bezier(.5,1.05,.5,1)`,
			duration: immediate
				? 0
				: Math.floor(1000 * Math.random() + 2000) + (wheels.length - 1 - idx) * 100,
			fill: 'forwards'
		};

		animating[idx] = true;
		const { finished } = wheel.animate(frames, timing);
		return finished.then(() => (animating[idx] = false));
	}

	function toggleLock(idx) {
		if (winningIcon) return;
		locked[idx] = !locked[idx];
		if (locked.filter((x) => x).length === locked.length) {
			// if all locked unlock all but the last clicked
			locked.forEach((_, i) => (locked[i] = i === idx));
		}
	}

	function play() {
		winningIcon = null; // clear
		coin -= cost;

		Promise.all(wheels.map((_, i) => spin(i))).then(() => {
			const frame = [[], [], []]; // the 3 rows

			for (let j = 0; j < WHEEL_COUNT; j++) {
				frame[0].push(segments[(positions[j] - 1 + segments.length) % segments.length]); // top
				frame[1].push(segments[positions[j]]); // middle
				frame[2].push(segments[(positions[j] + 1) % segments.length]); // bottom
			}
			if (WHEEL_COUNT === 3) {
				//rules for 3 wheels only
				const center = frame[1][1]; // center icon
				if (center === frame[1][0] && center === frame[1][2]) {
					// horisontal win
					coin += 350; // todo, complexify
					locked.forEach((_, i) => (locked[i] = false)); //.....................sssss
					return (winningIcon = center);
				}
				if (center === frame[0][0] && center === frame[2][2]) {
					// diagonal top left -> bottom
					coin += 350;
					return (winningIcon = center);
				}
				if (center === frame[0][2] && center === frame[2][0]) {
					// diagonal top right -> bottom
					coin += 350;
					return (winningIcon = center);
				}
			}
		});
	}

	const dispatch = createEventDispatcher();

	$: if (animating.includes(false) && noMoney) dispatch('gameover');

	// start spin
	onMount(() => {
		wheels.map((_, i) => spin(i, true));
	});
</script>

<div class="machine">
	<ul class:canLock style:--segments={segments.length} style:--n="{360 / segments.length}deg">
		<!-- "view" -->

		{#each wheels as _, i}
			<li
				bind:this={wheels[i]}
				class:locked={locked[i]}
				tabindex="0"
				role="button"
				on:keypress={({ key }) => (key === 'Enter' ? canLock && toggleLock(i) : null)}
				on:click={() => canLock && toggleLock(i)}
			>
				<!-- wheel -->

				{#each segments as face, j}
					<div style:--segment={j}>
						<!-- wheel segments -->
						<span class:winningIcon={winningIcon === face}>{face}</span>
					</div>
				{/each}
			</li>
		{/each}
	</ul>

	<div>
		<p>
			{coin}
		</p>

		<button on:click={() => play()} disabled={noPlay}> GO! </button>

		<p>
			{cost}
		</p>
	</div>
</div>

<style>
	.machine {
		display: flex;
		flex-flow: column;
		align-items: center;
		max-width: fit-content;

		margin: 0 20px;

		--a: #000000;
		--b: #001457;
	}

	.machine > div {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 60%;
	}
	.machine div > p {
		color: var(--color-d);
		font-size: 2em;
	}

	button,
	[role='button'] {
		cursor: pointer;
	}
	button {
		position: relative;

		color: var(--color-d);
		text-shadow: 2px 2px 2px var(--bg1);

		margin: 30px;
		font-size: 25px;
		width: 3.5em;
		aspect-ratio: 1;

		--a: #004882;
		--b: #0f1d58;
		background: linear-gradient(90deg, var(--a), var(--b) 30%, var(--b) 70%, var(--a));
		box-shadow: 5px 10px 20px -10px black;

		border-radius: 100px;
		border: 8px solid var(--b);

		transition: border-color 1s, border-width 0.5s;
	}

	button:active,
	button:disabled {
		transition: border-color 0.1s, border-width 0.2s;
		border-color: var(--a);
		border-width: 3px;
	}
	button:disabled {
		--b: hsla(50, 100%, 10%, 0.1);
		animation: bounceBack 0.5s forwards;
	}
	@keyframes bounceBack {
		from {
			transform: scale(0.95) translateY(5px);
		}
	}

	ul {
		overflow: hidden;
		user-select: none;
		list-style: none;
		margin: 0;
		padding: 0 30px;

		display: flex;
		align-items: center;
		justify-content: center;
		width: max-content;

		--segment-height: 120px;
		--segment-width: 150px;
		perspective: 1000px;
		height: 350px;

		border-radius: 50px;
		box-shadow: 10px 15px 30px -10px rgba(0, 0, 0, 0.404), 20px 20px 56px -12px rgba(0, 0, 0, 0.444);
		gap: calc(var(--segment-width) * 0.15);
	}
	li,
	li div {
		outline: none;
		transform-origin: center center calc(var(--segment-height) * -2);
	}
	ul::before,
	ul::after {
		pointer-events: none;
		content: '';
		position: absolute;
		width: 100%;
		background: linear-gradient(
			var(--c-vignet),
			var(--c-center) var(--spread),
			var(--c-center) calc(100% - var(--spread)),
			var(--c-vignet)
		);
	}
	ul::after {
		/* screen sheen */
		--a: hsla(0, 0%, 100%, 0);
		--b: hsla(189, 100%, 72%, 0.6);
		height: 100%;
		width: 100%;
		transform: scale(1.3) rotate(10deg);
		background: linear-gradient(var(--b), var(--a) 20%);
		z-index: 5;
	}
	ul::before {
		/* screen shadow */
		--spread: 20%;
		--c-center: hsla(0, 0%, 0%, 0);
		--c-vignet: hsla(200, 10%, 0%, 0.9);
		height: 100%;
		width: 100%;
		z-index: 3;
	}
	li {
		position: relative;

		transform-style: preserve-3d;
		will-change: transform;

		height: var(--segment-height);
		width: var(--segment-width);
	}

	li div {
		font: calc(var(--segment-height) * 0.9) monospace;
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		height: 100%;
		width: 100%;
		--initialPosition: calc((var(--n) * var(--segment) * -1));
		transform: rotateX(var(--initialPosition));
		background: hsla(0, 0%, 20%, 0.3);
		color: white;
		backface-visibility: hidden;
		transition: border-color 1s;

		filter: drop-shadow(-5px 5px 3px rgb(0, 0, 0)) drop-shadow(5px -5px 3px hsla(0, 0%, 0%, 0.4));
	}
	li div span {
		filter: drop-shadow(1px -1px 0px hsla(184, 100%, 50%, 0.2));
	}
	li div span.winningIcon {
		animation: winnerWinner 0.4s 4 alternate;
	}
	@keyframes winnerWinner {
		to {
			transform: scale(1.2) translateY(-5px);
		}
	}

	li div {
		border-width: 4px;
		border-style: solid;
		border-radius: 16px;
		border-color: hsla(0, 0%, 0%, 0);
		transition: border-color 1s;
	}
	.canLock li div {
		border-color: var(--color-a);
	}
	.canLock li:is(:hover, :focus) div {
		border-color: var(--color-d);
		transition: border-color 0.1s;
	}
	li.locked div {
		border-color: whitesmoke;
	}
</style>
