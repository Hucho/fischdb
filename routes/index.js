//index route file
module.exports = function (app, mongoSetup) {
	require('./main')(app, mongoSetup),
	require('./total')(app, mongoSetup)
};