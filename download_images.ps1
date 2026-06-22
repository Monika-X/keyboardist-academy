$images = @(
    @{ url = "https://images.unsplash.com/photo-1552422535-c45813c61732?q=80&w=800"; name = "advanced.png" },
    @{ url = "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=800"; name = "theory.png" },
    @{ url = "https://images.unsplash.com/photo-1571327073757-9c60e359d335?q=80&w=800"; name = "fundamentals.png" },
    @{ url = "https://images.unsplash.com/photo-1513883049090-d0b7439799bf?q=80&w=800"; name = "founder.png" },
    @{ url = "https://images.unsplash.com/photo-1542120526-40a2d2127db8?q=80&w=800"; name = "default.jpg" }
)

$dir = "c:\Users\LOKII_1526\Desktop\keyboardist-academy\frontend\assets\images"

foreach ($img in $images) {
    $outFile = Join-Path -Path $dir -ChildPath $img.name
    Write-Host "Downloading $($img.url) to $outFile..."
    Invoke-WebRequest -Uri $img.url -OutFile $outFile
}
Write-Host "Done!"
