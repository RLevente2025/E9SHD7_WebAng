let express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  config = require('./database/db');

mongoose.connect(config.db)
  .then(() => { console.log('Connected to database'); })
  .catch(err => { console.log('Could not connect to database: ' + err); });

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});

process.on('SIGINT', function () {
  mongoose.connection.close().then(() => {
    console.log('Mongoose disconnected (app terminated)');
    process.exit(0);
  });
});

const productRoute = require('./routes/product.route');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/api', productRoute);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log('Server running on port ' + port);
});
