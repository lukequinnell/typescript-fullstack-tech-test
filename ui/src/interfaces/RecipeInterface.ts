import { IngredientInterface } from './IngredientInterface';

export interface RecipeInterface {
    id: string;
    name: string;
    ingredients: IngredientInterface[];
    cooking_method: string;
}
