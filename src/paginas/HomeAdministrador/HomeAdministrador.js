import { SidebarAdministrador } from "../../componentes/SidebarAdministrador/SidebarAdministrador";
import { TopbarAdministrador } from "../../componentes/TopbarAdministrador/TopbarAdministrador";
import style from "./HomeAdministrador.module.css";

export function HomeAdministrador() {
    return(
        <div className={style.conteudo}>
            <SidebarAdministrador>
                <TopbarAdministrador>
                    <div className={style.pagina_conteudo}>

                    </div>
                </TopbarAdministrador>
            </SidebarAdministrador>
        </div>
    )
}