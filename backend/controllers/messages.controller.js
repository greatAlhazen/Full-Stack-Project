const path = require('path');

function getMessage(req, res) {
	res.send(`<p>hello from ${resultWithId[0].planet}</p>`);
}

// send file to user
function sendFile(req, res) {
	// absolute path
	const fileAbsolutePath = path.join(__dirname, '..', 'public', 'gal-3.jpg');
	res.sendFile(fileAbsolutePath);
}

module.exports = {
	getMessage,
	sendFile
};
