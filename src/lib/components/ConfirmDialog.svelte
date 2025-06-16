<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Modal from './Modal.svelte';
  
  export let isOpen = false;
  export let title = 'Confirm Action';
  export let message = 'Are you sure you want to proceed?';
  export let confirmText = 'Confirm';
  export let cancelText = 'Cancel';
  export let type: 'danger' | 'primary' = 'danger';
  
  const dispatch = createEventDispatcher();
  
  function handleConfirm() {
    dispatch('confirm');
  }
  
  function handleCancel() {
    dispatch('cancel');
  }
</script>

<Modal {isOpen} {title} on:close={handleCancel}>
  <div class="space-y-4">
    <p class="text-gray-600">{message}</p>
    
    <div class="flex gap-3 justify-end">
      <button
        class="btn-secondary"
        on:click={handleCancel}
      >
        {cancelText}
      </button>
      <button
        class="btn-{type === 'danger' ? 'danger' : 'primary'}"
        on:click={handleConfirm}
      >
        {confirmText}
      </button>
    </div>
  </div>
</Modal>