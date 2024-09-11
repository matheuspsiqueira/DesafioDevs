import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import { Table, TableHead, TableBody, TableRow, TableCell, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { faPlus, faSort, faSortAlphaUp, faChevronLeft, faChevronRight, faStepForward, faStepBackward } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { mockData } from '../data/mockTabela'; // Importando os dados mockados
import './style/Listagem.css';

const Listagem = () => {
  const [dados, setDados] = useState([]);

  // Carregar dados do localStorage e combinar com mockData
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('mockData')) || [];
    // Combinar os dados mockados com os dados do localStorage
    const combinedData = [...mockData, ...storedData];
    setDados(combinedData);
  }, []);

  //* Pesquisa Tabela *//
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRows = dados.filter(row =>
    row.assunto.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //* Organização e pesquisa Sidebar *//
  const [searchTermSideBar, setSearchTermSideBar] = useState('');
  const [items, setItems] = useState([
    "Ação Judicial", "Sub-motivo", "Área Judicial", "Assunto Judicial", "Prioridade",
    "Local de Serviço", "Campos Extras", "Centro de Custo", "Tipos de Andamentos",
    "Empresa", "Fases", "Motivo", "Partes", "Tags"
  ]);

  const handleSort = () => {
    const sortedItems = [...items].sort((a, b) => a.localeCompare(b));
    setItems(sortedItems);
  };

  const filteredItemsSidebar = items.filter(item =>
    item.toLowerCase().includes(searchTermSideBar.toLowerCase())
  );

  //* Paginação e organização de itens *//
  const [currentPage, setCurrentPage] = useState(1); // Estado da página atual
  const [rowsPerPage, setRowsPerPage] = useState(6); // Estado para controlar o número de itens por página

  // Calcula o total de páginas
  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

  // Lógica para exibir os itens da página atual
  const paginatedRows = filteredRows.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Função para mudar o número de itens por página
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reseta para a primeira página quando o número de itens muda
  };

  // Funções de navegação entre as páginas
  const goToPreviousPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };

  return (
    <body>
      <div className='titulo'>
        <h3>Cadastros</h3>
      </div>
      <div class="container">
        <div className="sidebar">
          <div className="search">
            <div className='ajuste'>
              <input type="text" placeholder="Busque" className="search-input1" value={searchTermSideBar} onChange={e => setSearchTermSideBar(e.target.value)} />
              <SearchIcon className="icone-buscar" />
            </div>
            <button className='btn-filtro' onClick={handleSort}>
              <FontAwesomeIcon id='icon-filtro' icon={faSortAlphaUp} />
            </button>
          </div>

          <ul>
            {filteredItemsSidebar.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div class="main-content">
          <h2>Área Judicial</h2>
          <div class="search-container">
            <div className='ajuste'>
              <input type="text" placeholder="Pesquise pelo nome" className="search-input" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
              <SearchIcon class="icone-busca" />
            </div>
            <Link to={`/cadastro`}><button class="btn-novo"><p><FontAwesomeIcon id='icon' icon={faPlus} />Nova</p></button></Link>
          </div>

          <div className='tabela'>
            <Table>
              <TableHead className="table-header">
                <TableRow>
                  <TableCell className="table-cell">
                    Assunto <FontAwesomeIcon icon={faSort} className="sort-icon" />
                  </TableCell>
                  <TableCell className="table-cell">
                    Data Cadastro <FontAwesomeIcon icon={faSort} className="sort-icon" />
                  </TableCell>
                  <TableCell className="table-cell">
                    Status <FontAwesomeIcon icon={faSort} className="sort-icon" />
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedRows.map((row, index) => (
                  <TableRow key={index} className={index % 2 === 0 ? 'row-even' : 'row-odd'}>
                    <TableCell>{row.assunto}</TableCell>
                    <TableCell>{row.dataCadastro}</TableCell>
                    <TableCell>
                      <span className={`status-indicator ${row.status === 'Ativo' ? 'status-ativo' : 'status-inativo'}`}></span>
                      {row.status}
                    </TableCell>
                    <TableCell>
                      <IconButton>
                        <div className='pontos'>
                          <MoreVertIcon />
                        </div>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="pagination">
            <div className="pagination-info">
              Exibindo {(currentPage - 1) * rowsPerPage + 1}-{Math.min(currentPage * rowsPerPage, filteredRows.length)} de {filteredRows.length} - Áreas
            </div>
            <div className="pagination-buttons">
              <FontAwesomeIcon icon={faStepBackward} className="pagination-icon" onClick={goToFirstPage} />
              <FontAwesomeIcon icon={faChevronLeft} className="pagination-icon" onClick={goToPreviousPage} />
              <div className="current-page">
                <span>{currentPage}</span>
              </div>
              <FontAwesomeIcon icon={faChevronRight} className="pagination-icon" onClick={goToNextPage} />
              <FontAwesomeIcon icon={faStepForward} className="pagination-icon" onClick={goToLastPage} />
            </div>
            <div className="pagination-types">
              Tipos por página
              <select value={rowsPerPage} onChange={handleRowsPerPageChange}>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
};

export default Listagem;
