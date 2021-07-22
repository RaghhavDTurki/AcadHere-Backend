import { Router } from "express";
import { adminLogin, isAdmin } from "../admin/Login";
import { getContests } from "./cp_reminder/cp_reminder";
import { isAuthorized } from "./notice_board/Authorization";
import { createNotice, findNotice, updateNotice, deleteNotice } from "./notice_board/noticeBoardController";
import { validateToken } from "./OAuth/ValidateToken";
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
route.post("/admin/notice_board", isAdmin, createNotice);
route.patch("/admin/notice_board/:id", isAdmin, updateNotice);
route.delete("/admin/notice_board/:id", isAdmin ,deleteNotice);

// PATHS for a Video resource
route.post("/admin/resources/videos", isAdmin,createVideo);
route.patch("/admin/resources/videos/:id", isAdmin,updateVideo);
route.delete("/admin/resources/videos/:id", isAdmin,deleteVideo);

// PATHS for an Ebook resource
route.post("/admin/resources/ebooks", isAdmin,createEbook);
route.patch("/admin/resources/ebooks/:id", isAdmin,updateEbook);
route.delete("/admin/resources/ebooks/:id", isAdmin,deleteEbook);

// PATHS for a Notes Resource
route.post("/admin/resources/notes", isAdmin,createNotes);
route.patch("/admin/resources/notes/:id", isAdmin,updateNotes);
route.delete("/admin/resources/notes:id", isAdmin,deleteNotes);

// Path for verification of user id_token
route.post("/OAuth", validateToken);

// Admin Routes
route.post("/admin/login", adminLogin)
export = route;