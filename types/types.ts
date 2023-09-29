export interface UserTypes {
  id: string;
  name: string;
  email: string;
  city: string;
  address: { city: string; street: string; zipcode: string };
}
