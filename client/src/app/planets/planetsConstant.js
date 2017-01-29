var app = angular.module('solarguessr');

app.constant('planets', [
	{
		name: 'Venus',
		img: ['https://jas0n.scripts.mit.edu/solarguessr/Venus/0/0/0.jpg', 'https://jas0n.scripts.mit.edu/solarguessr/Venus/0/1/0.jpg'],
		url: 'https://jas0n.scripts.mit.edu/solarguessr/Venus'
	} ,{
		name: 'Earth',
		img: ['https://jas0n.scripts.mit.edu/solarguessr/Earth/0/0/0.jpg', 'https://jas0n.scripts.mit.edu/solarguessr/Earth/0/1/0.jpg'],
		url: 'https://jas0n.scripts.mit.edu/solarguessr/Earth'
	}, {
		name: 'Moon',
		img: ['https://jas0n.scripts.mit.edu/solarguessr/Moon/0/0/0.jpg', 'https://jas0n.scripts.mit.edu/solarguessr/Moon/0/1/0.jpg'],
		url: 'https://jas0n.scripts.mit.edu/solarguessr/Moon'
	}, {
		name: 'Mars',
		img: ['https://jas0n.scripts.mit.edu/solarguessr/Mars/0/0/0.jpg', 'https://jas0n.scripts.mit.edu/solarguessr/Mars/0/1/0.jpg'],
		url: 'https://jas0n.scripts.mit.edu/solarguessr/Mars'
	}
]);
