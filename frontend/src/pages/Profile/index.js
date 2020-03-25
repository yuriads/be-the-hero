import React, { useState, useEffect } from 'react';//o useEffect serve pra gente disparar uma função em algum determinadado momento do componente. Ex: assim que ele é mostrado em tela
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi'

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';


export default function Profile() {
    //começamos o estado com um array vazio pq ele esta buscando um conjundo de informações, então precisamos iniciar o array com um valor válido
    const [incidents, setIncidents] = useState([]);


    const history = useHistory();

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');//pegando o nome da ong que foi armazenado no localStorage no Logon/index.js e jogando dentro da constante ongName.

    //o primeiro parâmetro é qual função eu quero que seja executada (seira a de carregar os casos). O segundo parâmetro diz quando essa função será executada. o array[] é de dependência, ou seja, toda vez que as informações que estiverem dentro do array mudarem ele vai excutar a função de novo.
    //qnd o array está vazio ele dispara a função uma única vez.
    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {//pegando a resposta e depois temos que gravar em um estado
            setIncidents(response.data)//isso é o nosso array de vetores que vem lá de casos(incidents)
        })
    }, [ongId]);//caso o id da ong mude ela vai recalcular a página. pra não esquecer o que foi dito la em cima... esse aqui é o segundo parâmetro, onde toda vez que ele muda dispara a função.

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });

            setIncidents(incidents.filter(incident => incident.id !== id));
        } catch (err) {
            alert('Erro ao deletar caso, tente novamente.');
        }
    }

    function handleLogout(){
        localStorage.clear();//limpando o localStorage para fazer o logout
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                    <span>Bem vinda, {ongName}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#e02041"/>
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                        <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}