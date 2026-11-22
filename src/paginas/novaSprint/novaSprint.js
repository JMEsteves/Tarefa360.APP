import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../../componentes/sidebar/sidebar";
import { Topbar } from "../../componentes/sidebar/topbar/topbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import SprintAPI from "../../services/sprintAPI";
import style from "./novaSprint.module.css";

// Permite letras (com acento), números e espaços.
const nomeSemEspeciais = /^[A-Za-zÀ-ÿ0-9 ]+$/;

export function NovaSprint() {
    const navigate = useNavigate();

    const [nome, setNome] = useState("");
    const [projeto, setProjeto] = useState("");
    const [dataInicio, setDataInicio] = useState("");
    const [dataFinal, setDataFinal] = useState("");
    const [situacao, setSituacao] = useState("");

    
    const isFormValid = () => {
        const nomeValido =
            nome.trim().length >= 3 &&
            nome.trim().length <= 100 &&
            nomeSemEspeciais.test(nome.trim());
        const projetoValido = projeto.trim().length > 0;
        const datasValidas = dataInicio !== "" && dataFinal !== "" && dataFinal > dataInicio;
        const situacaoValida = situacao !== "";

        return nomeValido && projetoValido && datasValidas && situacaoValida;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            nome.trim().length < 3 ||
            nome.trim().length > 100 ||
            !nomeSemEspeciais.test(nome.trim())
        ) {
            alert("O nome deve ter entre 3 e 100 caracteres e não pode conter caracteres especiais");
            return;
        }

        if (dataFinal <= dataInicio) {
            alert("A data final deve ser posterior à data de início");
            return;
        }
        if (!isFormValid()) {
            alert("Preencha todos os campos corretamente");
            return;
        }

        try {
            await SprintAPI.criarAsync(nome.trim(), projeto.trim(), dataInicio, dataFinal, situacao);
            alert("Sprint criada com sucesso!");
            navigate("/sprints");
        } catch (error) {
            console.error("Erro ao criar sprint:", error);
            alert(error.response?.data || "Erro ao criar a sprint.");
        }
    };

    return (
        <Sidebar>
            <Topbar>
                <div className={style.pagina_conteudo}>
                    <h3>Nova Sprint</h3>

                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formNome" className="mb-3">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Digite o nome da sprint"
                                name="nome"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formProjeto" className="mb-3">
                            <Form.Label>Projeto</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Digite o projeto"
                                name="projeto"
                                value={projeto}
                                onChange={(e) => setProjeto(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formInicio" className="mb-3">
                            <Form.Label>Início</Form.Label>
                            <Form.Control
                                type="date"
                                name="dataInicio"
                                value={dataInicio}
                                onChange={(e) => setDataInicio(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formFinal" className="mb-3">
                            <Form.Label>Fim</Form.Label>
                            <Form.Control
                                type="date"
                                name="dataFinal"
                                value={dataFinal}
                                min={dataInicio}
                                onChange={(e) => setDataFinal(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formSituacao" className="mb-3">
                            <Form.Label>Situação</Form.Label>
                            <Form.Select
                                name="situacao"
                                value={situacao}
                                onChange={(e) => setSituacao(e.target.value)}
                                required
                            >
                                <option value="">Selecione...</option>
                                <option value="Planejada">Planejada</option>
                                <option value="EmAndamento">Em andamento</option>
                                <option value="Concluida">Concluída</option>
                                <option value="Paralisada">Paralisada</option>
                                <option value="Cancelada">Cancelada</option>
                            </Form.Select>
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