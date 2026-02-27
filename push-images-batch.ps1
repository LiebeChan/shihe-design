#!/usr/bin/env powershell
# 分批推送脚本 - 将图片分批上传到GitHub

$repoPath = "C:\Users\yuyuchen\workspace\shihe-site"
$batchSize = 20  # 每批推送的图片数量

cd $repoPath

# 获取所有未跟踪的图片文件
$images = git ls-files --others --exclude-standard images/
$totalImages = $images.Count
Write-Host "总共需要推送 $totalImages 张图片"

$batchNumber = 1
for ($i = 0; $i -lt $totalImages; $i += $batchSize) {
    $batch = $images | Select-Object -Skip $i -First $batchSize
    $count = $batch.Count
    
    Write-Host "正在推送第 $batchNumber 批，共 $count 张图片..."
    
    # 添加这批图片
    $batch | ForEach-Object { git add "$_" }
    
    # 提交
    git commit -m "添加图片批次 $batchNumber - 共 $count 张"
    
    # 推送
    git push origin main
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "第 $batchNumber 批推送成功"
    } else {
        Write-Host "第 $batchNumber 批推送失败，请重试"
        break
    }
    
    $batchNumber++
    Start-Sleep -Seconds 5  # 等待5秒避免连接问题
}

Write-Host "推送完成！"
