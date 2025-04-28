export function toUrlFriendly(text: string): string {
    return text
      .toLowerCase() // Converte para letras minúsculas
      .trim() // Remove espaços extras no início e no final
      .replace(/\s+/g, '-') // Substitui espaços por hífens
      .replace(/[^\w-]/g, ''); // Remove caracteres especiais
  }