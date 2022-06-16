'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    let data = [];
    const [users] = await queryInterface.sequelize.query(
      `SELECT id from "Users" WHERE ROLE ='PATIENT' AND "isActivated" = TRUE;`,
    );

    data.push(
      {
        first_name: 'Oksana',
        last_name: 'Marchenko',
        gender: 'Female',
        phone: '+380977638902',
        birthdate: '1967-11-02',
        user_id: users[0].id,
        address: 'Kyiv , Soborna st. 9',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        first_name: 'Jack',
        last_name: 'Daniel',
        gender: 'Other',
        phone: '+380639874432',
        birthdate: '2000-06-22',
        user_id: users[1].id,
        address: 'Khust, Shevchenko st. 29A',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        first_name: 'Sergey',
        last_name: 'Ovsyannikov',
        gender: 'Male',
        phone: '+380632272211',
        birthdate: '1993-04-02',
        user_id: users[2].id,
        address: 'Sumy, Pushkinska st. 8',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        first_name: 'Stanislav',
        last_name: 'Prokopenko',
        gender: 'Male',
        phone: '+380638872211',
        birthdate: '1991-06-12',
        user_id: users[3].id,
        address: 'Kharkiv, 23 Serpnya st. 16',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        first_name: 'Valentina',
        last_name: 'Dobnya',
        gender: 'Female',
        phone: '+380632270876',
        birthdate: '1978-11-08',
        user_id: users[4].id,
        address: 'Kyiv, Semashko st. 67',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    );

    return queryInterface.bulkInsert('patients', data, {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('patients', null, {});
  },
};
