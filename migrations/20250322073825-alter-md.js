'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('maintain_document', 'organization_id', {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'organization',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('maintain_document', 'organization_id');
  }
};