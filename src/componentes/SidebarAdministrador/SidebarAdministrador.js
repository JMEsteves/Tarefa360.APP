import style from "./SidebarAdministrador.module.css"
import Logo from"../../assets/itera360.png";
import { SideBarItem } from "../sidebarItem/sidebarItem";
import { MdArrowForward, MdGroup, MdOutlineWebAsset } from "react-icons/md"
import { MdOutlineGroups } from "react-icons/md";
import { MdOutlineHelpOutline, MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";

export function SidebarAdministrador({children}){
    return(
        <div>
            <div className={style.sidebar_conteudo}>
                <div className={style.sidebar_header}>
                    <img src={Logo} alt="Logo-Tarefa360" className={style.logo}/>

                    <div className={style.sidebar_usuario}>
                        <span className={style.sidebar_usuario_nome}>Jhon Doe</span>
                        <span className={style.sidebar_usuario_seta}><MdArrowForward/></span>
                    </div>

                    <hr className={style.linha}/>
                </div>

                <div className={style.sidebar_corpo}>
                    <SideBarItem texto="Usuários" link="/usuarios" logo={<MdGroup/>}/>
                </div>

                <div className={style.sidebar_corpo}>
                    <SideBarItem texto="Grupos de usuários" link="/projetos" logo={<MdOutlineGroups/>}/>
                </div>

                <div className={style.sidebar_corpo}>
                    <SideBarItem texto="Funcionalidades" link="/historias" logo={<MdOutlineWebAsset/>}/>
                </div>

                <div className={style.sidebar_rodape}>
                    <div className={style.rodape_ajuda}>
                        <MdOutlineHelpOutline/>
                        <span>Ajuda</span>
                    </div>

                    <Link to="/login" className={style.rodape_sair}>
                        <MdLogout/>
                        <span>Sair</span>
                    </Link>
                </div>
            </div>

            <div className={style.pagina_conteudo}>
                {children}
            </div>
        </div>
    )
}