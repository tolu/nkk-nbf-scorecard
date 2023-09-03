<script lang="ts">
	export let deltager: Deltager;
	import { afterUpdate, createEventDispatcher } from 'svelte';
	import Results from './Results.svelte';
	import { calculateResults } from '$lib/calculator';

	const dispatch = createEventDispatcher();
	afterUpdate(() => {
		console.log('update!');
		dispatch('updated');
	});
	$: score = calculateResults(deltager.score);
</script>

<div class="result-wrapper">
	<details open>
		<summary>
			<h1>{deltager.name} {score.award}</h1>
			<span>{score.total} poäng</span>
			<input class="nrk-input" type="date" bind:value={deltager.date} />
			<button class="nrk-button nrk-color-invert" on:click={() => dispatch('delete')}
				>Ta bort</button
			>
		</summary>
		<article>
			<section>
				<header>
					<h2>Lydighet</h2>
				</header>
				<form>
					{#each deltager.score.lydighet.moment as moment}
						<div>
							<label for={moment.name}>{moment.name} (k: {moment.ratio})</label>
							<input
								class="nrk-input"
								id={moment.name}
								type="number"
								min="0"
								max="10"
								step="0.5"
								bind:value={moment.score}
							/>
							<div style="display: grid; place-items: center">
								<em> = &nbsp;{moment.ratio * moment.score}</em>
							</div>
						</div>
					{/each}
				</form>
			</section>
			<section>
				<header>
					<h2>Spesialøvelser</h2>
				</header>
				<form>
					{#each deltager.score.specialØvelser.moment as moment}
						<div>
							<label for={moment.name}>{moment.name} (k: {moment.ratio})</label>
							<input
								class="nrk-input"
								id={moment.name}
								type="number"
								min="0"
								max="10"
								step="0.5"
								bind:value={moment.score}
							/>
							<div style="display: grid; place-items: center">
								<em> = &nbsp;{moment.ratio * moment.score}</em>
							</div>
						</div>
					{/each}
				</form>

				<Results score={deltager.score} />
			</section>
		</article>
	</details>
</div>

<style>
	.result-wrapper {
		position: relative;
		margin-bottom: 2rem;
		border-top: 1px solid #eee;
		border-bottom: 1px solid #eee;
	}
	summary {
		background-color: hsl(0 0% 14%);
		margin-inline: calc(50% - 50vw);
		padding: 1.25rem 2rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		cursor: pointer;
	}
	summary > h1 {
		margin: 0;
	}
	summary > span {
		min-width: 11ch;
	}
	article {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 400px));
		grid-gap: 1rem;
		padding-bottom: 2rem;
	}
	form {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}
	input:focus {
		outline: 2px solid #00b9f2;
		outline-offset: 2px;
	}
	form > div {
		display: flex;
		gap: 1rem;
		& label {
			width: 200px;
		}
	}
</style>
