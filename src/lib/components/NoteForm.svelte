<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import LoadingSpinner from './LoadingSpinner.svelte';
  import type { Note } from '../../types/note';
  
  export let note: Note | null = null;
  export let isSubmitting = false;
  
  const dispatch = createEventDispatcher();
  
  let title = note?.title || '';
  let content = note?.content || '';
  
  $: isEditing = !!note;
  $: isValid = title.trim() && content.trim();
  $: wordCount = content.trim().split(/\s+/).filter(word => word.length > 0).length;
  $: charCount = content.length;
  
  function handleSubmit() {
    if (!isValid || isSubmitting) return;
    
    dispatch('submit', {
      title: title.trim(),
      content: content.trim()
    });
  }
  
  function handleCancel() {
    dispatch('cancel');
  }
</script>

<form on:submit|preventDefault={handleSubmit} class="space-y-6">
  <div class="space-y-2">
    <label for="title" class="block text-sm font-semibold text-gray-700 dark:text-gray-300">
      Title
    </label>
    <input
      id="title"
      type="text"
      bind:value={title}
      placeholder="Enter a compelling title..."
      class="input-field text-lg font-medium"
      disabled={isSubmitting}
      required
    />
  </div>
  
  <div class="space-y-2">
    <div class="flex items-center justify-between">
      <label for="content" class="block text-sm font-semibold text-gray-700 dark:text-gray-300">
        Content
      </label>
      <div class="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
        <span class="flex items-center gap-1">
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
          {wordCount} words
        </span>
        <span class="flex items-center gap-1">
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          {charCount} chars
        </span>
      </div>
    </div>
    <textarea
      id="content"
      bind:value={content}
      placeholder="Write your thoughts here..."
      rows="6"
      class="input-field resize-none leading-relaxed"
      disabled={isSubmitting}
      required
    ></textarea>
  </div>
  
  <div class="flex gap-3 justify-end pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
    <button
      type="button"
      class="btn-secondary"
      on:click={handleCancel}
      disabled={isSubmitting}
    >
      Cancel
    </button>
    <button
      type="submit"
      class="btn-primary min-w-[120px] relative"
      disabled={!isValid || isSubmitting}
    >
      {#if isSubmitting}
        <div class="flex items-center gap-2">
          <LoadingSpinner size="sm" />
          <span>{isEditing ? 'Updating...' : 'Creating...'}</span>
        </div>
      {:else}
        <div class="flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {#if isEditing}
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            {:else}
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            {/if}
          </svg>
          {isEditing ? 'Update Note' : 'Create Note'}
        </div>
      {/if}
    </button>
  </div>
</form>