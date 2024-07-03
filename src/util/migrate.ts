import "./../pre-start";
import sequelize from "../configs/sequelize";

export const synchronizeDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    await sequelize.sync({
      alter: true,
    });
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to synchronize the database:", error);
  } finally {
    await sequelize.close();
  }
};
