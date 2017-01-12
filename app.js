let express                 = require('express');
let path                    = require('path');
let favicon                 = require('serve-favicon');
let logger                  = require('morgan');
let cookieParser            = require('cookie-parser');
let bodyParser              = require('body-parser');
let mongoose                = require('./config/mongoose');
let app                     = express();
let authTokenMiddleware     = require('./middlewares/auth-token');
let applicationMiddleware   = require('./middlewares/application');
let accountRoutes           = require('./routes/account');
let userRoutes              = require('./routes/user');
let candidateRoutes         = require('./routes/candidate');


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

// Set security middleware
app.use(applicationMiddleware);
app.use(authTokenMiddleware);

// CORS and other header options
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-Auth-Token');
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT, PATCH');
    res.header('Access-Control-Expose-Headers', 'X-Auth-Token');
    next();
});

app.use('/api/account', accountRoutes);
app.use('/api/user', userRoutes);
app.use('/api/candidate', candidateRoutes);

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