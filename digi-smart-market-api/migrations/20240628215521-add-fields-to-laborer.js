'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Laborers', 'code', {
      type: Sequelize.STRING
    });
    await queryInterface.addColumn('Laborers', 'phoneNumber', {
      type: Sequelize.STRING
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Laborers', 'code');
    await queryInterface.removeColumn('Laborers', 'phoneNumber');
  }
};
