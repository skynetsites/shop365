import { listarProdutos } from "./api.js";
import { renderLista, showProductModal } from "./ui.js";
import "./cartUI.js";

// document.querySelector('.checkout-btn')
//     .addEventListener('click', () => {
//         alert('compra finalizada!!!')
//     })

function iniciarProjeto() {
  // carregar estado do carrinho persistido
  listarProdutos().then((dados) => {
    const produtos = dados.products;

    // renderLista(produtos)
    renderLista(produtos, (produto) => {
      showProductModal(produto);
    });
  });
}

iniciarProjeto();
