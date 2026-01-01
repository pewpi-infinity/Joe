# ∞ Infinity Portal

A unified web portal featuring Rogers AI Chat, Pi Singer, Oscilloscope, and Simple 3D tools - all integrated with Mongoose OS AI firmware.

## 🌟 What's New

**Mongoose OS Integration**: The entire application has been refactored to integrate Mongoose OS AI firmware throughout the system, providing:
- AI-powered authentication
- Intelligent chat responses with tokenized outputs
- Modular architecture with separated tool pages
- End-to-end encrypted login system
- Unified design system

## ✨ Features

- 🧠 **Rogers AI Chat** - Mongoose OS powered conversational AI
- 🎵 **Pi Singer** - Convert π digits to musical notes with live waveform
- 📈 **Oscilloscope** - Signal generator with frequency visualization
- 🧊 **3D Viewer** - CSS-based 3D cube animation
- 🔐 **Secure Authentication** - AES-256-GCM encrypted login with Mongoose OS
- 💬 **Chat Widgets** - Bottom-right chat widget on all pages
- 🎨 **Unified Design** - Consistent styling across all pages
- 📱 **Mobile Responsive** - Works on all devices

## 🚀 Quick Start

### Option 1: One-Command Startup (Recommended)

```bash
./start.sh
```

This will:
1. Install Python dependencies
2. Start the Mongoose Router (port 5001)
3. Start the web server (port 8080)
4. Display all access points

Then open: http://127.0.0.1:8080

### Option 2: Manual Setup

1. Clone the repository:
```bash
git clone https://github.com/pewpi-infinity/Joe.git
cd Joe
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Start the Mongoose Router:
```bash
# Development mode (with debug)
ROUTER_PORT=5001 FLASK_DEBUG=true python3 router.py

# Production mode (without debug, recommended for public deployment)
ROUTER_PORT=5001 python3 router.py
```

4. In a new terminal, start the web server:
```bash
python3 -m http.server 8080
```

5. Open your browser to: http://127.0.0.1:8080

## 📁 Project Structure

```
/
├── index.html                    # Login page (Mongoose OS integrated)
├── dashboard.html                # Main dashboard with app launcher
├── portal.html                   # Legacy unified portal (standalone)
├── router.py                     # Mongoose router service
├── start.sh                      # One-command startup script
├── test-integration.html         # Integration test page
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

## 🔐 Authentication

The login system uses:
- **AES-256-GCM encryption** for local credential storage
- **Mongoose OS** for additional authentication layer
- **Session management** with 24-hour expiration
- **No external servers** - all encryption happens in your browser

Create an account on first visit, then login to access the dashboard and tools.

## 🐍 Mongoose OS

Mongoose OS configuration is in `mongoose/mongoose.json`:

```json
{
  "operator": "Kris Watson",
  "attached": "2025-12-25T08:20:58Z",
  "mode": "passive"
}
```

**Modes:**
- `passive`: Offline responses (no external API calls)
- `active`: Live AI responses (requires additional configuration)

## 💬 Chat Widgets

Every page includes a bottom-right chat widget that connects to Mongoose OS. Features:
- Tokenized responses
- Repository-aware queries
- Real-time communication
- Consistent across all pages

## 🛠️ Technologies

- Pure HTML/CSS/JavaScript (frontend)
- Python Flask (backend router)
- Web Crypto API (encryption)
- Web Audio API (sound generation)
- Canvas API (visualizations)
- CSS3 animations (3D effects)

## 📱 Usage

1. **Login** at `index.html`
2. **Dashboard** shows all available tools
3. **Navigate** to individual tool pages
4. **Chat** using bottom-right widget on any page
5. **Customize** theme colors (coming soon)

## 🧪 Testing

Visit `test-integration.html` to test:
- Authentication system
- Mongoose client connectivity
- Router endpoints
- File structure
- Navigation

## 📖 Documentation

- See [MONGOOSE_GUIDE.md](MONGOOSE_GUIDE.md) for detailed Mongoose OS integration guide
- API documentation in the guide
- Development instructions included

## 🌐 Live Demo

**GitHub Pages:** [https://pewpi-infinity.github.io/Joe/portal.html](https://pewpi-infinity.github.io/Joe/portal.html)

Note: The GitHub Pages version runs portal.html as a standalone page. For full Mongoose OS integration, run locally.

## 📄 License

Open source - feel free to use and modify!

## 👤 Author

@pewpi-infinity

---

**Previous README content preserved below for reference**

---
# Rogers

This is the README for the Rogers/Infinity Voice Module app.

---

## 🧱 Research Notes (mixed)
**Timestamp:** 2025-12-23T10:59:44Z

### 🟨 Extracted Data
- Repo files: 30
- Code present: 7

### 🩷 Investigative
What is missing, blocked, or undefined.

### 🟩 Engineering / Tools
What advances this repo fastest.

### 🟥 Routes Worth More
Two next build paths with reasoning.

### 🟧 Decisions
Immediate next step and why.

---

## 🧱 Research Notes (mixed)
**Timestamp:** 2025-12-23T19:26:48Z

### 🟨 Extracted Data
- Repo files: 32
- Code present: 7

### 🩷 Investigative
What is missing, blocked, or undefined.

### 🟩 Engineering / Tools
What advances this repo fastest.

### 🟥 Routes Worth More
Two next build paths with reasoning.

### 🟧 Decisions
Immediate next step and why.
