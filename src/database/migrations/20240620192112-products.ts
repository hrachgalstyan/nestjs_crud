import { DataTypes, QueryInterface } from 'sequelize';

import { CATEGORY_TABLE_NAME, PRODUCT_TABLE_NAME } from '@Constants';

const migration = () => ({
  async up(queryInterface: QueryInterface) {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.createTable(
        PRODUCT_TABLE_NAME,
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

          SKU: {
            type: DataTypes.STRING(8),
            allowNull: false,
            unique: true,
          },

          price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
          },

          categoryId: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
              model: CATEGORY_TABLE_NAME,
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
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
      await queryInterface.dropTable(PRODUCT_TABLE_NAME, { transaction: t });
    });
  },
});

export default migration();
