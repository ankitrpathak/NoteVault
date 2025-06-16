<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { searchQuery, resetPagination } from '../stores';
  
  const dispatch = createEventDispatcher();
  
  let inputValue = '';
  let isFocused = false;
  
  function handleInput() {
    searchQuery.set(inputValue);
    resetPagination(); // Reset to first page when searching
    dispatch('search', inputValue);
  }
  
  function clearSearch() {
    inputValue = '';
    searchQuery.set('');
    resetPagination(); // Reset to first page when clearing search
    dispatch('search', '');
  }
  
  function handleFocus() {
    isFocused = true;
  }
  
  function handleBlur() {
    isFocused = false;
  }
</script>

<div class="relative group">
  <!-- Search icon -->
  <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
    <svg class="h-5 w-5 text-gray-400 dark:text-gray-500 group-focus-within:text-blue-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  </div>
  
  <!-- Input field -->
  <input
    type="text"
    bind:value={inputValue}
    on:input={handleInput}
    on:focus={handleFocus}
    on:blur={handleBlur}
    placeholder="Search your notes..."
    class="w-full pl-12 pr-12 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-xl {isFocused ? 'shadow-2xl shadow-blue-500/10' : ''}"
  />
  
  <!-- Clear button -->
  {#if inputValue}
    <button
      on:click={clearSearch}
      class="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 group"
    >
      <div class="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
    </button>
  {/if}
  
  <!-- Focus ring effect -->
  <div class="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-indigo-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10 blur-xl"></div>
</div>