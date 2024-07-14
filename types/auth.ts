export interface Icredentials {
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
}

export interface IcredentialsInvalid {
  email: boolean;
  confirmEmail: boolean;
  password: boolean;
  confirmPassword: boolean;
}
