# PowerShell Script to Fix Maven Issues
# Run this script in the backend folder

Write-Host "Step 1: Clearing Maven cache for Quarkus..." -ForegroundColor Yellow
Remove-Item -Recurse -Force "$env:USERPROFILE\.m2\repository\io\quarkus" -ErrorAction SilentlyContinue
Write-Host "Maven cache cleared!" -ForegroundColor Green

Write-Host "`nStep 2: Cleaning Maven project..." -ForegroundColor Yellow
mvn clean
Write-Host "Clean completed!" -ForegroundColor Green

Write-Host "`nStep 3: Installing dependencies with force update..." -ForegroundColor Yellow
mvn install -U
Write-Host "Dependencies installed!" -ForegroundColor Green

Write-Host "`nStep 4: Starting Quarkus in dev mode..." -ForegroundColor Yellow
Write-Host "If Step 3 was successful, you can now run: mvn quarkus:dev" -ForegroundColor Cyan
