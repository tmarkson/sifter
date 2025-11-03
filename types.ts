
export interface Product {
  lastModified: string;
  title: string;
  mfg: string;
  mfgPn: string;
  link: string;
  country: string;
  formFactor: string;
  price: number | null;
  features: string[];
  imageUrl: string | null;
}
