<script context="module" lang="ts">
	const WEEK_IN_MILI = 1000 * 60 * 60 * 24 * 7
	const x = Array(12)
		.fill('')
		.map(() => [] as Array<string>)
	const y = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
	let dt = new Date(2023, 0, 2)
</script>

<script lang="ts">
	const gapX = 2
	const gapY = 5
	const size = 12

	const textSpacing = 45

	const spacingX = size + 2 * gapX
	const spacingY = size + 2 * gapY
	export let weeks: Array<string>
	let weekNumber = 0
	while (dt.getFullYear() === 2023) {
		x[dt.getMonth()].push(weeks[weekNumber])
		dt = new Date(dt.getTime() + WEEK_IN_MILI)
		weekNumber++
	}
</script>

<svg
	width={textSpacing + x.length * spacingX}
	height={y.length * spacingY}
	class="js-calendar-graph-svg"
>
	<g transform="translate({textSpacing}, 0)">
		{#each y as month, monthIdx}
			<g transform="translate(0, {monthIdx * spacingY})">
				{#each x[monthIdx] as weekColor, weekIdx}
					<rect
						width={size}
						height={size}
						x={weekIdx * spacingX}
						y={gapY}
						class="ContributionCalendar-day"
						data-date="2022-01-01"
						data-level="0"
						rx="2"
						fill={weekColor}
						ry="2">xxx</rect
					>
				{/each}
			</g>
		{/each}
	</g>

	{#each y as month, monthIdx}
		<text
			text-anchor="start"
			class="ContributionCalendar-label"
			x="0"
			y={(monthIdx + 0.5) * spacingY + size / 2}>{month}</text
		>
	{/each}
</svg>
