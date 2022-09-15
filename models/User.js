const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new Schema({
    name: {
        type: String,
        required: true,
      },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    occupation: {
      type: String,
      required: false,
    },
    aboutMe: {
      type: String,
      required: false,
    },
    location: {
      type: String,
      required: false,
    },
    availability: {
        type: String,
        required: false,
    },
    linkedIn: {
        type: String,
        required: false,
    },
    twitter: {
        type: String,
        required: false,
    },
  }
);

// set up pre-save middleware to create password
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });
  
  // compare the incoming password with the hashed password
  userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };

const User = model('User', userSchema);

module.exports = User;