const express = require("express");
const route = express.Router()

const cp_reminder = require("./cp_reminder/cp_reminder");
const notice_board = require("./notice_board/notice_board_controller");
const video_controller = require("./resources/videos/video_controller");
const ebook_controller = require("./resources/ebooks/ebooks_controller");
const notes_controller = require("./resources/notes/notes_controller");

// Common Routes
route.get("/cp_reminder", cp_reminder.get_Contests);
route.get("/notice_board", notice_board.find);
route.get("/resources/videos", video_controller.find_video);
route.get("/resources/ebook/", ebook_controller.find_ebook);
route.get("/resources/notes/", notes_controller.find_notes);

// Protected Routes (Privating Routing to be done!)
route.post("/notice_board", notice_board.create);
route.patch("/notice_board/:id", notice_board.update);
route.delete("/notice_board/:id", notice_board.delete);

// PATHS for a Video resource
route.post("/resources/videos", video_controller.post_video);
route.patch("/resources/videos/:id", video_controller.update_video);
route.delete("/resources/videos/:id", video_controller.delete_video);

// PATHS for a Ebook resource
route.post("/resources/ebook/", ebook_controller.post_ebook);
route.patch("/resources/ebook/:id", ebook_controller.update_ebook);
route.delete("/resources/ebook/:id", ebook_controller.delete_ebook);

// PATHS for a Notes Resource
route.post("/resources/notes/", notes_controller.post_notes);
route.patch("/resources/notes/:id", notes_controller.update_notes);
route.delete("/resources/notes:id", notes_controller.delete_notes);

module.exports = route;