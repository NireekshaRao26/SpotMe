# Quick Start Guide - SPOTME Server

## 🚀 Starting the Server

### Option 1: PowerShell (Recommended)
```powershell
cd C:\Users\"M Prianka"\spotme
npx --yes http-server . -p 3000
```

### Option 2: Batch File
Double-click `start-server.bat`

### Option 3: Manual Command
```bash
npx --yes http-server . -p 3000
```

## 🌐 Access URLs

Once the server is running, open these URLs in your browser:

### User Portal
```
http://localhost:3000/portals/user/
```

### Photographer Portal
```
http://localhost:3000/portals/photographer/
```

### Host Portal
```
http://localhost:3000/portals/host/
```

### Admin Portal
```
http://localhost:3000/portals/admin/
```

## ⚠️ Troubleshooting

### Server Not Starting?

1. **Check if port 3000 is in use:**
   ```powershell
   netstat -ano | findstr :3000
   ```

2. **Kill any process using port 3000:**
   ```powershell
   # Find the PID from netstat, then:
   Stop-Process -Id <PID> -Force
   ```

3. **Try a different port:**
   ```powershell
   npx --yes http-server . -p 8080
   ```
   Then use: http://localhost:8080/portals/user/

### Browser Shows "Cannot Connect"?

1. Make sure the server is running (check terminal output)
2. Try `http://127.0.0.1:3000/portals/user/` instead
3. Check Windows Firewall isn't blocking the connection
4. Try a different browser

### Files Not Loading?

1. Make sure you're in the correct directory (`spotme` folder)
2. Check that `portals` folder exists
3. Verify file paths in browser console (F12)

### Module Import Errors?

- Make sure you're accessing via `http://localhost:3000` (NOT `file://`)
- ES6 modules require HTTP server
- Check browser console for specific errors

## ✅ Server Running Successfully?

You should see output like:
```
Starting up http-server, serving ./
Available on:
  http://localhost:3000
  http://127.0.0.1:3000
Hit CTRL-C to stop the server
```

## 🔧 Alternative: Use Python (if Node.js has issues)

```powershell
python -m http.server 3000
```

Then access: http://localhost:3000/portals/user/

---

*If you're still having issues, check the browser console (F12) for specific error messages.*

