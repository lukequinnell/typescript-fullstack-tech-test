import "./input.css";
import {InputInterface} from "../../interfaces/InputInterface";

export const Input = (input: InputInterface) => {
    const handler = (event: React.ChangeEvent<HTMLInputElement>) => {
        input.onChange(event.currentTarget.value)
    };

    return (
        <div>
            <input type="text" onChange={handler}/>
        </div>
    )
}
