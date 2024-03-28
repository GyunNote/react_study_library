import React, { useEffect, useState } from 'react';
import Box from '../Box/Box';
import Box2 from '../Box2/Box2';

function StateStudy(props) {
    const inputState = useState("");
    const inputState2 = useState("");

    console.log("rendering")

    useEffect(() => {
        console.log({a: inputState});
        return() => {
            console.log("a끝");
        }
    },[inputState[0]])

    useEffect(() => {
        console.log({b:inputState2});
        return() => {
            console.log("b끝");
        }
    },[inputState2[0]])

    console.log("rendering2")

    const handleTextOnChange = (e) => {
        if(e.target.name === "a"){
            const [im, setValue] = inputState;
            setValue(e.target.value);
        }
        if(e.target.name === "b"){
            const [im, setValue] = inputState2;
            setValue(e.target.value);
        }
    }
    return (
        <div>
            <input type="text" name='a' onChange={handleTextOnChange}/>
            <input type="text" name='b' onChange={handleTextOnChange}/>

            <Box value={inputState[0]}/>
            <Box2 value={inputState2[0]}/>
        </div>
    );
}

export default StateStudy;