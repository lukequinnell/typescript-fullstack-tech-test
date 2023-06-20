import "./createRecipe.css";
import {Input} from "../../components/Input/Input";
import {Button} from "../../components/Button/Button";
import {RecipeInterface} from "../../interfaces/RecipeInterface";
import {useHistory} from "react-router";
import {useState} from "react";
import {Ingredient} from "../../components/Ingredient/Ingredient";

export const CreateRecipe = () => {
    const location = useHistory();

    const [form, setForm] = useState<RecipeInterface>({
        id: '',
        name: '',
        ingredients: [{
            name: '',
            measurement: '',
        }],
        cooking_method: '',
    });

    const createRecipe = async () => {
        await fetch(`http://localhost:3080/recipes`, {
            method: 'POST',
            body: JSON.stringify(form),
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        });

        location.push('/');
    }

    return (
        <div>
            <h1>Create a recipe</h1>

            <div>
                <label>Recipe name</label>
                <Input onChange={(input: string) => {
                    form.name = input;
                    setForm({...form})
                }}/>
            </div>

            <hr/>

            <Ingredient form={form} setForm={(recipe: RecipeInterface) => setForm({...form})}/>

            <hr/>

            <div>
                <label>Cooking method</label>
                <Input onChange={(input: string) => {
                    form.cooking_method = input;
                    setForm({...form})
                }}/>
            </div>

            <hr/>

            <div>
                <Button label="Create" onClick={() => {
                    createRecipe()
                }}/>
            </div>
        </div>
    );
}
