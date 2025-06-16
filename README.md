# Notes App - Svelte + TypeScript + TailwindCSS

A modern, responsive notes application built with Svelte, TypeScript, and TailwindCSS featuring full CRUD operations, real-time search, pagination, and beautiful UI with dark/light mode support.

## 🚀 How to Run the App

### Prerequisites
- Node.js 16+ and npm
- A MockAPI.io account (free)

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd notes-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API endpoint**
   - Go to [MockAPI.io](https://mockapi.io) and create a new project
   - Create a resource called "notes" with fields:
     - `id`: Object ID (auto-generated)
     - `title`: Text field
     - `content`: Text field
     - `createdAt`: Date field (auto-generate current date)
   - Copy your endpoint URL and update `src/lib/api.ts`:
     ```typescript
     const API_BASE = 'https://your-project-id.mockapi.io/notes';
     ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Navigate to `http://localhost:5173`
   - The app will load with an empty state - create your first note!

### Production Build
```bash
npm run build
npm run preview
```

## 🔄 Trade-offs and Assumptions Made

### Technical Decisions

1. **MockAPI.io for Backend**
   - **Trade-off**: Used a mock API service instead of building a real backend
   - **Assumption**: This is acceptable for a demo/portfolio project
   - **Benefit**: Faster development, no server deployment complexity
   - **Limitation**: Data persistence depends on external service

2. **Client-side Search**
   - **Trade-off**: Implemented search filtering on the frontend instead of server-side
   - **Assumption**: The dataset will remain relatively small (hundreds, not thousands of notes)
   - **Benefit**: Instant search results, no API calls needed
   - **Limitation**: All notes must be loaded for search to work

3. **Pagination Implementation**
   - **Trade-off**: Client-side pagination vs server-side pagination
   - **Assumption**: Total note count won't exceed a few hundred
   - **Benefit**: Smooth navigation, no loading between pages
   - **Limitation**: Initial load fetches all notes

4. **State Management**
   - **Trade-off**: Used Svelte stores instead of more complex state management
   - **Assumption**: App complexity doesn't require Redux/Zustand-level solutions
   - **Benefit**: Simple, reactive, and performant
   - **Limitation**: Might need refactoring for larger applications

5. **Styling Approach**
   - **Trade-off**: TailwindCSS with custom components vs CSS-in-JS or styled-components
   - **Assumption**: Utility-first CSS is acceptable and maintainable
   - **Benefit**: Rapid development, consistent design system, small bundle size
   - **Limitation**: HTML can become verbose with many classes

### UX/UI Decisions

1. **Optimistic Updates**
   - **Trade-off**: Update UI immediately vs waiting for API confirmation
   - **Assumption**: API failures are rare enough to justify better UX
   - **Benefit**: App feels instant and responsive
   - **Limitation**: Potential inconsistency if API calls fail

2. **Modal-based Editing**
   - **Trade-off**: Modal dialogs vs inline editing or separate pages
   - **Assumption**: Users prefer focused editing experience
   - **Benefit**: Maintains context, works well on mobile
   - **Limitation**: Can't edit multiple notes simultaneously

## 🚧 What I'd Do With More Time

### Immediate Improvements (1-2 days)
- **Offline Support**: Implement service worker for offline note creation/editing
- **Auto-save**: Save drafts automatically while typing
- **Keyboard Shortcuts**: Add hotkeys for common actions (Ctrl+N for new note, etc.)
- **Note Categories/Tags**: Add tagging system for better organization
- **Export Functionality**: Allow exporting notes as PDF or Markdown

### Medium-term Features (1 week)
- **Real Backend**: Replace MockAPI with a proper backend (Node.js + PostgreSQL)
- **User Authentication**: Add user accounts and note privacy
- **Rich Text Editor**: Implement markdown support or WYSIWYG editor
- **Note Sharing**: Share notes via links with permission controls
- **Advanced Search**: Full-text search with filters (date, tags, etc.)
- **Bulk Operations**: Select multiple notes for batch delete/export

### Long-term Enhancements (2+ weeks)
- **Collaboration**: Real-time collaborative editing
- **Mobile App**: React Native or Flutter mobile application
- **AI Integration**: AI-powered note summarization and suggestions
- **Version History**: Track and restore previous versions of notes
- **Advanced Analytics**: Note-taking patterns and insights
- **Plugin System**: Extensible architecture for custom features

### Technical Improvements
- **Testing**: Add comprehensive unit and integration tests (Jest + Testing Library)
- **Performance**: Implement virtual scrolling for large note lists
- **Accessibility**: Enhanced screen reader support and keyboard navigation
- **Internationalization**: Multi-language support
- **Error Monitoring**: Integrate Sentry or similar for error tracking
- **Analytics**: User behavior tracking for product insights

### Infrastructure
- **CI/CD Pipeline**: Automated testing and deployment
- **Docker**: Containerization for consistent development environment
- **Monitoring**: Application performance monitoring
- **CDN**: Asset optimization and global distribution
- **Database Optimization**: Indexing and query optimization for scale

## 📋 Features Implemented

- ✅ **CRUD Operations**: Create, read, update, delete notes
- ✅ **Real-time Search**: Instant filtering as you type
- ✅ **Pagination**: 20 notes per page with navigation
- ✅ **Responsive Design**: Works on mobile, tablet, and desktop
- ✅ **Dark/Light Mode**: Theme toggle with persistence
- ✅ **Loading States**: Smooth loading indicators
- ✅ **Error Handling**: User-friendly error messages
- ✅ **Toast Notifications**: Success/error feedback
- ✅ **Modern UI**: Glass morphism design with animations
- ✅ **TypeScript**: Full type safety
- ✅ **Accessibility**: Keyboard navigation and ARIA labels

## 🛠 Tech Stack

- **Frontend**: Svelte + TypeScript + TailwindCSS
- **Build Tool**: Vite
- **API**: MockAPI.io (REST)
- **State Management**: Svelte Stores
- **Styling**: TailwindCSS with custom components
- **Icons**: Heroicons (SVG)
- **Fonts**: Inter (Google Fonts)

---

**Contact**: engineering@inlabels.in