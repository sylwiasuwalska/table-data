import React, {useContext} from 'react';
import {stateContext} from "./Store";


function Company(props) {
    const state = useContext(stateContext);

    const company = state.filter(element=>(element.id)==props.match.params.id)
    console.log(company)
    return (
        <div>company</div>
    );
}

export default Company;