# Mongoose OS Integration Guide

## Overview

This repository has been refactored to integrate Mongoose OS AI firmware throughout the system. The application now features:

- **Mongoose OS AI Integration**: AI-powered responses and authentication
- **Modular Page Structure**: Separate pages for each tool
- **Unified Authentication**: End-to-end encrypted login with Mongoose OS
- **Chat Widgets**: Bottom-right chat widget connected to Mongoose OS
- **Token System**: Tokenized responses from Mongoose OS

## Directory Structure

```
/
├── index.html                    # Login page (Mongoose OS integrated)
├── dashboard.html                # Main dashboard with app launcher
├── portal.html                   # Legacy unified portal (standalone)
├── router.py                     # Mongoose router service
├── requirements.txt              # Python dependencies
│
├── pages/                        # Individual tool pages
│   ├── chat.html                 # Rogers AI Chat
│   ├── pi-singer.html            # Pi Singer tool
│   ├── oscilloscope.html         # Oscilloscope tool
│   └── 3d-viewer.html            # 3D Viewer
│
├── components/                   # Reusable components
│   └── c13b0-chat-widget.html    # Chat widget (Mongoose connected)
│
├── assets/                       # Shared assets
│   ├── css/
│   │   └── infinity-design.css   # Unified design system
│   └── js/
│       └── infinity-auth.js      # Authentication library
│
└── mongoose/                     # Mongoose OS integration
    ├── mongoose.json             # Mongoose configuration
    └── lib/
        └── mongoose-client.js    # Mongoose client library
```

## Quick Start

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Start the Mongoose Router

```bash
python3 router.py
```

The router will start on port 5000 by default. You can change this with:

```bash
ROUTER_PORT=8000 python3 router.py
```

### 3. Serve the Frontend

Open `index.html` in a web browser or use a local server:

```bash
# Option 1: Python
python3 -m http.server 8080

# Option 2: Node.js
npx http-server -p 8080
```

### 4. Login and Explore

1. Navigate to `http://localhost:8080`
2. Create an account (data is encrypted locally)
3. Login to access the dashboard
4. Explore the different tools and chat widgets

## Mongoose OS Configuration

The Mongoose OS configuration is stored in `mongoose/mongoose.json`:

```json
{
  "operator": "Kris Watson",
  "attached": "2025-12-25T08:20:58Z",
  "mode": "passive"
}
```

### Configuration Options

- **operator**: Name of the Mongoose OS operator
- **attached**: Timestamp when Mongoose was attached
- **mode**: Operating mode
  - `passive`: Offline responses, no external API calls
  - `active`: Live AI responses (requires configuration)

## Authentication System

### Features

- **End-to-End Encryption**: AES-256-GCM encryption
- **Local Storage**: Credentials never leave your browser
- **Mongoose Integration**: Additional authentication layer with Mongoose OS
- **Session Management**: 24-hour sessions with automatic expiration

### Usage

```javascript
// Check if authenticated
if (InfinityAuth.isAuthenticated()) {
  // User is logged in
}

// Get user info
const userInfo = InfinityAuth.getUserInfo();

// Logout
InfinityAuth.logout();
```

## Chat Widget Integration

### C13B0 Chat Widget

The bottom-right chat widget is available on all pages and connects to Mongoose OS via the `/router/ask` endpoint.

To add the widget to a new page:

```html
<!-- Include at the end of your HTML -->
<script src="../assets/js/infinity-auth.js"></script>
<script src="../mongoose/lib/mongoose-client.js"></script>

<!-- Include the widget HTML -->
<!-- Or manually add the widget code from components/c13b0-chat-widget.html -->
```

### Response Format

```json
{
  "ok": true,
  "repo": "Joe",
  "answer": "AI response here...",
  "token": {
    "id": "tok_Joe_1234567890",
    "value": 42,
    "type": "c13b0",
    "repo": "Joe",
    "action": "query"
  },
  "mongoose": {
    "operator": "Kris Watson",
    "mode": "passive",
    "timestamp": "2025-12-25T10:30:00Z"
  }
}
```

## API Endpoints

### POST /router/ask

Main endpoint for chat queries.

**Request:**
```json
{
  "repo": "Joe",
  "query": "What is this repository about?",
  "t": 1234567890
}
```

**Response:**
```json
{
  "ok": true,
  "repo": "Joe",
  "answer": "This is the Joe repository...",
  "token": { ... }
}
```

### GET /mongoose/api/health

Health check endpoint.

**Response:**
```json
{
  "healthy": true,
  "status": "operational",
  "mode": "passive",
  "operator": "Kris Watson",
  "timestamp": "2025-12-25T10:30:00Z"
}
```

### POST /mongoose/api/auth

Authentication endpoint.

### POST /mongoose/api/query

Direct query endpoint.

### POST /mongoose/api/token

Token generation endpoint.

## Development

### Adding a New Page

1. Create a new HTML file in `/pages/`
2. Include the shared CSS: `<link rel="stylesheet" href="../assets/css/infinity-design.css" />`
3. Include auth library: `<script src="../assets/js/infinity-auth.js"></script>`
4. Add authentication check:
   ```javascript
   if (!InfinityAuth.requireAuth()) {
     // Will redirect to login
   }
   ```
5. Add navigation links to match other pages

### Customizing Mongoose Responses

Edit `router.py` and modify the `get_mongoose_response()` function to customize AI responses.

### Styling

All pages use the unified design system from `assets/css/infinity-design.css`. Key CSS variables:

```css
:root {
  --blue-1: #003087;
  --blue-2: #0b5fd7;
  --bg: #fff;
  --panel: #f8fafc;
  --muted: #637083;
  --gradient: linear-gradient(135deg, var(--blue-1), var(--blue-2));
}
```

## Troubleshooting

### Chat widget not working

1. Make sure `router.py` is running
2. Check console for errors
3. Verify the `/router/ask` endpoint is accessible

### Authentication issues

1. Clear browser local storage and session storage
2. Create a new account
3. Check browser console for errors

### Mongoose OS offline

This is normal in `passive` mode. The system will use offline fallback responses.

## Credits

- **Operator**: Kris Watson
- **Repository**: pewpi-infinity/Joe
- **AI Framework**: Mongoose OS

## License

Open source - feel free to use and modify!
