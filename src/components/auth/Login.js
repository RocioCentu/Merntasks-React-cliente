import React,{useState,useContext,useEffect} from 'react';
import {Link} from 'react-router-dom';
import authContext from '../../context/autenticacion/authContext';

import alertaContext from '../../context/alertas/alertaContext';

const Login = (props) => {

  
  const {alerta,mostrarAlerta} = useContext(alertaContext);
  const {iniciarSesion,mensaje,autenticado} = useContext(authContext);


    const [usuario,guardarUsuario]= useState({
        email:'',
     password:''
    });
      
      const {email,password}=usuario;


      //para ver las validaciones del backend
      useEffect(()=>{
        if(autenticado){
            //para acceder a proyectos despues de registrarse
            props.history.push('/proyectos');
            
        }
        if(mensaje){
            mostrarAlerta(mensaje.msg,mensaje.categoria);
        }
          // eslint-disable-next-line
    }, [mensaje,autenticado,props.history]);


    const onChange= e=>{
         guardarUsuario({
           ...usuario,
         [e.target.name]:e.target.value
            });
    }
    const onSubmit=e=>{
        e.preventDefault();
     //validacion
     if(email.trim()==='' || password.trim()===''){

      mostrarAlerta('Todos los campos son obligatorios','alerta-error');
      return;
   }
      //pasar al action
      iniciarSesion({
      
        email,
        password
    });
    }
    return ( 
    
    <div className="form-usuario">
      <?php header('Access-Control-Allow-Origin: *'); ?>
          {alerta ?( <div className={`alerta ${alerta.categoria}`}> {alerta.msg}</div>) : null}
        <div className="contenedor-form sonbra-dark">
            <h1>Iniciar Sesion</h1>
         <form
         onSubmit={onSubmit}>
           <div className="campo-form">
               <label htmlFor="email">Email</label>
               <input 
               type="email"
               id="email"
               name="email"
               placeholder="Tu Email"
               value={email}
               onChange={onChange} />
           </div> 
           <div className="campo-form">
               <label htmlFor="password">Password</label>
               <input 
               type="password"
               id="password"
               name="password"
               value={password}
               placeholder="Tu Password"
               onChange={onChange} />
           </div> 
           <div className="campo-form">
              
               <input 
               type="submit"
               value="Iniciar Sesion"
               className="btn btn-primario btn-block"
               />
           </div> 
         </form>
         <Link to={'/nueva-cuenta'} className="enlace-cuenta">
           Registrarse </Link>
        </div> 
    </div> 
    
    );
}
 
export default Login;