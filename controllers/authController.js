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

// #region TokenInit
const maxAge = 4 * 24 * 60 * 60;

const createToken = (id) => {
    return jwt.sign({ id }, 'jNTT1iPgSTGGnmah', { expiresIn: maxAge });
}

// #endregion

// #region Signup_Post
const signup_post = async (req, res) => {
    const { login, password, fname, surname } = req.body;
    const funds = 10000;
    const blockedFunds = 0;

    try {
        const isAdult = true;
        const user = await User.create({ login, password, fname, surname, isAdult,  funds, blockedFunds});

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
    const funds = 0;
    const blockedFunds = 0;

    try {
        const isAdult = false;
        const user = await User.create({ login, password, fname, surname, isAdult, funds, blockedFunds });
        const member = await {
            _id: user._id.toString(),
            fname: user.fname,
            parent: false
        };
        const memberReg = await User.updateOne({ _id: parentID }, { $addToSet: { members: member }});
        const parent = await User.findById(parentID).select(' fname ').lean();
        const parentInfo = {
            _id: parent._id,
            fname: parent.fname,
            parent: true
        }
        const child = await User.updateOne({_id: member._id}, { $addToSet: { members: parentInfo}});
        console.log(member);
        res.status(200).json(member);
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: "member reg error"});
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
        res.status(200).json({ id: user._id , token: token });
    } catch (err) {
        console.log(err)
    }
};
// #endregion

// #region User_Grab

const user_grab = async (req, res) => {
    const { userID } = req.body;

    try {
        const user = await User.findById(userID).select('-password').lean();

        // console.log(user);
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: "user not found"});
    }
}
// nie działa

// #endregion

// #region Funds_Set

const funds_set = async (req, res) => {
    const { userID, funds } = req.body;

    try {
        const fundsInfo = await User.updateOne({_id: userID}, {$set: { "funds": funds }});
        const wallet = await User.findById(userID).select(' funds ').lean();

        console.log(fundsInfo);
        console.log(wallet);
        res.status(200).json({ userID: wallet._id, funds: wallet.funds});
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: "funds haven't been set"});
    }
}

// #endregion

module.exports = {
    signup_post,
    member_reg_post,
    login_post,
    user_grab,
    funds_set
}
