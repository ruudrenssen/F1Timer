const data = [
	{
		title: 'Turkey',
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
				name: 'Formula 1 Rolex Turkey Grand Prix 2021',
				start: new Date(1633867200000)
			}
		]
	},
	{
		title: 'United States',
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
				name: 'Formula 1 Aramco United States Grand Prix 2021',
				start: new Date(1635102000000)
			}
		]
	},
	{
		title: 'Mexico',
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
				name: 'Formula 1 Gran Premio La Ciudad De México 2021',
				start: new Date(1636311600000)
			}
		]
	},
	{
		title: 'Brazil',
		sessions: [
			{
				name: 'Practice 1',
				start: new Date(1636731000000)
			},
			{
				name: 'Qualifying',
				start: new Date(1636743600000)
			},
			{
				name: 'Practice 2',
				start: new Date(1636815600000)
			},
			{
				name: 'Sprint Qualifying',
				start: new Date(1636831800000)
			},
			{
				name: 'Formula 1 Heineken Grande Prêmio de São Paulo de 2021',
				start: new Date(1636909200000)
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
const gears = document.querySelectorAll('animateTransform');
const stripes = document.querySelector('.stripes');

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

const createTimerEl = function (session) {
	const el = sessionTemplate.cloneNode(true);

	el.dataset.start = session.start;
	el.querySelector('h3').textContent = session.name;
	updateCountdown(el);
	el.hidden = false;

	return el;
}

const hideGp = function (el) {
	el.classList.add('hidden');
}

const showGp = function (el) {
	calEl.querySelectorAll('.gp').forEach(el => hideGp(el));
	el.classList.remove('hidden');
};

const browse = function (direction) {
	if(!animating) {
		animating = true;
		direction > 0 ? current++ : current--;
		if(current < 0) { current = gpEl.length - 1 };
		if(current > gpEl.length - 1) { current = 0 };

		stripes.classList.add('animation');
		document.querySelectorAll('animateTransform').forEach(el => {
			el.setAttribute('dur', '0.6s');
		})

		setTimeout(()=> {
			animating = false;
			document.querySelectorAll('animateTransform').forEach(el => {
				el.setAttribute('dur', '6s');
			})
			stripes.classList.remove('animation');
		}, 500);
	}

	showGp(gpEl[current]);
}

const gpEl = data.map(gp => {
	gp.sessions.sort((a,b) => (a.start > b.start) ? 1 : ((b.start > a.start) ? -1 : 0));

	const dateConfig = {
		month: "short", day: "numeric"
	}
	const startDate = gp.sessions[0].start;
	const endDate = gp.sessions[gp.sessions.length - 1].start;
	const el = gpTemplate.cloneNode(true);

	el.dataset.start = startDate;
	el.dataset.end = endDate;
	el.querySelector('h1').textContent = gp.title;
	el.querySelector('time').textContent = `${startDate.toLocaleString(undefined, dateConfig)} - ${endDate.toLocaleString(undefined, dateConfig)}`;
	el.querySelector('[data-module="gp-race"]').appendChild(createTimerEl(gp.sessions.pop()));

	gp.sessions.forEach(session => {
		el.querySelector('[data-module="gp-sessions"]').appendChild(createTimerEl(session));
	});

	return(el);
}).filter(el => {
	if(new Date(el.dataset.end) > new Date()) {
		return el;
	}
});
gpEl.forEach(el => calEl.appendChild(el));

// Desktop navigation
let current = 0;
let animating = false;
document.onwheel = function(e) {
	browse(e.deltaY);
};

// Mobile Navigation
let startY = 0;
let endY = 0;
document.ontouchstart = function (e) {
	startY = e.touches[0].screenY;
}
document.ontouchmove = function (e) {
	endY = e.touches[0].screenY;
}
document.ontouchend = function (e) {
	startY - endY < 0 ? browse(-1) : browse(1);
}

// Show first GP in calendar
showGp(gpEl[current]);
stripes.classList.add('animation');
setTimeout(()=> {
	stripes.classList.remove('animation');
}, 500);

setInterval(() => {
	document.querySelectorAll('[data-module="gp-session"]').forEach(el => {
		updateCountdown(el);
	})
}, 24);
