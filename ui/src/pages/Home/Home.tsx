import "./home.css";
import useSWR, {mutate} from "swr";
import {Input} from "../../components/Input/Input";
import {Recipe} from "../../components/Recipe/Recipe";
import {RecipeInterface} from "../../interfaces/RecipeInterface";
import {Link} from 'react-router-dom';

export const Home = () => {
    const {data} = useSWR<RecipeInterface[]>(
        'http://localhost:3080/recipes',
    );

    const performSearch = async (term: string) => {
        const results = await fetch(`http://localhost:3080/recipes?search=${term}`);

        mutate(`http://localhost:3080/recipes`, await results.json(), false);
    }

    if (!data) return null;

    return (
        <div>
            <h1>Recipe App</h1>

            <hr/>

            <div>
                <Link to="/create-recipe">Create recipe</Link>
            </div>

            <hr/>

            <h2>Search</h2>
            <div>
                <Input onChange={(value: string) => {
                    performSearch(value)
                }}/>
            </div>

            <hr/>

            <h2>Results</h2>
            <div>
                {
                    data && data.length > 0
                        ? data.map((recipe) => {
                            return <Recipe
                                key={recipe.id}
                                id={recipe.id}
                                name={recipe.name}
                                ingredients={recipe.ingredients}
                                cooking_method={recipe.cooking_method}
                            />
                        })
                        : <p>Sorry, there are no results.</p>
                }
            </div>
        </div>
    );
};

