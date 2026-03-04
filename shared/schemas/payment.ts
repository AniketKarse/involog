import { z } from 'zod';
import { PaymentTypes } from '../consts/payment-types';
import { FilterSets, supplimentalFields, SupplimentalFieldsFilterSet } from './_base';

const paymentFields = {
  amount: z.number(),
  type: z.enum(PaymentTypes),
  invoiceId: supplimentalFields.id,
  note: z.string().max(500).nullish(),
  underlyingTransactions: z.array(supplimentalFields.id),
};

const paymentInfoFields = {
  amount: paymentFields.amount,
  type: paymentFields.type,
  invoiceId: paymentFields.invoiceId,
  note: paymentFields.note,
};

export const paymentInfoSchema = z.object({
  ...supplimentalFields,
  ...paymentInfoFields,
});
export type PaymentInfoSchema = z.infer<typeof paymentInfoSchema>;

export const paymentSchema = z.object({
  ...supplimentalFields,
  ...paymentFields,
});
export type PaymentSchema = z.infer<typeof paymentSchema>;

export const { underlyingTransactions: _underlyingTransactions, ...createPaymentSchemaFields } = paymentFields;
export const createPaymentSchema = z.object({
  ...createPaymentSchemaFields,
});
export type CreatePaymentSchema = z.infer<typeof createPaymentSchema>;

// Updates don't exist for payments

export const deletePaymentSchema = z.object({
  id: supplimentalFields.id,
});
export type DeletePaymentSchema = z.infer<typeof deletePaymentSchema>;

export const findPaymentsSchema = z.object({
  invoiceId: paymentFields.invoiceId,
});
export type FindPaymentsSchema = z.infer<typeof findPaymentsSchema>;

export const fitlerPaymentsSchema = z.object({
  ...SupplimentalFieldsFilterSet,
  invoiceIds: FilterSets.discreteValues(),
  types: FilterSets.discreteValues(paymentFields.type),
  note: FilterSets.string(),
});
export type FilterPaymentSchema = z.infer<typeof fitlerPaymentsSchema>;
