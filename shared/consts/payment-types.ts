export enum PaymentType {
  REMITTANCE = 'REMITTANCE',
  WRITEOFF = 'WRITEOFF',
}

export const PaymentTypes = [PaymentType.REMITTANCE, PaymentType.WRITEOFF] as const;

export const PaymentTypesVisitor = (p: PaymentType) => {
  const values = {
    title: '',
    description: '',
  };

  switch (p) {
    case PaymentType.REMITTANCE:
      values.title = 'Remittance';
      values.description = 'Money sent by customer to a business to settle an outstanding invoice.';
      break;
    case PaymentType.WRITEOFF:
      values.title = 'Write Off';
      values.description = 'Record remaining payment as uncollectible effectively recognizing it as a loss.';
      break;
    default:
      throw new Error(`Invalid Payment Type: ${p}`);
  }
  return values;
};
