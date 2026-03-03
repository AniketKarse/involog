export enum InvoiceState {
  CREATED = 'CREATED',
  SUBMITTED = 'SUBMITTED',
  PARTIALLY_PAID = 'PARTIALLY_PAID',
  CLOSED = 'CLOSED',
  CANCELLED = 'CANCELLED',
}

export const InvoiceStates = [
  InvoiceState.CREATED,
  InvoiceState.SUBMITTED,
  InvoiceState.PARTIALLY_PAID,
  InvoiceState.CANCELLED,
  InvoiceState.CLOSED,
] as const;

export const InvoiceStateVisitor = (i: InvoiceState) => {
  const values = {
    name: '',
    description: '',
    icon: '',
    canUpdate: false,
    canCreatePayments: false,
    canArchiveOrUnarchive: false,
    canWriteOff: false,
    canBeManuallySet: false,
  };

  switch (i) {
    case InvoiceState.CREATED:
      values.name = 'Created';
      values.description = 'Invoice has been created but not sent out yet.';
      values.canUpdate = true;
      break;
    case InvoiceState.SUBMITTED:
      values.name = 'Submitted';
      values.description = 'Invoice has been sent to client.';
      values.canCreatePayments = true;
      values.canBeManuallySet = true;
      break;
    case InvoiceState.PARTIALLY_PAID:
      values.name = 'Partially Paid';
      values.description = 'Invoice has been cleared partially.';
      values.canCreatePayments = true;
      values.canWriteOff = true;
      break;
    case InvoiceState.CLOSED:
      values.name = 'Closed';
      values.description = 'Invoice has been closed and no longer needs payments.';
      values.canArchiveOrUnarchive = true;
      break;
    case InvoiceState.CANCELLED:
      values.name = 'Revoked';
      values.description = 'Invoice has been revoked.';
      values.canArchiveOrUnarchive = true;
      values.canBeManuallySet = true;
      break;
    default:
      throw new Error(`Invalid invoice state: ${i}`);
  }

  return values;
};
