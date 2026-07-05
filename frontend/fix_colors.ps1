$file = 'c:\Users\hii\OneDrive\Documents\SK-Radius\SK-Radius\frontend\src\pages\TR069.jsx'
$content = Get-Content $file -Raw -Encoding UTF8

# Root wrapper bg: pure near-black to ISPRadius warm dark
$content = $content -replace 'bg-\[#050505\] min-h-screen', 'bg-[#161719] min-h-screen'

# Section backgrounds
$content = $content -replace 'bg-\[#050505\]', 'bg-[#161719]'
$content = $content -replace 'bg-\[#0a0a0a\]', 'bg-[#161719]'
$content = $content -replace 'bg-\[#0d0d0e\]', 'bg-[#151515]'

# Section heading colors: text-white -> text-[#c0c0c0] for major headings only
$content = $content -replace 'text-4xl md:text-5xl font-bold text-white', 'text-4xl md:text-5xl font-bold text-[#c0c0c0]'
$content = $content -replace 'text-3xl md:text-4xl font-bold text-white', 'text-3xl md:text-4xl font-bold text-[#c0c0c0]'
$content = $content -replace 'text-4xl font-bold text-white', 'text-4xl font-bold text-[#c0c0c0]'
$content = $content -replace 'text-3xl font-bold text-white', 'text-3xl font-bold text-[#c0c0c0]'
$content = $content -replace 'text-2xl font-bold text-white', 'text-2xl font-bold text-[#c0c0c0]'
$content = $content -replace 'text-xl font-bold text-white', 'text-xl font-bold text-[#c0c0c0]'

# Accordion bg in router config panel
$content = $content -replace 'bg-\[#151515\] rounded-xl overflow-hidden data', 'bg-[#1a1a1c] rounded-xl overflow-hidden data'

Set-Content $file $content -Encoding UTF8
Write-Host 'Color theme applied successfully'
