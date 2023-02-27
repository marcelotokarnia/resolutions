<script lang="ts">
	import Counter from './Counter.svelte'
	import WeekBlocks from '$lib/components/WeekBlocks.svelte'
	import welcome from '$lib/images/svelte-welcome.webp'
	import welcome_fallback from '$lib/images/svelte-welcome.png'
	const WEEK_IN_MILI = 1000 * 60 * 60 * 24 * 7
	const whichWeek = (dt: Date): number =>
		Math.ceil((dt.getTime() - new Date(2023, 0, 2).getTime()) / WEEK_IN_MILI)

	export let data: { weeks: Array<number> }
	const thisWeek = whichWeek(new Date())

	const weeks: Array<{ color: string; title: string }> = data.weeks.map((e, i) => {
		let color = 'red'
		if (i > thisWeek) {
			color = 'gray'
		} else if (e >= 65) {
			color = 'green'
		} else if (e >= 35) {
			color = 'yellow'
		}
		return { color, title: `week ${i + 1}: ${e}km` }
	})
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>
		<span class="welcome">
			<picture>
				<source srcset={welcome} type="image/webp" />
				<img src={welcome_fallback} alt="Welcome" />
			</picture>
		</span>

		to your new<br />SvelteKit app
	</h1>

	<h2>
		try editing <strong>src/routes/+page.svelte</strong>
	</h2>

	<Counter />
	<WeekBlocks {weeks} />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
