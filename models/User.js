const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// #region Schema

const userSchema = new mongoose.Schema({
    login: {
        type: String,
        required: [true, ' Please enter a login'],
        unique: true
    },
    password: {
        type: String,
        required: [true, ' Please enter a password']
    },
    fname: {
        type: String,
        required: [true, 'Please enter your first name']
    },
    surname: {
        type: String,
        required: [true, 'Please enter your surname']
    },
    age: {
        type: String
    },
    familyMembers: [
        {
            _id: String,
            fname: String
        }
    ]
});

// #endregion

// #region PasswordHash

userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// #endregion

// #region PreLogin

userSchema.statics.login = async function(login, password) {
    const user = await this.findOne({ login: login });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect login');
};

// #endregion

const User = mongoose.model('user', userSchema);

module.exports = User;
