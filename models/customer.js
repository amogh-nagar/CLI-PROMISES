const path = require('path');
const fs = require('fs');
const fspromises = require('fs').promises;

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'data.json'
);

module.exports = class Customer {
  constructor(obj) {
    this.id = Math.random() * 1000;
    this.name = obj.name;
    this.email = obj.email;
  }

  async save() {
    let customers = [];

    try {
      const filecontent = await fspromises.readFile(p);
      customers = JSON.parse(filecontent);
      customers.push({ id: this.id, name: this.name, email: this.email });
    } catch (err) {
      if (err) {
        customers.push({ id: this.id, name: this.name, email: this.email });
      }
    }
    try {
      await fspromises.writeFile(p, JSON.stringify(customers));
      console.info('Customer created');
    } catch (err) {
      console.info('SOme error occurred!');
    }
  }

  static async fetchall(cb) {
    try {
      const filecontent = await fspromises.readFile(p);
      cb(JSON.parse(filecontent));
    } catch (err) {
      if (err) {
        cb(null);
      }
    }
  }

  static async find(id, cb) {
    try {
      const filecontent = await fspromises.readFile(p);
      const customer = JSON.parse(filecontent).find((c) => c.id === +id);
      if (!customer) {
        cb(null);
        return;
      }
      // return customer;
      cb(customer);
    } catch (err) {
      if (err) {
        cb(null);
      }
    }
  }

  static async update(obj, cb) {
    try {
      const filecontent = await fspromises.readFile(p);
      const customers = JSON.parse(filecontent);
      const customer = customers.find((c) => c.id === +obj.id);
      const index = customers.findIndex((c) => c.id === +obj.id);
      if (!customer) {
        cb(null);
        return;
      }
      customer.name = obj.name;
      customer.email = obj.email;
      customers[index] = customer;
      await fspromises.writeFile(p, JSON.stringify(customers));
      cb(customer);
    } catch (err) {
      if (err) {
        console.info('Some error occurred');
      }
    }
  }

  static async remove(id, cb) {
    try {
      const filecontent = await fspromises.readFile(p);
      const customer = JSON.parse(filecontent).find((c) => c.id === +id);
      if (!customer) {
        cb('Not found!');
        return;
      }
      const customers = JSON.parse(filecontent).filter((c) => c.id !== +id);
      await fspromises.writeFile(p, JSON.stringify(customers));

      cb('Deleted!');
    } catch (err) {
      if (err) {
        cb('Some error occurred');
      }
    }
  }
};
