interface ICreateUserDTO {
  email: string;
  name: string;
  password: string;
  driverLicense: string;
  id?: string;
  avatar?: string;
}

export { ICreateUserDTO };
