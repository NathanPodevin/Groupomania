'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Posts', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'fkey_cascade_ondelete',
      references: { //Required field
        table: 'Users',
        field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Posts', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'fkey_cascade_ondelete',
      references: { //Required field
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade'
    });
  }
};
