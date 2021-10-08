const data = [
	{
		title: "Turkish Grand Prix",
		sessions: [
			{
				name: 'Free Practice 1',
				start: new Date(1633681800000)
			},
			{
				name: 'Free Practice 2',
				start: new Date(1633694400000)
			},
			{
				name: 'Free Practice 3',
				start: new Date(1633770000000)
			},
			{
				name: 'Qualifying',
				start: new Date(1633780800000)
			},
			{
				name: 'Grand Prix',
				start: new Date(1633867200000)
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

const countdown = function (value = 0) {
	let i =  0;
	let t = [];
	let u = [...units]

	do {
		// distribute value over days, hours, minutes and seconds
		if (value >= u[0]) {
			value -= u[0];
			i++;
		} else {
			u.shift();
			t.push(i);
			i = 0;
		}
	} while (value);

	return t;
}

setInterval(() => {
	data.forEach(value => {
		value.sessions.forEach(session => {
			const time = new Date(session.start - Date.now()); // time to session in ms
			console.log(countdown(time));
		});
	});
}, 1000);

