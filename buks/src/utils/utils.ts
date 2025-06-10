export function toUrlFriendly(text: string): string {
    return text
      .toLowerCase() // Converte para letras minúsculas
      .trim() // Remove espaços extras no início e no final
      .replace(/\s+/g, '-') // Substitui espaços por hífens
      .replace(/[^\w-]/g, ''); // Remove caracteres especiais
}

export function formatarData(data: string) {
    if (!data) return '';
    const d = new Date(data);
    const dia = String(d.getDate()).padStart(2, '0');
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    const ano = d.getFullYear();
    return `${dia}/${mes}/${ano}`;
}