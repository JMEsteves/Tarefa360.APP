import style from "./TopbarAdministrador.module.css";
import {Link} from "react-router-dom";
import {MdLogout, MdOutlineGroup} from "react-icons/md"

export function TopbarAdministrador({children}){
    return(
        <div className={style.conteudo}>
            <div className={style.topbar_conteudo}>
                <div className={style.topbar_trilha}>
                    <MdOutlineGroup className={style.trilha_icone}/>
                    <span className={style.trilha_secao}>Usuários</span>
                    <span className={style.trilha_separador}>/</span>
                    <span className={style.trilha_pagina}>Visão geral</span>
                </div>

                <Link to="/login" className={style.botao_deslogar}><MdLogout/></Link>
            </div>

            <div className={style.pagina_conteudo}>
                {children}
            </div>
        </div>
    )
}