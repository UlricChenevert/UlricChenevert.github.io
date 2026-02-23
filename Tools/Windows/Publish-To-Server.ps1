<#
.SYNOPSIS
Deploys the .NET and React application bundle to a remote Linux server via SCP.
.PARAMETER Username
The SSH username for the remote server.
.PARAMETER ServerIP
The IP address or domain name of the remote server.
#>
param(
    [Parameter(Mandatory=$true)]
    [string]$Username,

    [Parameter(Mandatory=$true)]
    [string]$ServerIP
)

# --- Configuration ---
$DirectoryName = "Blog"
$LocalDir = ".\$DirectoryName"
$RemotePath = "/var/www/" # The target parent path on the server
$Framework = "net9.0" # IMPORTANT: Update this to your target framework version
$ServiceName = "Blog"

# --- 1. Preparation and Build ---
Write-Host "--- 1. Building and Publishing Application ---"

# Clean up previous local deployment folder if it exists
if (Test-Path $LocalDir) {
    Remove-Item -Path $LocalDir -Recurse -Force
}

# 1a. Publish the .NET Backend
Write-Host "Publishing .NET Backend..."
dotnet publish --configuration Release
$PublishPath = ".\bin\Release\$Framework\publish"

# 1b. Build the React Frontend
# Write-Host "Building React Frontend..."
# Set-Location "UI"
# npm run build
# $DistPath = ".\dist"
# Set-Location ".."

# 1c. Create Deployment Bundle
Write-Host "Creating deployment bundle in $LocalDir..."
mkdir $LocalDir
# mkdir "$LocalDir\Backend"
# mkdir "$LocalDir\Frontend"

# Move Backend Files
Move-Item -Path "$PublishPath\*" -Destination "$LocalDir" -Force

# Move Frontend Files
# Move-Item -Path "UI\$DistPath\*" -Destination "$LocalDir\Frontend" -Force

# --- 2. Secure Copy (SCP) to Server ---
Write-Host "--- 2. Deploying $LocalDir to "$Username@${ServerIP}:~/" ---"

# NOTE: The 'scp' command must be available in your PowerShell PATH (e.g., via Git, WSL, or OpenSSH).
# $scpExitCode = 0
try {
    # Execute scp. Use '-r' for recursive copy.
    # The '2>&1' redirects error output to standard output for capture.
    scp -r $LocalDir "$Username@${ServerIP}:~/" 2>&1 | Out-Null
} catch {
    # If the command fails, the exit code is not always captured cleanly, so rely on subsequent check.
    Write-Warning "SCP command encountered an issue."
}

# Check the exit code of the last command (scp)
# $LASTEXITCODE is the built-in PowerShell variable for the exit code of external commands.
if ($LASTEXITCODE -eq 0) {
    Write-Host "Deployment successful! Files are now at ${ServerIP}:$RemotePath -ForegroundColor Green"
} else {
    Write-Host "Deployment failed (SCP Exit Code: $LASTEXITCODE). Check connection and credentials." -ForegroundColor Red
    $scpExitCode = $LASTEXITCODE
}

ssh -t $Username@${ServerIP} "sudo rsync -av --delete ~/$DirectoryName/ /var/www/$DirectoryName/;  sudo chown www-data:www-data /var/www/$DirectoryName -R; sudo systemctl restart apache2; sudo systemctl restart $ServiceName;"
# --- 3. Cleanup ---
Write-Host "--- 3. Cleaning up local directory $LocalDir ---"
Remove-Item -Path $LocalDir -Recurse -Force

# Exit with the scp error code if the deployment failed
if ($scpExitCode -ne 0) {
    exit $scpExitCode
}