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

    //get logged in user not sure if we need this 
    getLoggedInUser: async (req, res) => {
        try{
            const {userId} = req.params
            const user = await User.findById(userId)
            res.status(200).json(user)
        }
        catch (err) {
            res.status(500).json(err)
        }
    },

    //Ideas
    saveIdeas: async (req, res) => {
        const {userId, idea} = req.body;
        try {
            await User.findByIdAndUpdate(
                userId,
                {$push: {ideas: idea}},
                {new: true}
            );
            console.log('Idea has been posted!');
        } catch (error) {
            console.log('Error posting idea:', error);
        }
    },


    //Get ideas for feed
    getIdeas: async (req, res) => {
        try {
            // Fetch each user with their alias and ideas
            const allUsers = await User.find().select('alias ideas');

            // Combine each idea with its user alias
            const ideas = allUsers.flatMap(user => 
                user.ideas.map(idea => ({
                ...idea.toObject(),
                userAlias: user.alias
                }))
            )

            console.log('All ideas with user aliases', ideas);
            res.status(200).json(ideas);
        } catch(err){
            res.status(500).json({message: 'Error fetching ideas', error: err});
        }
    },


    // Get ideas by ID, specifically for postDetails.jsx
    getIdeaById: async (req, res) => {
        try {
            const { ideaId } = req.params;
            const idea = await User.findOne(
                { "ideas._id": ideaId },
                { "ideas.$": 1 }
            ).populate("ideas.likes"); 
            if (!idea) {
                return res.status(404).json({ message: "Idea not found"});
            }
            res.status(200).json(idea.ideas[0]);
        } catch (err) {
            res.status(500).json({ message: "Error fetching idea", error: err});
        }
    },

    // Delete ideas
    deleteIdeas: async (req, res) => {
        const {userId, idea} = req.body;
        try {
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                {$pull: {ideas:{ _id: idea} }},
                {new: true}
            );
            if (!updatedUser) {
                return res.status(404).json({message: 'User not found'});
            }
            console.log('Idea has been deleted');
            res.status(200).json({
                message: 'Idea deleted',
                updatedIdeas: updatedUser.ideas
            });
        } catch (error) {
            console.log('Error saving idea:', error);
            res.status(500).json({message: 'Failed to delete idea'})
        }
    }
}