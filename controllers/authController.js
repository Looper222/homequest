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

// #region TokenIinit
const maxAge = 4 * 24 * 60 * 60;

const createToken = (id) => {
    return jwt.sign({ id }, 'jNTT1iPgSTGGnmah', { expiresIn: maxAge });
}

// #endregion

// #region Signup_Post
const signup_post = async (req, res) => {
    const { login, password, fname, surname } = req.body;

    try {
        const isAdult = true;
        const user = await User.create({ login, password, fname, surname, isAdult });

        const token = createToken(user._id);

        console.log('signup_post -> job done');
        res.status(200).json({
            user: user._id,
            token: token
        });
    } catch (err) {
        console.log(err);
    }
};
// #endregion

// #region Member_Reg_Post
const member_reg_post = async (req, res) => {
    var { parentID, login, password, fname, surname, age=null } = req.body;

    try {
        const isAdult = false;
        const user = await User.create({ login, password, fname, surname, isAdult });
        const member = {
            _id: user._id,
            fname: user.fname
        };

        const memberAdd = await User.findOneAndUpdate(
            { _id: parentID },
            { $addToSet: { familyMembers: member }},
            (err) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ operationStatus: 'Failed'});
                } else {
                    res.status(201).json({ operationStatus: 'Completed'});
                }
            }
        );

        console.log('member_reg_post -> job done');
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
    }
};
// #endregion

// #region Login_Post
const login_post = async (req, res) => {
    const { login, password } = req.body;

    try {
        const user = await User.login( login, password );

        const token = createToken(user._id);

        console.log('login_post -> job done');
        res.status(200).json({ token: token });
    } catch (err) {
        console.log(err)
    }
};
// #endregion

module.exports = {
    signup_post,
    member_reg_post,
    login_post
}
