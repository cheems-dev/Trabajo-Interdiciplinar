import React, { Component } from "react"; //para react
import * as firebase from "firebase"; //para firebase 
import Swal from "sweetalert2"; //para las alertas
import "./css/file.css"; //estilos

// configuraciones de firebase | lestgo
var firebaseConfig = {
  apiKey: "AIzaSyBEFxsDNVUpXS10oDrmLlUQvz6819FwVao",
  authDomain: "interdiplinar.firebaseapp.com",
  databaseURL: "https://interdiplinar.firebaseio.com",
  projectId: "interdiplinar",
  storageBucket: "interdiplinar.appspot.com",
  messagingSenderId: "259613422518",
  appId: "1:259613422518:web:ad2dbd664d17e64801471",
  measurementId: "G-5QNN4Z884M",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

//referencia al storage de firebase
let storage = firebase.storage().ref();

//estructura para guardar el archivo
class file extends Component {
  constructor(props) {
    super(props);
    //para guardar el estado
    this.state = { 
      archivo: undefined,
      disabled: true,
      input: false,
      file: false,
    };
  }

  //para seleccionar el archivo
  updateImage = (e) => {
    this.setState({
      // ...this.state,
      archivo: e.target.files[0],
      disabled: false,
      file: true,
    });
  };

  //para subir el archivo
  subirImagen = () => {
    let nombreArchivo = this.state.archivo.name; //guarda el nombre del archivo
    let nombreFinal = +new Date() + "-" + nombreArchivo;//agrega la fecha al final del nombre

    let metadata = {//metadatos
      contentType: this.state.archivo.type,
    };

    if (this.state.file) {//si hay algun archivo seleccionado
      Swal.fire({//para las alertas
        //confirmar para subir el archivo
        title: "¿Estás seguro?",
        text: "NOTA!, una vez guardes los cambios, no podras modificarlos",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, cargar archivo",
      }).then((result) => {
        //sube al archivo
        if (result.value) {
          storage
            .child("react-firebase/" + nombreFinal)//agrega la ruta
            .put(this.state.archivo, metadata)//sube el archivo 
            .then((response) => { //comprobacion
              //para indicar que se subio correctamente
              Swal.fire({ //
                icon: "success",
                text: "Carga exitosa",
                timer: 2000,
                title: "Exito",
              });
              //para cambiar los estados
              this.setState({
                ...this.state,
                disabled: true,
                input: true,
                file: false,
              });
              return response.ref.getDownloadURL(); //retorna el link de descarga
            })
            .then((url) => {
              let objectPdf = {//el pdf consiste en el link y el nombre
                url,
                name: nombreFinal,
              };
              this.props.file(objectPdf);//se agrega la propiedad
            })
            .catch((err) => console.log(err, "err"));//si existe algun error lo muestra en consola
        }
      });
    }
  };

  //render
  render() {
    let classList = "";
    if (this.state.disabled) {//si esta desabilitado
      classList = ["btn-file disabled"];
    } else {
      classList = "btn-file";
    }
    return (
      //Para seleccionar el archivo
      <div className="file__container">
        <input
          type="file"
          disabled={this.state.input}
          onChange={this.updateImage}
        />
        {/* para subir el archivo */}  
        <button
          type="button"
          className="btn-file"
          onClick={this.subirImagen}
          disabled={this.state.disabled}
        >
          guardar cambios
        </button>
      </div>
    );
  }
}

export default file;
