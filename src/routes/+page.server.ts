import stravaApi, { type SummaryActivity } from '@tokks/strava'
const WEEK_IN_MILI = 1000 * 60 * 60 * 24 * 7

const fetchMoreActitivies = ({ access_token }) => {
	return async ({ page }): Promise<Array<SummaryActivity>> =>
		(
			await (stravaApi({ access_token }).Activities.getLoggedInAthleteActivities as any)({
				before: new Date().getTime() / 1000,
				after: new Date(2023, 0, 1).getTime() / 1000,
				page,
				per_page: 200,
			})
		).data()
}

const whichWeek = (dt: Date): number =>
	Math.ceil((dt.getTime() - new Date(2023, 0, 2).getTime()) / WEEK_IN_MILI)

const getDt = (act: SummaryActivity): Date =>
	new Date(`${act.start_date_local.slice(0, -1)}${act.timezone.slice(4, 10)}`)

const parseActivities = (activities: Array<SummaryActivity>): Array<string> => {
	const totalKms = Array(53).fill(0)
	const runActivities = activities.filter(e => e.type === 'Run')
	for (const run of runActivities) {
		const dt = getDt(run)
		const week = whichWeek(dt)
		totalKms[week] += run.distance / 1000
	}
	const thisWeek = whichWeek(new Date())
	return totalKms
		.map((e, i) => {
			if (i > thisWeek) {
				return 'gray'
			}
			if (e >= 65) {
				return 'green'
			}
			if (e >= 35) {
				return 'yellow'
			}
			return 'red'
		})
		.slice(1)
}

/** @type {import('./$types').PageData} */
export const load = async ({ params }: any) => {
	const { access_token } = (
		await stravaApi().Auth.refresh({
			body: { refresh_token: process.env.STRAVA_REFRESH_TOKEN as string },
		})
	).data()

	const activities = []
	let page = 1
	const caller = fetchMoreActitivies({ access_token })
	let resp = await caller({ page })

	while (resp.length > 0) {
		activities.push(...resp)
		page++
		resp = await caller({ page })
	}

	const weeks = parseActivities(activities)

	return {
		weeks,
	}
}
