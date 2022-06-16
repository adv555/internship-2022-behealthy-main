'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    let data = [];
    const [practitioners] = await queryInterface.sequelize.query(
      `SELECT id from family_practitioners;`,
    );
    const [patients] = await queryInterface.sequelize.query(
      `SELECT id from patients;`,
    );
    data.push(
      {
        status: 'REQUESTED',
        patient_id: patients[0].id,
        family_practitioner_id: practitioners[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        status: 'REQUESTED',
        patient_id: patients[1].id,
        family_practitioner_id: practitioners[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        status: 'REQUESTED',
        patient_id: patients[2].id,
        family_practitioner_id: practitioners[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        status: 'REQUESTED',
        patient_id: patients[3].id,
        family_practitioner_id: practitioners[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        status: 'REQUESTED',
        patient_id: patients[4].id,
        family_practitioner_id: practitioners[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    );

    return queryInterface.bulkInsert('Declarations', data, {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Declarations', null, {});
  },
};
