'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('receipt_information', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        allowNull: false
      },
      receipt_id: {
        type: Sequelize.STRING,
        allowNull: false
      },
      narration: {
        type: Sequelize.STRING,
        allowNull: false
      },
      account_id: {
        type: Sequelize.UUID,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('now()')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('now()')
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('receipt_information');
  }
};