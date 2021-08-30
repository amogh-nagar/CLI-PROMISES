const { info } = require('console');
const http = require('http');
const Customer = require('./models/customer');

const addcustomer = (customer1) => {
  const customer = new Customer(customer1);
  customer
    .save()
    // .then((x) => {
    //   console.info('New customer added');
    // })
    // .catch((err) => {
    //   console.info('Some error occurred');
    // });
};

const findcustomer = (id) => {
  Customer.find(id, (customer) => {
    if (!customer) {
      console.info('Not found!');
    } else console.info(customer);
  });
};

const updatecustomer = (customer) => {
  Customer.update(
    { id: customer.id, name: customer.name, email: customer.email },
    (customer) => {
      if (!customer) {
        console.info('Not found!');
        return;
      }
      console.info(customer);
    }
  );
};

const deletecustomer = (obj) => {
  Customer.remove(obj.id, (message) => {
    console.info(message);
  });
};

const allcustomers = () => {
  Customer.fetchall((data) => {
    if (!data) {
      console.info('No data found');
      return;
    }
    console.info(data);
    console.info(`${data.length} customer(s) found`);
  });
};

exports.addcustomer = addcustomer;
exports.findcustomer = findcustomer;
exports.updatecustomer = updatecustomer;
exports.deletecustomer = deletecustomer;
exports.allcustomers = allcustomers;
