# 需要添加灯箱功能的项目文件夹
$projects = @('2','3','4','5','6','7','8','9','10','11','12','39','70','ace-cafe','chaobei','dongan','gallery','hutong-jewelry','menglong','miomi','miomi-1','naifufu','paodaofang')

# 灯箱 HTML 代码
$lightboxHtml = @"

  <!-- Lightbox -->
  <div id="lightbox" class="lightbox" onclick="closeLightbox()">
    <span class="lightbox-close">&times;</span>
    <img id="lightbox-img" src="" alt="">
  </div>

  <script>
    function openLightbox(src) {
      document.getElementById('lightbox-img').src = src;
      document.getElementById('lightbox').classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      document.getElementById('lightbox').classList.remove('active');
      document.body.style.overflow = '';
    }

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeLightbox();
    });
  </script>
"@

foreach ($project in $projects) {
    $filePath = "C:\Users\yuyuchen\workspace\shihe-site\$project\index.html"
    
    if (Test-Path $filePath) {
        $content = Get-Content $filePath -Raw -Encoding UTF8
        
        # 检查是否已经有灯箱
        if ($content -notmatch 'id="lightbox"') {
            # 为 gallery 中的 img 添加 onclick
            $content = $content -replace '<img src="([^"]+)" alt="([^"]+)">', '<img src="$1" alt="$2" onclick="openLightbox(this.src)">'
            
            # 在 </main> 前添加灯箱代码
            $content = $content -replace '(\s*</main>)', "$lightboxHtml`$1"
            
            # 保存文件
            $content | Set-Content $filePath -Encoding UTF8 -NoNewline
            Write-Host "Updated: $project"
        } else {
            Write-Host "Skipped (already has lightbox): $project"
        }
    } else {
        Write-Host "Not found: $project"
    }
}

Write-Host "Done!"
