# SPOTME Testing Checklist

## ✅ Pre-Test Verification

### File Structure
- [x] All portal folders exist (user, photographer, host, admin)
- [x] Shared scripts and styles are in place
- [x] All HTML files have proper structure
- [x] All JavaScript files are properly linked

### Code Quality
- [x] No linting errors in JavaScript files
- [x] All HTML IDs match JavaScript references
- [x] CSS classes are consistent across portals

---

## 🧪 User Portal Tests

### Navigation Flow
1. **Landing Page**
   - [ ] Page loads with timeline visible
   - [ ] Event cards are swipeable
   - [ ] Clicking "Access Event" navigates to Event Access page
   - [ ] Navbar shows SPOTME logo and logout button
   - [ ] Footer is visible

2. **Event Access Page**
   - [ ] Password input field is present
   - [ ] Entering correct password (e.g., "8732") shows success toast
   - [ ] After success, navigates to Dashboard
   - [ ] Invalid password shows error toast
   - [ ] QR scanner button shows info toast

3. **Dashboard**
   - [ ] Two cards visible: "Upload Photos" and "Find My Photos"
   - [ ] "Start Upload" button navigates to Upload page
   - [ ] "Launch Finder" button navigates to Find page
   - [ ] Sidebar navigation works

4. **Upload Page**
   - [ ] Dropzone is visible and functional
   - [ ] Can drag and drop files
   - [ ] Can click to browse files
   - [ ] Progress bar animates during upload
   - [ ] Success toast appears after upload
   - [ ] Navigates to Results page after upload
   - [ ] "Back to Dashboard" button works

5. **Find Page**
   - [ ] Selfie preview/capture interface visible
   - [ ] "Capture Selfie" button shows info toast
   - [ ] After search, shows success toast
   - [ ] Navigates to Results page
   - [ ] "Back to Dashboard" button works

6. **Results Page**
   - [ ] Gallery displays photos
   - [ ] Photos are clickable/downloadable
   - [ ] "Back to Dashboard" button works

### Interactive Features
- [ ] Toast notifications appear and auto-dismiss
- [ ] Button hover effects work
- [ ] Click animations (ripple effect) work
- [ ] Page transitions are smooth
- [ ] Hash navigation works (URL changes with #)

---

## 🧪 Photographer Portal Tests

### Login
- [ ] Login page is shown by default
- [ ] Entering Event ID and Code shows success toast
- [ ] After login, navigates to Dashboard
- [ ] Navbar and footer appear after login
- [ ] Invalid credentials show error toast

### Dashboard
- [ ] All sections accessible via sidebar
- [ ] Capture Queue shows pending imports
- [ ] Upload Center has functional dropzone
- [ ] Face Groups display correctly
- [ ] Host Visibility table shows data
- [ ] Logout button returns to login

### Upload Functionality
- [ ] File dropzone accepts files
- [ ] Progress bar shows during upload
- [ ] Success toast appears
- [ ] Gallery updates after upload

---

## 🧪 Host Portal Tests

### Login
- [ ] Login page is shown by default
- [ ] Entering Event ID and Password shows success toast
- [ ] After login, navigates to Overview
- [ ] Navbar and footer appear after login

### Dashboard Sections
- [ ] Overview shows metrics and activity feed
- [ ] Uploads section shows gallery
- [ ] Filter buttons work (All, Photographers, Attendees, Flagged)
- [ ] Filters section has power filter cards
- [ ] Downloads section shows bundles
- [ ] Logout button works

### Gallery Features
- [ ] Photos display correctly
- [ ] Filter buttons change displayed photos
- [ ] Source labels (Photographer/Attendee) are visible

---

## 🧪 Admin Portal Tests

### Login
- [ ] Login page is shown by default
- [ ] Entering Username and Password shows success toast
- [ ] After login, navigates to Overview
- [ ] Navbar and footer appear after login

### Dashboard Sections
- [ ] Overview shows system metrics
- [ ] Health signals display correctly
- [ ] Alert feed shows recent alerts
- [ ] Management section has cards for Users/Photographers/Hosts
- [ ] Events table displays event data
- [ ] Operations section shows pipeline info
- [ ] Logout button works

---

## 🎨 Shared Components Tests

### Navbar
- [ ] SPOTME logo is visible on all portals
- [ ] Portal name displays correctly
- [ ] Logout button is present and functional
- [ ] Navbar is sticky (stays at top when scrolling)

### Footer
- [ ] Footer appears on all pages (except login)
- [ ] Copyright text is visible
- [ ] Portal-specific tagline is correct

### Toast Notifications
- [ ] Success toasts have green border
- [ ] Error toasts have red border
- [ ] Info toasts have blue border
- [ ] Toasts auto-dismiss after 3 seconds
- [ ] Close button (×) works
- [ ] Multiple toasts stack correctly

### Page Transitions
- [ ] Smooth fade effect on page changes
- [ ] No jarring jumps or flashes
- [ ] Transitions complete in ~200ms

### Button Animations
- [ ] Hover effect (slight lift) works
- [ ] Click ripple effect appears
- [ ] Buttons return to normal after click

---

## 🔧 Browser Compatibility

Test in:
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (if available)
- [ ] Mobile browser (responsive design)

---

## 📱 Responsive Design

- [ ] Navbar adapts on mobile
- [ ] Sidebar becomes horizontal on tablets
- [ ] Buttons are touch-friendly
- [ ] Timeline is swipeable on mobile
- [ ] Gallery grid adjusts to screen size

---

## 🐛 Known Issues / Notes

- User Portal: Landing page should be visible by default (no hash needed)
- All portals: Login pages hide navbar/footer correctly
- Hash navigation: Works for User Portal, not needed for others
- Toast notifications: Stack from bottom-right
- Page transitions: Applied to all section changes

---

## ✅ Quick Test Commands

1. **Start Server**: `npx --yes http-server -p 3000`
2. **User Portal**: http://localhost:3000/portals/user/
3. **Photographer**: http://localhost:3000/portals/photographer/
4. **Host Portal**: http://localhost:3000/portals/host/
5. **Admin Portal**: http://localhost:3000/portals/admin/

---

*Run through this checklist to verify all functionality works as expected.*

