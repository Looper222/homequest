const User = require('../models/User');

const task_add = async (req, res) => {
    const { userID, title, avatar, priority, description, flashesAmount, time } = req.body;
    // dodać operacje na czasie !!!!
    const uniqueID = () => {
        return Math.floor(Math.random() * Date.now());
    }

    const task = {
        _id: uniqueID(),
        title: title,
        avatar: avatar,
        priority: priority,
        description: description,
        flashesAmount: flashesAmount,
        time: time
    }

    try {
        const taskAdd = await User.updateOne(
            { _id: userID},
            { $addToSet: { tasks: task}}
        );

        res.status(200).json(task);
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: "Task was not added"});
    }
}

const task_grab = async (req, res) => {
    const { userID, taskID } =  req.body;

    try {
        const grabbedTask = User.findOne({ tasks: { _id: taskID }}).select('tasks');

        console.log(grabbedTask);
        res.status(200).json(grabbedTask);
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: "task was not grabbed"});
    }
}

const task_complete = async (req, res) => {

}

const task_edit = async (req, res) => {

}

const task_delete = async (req, res) => {

}

module.exports = {
    task_add,
    task_grab,
    task_complete,
    task_edit,
    task_delete
}