<script lang="ts">
	import type { klasseD } from '$lib/bruks';
	export let temp: typeof klasseD;
	export let name: string;
	import { afterUpdate, createEventDispatcher } from 'svelte';
	import Results from './Results.svelte';

	const dispatch = createEventDispatcher();
	afterUpdate(() => dispatch('updated'));
</script>

<div class="result-wrapper">
	<h1>{name}</h1>
	<article>
		<section>
			<header>
				<h2>Lydighet</h2>
			</header>
			<form>
				{#each temp.lydighet.moment as moment}
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
				{#each temp.specialØvelser.moment as moment}
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

			<Results {temp} />
		</section>
	</article>
	<button class="nrk-button nrk-color-invert" on:click={() => dispatch('delete')}>Ta bort</button>
</div>

<style>
	.result-wrapper {
		position: relative;
		margin-bottom: 2rem;
	}
	.result-wrapper > h1 {
		background-color: hsl(0 0% 14%);
		margin: 0;
		padding: 0.67em 2rem;
		margin-inline: calc(50% - 50vw);
	}
	button {
		position: absolute;
		right: 0;
		top: 1rem;
	}
	article {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 400px));
		grid-gap: 1rem;
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
