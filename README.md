<h1>ihm-WaterMark</h1>

English | [简体中文](README-zh_CN.md)

## ✨ Features

- **Canvas-based Rendering**: Utilizes HTML5 canvas to generate clear and efficient watermarks.
- **Dynamic Regeneration**: Automatically restores the watermark if it's removed or changed.
- **Lightweight and Easy to Use**: Minimal setup and seamless integration into any project.
- **No Dependencies**: Completely independent, does not rely on external libraries.
- **Fully Customizable**: Fine-tune text, size, rotation, color, opacity, and positioning to meet your needs.

## ✨ Configuration

| Parameter | Default Value              | Required | Description                                                                                                                                |
| --------- | -------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| container | document.body              | Yes      | The container element to which the watermark will be attached. Typically used to specify the area where the watermark should be displayed. |
| width     | 250                        | No       | Width of the watermark (in pixels).                                                                                                        |
| height    | 150                        | No       | Height of the watermark (in pixels).                                                                                                       |
| fontSize  | 20                         | No       | Font size of the watermark text (in pixels).                                                                                               |
| font      | "microsoft yahei"          | No       | Font of the watermark text.                                                                                                                |
| color     | "#cccccc"                  | No       | Color of the watermark text, default is light gray.                                                                                        |
| content   | "watermark"                | No       | The text content of the watermark.                                                                                                         |
| rotate    | -30                        | No       | Rotation angle of the watermark (in degrees).                                                                                              |
| zIndex    | 1000                       | No       | z-index of the watermark container, used to control its layer in the stacking context.                                                     |
| opacity   | 0.5                        | No       | Opacity of the watermark, ranging from 0 (completely transparent) to 1 (completely opaque).                                                |
| x         | null (default is centered) | No       | The starting X coordinate for the watermark text. If null, the default is width / 2.                                                       |
| y         | null (default is centered) | No       | The starting Y coordinate for the watermark text. If null, the default is height / 2.                                                      |

## ✨ Usage

1. Direct Usage

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
const watermark = new TWaterMark({
  container: document.getElementById("water-mark"),
});

watermark.output();
```

2. Using as an npm package

- Install the dependency package

```bash
# npm
npm install ihm-watermark
# yarn
yarn add ihm-watermark
```

- Import the package

```javascript
import TWaterMark from "ihm-watermark";
```

- Initialize the watermark

```javascript
const watermark = new TWaterMark({
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
