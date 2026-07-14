import { Router } from "express";
import { createGame, deleteGame, getAllGames, getEditPage, getGameById, patchGame } from "../controllers/gamesController";
import { getGameLibrary, getLibraryEditPage, insertLibrary, deleteLibraryEntry } from "../controllers/libraryController";
import { getAllUsers, createUser, getUserCreatePage } from "../controllers/usersController";
import { asyncHandler } from "../utils/asyncHandler";
import { validationHandler, gameValidators, idValidator } from "../middleware/validation";
const router = Router();

//main pages
// homepage
router.get("/", asyncHandler(getAllGames))

//game library
router.get("/gameLibrary", asyncHandler(getGameLibrary))
// ----------------------

router.get("/users", getAllUsers)
router.get("/userCreatePage", getUserCreatePage)
router.post('/users', createUser)


// specific games
router.get("/:id", idValidator(),
validationHandler,
asyncHandler(getGameById))
//game edit page
router.get("/:id/editPage", asyncHandler(getEditPage))


//Library /:id pages
// edit page that heads to library after insertLibrary goes through
router.get("/:id/libraryEdit", asyncHandler(getLibraryEditPage))
//
router.post("/:id/gameLibrary", asyncHandler(insertLibrary))
router.delete("/gameLibrary/:id", asyncHandler(deleteLibraryEntry))
// ------------------
// ---- users

// -------
router.post("/", gameValidators, 
    validationHandler, 
    asyncHandler(createGame))



router.patch("/:id", idValidator(), 
    gameValidators, validationHandler, 
    asyncHandler(patchGame))

router.delete("/:id", 
    idValidator(), 
    validationHandler, 
    asyncHandler(deleteGame))
export default router;
