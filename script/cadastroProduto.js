const modal = document.querySelector('.popup-container')
const tbody = document.querySelector('tbody')
const sCodigoProduto = document.querySelector('#m-codigoProduto')
const sNomeProduto = document.querySelector('#m-nomeProduto')
const sPrecoProduto = document.querySelector('#m-precoProduto')
const sQuantidade = document.querySelector('#m-quantidadeProduto')


const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModalProduto(edit = false, index = 0) {
    modal.classList.add('active')
  
    modal.onclick = e => {
      if (e.target.className.indexOf('popup-container') !== -1) {
        modal.classList.remove('active')
      }
    }
    if (edit) {
    
        sCodigoProduto.value=itens[index].codigoProduto
        sNomeProduto.value=itens[index].nomeProduto
        sPrecoProduto.value=itens[index].precoProduto
        sQuantidade.value=itens[index].quantidadeProduto
        id = index
      } else {
        sCodigoProduto.value = ''
        sNomeProduto.value = ''
        sPrecoProduto.value = ''
        sQuantidade.value = ''
      }
      
    }

    function editItem(index) {

        openModalProduto(true, index)
      }
      
      function deleteItem(index) {
        itens.splice(index, 1)
        setItensBD()
        loadItens()
      }

      function insertItemProduto(item, index) {
        let tr = document.createElement('tr')
      
        tr.innerHTML = `
          <td>R$ ${item.codigoProduto}</td>
          <td>R$ ${item.nomeProduto}</td>
          <td>R$ ${item.precoProduto}</td>
          <td>R$ ${item.quantidadeProduto}</td>
      
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
  
        if (sCodigoProduto.value == ''|| sNomeProduto.value == ''|| sPrecoProduto.value == '' || sQuantidade.value == '' ) {
          return
        }

        e.preventDefault();

        if (id !== undefined) {
            itens[id].codigoProduto = sCodigoProduto.value
            itens[id].nomeProduto = sNomeProduto.value
            itens[id].precoProduto = sPrecoProduto.value
            itens[id].quantidadeProduto = sQuantidade.value
            
          } else {
            itens.push({'Código:':sCodigoProduto.value, 'Nome Produto':sNomeProduto.value,'Preço': sPrecoProduto.value,'Quantidade':sQuantidade})
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
              insertItemProduto(item, index)
            })
          
          }
          
          const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
          const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))
          
          loadItens()