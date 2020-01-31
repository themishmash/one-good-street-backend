//Express framework required for nodeJS
//Mongoose required managing relationships between data, provides schema validation and to translate between objects in code and the representation of those objects in MongoDB.
//Cors required so allows cross-domain communication from the browser.
//Dotenv used to store passwords in .env files

const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT || 5000;

//Mongoose

const dbConfig = {useNewUrlParser: true, useUnifiedTopology: true};

mongoose.connect(process.env.DB_URL, dbConfig, (err) => {
  if (err) console.error('Error ❌');
  else console.log('Connected to db ✅');
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
