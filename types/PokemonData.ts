export type PokemonData = {
  name: string;
  id?: number;
  img?: string;
  shinyImg?: string;
  type1?: string;
  type2?: string;
  isFavorite?: boolean; // ⭐ Indicates if marked as favorite
  stats?: {
    hp?: number;
    attack?: number;
    defense?: number;
    specialAttack?: number;
    specialDefense?: number;
    speed?: number;
  };
};
