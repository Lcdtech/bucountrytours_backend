const allRoles = {
  admin: ['admin'],
  User: ['User',]
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights
};