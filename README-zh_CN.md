<h1 align="center">
TaroWaterMark
</h1>

<div align="center">[English](README.md) | 简体中文</div>

## ✨ 特性

- 基于画布的渲染：使用 HTML5 画布生成清晰高效的水印。
- Shadow DOM 保护：保护水印免受篡改或意外删除。
- 动态再生：如果水印被删除或更改，会自动恢复水印。
- 轻便易用：最少的设置和无缝集成到任何项目中。
- 无依赖性：完全独立，不依赖外部库。
- 完全可定制：微调文本、大小、旋转、颜色、不透明度和定位，以满足您的需求。

## ✨ 配置

| 参数      | 类型        | 默认值            | 描述                                | 是否必填 |
| --------- | ----------- | ----------------- | ----------------------------------- | -------- |
| container | HTMLElement | document.body     | 应用水印的 DOM 容器                 |          |
| width     | number      | 250               | 水印块的宽度                        |          |
| height    | number      | 150               | 水印块的高度                        |          |
| fontSize  | number      | 16                | 水印文字的字体大小                  |          |
| font      | string      | "microsoft yahei" | 水印文字的字体样式                  |          |
| color     | string      | "#cccccc"         | 水印文字的颜色                      |          |
| content   | string      | "watermark"       | 水印显示的内容/文字                 |          |
| rotate    | number      | -30               | 水印文字的旋转角度（单位：度）      |          |
| zIndex    | number      | 1000              | 水印容器的 z-index 值，控制显示层级 |          |
| opacity   | number      | 0.5               | 水印的透明度                        |          |

## ✨ 使用

## ✨ 开发

```bash
$ git clone git@github.com:InhamiRei/TaroWaterMark.git
$ cd ng-zorro-antd
```

```bash
$ yarn
$ yarn start
```
