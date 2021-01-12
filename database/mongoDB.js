/**
 * Este sera el archivo donde realizaremos la conexion a mongoAtlas
 *
 */

const { MongoClient, ObjectId } = require('mongodb');
const { config } = require('../config/config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}:/${DB_NAME}?retryWrites=true&w=majority`;

//Ahora construimos la libreria de mongo
class MongoDB {
  constructor() {
    this.client = new MongoClient(MONGO_URI, {
      useUnifiedTopology: true,
    });
    this.dbName = DB_NAME;
  }

  connect() {
    //Usamos el patron singleton, si ya existe una conexion usamos esa
    if (!MongoDB.connection) {
      MongoDB.connection = new Promise((resolve, reject) => {
        this.client.connect((err) => {
          if (err) {
            reject(err);
          }
          console.log('CONECTADO A LA DB ONLINE!!');
          resolve(this.client.db(this.dbName));
        });
      });
    }
    return MongoDB.connection;
  }

  //para obtener todos los datos
  getAll(collection, query) {
    return this.connect()
      .then((db) => {
        return db.collection(collection).find(query).toArray();
      })
      .catch((err) => {
        console.log(new Error(`Algo salgio mal en getAll ${err}`));
      });
  }

  //obtener un numero de datos
  getMany(collection, query, number) {
    return this.connect()
      .then((db) => {
        return db.collection(collection).find(query).limit(number).toArray();
      })
      .catch((err) => {
        console.log(new Error(`Algo salgio mal en getAll ${err}`));
      });
  }

  //para crear un nuevo dato
  create(collection, data) {
    return this.connect()
      .then((db) => {
        return db.collection(collection).insertOne(data);
      })
      .then((result) => {
        result.insertedId;
      });
  }

  //para eliminarlo de la base de datos
  delete(collection, id) {
    return this.connect()
      .then((db) => {
        return db.collection(collection).deleteOne({ _id: ObjectId(id) });
      })
      .then(() => {
        id;
      });
  }
}

module.exports = MongoDB;
