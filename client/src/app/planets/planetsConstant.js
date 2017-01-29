var app = angular.module('solarguessr');

app.constant('planets', [
	{
		name: 'Venus',
		img: ['/planets/Venus/0/0/0.jpg', '/planets/Venus/0/1/0.jpg'],
		url: '/planets/Venus'
	} ,{
		name: 'Earth',
		img: ['/planets/Earth/0/0/0.jpg', '/planets/Earth/0/1/0.jpg'],
		url: '/planets/Earth'
	}, {
		name: 'Moon',
		img: ['/planets/Moon/0/0/0.jpg', '/planets/Moon/0/1/0.jpg'],
		url: '/planets/Moon'
	}, {
		name: 'Mars',
		img: ['/planets/Mars/0/0/0.jpg', '/planets/Mars/0/1/0.jpg'],
		url: '/planets/Mars'
	}
]);
