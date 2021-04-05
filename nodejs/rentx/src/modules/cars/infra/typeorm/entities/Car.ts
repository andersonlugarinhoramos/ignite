import { v4 as uuidV4 } from "uuid";

class Car {
  id: string;

  name: string;

  dailyRat: number;

  available: boolean;

  licensePlate: string;

  fineAmount: number;

  brand: string;

  categoryId: string;

  createdAt: Date;

  updatedAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
      this.available = true;
    }
  }
}

export { Car };
