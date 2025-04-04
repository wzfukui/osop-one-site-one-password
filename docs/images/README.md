# 图标文件需求

为了符合Chrome扩展的manifest v3要求，需要准备以下尺寸的图标文件：

- `lock-16.png` (16x16)
- `lock-32.png` (32x32)
- `lock-48.png` (48x48)
- `lock-128.png` (已有)

这些图标应该保持与现有`lock-128.png`一致的风格，只是尺寸不同。

## 图标制作建议

可以使用图像编辑软件（如Photoshop、GIMP或Figma）从现有的`lock-128.png`创建较小尺寸的版本，注意保持图标清晰度和风格一致性。

## 图标放置

所有图标文件应放置在`site/images/`目录下，并在manifest.json中引用。 