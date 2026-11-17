import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Sidebar } from "../../componentes/sidebar/sidebar";
import { Topbar } from "../../componentes/sidebar/topbar/topbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import TarefaAPI from "../../services/tarefaAPI";
import style from "./editarTarefa.module.css";

export function EditarTarefa() {
    const location = useLocation();
    const navigate = useNavigate();

    const id = location.state;

    const [titulo, setTitulo] = useState("");
    const [concluida, setConcluida] = useState(false);

    const isFormValid = () => {
        return titulo.trim().length >= 3 && titulo.trim().length <= 100;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isFormValid()) {
            alert("O título deve ter entre 3 e 100 caracteres");
            return;
        }

        try {
            await TarefaAPI.atualizarAsync(id, titulo, concluida);
            alert("Tarefa atualizada com sucesso!");
            navigate("/tarefas");
        } catch (error) {
            alert("Erro ao salvar a tarefa.");
        }
    };

    useEffect(() => {
        if (!id) return;

        const buscarDadosTarefa = async () => {
            try {
                const tarefa = await TarefaAPI.obterAsync(id);
                setTitulo(tarefa.titulo);
                setConcluida(tarefa.concluida);
            } catch (error) {
                console.error("Erro ao buscar dados da tarefa: ", error);
            }
        };

        buscarDadosTarefa();
    }, [id]);

    if (!id) {
        return <p>Tarefa não encontrada. Volte à lista de Tarefas.</p>;
    }

    return (
        <Sidebar>
            <Topbar>
                <div className={style.pagina_conteudo}>
                    <h3>Editar Tarefa</h3>

                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formTitulo" className="mb-3">
                            <Form.Label>Título</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Digite o título da tarefa"
                                name="titulo"
                                value={titulo}
                                onChange={(e) => setTitulo(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formConcluida" className="mb-3">
                            <Form.Check
                                type="switch"
                                label="Concluída"
                                name="concluida"
                                checked={concluida}
                                onChange={(e) => setConcluida(e.target.checked)}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" disabled={!isFormValid()}>
                            Salvar
                        </Button>
                    </Form>
                </div>
            </Topbar>
        </Sidebar>
    );
}
