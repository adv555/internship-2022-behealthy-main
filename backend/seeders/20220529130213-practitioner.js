'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    let data = [];
    const [users] = await queryInterface.sequelize.query(
      `SELECT id from "Users" WHERE ROLE ='PRACTITIONER';`,
    );

    data.push(
      {
        first_name: 'Vyacheslav',
        last_name: 'Kshyshtyniak',
        gender: 'Male',
        phone: '+380978696330',
        birthdate: '1984-01-25',
        user_id: users[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        first_name: 'Irina',
        last_name: 'Vasilchenko',
        gender: 'Female',
        phone: '+380974395530',
        birthdate: '1995-02-12',
        user_id: users[1].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // {
      //   first_name: 'Mykola',
      //   last_name: 'Kim',
      //   gender: 'Male',
      //   phone: '+380974397777',
      //   birthdate: '2000-02-12',
      //   user_id: users[2].id,
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   first_name: 'Kateryna',
      //   last_name: 'Svitla',
      //   gender: 'Female',
      //   phone: '+380974396666',
      //   birthdate: '1996-02-09',
      //   user_id: users[3].id,
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   first_name: 'John',
      //   last_name: 'Wisley',
      //   gender: 'Male',
      //   phone: '+380974393333',
      //   birthdate: '1987-03-11',
      //   user_id: users[4].id,
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   first_name: 'Khrystyna',
      //   last_name: 'Dochynets',
      //   gender: 'Female',
      //   phone: '+380974397766',
      //   birthdate: '1992-02-05',
      //   user_id: users[5].id,
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
    );

    return queryInterface.bulkInsert('family_practitioners', data, {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('family_practitioners', null, {});
  },
};
