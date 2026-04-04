Get-ChildItem -Recurse -Path "app" -Include "*.tsx","*.css" | ForEach-Object {
  $content = [System.IO.File]::ReadAllText($_.FullName)
  $updated = $content.Replace("var(--ocean-blue)", "var(--gold)")
  if ($content -ne $updated) {
    [System.IO.File]::WriteAllText($_.FullName, $updated)
    Write-Host "Updated: $($_.Name)"
  }
}
Write-Host "Done!"
