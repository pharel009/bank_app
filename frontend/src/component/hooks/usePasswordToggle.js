import { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";

export const usePasswordToggle = () => {
    const [visible, setVisible] = useState(false);

    //Toggle the visibility when called
    const toggleVisibility = () => setVisible(prevState => !prevState); 
       
    //set the input type based on the visibility
    const inputType = visible ? "text" : "password";

    //chose the icon based on the visibility state
    const Icon =  visible ? FaEyeSlash : FaEye 

    return [inputType, Icon, toggleVisibility]
}
 