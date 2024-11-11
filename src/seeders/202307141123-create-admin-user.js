const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface) => {
    const hashedPassword = await bcrypt.hash('admin123', 10); 

    return queryInterface.bulkInsert('user', [{
      id: uuidv4(), 
      name: 'admin',
      email: 'admin@gmail.com',
      password: hashedPassword, 
      role: 'admin',
      status: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('User', { email: 'admin@gmail.com' }, {});
  }
};

//npx sequelize-cli db:seed:all   this is the commond to make entry in user table