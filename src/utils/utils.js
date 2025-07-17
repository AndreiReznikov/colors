export const formatPhone = (number = '') => {
  const phoneNumber = number ?? '';
  return phoneNumber.replace(/[^\d+]/g, '');
};