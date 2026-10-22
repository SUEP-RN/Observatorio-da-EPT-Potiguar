# Servidor local só para testar o site no computador: http://localhost:8765
# Uso: powershell -ExecutionPolicy Bypass -File servidor-local.ps1   (Ctrl+C para parar)
param([int]$Porta = 8765)
$raiz = $PSScriptRoot
$tipos = @{ '.html' = 'text/html; charset=utf-8'; '.css' = 'text/css; charset=utf-8'; '.js' = 'text/javascript; charset=utf-8'
            '.png' = 'image/png'; '.jpg' = 'image/jpeg'; '.svg' = 'image/svg+xml'; '.ico' = 'image/x-icon'; '.md' = 'text/plain; charset=utf-8' }
$ouvinte = New-Object Net.HttpListener
$ouvinte.Prefixes.Add("http://localhost:$Porta/")
$ouvinte.Start()
Write-Host "Site em http://localhost:$Porta/  (Ctrl+C para parar)"
try {
    while ($ouvinte.IsListening) {
        $ctx = $ouvinte.GetContext()
        try {
            $caminho = [Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath.TrimStart('/'))
            if (-not $caminho) { $caminho = 'index.html' }
            $arquivo = [IO.Path]::GetFullPath((Join-Path $raiz $caminho))
            if ($arquivo.StartsWith($raiz) -and (Test-Path -LiteralPath $arquivo -PathType Leaf)) {
                $bytes = [IO.File]::ReadAllBytes($arquivo)
                $ext = [IO.Path]::GetExtension($arquivo).ToLower()
                $ctx.Response.ContentType = if ($tipos.ContainsKey($ext)) { $tipos[$ext] } else { 'application/octet-stream' }
                $ctx.Response.ContentLength64 = $bytes.Length
                $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
            } else {
                $ctx.Response.StatusCode = 404
            }
        } catch {
            Write-Host "Erro em $($ctx.Request.Url): $($_.Exception.Message)"
        } finally {
            try { $ctx.Response.Close() } catch {}
        }
    }
} finally { $ouvinte.Stop() }
