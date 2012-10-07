dustspress
==========

Sample [Node.js](http://nodejs.org) Express app using Dust.js (LinkedIn fork) templating.

Dependencies
============

- Express web server for Node.js: [expressjs.com](http://expressjs.com)
- Dust.js LinkedIn fork: [linkedin.github.com/dustjs](http://linkedin.github.com/dustjs/)
- Klei-Dust (adds Dust.js support to Express): [npmjs.org/package/klei-dust](https://npmjs.org/package/klei-dust)

How to run
==========

(This tutorial assumes you're working in a bash shell.)

Clone repo.

	git clone git@github.com:kethinov/dustspress.git
	cd dustspress

Install dependencies. (May require sudo.)

	npm install .
	
Run app. (May require sudo.)

	node app.js
	
Run on a different port.

	export NODE_PORT=43711 && node app.js