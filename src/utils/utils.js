export const formatPhone = (number = '') => {
  if (typeof number !== 'string') return;

  const phoneNumber = number ?? '';
  return phoneNumber.replace(/[^\d+]/g, '');
};