const { init } = require('../handler.js');

exports.handler = init({
	appDir: "_app",
	assets: new Set(["favicon.png","sam-vargas-1200.png","sam-vargas-480.png","sam-vargas-900.png","sam-vargas-fb.jpg","sam-vargas-twitter.jpg"]),
	_: {
		mime: {".png":"image/png",".jpg":"image/jpeg"},
		entry: {"file":"start-d43beac8.js","js":["start-d43beac8.js","chunks/vendor-c92321a1.js"],"css":["assets/start-d977ffc4.css"]},
		nodes: [
			() => Promise.resolve().then(() => require('../server/nodes/0.js')),
			() => Promise.resolve().then(() => require('../server/nodes/1.js')),
			() => Promise.resolve().then(() => require('../server/nodes/2.js'))
		],
		routes: [
			{
				type: 'page',
				pattern: /^\/$/,
				params: null,
				path: "/",
				a: [0,2],
				b: [1]
			}
		]
	}
});
