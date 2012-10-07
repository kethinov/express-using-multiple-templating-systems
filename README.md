dustspress web framework
========================

All the wiring you need to build a [Node.js](http://nodejs.org)-based [Express](http://expressjs.com) app using [Dust.js (LinkedIn fork)](http://linkedin.github.com/dustjs/) templating.

dependencies
============

- Node.js: [nodejs.org](http://nodejs.org)
- Express web server for Node.js: [expressjs.com](http://expressjs.com)
- Dust.js LinkedIn fork: [linkedin.github.com/dustjs](http://linkedin.github.com/dustjs/)
- Klei-Dust (adds Dust.js support to Express): [npmjs.org/package/klei-dust](https://npmjs.org/package/klei-dust)

how to run
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
	
license
=======

Creative Commons Attribution 3.0 Unported License [creativecommons.org/licenses/by/3.0/deed.en_US](http://creativecommons.org/licenses/by/3.0/deed.en_US)