import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../../componentes/sidebar/sidebar";
import { Topbar } from "../../componentes/sidebar/topbar/topbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import TarefaAPI from "../../services/tarefaAPI";
import style from "./novaTarefa.module.css";

export function NovaTarefa() {
    const navigate = useNavigate();

    const [titulo, setTitulo] = useState("");

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
            await TarefaAPI.criarAsync(titulo);
            alert("Tarefa criada com sucesso!");
            navigate("/tarefas");
        } catch (error) {
            alert("Erro ao criar a tarefa.");
        }
    };

    return (
        <Sidebar>
            <Topbar>
                <div className={style.pagina_conteudo}>
                    <h3>Nova Tarefa</h3>

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

                        <Button variant="primary" type="submit" disabled={!isFormValid()}>
                            Salvar
                        </Button>
                    </Form>
                </div>
            </Topbar>
        </Sidebar>
    );
}
