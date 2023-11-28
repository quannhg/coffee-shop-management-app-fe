export function formatPhone(phoneNumber: string) {
  const firstGroup = phoneNumber.slice(0, 4);
  const secondGroup = phoneNumber.slice(4, 7);
  const thirdGroup = phoneNumber.slice(7);

  return `${firstGroup} ${secondGroup} ${thirdGroup}`;
}
