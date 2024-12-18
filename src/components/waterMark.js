import { isDom } from "./utils";

export default class ihm_WaterMark {
  constructor(config) {
    // container是必填的，需要知道加在哪个地方
    if (!config || !config.container) {
      throw new Error("The 'container' parameter is required and must be a valid DOM element.");
    }
    // 确保 container 是一个 DOM 元素
    if (!isDom(config.container)) {
      throw new Error("The 'container' parameter must be a valid DOM element.");
    }

    this.params = {
      // 水印将附加到的容器元素，默认为整个文档（document.body）
      container: config.container,
      // 水印的宽度，单位是像素
      width: 250,
      // 水印的高度，单位是像素
      height: 150,
      // 水印文字的字体大小，单位是像素
      fontSize: 20,
      // 水印文字的字体
      font: "microsoft yahei",
      // 水印文字的颜色，默认为浅灰色
      color: "#cccccc",
      // 水印的文字内容
      content: "watermark",
      // 水印的旋转角度，单位是度，默认倾斜 -30°
      rotate: -30,
      // 水印容器的 z-index，用于控制其在层叠上下文中的层级
      zIndex: 1000,
      // 水印的透明度，范围是 0（完全透明）到 1（完全不透明）
      opacity: 0.5,
      // 水印文字的起始 X 坐标（如果为 null，则使用 width 的一半作为默认值）
      x: null,
      // 水印文字的起始 Y 坐标（如果为 null，则使用 height 的一半作为默认值）
      y: null,
      ...config,
    };

    // 设置默认的 x, y 坐标
    this.params.x = this.params.x !== null && this.params.x !== undefined ? this.params.x : this.params.width / 2;
    this.params.y = this.params.y !== null && this.params.y !== undefined ? this.params.y : this.params.height / 2;

    this.styleStr = this.generateStyle();

    // 初始化观察器
    this.containerObserver = new MutationObserver(this.handleContainerMutations.bind(this));
    this.watermarkObserver = new MutationObserver(this.handleWatermarkMutations.bind(this));
  }

  // 生成样式字符串
  generateStyle() {
    return `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: ${this.params.zIndex};
      pointer-events: none;
      background-repeat: repeat;
      background-image: url('${this.toDataURL()}');
    `;
  }

  // 绘制水印的 DataURL
  toDataURL() {
    const { width, height, fontSize, font, color, rotate, content, opacity, x, y } = this.params;

    // 创建画布
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, width, height);
      ctx.textBaseline = "top";
      ctx.textAlign = "left";
      ctx.fillStyle = color;
      ctx.globalAlpha = opacity;
      ctx.font = `${fontSize}px ${font}`;
      ctx.translate(x, y);
      ctx.rotate((Math.PI / 180) * rotate);
      ctx.translate(-x, -y - fontSize);
      ctx.fillText(content, x, y + fontSize);
    }

    return canvas.toDataURL();
  }

  // 获取或创建水印 DOM
  getOrCreateWatermarkDom() {
    let watermarkDom = document.querySelector(".ihm-watermark");
    if (!watermarkDom) {
      watermarkDom = document.createElement("div");
      watermarkDom.setAttribute("class", "ihm-watermark");
      this.params.container.style.position = "relative";
      this.params.container.insertBefore(watermarkDom, this.params.container.firstChild);

      this.watermarkObserver.observe(watermarkDom, {
        attributes: true,
        childList: true,
        subtree: true,
      });
    }
    return watermarkDom;
  }

  // 更新水印 DOM 的样式
  updateWatermarkStyle() {
    const watermarkDom = this.getOrCreateWatermarkDom();
    const currentStyle = watermarkDom.getAttribute("style");
    if (currentStyle !== this.styleStr) {
      watermarkDom.setAttribute("style", this.styleStr);
    }
  }

  // 处理容器 DOM 的变更
  handleContainerMutations(mutationsList, observer) {
    mutationsList.forEach((mutation) => {
      const watermarkDom = document.querySelector(".ihm-watermark");
      if (!watermarkDom) {
        this.updateWatermarkStyle();
      }
    });
  }

  // 处理水印 DOM 的变更
  handleWatermarkMutations(mutationsList, observer) {
    mutationsList.forEach((mutation) => {
      this.updateWatermarkStyle();
    });
  }

  // 输出水印
  output() {
    this.updateWatermarkStyle();
    this.containerObserver.observe(this.params.container, {
      attributes: true,
      childList: true,
      characterData: true,
    });
  }

  // 销毁水印
  destroy() {
    const watermarkDom = document.querySelector(".ihm-watermark");
    if (watermarkDom) {
      watermarkDom.remove();
    }
    this.watermarkObserver.disconnect();
    this.containerObserver.disconnect();
  }
}
