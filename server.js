const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const dishes = require('./routes/api/dishes');
const customer = require('./routes/api/customer');
const orders = require('./routes/api/orders');
const payments = require('./routes/api/payments');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

// Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);
app.use('/api/dishes', dishes);
app.use('/api/customer', customer);
app.use('/api/orders', orders);
app.use('/api/payments', payments);

const port = process.env.PORT || 5000;

const server = require('http').createServer(app);

server.listen(port, () => console.log(`Server running on port ${port}`));

// var io = require('socket.io')(server);

// io.on('connection', socket => {
//   console.log('---io client connected');

//   socket.on('order update', () => {
//     console.log('--- catch ORDER UPDATE');
//     io.emit('orders upgrade');
//   });

//   socket.on('disconnect', () => console.log('---io client disconnected'));
//   socket.on('test', () => console.log('--- test event'));
// });
