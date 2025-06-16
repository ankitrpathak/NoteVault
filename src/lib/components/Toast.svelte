<script lang="ts">
  import { toasts, removeToast } from '../stores';
  import { fade, fly } from 'svelte/transition';
  
  $: toastList = $toasts;
  
  function getToastClass(type: string) {
    switch (type) {
      case 'success':
        return 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-emerald-500/25';
      case 'error':
        return 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-red-500/25';
      case 'info':
        return 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-blue-500/25';
      default:
        return 'bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-gray-500/25';
    }
  }
  
  function getIcon(type: string) {
    switch (type) {
      case 'success':
        return 'M5 13l4 4L19 7';
      case 'error':
        return 'M6 18L18 6M6 6l12 12';
      case 'info':
        return 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z';
      default:
        return 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z';
    }
  }
</script>

<div class="fixed top-6 right-6 z-50 space-y-3 max-w-sm">
  {#each toastList as toast (toast.id)}
    <div
      class="flex items-center gap-4 px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-sm border border-white/20 max-w-sm {getToastClass(toast.type)}"
      in:fly="{{ x: 400, duration: 400, opacity: 0 }}"
      out:fade="{{ duration: 300 }}"
    >
      <!-- Icon -->
      <div class="flex-shrink-0">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="{getIcon(toast.type)}" />
        </svg>
      </div>
      
      <!-- Message -->
      <p class="flex-1 text-sm font-medium leading-relaxed">{toast.message}</p>
      
      <!-- Close button -->
      <button
        on:click={() => removeToast(toast.id)}
        class="flex-shrink-0 p-1 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-all duration-200 transform hover:scale-110"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  {/each}
</div>