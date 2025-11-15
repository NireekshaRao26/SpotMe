# SPOTME - Event Photo Discovery Platform

A complete website for events (weddings, college fests, marathons, corporate gatherings) that helps attendees find photos of themselves using face recognition.

## 🚀 Quick Start

### Option 1: Node.js HTTP Server (Recommended)

1. Open PowerShell or Command Prompt in the project root directory
2. Run:

```bash
npx --yes http-server -p 3000
```

3. Open your browser and visit:
   - **User Portal**: http://localhost:3000/portals/user/
   - **Photographer Portal**: http://localhost:3000/portals/photographer/
   - **Host Portal**: http://localhost:3000/portals/host/
   - **Admin Portal**: http://localhost:3000/portals/admin/

### Option 2: VS Code Live Server

If you're using VS Code:
1. Install the "Live Server" extension
2. Right-click on any portal's `index.html` file
3. Select "Open with Live Server"

## 📁 Portal Structure

```
portals/
├── shared/          # Shared styles and utilities
│   ├── styles/
│   │   └── base.css
│   └── scripts/
│       └── core.js
├── user/            # User Portal
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── photographer/    # Photographer Portal
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── host/            # Host Portal
│   ├── index.html
│   ├── styles.css
│   └── app.js
└── admin/           # Admin Portal
    ├── index.html
    ├── styles.css
    └── app.js
```

## 🎯 Features

### User Portal
- Swipeable event timeline
- Password/QR code event access
- Upload photos or take selfie
- Face recognition photo search
- Interactive gallery with download

### Photographer Portal
- Bulk photo/video upload
- Event gallery view
- Face grouping preview
- Upload status tracking

### Host Portal
- View all uploaded media
- Filter by source (photographer/user)
- Activity tracking
- Download management

### Admin Portal
- System overview dashboard
- User/host/photographer management
- Event management
- System health monitoring

## ⚠️ Important Notes

- **ES6 Modules**: The portals use ES6 import/export, so they must be served over HTTP (not opened as `file://`)
- **Port Number**: If port 3000 is busy, use a different port (e.g., 8080, 5000)
- **Browser**: Works best in modern browsers (Chrome, Firefox, Edge, Safari)

## 🔧 Troubleshooting

**Port already in use?**
- Use a different port: `npx --yes http-server -p 8080`
- Or stop the process using port 3000

**CORS errors?**
- Make sure you're accessing via `http://localhost:3000` not `file://`

**Modules not loading?**
- Ensure you're running a server (not opening files directly)
- Check browser console for specific errors

