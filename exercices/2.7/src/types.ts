interface Movie {
    id: number;
    title: string;
    director: string;
    duration: number;
    image ? : string;
    description ? : string;
    budget ? : number;

  }

  export type {Movie}; 