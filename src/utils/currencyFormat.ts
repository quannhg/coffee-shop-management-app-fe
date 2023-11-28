export function formatCurrency(number: number): string {
  const numberStr: string = number.toString().split('').reverse().join('');

  const formattedNumber: string = numberStr.replace(/\d{3}(?=\d)/g, '$&,');

  const reversedFormattedNumber: string = formattedNumber.split('').reverse().join('');

  const result: string = `${reversedFormattedNumber} VNĐ`;

  return result;
}
