# Deployment script for portfolio
Write-Host "Starting deployment process..." -ForegroundColor Green

# Set up environment paths
$env:Path = "$env:USERPROFILE\Downloads\node-v24.13.0-win-x64;C:\Program Files\Git\cmd;" + $env:Path

# Navigate to project directory
Set-Location "C:\Users\tt7817i\xxxkvastarasxxx_portfolio"

# Build the project
Write-Host "`nBuilding project..." -ForegroundColor Yellow
& "$env:USERPROFILE\Downloads\node-v24.13.0-win-x64\npm.cmd" run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "Build successful!" -ForegroundColor Green
    
    # Deploy to GitHub Pages
    Write-Host "`nDeploying to GitHub Pages..." -ForegroundColor Yellow
    & "$env:USERPROFILE\Downloads\node-v24.13.0-win-x64\npx.cmd" gh-pages -d dist
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`nDeployment complete!" -ForegroundColor Green
        Write-Host "Your site will be live at https://tarastymoshenko.dev in 1-2 minutes" -ForegroundColor Cyan
    } else {
        Write-Host "Deployment failed!" -ForegroundColor Red
    }
} else {
    Write-Host "Build failed!" -ForegroundColor Red
}
