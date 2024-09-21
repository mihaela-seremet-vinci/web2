interface Film {
  id: number;
  title: string;
  director: string;
  duration: number;
  budget?: number;  ////!! "propriété?"-propriété optionnelle
  description?: string; 
  imageUrl?: string; 
}
export type {Film};
