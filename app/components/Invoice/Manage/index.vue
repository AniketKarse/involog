<script setup lang="ts">
import { InvoiceState } from '~~/shared/consts/invoice-states';
import type { InvoiceSchema } from '~~/shared/schemas/invoice';

const { mutateAsync: deleteAction, isPending: deleteActionPending } = useDeleteInvoiceMutation();
const { mutateAsync: markAsSubmitted, isPending: markActionPending } = useUpdateStateInvoiceMutation();

defineProps<{
  invoice?: InvoiceSchema;
  isUpdating: boolean;
}>();

const deleteActionOpen = ref(false);
const markSubmittedAction = ref(false);
</script>
<template>
  <div class="p-4 flex flex-col">
    <div class="flex justify-end gap-2">
      <ShadButton type="submit" variant="default" @click.prevent="markSubmittedAction = true" v-show="isUpdating">
        <AbstractConfirmationBox
          confirm-action="Submit"
          variant="default"
          v-model:open="markSubmittedAction"
          v-model:loading="markActionPending"
          @cancel="markSubmittedAction = false"
          @confirm="
            if (invoice?.id) {
              markAsSubmitted({ id: invoice.id, state: InvoiceState.SUBMITTED }).then(() => {
                markSubmittedAction = false;
                navigateTo('/invoices');
              });
            }
          "
        >
          <template #default> Mark as Submitted </template>
          <template #title> Submitting Invoice </template>
          <template #description>
            After the Submission you won't be able to make any changes in the invoice. Do you wish to continue?
          </template>
        </AbstractConfirmationBox>
      </ShadButton>
      <ShadButton type="submit" variant="destructive" @click.prevent="deleteActionOpen = true" v-show="isUpdating">
        <AbstractConfirmationBox
          confirm-action="Delete"
          variant="danger"
          v-model:open="deleteActionOpen"
          v-model:loading="deleteActionPending"
          @cancel="deleteActionOpen = false"
          @confirm="
            if (invoice?.id) {
              deleteAction({ id: invoice.id }).then(() => {
                deleteActionOpen = false;
                navigateTo('/invoices');
              });
            }
          "
        >
          <template #default> Delete </template>
          <template #title> Deleting Invoice </template>
          <template #description> Are you sure you want to continue with deletion? </template>
        </AbstractConfirmationBox>
      </ShadButton>
    </div>
  </div>
</template>
