<script lang="ts">
	export let deltager: Deltager;
	import { afterUpdate, createEventDispatcher } from 'svelte';
	import Results from './Results.svelte';

	const dispatch = createEventDispatcher();
	afterUpdate(() => {
		console.log('update!');
		dispatch('updated');
	});
</script>

<div class="result-wrapper">
	<header>
		<h1>{deltager.name}</h1>
		<input type="date" bind:value={deltager.date} />
		<button class="nrk-button nrk-color-invert" on:click={() => dispatch('delete')}>Ta bort</button>
	</header>
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
</div>

<style>
	.result-wrapper {
		position: relative;
		margin-bottom: 2rem;
	}
	.result-wrapper > header {
		background-color: hsl(0 0% 14%);
		margin-inline: calc(50% - 50vw);
		padding: 1.25rem 2rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.result-wrapper > header > h1 {
		margin: 0;
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
