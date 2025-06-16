import type { Note, CreateNoteRequest, UpdateNoteRequest } from '../types/note';

// Using MockAPI.io - replace this URL with your actual MockAPI endpoint
const API_BASE = 'https://68501578e7c42cfd17975228.mockapi.io/notes';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new ApiError(response.status, `API Error: ${response.statusText}`);
  }
  return response.json();
}

export const notesApi = {
  async getNotes(search?: string): Promise<Note[]> {
    const url = new URL(API_BASE);
    if (search) {
      url.searchParams.set('search', search);
    }
    url.searchParams.set('sortBy', 'createdAt');
    url.searchParams.set('order', 'desc');
    
    const response = await fetch(url.toString());
    const notes = await handleResponse<Note[]>(response);
    
    // Client-side filtering for search if API doesn't support it
    if (search && notes) {
      return notes.filter(note => 
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.content.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    return notes || [];
  },

  async createNote(note: CreateNoteRequest): Promise<Note> {
    const response = await fetch(API_BASE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    });
    return handleResponse<Note>(response);
  },

  async updateNote(id: string, note: UpdateNoteRequest): Promise<Note> {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    });
    return handleResponse<Note>(response);
  },

  async deleteNote(id: string): Promise<void> {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new ApiError(response.status, `Failed to delete note: ${response.statusText}`);
    }
  },
};