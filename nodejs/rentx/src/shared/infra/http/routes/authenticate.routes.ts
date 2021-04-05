import { Router } from "express";

import { AuthenticateUserController } from "@modules/accounts/useCase/autehnticateUser/AuthenticateUserContoller";

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();

authenticateRoutes.post("/sessions", authenticateUserController.handle);

export { authenticateRoutes };
