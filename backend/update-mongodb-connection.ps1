# MongoDB Atlas Connection String Update Script
# This script will help you update your .env file with the correct MongoDB connection string

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "MongoDB Atlas Connection Setup" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "✅ Your MongoDB Atlas cluster 'ecommerce' is ACTIVE!" -ForegroundColor Green
Write-Host "`nConnection Details:" -ForegroundColor Yellow
Write-Host "  Username: yeolevinit24_db_user"
Write-Host "  Cluster: ecommerce.s35pu3s.mongodb.net"
Write-Host "  Database: ecommerce`n"

Write-Host "Your connection string template:" -ForegroundColor Yellow
Write-Host "mongodb+srv://yeolevinit24_db_user:<db_password>@ecommerce.s35pu3s.mongodb.net/?appName=ecommerce`n" -ForegroundColor White

Write-Host "========================================`n" -ForegroundColor Cyan

# Prompt for password
$password = Read-Host "Enter your MongoDB database password (the one you set for 'yeolevinit24_db_user')"

if ([string]::IsNullOrWhiteSpace($password)) {
    Write-Host "`n❌ Password cannot be empty!" -ForegroundColor Red
    Write-Host "`nIf you don't remember your password:" -ForegroundColor Yellow
    Write-Host "  1. Go to MongoDB Atlas → Database Access" -ForegroundColor White
    Write-Host "  2. Click 'Edit' on user 'yeolevinit24_db_user'" -ForegroundColor White
    Write-Host "  3. Click 'Edit Password' and set a new one`n" -ForegroundColor White
    exit 1
}

# URL encode the password for special characters
Add-Type -AssemblyName System.Web
$encodedPassword = [System.Web.HttpUtility]::UrlEncode($password)

# Create the full connection string
$connectionString = "mongodb+srv://yeolevinit24_db_user:$encodedPassword@ecommerce.s35pu3s.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=ecommerce"

Write-Host "`n✅ Connection string created!" -ForegroundColor Green
Write-Host "`nUpdating .env file..." -ForegroundColor Yellow

# Read the current .env file
$envPath = ".env"
if (Test-Path $envPath) {
    $envContent = Get-Content $envPath -Raw
    
    # Replace the MONGODB_URI line
    $envContent = $envContent -replace 'MONGODB_URI=.*', "MONGODB_URI=$connectionString"
    
    # Write back to .env
    Set-Content -Path $envPath -Value $envContent -NoNewline
    
    Write-Host "✅ .env file updated successfully!" -ForegroundColor Green
} else {
    Write-Host "❌ .env file not found!" -ForegroundColor Red
    exit 1
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "  1. Restart your backend server (Ctrl+C then 'npm run dev')" -ForegroundColor White
Write-Host "  2. Look for '✅ MongoDB Connected' message" -ForegroundColor White
Write-Host "  3. Your backend will be connected to MongoDB Atlas!`n" -ForegroundColor White
Write-Host "========================================`n" -ForegroundColor Cyan
