import React, { useState } from "react";
import styled from "styled-components";
import twitter from "../twitter.svg";
import api from "../services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Wrapper = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  margin: 20px 0 0;
  width: 100%;
  max-width: 280px;

  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const Input = styled.input`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  height: 44px;
  padding: 0 15px;
  font-size: 14px;
  margin-bottom: 5px;
`;
const Button = styled.button`
  margin: 10px 0 0;
  background: #4bb0ee;
  border-radius: 5px;
  height: 44px;
  border: 0;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  font-size: 16px;

  &::hover {
    background: #42a1db;
  }
  &:disabled {
    background: #6e95ad;
  }
`;

const ButtonInverted = styled(Button)`
  color: #4bb0ee;
  background: #fff;
  border: 1px solid #4bb0ee;
`;
function Login({ history }) {
  const [value, setValues] = useState({ password: "", name: "" });
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { data } = await api.post("/session", value);
      localStorage.setItem("@twitter", JSON.stringify(data));
      return history.push("/timeline");
    } catch (error) {
      toast.error(`${error.message}`);
      return setValues({ password: "", name: "" });
    }
  }

  return (
    <Wrapper>
      <img src={twitter} alt="Go Twitter" />
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={value.name}
          placeholder="Nome do usuário"
          onChange={e => setValues({ ...value, name: e.target.value })}
        />
        <Input
          type="password"
          placeholder="Senha"
          value={value.password}
          onChange={e => setValues({ ...value, password: e.target.value })}
        />
        <Button
          type="submit"
          disabled={value.password === "" || value.name === ""}
        >
          Entrar
        </Button>
        <ButtonInverted type="button" onClick={() => history.push("/signup")}>
          Cadastrar
        </ButtonInverted>
      </Form>
    </Wrapper>
  );
}

export default Login;
