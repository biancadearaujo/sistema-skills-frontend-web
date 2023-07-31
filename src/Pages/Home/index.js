import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import * as C from "./style";
import { Nav } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Table, Form, Modal} from "react-bootstrap";

class Home extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            id: 0,
            imagem:'',
            skill: '',
            level: '',
            descricao: '',
            skills : [],
            modalAberta: false
        }
    }
    
    componentDidMount(){
        this.buscarSkill();
    }

    componentWillUnmount(){

    }

    buscarSkill = () => {
        fetch("https://636ab9f7b10125b78fe354cc.mockapi.io/skill")
        .then(resposta => resposta.json())
        .then(dados => {
            this.setState({ skills : dados})
        })
    }

    deletarSkill = (id) =>{
        fetch("https://636ab9f7b10125b78fe354cc.mockapi.io/skill/"+id, {method: 'DELETE'})
        .then(resposta =>{
            if(resposta.ok){
                this.buscarSkill();
            }
        })
    }

    carregarDados = (id) =>{
        fetch("https://636ab9f7b10125b78fe354cc.mockapi.io/skill/"+id, {method: 'GET'})
        .then(resposta => resposta.json())
        .then(skill => {
            this.setState({ 
                id : skill.id,
                imagem : skill.imagem,
                skill : skill.skill,
                level : skill.level,
                descricao : skill.descricao,
            })
            this.abrirModal();
        })
    }

    cadastrarSkill = (skill) => {
        fetch("https://636ab9f7b10125b78fe354cc.mockapi.io/skill",{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(skill)
        })
        .then(resposta =>{
            if(resposta.ok){
                this.buscarSkill();
            }else{
                alert('Não foi possível adicionar a skill!')
            }
        })
    }

    atualizarSkill = (skill) => {
        fetch("https://636ab9f7b10125b78fe354cc.mockapi.io/skill/"+skill.id,{
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(skill)
        })
        .then(resposta =>{
            if(resposta.ok){
                this.buscarSkill();
            }else{
                alert('Não foi possível atualizar os dados da skill!')
            }
        })
    }

    renderTabela(){
        return(
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Imagem</th>
                        <th>Skill</th>
                        <th>Level</th>
                        <th>Descrição</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.skills.map((skill) =>
                        <tr>
                            <td>{skill.imagem}</td>
                            <td>{skill.skill}</td>
                            <td>{skill.level}</td>
                            <td>{skill.descricao}</td>
                            <td><Button variant="secondary" onClick={() => this.carregarDados(skill.id)}>Atualizar</Button> 
                                <Button variant="danger" onClick={() => this.deletarSkill(skill.id)}>Excluir</Button></td>
                        </tr>
                        )
                    }   
                </tbody>
            </Table>
        )
    }

    atualizaImagem = (e) => {
        this.setState(
            {
                imagem: e.target.value
            }
        )
    }

    atualizaSkill = (e) => {
        this.setState(
            {
                skill: e.target.value
            }
        )
    }

    atualizaLevel = (e) => {
        this.setState(
            {
                level: e.target.value
            }
        )
    }

    atualizaDescricao = (e) => {
        this.setState(
            {
                descricao: e.target.value
            }
        )
    }

    submit(){
        if(this.state.id == 0){
            const skill = {
                imagem: this.state.imagem,
                skill: this.state.skill,
                level: this.state.level,
                descricao: this.state.descricao
            }
    
            this.cadastrarSkill(skill);
        }else{
            const skill = {
                id: this.state.id,
                imagem: this.state.imagem,
                skill: this.state.skill,
                level: this.state.level,
                descricao: this.state.descricao
            }
    
            this.atualizaSkill(skill);
        }
        this.fecharModal();
    }

    reset = () =>{
        this.setState(
            {
                id: 0,
                imagem: '',
                skill: '',
                level: '',
                descricao: ''

            }
            )
            this.abrirModal();
    }

    fecharModal = () =>{
        this.setState(
            {
                modalAberta: false
            }
        )
    }

    abrirModal = () =>{
        this.setState(
            {
                modalAberta: true
            }
        )
    }

    render(){
        return(
            <div>
                <Nav variant="tabs">
                    <Nav.Link onClick = {() =>{this.abrirModal();this.reset();}}> Cadastrar Skill</Nav.Link>
                    <Nav.Link> Sair</Nav.Link>
                </Nav>
                <Modal show={this.state.modalAberta} onHide={this.fecharModal}>
                    <Modal.Header closeButton>
                    <Modal.Title>Dados Skill</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                <Form.Group className="mb-3">
                    <Form.Label>ID</Form.Label>
                    <Form.Control type="text" value={this.state.id} readOnly={true}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Imagem</Form.Label>
                    <Form.Control type="text" placeholder="Digite a url da imagem" value={this.state.imagem} onChange={this.atualizaImagem}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Skill</Form.Label>
                    <Form.Control type="text" placeholder="Digite o nome da skill" value={this.state.skill} onChange={this.atualizaSkill}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Level</Form.Label>
                    <Form.Control type="text" placeholder="Digite o level da skill" value={this.state.level} onChange={this.atualizaLevel}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control type="text" placeholder="Digite a descrição da skill" value={this.state.descricao} onChange={this.atualizaDescricao}/>
                </Form.Group>
                </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.fecharModal}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit" onClick={this.submit}>
                    Salvar
                    </Button>
                    </Modal.Footer>
                </Modal>
                
                {this.renderTabela()}
            </div>
        )
    }
}

export default Home;