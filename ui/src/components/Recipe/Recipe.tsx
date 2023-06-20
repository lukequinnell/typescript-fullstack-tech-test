import "./recipe.css";
import {RecipeInterface} from "../../interfaces/RecipeInterface";

export const Recipe = (recipe: RecipeInterface) => {
    return (
        <div>
            <div>
                <ul>
                    <li>{recipe?.name}</li>
                    {recipe?.ingredients?.map((ingredient, index) => <li key={index}>{ingredient?.name} ({ingredient?.measurement})</li>)}
                    <li>Cooking method - {recipe?.cooking_method}</li>
                </ul>
            </div>
        </div>
    );
}
