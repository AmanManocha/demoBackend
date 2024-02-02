const User = require('../model/userModel')
const multer = require('multer'); 
const fs = require('fs');
const path = require('path');
const userFormData = async (req, res) => {
    try {
        const accessToken = req.header('accessToken');
        const { userId } = req.user;
        
        if (!accessToken) {
            return res.status(401).json({ error: 'Access denied. No token provided.' });
          }

        // Find the user document by email
        let user = await User.findOne({ _id:userId });

        // If the user doesn't exist, return a 404 error
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update the user details with the data from the request body
        user.set(req.body);

        // Save the updated user document to MongoDB
        await user.save();

        res.status(200).json({ message: 'User details updated successfully' });
   
    }
    catch (err) {
        console.error('Error saving form data:', err);
        res.status(500).json({ error: 'Internal server error' });
      }
};
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadDir = './uploads'; // Specify the directory for storing uploaded files
      fs.mkdir(uploadDir, { recursive: true }, function (err) {
        if (err) {
          console.error('Error creating directory:', err);
        }
        cb(null, uploadDir);
      });
    },
    filename: function (req, file, cb) {
      const fileName = Date.now() + '-' + file.originalname; // Generate a unique file name
      cb(null, fileName);
    }
  });
  const upload = multer({ storage: storage });
    const handleFileUpload = async (req, res) => {
        const { userId } = req.params; // Assuming userId is the parameter containing the user's ID
        upload.single('file')(req, res, async (err) => {
            console.log(req,"single file backenddddddddddddddddddddddddddddddddddddddddddd")
          if (err instanceof multer.MulterError) {
            // Multer error occurred
            return res.status(501).json(err);
          } else if (err) {
            // Unknown error occurred
            console.log(err);
            return res.status(500).json(err);
          }
      
          // File uploaded successfully
          if (!req.file) {
            return res.status(400).send('No file uploaded.');
          }
          
          try {
            const user = await User.findById({_id:userId});
            if (!user) {
              return res.status(404).send('User not found.');
            }
            
            user.profilePhoto = req.file.path;
            await user.save();
            
            res.status(200).send('Profile photo uploaded and saved successfully.');
          } catch (error) {
            console.error('Error saving profile photo:', error);
            res.status(500).send('Error saving profile photo.');
          }
        });
      };
      const uploadMultipleFiles = async (req, res) => {
        
        const { userId } = req.params;
        upload.array('files')(req, res, async (err) => {
            console.log(req,"MultipleFiles")
          if (err instanceof multer.MulterError) {
            // Multer error occurred
            console.log(err)
            return res.status(501).json(err);
          } else if (err) {
            // Unknown error occurred
            console.log(err);
            return res.status(500).json(err);
          }
          // Files uploaded successfully
          if (!req.files || req.files.length === 0) {
            return res.status(400).send('No files uploaded.');
          }
          
          try {
            const user = await User.findById(userId);
            if (!user) {
              return res.status(404).send('User not found.');
            }
            
            // Map the paths of uploaded files and save them in the user's document
            const filePaths = req.files.map(file => file.path);
            user.documents = filePaths;
            console.log(filePaths)
            await user.save();
            
            res.status(200).send('Files uploaded and saved successfully.');
          } catch (error) {
            console.error('Error saving files:', error);
            res.status(500).send('Error saving files.');
          }
        });
      };
module.exports = {userFormData, handleFileUpload, uploadMultipleFiles};