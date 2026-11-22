import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './paginas/Home/home';
import { Usuarios } from './paginas/usuarios/usuarios';
import { NovoUsuario } from './paginas/novoUsuario/novoUsuario';
import { EditarUsuario } from './paginas/editarUsuario/editarUsuario';
import { Projetos } from './paginas/projetos/projetos';
import { Historias } from './paginas/Historias/Historias'
import { NovaHistoria } from './paginas/NovaHistoria/NovaHistoria';
import { EditarHistoria } from './paginas/EditarHistoria/EditarHistoria';
import { Tarefas } from './paginas/tarefas/tarefas';
import { NovaTarefa } from './paginas/novaTarefa/novaTarefa';
import { EditarTarefa } from './paginas/editarTarefa/editarTarefa';
import { Sprint } from './paginas/sprint/sprint';
import { NovaSprint } from "./paginas/novaSprint/novaSprint";
import { EditarSprint } from './paginas/editarSprint/editarSprint';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/usuarios' element={<Usuarios />} />
        <Route path='/usuario/novo' element={<NovoUsuario />} />
        <Route path='/usuario/editar' element={<EditarUsuario />} />
        <Route path='/projetos' element={<Projetos />} />
        <Route path='/historias' element={<Historias />} />
        <Route path='/historia/nova' element={<NovaHistoria />} />
        <Route path='/historia/editar' element={<EditarHistoria />} />
        <Route path='/tarefas' element={<Tarefas />} />
        <Route path='/tarefa/nova' element={<NovaTarefa />} />
        <Route path='/tarefa/editar' element={<EditarTarefa />} />
        <Route path='/sprints' element={<Sprint />} />
        <Route path='/sprint/nova' element={<NovaSprint />} />
        <Route path='/sprint/editar' element={<EditarSprint />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;