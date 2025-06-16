import { writable, derived } from 'svelte/store';
import { browser } from '../app/environment';
import type { Note } from '../types/note';

export const notes = writable<Note[]>([]);
export const loading = writable(false);
export const error = writable<string | null>(null);
export const searchQuery = writable('');

// Dark mode store with persistence
function createDarkMode() {
  const defaultValue = false;
  const initialValue = browser ? localStorage.getItem('darkMode') === 'true' : defaultValue;
  const { subscribe, set, update } = writable<boolean>(initialValue);

  return {
    subscribe,
    set: (value: boolean) => {
      if (browser) {
        localStorage.setItem('darkMode', value.toString());
        if (value) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
      set(value);
    },
    toggle: () => update(n => {
      const newValue = !n;
      if (browser) {
        localStorage.setItem('darkMode', newValue.toString());
        if (newValue) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
      return newValue;
    })
  };
}

export const darkMode = createDarkMode();

// Pagination stores
export const currentPage = writable(1);
export const notesPerPage = writable(20);

// Derived store for paginated notes
export const paginatedNotes = derived(
  [notes, searchQuery, currentPage, notesPerPage],
  ([$notes, $searchQuery, $currentPage, $notesPerPage]) => {
    // Filter notes based on search query
    let filteredNotes = $notes;
    if ($searchQuery) {
      filteredNotes = $notes.filter(note =>
        note.title.toLowerCase().includes($searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes($searchQuery.toLowerCase())
      );
    }

    // Calculate pagination
    const totalNotes = filteredNotes.length;
    const totalPages = Math.ceil(totalNotes / $notesPerPage);
    const startIndex = ($currentPage - 1) * $notesPerPage;
    const endIndex = startIndex + $notesPerPage;
    const paginatedData = filteredNotes.slice(startIndex, endIndex);

    return {
      notes: paginatedData,
      totalNotes,
      totalPages,
      currentPage: $currentPage,
      hasNextPage: $currentPage < totalPages,
      hasPrevPage: $currentPage > 1,
      startIndex: startIndex + 1,
      endIndex: Math.min(endIndex, totalNotes)
    };
  }
);

// Toast notifications
export interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

export const toasts = writable<Toast[]>([]);

export function addToast(type: Toast['type'], message: string) {
  const id = Math.random().toString(36).substr(2, 9);
  const toast: Toast = { id, type, message };
  
  toasts.update(currentToasts => [...currentToasts, toast]);
  
  // Auto remove after 4 seconds
  setTimeout(() => {
    removeToast(id);
  }, 4000);
}

export function removeToast(id: string) {
  toasts.update(currentToasts => currentToasts.filter(t => t.id !== id));
}

// Pagination helper functions
export function goToPage(page: number) {
  currentPage.set(page);
}

export function nextPage() {
  currentPage.update(page => page + 1);
}

export function prevPage() {
  currentPage.update(page => Math.max(1, page - 1));
}

export function resetPagination() {
  currentPage.set(1);
}