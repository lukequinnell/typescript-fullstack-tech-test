import "./button.css";
import {ButtonInterface} from "../../interfaces/ButtonInterface";

export const Button = (button: ButtonInterface) => {
    return (
        <div onClick={() => button.onClick()}>
            {
                button.label
            }
        </div>
    );
}
