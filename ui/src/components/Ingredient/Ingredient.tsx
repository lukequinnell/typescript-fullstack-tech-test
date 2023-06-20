import {RecipeInterface} from "../../interfaces/RecipeInterface";
import {IngredientInterface} from "../../interfaces/IngredientInterface";
import {Button} from "../Button/Button";
import {Input} from "../Input/Input";
import React from "react";

export class Ingredient extends React.Component<{ form: RecipeInterface, setForm: Function }> {
    render() {
        return this.props.form.ingredients?.map((ingredient: IngredientInterface, key: number) => {
            return (
                <div key={key}>
                    <div>
                        <label>Ingredient name</label>
                        <Input onChange={(input: string) => {
                            const ingredients = [...this.props.form.ingredients];

                            ingredients[key].name = input;

                            this.props.setForm(this.props.form);
                        }}/>
                    </div>
                    <div>
                        <label>Measurement</label>
                        <Input onChange={(input: string) => {
                            const ingredients = [...this.props.form.ingredients];

                            ingredients[key].measurement = input;

                            this.props.setForm(this.props.form);
                        }}/>
                    </div>
                    <div>
                        {
                            this.props.form.ingredients?.length - 1 === key
                                ? <Button label="Add ingredient" onClick={() => {
                                    this.props.form.ingredients.push({
                                        name: '',
                                        measurement: '',
                                    });

                                    this.props.setForm(this.props.form);
                                }}/>
                                : null
                        }
                    </div>
                </div>
            )
        })
    }
}
