<h1>ihm-WaterMark</h1>

[English](README.md) | 简体中文

## ✨ 特性

- 基于画布的渲染：使用 HTML5 画布生成清晰高效的水印。
- 动态再生：如果水印被删除或更改，会自动恢复水印。
- 轻便易用：最少的设置和无缝集成到任何项目中。
- 无依赖性：完全独立，不依赖外部库。
- 完全可定制：微调文本、大小、旋转、颜色、不透明度和定位，以满足您的需求。

## ✨ 配置

| 参数名    | 默认值            | 是否必填 | 描述                                                      |
| --------- | ----------------- | -------- | --------------------------------------------------------- |
| container | document.body     | 是       | 水印将附加到的容器元素，通常用于指定水印覆盖的区域。      |
| width     | 250               | -        | 水印的宽度（像素）。                                      |
| height    | 150               | -        | 水印的高度（像素）。                                      |
| fontSize  | 20                | -        | 水印文字的字体大小（像素）。                              |
| font      | "microsoft yahei" | -        | 水印文字的字体。                                          |
| color     | "#cccccc"         | -        | 水印文字的颜色，默认为浅灰色。                            |
| content   | "watermark"       | -        | 水印的文字内容。                                          |
| rotate    | -30               | -        | 水印的旋转角度（单位：度）。                              |
| zIndex    | 1000              | -        | 水印容器的 z-index，用于控制层叠上下文中的层级。          |
| opacity   | 0.5               | -        | 水印的透明度，范围是 0（完全透明）到 1（完全不透明）。    |
| x         | null（默认居中）  | -        | 水印文字的起始 X 坐标。如果为 null，默认值为 width / 2。  |
| y         | null（默认居中）  | -        | 水印文字的起始 Y 坐标。如果为 null，默认值为 height / 2。 |

## ✨ 使用

1. 直接使用

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
const watermark = new TWaterMark({
  container: document.getElementById("water-mark"),
});

watermark.output();
```

2. 作为 npm 包使用

- 安装依赖包

```bash
# npm
npm install ihm-watermark
# yarn
yarn add ihm-watermark
```

- 导入

```javascript
import TWaterMark from "ihm-watermark";
```

- 初始化水印

```javascript
const watermark = new TWaterMark({
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
