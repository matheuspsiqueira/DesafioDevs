import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

import { MenuItem, Select, InputLabel, FormControl, Chip } from '@mui/material';

import './style/Cadastro.css';

const Cadastro = () => {
  const [nome, setNome] = useState('');
  const [unidades, setUnidades] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [statusAtivo, setStatusAtivo] = useState(true); // Estado para controlar o status
  const navigate = useNavigate();

  const handleChangeUnidades = (event) => {
    setUnidades(event.target.value);
  };

  const handleChangeServicos = (event) => {
    setServicos(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatusAtivo(event.target.checked); // Atualiza o estado com base no valor do checkbox
  };

  const options = [
    'Administrativo',
    'Captura antecipada - CCB',
    'Cível',
    'Consumidor',
    'Contratos',
  ];

  // Função para salvar no localStorage
  const saveToLocalStorage = (newItem) => {
    const existingData = JSON.parse(localStorage.getItem('mockData')) || [];
    existingData.push(newItem);
    localStorage.setItem('mockData', JSON.stringify(existingData));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (nome.trim() === '') {
      alert('Por favor, preencha o nome da área.');
      return;
    }

    const novoItem = {
      assunto: nome,
      dataCadastro: new Date().toLocaleDateString(),
      status: statusAtivo ? 'Ativo' : 'Inativo' // Define o status com base no checkbox
    };

    // Salva o novo item no localStorage
    saveToLocalStorage(novoItem);

    // Limpa o campo
    setNome('');

    // Redireciona para a página da tabela
    navigate('/');
  };

  // Condição para habilitar o botão de salvar
  const isFormValid = nome.trim() !== '' && unidades.length > 0 && servicos.length > 0;

  return (
    <div>
      <div className='titulo'>
        <h3 className='nova-area'>Nova Área</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='container-nome'>
          <label htmlFor="nome" className='text-nome'>Nome*</label>
          <input type="text" id="nome" placeholder="Digite o nome da área" value={nome} onChange={(e) => setNome(e.target.value)} required />
          <div className="status-toggle">
            <p className='text-status'>
              Status <FontAwesomeIcon icon={faInfoCircle} className='info-circle'/>
            </p>
            <input
              type="checkbox"
              id="status"
              checked={statusAtivo}
              onChange={handleStatusChange} // Atualiza o estado ao alterar o checkbox
            />
            <label htmlFor="status" className='switch'>
              <span className='slider'></span>
            </label>
            <label htmlFor="status" className='verificar'>{statusAtivo ? 'Ativo' : 'Inativo'}</label>
          </div>
        </div>

        <div className='container-descricao'>
          <label htmlFor="descricao" className='text-nome'>Descrição</label>
          <textarea id="descricao" placeholder="Adicione uma descrição para a área" className='descricao'></textarea>
        </div>

        <div className='container-unidades'>
        <label htmlFor="servicos" className='text-nome' id='text-servicos'>Unidades*</label>
          <FormControl fullWidth margin="normal">
            <InputLabel id="unidades-label"></InputLabel>
            <Select
              labelId="unidades-label"
              id="unidades"
              multiple
              value={unidades}
              onChange={handleChangeUnidades}
              renderValue={(selected) => (
                <div>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </div>
              )}
            >
              {options.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className='container-servicos'>
        <label htmlFor="servicos" className='text-nome'>Serviços*</label>
          <FormControl fullWidth margin="normal">
            <InputLabel id="servicos-label"></InputLabel>
            <Select
              labelId="servicos-label"
              id="servicos"
              multiple
              value={servicos}
              onChange={handleChangeServicos}
              renderValue={(selected) => (
                <div>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </div>
              )}
            >
              {options.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className='container-btn'>
          <div className="buttons">
            <Link id='link-cancelar' to={'/'}><button type="button" className="cancel">Cancelar</button></Link>
            <button 
              type="submit" 
              className={`save ${isFormValid ? 'active' : ''}`}
              disabled={!isFormValid}
            >
              Salvar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Cadastro;
