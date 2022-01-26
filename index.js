const mongodb = require('mongodb')

const client = new mongodb.MongoClient('mongodb://localhost:27017');

const connectClient = async () => { // Cannot use await without async (hence, async await); => callbacks
    await client.connect(); // need to await 'something' to return a promise, needs to 'wait for it' to connect
    console.log('Client Connected!'); // hold COMMAND over .connect to see that it 'returns' a Promise
};

const getUserCollection = () => { // getUserCollection is a function that will either create or open db 'peter=db'
    const db = client.db('peter-db'); 
    const uCol = db.collection('users'); // and create or open collection 'users'

    return uCol;
}

const getProductCollection = () => { // getUserCollection is a function that will either create or open db 'peter=db'
    const db = client.db('peter-db'); 
    const pCol = db.collection('users'); // and create or open collection 'users'

    return pCol;
}

const insertUser = async () => {
    const uCol = getUserCollection() //
    await uCol.insertOne({
        first: 'Peter',
        last: 'Lewandowski',
        job: 'student',
    })
    console.log('User Inserted!');
};

const insertProduct = async () => {
    const pCol = getProductCollection() //
    await pCol.insertOne({
        item: 'backpack',
        Brand: 'Adidas',
        color: 'grey',
        price: 49.99,
    })
    console.log('Product Inserted!');
};

const getUsers = async () => {
    const pCol = getUserCollection();
    const users = await pCol.find({}).toArray();

    return users;
};

const getProduct = async () => {
    const pCol = getUserCollection();
    const product = await pCol.find({}).toArray();

    return product;
};

connectClient() // .then runs the function connect.Client() once it's finished connecting (the await part above)
  .then(() => insertUser())
  .then(() => getUsers())
  .then((users) => console.log(users))
  .then(() => insertProduct())
  .then(() => getProduct())
  .then((product) => console.log(product))
  .then(() => client.close()); //this is how you have it close automatically for you
