import { Sidebar } from "../../componentes/sidebar/sidebar";
import { useEffect, useState } from "react";
import { Topbar } from "../../componentes/sidebar/topbar/topbar";
import { useNavigate, useLocation } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import HistoriaAPI from "../../services/historiaAPI";
import style from "./EditarHistoria.module.css";
import ProjetoAPI from "../../services/projetoAPI"

export function EditarHistoria(){

    const location = useLocation();
    const navigate = useNavigate();

    const historia = location.state;

    const[nome, setNome] = useState(historia?.nome || "");
    const[descricao, setDescricao] = useState(historia?.descricao || "");
    const[projetoSelecionado, setProjetoSelecionado] = useState(historia?.projetoId || "");
    const[listaProjetos, setListaProjetos] = useState([]);

    useEffect(() => {
        const buscarProjeto = async () => {
            try {
                const projetos = await ProjetoAPI.listarAsync();
                setListaProjetos(projetos);
            } catch (error) {
                console.error("Erro ao buscar projetos: ", error);
            }
        };

        buscarProjeto();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nome.trim() || !descricao.trim() || !projetoSelecionado) {
            alert("Preencha todos os campos!");
            return
        }

        try {
            await HistoriaAPI.editarHistoriaAsync(
                historia.id,
                nome,
                projetoSelecionado,
                descricao
            );

            alert("História atualizada com sucesso!");

            navigate("/historias")
        } catch (error) {
            console.error("Erro ao atualizar história: ", error);

            alert(error.response?.data || "Erro ao atualizar história.");
        }
    };

    if (!historia) {
        return <p>História não encontrada. Volte à lista de Histórias.</p>
    }

    return (
        <Sidebar>
            <Topbar>
                <div className={style.pagina_conteudo}>

                    <h3>Editar História</h3>

                    <Form onSubmit={handleSubmit}>

                        <Form.Group
                            controlId="formNome"
                            className="mb-3">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Digite o nome da história"
                                    name="nome"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    required
                                />
                        </Form.Group>

                        <Form.Group
                            controlId="formProjeto"
                            className="mb-3">
                                <Form.Label>Projeto</Form.Label>
                                <Form.Select
                                    name="projeto"
                                    value={projetoSelecionado}
                                    onChange={(e) => setProjetoSelecionado(e.target.value)}
                                    required
                                >
                                    <option value="">
                                        Selecione...
                                    </option>

                                    {listaProjetos.map((projeto) => (
                                        <option key={projeto.id} value={projeto.id}
                                        >
                                            {projeto.nome}
                                        </option>
                                    ))}

                                </Form.Select>

                        </Form.Group>

                        <Form.Group
                            controlId="formDescricao"
                            className="mb-3">
                                <Form.Label>Descrição</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Digite a descrição da história"
                                    name="descricao"
                                    value={descricao}
                                    onChange={(e) => setDescricao(e.target.value)}
                                    required
                                />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Atualizar
                        </Button>

                    </Form>

                </div>
            </Topbar>
        </Sidebar>
    )

}