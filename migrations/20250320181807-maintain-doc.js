'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('maintain_document', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        allowNull: false
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      header_account: {
        type: Sequelize.STRING,
        allowNull: false
      },
      date: {
        type: Sequelize.STRING,
        allowNull: false
      },
      receipt: {
        type: Sequelize.STRING,
        allowNull: false
      },
      total_amount: {
        type: Sequelize.STRING,
        allowNull: false
      },
      total_lines: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('maintain_document');
  }
};