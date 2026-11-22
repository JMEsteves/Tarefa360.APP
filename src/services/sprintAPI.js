import { HTTPClient } from "./client";

const SprintAPI = {

    async obterAsync (sprintId)
    {
        try 
        {
            const response = await HTTPClient.get(`/Sprint/Obter/${sprintId}`);
            return response.data;
        }
        catch (error)
        {
            console.error("Erro ao obter sprint: ", error);
            throw error;
        }
    },


    async listarAsync ()
    {
        try 
        {
            const response = await HTTPClient.get(`/Sprint/Listar`);
            return response.data;
        }
        catch (error)
        {
            console.error("Erro ao listar sprints: ", error);
            throw error;
        }
    },


    async criarAsync (nome, projetoId, dataInicio, dataFinal, situacao)
    {
        try 
        {
            const sprintCriar = {
                Nome: nome,
                ProjetoId: projetoId,
                DataInicio: dataInicio,
                DataFinal: dataFinal,
                Situacao: situacao
            };
            const response = await HTTPClient.post(`/Sprint/Criar`, sprintCriar);
            return response.data;
        }
        catch (error)
        {
            console.error("Erro ao criar sprint: ", error);
            throw error;
        }
    },

    async atualizarAsync (sprintId, nome, projetoId, dataInicio, dataFinal, situacao)
    {
        try 
        {
            const sprintAtualizar = {
                Nome: nome,
                ProjetoId: projetoId,
                DataInicio: dataInicio,
                DataFinal: dataFinal,
                Situacao: situacao
            };
            const response = await HTTPClient.put(`/Sprint/Atualizar/${sprintId}`, sprintAtualizar);
            return response.data;
        }
        catch (error)
        {
            console.error("Erro ao atualizar sprint: ", error);
            throw error;
        }
    },

    async deletarAsync (sprintId)
    {
        try 
        {
            const response = await HTTPClient.delete(`/Sprint/Deletar/${sprintId}`);
            return response.data;
        }
        catch (error)
        {
            console.error("Erro ao deletar sprint: ", error);
            throw error;
        }
    },


};
export default SprintAPI;