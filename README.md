# TypeMaster - 盲打练习富文本编辑器

一款寓教于乐的打字练习应用，通过导入文档进行盲打练习，提升用户的打字技能和文本记忆能力。

## 🚀 核心特色

- **创新的盲打模式**：不管你输入什么内容，编辑器都会显示导入文档的原始内容
- **多格式支持**：支持 TXT 和 Markdown 文件导入
- **渐进式显示**：随着输入逐步显示文档内容，增强练习趣味性
- **循环练习**：文档内容显示完毕后自动从头开始循环
- **现代化界面**：基于 React + TypeScript + Tailwind CSS 构建

## 📦 技术栈

- **前端框架**：React 18+
- **类型系统**：TypeScript 5+
- **样式框架**：Tailwind CSS 3+
- **构建工具**：Vite
- **状态管理**：React Hooks

## 🛠️ 安装与运行

### 环境要求

- Node.js 18+ 
- npm 或 yarn

### 安装依赖

```bash
cd typemaster
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 📖 使用指南

### 基本使用流程

1. **导入文档**：点击工具栏的导入按钮选择 TXT 或 MD 文件
2. **开始练习**：在编辑器中输入任何内容
3. **观察显示**：不管输入什么，都会显示导入文档的内容
4. **循环练习**：文档显示完毕后会自动重新开始

### 支持的文件格式

- `.txt` - 纯文本文件
- `.md` - Markdown 格式文件

### 文件大小限制

- 最大支持 1MB 的文本文件

## 🏗️ 项目结构

```
src/
├── components/           # React 组件
│   ├── Editor/          # 编辑器相关组件
│   │   ├── RichTextEditor.tsx
│   │   ├── FileImporter.tsx
│   │   └── EditorToolbar.tsx
│   ├── UI/              # UI 基础组件
│   │   ├── Button.tsx
│   │   ├── FileDropzone.tsx
│   │   └── Icons.tsx
│   └── Layout/          # 布局组件
│       ├── Header.tsx
│       └── MainLayout.tsx
├── hooks/               # 自定义 Hooks
│   ├── useFileImport.ts
│   └── useBlindTyping.ts
├── utils/               # 工具函数
│   ├── fileParser.ts
│   └── textProcessor.ts
├── types/               # TypeScript 类型定义
│   ├── editor.ts
│   └── file.ts
└── styles/              # 样式文件
    └── globals.css
```

## 🧩 核心功能实现

### 盲打练习逻辑

盲打练习的核心算法：

```typescript
const calculateDisplayContent = (inputCount: number, originalContent: string) => {
  const contentLength = originalContent.length;
  if (contentLength === 0) return '';
  
  const displayLength = inputCount % contentLength;
  return originalContent.substring(0, displayLength);
};
```

### 文件导入处理

支持拖拽和点击两种导入方式：

- 文件格式验证
- 大小限制检查
- 内容解析和预处理
- 错误处理和用户提示

## 📱 响应式设计

- **移动端**：< 768px - 单列布局，工具栏简化
- **平板端**：768px - 1024px - 两列布局
- **桌面端**：> 1024px - 完整功能展示

## 🎯 开发计划

### 已完成功能

- ✅ 基础富文本编辑器
- ✅ 文件导入功能
- ✅ 盲打练习核心逻辑
- ✅ 响应式布局
- ✅ 统计信息显示

### 后续优化方向

- [ ] 打字速度统计
- [ ] 练习记录保存
- [ ] 多主题支持
- [ ] PWA 支持
- [ ] 性能优化

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 开源协议

MIT License

---

**开发信息**
- 版本：v1.0.0
- 最后更新：2025-08-31
