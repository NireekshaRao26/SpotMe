Write-Host "Starting SPOTME Server..." -ForegroundColor Cyan
Write-Host ""
Write-Host "User Portal:     http://localhost:3000/portals/user/" -ForegroundColor Green
Write-Host "Photographer:    http://localhost:3000/portals/photographer/" -ForegroundColor Green
Write-Host "Host Portal:     http://localhost:3000/portals/host/" -ForegroundColor Green
Write-Host "Admin Portal:    http://localhost:3000/portals/admin/" -ForegroundColor Green
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""
npx --yes http-server -p 3000

