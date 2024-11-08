import { DataTypes } from "sequelize";
import sequelize from "../data/db.js";

const Stores = sequelize.define(
  "STARBUCKS_DIRECTORY",
  {
    number: {
      type: DataTypes.TEXT,
      primaryKey: true,
      field: "STORE_NUMBER",
    },
    name: {
      type: DataTypes.TEXT,
      field: "STORE_NAME",
    },
    address: {
      type: DataTypes.TEXT,
      field: "STREET_ADDRESS",
      allowNull: false,
    },
    city: {
      type: DataTypes.TEXT,
      field: "CITY",
      allowNull: false,
    },
    province: {
      type: DataTypes.TEXT,
      field: "PROVINCE",
      allowNull: false,
    },
    country: {
        type: DataTypes.TEXT,
        field: 'COUNTRY',
        allowNull: false
    },
    postcode: {
      type: DataTypes.TEXT,
      field: "POSTCODE",
      allowNull: false,
    },
    longitude: {
      type: DataTypes.REAL,
      field: "LONGITUDE",
      allowNull: false,
    },
    latitude: {
      type: DataTypes.REAL,
      field: "LATITUDE",
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "STARBUCKS_DIRECTORY",
  }
);

export default Stores;
