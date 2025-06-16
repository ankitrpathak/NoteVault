<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import NoteCard from './NoteCard.svelte';
  import type { Note } from '../../types/note';
  
  export let notes: Note[];
  export let totalNotes: number = 0;
  export let searchQuery: string = '';
  
  const dispatch = createEventDispatcher();
  
  function handleEdit(event: CustomEvent<Note>) {
    dispatch('edit', event.detail);
  }
  
  function handleDelete(event: CustomEvent<Note>) {
    dispatch('delete', event.detail);
  }
  
  $: emptyStateMessage = searchQuery 
    ? `No notes found matching "${searchQuery}"`
    : 'No notes yet';
  
  $: emptyStateSubtext = searchQuery
    ? 'Try adjusting your search terms'
    : 'Get started by creating your first note!';
</script>

{#if notes.length === 0}
  <div class="text-center py-20">
    <div class="relative inline-block mb-8">
      <!-- Animated background circle -->
      <div class="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-600/20 rounded-full blur-2xl animate-pulse"></div>
      
      <!-- Icon container -->
      <div class="relative w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-3xl flex items-center justify-center shadow-xl">
        <svg class="w-12 h-12 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {#if searchQuery}
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          {:else}
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          {/if}
        </svg>
      </div>
    </div>
    
    <h3 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">{emptyStateMessage}</h3>
    <p class="text-gray-600 dark:text-gray-400 text-lg mb-6 max-w-md mx-auto">{emptyStateSubtext}</p>
    
    {#if searchQuery && totalNotes > 0}
      <div class="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-xl text-sm font-medium">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {totalNotes} total notes available
      </div>
    {/if}
  </div>
{:else}
  <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {#each notes as note, index (note.id)}
      <div 
        class="animate-fade-in"
        style="animation-delay: {index * 0.1}s"
      >
        <NoteCard 
          {note} 
          on:edit={handleEdit}
          on:delete={handleDelete}
        />
      </div>
    {/each}
  </div>
{/if}

<style>
  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fade-in {
    animation: fade-in 0.6s ease-out forwards;
    opacity: 0;
  }
</style>