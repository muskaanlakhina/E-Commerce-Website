import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'xborder',
    email: 'xborderofficial@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Sylvester Stallone',
    email: 'sylvester@xborder.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;
