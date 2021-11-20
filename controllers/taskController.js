const User = require('../models/User');

// #region Task_Add
const task_add = async (req, res) => {
    const { parentID, userID, title, avatar, priority, description, flashesAmount, time } = req.body;

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
        _type: 0,
        time: time
    }

    try {
        const taskAdd = await User.updateOne(
            { _id: userID},
            { $addToSet: { tasks: task}}
        );

        const parentFunds = await User.findById(parentID).select('funds -_id').lean();
        console.log(parentFunds);
        const parentData = await User.updateOne({_id: parentID}, { $set: { blockedFunds: flashesAmount, funds: parentFunds.funds - flashesAmount}});

        res.status(200).json(task);
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: "Task was not added"});
    }
}
// #endregion

// #region Task_Grab
const task_grab = async (req, res) => {
    const { userID, taskID } =  req.body;

    try {
        // const task = await User.aggregate([{"$match": {"tasks._id": taskID }}, {"$group": { _id: "$_id"}}]);
        // const task = await User.aggregate([{"$arraElemAt": ["$tasks", 0]}]);
        const task = await User.find({_id: userID}, { tasks: { $elemMatch: { _id: taskID }}, _id: 0});
        const person = await User.findById(userID).select(' fname -_id').lean();

        console.log(task);


        res.status(200).json({ task: task, user: person});
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: "task was not grabbed"});
    }
}
// #endregion

// #region Task_Complete
const task_complete = async (req, res) => {
    const { userID, taskID } = req.body;

    try {
        const task = await User.find({_id: userID}, { tasks: { $elemMatch: { _id: taskID }}, _id: 0});
        const taskData = task[0].tasks[0];
        taskData._type = 1;
        const pullTask = await User.updateOne({_id: userID}, { $pull: { tasks: { _id: taskID}}}, {upsert: false, multi: true});
        const upTask = await User.updateOne(
            { _id: userID},
            { $addToSet: { tasks: taskData}}
        );
        res.status(200).json(taskData);
    } catch (err) {
        console.log(err);
        res.status(400).json("task_complete operation failed");
    }
}
// #endregion

// #region Task_Approve

const task_approve = async (req, res) => {

}

// #endregion

// #region Task_Edit
const task_edit = async (req, res) => {
    const { userID, taskID, title, avatar, priority, description, flashesAmount, _type, time } = req.body;

    const taskInfo = {
        _id: taskID,
        title: title,
        avatar: avatar,
        priority: priority,
        description: description,
        flashesAmount: flashesAmount,
        _type: _type,
        time: time
    };

    try {
        const task = await User.updateOne({_id: userID}, { $pull: { tasks: { _id: taskID}}}, {upsert: false, multi: true});
        const taskAdd = await User.updateOne(
            { _id: userID},
            { $addToSet: { tasks: taskInfo}}
        );
        const found = await User.find({_id: userID}, { tasks: 1});
        console.log(task);
        res.status(200).json(found);
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: "task hasn't been deleted"});
    }
}
// #endregion

// #region Task_Delete
const task_delete = async (req, res) => {
    const { userID, taskID } = req.body;

    try {
        const task = await User.updateOne({_id: userID}, { $pull: { tasks: { _id: taskID}}}, {upsert: false, multi: true});
        const found = await User.find({_id: userID}, { tasks: 1});
        console.log(task);
        res.status(200).json(found);
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: "task hasn't been deleted"});
    }
}
// #endregion

module.exports = {
    task_add,
    task_grab,
    task_complete,
    task_edit,
    task_delete,
    task_approve
}