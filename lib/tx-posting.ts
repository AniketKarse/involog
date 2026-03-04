import type { ClientSchema } from '~~/shared/schemas/client';
import type { InvoiceInfoSchema } from '~~/shared/schemas/invoice';
import type { PaymentSchema } from '~~/shared/schemas/payment';
import type { TransactionSchema } from '~~/shared/schemas/transaction';



class _TransactionPoster {
  fromPayment(payment: PaymentSchema, invoiceInfo: InvoiceInfoSchema, client: ClientSchema): TransactionSchema[] {
    const transactionsToPost: TransactionSchema[] = [{
        description: 
    }];
    return transactionsToPost;
  }
}

export const TransactionPoster = new _TransactionPoster();
