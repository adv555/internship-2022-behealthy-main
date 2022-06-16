'use strict';

const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    let data = [];
    const hashRound = 10;

    data.push(
      {
        email: 'testpatient@email.com',
        password: bcrypt.hashSync('testpassword122@', hashRound),
        role: 'PATIENT',
        activationLink: uuidv4(),
        isActivated: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'johndoe@email.com',
        password: bcrypt.hashSync('johndoepass@312', hashRound),
        role: 'PATIENT',
        activationLink: uuidv4(),
        isActivated: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'jasoninjury@email.com',
        password: bcrypt.hashSync('goodpassword9392@', hashRound),
        role: 'PATIENT',
        activationLink: uuidv4(),
        isActivated: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'testemailq@email.com',
        password: bcrypt.hashSync('1goodpassword9392@', hashRound),
        role: 'PATIENT',
        activationLink: uuidv4(),
        isActivated: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'testemailqq@email.com',
        password: bcrypt.hashSync('2goodpassword9392@', hashRound),
        role: 'PATIENT',
        activationLink: uuidv4(),
        isActivated: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'testemailqqq@email.com',
        password: bcrypt.hashSync('3goodpassword9392@', hashRound),
        role: 'PATIENT',
        activationLink: uuidv4(),
        isActivated: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'testemailqqqq@email.com',
        password: bcrypt.hashSync('4goodpassword9392@', hashRound),
        role: 'PATIENT',
        activationLink: uuidv4(),
        isActivated: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'testemailqqqqq@email.com',
        password: bcrypt.hashSync('5goodpassword9392@', hashRound),
        role: 'PATIENT',
        activationLink: uuidv4(),
        isActivated: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    );

    data.push(
      {
        email: 'testpractitioner@email.com',
        password: bcrypt.hashSync('testpractitionespass@123', hashRound),
        role: 'PRACTITIONER',
        activationLink: uuidv4(),
        isActivated: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'familypractitioner@email.com',
        password: bcrypt.hashSync('superpassword123@22', hashRound),
        role: 'PRACTITIONER',
        activationLink: uuidv4(),
        isActivated: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'doctor@email.com',
        password: bcrypt.hashSync('doctorp@ss123', hashRound),
        role: 'PRACTITIONER',
        activationLink: uuidv4(),
        isActivated: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'doctor1@email.com',
        password: bcrypt.hashSync('doctorp@ss123@', hashRound),
        role: 'PRACTITIONER',
        activationLink: uuidv4(),
        isActivated: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'doctor2@email.com',
        password: bcrypt.hashSync('doctorp@ss123@@', hashRound),
        role: 'PRACTITIONER',
        activationLink: uuidv4(),
        isActivated: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'doctor3@email.com',
        password: bcrypt.hashSync('doctorp@ss123@@', hashRound),
        role: 'PRACTITIONER',
        activationLink: uuidv4(),
        isActivated: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    );

    return queryInterface.bulkInsert('Users', data, {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
