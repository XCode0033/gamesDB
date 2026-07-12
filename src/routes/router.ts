import { Router } from "express";
import { createGame, deleteGame, getAllGames, getEditPage, getGameById, getGameLibrary, getLibraryEditPage, insertLibrary, patchGame } from "../controllers/gamesController";
import { asyncHandler } from "../utils/asyncHandler";
import { validationHandler, gameValidators, idValidator } from "../middleware/validation";
const router = Router();
router.get("/", asyncHandler(getAllGames))

// game library
// general library
router.get("/gameLibrary", asyncHandler(getGameLibrary))

router.get("/:id", idValidator(),
validationHandler,
asyncHandler(getGameById))

router.get("/:id/editPage", asyncHandler(getEditPage))

// edit page that heads to library after insertLibrary goes through
router.get("/:id/libraryEdit", asyncHandler(getLibraryEditPage))
router.post("/:id/gameLibrary", asyncHandler(insertLibrary))



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
