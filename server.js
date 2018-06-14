var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');

var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get('/', function (req, res, next) {
  res.status(200).render('home');
});

app.use(express.static('public'));

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});