import {
  Column,
  CreateDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

class Rental {
  @PrimaryColumn()
  id: string;

  @Column()
  carId: string;

  @Column()
  userId: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  expectReturnDate: Date;

  @Column()
  total: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Rental };
