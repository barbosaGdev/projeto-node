const MongoDb = require("mongodb");
const secrets = require("../../secrets.json");

class Database {
  constructor() {
    this.mongoClient = MongoDb.MongoClient;
    this.collection = "";
  }

  async _getMongoClientAndCollection() {
    const client = await this.mongoClient.connect(secrets.mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const database = client.db();
    const collection = database.collection(this.collection);

    return { client, collection };
  }

  async insertOne(objectToInsert) {
    return new Promise(async (resolve, reject) => {
      const { client, collection } = await this._getMongoClientAndCollection();

      if (!collection) reject();

      collection.insertOne(objectToInsert, (error, document) => {
        if (error) reject(error);

        client.close();

        resolve(document.insertedId);
      });
    });
  }

  async findAll() {
    return new Promise(async (resolve, reject) => {
      const { client, collection } = await this._getMongoClientAndCollection();

      if (!collection) reject();

      collection.find({}).toArray((error, result) => {
        if (error) reject(error);

        client.close();

        resolve(result);
      });
    });
  }

  async findById(userId) {
    return new Promise(async (resolve, reject) => {
      const { client, collection } = await this._getMongoClientAndCollection();

      if (!collection) reject();

      collection.findOne({ _id: MongoDb.ObjectId(userId) }, (error, result) => {
        if (error) reject(error);

        client.close();

        resolve(result);
      });
    });
  }

  async update(userId, objectToUpdate) {
    return new Promise(async (resolve, reject) => {
      const { client, collection } = await this._getMongoClientAndCollection();

      if (!collection) reject();

      collection.findOneAndUpdate(
        { _id: MongoDb.ObjectId(userId) },
        { $set: objectToUpdate },
        { returnDocument: 'after' },
        (error, document) => {
          if (error) reject(error);

          client.close();

          resolve(document.value);
        }
      );
    });
  }

  async delete(userId) {
    return new Promise(async (resolve, reject) => {
      const { client, collection } = await this._getMongoClientAndCollection();

      if (!collection) reject();

      collection.deleteOne(
        { _id: MongoDb.ObjectId(userId) },
        (error, document) => {
          if (error) reject(error);

          client.close();

          resolve(document);
        }
      );
    });
  }
}

module.exports = Database;
