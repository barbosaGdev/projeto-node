const Database = require("./Database");

class Person extends Database {
    constructor() {
        super()
        this.collection = 'persons'
    }
}

module.exports = Person