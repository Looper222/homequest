const User = require('../models/User');
const jwt = require('jsonwebtoken');

// #region ErrorHandlerLogin

const handleErrorsLogin = (err) => {
    console.log(err.message, err.code);
    let errors = { login: '', password: ''};

    // incorrect login
    if (err.message === 'incorrect login') {
        errors.login = 'That login is not registered';
    }

    // incorrect password
    if (err.message === 'incorrect password') {
        errors.password = 'Entered password is not correct';
    }

    return errors;
};

// #endregion

// #region ErrorHandlerSignup

const handleErrorsSignup = (err) => {
    console.log(err.message, err.code);
    // let errors = {
    //     fname: '',
    //     surname: '',
    //     password: '',
    //     phoneNumber: '',
    //     birthDate: '',
    //     gender: ''
    // }

    let errors = {
        login: '',
        password: ''
    };

    // duplicate value errors
    if (err.code === 11000) {
        if (err.message.includes('login_1 dup')) {
            errors.login = 'That login is already registered';
            return errors;
        }
    }

    // validation errors
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
};

// #endregion

const maxAge = 4 * 24 * 60 * 60;

const createToken = (id) => {
    return jwt.sign({ id }, 'jNTT1iPgSTGGnmah', { expiresIn: maxAge });
}

const signup_post = async (req, res) => {
    try {
        console.log('signup_post');
        res.status(200).json('signup_post');
    } catch (err) {
        console.log(err);
    }
};

const member_reg_post = async (req, res) => {
    try {
        console.log('member_reg_post');
        res.status(200).json('member_reg_post');
    } catch (err) {
        console.log(err);
    }
};

const login_post = async (req, res) => {
    try {
        console.log('login_post');
        res.status(200).json('login_post');
    } catch (err) {
        console.log(err)
    }
};

module.exports = {
    signup_post,
    member_reg_post,
    login_post
}
