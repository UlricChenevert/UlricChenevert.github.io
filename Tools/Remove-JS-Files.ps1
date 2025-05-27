[CmdletBinding()]
param(
    [Parameter(Mandatory=$false, Position=0)]
    [string]$Path = ".",

    [Parameter(Mandatory=$false)]
    [switch]$OnlyCurrentDirectory
)

# Define the file extensions to remove.
$ExtensionsToRemove = @(".js", ".js.map")

Write-Host "Searching for files to remove in: $Path"
Write-Host "File extensions to remove: $($ExtensionsToRemove -join ', ')"
Write-Host ""

try {
    # Prepare parameters for Get-ChildItem.
    $GCIParams = @{
        Path = $Path
        File = $true # Only get files, not directories
    }

    # If -OnlyCurrentDirectory switch is NOT provided, enable recursion.
    if (-not $OnlyCurrentDirectory) {
        $GCIParams.Recurse = $true
        Write-Host "Including subdirectories (recursive search)."
    } else {
        Write-Host "Searching only in the specified directory (non-recursive)."
    }

    # Get all files with the specified extensions based on recursion setting.
    # -ErrorAction SilentlyContinue suppresses errors for inaccessible paths,
    # though try/catch block handles general errors.
    $FilesToDelete = Get-ChildItem @GCIParams | Where-Object {
        $ExtensionsToRemove -contains $_.Extension
    }

    if ($FilesToDelete.Count -eq 0) {
        Write-Host "No .js or .js.map files found in '$Path' or its subdirectories (if recursive) or just '$Path' (if non-recursive)."
    } else {
        Write-Host "Found $($FilesToDelete.Count) files to delete:"
        $FilesToDelete | ForEach-Object {
            Write-Host "  - $($_.FullName)"
        }
        Write-Host ""

        # Prompt the user for confirmation before deleting.
        # This is a safety measure to prevent accidental deletion.
        $Confirmation = Read-Host "Are you sure you want to delete these files? (Y/N)"

        if ($Confirmation -eq "Y" -or $Confirmation -eq "y") {
            Write-Host "Deleting files..."
            # Remove the files. -Force handles read-only files. -ErrorAction Stop
            # ensures that if a file cannot be deleted, the script stops.
            $FilesToDelete | Remove-Item -Force -ErrorAction Stop

            Write-Host ""
            Write-Host "Successfully removed all specified files."
        } else {
            Write-Host "File deletion cancelled by user."
        }
    }
}
catch {
    # Catch any errors during the process and provide a user-friendly message.
    Write-Error "An error occurred: $($_.Exception.Message)"
    Write-Error "Ensure you have the necessary permissions to access and modify files in the specified path."
}
