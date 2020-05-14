import React ,{Fragment, useContext,useEffect} from 'react';
import Proyecto from './Proyecto';
import proyectoContext from '../../context/proyectos/proyectoContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import alertaContext from '../../context/alertas/alertaContext';
const ListadoProyectos = () => {
    //estarer proyectos del state inicial
    const proyectosContext= useContext(proyectoContext);
    const {mensaje,proyectos,obtenerProyectos}= proyectosContext;
    const {alerta,mostrarAlerta}=useContext(alertaContext);
    //obtener proyectos cuando cargue el componentes
    // usamos funciones del proyectoStete que obtenemos del proyectoConstext
    useEffect(() => {
     if(mensaje){
         mostrarAlerta(mensaje.msg,mensaje.categoria);
     }
        obtenerProyectos();
          // eslint-disable-next-line
    }, [mensaje]);
//revisar si hay proyectos
    if(proyectos.length===0)return <p>No hay proyectos aun , comienza creando uno</p>;

    
    return ( 
        <Fragment>
           <ul className="listado-proyectos">
           {alerta ?( <div className={`alerta ${alerta.categoria}`}> {alerta.msg}</div>) : null}
            <TransitionGroup>
            {proyectos.map(proyecto=>(
               <CSSTransition
               key={proyecto._id}
             timeout={200}
             classNames="proyecto">
               <Proyecto
             
              proyecto={proyecto}
              />
               </CSSTransition>
           ))}
               
            </TransitionGroup>
          
        </ul>
        </Fragment>
       
     );
}
 
export default ListadoProyectos;