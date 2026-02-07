/* =====================================================
   MODAL (ABRIR)
===================================================== */
export function openModal({ content, onClose }) {
  // Evita abrir mais de um modal ao mesmo tempo
  if (document.querySelector(".modal-overlay")) return;

  // Cria o overlay (fundo escuro)
  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";

  // Cria o container do modal
  const modal = document.createElement("div");
  modal.className = "modal";

  // Insere o conteúdo recebido dentro do modal
  modal.appendChild(content);
  overlay.appendChild(modal);

  // Adiciona o modal no body
  document.body.appendChild(overlay);

  // Fecha o modal ao clicar fora do conteúdo
  overlay.onclick = (e) => {
    if (e.target === overlay) {
      closeModal();
      onClose?.(); // callback opcional ao fechar
    }
  };
}

/* =====================================================
   MODAL (FECHAR)
===================================================== */
export function closeModal() {
  // Remove o modal caso exista
  document.querySelector(".modal-overlay")?.remove();
}

/* =====================================================
   FORMATAR MOEDA
===================================================== */
export function formatCurrency(value) {
  // Formata valores no padrão brasileiro (R$)
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

/* =====================================================
   TOAST (NOTIFICAÇÃO)
===================================================== */
export function toast(message, type = "success") {
  // Ícones disponíveis por tipo
  const icons = {
    success: "fa-check-circle",
    remove: "fa-trash",
    error: "fa-times-circle",
    info: "fa-info-circle",
  };

  // Container do toast
  const el = document.createElement("div");
  el.className = "toast";

  // Ícone do toast
  const icon = document.createElement("i");
  icon.classList.add("fas", icons[type] || icons.success);

  // Texto do toast
  const text = document.createElement("span");
  text.textContent = message;

  // Monta o toast
  el.append(icon, text);

  // Estilos agora ficam no CSS (comentados aqui)
  /*
    el.style.position = 'fixed'
    el.style.top = '1.25rem'
    el.style.right = '1.25rem'
    el.style.width = '17rem'
    el.style.background = '#111'
    el.style.color = '#fff'
    el.style.padding = '0.625rem 0.875rem'
    el.style.borderRadius = '0.375rem'
    el.style.display = 'flex'
    el.style.alignItems = 'center'
    el.style.gap = '0.5rem'
    el.style.boxShadow = '0 0.5rem 1.25rem rgba(0,0,0,.25)'
    el.style.zIndex = '9999'
    el.style.fontSize = '0.875rem'
    */

  // Adiciona o toast no body
  document.body.appendChild(el);

  // Inicia o fade out após 1.8s
  setTimeout(() => {
    el.style.opacity = "0";
    el.style.transition = "opacity .3s";
  }, 1800);

  // Remove o toast do DOM
  setTimeout(() => el.remove(), 2200);
}
