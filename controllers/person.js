const { Person } = require("../models");
const httpStatus = require("http-status");

const controller = {
  async list(req, res) {
    const person = new Person();

    try {
      const persons = await person.findAll();

      res.status(httpStatus.OK).json(persons);
    } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
  },

  async show(req, res) {
    const person = new Person();

    const { id } = req.params;

    try {
      const onePerson = await person.findById(id);

      res.status(httpStatus.OK).json(onePerson);
    } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
  },

  async create(req, res) {
    const person = new Person();

    const { name, address, phone, email } = req.body;

    try {
      const personInserted = await person.insertOne({
        name,
        address,
        phone,
        email,
      });

      res.status(httpStatus.OK).json(personInserted);
    } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
  },

  async update(req, res) {
    const person = new Person();

    const { id } = req.params;

    const { name, address, phone, email } = req.body;

    try {
      const personUpdated = await person.update(id, {
        name,
        address,
        phone,
        email,
      });

      res.status(httpStatus.OK).json(personUpdated);
    } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
  },

  async delete(req, res) {
    const person = new Person();

    const { id } = req.params;

    try {
      const personWillDelete = await person.findById(id);

      await person.delete(id, { name, address, phone, email });

      res
        .status(httpStatus.OK)
        .json(`${personWillDelete.name} foi excluído (a) da base de dados`);
    } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
  },
};

module.exports = controller;
