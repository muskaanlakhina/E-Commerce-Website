import bcrypt from 'bcryptjs'
const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456',10),
        isAdmin:true
    },
    {
        name: 'Mor amir',
        email: 'Mor@example.com',
        password: bcrypt.hashSync('123456',10),
     
    },
    {
        name: 'Tal Amir',
        email: 'Tal@example.com',
        password: bcrypt.hashSync('123456',10),
       
    },
]
export default users