$c = Get-Content 'C:\Users\TheProject\Desktop\affan oromo\Sheek‑Bakrii‑Translator\sbs-font-base64.css' -Raw
$m = [regex]::Match($c,'data:font/truetype;charset=utf-8;base64,([A-Za-z0-9+/=]+)')
if ($m.Success) {
    $m.Groups[1].Value | Out-File 'C:\Users\TheProject\Desktop\affan oromo\Sheek‑Bakrii‑Translator\font-base64.txt' -NoNewline
}
Write-Host "Done"
