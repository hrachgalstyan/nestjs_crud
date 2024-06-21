import { QueryInterface } from 'sequelize';

import { categories, CATEGORY_TABLE_NAME } from '@Constants';

const seed = () => ({
  async up(queryInterface: QueryInterface) {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.bulkInsert(CATEGORY_TABLE_NAME, categories, {
        transaction: t,
      });
    });
  },

  async down(queryInterface: QueryInterface) {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.bulkDelete(
        CATEGORY_TABLE_NAME,
        {},
        { transaction: t },
      );
    });
  },
});

export default seed();
