const modal = document.querySelector('.popup-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sCargo = document.querySelector("#m-cargo")
const sSalario = document.querySelector('#m-salario')
const sSituacao = document.querySelector('#m-situacao')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('popup-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sNome.value = itens[index].nome
    sCargo.value = itens[index].cargo
    sSalario.value = itens[index].salario
    sSituacao.value = itens[index].situacao
    id = index
  } else {
    sNome.value = ''
    sCargo.value = ''
    sSalario.value = ''
    sSituacao.value = ''
  }
  
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.cargo}</td>
    <td>${item.situacao}</td>
    <td>R$ ${item.salario}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (sNome.value == '' || sCargo.value == '' || sSalario.value == '' || sSituacao.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = sNome.value
    itens[id].cargo = sCargo.value
    itens[id].salario = sSalario.value
    itens[id].situacao = sSituacao.value
  } else {
    itens.push({'nome': sNome.value, 'cargo': sCargo.value, 'salario': sSalario.value, 'situacao': sSituacao.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()