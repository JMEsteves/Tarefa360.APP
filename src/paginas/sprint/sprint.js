import { Link } from "react-router-dom";
import { Sidebar } from "../../componentes/sidebar/sidebar";
import { Topbar } from "../../componentes/sidebar/topbar/topbar";
import style from "./sprint.module.css";
import { Table, Modal, Button, Form } from "react-bootstrap";
import { MdEdit, MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import SprintAPI from "../../services/sprintAPI";

// Converte "2026-11-01T00:00:00" para "01/11/2026".
const formatarData = (data) => {
  if (!data) return "";
  const [ano, mes, dia] = String(data).slice(0, 10).split("-");
  return `${dia}/${mes}/${ano}`;
};

export function Sprint(){

    const [sprints, setSprints] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [sprintSelecionada, setSprintSelecionada] = useState(null);
    const [busca, setBusca] = useState("");
    const [projetoFiltro, setProjetoFiltro] = useState("");

  // Carrega sprints cadastradas.
  async function carregarSprints() {
    try {
      const listarSprints = await SprintAPI.listarAsync();
      setSprints(listarSprints);
    } catch (error) {
      console.error("Erro ao carregar sprints:", error);
      setSprints([]);
    }
  }

  // Abre o modal e seleciona a sprint.
  function handleClickDeletar(sprint) {
    setSprintSelecionada(sprint);
    setMostrarModal(true);
  }

  // Realiza a exclusão de sprint.
  async function handleDeletar() {
    if (!sprintSelecionada) {
      return;
    }

    try {
      await SprintAPI.deletarAsync(sprintSelecionada.id);

      // Atualiza a lista sem recarregar a página.
      setSprints((listaAtual) =>
        listaAtual.filter((sprint) => sprint.id !== sprintSelecionada.id),
      );

      setMostrarModal(false);
      setSprintSelecionada(null);
    } catch (error) {
      console.error("Erro ao excluir sprint:", error);
      alert("Não foi possível excluir a sprint.");
    }
  }

  // Fecha o modal.
  function handleFecharModal() {
    setMostrarModal(false);
    setSprintSelecionada(null);
  }

  // Carrega os sprints ao abrir a página.
  useEffect(() => {
    carregarSprints();
  }, []);

  // Lista de projetos únicos para o dropdown.
  const projetos = [...new Set(sprints.map((s) => s.projetoNome).filter(Boolean))];

  // Aplica a busca por nome e o filtro por projeto.
  const sprintsFiltradas = sprints.filter((s) => {
    const bateBusca = (s.nome || "").toLowerCase().includes(busca.toLowerCase());
    const bateProjeto = projetoFiltro === "" || s.projetoNome === projetoFiltro;
    return bateBusca && bateProjeto;
  });
    return(
        <div className={style.conteudo}>
            <Sidebar>
                <Topbar>
                <div className={style.pagina_conteudo}>
                    <div className={style.pagina_cabecalho}>
                    <h3>Sprints</h3>
                    <Link to='/sprint/nova' className={style.botao_novo}>+ Novo</Link>
                    </div>
                   <div className={style.tabela}>
                    <div className="d-flex flex-wrap gap-2 mb-3">
                    <Form.Control
                        type="text"
                        placeholder="Pesquisar sprint"
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                        style={{ maxWidth: 300 }}
                    />
                    <Form.Select
                        value={projetoFiltro}
                        onChange={(e) => setProjetoFiltro(e.target.value)}
                        style={{ maxWidth: 250 }}
                    >
                        <option value="">Todos os projetos</option>
                        {projetos.map((p) => (
                        <option key={p} value={p}>{p}</option>
                        ))}
                    </Form.Select>
                    </div>
                        <Table responsive>
                            <thead className={style.tabela_cabecalho}>
                                <tr>
                                        <th>Nome</th>
                                        <th>Projeto</th>
                                        <th>Início</th>
                                        <th>Fim</th>
                                        <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody className={style.tabela_corpo}>
                                              {sprintsFiltradas.length > 0 ? (
                                                sprintsFiltradas.map((sprint) => (
                                                  <tr key={sprint.id}>
                                                    <td>{sprint.nome}</td>
                                                    <td>{sprint.projetoNome}</td>
                                                    <td>{formatarData(sprint.dataInicio)}</td>
                                                    <td>{formatarData(sprint.dataFinal)}</td>

                                                    <td>
                                                      <Link
                                                        to="/sprint/editar"
                                                        state={sprint}
                                                        className={style.botao_editar}
                                                      >
                                                        <MdEdit />
                                                      </Link>
                            
                                                      <button
                                                        type="button"
                                                        onClick={() => handleClickDeletar(sprint)}
                                                        className={style.botao_deletar}
                                                      >
                                                        <MdDelete />
                                                      </button>
                                                    </td>
                                                  </tr>
                                                ))
                                              ) : (
                                                <tr>
                                                  <td colSpan="5">Nenhuma sprint encontrada.</td>
                                                </tr>
                                              )}
                                            </tbody>
              </Table>
            </div>
          </div>
        </Topbar>
      </Sidebar>

      {/* Modal de confirmação de exclusão. */}
      <Modal show={mostrarModal} onHide={handleFecharModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar exclusão</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Tem certeza que deseja excluir a sprint{" "}
          <strong>{sprintSelecionada?.nome}</strong>?
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleFecharModal}>
            Cancelar
          </Button>

          <Button variant="danger" onClick={handleDeletar}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    );
}