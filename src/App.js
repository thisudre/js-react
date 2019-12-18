import React, { Component } from 'react';
import './css/pure-min.css';
import './css/side-menu.css';
import AutorBox from './componentes/Autor.js'
import MenuCustomizado from './componentes/MenuCustomizado';


class App extends Component {
    render() {
        return (
            <div id="layout">

                <a href="#menu" id="menuLink" className="menu-link">
                    <span></span>
                </a>

                <MenuCustomizado/>

                <div id="main">
                    <div className="header">
                        <h1>Cadastro de Autores</h1>
                    </div>
                    <div className="content" id="content">
                        <AutorBox/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;