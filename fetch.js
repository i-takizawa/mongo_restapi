const axios = require('axios');
const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;

const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'test';

const client = new MongoClient(mongoUrl, { useUnifiedTopology: true });

client.connect((e) => {
  assert.equal(null, e);
  console.log('Connected to mongodb!');
  const db = client.db(dbName);
  insertDocuments(db);
  client.close();
})

const insertDocuments = db => {
  // Get the documents collection
  const collection = db.collection('posts');
  axios.get('https://jsonplaceholder.typicode.com/posts')
    .then(data => {
      console.log(data)
      // Insert some documents
      collection.insertMany(data.data, (err, result) => {
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log(`Inserted ${data.length} documents into the collection`);
    });
  });
}

function getPosts() {
  return axios.get('https://jsonplaceholder.typicode.com/posts')
  .then(res => {
    console.log(res);
  })
  .catch(e => console.log(e));
}
