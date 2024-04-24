const express = require('express');
const path = require('path');
//require("dotenv/config");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

const app = express();


//app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('home');
});
app.get('/login2', (req, res) => {
  res.render('login2');
});
app.get('/home', (req, res) => {
  res.render('home');
});
app.get('/register', (req, res) => {
    res.render('register');
  });
/*
  const { MongoClient, ServerApiVersion } = require('mongodb');
  const uri = "mongodb+srv://adhruv990:arora4002@cluster0.bjjq8en.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
  // Create a MongoClient with a MongoClientOptions object to set the Stable API version
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);*/
  mongoose.connect('mongodb+srv://adhruv990:arora4002@cluster0.bjjq8en.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch((err) => {
  console.error('Error connecting to MongoDB Atlas:', err.message);
});

// Define Mongoose schema and model
const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log(username+" "+password);
  try {
    const newUser = new User({ username, password });
    await newUser.save();
    res.redirect('/home');
  } catch (err) {
    console.error('Error saving user:', err.message);
    res.redirect('/');
  }
});

const User = mongoose.model('User', userSchema);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});