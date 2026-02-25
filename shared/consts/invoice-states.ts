export const InvoiceStates = ['CREATED', 'SUBMITTED', 'PARTIALLY_PAID', 'CLOSED', 'CANCELLED'] as const;

export const InvoiceStateVisitor = (i: (typeof InvoiceStates)[number]) => {
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
    case 'CREATED':
      values.name = 'Created';
      values.description = 'Invoice has been created but not sent out yet.';
      values.canUpdate = true;
      break;
    case 'SUBMITTED':
      values.name = 'Submitted';
      values.description = 'Invoice has been sent to client.';
      values.canCreatePayments = true;
      values.canBeManuallySet = true;
      break;
    case 'PARTIALLY_PAID':
      values.name = 'Partially Paid';
      values.description = 'Invoice has been cleared partially.';
      values.canCreatePayments = true;
      values.canWriteOff = true;
      break;
    case 'CLOSED':
      values.name = 'Closed';
      values.description = 'Invoice has been closed and no longer needs payments.';
      values.canArchiveOrUnarchive = true;
      break;
    case 'CANCELLED':
      values.name = 'Revoked';
      values.description = 'Invoice has been revoked.';
      values.canArchiveOrUnarchive = true;
      values.canBeManuallySet = true;
      break;
    default:
      throw new Error('Invalid invoice state');
  }

  return values;
};
