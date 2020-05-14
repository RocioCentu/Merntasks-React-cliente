import React, { useState,useReducer } from 'react';
import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import {PROYECTO_ERROR, ELIMINAR_PROYECTO,PROYECTO_ACTUAL,VALIDAR_FORMULARIO,AGREGAR_PROYECTO,FORMULARIO_PROYECTO,OBTENER_PROYECTOS} from '../../types';
import clienteAxios from '../../config/axiosCliente';


const ProyectoState= props=>{

    const initialState={
        proyectos:[],
       formulario:false,
       errorformulario:false,
       proyecto:null,
       mensaje:null
    }

    //dispath para ejecutar las acciones
    const [state,dispath]= useReducer(proyectoReducer,initialState);

    //SERIE DE ACCIONES PARA EL CRUD
    const mostrarFormulario=()=>{
        //funciones que madans a llamar el reducer
    dispath({
        //lo que se va a evaluar en el reducer
        type:FORMULARIO_PROYECTO
    })
    }
    //obtener los proyectos

    const obtenerProyectos=async()=>{
     try {

        const respuesta = await clienteAxios.get('/api/proyectos');

        dispath({

            type:OBTENER_PROYECTOS,
            payload:respuesta.data.proyectos
        })
     }  catch (error) {
         
        const alerta={
            msg:'hubo un error',
            categoria:'alerta-error'
        }
          dispath({
               type:PROYECTO_ERROR,
               payload:alerta
          })
      }
    }
    //agregar nuevo proyecto
    const agregarProyecto=async(proyecto)=>{
      

       try {

        const respuesta = await clienteAxios.post('/api/proyectos', proyecto);
   
            //agregar el pryecto al staste con un dispath
        dispath({

            type:AGREGAR_PROYECTO,
            payload:respuesta.data
        })
       } catch (error) {
         
         const alerta={
             msg:'hubo un error',
             categoria:'alerta-error'
         }
           dispath({
                type:PROYECTO_ERROR,
                payload:alerta
           })
       }
    }

    //VALIDAR FORMULARIO
    const validarFormulario=()=>{
      
      
        dispath({

            type:VALIDAR_FORMULARIO
            
        })
    }

      //seleeciona proyecto que el usuario dio click
      const proyectoActual=async(proyectoid)=>{
      
     //   const respuesta = await clienteAxios.post('/api/proyectos', proyecto);
   
        dispath({

            type:PROYECTO_ACTUAL,
            payload:proyectoid
            
        })
    }

    //ELIMINAR PROYECTO
    const eliminarProyecto=async(proyectoid)=>{
       try {
           await clienteAxios.delete(`/api/proyectos/${proyectoid}`);
           
        dispath({

            type:ELIMINAR_PROYECTO,
            payload:proyectoid
            
        }) 
          // eslint-disable-next-line
       }  catch (error) {
         
        const alerta={
            msg:'hubo un error',
            categoria:'alerta-error'
        }
          dispath({
               type:PROYECTO_ERROR,
               payload:alerta
          })
          
      }
    }
    return(
        <proyectoContext.Provider
        value={{
            proyectos:state.proyectos,
            formulario: state.formulario,
            errorformulario:state.errorformulario,
            proyecto:state.proyecto,
            mensaje:state.mensaje,
            agregarProyecto,
            mostrarFormulario,
            obtenerProyectos,
            validarFormulario,
            proyectoActual,
            eliminarProyecto
        }}
        >
  
            {props.children}
        </proyectoContext.Provider>
  
    );
}

export default ProyectoState;