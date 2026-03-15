$sourceImages = @(
    "C:\Users\Akshay\Videos\SPE 2\Photos\WhatsApp Image 2025-03-11 at 11.26.39_8686e39a.jpg",
    "C:\Users\Akshay\Videos\SPE 2\Photos\WhatsApp Image 2025-03-11 at 11.26.36_86d86b6c.jpg",
    "C:\Users\Akshay\Videos\SPE 2\Photos\WhatsApp Image 2025-03-11 at 11.26.36_3026af18.jpg",
    "C:\Users\Akshay\Videos\SPE 2\Photos\WhatsApp Image 2025-03-11 at 11.26.37_5b4ed24d.jpg",
    "C:\Users\Akshay\Videos\SPE 2\Photos\WhatsApp Image 2025-03-11 at 11.26.37_54f054d9.jpg",
    "C:\Users\Akshay\Videos\SPE 2\Photos\WhatsApp Image 2025-03-11 at 11.26.38_2d87d6e1.jpg",
    "C:\Users\Akshay\Videos\SPE 2\Photos\WhatsApp Image 2025-03-11 at 11.26.38_58ff5b6a.jpg",
    "C:\Users\Akshay\Videos\SPE 2\Photos\WhatsApp Image 2025-03-11 at 11.26.38_a5511303.jpg",
    "C:\Users\Akshay\Videos\SPE 2\Photos\WhatsApp Image 2025-03-11 at 11.26.39_2b443625.jpg"
)

$destinationDir = "public\images\dashboard"

# Ensure destination directory exists
if (-not (Test-Path $destinationDir)) {
    New-Item -ItemType Directory -Path $destinationDir -Force
}

# Copy each image with a numbered filename
for ($i = 0; $i -lt $sourceImages.Length; $i++) {
    $destFile = Join-Path $destinationDir "graph$($i+1).jpg"
    Copy-Item -Path $sourceImages[$i] -Destination $destFile -Force
    Write-Host "Copied $($sourceImages[$i]) to $destFile"
} 