export interface Employee {
  id?: string;
  name: string;
  role: string;
  image: string;
  subordinates?: Employee[];
}
