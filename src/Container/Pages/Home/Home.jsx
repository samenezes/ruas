import React, { useState } from 'react';
import styles from '../Home/Home.module.css';


function Home() {


// Função para buscar os dados usando fetch
async function fetchData() {
  try {
    const response = await fetch('https://opentdb.com/api.php?amount=30&category=19 ');
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Erro ao buscar os dados:', error);
    throw error;
  }
}


// Função para extrair os dados necessários
function extractData(paises) {
  return paises.map(pais => {
    return {
      nome: pais.name,
      bandeira: pais.flags.svg,
      populacao: pais.population,
      id: pais.numericCode,
      continente: pais.region
    };
  });
}


// Função para filtrar os países por continente
function filtrarPorContinente(paises, continente) {
  if (continente === 'tudo') {
    return paises;
  } else {
    return paises.filter(pais => pais.continente === continente);
  }
}


function displayData(paises) {
  const listaEsquerda = document.getElementById('lista-esquerda');
  const listaDireita = document.getElementById('lista-direita');
  const contadorEsquerda = document.getElementById('contador-esquerda');
  const contadorDireita = document.getElementById('contador-direita');
  const populacaoEsquerda = document.getElementById('populacao-esquerda');
  const populacaoDireita = document.getElementById('populacao-direita');


  // Limpar as listas antes de exibir os dados atualizados
  listaEsquerda.innerHTML = '';
  listaDireita.innerHTML = '';


  paises.forEach(pais => {
    const itemLista = document.createElement('li');
      itemLista.dataset.id = pais.id;
      itemLista.dataset.populacao = pais.populacao;


      const bandeiraDiv = document.createElement('div');
      bandeiraDiv.classList.add(styles.bandeira);


      const bandeiraImg = document.createElement('img');
      bandeiraImg.classList.add(styles.bandeira);
      bandeiraImg.src = pais.bandeira;
      bandeiraImg.alt = pais.nome;
      bandeiraDiv.appendChild(bandeiraImg);


      itemLista.appendChild(bandeiraDiv);


      const nomePais = document.createElement('span');
      nomePais.textContent = pais.nome;
      itemLista.appendChild(nomePais);
    itemLista.addEventListener('click', toggleFavorito);


    // Verificar se o país está na lista de favoritos (direita)
    if (isFavorito(pais.id)) {
      itemLista.classList.add('favorito');
      listaDireita.appendChild(itemLista);
    } else {
      listaEsquerda.appendChild(itemLista);
    }
  });
 
  // Atualizar contagem de países e população
  contadorEsquerda.textContent = listaEsquerda.children.length;
  contadorDireita.textContent = listaDireita.children.length;
  populacaoEsquerda.textContent = calcularPopulacaoTotal(listaEsquerda);
  populacaoDireita.textContent = calcularPopulacaoTotal(listaDireita);
}


// Função para calcular a população total
function calcularPopulacaoTotal(lista) {
  let populacaoTotal = 0;
  Array.from(lista.children).forEach(item => {
    const populacao = parseInt(item.dataset.populacao);
    if (!isNaN(populacao)) {
      populacaoTotal += populacao;
    }
  });
  return populacaoTotal;
}


// Função para verificar se um país é favorito (está na lista da direita)
function isFavorito(idPais) {
  const listaDireita = document.getElementById('lista-direita');
  const itensFavoritos = listaDireita.getElementsByTagName('li');
  for (let i = 0; i < itensFavoritos.length; i++) {
    if (itensFavoritos[i].dataset.id === idPais) {
      return true;
    }
  }
  return false;
}


// Função para adicionar/remover um país aos favoritos
function toggleFavorito() {
  if (this.classList.contains('favorito')) {
    this.classList.remove('favorito');
    const listaEsquerda = document.getElementById('lista-esquerda');
    listaEsquerda.appendChild(this);
  } else {
    this.classList.add('favorito');
    const listaDireita = document.getElementById('lista-direita');
    listaDireita.appendChild(this);
  }


  // Atualizar contagem de países e população
  const contadorEsquerda = document.getElementById('contador-esquerda');
  const contadorDireita = document.getElementById('contador-direita');
  const populacaoEsquerda = document.getElementById('populacao-esquerda');
  const populacaoDireita = document.getElementById('populacao-direita');
  contadorEsquerda.textContent = document.getElementById('lista-esquerda').children.length;
  contadorDireita.textContent = document.getElementById('lista-direita').children.length;
  populacaoEsquerda.textContent = calcularPopulacaoTotal(document.getElementById('lista-esquerda'));
  populacaoDireita.textContent = calcularPopulacaoTotal(document.getElementById('lista-direita'));
}


// Função para ordenar os países
function ordenarPaises(paises) {
  return paises.sort((a, b) => a.nome.localeCompare(b.nome));
}


// Função principal para buscar os dados, transformar e exibir na página
async function main() {
  try {
    const data = await fetchData();// O await pausa a execução da função até que a promessa seja resolvida e os dados sejam retornados.
    const dadosTransformados = extractData(data);
    const dadosOrdenados = ordenarPaises(dadosTransformados);
    displayData(dadosOrdenados);


    // Adicionar evento de mudança no filtro por continente
    const selectContinente = document.getElementById('continent');
    selectContinente.addEventListener('change', function() {
      const continenteSelecionado = this.value;
      const paisesFiltrados = filtrarPorContinente(dadosOrdenados, continenteSelecionado);
      displayData(paisesFiltrados);
    });
  } catch (error) {
    console.log('Erro:', error);
  }
}


// Executar a função principal
main();
















  
}


export default Home;


