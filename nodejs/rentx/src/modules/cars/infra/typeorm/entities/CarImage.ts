import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("carsImage")
class CarImage {
  @PrimaryColumn()
  id: string;

  @Column()
  carId: string;

  @Column()
  imageName: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { CarImage };
