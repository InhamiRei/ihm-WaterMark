<h1>ihm-WaterMark</h1>

[English](README.md) | 简体中文

## ✨ 特性

- 基于画布的渲染：使用 HTML5 画布生成清晰高效的水印。
- 动态再生：如果水印被删除或更改，会自动恢复水印。
- 轻便易用：最少的设置和无缝集成到任何项目中。
- 无依赖性：完全独立，不依赖外部库。
- 完全可定制：微调文本、大小、旋转、颜色、不透明度和定位，以满足您的需求。

## ✨ 配置

| 参数名    | 默认值               | 是否必填 | 描述                                                       |
| --------- | -------------------- | -------- | ---------------------------------------------------------- |
| container | -                    | 是       | 水印将附加到的容器元素，通常用于指定水印覆盖的区域         |
| width     | 120                  | -        | 水印的宽度（像素）                                         |
| height    | 64                   | -        | 水印的高度（像素）                                         |
| content   | ""                   | -        | 水印的文字内容，支持字符串或字符串数组                     |
| image     | null                 | -        | 图片源，建议导出 2 倍或 3 倍图，优先级高(支持 base64 格式) |
| rotate    | -22                  | -        | 水印的旋转角度（单位：度）                                 |
| zIndex    | 9                    | -        | 水印容器的 z-index，用于控制层叠上下文中的层级             |
| opacity   | 0.5                  | -        | 水印的透明度，范围是 0（完全透明）到 1（完全不透明）       |
| x         | null（默认居中）     | -        | 水印文字的起始 X 坐标。如果为 null，默认值为 width/2       |
| y         | null（默认居中）     | -        | 水印文字的起始 Y 坐标。如果为 null，默认值为 height/2      |
| gap       | [100, 100]           | -        | 水印之间的间距，格式为[水平间距, 垂直间距]                 |
| offset    | [gap[0]/2, gap[1]/2] | -        | 水印距离容器左上角的偏移量，默认为 gap 的一半              |
| font      | 见下方说明           | -        | 水印文字的样式配置                                         |

### font 参数配置

| 参数名     | 默认值           | 是否必填 | 描述                       |
| ---------- | ---------------- | -------- | -------------------------- |
| color      | rgba(0,0,0,0.15) | -        | 水印文字的颜色             |
| fontSize   | 16               | -        | 水印文字的字体大小（像素） |
| fontWeight | normal           | -        | 水印文字的字重             |
| fontFamily | sans-serif       | -        | 水印文字的字体             |
| fontStyle  | normal           | -        | 水印文字的样式             |
| textAlign  | center           | -        | 水印文字的对齐方式         |

## ✨ 使用

### ① 直接使用

- 引入文件

```html
<script src="../dist/main.js"></script>
```

- 创建 dom 元素

```html
<div id="water-mark" class="water-mark"></div>
```

- 初始化水印

```javascript
const watermark = new ihmWaterMark({
  container: document.getElementById("water-mark"),
});

watermark.output();
```

### ② 作为 npm 包使用

- 安装依赖包

```bash
# npm
npm install ihm-watermark
# yarn
yarn add ihm-watermark
```

- 导入

```javascript
import ihmWaterMark from "ihm-watermark";
```

- 初始化水印

```javascript
const watermark = new ihmWaterMark({
  container: document.getElementById("water-mark"),
});

watermark.output();
```

## ✨ 开发

1. 拉取仓库

```bash
git clone https://github.com/InhamiRei/ihm-WaterMark.git
cd ihm-WaterMark/
```

2. 安装依赖

```bash
yarn
```

3. demo.html 为示例文件，可直接运行查看效果。

4. 修改好代码后打包

```bash
yarn build
```

## ✨ 效果

![效果图1](https://inhami.com/static/githubImage/ihm-watermark/watermark-1.png)
