express-using-multiple-templating-systems [![Dependency Status](https://gemnasium.com/kethinov/express-using-multiple-templating-systems.png)](https://gemnasium.com/kethinov/express-using-multiple-templating-systems) [![Gittip](http://img.shields.io/gittip/kethinov.png)](https://www.gittip.com/kethinov/)
===

This is a sample vanilla [Express](http://expressjs.com) app which demonstrates how to configure Express to use multiple templating systems.

The three templating systems integrated are [Teddy](https://github.com/kethinov/teddy) (.html), [ejs](https://github.com/visionmedia/ejs) (.ejs), and [dustjs-linkedin](http://linkedin.github.io/dustjs) (.dust).

How to run
==========

Clone this repo:

	git clone git@github.com:kethinov/express-using-multiple-templating-systems.git
	cd express-using-multiple-templating-systems

Install dependencies:

	npm install
	
Run app:

	node app.js
	
Run on a different port:

	export NODE_PORT=43711 && node app.js