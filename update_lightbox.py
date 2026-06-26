import os
import re

projects = ['2','3','5','6','7','8','9','11','12','39','70','ace-cafe','chaobei','dongan','gallery','hutong-jewelry','menglong','miomi','miomi-1','naifufu','paodaofang']

lightbox_code = '''

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
'''

for project in projects:
    filepath = f'C:\\Users\\yuyuchen\\workspace\\shihe-site\\{project}\\index.html'
    
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        if 'id="lightbox"' not in content:
            # Add onclick to gallery images
            content = re.sub(r'<img src="([^"]+)" alt="([^"]+)">', r'<img src="\1" alt="\2" onclick="openLightbox(this.src)">', content)
            
            # Add lightbox before </main>
            content = re.sub(r'(\s*</main>)', lightbox_code + r'\1', content)
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f'[OK] Updated: {project}')
        else:
            print(f'[SKIP] Skipped: {project}')
    else:
        print(f'[MISS] Not found: {project}')

print('\nDone!')
