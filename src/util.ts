export const formatCurrency = (amount: number) => {
  return amount >= 1
    ? `£${amount.toFixed(2)}`
    : `${(amount * 100).toFixed(0)}p`;
};
