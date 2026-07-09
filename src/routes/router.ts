import { Router } from "express";
import { createGame, deleteGame, getAllGames, getEditPage, getGameById, patchGame } from "../controllers/gamesController";
import { asyncHandler } from "../utils/asyncHandler";
import { validationHandler, gameValidators, idValidator } from "../middleware/validation";
const router = Router();
router.get("/", asyncHandler(getAllGames))

router.get("/:id", idValidator(), 
validationHandler, 
asyncHandler(getGameById))

router.get("/:id/editPage", asyncHandler(getEditPage))

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
