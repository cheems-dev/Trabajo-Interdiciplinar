import React from "react";
import FormFile from "../components/FormFile";
//import Login from "..//container/Login";
import AppFileUpload from '../components/AppFileUpload';
function Home() {
  return (
    <div>
      <AppFileUpload/>
      {/*<Login/>*/}
      <FormFile />
    </div>
  );
}

export default Home;
