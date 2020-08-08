export class AuthService {
    token; //token
    role; //rol
    tokenTeacher; //token de docente

    //contructor
    constructor() {
       //para cargar los tokens 
       this.loadToken();  //estudiante
       this.loadTokenTeacher(); //docente                      
    }
    
    //carga el token de estudiante
    loadToken(){
      if(localStorage.getItem('token')){ //si no esta vacio
        this.token = localStorage.getItem('token')   //carga                 
      } 
      if(localStorage.getItem('role')) { //si no esta vacio
          this.role = localStorage.getItem('role') //carga 
      }                 
    }

    //carga el token de docente
    loadTokenTeacher() {
        if(localStorage.getItem('tokenTeacher')){ //si no esta vacio
            this.tokenTeacher = localStorage.getItem('tokenTeacher')   //carga               
          } 
    }

    //guarda el token de estudiante
    saveToken(token, role){
       this.token = token;   
       this.role = role;              
       localStorage.setItem('token', token)                 
       localStorage.setItem('role', role)
    }  

    //guarda el token de docente
    saveTokenTeacher(tokenTeacher, role){
       this.tokenTeacher = tokenTeacher;  
       this.role = role;               
       localStorage.setItem('tokenTeacher', tokenTeacher);
       localStorage.setItem('role', role)                 
    }     
    
    //si esta registrado como docente
    isLoggedTeacher() {
        try {
            if(this.tokenTeacher){ //si tiene un token
                //para actualizar el token
                let payload = this.tokenTeacher.split('.')[1];  
                let payloadDecodificado = window.atob(payload);
                let payloadJSON = JSON.parse(payloadDecodificado);
                if(payloadJSON.exp > new Date()/1000){             
                    return true;        
                }else{
                    localStorage.removeItem('tokenTeacher');                                   
                    return false                 
                }        
            }else {
                return false
            }
        //error    
        } catch(err) {
            localStorage.removeItem('token');
            localStorage.removeItem('role')
            localStorage.removeItem('tokenTeacher');
            return false   
        }
    }

    //si esta registrado como estudiante
    isLogged(){
       try {
            if(this.token){ //si tiene un token
                //para actualizar el token
                let payload = this.token.split('.')[1];  
                let payloadDecodificado = window.atob(payload);
                let payloadJSON = JSON.parse(payloadDecodificado);
                if(payloadJSON.exp > new Date()/1000){
                   return true;        
                }else{                           
                   localStorage.removeItem('token');                 
                   return false                 
                }                                             
            } else {
                return false
            } 
        //error
       } catch(error){
          localStorage.removeItem('token');
          localStorage.removeItem('role')
          localStorage.removeItem('tokenTeacher');
          return false                 
       }                 
    }  

    logout(){
       localStorage.removeItem('role')
       localStorage.removeItem('token');
       this.token = null;                 
    }

    logoutTeacher(){
       localStorage.removeItem('role')
       localStorage.removeItem('tokenTeacher');
       this.tokenTeacher = null;                 
    }
}