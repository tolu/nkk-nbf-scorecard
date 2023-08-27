<script lang="ts">
	import type { klasseD } from '$lib/bruks';
	export let temp: typeof klasseD;
	export let name: string;
	export let onDelete: () => void;

	const onChange = () => {
		window.dispatchEvent(new CustomEvent('nkk.res.change', { detail: { name, value: temp } }));
	};

	$: resLydighet = temp.lydighet.moment.reduce((prev, next) => prev + next.score * next.ratio, 0);
	$: resSpesial = temp.specialØvelser.moment.reduce(
		(prev, next) => prev + next.score * next.ratio,
		0
	);
	$: resSum = resLydighet + resSpesial;
	$: godkjenntLydighet = resLydighet > temp.lydighet.godkjennt;
	$: godkjenntSpesial = resSpesial > temp.specialØvelser.godkjennt;
	$: godkjennt = godkjenntLydighet && godkjenntSpesial;
	$: opprykkLydighet = resLydighet > temp.lydighet.opprykk;
	$: opprykkSpesial = resSpesial > temp.specialØvelser.opprykk;
	$: opprykk = opprykkLydighet && opprykkSpesial;
	$: resSum, onChange();
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
		</section>

		<section>
			<header>
				<h2>Resultat</h2>
			</header>
			<table>
				<thead>
					<tr>
						<td><b>Lydighet</b></td>
						<td><b>Spesialøvelser</b></td>
						<td><b>SUM</b></td>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>✅ {temp.lydighet.godkjennt} for godkjennt</td>
						<td>✅ {temp.specialØvelser.godkjennt} for godkjennt</td>
						<td />
					</tr>
					<tr>
						<td>🏆 {temp.lydighet.opprykk} for opprykk</td>
						<td>🏆 {temp.specialØvelser.opprykk} for opprykk</td>
						<td />
					</tr>
					<tr
						><td class:opprykk={opprykkLydighet} class:godkjennt={godkjenntLydighet}>
							<b>
								{resLydighet}
							</b>
						</td>
						<td class:opprykk={opprykkSpesial} class:godkjennt={godkjenntSpesial}
							><b>
								{resSpesial}
							</b>
						</td>
						<td class:opprykk class:godkjennt
							><b>
								{resSum}
							</b>
						</td>
					</tr>
				</tbody>
			</table>
		</section>
	</article>
	<button class="nrk-button nrk-color-invert" on:click={onDelete}>Ta bort</button>
</div>

<style>
	.result-wrapper {
		position: relative;
		margin-bottom: 2rem;
	}
	button {
		position: absolute;
		right: 0;
		top: 0;
	}
	article {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 400px));
		grid-gap: 1rem;
	}
	tbody td {
		transition: background-color 0.4s ease-in-out;
	}
	.godkjennt {
		background-color: greenyellow;
	}
	.opprykk {
		background-color: goldenrod;
	}
	form > div {
		display: flex;
		gap: 1rem;
		& label {
			width: 200px;
		}
	}
</style>
