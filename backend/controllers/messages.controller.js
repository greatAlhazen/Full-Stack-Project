const path = require('path');

function getMessage(req, res) {
	res.send(`<p>hello from ${resultWithId[0].planet}</p>`);
}

module.exports = {
	getMessage
};
