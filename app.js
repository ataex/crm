let express         = require('express');
let path            = require('path');
let favicon         = require('serve-favicon');
let logger          = require('morgan');
let cookieParser    = require('cookie-parser');
let bodyParser      = require('body-parser');
let mongoose        = require('./config/mongoose');
let jwt             = require('jsonwebtoken');
let config          = require('./config/config');
let _               = require('lodash');
let app             = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));

app.use(express.static(path.join(__dirname, 'dist')));

// Security firewall - User must be logged unless route is defined in the above array
app.use((req, res, next) => {
    let openRoutes = ['/api/user/login', '/api/account/register'];

    // If routes is protected
    if(req.method != 'OPTIONS' && !openRoutes.includes(req.path)) {
        // Check if token exists and is valid
        let XAuthToken = req.header('X-Auth-Token');
        jwt.verify(XAuthToken, config.secret, (error, decoded) => {
            if(error) { res.status(403).send(); }
            else {
                res.header({ 'X-Auth-Token' : XAuthToken });
                next();
            }
        });
    }
    else { next(); }
});

// CORS and other header options
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT, PATCH');
    res.header('Access-Control-Expose-Headers', 'X-Auth-Token');
    next();
});

app.use('/api/account', require('./routes/account'));
app.use('/api/user', require('./routes/user'));
app.use('/api/candidate', require('./routes/candidate'));

// catch 404 and send frontend app
app.use((req, res, next) => {
    indexFile = __dirname+'/dist/index.html';
    res.sendFile(indexFile);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;