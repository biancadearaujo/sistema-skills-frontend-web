import React, { useState, useEffect } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./style";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Form from 'react-bootstrap/Form';

const Signin = () => {
    const {signin} = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    useEffect(() => {
      const rememberMeValue = localStorage.getItem('rememberMe');
      setRememberMe(rememberMeValue === 'true');
    }, []);

    const handleLogin = () => {
        if (!email | !senha) {
          setError("Preencha todos os campos");
          return;
        }

        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        } else {
          localStorage.removeItem('rememberMe');
        }
    
        const res = signin(email, senha);
    
        if (res) {
          setError(res);
          return;
        }
    
        navigate("/home");
      };

    return (
        <C.Container>
            <C.Label>SISTEMA DE SKILL</C.Label>
            <C.Content>
                <Input
                type="email"
                placeholder="Digite seu login"
                value={email}
                onChange={(e) => [setEmail(e.target.value), setError("")]}
                />
                <Input
                type="password"
                placeholder="Digite sua Senha"
                value={senha}
                onChange={(e) => [setSenha(e.target.value), setError("")]}
                />
                <div>
                  <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label>Gravar senha</label>
              </div>
                <C.labelError>{error}</C.labelError>
                <Button Text="Entrar" onClick={handleLogin} />
                <C.LabelSignup>
                Não tem uma conta?
                <C.Strong>
                    <Link to="/signup">&nbsp;Registre-se</Link>
                </C.Strong>
                </C.LabelSignup>
                
                
            </C.Content>
        </C.Container>
    );
};

export default Signin;