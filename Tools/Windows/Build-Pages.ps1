param (
    [Parameter(Mandatory=$true, HelpMessage="Enter the path of the .md files")]
    [ValidateNotNullOrEmpty()]
    [string]$inputPath,     
    
    [Parameter(Mandatory=$true, HelpMessage="Enter the path where the html files will go")]
    [ValidateNotNullOrEmpty()]
    [string]$outputPath         
)

$mdFiles = Get-ChildItem -Path $inputPath -Filter "*.md"
$count = 0

# For each all files in a directory
foreach ($mdfile in $mdFiles) {
    $fileWithoutExtension = [System.IO.Path]::GetFileNameWithoutExtension($mdFile.Name)

    $mdFilePath = Join-Path -Path $inputPath -ChildPath $mdfile.Name
    $htmlFilePath = Join-Path -Path $outputPath -ChildPath "$fileWithoutExtension.html"

    # Excute pandoc on them
    # Place in other directory
    pandoc $mdFilePath -f markdown -t html -o $htmlFilePath --section-divs 

    $count++
}

Write-Host "Converted all md files from $inputPath to $outputPath/ $count files affected."