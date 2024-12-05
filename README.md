<h1 align="center">
TaroWaterMark
</h1>

<div align="center">English | [简体中文](README-zh_CN.md)</div>

## ✨ Features

- Canvas-based Rendering: Generates crisp and efficient watermarks using HTML5 canvas.
- Shadow DOM Protection: Protects the watermark from tampering or accidental removal.
- Dynamic Regeneration: Automatically restores the watermark if removed or altered.
- Lightweight and Easy to Use: Minimal setup and seamless integration into any project.
- No Dependencies: Fully standalone, with no reliance on external libraries.
- Fully Customizable: Fine-tune text, size, rotation, color, opacity, and positioning to match your needs.

## ✨ Configuration Options

| container | HTMLElement | document.body     | The DOM element to apply the watermark.     | Required |
| --------- | ----------- | ----------------- | ------------------------------------------- | -------- |
| width     | number      | 250               | Width of the watermark block.               |          |
| height    | number      | 150               | Height of the watermark block.              |          |
| fontSize  | number      | 16                | Font size of the watermark text.            |          |
| font      | string      | "microsoft yahei" | Font family of the watermark text.          |          |
| color     | string      | "#cccccc"         | Color of the watermark text.                |          |
| content   | string      | "watermark"       | The content/text of the watermark.          |          |
| rotate    | number      | -30               | Rotation angle of the watermark in degrees. |          |
| zIndex    | number      | 1000              | Z-index of the watermark container.         |          |
| opacity   | number      | 0.5               | Opacity level of the watermark.             |          |

## ✨ Usage

## ✨ Development

```bash
$ git clone git@github.com:InhamiRei/TaroWaterMark.git
$ cd ng-zorro-antd
```

```bash
$ yarn
$ yarn start
```
