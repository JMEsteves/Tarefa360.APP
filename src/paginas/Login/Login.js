import style from "./Login.module.css";
import { Link } from "react-router-dom";
import Logo  from "../../assets/LogoAzul.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UsuarioAPI from "../../services/usuarioAPI";

export function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro("");

        try{
            const usuario = await UsuarioAPI.loginAsync(email, senha);
            localStorage.setItem("usuario", JSON.stringify(usuario));
            navigate("/home");
        } catch (error) {
            setErro("E-mail ou senha inválidos! ");
        }
    };
    
    
    return (
        <div className={style.pagina_login}>
            <div className={style.caixa_login}>
                <h1 className={style.logo}>
                   <img src={Logo} alt="Tarefa360" className={style.logo} />
                </h1>

                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="e-mail"
                        className={style.campo}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="senha"
                        className={style.campo}
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                    {erro && <p className={style.erro}>{erro}</p>}

                    <button type="submit" className={style.botao_entrar}>
                        Entrar
                    </button>
                </form>

                <Link to="/esqueci-senha" className={style.link_senha}>
                    esqueci minha senha
                </Link>
            </div>
            
        </div>
    );
}