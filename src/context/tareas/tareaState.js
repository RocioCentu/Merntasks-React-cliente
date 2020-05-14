import React,{useReducer} from 'react';
import TareaContext from './tareaContext';
import TareaReducer from './tareaReducer';
import {TAREAS_PROYECTO,AGREGAR_TAREA,VALIDAR_TAREA,ELIMINAR_TAREA,LIMPIAR_TAREA,TAREA_ACTUAL,ACTUALIZAR_TAREA} from '../../types';
import clienteAxios from '../../config/axiosCliente';

const TareaState= props=>{
    const initialState = {
        tareasproyecto:[],
       
        errortarea: false,
        tareaseleccionada: null
    }

    // Crear dispatch y state
    const [state, dispatch] = useReducer(TareaReducer, initialState);

    //crear funciones

    // Obtener las tareas de un proyecto
    const obtenerTareas = async proyecto => {

       

        try {
            const resultado = await clienteAxios.get('/api/tareas', { params: { proyecto }});
            console.log(resultado);
            dispatch({
                type: TAREAS_PROYECTO,
                payload: resultado.data
            })
        } catch (error) {
            console.log(error);
        }
    }
    //AGREGAR TAREAS
    const agregarTarea=async(tarea)=>{
        try {
            const resultado = await clienteAxios.post('/api/tareas', tarea);
            console.log(resultado);
            dispatch({
                type: AGREGAR_TAREA,
                payload: tarea
            })
        } catch (error) {
            console.log(error);
        }
    }
    //ERROR
    const validarTarea=()=>{
        dispatch({
            type:VALIDAR_TAREA,
           
        })
    }

    //ELIMINAR TAREA
    const eliminarTarea=async(id,proyecto)=>{
      try {

       await clienteAxios.delete(`/api/tareas/${id}`,  { params: { proyecto }} );
        dispatch({
            type:ELIMINAR_TAREA,
            payload:id
        })
      } catch (error) {
          console.log(error);
      }
    }

 
     // ecxtraer una tarea para edicion
     const actualizarTarea=async tarea => {
       try {

           const resultado= await clienteAxios.put(`/api/tareas/${tarea._id}`,tarea);
   
           dispatch({

            type:ACTUALIZAR_TAREA,
            payload:resultado.data
        })
       } catch (error) {
           console.log(error);       }
    }
    
    // ecxtraer una tarea para edicion
    const guardarTareaActual= tarea => {
        dispatch({
            type:TAREA_ACTUAL,
            payload:tarea
        })
    }
// Elimina la tareaseleccionada
const limpiarTarea = () => {
    dispatch({
        type: LIMPIAR_TAREA
    })
}
   
return(
    <TareaContext.Provider
    value={{
       
        tareasproyecto:state.tareasproyecto,
        tareaseleccionada:state.tareaseleccionada,
        obtenerTareas,
        validarTarea,
        agregarTarea,
        eliminarTarea,
        limpiarTarea,
        guardarTareaActual,
        actualizarTarea,
        errortarea:state.errortarea
    }}
   >
        {props.children}
    </TareaContext.Provider>
)
}

export default TareaState;