import React, {Component} from 'react';
import InputCustomizado from './InputCustomizado';
import BotaoCustomizado from './BotaoCustomizado';
import $ from 'jquery';

class FormularioAutor extends Component {
    constructor(){
        super();
        this.state = {lista: [], nome:'', email:'', senha:''};
        this.enviaForm = this.enviaForm.bind(this);
        this.setNome = this.setNome.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setSenha = this.setSenha.bind(this);
    }

    enviaForm(evento){
        evento.preventDefault();
        $.ajax({
            url: 'https://cdc-react.herokuapp.com/api/autores',
            contentType: 'application/json',
            dataType: 'json',
            type: 'post',
            data: JSON.stringify({nome: this.state.nome, email: this.state.email, senha: this.state.senha}),
            success: function(resposta) {
                this.props.callBackAtualizaListagem(resposta);
            }.bind(this),
            error: function(resposta) {
                console.log('erro');
            }
        })
    }

    setNome(evento){
        this.setState({nome:evento.target.value});
    }

    setEmail(evento){
        this.setState({email:evento.target.value});
    }

    setSenha(evento){
        this.setState({senha:evento.target.value});
    }


    render(){
        return (
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method='post'>
                    <InputCustomizado id='name' type='text' name='name' value={this.state.nome} label='Nome' onChange={this.setNome}/>
                    <InputCustomizado id='email' type='email' name='email' value={this.state.email} label='Email' onChange={this.setEmail}/>
                    <InputCustomizado id='senha' type='password' name='senha' value={this.state.senha} label='Senha' onChange={this.setSenha}/>
                    <BotaoCustomizado type='submit' label='Gravar'/>
                </form>
            </div>
        );
    }
}

class ListaAutor extends Component{    
    render(){
        return(
            <div>
                            <table className="pure-table">
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.lista.map(function(autor) {
                                        return(
                                            <tr key={autor.id}>
                                                <td>{autor.nome}</td>
                                                <td>{autor.email}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
        );
    }
}

export default class AutorBox extends Component{

    constructor(){
        super()
        this.state = {lista:[]};
        this.atualizaListagem = this.atualizaListagem.bind(this);
    }
    
    componentDidMount() {
        $.ajax({
            url: 'https://cdc-react.herokuapp.com/api/autores',
            dataType: 'json',
            success: function(resposta) {
                this.setState({lista:resposta});
            }.bind(this)
        })
    }

    atualizaListagem(novaLista){
        this.setState({lista:novaLista});
    }

    render(){
        return(
            <div>
                <FormularioAutor callBackAtualizaListagem={this.atualizaListagem}/>
                <ListaAutor lista={this.state.lista}/>
            </div>
        );
    }
}