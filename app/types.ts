export interface Character {
    id: string;
    name: string;
    status: string;
    species: string;
    gender: string;
    origin: {
      name: string;
    };
  }
  
  export interface CharactersData {
    characters: {
      results: Character[];
      info: {
        next: number | null;
      };
    };
  }
  