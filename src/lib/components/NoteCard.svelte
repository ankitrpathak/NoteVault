<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Note } from '../../types/note';
  
  export let note: Note;
  
  const dispatch = createEventDispatcher();
  
  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  
  function handleEdit() {
    dispatch('edit', note);
  }
  
  function handleDelete() {
    dispatch('delete', note);
  }
  
  // Generate a random gradient for each note
  const gradients = [
    'from-blue-500/10 to-indigo-500/10',
    'from-purple-500/10 to-pink-500/10',
    'from-emerald-500/10 to-green-500/10',
    'from-orange-500/10 to-red-500/10',
    'from-cyan-500/10 to-blue-500/10',
    'from-violet-500/10 to-purple-500/10'
  ];
  
  const randomGradient = gradients[Math.abs(note.id.split('').reduce((a, b) => a + b.charCodeAt(0), 0)) % gradients.length];
</script>

<div class="card group relative overflow-hidden">
  <!-- Gradient overlay -->
  <div class="absolute inset-0 bg-gradient-to-br {randomGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
  
  <!-- Shimmer effect on hover -->
  <div class="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
  
  <div class="relative p-6">
    <div class="flex items-start justify-between mb-4">
      <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
        {note.title}
      </h3>
      <div class="flex gap-2 ml-4 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-x-2 group-hover:translate-x-0">
        <button
          on:click={handleEdit}
          class="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transform hover:scale-110"
          title="Edit note"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        <button
          on:click={handleDelete}
          class="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transform hover:scale-110"
          title="Delete note"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
    
    <p class="text-gray-600 dark:text-gray-300 text-sm line-clamp-4 mb-6 leading-relaxed">
      {note.content}
    </p>
    
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {formatDate(note.createdAt)}
      </div>
      
      <!-- Word count -->
      <div class="text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
        {note.content.split(' ').length} words
      </div>
    </div>
  </div>
  
  <!-- Bottom accent line -->
  <div class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r {randomGradient.replace('/10', '/50')} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
</div>

<style>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .line-clamp-4 {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>