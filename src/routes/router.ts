import { Router } from "express";
import { getContests } from "./cp_reminder/cp_reminder";
import { isAuthorized } from "./notice_board/Authorization";
import { createNotice, findNotice, updateNotice, deleteNotice } from "./notice_board/noticeBoardController";
import { findEbook, createEbook, updateEbook, deleteEbook } from "./resources/ebooks/ebooksController";
import { findNotes, createNotes, updateNotes, deleteNotes } from "./resources/notes/notesController";
import { createVideo, findVideo, updateVideo, deleteVideo } from "./resources/videos/videoController";
const route: Router = Router();

// Common Routes
route.get("/cp_reminder", getContests);
route.get("/notice_board",isAuthorized ,findNotice);
route.get("/resources/videos", findVideo);
route.get("/resources/ebooks", findEbook);
route.get("/resources/notes", findNotes);

// Protected Routes (Privating Routing to be done!)
route.post("/notice_board", isAuthorized, createNotice);
route.patch("/notice_board/:id", isAuthorized, updateNotice);
route.delete("/notice_board/:id", isAuthorized ,deleteNotice);

// PATHS for a Video resource
route.post("/resources/videos", createVideo);
route.patch("/resources/videos/:id", updateVideo);
route.delete("/resources/videos/:id", deleteVideo);

// PATHS for an Ebook resource
route.post("/resources/ebooks", createEbook);
route.patch("/resources/ebooks/:id", updateEbook);
route.delete("/resources/ebooks/:id", deleteEbook);

// PATHS for a Notes Resource
route.post("/resources/notes", createNotes);
route.patch("/resources/notes/:id", updateNotes);
route.delete("/resources/notes:id", deleteNotes);

export = route;