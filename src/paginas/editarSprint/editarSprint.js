import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Sidebar } from "../../componentes/sidebar/sidebar";
import { Topbar } from "../../componentes/sidebar/topbar/topbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import SprintAPI from "../../services/sprintAPI";
import style from "../novaSprint/novaSprint.module.css";
import ProjetoAPI from "../../services/projetoAPI";

// Converte a data da API para o formato do input date (aaaa-mm-dd).
const formatarDataInput = (data) => (data ? String(data).slice(0, 10) : "");

// Permite letras (com acento), números e espaços.
const nomeSemEspeciais = /^[A-Za-zÀ-ÿ0-9 ]+$/;

export function EditarSprint() {
    const location = useLocation();
    const navigate = useNavigate();

    const sprint = location.state;

    const [nome, setNome] = useState(sprint?.nome || "");
    const [projeto, setProjeto] = useState(String(sprint?.projetoId || ""));
    const [projetos, setProjetos] = useState([]);
    const [dataInicio, setDataInicio] = useState(formatarDataInput(sprint?.dataInicio));
    const [dataFinal, setDataFinal] = useState(formatarDataInput(sprint?.dataFinal));
    const [situacao, setSituacao] = useState(sprint?.situacao || "");


    useEffect(() => {
    const buscarProjetos = async () => {
        try {
            const lista = await ProjetoAPI.listarAsync();
            setProjetos(lista);
        } catch (error) {
            console.error("Erro ao buscar projetos:", error);
        }};

        buscarProjetos();
        }, []);

    const isFormValid = () => {
        const nomeValido =
            nome.trim().length >= 3 &&
            nome.trim().length <= 100 &&
            nomeSemEspeciais.test(nome.trim());
        const projetoValido = projeto !== "";
        const datasValidas = dataInicio !== "" && dataFinal !== "" && dataFinal > dataInicio;
        const situacaoValida = situacao !== "";

        return nomeValido && projetoValido && datasValidas && situacaoValida;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isFormValid()) {
            alert("Preencha todos os campos corretamente");
            return;
        }

        try {
            await SprintAPI.atualizarAsync(
                sprint.id,
                nome.trim(),
                Number(projeto),
                dataInicio,
                dataFinal,
                situacao
            );
            alert("Sprint atualizada com sucesso!");
            navigate("/sprints");
        } catch (error) {
            console.error("Erro ao atualizar sprint:", error);
            alert(error.response?.data || "Erro ao atualizar a sprint.");
        }
    };

    if (!sprint) {
        return <p>Sprint não encontrada. Volte à lista de sprints.</p>;
    }

    return (
        <Sidebar>
            <Topbar>
                <div className={style.pagina_conteudo}>
                    <h3>Editar Sprint</h3>

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
                        <Form.Select
                            name="projeto"
                            value={projeto}
                            onChange={(e) => setProjeto(e.target.value)}
                            required
                        >
                            <option value="">Selecione o projeto</option>
                            {projetos.map((p) => (
                                <option key={p.id} value={p.id}>
                                    {p.nome}
                                </option>
                            ))}
                        </Form.Select>
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