// step 1: connecting to redis server 
const redis = require('redis');
const redis_client = redis.createClient();
redis_client.on('connect', function() {
  console.log('connected to Redis Server'); 
});

// step 2: create a string with a key of "name"
redis_client.set('name', 'Guoping Wu', function(err, reply) {
    console.log(`set name, redis server reply ${reply}`); 
});
redis_client.get('name', function(err, reply) {
    console.log(`get name, redis server reply ${reply}`); 
});

// step 3: star express server 
const express = require('express');
const app = express();

// step 4: api root responds a welcome string
app.get('/', (req, res) => {
    console.log("Welcome to Redis demo")
    res.json ("Welcome to Redis demo")
});

// and api /name respond the name in redis server 
app.get('/name', (req, res) => {
    redis_client.get('name', function(err, reply) {
        let name = `redis server replies  ${reply}`
        res.json (name) 
    });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Node.js Server started at port: ${PORT}`);
});