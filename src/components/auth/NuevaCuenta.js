import React,{useState,useContext,useEffect} from 'react';
import {Link} from 'react-router-dom';
import authContext from '../../context/autenticacion/authContext';

import alertaContext from '../../context/alertas/alertaContext';
const NuevaCuenta = (props) => {

    //extraer valores del context

    const {alerta,mostrarAlerta} = useContext(alertaContext);
    const {registrarUsuario,mensaje,autenticado} = useContext(authContext);


    //en caso de que el usuario se haya autenticado o registrado osea un registro invalido 
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


    const [usuario,guardarUsuario]= useState({
        nombre:'',
        email:'',
     password:'',
     confirmar:''
    });
      
      const {nombre,email,password,confirmar}=usuario;

    const onChange= e=>{
         guardarUsuario({
           ...usuario,
         [e.target.name]:e.target.value
            });
    }
    const onSubmit=e=>{
        e.preventDefault();
     //validacion de campos vacios 

     if(nombre.trim()==='' || email.trim()==='' || password.trim()==='' || confirmar.trim()===''){

        mostrarAlerta('Todos los campos son obligatorios','alerta-error');
        return;
     }

     //pass minimo 6 caracteres y pass iguales
     if(password.length < 6){
        
        mostrarAlerta('El password debe ser minimo de 6 caracteres','alerta-error');
        return;

    }
       
    if(password !== confirmar){
        
        mostrarAlerta('Los password no son iguales','alerta-error');
        return;
        
    }

     //pasar al action
     registrarUsuario({
         nombre,
         email,
         password
     });
    }
    return ( 
    
    <div className="form-usuario">
        {alerta ?( <div className={`alerta ${alerta.categoria}`}> {alerta.msg}</div>) : null}
        <div className="contenedor-form sonbra-dark">
            <h1>Registrarse</h1>
         <form
         onSubmit={onSubmit}>
             <div className="campo-form">
               <label htmlFor="email">Nombre</label>
               <input 
               type="text"
               id="nombre"
               name="nombre"
               placeholder="Tu Nombre"
               value={nombre}
               onChange={onChange} />
           </div> 
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
               <label htmlFor="confirmar">Confirmar Password</label>
               <input 
               type="password"
               id="confirmar"
               name="confirmar"
               value={confirmar}
               placeholder="Repite tu Password"
               onChange={onChange} />
           </div> 
           <div className="campo-form">
              
               <input 
               type="submit"
               value="Registrarme"
               className="btn btn-primario btn-block"
               />
           </div> 
         </form>
         <Link to={'/nueva-cuenta'} className="enlace-cuenta">
           Volver a Iniciar Sesion</Link>
        </div> 
    </div> 
    
    );
}
 
export default NuevaCuenta;