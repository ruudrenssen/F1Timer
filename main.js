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
				start: new Date(1636549200000)
			}
		]
	}
]

setInterval(() => {
	data.forEach(value => {
		value.sessions.forEach(session => {
			const countdown = new Date(session.start - Date.now()); // time to session in ms
		});
	});
}, 1000);