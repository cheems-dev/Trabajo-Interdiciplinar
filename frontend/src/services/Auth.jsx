export class AuthService {
    token;
    role;
    tokenTeacher;

    constructor() {
       this.loadToken();  
       this.loadTokenTeacher();                      
    }
    
    loadToken(){
      if(localStorage.getItem('token')){
        this.token = localStorage.getItem('token')                  
      } 
      if(localStorage.getItem('role')) {
          this.role = localStorage.getItem('role')
      }                 
    }

    loadTokenTeacher() {
        if(localStorage.getItem('tokenTeacher')){
            this.tokenTeacher = localStorage.getItem('tokenTeacher')                  
          } 
    }

    saveToken(token, role){
       this.token = token;   
       this.role = role;              
       localStorage.setItem('token', token)                 
       localStorage.setItem('role', role)
    }  

    saveTokenTeacher(tokenTeacher, role){
       this.tokenTeacher = tokenTeacher;  
       this.role = role;               
       localStorage.setItem('tokenTeacher', tokenTeacher);
       localStorage.setItem('role', role)                 
    }     
    
    isLoggedTeacher() {
        try {
            if(this.tokenTeacher){
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
        } catch(err) {
            localStorage.removeItem('token');
            localStorage.removeItem('role')
            localStorage.removeItem('tokenTeacher');
            return false   
        }
    }

    isLogged(){
       try {
            if(this.token){
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