import { Request, Response } from "express";

class CreateRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    return response.send();
  }
}

export { CreateRentalController };
