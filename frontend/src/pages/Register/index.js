import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';
import '../../services/api';

import logoImg from '../../assets/logo.svg';
import api from '../../services/api';


export default function Register () {
    //Usando o useState para armazenar o valor dos input
    const [name, setName] = useState('');//como é um input de texto começamos com o useState vazio
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();//serve para gente fazer uma navegação através de um função JavaScript quando a gente não pode colocar o link do react-router-dom

    //função responsável por fazer o registro cliente
    async function handleRegister(e){
        e.preventDefault();//isso evita o comportameto padrão de uma página que na hora que faz um submit ele recarrega a página

        //Armazenando num objeto os dados que vieram dos inputs
        const data = {
            name,
            email,
            whatsapp,
            city,
            uf,
        };

        try{
        //o response vai armazenar a resposta desta chamada armazenando o id
        const response = await api.post('ongs', data);//enviando os dados para a o backend. o axios já tranforma os dados em JSON.

        alert(`Seu ID de acesso: ${response.data.id}`);

        history.push('/');//depois do alert estamos redirecionando o usuário para a rota ('/')
        } catch (err){
            alert('Erro no cadastro, tente novamente.');
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude a encontrarem os casos da sua ONG.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#e02041" />
                        Não tenho cadastro
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input
                        placeholder="Nome da ONG"
                        value={name}/*name é a variável que está no estado */
                        onChange={e => setName(e.target.value)}/*o (e.target.value) representa o valor do input, aí nós estamos usando a função setName para jogar esse valor para dentro da variáavel name. o 'e' é o parâmetro */
                    />
                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        />
                    <input
                        placeholder="Whatsapp"
                        value={whatsapp}                    
                        onChange={e => setWhatsapp(e.target.value)}
                    />
                    
                    <div className="input-group">
                        <input
                        placeholder="Cidade"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                    />
                        <input
                        placeholder="UF"
                        style={{ width: 80}}
                        value={uf}
                        onChange={e => setUf(e.target.value)}
                    />
                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}