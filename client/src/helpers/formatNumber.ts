export function formatNumber(num: string | number): string {
  const numStr = num.toString().replace(/\D/g, ''); // удаляем все символы, кроме цифр
  let result = '';

  for (let i = 0; i < numStr.length; i += 2) {
    result += numStr.slice(i, i + 2) + '-';
  }

  return result.slice(0, -1);
}
