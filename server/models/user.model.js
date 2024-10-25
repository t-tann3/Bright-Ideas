import { model, Schema } from 'mongoose';
import validator from 'validator';
import mongooseUniqueValidator from 'mongoose-unique-validator'
const { isEmail } = validator
import bcrypt from 'bcrypt'
const UserSchema = new Schema ({

    firstName: {
        type: String,
        required: [true, "Name is required!"],
        minlength: [1, "Name must have minimum 2 characters"],
        maxlength: [40, "Name must have less than 40 characters"]

    },
    alias: {
        type: String,
        required: [true, "Last name is required!"],
        minlength: [1, "Last name must have minimum 2 characters"],
        maxlength: [40, "Last name must have less than 40 characters"]

    },
    email: {
        type: String,
        required: [true, 'Please enter a valid email address!'],
        unique: [true, "An account with this email is already in use"],
        validate: [isEmail, 'Not an email']
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: [8, "Password must be 8 characters"],
        maxlength: [16, "Password must not exceed 16 characters"]

    },
    ideas: [
        {
            text: {
                type: String,
                required: [true, "Idea cannot be empty"],
                minLength: [1, "Idea must have at least 1 character"],
                maxLength: [500, "Idea cannot exceed 500 characters"]
            },
            likes: [
                {
                    type: Schema.Types.ObjectId, // stores the user IDs of who liked the post
                    ref: 'User'
                }
            ],
            userId: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true
            }
        }
    ]
},
    {timestamps: true}
);
UserSchema.plugin(mongooseUniqueValidator)

// middleware
UserSchema.virtual('confirmPassword')
    .get(function(){
        return this._confirmPassword
    })
    .set(function(value){
        this._confirmPassword = value
    })

UserSchema.pre('validate', function (next) {
console.log("Password: ", this.password)
console.log("Confirm Password: ", this._confirmPassword)
    if (this.password !== this._confirmPassword) {
        this.invalidate('confirmPassword', 'Passwords do not match')
    }
    next()
})

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next(); // If password is not modified, skip hashing
    }

    try {
        // Hash the password with bcrypt
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error); // Pass error to next middleware
    }
});

const User = model("User", UserSchema);
export default User;