<h1>ihm-WaterMark</h1>

English | [简体中文](README-zh_CN.md)

## ✨ Features

- **Canvas-based Rendering**: Utilizes HTML5 canvas to generate clear and efficient watermarks.
- **Dynamic Regeneration**: Automatically restores the watermark if it's removed or changed.
- **Lightweight and Easy to Use**: Minimal setup and seamless integration into any project.
- **No Dependencies**: Completely independent, does not rely on external libraries.
- **Fully Customizable**: Fine-tune text, size, rotation, color, opacity, and positioning to meet your needs.

## ✨ Configuration

| Parameter | Default Value         | Required | Description                                                                                |
| --------- | --------------------- | -------- | ------------------------------------------------------------------------------------------ |
| container | -                     | Yes      | The container element to which the watermark will be attached                              |
| width     | 120                   | No       | Width of the watermark (in pixels)                                                         |
| height    | 64                    | No       | Height of the watermark (in pixels)                                                        |
| content   | ""                    | No       | The text content of the watermark, supports string or string array                         |
| image     | null                  | No       | Image source, 2x or 3x size recommended, high priority (supports base64 format)            |
| rotate    | -22                   | No       | Rotation angle of the watermark (in degrees)                                               |
| zIndex    | 9                     | No       | z-index of the watermark container, used to control its layer in the stacking context      |
| opacity   | 0.5                   | No       | Opacity of the watermark, ranging from 0 (completely transparent) to 1 (completely opaque) |
| gap       | [100, 100]            | No       | Spacing between watermarks, format: [horizontal spacing, vertical spacing]                 |
| offset    | [gap[0]/2, gap[1]/2]  | No       | Offset of watermark from the top-left corner of the container, default is half of gap      |
| font      | See description below | No       | Style configuration for watermark text                                                     |

### font Configuration

| Parameter  | Default Value    | Required | Description                       |
| ---------- | ---------------- | -------- | --------------------------------- |
| color      | rgba(0,0,0,0.15) | No       | Color of the watermark text       |
| fontSize   | 16               | No       | Font size of the text (in pixels) |
| fontWeight | normal           | No       | Font weight of the text           |
| fontFamily | sans-serif       | No       | Font family of the text           |
| fontStyle  | normal           | No       | Font style of the text            |
| textAlign  | center           | No       | Text alignment                    |

## ✨ Usage

### ① Direct Usage

- Include the file

```html
<script src="../dist/main.js"></script>
```

- Create a DOM element

```html
<div id="water-mark" class="water-mark"></div>
```

- Initialize the watermark

```javascript
const watermark = new ihmWaterMark({
  container: document.getElementById("water-mark"),
});

watermark.output();
```

### ② Using as an npm package

- Install the dependency package

```bash
# npm
npm install ihm-watermark
# yarn
yarn add ihm-watermark
```

- Import the package

```javascript
import ihmWaterMark from "ihm-watermark";
```

- Initialize the watermark

```javascript
const watermark = new ihmWaterMark({
  container: document.getElementById("water-mark"),
});

watermark.output();
```

## ✨ Development

1. Clone the repository

```bash
git clone https://github.com/InhamiRei/ihm-WaterMark.git
cd ihm-WaterMark/
```

2. Install dependencies

```bash
yarn
```

3. demo.html is an example file that can be run directly to view the effects.

4. After modifying the code, build the package

```bash
yarn build
```

## ✨ Pictures

![Pictures1](https://inhami.com/static/githubImage/ihm-watermark/watermark-1.png)
