// Função responsável por buscar a lista de produtos da API
export function listarProdutos() {
  return fetch("https://dummyjson.com/products").then((resposta) =>
    resposta.json(),
  );
}
