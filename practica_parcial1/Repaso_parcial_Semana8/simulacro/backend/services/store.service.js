import { Op } from "sequelize";
import Stores from "../models/Stores.js";

const getStoresByArgentinaCountry = async (req, res) => {
  try {
    const stores = await Stores.findAll({ where: { country: "AR" } });
    res.json(stores);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getStoresByArgentinaCountryAndNotAMBA = async (req, res) => {
  try {
    const stores = await Stores.findAll({
      where: {
        country: "AR",
        province: {
          [Op.notIn]: ["C", "B"],
        },
      },
    });
    res.json(stores);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export default {
  getStoresByArgentinaCountry,
  getStoresByArgentinaCountryAndNotAMBA,
};
