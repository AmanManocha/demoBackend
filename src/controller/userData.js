// const User = require('../model/userModel.js');

// const getUserData = async (req, res) => {
//     try {

//         const accessToken = req.header('accessToken');

//         // Check if the access token is provided
//         if (!accessToken) {
//           return res.status(401).json({ error: 'Access denied. No token provided.' });
//         }
//         const users = await User.find();
//         res.json(users);
//       } catch (error) {
//         console.error('Error fetching users:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
//   };

//   module.exports = {getUserData};

const User = require('../model/userModel.js');

const getUserData = async (req, res) => {
  try {
    const accessToken = req.header('accessToken');

    // Check if the access token is provided
    if (!accessToken) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    // Assume the decoded user information is attached to req.user by the middleware
    const { role } = req.user;

    // Check if the role is admin
    if (role === 'admin') {
      // If the role is admin, fetch all users
      const nonAdminUsers = await User.find({ role: { $ne: 'admin' } });
      res.json(nonAdminUsers);
    } else {
      // If the role is not admin, deny access
      return res.status(403).json({ error: 'Access denied. Unauthorized role.' });
    }
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getUserData };
