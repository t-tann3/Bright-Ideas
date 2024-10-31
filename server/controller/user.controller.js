import User from "../models/user.model.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const UserController = {

    //register
    register: async (req, res) => {
        try {
            //create user with form data
            const newUser = await User.create(req.body)
            console.log(newUser);
            // ! Generate JWT and send with response 
            const userToken = jwt.sign(
                {userId:newUser._id, username:newUser.username},
                process.env.SECRET_KEY
            )
            res.cookie('userToken', userToken, {httpOnly:true})
            res.status(201).json(newUser)
        }
        catch(err) {
            if (err.name === 'ValidationError') {
                res.status(400).json({message: "Validation error", error: err.message})
            } else {
                console.error("Error during registration: ", err)
                res.status(500).json(err)
            }
            
        }
    },


    //login
    login: async (req, res) => {
        try {
            //check if the user exists by email
            const {email, password} = req.body
            const potentialUser = await User.findOne({email})
            if(!potentialUser){
                return res.status(404).json({message: 'user not found register now'})
            }
            // if we've gotten to this point, the user exists by email
            // check to see if passwords match
            const passwordsMatch = await bcrypt.compare(password, potentialUser.password)
            if(!passwordsMatch){
                return res.status(400).json({message: 'invalid credentials'})
            }
            // Log user in (generate jwt)
            const userToken = jwt.sign(
                {userId:potentialUser._id, username:potentialUser.username},
                process.env.SECRET_KEY
            )
            res.cookie('userToken', userToken, {httpOnly:true})
            res.status(201).json({userId: potentialUser._id});
        }
        catch(err) {
            res.status(500).json(err)
        }
    },

    //logout
    logout: async (req, res) => {
        res.clearCookie('userToken')
        res.status(200).json({message: 'Successfully logged out'})
    },

    getLoggedInUser: async (req, res) => {
        try {
            const { userId } = req.params;
            const user = await User.findById(userId);
    
            if (!user) {
                return res.status(404).json({ message: "User not found" }); 
            }
    
            res.status(200).json(user); 
        } catch (err) {
            console.error("Error fetching user:", err); // Log the error for debugging
            res.status(500).json({ message: "Internal server error", error: err });
        }
    },
    
    saveIdeas: async (req, res) => {
        const { userId, ideaText } = req.body; // Ensure you're extracting the idea text
        try {
            const idea = {
                text: ideaText, // Text of the idea
                userId: userId, // Link idea to the user
                likes: [] // Initialize likes array
            };
    
            // Save the idea to the user's ideas array
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { $push: { ideas: idea } },
                { new: true, useFindAndModify: false } // Get the updated user object
            );
    
            // Find the new idea added to the user's ideas array
            const newIdea = updatedUser.ideas[updatedUser.ideas.length - 1]; // Get the latest idea
    
            // Optionally, find the user to get their details (e.g., username)
            const user = await User.findById(userId).select('username'); // Assuming you have a username field
    
            res.status(201).json({ ...newIdea, username: user.username }); // Return the new idea with the username
        } catch (error) {
            console.log('Error posting idea:', error);
            res.status(500).json({ message: "Error posting idea", error });
        }
    },
    
    

// Get ideas for feed
getIdeas: async (req, res) => {
    try {
        // Fetch each user with their alias and ideas
        const allUsers = await User.find().select('alias ideas');

        // Combine each idea with its user alias and userId
        const ideas = allUsers.flatMap(user => 
            user.ideas.map(idea => ({
                ...idea.toObject(),
                userAlias: user.alias,
                userId: user._id // Attach userId to each idea
            }))
        );

        console.log('All ideas with user aliases and user IDs:', ideas);
        res.status(200).json(ideas);
    } catch (err) {
        console.error('Error fetching ideas:', err);
        res.status(500).json({ message: 'Error fetching ideas', error: err });
    }
},


    // Get ideas by ID, specifically for postDetails.jsx

    getIdeaById: async (req, res) => {
        try {
            const { ideaId } = req.params;
            console.log("Fetching idea with ID:", ideaId);
    
            const userWithIdea = await User.findOne(
                { "ideas._id": ideaId },
                { "ideas.$": 1 } // This will return only the specific idea
            ).populate("ideas.likes", "firstName alias");
    
            if (!userWithIdea || !userWithIdea.ideas.length) {
                console.error("Idea not found");
                return res.status(404).json({ message: "Idea not found" });
            }
    
            const ideaData = userWithIdea.ideas[0];
    
            res.status(200).json({
                text: ideaData.text,
                likes: ideaData.likes,
            });
        } catch (err) {
            console.error("Error fetching idea:", err);
            return res.status(500).json({ message: "Error fetching idea", error: err });
        }
    },
    
    

    likeIdea: async (req, res) => {
        const { userId, ideaId } = req.params; // Extract userId and ideaId from params
        const { likerId } = req.body; // ID of the user who liked the idea
    
        try {
            // Find the specific idea based on the ideaId in the User model
            const idea = await User.findOne(
                { "ideas._id": ideaId }, // Search for the idea regardless of the owner
                { "ideas.$": 1 } // Only return the specific idea
            );
    
            // If the idea does not exist, return 404
            if (!idea || idea.ideas.length === 0) {
                return res.status(404).json({ message: "Idea not found" });
            }
    
            // Get the specific idea
            const targetIdea = idea.ideas[0]; // Since we only need one idea
    
            // Check if the likerId is already in the likes array to prevent duplicate likes
            if (targetIdea.likes.includes(likerId)) {
                return res.status(400).json({ message: "User already liked this idea" });
            }
    
            // Use `updateOne` to add likerId to the likes array of the specific idea
            await User.updateOne(
                { "ideas._id": ideaId }, // Just need to find the idea
                { $push: { "ideas.$.likes": likerId } } // Push likerId to likes array in the specified idea
            );
    
            // Return the updated likes array with the new likerId
            res.json({ likes: [...targetIdea.likes, likerId] }); // Return the updated likes array
        } catch (error) {
            console.error("Error liking idea:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
    
    
    // Delete ideas
    deleteIdeas: async (req, res) => {
        const { userId, ideaId } = req.body;
        try {
            // Find the user and remove the idea by its ID
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { $pull: { ideas: { _id: ideaId } } }, // Removes the idea with the specified ID
                { new: true } // Returns the updated document
            );
            
            if (!updatedUser) {
                return res.status(404).json({ message: 'User or idea not found' });
            }

            console.log('Idea has been deleted');
            res.status(200).json({
                message: 'Idea deleted',
                updatedIdeas: updatedUser.ideas // Send back the updated ideas
            });
        } catch (error) {
            console.error('Error deleting idea:', error);
            res.status(500).json({ message: 'Failed to delete idea' });
        }
    }
}