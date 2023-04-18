const http = require('http');
const app = require('./app');
const { loadData } = require('./model/planets.model');

const PORT = process.env.PORT || 8080;
const server = http.createServer(app);

// before restart server load valueable data
async function serverStart() {
	await loadData();

	server.listen(PORT, () => {
		console.log(`application running on ${PORT}`);
	});
}

serverStart();
