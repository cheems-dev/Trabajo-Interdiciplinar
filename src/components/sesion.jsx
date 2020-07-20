import React, { Component } from "react";
import FormTeacher from "../container/FormTeacher";
import {useUser} from "reactfire";

function sesion(){
    const user=useUser();
    return(
        <div className="sesion">
            {user&& <p> Usuario: </p>}
            <FormTeacher />
        </div>  
    )
}