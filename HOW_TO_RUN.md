# 🚀 How to Run SPOTME

## Method 1: Double-Click (Easiest) ⭐

1. **Open the `spotme` folder** in Windows File Explorer
2. **Double-click** `start-server.bat`
3. A terminal window will open showing the server starting
4. **Wait for this message:**
   ```
   Starting up http-server, serving ./
   Available on:
     http://localhost:3000
   ```
5. **Open your browser** and go to:
   - **User Portal**: http://localhost:3000/portals/user/
   - **Photographer**: http://localhost:3000/portals/photographer/
   - **Host Portal**: http://localhost:3000/portals/host/
   - **Admin Portal**: http://localhost:3000/portals/admin/

**Note:** Keep the terminal window open while using the website!

---

## Method 2: PowerShell Script

1. **Right-click** on `start-server.ps1`
2. Select **"Run with PowerShell"**
3. If you see a security warning, type `Y` and press Enter
4. Wait for the server to start
5. Open your browser to the URLs above

---

## Method 3: Manual Command (PowerShell)

1. **Open PowerShell** (Press `Win + X`, then select "Windows PowerShell" or "Terminal")
2. **Navigate to the project folder:**
   ```powershell
   cd "C:\Users\M Prianka\spotme"
   ```
3. **Start the server:**
   ```powershell
   npx --yes http-server . -p 3000
   ```
4. Wait for the "Available on" message
5. Open your browser to the URLs above

---

## Method 4: Manual Command (Command Prompt)

1. **Open Command Prompt** (Press `Win + R`, type `cmd`, press Enter)
2. **Navigate to the project folder:**
   ```cmd
   cd "C:\Users\M Prianka\spotme"
   ```
3. **Start the server:**
   ```cmd
   npx --yes http-server . -p 3000
   ```
4. Wait for the "Available on" message
5. Open your browser to the URLs above

---

## 🌐 Access URLs

Once the server is running, open these in your browser:

| Portal | URL |
|--------|-----|
| **User Portal** | http://localhost:3000/portals/user/ |
| **Photographer Portal** | http://localhost:3000/portals/photographer/ |
| **Host Portal** | http://localhost:3000/portals/host/ |
| **Admin Portal** | http://localhost:3000/portals/admin/ |

---

## ✅ How to Know It's Working

You should see:
- **In the terminal:** "Starting up http-server, serving ./"
- **In your browser:** The SPOTME website with navbar, sidebar, and content

---

## ⚠️ Troubleshooting

### Port 3000 Already in Use?

**Option A: Use a different port**
```powershell
npx --yes http-server . -p 8080
```
Then use: http://localhost:8080/portals/user/

**Option B: Stop the process using port 3000**
```powershell
# Find what's using port 3000
netstat -ano | findstr :3000

# Kill it (replace <PID> with the number from above)
Stop-Process -Id <PID> -Force
```

### "Cannot GET /" Error?

- Make sure you're accessing: `http://localhost:3000/portals/user/`
- NOT just: `http://localhost:3000/`
- The `/portals/user/` part is important!

### Browser Shows Blank Page?

1. **Open Browser Console** (Press `F12`)
2. **Check for errors** (red text in Console tab)
3. **Make sure you're using:** `http://localhost:3000` (NOT `file://`)
4. **Try a different browser** (Chrome, Firefox, Edge)

### "npx is not recognized"?

You need Node.js installed:
1. Download from: https://nodejs.org/
2. Install it
3. Restart your terminal
4. Try again

---

## 🛑 How to Stop the Server

1. **Go to the terminal window** where the server is running
2. **Press `Ctrl + C`**
3. The server will stop

---

## 📝 Quick Reference

**Start Server:**
```powershell
npx --yes http-server . -p 3000
```

**Check if running:**
```powershell
netstat -ano | findstr :3000
```

**Stop server:**
- Press `Ctrl + C` in the terminal

**Access portals:**
- http://localhost:3000/portals/user/
- http://localhost:3000/portals/photographer/
- http://localhost:3000/portals/host/
- http://localhost:3000/portals/admin/

---

*That's it! The easiest way is to just double-click `start-server.bat` and open your browser.*

