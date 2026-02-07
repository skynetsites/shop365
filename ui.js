// Importa o dispatch para disparar ações no carrinho
// Importa utilitários: formatação de preço, toast e controle do modal
import { dispatch } from "./cartStore.js";
import { formatCurrency, toast, openModal, closeModal } from "./utils.js";

/* =====================================================
   PRODUTOS (GRID)
===================================================== */

/**
 * Cria o card de um produto para o grid
 * @param {Object} produto - Dados do produto
 * @param {Function} onClick - Função executada ao clicar no botão
 */
function criarElementoProduto(produto, onClick) {
  /* CONTAINER PRINCIPAL DO CARD */
  const productCardElement = document.createElement("div");
  productCardElement.classList.add("product-card");

  /* IMAGEM DO PRODUTO */
  const productImageWrapper = document.createElement("div");
  productImageWrapper.classList.add("product-image");

  const productImageElement = document.createElement("img");
  productImageElement.src = produto.thumbnail;
  productImageElement.alt = produto.title;

  productImageWrapper.appendChild(productImageElement);

  /* INFORMAÇÕES DO PRODUTO */
  const productInfoElement = document.createElement("div");
  productInfoElement.classList.add("product-info");

  const productTitleElement = document.createElement("h3");
  productTitleElement.classList.add("product-title");
  productTitleElement.textContent = produto.title;

  const productBrandElement = document.createElement("p");
  productBrandElement.classList.add("product-brand");
  productBrandElement.textContent = produto.brand || produto.category || "";

  /* RODAPÉ DO CARD (PREÇO + BOTÃO) */
  const productFooterElement = document.createElement("div");
  productFooterElement.classList.add("product-footer");

  const productPriceElement = document.createElement("span");
  productPriceElement.classList.add("product-price");
  productPriceElement.textContent = formatCurrency(produto.price);

  const buttonElement = document.createElement("button");
  buttonElement.classList.add("add-cart-btn");
  buttonElement.innerHTML = `<i class="fas fa-cart-plus"></i>`;

  // Evita propagação do clique e abre o modal do produto
  buttonElement.addEventListener("click", (e) => {
    e.stopPropagation();
    onClick(produto);
  });

  productFooterElement.append(productPriceElement, buttonElement);
  productInfoElement.append(
    productTitleElement,
    productBrandElement,
    productFooterElement,
  );

  productCardElement.append(productImageWrapper, productInfoElement);

  return productCardElement;
}

/**
 * Renderiza a lista de produtos no grid
 */
export function renderLista(lista, onClick) {
  const listaProdutosGrid = document.querySelector("#products-list");
  listaProdutosGrid.innerHTML = "";

  lista.forEach((produto) => {
    const produtoElemento = criarElementoProduto(produto, onClick);
    listaProdutosGrid.appendChild(produtoElemento);
  });
}

/* =====================================================
   MODAL DE PRODUTO
===================================================== */

/**
 * Exibe o modal com detalhes do produto e controle de quantidade
 */
export function showProductModal(produto) {
  let qty = 1;

  const content = document.createElement("div");
  content.classList.add("modal-content");

  /* LADO ESQUERDO (IMAGEM) */
  const left = document.createElement("div");
  left.classList.add("modal-left");

  const img = document.createElement("img");
  img.classList.add("modal-product-image");
  img.src = produto.thumbnail;
  img.alt = produto.title;

  left.appendChild(img);

  /* LADO DIREITO (INFO + CONTROLES) */
  const right = document.createElement("div");
  right.classList.add("modal-right");

  const title = document.createElement("h3");
  title.classList.add("modal-title");
  title.textContent = produto.title;

  const brand = document.createElement("p");
  brand.classList.add("modal-brand");
  brand.textContent = produto.brand || produto.category || "";

  const price = document.createElement("p");
  price.classList.add("modal-price");
  price.textContent = formatCurrency(produto.price);

  /* CONTROLE DE QUANTIDADE */
  const qtyWrap = document.createElement("div");
  qtyWrap.classList.add("modal-qty");

  const btnMinus = document.createElement("button");
  btnMinus.classList.add("modal-qty-btn", "modal-minus");
  btnMinus.innerHTML = '<i class="fas fa-minus"></i>';

  const qtyDisplay = document.createElement("span");
  qtyDisplay.classList.add("modal-qty-display");
  qtyDisplay.textContent = "1";

  const btnPlus = document.createElement("button");
  btnPlus.classList.add("modal-qty-btn", "modal-plus");
  btnPlus.innerHTML = '<i class="fas fa-plus"></i>';

  qtyWrap.append(btnMinus, qtyDisplay, btnPlus);

  /* BOTÕES DO MODAL */
  const buttonsDiv = document.createElement("div");
  buttonsDiv.classList.add("modal-buttons");

  const btnContinue = document.createElement("button");
  btnContinue.classList.add("btn", "btn-continue");
  btnContinue.textContent = "Continuar comprando";

  const btnSend = document.createElement("button");
  btnSend.classList.add("btn", "btn-send");
  btnSend.textContent = "Adicionar ao carrinho";

  buttonsDiv.append(btnContinue, btnSend);

  right.append(title, brand, price, qtyWrap, buttonsDiv);
  content.append(left, right);

  /* Atualiza quantidade garantindo mínimo de 1 */
  const setQty = (v) => {
    qty = Math.max(1, v);
    qtyDisplay.textContent = qty;
  };

  content.querySelector(".modal-minus").onclick = () => setQty(qty - 1);
  content.querySelector(".modal-plus").onclick = () => setQty(qty + 1);

  // Fecha o modal sem ação
  content.querySelector(".btn-continue").onclick = closeModal;

  // Adiciona item ao carrinho
  content.querySelector(".btn-send").onclick = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: produto.id,
        title: produto.title,
        brand: produto.brand || produto.category || "",
        price: Number(produto.price),
        thumbnail: produto.thumbnail,
        quantity: qty,
      },
    });

    closeModal();
    toast("Produto adicionado ao carrinho", "success");
  };

  openModal({ content });
}

/* =====================================================
   MODAL DE FINALIZAÇÃO DE COMPRA
===================================================== */

const checkoutBtn = document.querySelector("#checkout-btn");

if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    const content = document.createElement("div");
    content.classList.add("modal-content", "modal-finalizar");

    const right = document.createElement("div");
    right.classList.add("modal-right");

    const title = document.createElement("h3");
    title.classList.add("modal-title");
    title.textContent = "Finalizar compra";

    const description = document.createElement("p");
    description.classList.add("modal-brand");
    description.textContent = "Deseja realmente concluir a compra?";

    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("modal-buttons");

    const btnContinue = document.createElement("button");
    btnContinue.classList.add("btn", "btn-continue");
    btnContinue.textContent = "Continuar comprando";

    const btnSend = document.createElement("button");
    btnSend.classList.add("btn", "btn-send");
    btnSend.textContent = "Confirmar compra";

    buttonsDiv.append(btnContinue, btnSend);
    right.append(title, description, buttonsDiv);
    content.appendChild(right);

    btnContinue.onclick = closeModal;

    btnSend.onclick = () => {
      dispatch({ type: "RESET_CART" });
      closeModal();
      toast("Compra finalizada com sucesso", "success");
    };

    openModal({ content });
  });
}
