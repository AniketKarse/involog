<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { Pentagon } from 'lucide-vue-next';
import { InvoiceStates, InvoiceStateVisitor } from '~~/shared/consts/invoice-states';
const props = defineProps<{
  modelValue?: string | string[];
  multiple?: boolean;
  disabled?: boolean;
}>();

const selectedValue = useVModel(props, 'modelValue');
</script>

<template>
  <ShadSelect v-model:model-value="selectedValue" :multiple="multiple" :disabled="disabled">
    <ShadSelectTrigger>
      <template #icon>
        <Pentagon class="h-4 w-4 -ml-1" />
      </template>
      <ShadSelectValue placeholder="Select State" />
    </ShadSelectTrigger>
    <ShadSelectContent>
      <ShadSelectGroup>
        <ShadSelectItem v-for="state in InvoiceStates" :key="state" :value="state">
          {{ InvoiceStateVisitor(state).name }}
        </ShadSelectItem>
      </ShadSelectGroup>
    </ShadSelectContent>
  </ShadSelect>
</template>
