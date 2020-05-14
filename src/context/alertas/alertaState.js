import React, { useReducer } from 'react';
import alertaContext from './alertaContext';
import alertaReducer from './alertaReducer';
import { MOSTRAR_ALERTA,OCULTAR_ALERTA} from '../../types';



const AlertaState= props=>{

    const initialState={
        alerta:null
    }

    //dispath para ejecutar las acciones
    const [state,dispath]= useReducer(alertaReducer,initialState);


    const mostrarAlerta=(msg,categoria)=>{
        dispath({

            type:MOSTRAR_ALERTA,
            payload:{
                msg,
                categoria
            }
        });

        setTimeout(()=>{
            dispath({

                type:OCULTAR_ALERTA
               
            });
        },5000);
    }

  

   
    return(
        <alertaContext.Provider
        value={{
            alerta:state.alerta,
            mostrarAlerta
          
        }}
        >
  
            {props.children}
        </alertaContext.Provider>
  
    );
}

export default AlertaState;