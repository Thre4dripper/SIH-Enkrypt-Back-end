const DB = {
    users: require('../models/users.json'),
    setUsers: (users) => {
        DB.users = users;
    }
}

const fsPromises = require('fs').promises;
const path = require('path');

const registerController = async (req, res) => {
    const {username, password} = req.body;

    if (!username || !password) {
        return res.status(400).json({
            message: 'Please provide username and password'
        });
    }
    try {
        const usersArray = JSON.parse(
            await fsPromises.readFile(path.join(__dirname, '..', 'models', 'users.json'), 'utf8')
        )

        // Check if user already exists
        if (usersArray.find(user => user.username === username)) {
            return res.status(400).json({
                message: 'Username already exists'
            });
        }

        usersArray.push({
            username,
            password
        });

        // inserting data into DB
        await fsPromises.writeFile(path.join(__dirname, '..', 'models', 'users.json'), JSON.stringify(usersArray));

        return res.status(200).json({message: 'User registered successfully'});
    } catch (e) {
        return res.status(500).json({
            message: 'Something went wrong'
        });
    }
}

module.exports = registerController;