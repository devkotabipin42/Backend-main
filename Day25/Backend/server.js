require('dotenv').config();
const app = require('./src/App');

const ConnectDb = require('./src/config/databse');

ConnectDb();

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});