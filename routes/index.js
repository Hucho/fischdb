//index route file
module.exports = function (app) {
	require('./total')(app),
	require('./main')(app),
	require('./getCols')(app)
	
};