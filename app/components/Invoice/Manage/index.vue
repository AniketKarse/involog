<script setup lang="ts">
import type { InvoiceSchema } from '~~/shared/schemas/invoice';

const { mutateAsync: deleteAction, isPending: deleteActionPending } = useDeleteInvoiceMutation();

defineProps<{
  invoice: InvoiceSchema;
}>();

const deleteActionOpen = ref(false);
const markSubmittedAction = ref(false);
const deleteInvoice = () => {
  console.log('invoice deleted');
  deleteActionOpen.value = false;
};
const markAsSubmitted = () => {
  console.log('The Invoice has been submitted');
  markSubmittedAction.value = false;
};
</script>
<template>
  <div class="p-4 flex flex-col">
    <div class="flex justify-end gap-2">
      <ShadButton type="submit" variant="default" @click.prevent="markSubmittedAction = true">
        <AbstractConfirmationBox
          confirm-action="Submit"
          variant="default"
          v-model:open="markSubmittedAction"
          @cancel="markSubmittedAction = false"
          @confirm="markAsSubmitted()"
        >
          <template #default> Mark as Submitted </template>
          <template #title> Submitting Invoice </template>
          <template #description>
            After the Submission you won't be able to make any changes in the invoice. Do you wish to continue?
          </template>
        </AbstractConfirmationBox>
      </ShadButton>
      <ShadButton type="submit" variant="destructive" @click.prevent="deleteActionOpen = true">
        <AbstractConfirmationBox
          confirm-action="Delete"
          variant="danger"
          v-model:open="deleteActionOpen"
          @cancel="deleteActionOpen = false"
          @confirm="
            deleteAction({ id: invoice.id }).then(() => {
              deleteActionOpen = false;
            })
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
