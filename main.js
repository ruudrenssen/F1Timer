const data = [
	{
		title: 'Turkey',
		subtitle: 'Formula 1 Rolex Turkey Grand Prix 2021',
		sessions: [
			{
				name: 'Practice 1',
				start: new Date(1633681800000)
			},
			{
				name: 'Practice 2',
				start: new Date(1633694400000)
			},
			{
				name: 'Practice 3',
				start: new Date(1633770000000)
			},
			{
				name: 'Qualifying',
				start: new Date(1633780800000)
			},
			{
				name: 'Race',
				start: new Date(1633867200000)
			}
		]
	},
	{
		title: 'United States',
		subtitle: 'Formula 1 Aramco United States Grand Prix 2021',
		sessions: [
			{
				name: 'Practice 1',
				start: new Date(1634920200000)
			},
			{
				name: 'Practice 2',
				start: new Date(1634932800000)
			},
			{
				name: 'Practice 3',
				start: new Date(1635012000000)
			},
			{
				name: 'Qualifying',
				start: new Date(1635022800000)
			},
			{
				name: 'Race',
				start: new Date(1635102000000)
			}
		]
	},
	{
		title: 'Mexico',
		subtitle: 'Formula 1 Gran Premio La Ciudad De México 2021',
		sessions: [
			{
				name: 'Practice 1',
				start: new Date(1636133400000)
			},
			{
				name: 'Practice 2',
				start: new Date(1636146000000)
			},
			{
				name: 'Practice 3',
				start: new Date(1636218000000)
			},
			{
				name: 'Qualifying',
				start: new Date(1636228800000)
			},
			{
				name: 'Race',
				start: new Date(1636311600000)
			}
		]
	}
]

const ms = 1;
const sec = 1000 * ms;
const min = 60 * sec;
const hour = 60 * min;
const day = 24 * hour;
const units = [day, hour, min, sec, ms];
const decimals = [1, 2, 2, 2, 3]

const calEl = document.querySelector('[data-module="gp-calendar"]');
const gpTemplate = document.querySelector('[data-module="gp-item"]').cloneNode(true);
const sessionTemplate = document.querySelector('[data-module="gp-session"]').cloneNode(true);

document.querySelector('[data-module="gp-session"]').remove();
document.querySelector('[data-module="gp-item"]').remove();

const countdown = function(value = 0) {
	return units.map((unit) => {
		if (value < unit) {
			return 0;
		}

		const count = Math.floor(value / unit);

		value -= count * unit;

		return count;
	});
}

const updateCountdown = function (el) {
	const start = new Date(el.dataset.start);
	const slots = el.querySelectorAll('[data-module="gp-time"]');
	const time = countdown(new Date(start - Date.now())); // time to session in ms

	if(start - Date.now() > 0) {
		slots.forEach((slot, i) => {
			slot.textContent = time[i].toString().padStart(decimals[i], '0');
		});
	} else {
		el.remove();
	};
}

data.forEach(gp => {
	const el = gpTemplate.cloneNode(true);
	gp.sessions.forEach(session => {
		const e = sessionTemplate.cloneNode(true);

		e.dataset.start = session.start;
		e.querySelector('h3').textContent = session.name;
		updateCountdown(e);
		e.hidden = false;
		el.querySelector('[data-module="gp-sessions"]').appendChild(e);
	});

	el.querySelector('h1').textContent = gp.title;
	el.querySelector('h2').textContent = gp.subtitle;
	el.hidden = false;

	calEl.appendChild(el);
});

setInterval(() => {
	document.querySelectorAll('[data-module="gp-session"]').forEach(el => {
		updateCountdown(el);
	})
}, 24);
