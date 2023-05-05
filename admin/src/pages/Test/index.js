import React from 'react';
import { EntryProvider } from "../../contexts/EntryContext";
import TestComponent from '../../contexts/TestComponent'

const Test = () => {


    return (<>
        <EntryProvider>
            <TestComponent></TestComponent>

        </EntryProvider>
    </>)
}


export default Test;