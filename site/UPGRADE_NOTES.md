# 一站一密（OSOP）2025 升级说明

## 已完成的更新

1. **manifest 升级**
   - 从 manifest v2 升级到 v3 标准
   - 新增了多种尺寸的图标支持
   - 更新了权限模型和内容安全策略

2. **用户界面现代化**
   - 创建了全新的 popup.html 设计，具有现代科技感
   - 重新设计了网页版 index.html，采用响应式布局
   - 添加了暗黑模式支持
   - 采用 Orbitron 字体增强科技感
   - 优化了色彩方案和视觉层次结构

3. **功能增强**
   - 添加了密码一键复制功能
   - 添加了密码可视化切换功能
   - 实现了密码生成倒计时进度条
   - 优化了表单验证和错误提示
   - 改进了动画和交互效果

4. **技术改进**
   - 采用现代 JavaScript 语法
   - 优化了代码结构和组织
   - 确保与最新浏览器兼容
   - 分离了扩展和网页版的代码

## 待完成的任务

1. **资源文件下载**
   - 下载 Orbitron 字体文件（Regular 和 Bold 的 woff/woff2 格式）
   - 下载 jQuery 3.6.0 版本
   - 创建不同尺寸的图标文件（16x16, 32x32, 48x48）

2. **测试和验证**
   - 在 Chrome 最新版本上测试扩展功能
   - 测试网页版在不同设备和浏览器上的兼容性
   - 验证密码生成算法的正确性

3. **发布准备**
   - 打包 Chrome 扩展文件
   - 更新 Chrome Web Store 的扩展信息和截图
   - 更新 GitHub 项目说明

## 文件变更清单

- `site/manifest.json` - 更新为 manifest v3 标准
- `site/popup.html` - 新创建的扩展弹出页面
- `site/index.html` - 新创建的网页版入口
- `site/css/new/popup.css` - 扩展弹出页样式
- `site/css/new/web.css` - 网页版样式
- `site/scripts/new/popup.js` - 扩展弹出页脚本
- `site/scripts/new/web.js` - 网页版脚本
- `site/images/README.md` - 图标需求说明
- `README.md` - 更新了项目说明

## 注意事项

1. 所有依赖资源本地化
2. 保持原有密码生成算法不变，确保向后兼容性
3. 随着 Chrome 对 Manifest V2 的逐步弃用，此次升级是必要的
4. 网页版和扩展版共享核心功能，但使用不同的界面设计适应各自场景 