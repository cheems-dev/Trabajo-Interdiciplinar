import React,{Component} from 'react';
import firebase from 'firebase';
import FileUpload from '../components/FileUpload';
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";


class AppFileUpload extends Component{
   constructor(){
      super();
      this.state = {
         user: null,
      };
      this.handleAuth = this.handleAuth.bind(this);
      this.handleLogout = this.handleLogout.bind(this);
   }
   componentWillMount(){
      firebase.auth().onAuthStateChanged(user => {
         this.setState({ user });  
      });
   }
   handleAuth(){
      var provider= new firebase.auth.GoogleAuthProvider();
    
      firebase.auth().signInWithPopup(provider)
         .then(result => console.log(`${result.user.email} ha iniciado sesion`))
         .catch(error => console.log(`Error ${error.code}: ${error.message}`));
   }

   handleLogout(){
      firebase.auth().signOut()
         .then(result => console.log(`${result.user.email} ha salido`))
         .catch(error=> console.log(`Error ${error.code}: ${error.message}`));
   }

   renderLoginButton(){
      if(this.state.user){
         return(
         <div>
            <img width="100" src={this.state.user.photoURL} alt={this.state.user.displayName}/>
            <p>Hola {this.state.user.displayName}!</p>
            <Button onClick={this.handleLogout} className="App-btn">Salir</Button>
            <FileUpload />
         </div>
         );
      }else{
         return(
            <Button onClick={this.handleAuth} className="App-btn">Iniciar sesion con Google</Button>
         );
      }
   }
   render(){
      return(
         <Container className="App">
            <p className="App-Intro">
                  {this.renderLoginButton()}
            </p>
         </Container>
      );
   }
}

export default AppFileUpload;
