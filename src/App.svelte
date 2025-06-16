<script lang="ts">
  import { onMount } from 'svelte';
  import { notes, loading, error, searchQuery, addToast, paginatedNotes, goToPage, darkMode } from './lib/stores';
  import { notesApi } from './lib/api';
  import type { Note, CreateNoteRequest, UpdateNoteRequest } from './types/note';
  
  // Components
  import Toast from './lib/components/Toast.svelte';
  import LoadingSpinner from './lib/components/LoadingSpinner.svelte';
  import SearchBar from './lib/components/SearchBar.svelte';
  import NotesGrid from './lib/components/NotesGrid.svelte';
  import Pagination from './lib/components/Pagination.svelte';
  import Modal from './lib/components/Modal.svelte';
  import NoteForm from './lib/components/NoteForm.svelte';
  import ConfirmDialog from './lib/components/ConfirmDialog.svelte';
  import DarkModeToggle from './lib/components/DarkModeToggle.svelte';
  
  // State
  let showCreateModal = false;
  let showEditModal = false;
  let showDeleteDialog = false;
  let editingNote: Note | null = null;
  let deletingNote: Note | null = null;
  let isSubmitting = false;
  
  // Load notes on mount
  onMount(() => {
    loadNotes();
  });
  
  async function loadNotes() {
    try {
      loading.set(true);
      error.set(null);
      const fetchedNotes = await notesApi.getNotes();
      notes.set(fetchedNotes);
    } catch (err) {
      console.error('Failed to load notes:', err);
      error.set('Failed to load notes. Please try again.');
      addToast('error', 'Failed to load notes');
    } finally {
      loading.set(false);
    }
  }
  
  async function handleCreateNote(event: CustomEvent<CreateNoteRequest>) {
    try {
      isSubmitting = true;
      const newNote = await notesApi.createNote(event.detail);
      
      // Optimistic update
      notes.update(currentNotes => [newNote, ...currentNotes]);
      
      showCreateModal = false;
      addToast('success', 'Note created successfully!');
    } catch (err) {
      console.error('Failed to create note:', err);
      addToast('error', 'Failed to create note');
    } finally {
      isSubmitting = false;
    }
  }
  
  async function handleUpdateNote(event: CustomEvent<UpdateNoteRequest>) {
    if (!editingNote) return;
    
    try {
      isSubmitting = true;
      const updatedNote = await notesApi.updateNote(editingNote.id, event.detail);
      
      // Optimistic update
      notes.update(currentNotes =>
        currentNotes.map(note =>
          note.id === editingNote!.id ? updatedNote : note
        )
      );
      
      showEditModal = false;
      editingNote = null;
      addToast('success', 'Note updated successfully!');
    } catch (err) {
      console.error('Failed to update note:', err);
      addToast('error', 'Failed to update note');
    } finally {
      isSubmitting = false;
    }
  }
  
  async function handleDeleteNote() {
    if (!deletingNote) return;
    
    try {
      await notesApi.deleteNote(deletingNote.id);
      
      // Optimistic update
      notes.update(currentNotes =>
        currentNotes.filter(note => note.id !== deletingNote!.id)
      );
      
      showDeleteDialog = false;
      deletingNote = null;
      addToast('success', 'Note deleted successfully!');
    } catch (err) {
      console.error('Failed to delete note:', err);
      addToast('error', 'Failed to delete note');
    }
  }
  
  function openCreateModal() {
    showCreateModal = true;
  }
  
  function openEditModal(event: CustomEvent<Note>) {
    editingNote = event.detail;
    showEditModal = true;
  }
  
  function openDeleteDialog(event: CustomEvent<Note>) {
    deletingNote = event.detail;
    showDeleteDialog = true;
  }
  
  function closeCreateModal() {
    showCreateModal = false;
  }
  
  function closeEditModal() {
    showEditModal = false;
    editingNote = null;
  }
  
  function closeDeleteDialog() {
    showDeleteDialog = false;
    deletingNote = null;
  }
  
  function handlePageChange(event: CustomEvent<number>) {
    goToPage(event.detail);
  }
</script>

<main class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 transition-all duration-500">
  <!-- Animated background elements -->
  <div class="fixed inset-0 overflow-hidden pointer-events-none">
    <div class="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-600/20 rounded-full blur-3xl floating-animation"></div>
    <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-3xl floating-animation" style="animation-delay: -3s;"></div>
    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-emerald-400/10 to-blue-600/10 rounded-full blur-3xl floating-animation" style="animation-delay: -1.5s;"></div>
  </div>

  <!-- Header -->
  <header class="relative glass-effect border-b border-white/20 dark:border-gray-700/50 backdrop-blur-xl">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        <div class="flex items-center gap-4">
          <div class="relative">
            <div class="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25 pulse-glow">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div class="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full animate-ping"></div>
          </div>
          <div>
            <h1 class="text-2xl font-bold gradient-text">Notes App</h1>
            <p class="text-sm text-gray-600 dark:text-gray-400">Organize your thoughts beautifully</p>
          </div>
        </div>
        
        <div class="flex items-center gap-4">
          <DarkModeToggle />
          <button
            on:click={openCreateModal}
            class="btn-primary group"
          >
            <svg class="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            New Note
          </button>
        </div>
      </div>
    </div>
  </header>
  
  <!-- Main Content -->
  <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Search Bar -->
    <div class="mb-12 max-w-md mx-auto lg:mx-0">
      <SearchBar />
    </div>
    
    <!-- Error State -->
    {#if $error}
      <div class="mb-8 p-6 glass-effect border border-red-200/50 dark:border-red-800/50 rounded-2xl">
        <div class="flex items-center">
          <div class="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="flex-1">
            <h3 class="font-semibold text-red-800 dark:text-red-200">Something went wrong</h3>
            <p class="text-red-700 dark:text-red-300">{$error}</p>
          </div>
          <button
            on:click={loadNotes}
            class="btn-secondary text-sm"
          >
            Retry
          </button>
        </div>
      </div>
    {/if}
    
    <!-- Loading State -->
    {#if $loading}
      <div class="flex flex-col items-center justify-center py-20">
        <div class="relative">
          <LoadingSpinner size="lg" />
          <div class="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur-xl opacity-20 animate-pulse"></div>
        </div>
        <p class="mt-6 text-gray-600 dark:text-gray-400 font-medium">Loading your notes...</p>
      </div>
    {:else}
      <!-- Notes Grid -->
      <NotesGrid 
        notes={$paginatedNotes.notes}
        totalNotes={$paginatedNotes.totalNotes}
        searchQuery={$searchQuery}
        on:edit={openEditModal}
        on:delete={openDeleteDialog}
      />
      
      <!-- Pagination -->
      <Pagination
        currentPage={$paginatedNotes.currentPage}
        totalPages={$paginatedNotes.totalPages}
        totalNotes={$paginatedNotes.totalNotes}
        startIndex={$paginatedNotes.startIndex}
        endIndex={$paginatedNotes.endIndex}
        hasNextPage={$paginatedNotes.hasNextPage}
        hasPrevPage={$paginatedNotes.hasPrevPage}
        on:pageChange={handlePageChange}
      />
    {/if}
  </div>
  
  <!-- Create Note Modal -->
  <Modal
    isOpen={showCreateModal}
    title="Create New Note"
    on:close={closeCreateModal}
  >
    <NoteForm
      {isSubmitting}
      on:submit={handleCreateNote}
      on:cancel={closeCreateModal}
    />
  </Modal>
  
  <!-- Edit Note Modal -->
  <Modal
    isOpen={showEditModal}
    title="Edit Note"
    on:close={closeEditModal}
  >
    <NoteForm
      note={editingNote}
      {isSubmitting}
      on:submit={handleUpdateNote}
      on:cancel={closeEditModal}
    />
  </Modal>
  
  <!-- Delete Confirmation Dialog -->
  <ConfirmDialog
    isOpen={showDeleteDialog}
    title="Delete Note"
    message="Are you sure you want to delete this note? This action cannot be undone."
    confirmText="Delete"
    type="danger"
    on:confirm={handleDeleteNote}
    on:cancel={closeDeleteDialog}
  />
  
  <!-- Toast Notifications -->
  <Toast />
</main>