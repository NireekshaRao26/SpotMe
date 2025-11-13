# SPOTME Portal Structure & Navigation Guide

## 📁 Complete Folder Structure

```
spotme/
├── portals/
│   ├── shared/
│   │   ├── scripts/
│   │   │   └── core.js          # Shared utilities (navigation, toast, routing)
│   │   └── styles/
│   │       └── base.css         # Shared styles (navbar, footer, toast, login)
│   │
│   ├── user/                    # USER PORTAL
│   │   ├── index.html           # Main page (all sections)
│   │   ├── styles.css           # User-specific styles
│   │   └── app.js               # User portal logic & navigation
│   │
│   ├── photographer/            # PHOTOGRAPHER PORTAL
│   │   ├── index.html           # Main page (login + dashboard)
│   │   ├── styles.css           # Photographer-specific styles
│   │   └── app.js               # Photographer portal logic & navigation
│   │
│   ├── host/                    # HOST PORTAL
│   │   ├── index.html           # Main page (login + dashboard)
│   │   ├── styles.css           # Host-specific styles
│   │   └── app.js               # Host portal logic & navigation
│   │
│   └── admin/                   # ADMIN PORTAL
│       ├── index.html           # Main page (login + dashboard)
│       ├── styles.css           # Admin-specific styles
│       └── app.js               # Admin portal logic & navigation
│
├── README.md                    # Project documentation
├── PORTAL_STRUCTURE.md          # This file
├── start-server.bat             # Windows batch script
└── start-server.ps1             # PowerShell script
```

---

## 🔗 User Portal Navigation Flow

### Pages & Sections:
1. **Landing Page** (`#landing`)
   - Swipeable event timeline
   - Event cards with "Access Event" buttons
   - **Navigation**: Click event card → Event Access page

2. **Event Access Page** (`#event-access`)
   - Password input field
   - QR code scanner option
   - **Navigation**: 
     - Correct password → Dashboard
     - QR scan → Dashboard

3. **Dashboard** (`#dashboard`)
   - "Upload Photos" card → Upload page
   - "Find My Photos" card → Find page
   - **Navigation**:
     - "Start Upload" button → Upload page
     - "Launch Finder" button → Find page

4. **Upload Page** (`#upload`)
   - File dropzone
   - Upload progress bar
   - **Navigation**: 
     - "Back to Dashboard" → Dashboard
     - Successful upload → Results page

5. **Find Page** (`#find`)
   - Selfie capture/upload
   - Face matching interface
   - **Navigation**:
     - "Back to Dashboard" → Dashboard
     - Successful search → Results page

6. **Results Page** (`#results`)
   - Photo gallery with matches
   - Download options
   - **Navigation**: "Back to Dashboard" → Dashboard

### User Portal Features:
- ✅ Navbar with SPOTME logo, portal name, logout button
- ✅ Smooth page transitions
- ✅ Toast notifications ("Upload successful", "Photos found", etc.)
- ✅ Hover effects and click animations
- ✅ Footer on all pages
- ✅ Hash-based routing (`#landing`, `#dashboard`, etc.)

---

## 🔗 Photographer Portal Navigation Flow

### Pages & Sections:
1. **Login Page** (default)
   - Event ID input
   - Photographer Code input
   - **Navigation**: Successful login → Dashboard

2. **Dashboard Sections**:
   - **Capture Queue** (`#capture-queue`) - Pending imports
   - **Upload Center** (`#upload-center`) - Bulk uploads
   - **Face Groups** (`#face-groups`) - Grouped photos
   - **Host Visibility** (`#host-visibility`) - Status table

### Photographer Portal Features:
- ✅ Navbar with logout button
- ✅ Login page with validation
- ✅ Toast notifications for uploads
- ✅ Smooth section navigation
- ✅ Footer on all pages

---

## 🔗 Host Portal Navigation Flow

### Pages & Sections:
1. **Login Page** (default)
   - Event ID input
   - Host Password input
   - **Navigation**: Successful login → Overview

2. **Dashboard Sections**:
   - **Overview** (`#overview`) - Stats, activity feed, contributors
   - **Uploads** (`#uploads`) - All media with filters
   - **Filters** (`#filters`) - Power filters (face search, tags, collections)
   - **Downloads** (`#downloads`) - Download bundles

### Host Portal Features:
- ✅ Navbar with logout button
- ✅ Login page with validation
- ✅ Filter buttons (All, Photographers, Attendees, Flagged)
- ✅ Toast notifications
- ✅ Footer on all pages
- ✅ Gallery links to full views

---

## 🔗 Admin Portal Navigation Flow

### Pages & Sections:
1. **Login Page** (default)
   - Admin Username input
   - Admin Password input
   - **Navigation**: Successful login → Overview

2. **Dashboard Sections**:
   - **Overview** (`#admin-overview`) - System metrics, health, alerts
   - **Management** (`#admin-management`) - Users, Photographers, Hosts tabs
   - **Events** (`#admin-events`) - Event control table
   - **Operations** (`#admin-ops`) - Uploads, pipeline, logs

### Admin Portal Features:
- ✅ Navbar with logout button
- ✅ Login page with validation
- ✅ Management tabs for Users/Hosts/Photographers
- ✅ Toast notifications
- ✅ Footer on all pages
- ✅ System health monitoring

---

## 🎨 Shared Components

### Navbar (All Portals)
- SPOTME logo (clickable, returns to landing/dashboard)
- Portal name
- Logout button

### Footer (All Portals)
- Copyright notice
- Portal-specific tagline

### Toast Notifications
- **Success**: Green border (e.g., "Upload successful")
- **Error**: Red border (e.g., "Invalid password")
- **Info**: Blue border (e.g., "Searching for photos...")
- Auto-dismiss after 3 seconds
- Manual close button

### Page Transitions
- Smooth fade/opacity transitions
- 200ms transition duration
- Applied to all page changes

---

## 🚀 Access URLs

Once server is running on port 3000:

- **User Portal**: http://localhost:3000/portals/user/
- **Photographer Portal**: http://localhost:3000/portals/photographer/
- **Host Portal**: http://localhost:3000/portals/host/
- **Admin Portal**: http://localhost:3000/portals/admin/

---

## 📝 Navigation Summary

### User Portal
```
Landing → Event Access → Dashboard → Upload/Find → Results
         (password/QR)              (choose flow)  (back to dashboard)
```

### Photographer Portal
```
Login → Dashboard (Capture Queue / Upload Center / Face Groups / Host Visibility)
```

### Host Portal
```
Login → Dashboard (Overview / Uploads / Filters / Downloads)
```

### Admin Portal
```
Login → Dashboard (Overview / Management / Events / Operations)
```

---

## ✨ Interactive Features

1. **Hover Effects**: All buttons have smooth hover animations
2. **Click Animations**: Ripple effect on button clicks
3. **Toast Messages**: Contextual feedback for all actions
4. **Smooth Scrolling**: All navigation uses smooth scroll behavior
5. **Page Transitions**: Fade effects when switching pages/sections
6. **Responsive Design**: Works on mobile, tablet, and desktop

---

## 🔐 Authentication Flow

All portals (except User) start with a login page:
- **Photographer**: Event ID + Photographer Code
- **Host**: Event ID + Host Password
- **Admin**: Admin Username + Admin Password

After successful login:
- Toast notification appears
- Automatic redirect to dashboard after 1 second
- Navbar and footer become visible

Logout:
- Clears session state
- Returns to login page
- Shows logout confirmation toast

---

## 📱 Mobile Responsiveness

All portals are fully responsive:
- Navbar adapts to mobile layout
- Sidebar becomes horizontal on tablets
- Touch-friendly buttons and interactions
- Swipeable timelines on mobile devices

---

*Last Updated: November 2025*

