import React, { useState, createElement } from "react";
import { storage } from "../firebase/index";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

function Download(){
    const[file, setFile] = useState(null);
    const [url, setUrl] = useState(null);
    const [folder, setFolder] = useState(null);
    const [cursos, setCursos] = useState([]);
    const [ncursos, setNCursos] = useState(null);

    const handleSelectFolder = (e) => {
        let index = e.target.selectedIndex;
        console.log(e.target.options[index].text);
        setFolder(e.target.options[index].text);
        curso(e.target.options[index].text);
    };

    const handleSelectCurso = (a) => {
      let index = a.target.selectedIndex;
      console.log(a.target.options[index].text);
      setFile(a.target.options[index].text + ".txt");
    };

    const handleDownload = async () => {
      console.log("numero state",ncursos); 
      const dlReference = storage.ref(`${folder}/${file}`);
      const url1 = await dlReference.getDownloadURL();
      setUrl(url1);
      window.open(url1);
    };

    const curso = async (n) =>{
      let folder_ref=storage.ref(`${n}`);
      let cursos1=[];
      await folder_ref.listAll().then(async function(res){
        let ne=await res.items.length;
        console.log("numero",ne);
        res.items.forEach(async function(itemRef){
          var cad=itemRef.name;
          console.log(cad);
          cad=cad.slice(0,-4);
          setCursos(res.items);
        })
        await setNCursos(res.items.length);
        console.log("numero state",ncursos);  
      });     
    }

    const options = () =>{
      var items1 = cursos;
      for (let i = 0; i < ncursos; i++) {
        var cad1 = cursos[i].name;
        cad1=cad1.slice(0,-4);
        console.log("curso ",cad1);
        items1[i]=cad1             
        items1.Push(<option value={items1[i]}>{items1[i]}</option>);
        console.log(items1[i]);   
        //here I will be creating my options dynamically based on
        //what props are currently passed to the parent component
      }
      
  } 

    return (
        <Container>
          <Row>
            <Col xs={12} md={6}>
              <Form>
                <Form.Group>
                  <Form.Control as="select" onChange={handleSelectFolder}>
                    <option selected>Seleccione el año</option>
                    <option>Primero</option>
                    <option>Segundo</option>
                    <option>Tercero</option>
                    <option>Cuarto</option>
                    <option>Quinto</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group>
                  <Form.Control as="select" onChange={handleSelectCurso}>
                    <option selected>Seleccione el curso</option>
                    <option>{options}</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group>
                  <Button onClick={handleDownload}>Descargar Archivo</Button>
                </Form.Group>
                <br />
                {url}
                <br />
                <Link to="/FormTeacher">
                  <Button variant="outline-success">Registrar</Button>
                </Link>
              </Form>
            </Col>
          </Row>
        </Container>
      );
}
export default Download;