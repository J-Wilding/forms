const express = require("express");
const mongoose = require("mongoose");
// const async = require("async");
// const { response } = require("express");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const users = require("./users.js");

const app = express();

app.use(express.json());

app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(cookieParser());
app.use(
  cookieSession({
    name: "session",
    keys: ["secretValue"],
    cookie: {
      maxAge: 3 * 60 * 60 * 1000, // 3 hours
    },
  })
);


mongoose.connect("mongodb://localhost:27017/explore_info_sys", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// Task Schema
const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    dropDups: true,
  },
});

const Task = mongoose.model("Task", taskSchema);

const answersSchema = new mongoose.Schema({
  answer: String, // a list of answer objects with {id, string}
  number: Number,
});

// Question Schema
const questionSchema = new mongoose.Schema({
  task: {
    type: mongoose.Schema.ObjectId,
    ref: "Task",
  },
  question: String,
  answers: [answersSchema],
  correct: Number, // The id of the correct answer
});

const Question = mongoose.model("Question", questionSchema);

// each of these sub-tasks are associated with a meta-task
const dataEntrySchema = new mongoose.Schema({
  task: {
    type: mongoose.Schema.ObjectId,
    ref: "Task",
  },
  id: Number,
  first_name: String,
  last_name: String,
  job: String,
  department: String,
  address: String,
  city: String,
  state: String,
  zip_code: Number,
});

const imageSearchSchema = new mongoose.Schema({
  task: {
    type: mongoose.Schema.ObjectId,
    ref: "Task",
  },
  imageNumber: Number,
  imageOrientation: String,
  hasContraband: Boolean,
});

const surveyResponseSchema = new mongoose.Schema({
  question: {
    type: mongoose.Schema.ObjectId,
    ref: "Question",
  },
  participantResponse: answersSchema,
  // id of the selected answer? // or should I have an answer object?
});

const participantDataSchema = new mongoose.Schema({
  dataEntries: [dataEntrySchema],
  imageSearches: [imageSearchSchema],
  surveyAnswers: [surveyResponseSchema],
  participantId: String,
});

const ParticipantData = mongoose.model(
  "ParticipantData",
  participantDataSchema
);


app.use("/api/users", users.routes);
const User = users.model;
const validUser = users.valid;



// API endpoint for creating tasks
app.post("/api/tasks", validUser, async (req, res) => {
  const task = new Task({
    name: req.body.name,
  });
  console.log(task);
  try {
    await task.save();
    res.send(task);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Endpoint for getting all tasks
app.get("/api/tasks", async (req, res) => {
  try {
    let tasks = await Task.find();
    res.send(tasks);
  } catch (error) {
    console.lot(error);
    res.sendStatus(500);
  }
});

// Updating tasks
app.put("/api/tasks/:taskId", validUser, async (req, res) => {
  try {
    let task = await Task.findOne({ _id: req.params.taskId });
    if (!task) {
      res.sendStatus(404);
      return;
    }
    task.name = req.body.name;
    await task.save();
    res.status(200).send(task);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Deleting tasks
app.delete("/api/tasks/:taskId", validUser, async (req, res) => {
  try {
    console.log(req.params.taskId);
    let task = await Task.findOne({ _id: req.params.taskId });
    if (!task) {
      res.sendStatus(404);
      return;
    }
    await task.delete();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
});

// Endpoint for single task functions. Get task from taskName
app.get("/api/task/:name", async (req, res) => {
  let task = await Task.findOne({ name: req.params.name });
  if (!task) {
    res.sendStatus(404);
    return;
  }
  res.send(task);
});

// Add Question
app.post("/api/survey/:name/question", validUser, async (req, res) => {
  try {
    let task = await Task.findOne({ name: req.params.name });
    if (!task) {
      res.sendStatus(404);
      console.log(task);
      return;
    }
    let question = new Question({
      task: task,
      question: req.body.question,
      answers: req.body.answers,
    });
    await question.save();
    res.send(question);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// get questions
app.get("/api/survey/:name/questions", async (req, res) => {
  try {
    let task = await Task.findOne({ name: req.params.name });
    if (!task) {
      res.status(404).send("No survey with that id");
      return;
    }
    // console.log(task);
    let questions = await Question.find({ task: task });
    // console.log(questions);
    res.send(questions);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete("/api/survey/question/:questionId", validUser, async (req, res) => {
  try {
    console.log(req.params.questionId);
    let question = await Question.findOne({ _id: req.params.questionId });
    if (!question) {
      res.sendStatus(404);
      return;
    }
    await question.delete();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
});

app.delete(
  "/api/survey/question/:questionId/answer/:answerNum", validUser,
  async (req, res) => {
    try {
      console.log(req.params.questionId);
      let question = await Question.findOne({ _id: req.params.questionId });
      if (!question) {
        res.sendStatus(404);
        return;
      }
      question.answers = question.answers.filter(
        (answer) => answer.number != req.params.answerNum
      );
      await question.save();
      // await question.delete();
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
    }
  }
);

// edit question
app.put("/api/survey/question/:questionId", validUser, async (req, res) => {
  try {
    let question = await Question.findOne({ _id: req.params.questionId });
    if (!question) {
      res.sendStatus(404);
      return;
    }
    question.question = req.body.question;
    question.answers = req.body.answers;
    await question.save();
    res.status(200).send(question);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

/**********
 * participant data endpoints
 ***********/
app.post("/api/data", async (req, res) => {
  const participant = new ParticipantData({
    participantId: req.body.participantId,
  });
  try {
    await participant.save();
    res.send(participant);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get("/api/user/test", async (req, res) => {
  try {
    let user = await ParticipantData.findOne({ participantId: "test" });
    if (!user) {
      let test = new ParticipantData({
        participantId: "test",
      });
      await test.save();
      res.send(test);
    } else {
      res.send(user);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put("/api/:id/taskData", async (req, res) => {
  try {
    let user = await ParticipantData.findOne({ _id: req.params.id });
    if (!user) {
      res.sendStatus(404);
      return;
    }
    user.dataEntries = req.body.dataEntries;
    user.imageSearches = req.body.imageSearches;
    await user.save();
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put("/api/data/:participantId/surveyAnswers", async (req, res) => {
  if (req.params.participantId === "undefined") {
    res.status(404).send("participant undefined");
    console.log("I'm undefined");
    return;
  }
  try {
    let user = await ParticipantData.findOne({ _id: req.params.participantId });
    if (!user) {
      res.sendStatus(404);
      return;
    }
    user.surveyAnswers = user.surveyAnswers.concat(req.body.surveyAnswers);
    await user.save();
    res.status(200).send(user.surveyAnswers);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log("Server listening on port 3000!"));
