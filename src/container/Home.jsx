import React from "react";
import ListFiles from "../components/ListFiles";
import SyllabusForm from "../components/SyllabusForm";
import Syllabus from "../components/Syllabus";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Home() {
  return (
    <>
      <Syllabus />
      <ToastContainer />
    </>
  );
}

export default Home;
