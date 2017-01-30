var app = angular.module('solarguessr');

app.constant('planets', [
	{
		name: 'Venus',
		system: {
			name: 'Venus',
			index: 1
		},
		radius: 6.052e6,
		img: ['https://jas0n.scripts.mit.edu/solarguessr/Venus/0/0/0.jpg', 'https://jas0n.scripts.mit.edu/solarguessr/Venus/0/1/0.jpg'],
		url: 'https://jas0n.scripts.mit.edu/solarguessr/Venus'
	} ,{
		name: 'Earth',
		system: {
			name: 'Earth',
			index: 2
		},
		radius: 6.371e6,
		img: ['https://jas0n.scripts.mit.edu/solarguessr/Earth/0/0/0.jpg', 'https://jas0n.scripts.mit.edu/solarguessr/Earth/0/1/0.jpg'],
		url: 'https://jas0n.scripts.mit.edu/solarguessr/Earth'
	}, {
		name: 'Moon',
		system: {
			name: 'Earth',
			index: 2
		},
		radius: 1.737e6,
		img: ['https://jas0n.scripts.mit.edu/solarguessr/Moon/0/0/0.jpg', 'https://jas0n.scripts.mit.edu/solarguessr/Moon/0/1/0.jpg'],
		url: 'https://jas0n.scripts.mit.edu/solarguessr/Moon'
	}, {
		name: 'Mars',
		system: {
			name: 'Mars',
			index: 3
		},
		radius: 3.39e6,
		img: ['https://jas0n.scripts.mit.edu/solarguessr/Mars/0/0/0.jpg', 'https://jas0n.scripts.mit.edu/solarguessr/Mars/0/1/0.jpg'],
		url: 'https://jas0n.scripts.mit.edu/solarguessr/Mars'
	}
]);
