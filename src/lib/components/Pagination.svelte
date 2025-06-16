<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  export let currentPage: number;
  export let totalPages: number;
  export let totalNotes: number;
  export let startIndex: number;
  export let endIndex: number;
  export let hasNextPage: boolean;
  export let hasPrevPage: boolean;
  
  const dispatch = createEventDispatcher();
  
  function goToPage(page: number) {
    if (page >= 1 && page <= totalPages) {
      dispatch('pageChange', page);
    }
  }
  
  function nextPage() {
    if (hasNextPage) {
      dispatch('pageChange', currentPage + 1);
    }
  }
  
  function prevPage() {
    if (hasPrevPage) {
      dispatch('pageChange', currentPage - 1);
    }
  }
  
  // Generate page numbers to display
  $: pageNumbers = (() => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show smart pagination
      const start = Math.max(1, currentPage - 2);
      const end = Math.min(totalPages, start + maxVisiblePages - 1);
      
      // Adjust start if we're near the end
      const adjustedStart = Math.max(1, end - maxVisiblePages + 1);
      
      for (let i = adjustedStart; i <= end; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  })();
</script>

{#if totalPages > 1}
  <div class="flex flex-col sm:flex-row items-center justify-between gap-6 mt-12 p-6 glass-effect rounded-2xl border border-white/20 dark:border-gray-700/50">
    <!-- Results info -->
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      </div>
      <div>
        <p class="text-sm font-semibold text-gray-900 dark:text-gray-100">
          Showing <span class="text-blue-600 dark:text-blue-400">{startIndex}</span> to <span class="text-blue-600 dark:text-blue-400">{endIndex}</span>
        </p>
        <p class="text-xs text-gray-600 dark:text-gray-400">
          of <span class="font-medium">{totalNotes}</span> notes
        </p>
      </div>
    </div>
    
    <!-- Pagination controls -->
    <div class="flex items-center gap-2">
      <!-- Previous button -->
      <button
        on:click={prevPage}
        disabled={!hasPrevPage}
        class="p-3 text-gray-500 dark:text-gray-400 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:hover:transform-none"
        title="Previous page"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <!-- Page numbers -->
      {#each pageNumbers as pageNum}
        <button
          on:click={() => goToPage(pageNum)}
          class="px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 {pageNum === currentPage 
            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-blue-500/25' 
            : 'text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700'}"
        >
          {pageNum}
        </button>
      {/each}
      
      <!-- Next button -->
      <button
        on:click={nextPage}
        disabled={!hasNextPage}
        class="p-3 text-gray-500 dark:text-gray-400 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:hover:transform-none"
        title="Next page"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </div>
{/if}