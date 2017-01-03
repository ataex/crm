let express         = require('express');
let path            = require('path');
let favicon         = require('serve-favicon');
let logger          = require('morgan');
let cookieParser    = require('cookie-parser');
let bodyParser      = require('body-parser');
let mongoose        = require('./config/mongoose');

// Routes
let candidate   = require('./routes/candidate');
let user        = require('./routes/user');
let account     = require('./routes/account');
let app         = express();

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

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT, PATCH");
    next();
});
app.use('/api/account', account);
app.use('/api/user', user);
app.use('/api/candidate', candidate);
app.use('/api/user', candidate);

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