import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@mart.com",
    phone: "7993918523",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Tom Hanks",
    email: "tom@mart.com",
    phone: "9987654321",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Lone Walker",
    email: "walker@mart.com",
    phone: "9121048121",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
