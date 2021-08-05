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

    const { name, email, ...rest } = req.body;

    const emailRegex = /\S+@\S+\.\S+/;

    if (!name)
      res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: "O campo nome é obrigatório" });

    if (!email) {
      res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: "O campo email é obrigatório" });
    } else if (!emailRegex.test(email)) {
      res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: "Digite um email válido. " });
    }

    try {
      const personInserted = await person.insertOne({ name, email, ...rest });

      const newPerson = await person.findById(personInserted);

      res.status(httpStatus.OK).json(newPerson);
    } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
  },

  async update(req, res) {
    const person = new Person();

    const { id } = req.params;

    const { name, email, ...rest } = req.body;

    if (!name)
      res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: "O campo nome é obrigatório" });

    if (!email) {
      res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: "O campo email é obrigatório" });
    } else if (!emailRegex.test(email)) {
      res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: "Email inválido" });
    }

    try {
      const personUpdated = await person.update(id, req.body);

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

      await person.delete(id);

      res.status(httpStatus.OK).json({
        message: `${personWillDelete.name} foi excluído (a) da base de dados`,
      });
    } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
  },
};

module.exports = controller;
