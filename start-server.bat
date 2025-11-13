@echo off
echo Starting SPOTME Server...
echo.
echo User Portal:     http://localhost:3000/portals/user/
echo Photographer:    http://localhost:3000/portals/photographer/
echo Host Portal:     http://localhost:3000/portals/host/
echo Admin Portal:    http://localhost:3000/portals/admin/
echo.
echo Press Ctrl+C to stop the server
echo.
npx --yes http-server -p 3000
pause

