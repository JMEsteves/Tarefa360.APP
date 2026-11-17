import { HTTPClient } from "./client";

const TarefaAPI = {
    async obterAsync(tarefaId) {
        try {
            const response = await HTTPClient.get(`/api/Tarefa/${tarefaId}`);
            return response.data;
        } catch (error) {
            console.error("Erro ao obter tarefa: ", error);
            throw error;
        }
    },

    async listarAsync() {
        try {
            const response = await HTTPClient.get(`/api/Tarefa`);
            return response.data;
        } catch (error) {
            console.error("Erro ao listar tarefas: ", error);
            throw error;
        }
    },

    async criarAsync(titulo) {
        try {
            const tarefaCriar = {
                titulo: titulo,
            };
            const response = await HTTPClient.post(`/api/Tarefa`, tarefaCriar);
            return response.data;
        } catch (error) {
            console.error("Erro ao criar tarefa: ", error);
            throw error;
        }
    },

    async atualizarAsync(tarefaId, titulo, concluida) {
        try {
            const tarefaAtualizar = {
                titulo: titulo,
                concluida: concluida,
            };
            const response = await HTTPClient.put(`/api/Tarefa/${tarefaId}`, tarefaAtualizar);
            return response.data;
        } catch (error) {
            console.error("Erro ao atualizar tarefa: ", error);
            throw error;
        }
    },

    async deletarAsync(tarefaId) {
        try {
            const response = await HTTPClient.delete(`/api/Tarefa/${tarefaId}`);
            return response.data;
        } catch (error) {
            console.error("Erro ao deletar tarefa: ", error);
            throw error;
        }
    },
};

export default TarefaAPI;
