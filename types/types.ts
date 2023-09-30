export interface UserTypes {
  id: number;
  name: string;
  email: string;
  city: string;
  address: { city: string; street: string; zipcode: string };
}
