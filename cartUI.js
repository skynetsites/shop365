// ======================================================
// CART UI — Renderização do carrinho
// ======================================================

import { subscribe, dispatch } from "./cartStore.js";
import { formatCurrency } from "./utils.js";

// Container onde os itens do carrinho serão renderizados
const container = document.querySelector("#cart-items");

// Elemento que exibe o valor total
const totalEl = document.querySelector(".total-price");

// ------------------------------------------------------
// Função responsável por renderizar os itens do carrinho
// ------------------------------------------------------
function render(items) {
  // Limpa o container antes de renderizar novamente
  container.innerHTML = "";

  // Caso o carrinho esteja vazio
  if (!items.length) {
    const empty = document.createElement("div");
    empty.classList.add("cart-empty");
    empty.textContent = "Seu carrinho está vazio";
    container.appendChild(empty);
    return;
  }

  // Renderiza cada item do carrinho
  items.forEach((p) => {
    const el = document.createElement("div");
    el.classList.add("cart-item");
    el.setAttribute("data-id", p.id);

    // --------------------------------------------------
    // IMAGEM DO PRODUTO
    // --------------------------------------------------
    const image = document.createElement("div");
    image.classList.add("item-image");

    const img = document.createElement("img");
    img.classList.add("cart-product-image");
    img.src = p.thumbnail;
    img.alt = p.title;

    image.appendChild(img);

    // --------------------------------------------------
    // DETALHES DO PRODUTO
    // --------------------------------------------------
    const details = document.createElement("div");
    details.classList.add("item-details");

    const title = document.createElement("h4");
    title.textContent = p.title;

    const brand = document.createElement("p");
    brand.textContent = p.brand || p.category || "";

    // --------------------------------------------------
    // CONTROLES DE QUANTIDADE
    // --------------------------------------------------
    const controls = document.createElement("div");
    controls.classList.add("item-controls");

    // Botão de diminuir quantidade
    const btnMinus = document.createElement("button");
    btnMinus.classList.add("ctrl-btn", "ctrl-minus");
    btnMinus.innerHTML = '<i class="fas fa-minus"></i>';
    btnMinus.onclick = () =>
      dispatch({
        type: "CHANGE_QTY",
        payload: { id: p.id, delta: -1 },
      });

    // Exibição da quantidade atual
    const qty = document.createElement("span");
    qty.classList.add("item-quantity");
    qty.textContent = p.quantity;

    // Botão de aumentar quantidade
    const btnPlus = document.createElement("button");
    btnPlus.classList.add("ctrl-btn", "ctrl-plus");
    btnPlus.innerHTML = '<i class="fas fa-plus"></i>';
    btnPlus.onclick = () =>
      dispatch({
        type: "CHANGE_QTY",
        payload: { id: p.id, delta: 1 },
      });

    controls.append(btnMinus, qty, btnPlus);
    details.append(title, brand, controls);

    // --------------------------------------------------
    // PREÇO DO PRODUTO
    // --------------------------------------------------
    const price = document.createElement("span");
    price.classList.add("item-price");
    price.textContent = formatCurrency(p.price);

    // --------------------------------------------------
    // BOTÃO REMOVER ITEM
    // --------------------------------------------------
    const btnRemove = document.createElement("button");
    btnRemove.classList.add("ctrl-btn", "ctrl-remove");
    btnRemove.innerHTML = '<i class="fas fa-trash"></i>';
    btnRemove.onclick = () =>
      dispatch({
        type: "REMOVE_ITEM",
        payload: p.id,
      });

    // --------------------------------------------------
    // MONTA O ITEM NO DOM
    // --------------------------------------------------
    el.append(image, details, price, btnRemove);
    container.appendChild(el);
  });
}

// ------------------------------------------------------
// Listener do estado do carrinho
// Sempre que o estado mudar, re-renderiza
// ------------------------------------------------------
subscribe((state) => {
  render(state.items);
  totalEl.textContent = formatCurrency(state.total);
});

// ------------------------------------------------------
// BOTÃO DE RESET DO CARRINHO
// ------------------------------------------------------
const cartResetBtn = document.createElement("span");
cartResetBtn.classList.add("cart-reset-btn");
cartResetBtn.textContent = "Resetar carrinho";

// Inicialmente escondido
cartResetBtn.style.display = "none";

// Confirma antes de limpar o carrinho
cartResetBtn.onclick = () => {
  if (confirm("Deseja resetar o carrinho?")) {
    dispatch({ type: "RESET_CART" });
  }
};

// Adiciona o botão no cabeçalho do carrinho
document.querySelector(".cart-label").appendChild(cartResetBtn);
