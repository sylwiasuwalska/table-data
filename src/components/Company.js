import React, {useContext, useEffect} from "react";
import { stateContext } from "./Store";
import { useHistory } from "react-router-dom";

function Company(props) {
  useEffect(() => props.setActualLocation(props.history.location.pathname), []);
  // const state = useContext(stateContext);
  //
  // const company = state.slice().filter(element=>(element.id)==props.match.params.id).map(()=> {
  //
  // })
  //console.log(company)
  let history = useHistory();

  return (
    <>
      <div>company</div>
      <button onClick={() => history.goBack()}>take me back</button>
    </>
  );
}

export default Company;
