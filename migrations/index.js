// module.exports = {
//     up: (queryInterface, Sequelize) =>
//       queryInterface.createTable("Users", {
//         id: {
//           allowNull: false,
//           autoIncrement: true,
//           primaryKey: true,
//           type: Sequelize.INTEGER
//         },
//         firstame: {
//           type: Sequelize.STRING,
//           allowNull: false,
//         },
//         lastname: {
//           type: Sequelize.STRING,
//           allowNull: false,
//         },
//         email: {
//           type: Sequelize.STRING,
//           allowNull: false,
//           unique: true
//         },
//         password: {
//           type: Sequelize.STRING,
//           allowNull: false
//         }
//       }),
//     down: queryInterface => queryInterface.dropTable("Users")
//   };
  