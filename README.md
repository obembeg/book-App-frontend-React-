

```markdown
# BookApp - Modern Book Management Platform

A full-featured React + Vite application for managing and discovering books with admin controls, user access management, and real-time updates.

## Features

✨ **User Dashboard**
- Create, edit, and manage your books
- Organize books by categories
- View all platform books with smooth scrolling UI

🔐 **Admin Dashboard**
- Full book & category management
- User access control (grant/revoke permissions/access )
- Real-time notifications

🎨 **UI/UX**
- Modern glassmorphism design with Tailwind CSS
- Smooth animations and hover effects
- Responsive grid layout (2 columns on desktop)
- Hidden scrollbars for premium feel
- Dark theme with slate color palette

## Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **State Management**: Context API
- **Build Tool**: Vite
- **Real-time**: Socket.io (configured)

## Getting Started

### Prerequisites
- Node.js 16+


## Project Structure

```
src/
├── pages/
│   └── Dashboard.jsx      # Main user & admin interface
├── context/
│   └── storeContext.js    # Global state management
└── ...
```

## Key Features Breakdown

**Book Management**: Create, update, delete books with title, description, author, price, and category.

**Category System**: Organize books into custom categories with CRUD operations.

**Access Control**: Admins can grant/revoke user permissions and promote users to admin status.

**Platform Library**: Browse all available books across the platform.

## License

MIT
```
