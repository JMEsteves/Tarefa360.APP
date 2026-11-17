import { Sidebar } from "../../componentes/sidebar/sidebar";
import { Topbar } from "../../componentes/sidebar/topbar/topbar";
import style from "./tarefas.module.css";
import { useEffect, useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import TarefaAPI from "../../services/tarefaAPI";

export function Tarefas() {

    const [tarefas, setTarefas] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [tarefaSelecionada, setTarefaSelecionada] = useState(null);

    const handleClickDeletar = (tarefa) => {
        setTarefaSelecionada(tarefa);
        setMostrarModal(true);
    };

    const handleDeletar = async () => {
        try {
            await TarefaAPI.deletarAsync(tarefaSelecionada.id);
            setTarefas(tarefas.filter(t => t.id !== tarefaSelecionada.id));
        } catch (error) {
            console.error("Erro ao tentar deletar a tarefa: ", error);
        } finally {
            handleFecharModal();
        }
    };

    const handleFecharModal = () => {
        setMostrarModal(false);
        setTarefaSelecionada(null);
    };

    useEffect(() => {
        const buscarTarefas = async () => {
            try {
                const lista = await TarefaAPI.listarAsync();
                setTarefas(lista);
            } catch (error) {
                console.error("Erro ao buscar tarefas: ", error);
            }
        };

        buscarTarefas();
    }, []);

    return (
        <Sidebar>
            <Topbar>
                <div className={style.pagina_conteudo}>
                    <div className={style.pagina_cabecalho}>
                        <h3>Tarefas</h3>
                        <Link to="/tarefa/nova" className={style.botao_novo}> + Novo </Link>
                    </div>
                    <div className={style.tabela}>
                        <Table responsive>
                            <thead className={style.tabela_cabecalho}>
                                <tr>
                                    <th>Título</th>
                                    <th>Status</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody className={style.tabela_corpo}>
                                {tarefas.length > 0 ? (
                                    tarefas.map((tarefa) => (
                                        <tr key={tarefa.id}>
                                            <td>{tarefa.titulo}</td>
                                            <td>{tarefa.concluida ? "Concluída" : "Pendente"}</td>
                                            <td>
                                                <Link to="/tarefa/editar" state={tarefa.id} className={style.botao_editar}>
                                                    <MdEdit />
                                                </Link>
                                                <button onClick={() => handleClickDeletar(tarefa)} className={style.botao_deletar}>
                                                    <MdDelete />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3">Nenhuma tarefa encontrada.</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </div>

                    <Modal show={mostrarModal} onHide={handleFecharModal} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Confirmar</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            Tem certeza que deseja deletar a tarefa <strong>{tarefaSelecionada?.titulo}</strong>?
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleFecharModal}>
                                Cancelar
                            </Button>
                            <Button variant="danger" onClick={handleDeletar}>
                                Deletar
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </Topbar>
        </Sidebar>
    );
}
