<script lang="ts">
	export let score: DScore;

	$: resLydighet = score.lydighet.moment.reduce((prev, next) => prev + next.score * next.ratio, 0);
	$: resSpesial = score.specialØvelser.moment.reduce(
		(prev, next) => prev + next.score * next.ratio,
		0
	);
	$: resSum = resLydighet + resSpesial;
	$: godkjenntLydighet = resLydighet > score.lydighet.godkjennt;
	$: godkjenntSpesial = resSpesial > score.specialØvelser.godkjennt;
	$: godkjennt = godkjenntLydighet && godkjenntSpesial;
	$: opprykkLydighet = resLydighet > score.lydighet.opprykk;
	$: opprykkSpesial = resSpesial > score.specialØvelser.opprykk;
	$: opprykk = opprykkLydighet && opprykkSpesial;
</script>

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
				<td>✅ {score.lydighet.godkjennt} for godkjennt</td>
				<td>✅ {score.specialØvelser.godkjennt} for godkjennt</td>
				<td />
			</tr>
			<tr>
				<td>🏆 {score.lydighet.opprykk} for opprykk</td>
				<td>🏆 {score.specialØvelser.opprykk} for opprykk</td>
				<td />
			</tr>
			<tr
				><td class="result" class:opprykk={opprykkLydighet} class:godkjennt={godkjenntLydighet}>
					<b>
						{resLydighet}
					</b>
				</td>
				<td class="result" class:opprykk={opprykkSpesial} class:godkjennt={godkjenntSpesial}
					><b>
						{resSpesial}
					</b>
				</td>
				<td class="result" class:opprykk class:godkjennt
					><b>
						{resSum}
					</b>
				</td>
			</tr>
		</tbody>
	</table>
</section>

<style>
	tbody td {
		padding: 5px;
		min-width: 5ch;
		transition: background-color 0.4s ease-in-out, outline-color 0.4s ease-in-out;
	}
	.result {
		--color: 0, 0%, 50%;
		outline: 2px solid hsl(var(--color));
		background-color: hsl(var(--color), 0.1);
	}
	.result.godkjennt {
		--color: 84, 100%, 59%;
	}
	.result.opprykk {
		--color: 43, 74%, 49%;
	}
</style>
