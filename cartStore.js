// ======================================================
// CART STORE (estado global simples do carrinho)
// ======================================================

// Chave usada para persistir o carrinho no localStorage
const CART_KEY = "shop365_cart";

// Flag para modo de desenvolvimento
// Quando true, carrega produtos fake caso não exista carrinho salvo
const DEV_MODE = true;

// ------------------------------------------------------
// PRODUTOS DE EXEMPLO (somente para DEV_MODE)
// ------------------------------------------------------
const DEV_ITEMS = [
  {
    id: "dev-1",
    title: 'MacBook Pro 13" Big Discount',
    brand: "Eshop Spot",
    price: 1999,
    thumbnail:
      "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/13-laptop-platinum-right-render-fy25:VP4-1260x795?fmt=png-alpha",
    quantity: 1,
  },
  {
    id: "dev-2",
    title: 'MacBook Pro 13" Big Discount',
    brand: "Eshop Spot",
    price: 1999,
    thumbnail:
      "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/13-laptop-platinum-right-render-fy25:VP4-1260x795?fmt=png-alpha",
    quantity: 1,
  },
];

// ------------------------------------------------------
// STATE INICIAL DO CARRINHO
// ------------------------------------------------------
let state = {
  items: [], // lista de produtos no carrinho
  total: 0, // valor total calculado
};

// ------------------------------------------------------
// Hidratação do estado a partir do localStorage
// ------------------------------------------------------
const persisted = JSON.parse(localStorage.getItem(CART_KEY));

// Se existir carrinho salvo, ele tem prioridade
if (persisted && persisted.items?.length) {
  state = persisted;
}
// Caso contrário, em modo DEV, carrega itens fake
else if (DEV_MODE) {
  state.items = [...DEV_ITEMS];
}

// Força o cálculo inicial do total
state.total = state.items.reduce(
  (sum, item) => sum + item.price * item.quantity,
  0,
);

// ------------------------------------------------------
// SISTEMA DE SUBSCRIBERS (observer pattern simples)
// ------------------------------------------------------
const listeners = [];

// Permite que componentes se inscrevam para ouvir mudanças
export function subscribe(fn) {
  listeners.push(fn);

  // Executa imediatamente com o estado atual
  fn(state);
}

// Notifica todos os inscritos e persiste o estado
function notify() {
  // Recalcula o total sempre que o estado muda
  state.total = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  // Persiste o carrinho no localStorage
  localStorage.setItem(CART_KEY, JSON.stringify(state));

  // Dispara atualização para todos os listeners
  listeners.forEach((fn) => fn(state));
}

// ------------------------------------------------------
// DISPATCHER DE AÇÕES (estilo Redux simplificado)
// ------------------------------------------------------
export function dispatch(action) {
  switch (action.type) {
    // Adiciona um item ao carrinho
    case "ADD_ITEM": {
      const existing = state.items.find(
        (i) => String(i.id) === String(action.payload.id),
      );

      // Se o item já existe, soma a quantidade
      if (existing) {
        existing.quantity += action.payload.quantity;
      }
      // Caso contrário, adiciona como novo item
      else {
        state.items.push({ ...action.payload });
      }
      break;
    }

    // Remove um item completamente do carrinho
    case "REMOVE_ITEM":
      state.items = state.items.filter(
        (i) => String(i.id) !== String(action.payload),
      );
      break;

    // Altera quantidade (incrementa ou decrementa)
    case "CHANGE_QTY": {
      const item = state.items.find(
        (i) => String(i.id) === String(action.payload.id),
      );
      if (!item) break;

      item.quantity += action.payload.delta;

      // Se a quantidade ficar <= 0, remove o item
      if (item.quantity <= 0) {
        state.items = state.items.filter((i) => i !== item);
      }
      break;
    }

    // Limpa completamente o carrinho
    case "RESET_CART":
      state.items = [];
      state.total = 0;
      localStorage.removeItem(CART_KEY);
      break;
  }

  // Notifica listeners e persiste mudanças
  notify();
}
