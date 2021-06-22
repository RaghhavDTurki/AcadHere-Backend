const express = require("express");
const route = express.Router()

const cp_reminder = require("./cp_reminder/cp_reminder");
const notice_board = require("./notice_board/notice_board");

route.get("/cp_reminder", cp_reminder.get_Contests);
route.get("/notice_board", notice_board.find);

// Protected Routes (To be Done)
route.post("/notice_board", notice_board.create);
route.patch("/notice_board/:id", notice_board.update);
route.delete("/notice_board/:id", notice_board.delete);

module.exports = route;