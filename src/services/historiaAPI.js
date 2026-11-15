import { HTTPClient } from "./client";

const HistoriaAPI = {
    async obterAsync(historiaId) {
        try {
            const response = await HTTPClient.get(`/api/Historia/${historiaId}`)
            return response.data;
        } catch (error) {
            console.error("Erro ao obter história: ", error);
            throw error;
        }
    },

    async listarHistoriasAsync() {
        try {
            const response = await HTTPClient.get(`/api/Historia`)
            return response.data;
        } catch (error) {
            console.error("Erro ao listar histórias: ", error);
            throw error;
        }
    },

    async criarHistoriaAsync(nome, projetoId, descricao){
        try {
            const historiaCriar = {
                nome: nome,
                projetoId: projetoId,
                descricao: descricao,
            };
            const response = await HTTPClient.post(`/api/Historia`, historiaCriar)
            return response.data;
        } catch (error) {
            console.error("Erro ao criar história: ", error);
            throw error;
        }
    },

    async editarHistoriaAsync(id, nome, projetoId, descricao){
        try {
            const historiaEditar = {
                nome: nome,
                projetoId: projetoId,
                descricao: descricao,
            };
            const response = await HTTPClient.put(`/api/Historia/${id}`, historiaEditar)
            return response.data
        } catch (error) {
            console.error("Erro ao editar história: ", error);
            throw error;
        }
    },

    async deletarHistoriaAsync(historiaId){
        try {
            const response = await HTTPClient.delete(`/api/Historia/${historiaId}`)
            return response.data
        } catch (error) {
            console.error("Erro ao deletar história: ", error);
            throw error;
        }
    },
}

export default HistoriaAPI;