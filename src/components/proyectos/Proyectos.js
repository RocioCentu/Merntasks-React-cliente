import React ,{useContext,useEffect}from 'react';
import Sidebar from '../layout/Sidebar';
import Barra from '../layout/Barra';
import FormTarea from '../tareas/FormTarea';
import ListadoTareas from '../tareas/ListadoTareas';
import authContext from '../../context/autenticacion/authContext';

const Proyectos = () => {
  //extraer informacion de autenticacion
  const {usuarioAutenticado}=useContext(authContext);

 // cada vez q se actualice la pagian busca la infomacion del usurio autenticado 
  useEffect(() => {
      usuarioAutenticado();
  }, []);
    return ( 
    <div className="contenedor-app">
        <Sidebar>
        </Sidebar>
        <div className="seccion-principal">
        <Barra
              />
          <main>
             <FormTarea/>
            <div className="contenedor-tareas">
              <ListadoTareas
              />
            </div>
          </main>
        </div>
    </div> );
}
 
export default Proyectos;