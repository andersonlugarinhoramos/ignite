interface ICreateUserDTO {
  email: string;
  name: string;
  password: string;
  driver_license: string;
  id?: string;
  avatar?: string;
}

export { ICreateUserDTO };
