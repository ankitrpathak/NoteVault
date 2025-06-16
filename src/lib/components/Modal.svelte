<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fade, scale } from 'svelte/transition';
  
  export let isOpen = false;
  export let title = '';
  
  const dispatch = createEventDispatcher();
  
  function closeModal() {
    dispatch('close');
  }
  
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      closeModal();
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if isOpen}
  <div 
    class="fixed inset-0 z-50 flex items-center justify-center p-4"
    transition:fade="{{ duration: 300 }}"
  >
    <!-- Enhanced backdrop with blur -->
    <div 
      class="absolute inset-0 bg-black/60 backdrop-blur-sm"
      on:click={closeModal}
    ></div>
    
    <!-- Modal -->
    <div 
      class="relative glass-effect border border-white/20 dark:border-gray-700/50 rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-auto"
      transition:scale="{{ duration: 300, start: 0.9 }}"
    >
      <!-- Header -->
      <div class="flex items-center justify-between p-8 border-b border-gray-200/50 dark:border-gray-700/50">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100">{title}</h2>
        </div>
        <button
          on:click={closeModal}
          class="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 transform hover:scale-110"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <!-- Content -->
      <div class="p-8">
        <slot />
      </div>
    </div>
  </div>
{/if}