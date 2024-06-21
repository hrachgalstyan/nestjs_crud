import { DataTypes, QueryInterface } from 'sequelize';

import { CATEGORY_TABLE_NAME } from '@Constants';

const migration = () => ({
  async up(queryInterface: QueryInterface) {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.createTable(
        CATEGORY_TABLE_NAME,
        {
          id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
          },

          title: {
            type: DataTypes.STRING(255),
            allowNull: false,
          },

          description: {
            type: DataTypes.TEXT,
            allowNull: true,
          },
        },
        {
          transaction: t,
        },
      );
    });
  },

  async down(queryInterface: QueryInterface) {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.dropTable(CATEGORY_TABLE_NAME, { transaction: t });
    });
  },
});

export default migration();
