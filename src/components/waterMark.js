import { isDom } from "../utils/common.js";

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

    // 创建默认参数
    const defaultParams = {
      // 水印将附加到的容器元素，默认为整个文档（document.body）
      container: config.container,
      // 水印的宽度，单位是像素
      width: 120,
      // 水印的高度，单位是像素
      height: 64,
      // 水印的文字内容，支持字符串或字符串数组
      content: "",
      // 图片源，建议导出2倍或3倍图，优先级高(支持base64格式)
      image: null,
      // 水印的旋转角度，单位是度，默认倾斜 -22°
      rotate: -22,
      // 水印容器的 z-index，用于控制其在层叠上下文中的层级
      zIndex: 2025,
      // 水印的透明度，范围是 0（完全透明）到 1（完全不透明）
      opacity: 0.5,
      // 水印文字的起始 X 坐标（如果为 null，则使用 width 的一半作为默认值）
      x: null,
      // 水印文字的起始 Y 坐标（如果为 null，则使用 height 的一半作为默认值）
      y: null,
      // 水印之间的间距，gap: [水平间距, 垂直间距]
      gap: [100, 100],
      // 水印距离容器左上角的偏移量，默认为 gap/2
      offset: null,
      // 文字样式
      font: {
        color: "rgba(0,0,0,0.15)",
        fontSize: 16,
        fontWeight: "normal",
        fontFamily: "sans-serif",
        fontStyle: "normal",
        textAlign: "center",
      },
    };

    // 处理font参数的特殊合并
    let mergedConfig = { ...config };
    if (config.font) {
      mergedConfig.font = {
        ...defaultParams.font,
        ...config.font,
      };
    }

    // 合并配置
    this.params = {
      ...defaultParams,
      ...mergedConfig,
    };

    // gap参数归一化
    if (!Array.isArray(this.params.gap) || this.params.gap.length !== 2) {
      this.params.gap = [100, 100];
    }

    // 初始化offset参数，默认为gap的一半
    if (!this.params.offset || !Array.isArray(this.params.offset) || this.params.offset.length !== 2) {
      this.params.offset = [this.params.gap[0] / 2, this.params.gap[1] / 2];
    }

    // 设置默认的 x, y 坐标
    this.params.x = this.params.x !== null && this.params.x !== undefined ? this.params.x : this.params.width / 2;
    this.params.y = this.params.y !== null && this.params.y !== undefined ? this.params.y : this.params.height / 2;

    // 存储样式字符串的Promise
    this.styleStrPromise = this.generateStyle();
    this.styleStr = ""; // 初始化为空字符串，后续异步更新

    // 初始化观察器
    this.containerObserver = new MutationObserver(this.handleContainerMutations.bind(this));
    this.watermarkObserver = new MutationObserver(this.handleWatermarkMutations.bind(this));

    // 样式准备好后自动输出
    this.styleStrPromise.then((style) => {
      this.styleStr = style;
    });
  }

  // 生成样式字符串
  async generateStyle() {
    // 计算背景尺寸
    const bgWidth = this.params.width + this.params.gap[0];
    const bgHeight = this.params.height + this.params.gap[1];

    // 获取DataURL，可能是Promise或直接返回值
    const dataURL = await Promise.resolve(this.toDataURL());

    return `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: ${this.params.zIndex};
      pointer-events: none;
      background-repeat: repeat;
      background-position: ${this.params.offset[0]}px ${this.params.offset[1]}px;
      background-size: ${bgWidth}px ${bgHeight}px;
      background-image: url('${dataURL}');
    `;
  }

  // 绘制水印的 DataURL
  toDataURL() {
    const { width, height, rotate, content, opacity, x, y, gap, image, font } = this.params;
    // 创建画布，画布大小为width+gap[0], height+gap[1]
    const canvas = document.createElement("canvas");
    // 确保画布足够大，特别是在有旋转的情况下
    canvas.width = width + gap[0];
    canvas.height = height + gap[1];
    const ctx = canvas.getContext("2d");
    if (!ctx) return "";

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.textBaseline = "top";
    ctx.textAlign = font.textAlign || "center";
    ctx.fillStyle = font.color;
    ctx.globalAlpha = opacity;
    // 构建字体样式字符串
    const fontStyleString = `${font.fontStyle} ${font.fontWeight} ${font.fontSize}px ${font.fontFamily}`;
    ctx.font = fontStyleString;

    // 如果提供了图片水印，则优先使用图片
    if (image) {
      // 创建一个Promise用于处理图片加载
      return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = "anonymous";

        // 图片加载成功处理
        img.onload = () => {
          // 计算图片缩放比例，保持原始宽高比
          const imgRatio = img.width / img.height;
          const drawWidth = Math.min(width * 0.8, img.width);
          const drawHeight = drawWidth / imgRatio;

          // 恢复之前的状态，避免叠加旋转效果
          ctx.restore();

          // 单独处理图片绘制和旋转
          ctx.save();
          // 将坐标系原点移到水印中心点
          ctx.translate(x, y);

          // 应用旋转
          ctx.rotate((Math.PI / 180) * rotate);

          // 在中心点绘制图片（原点已经是中心点，所以坐标用负的一半宽高）
          ctx.drawImage(img, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);

          ctx.restore();
          resolve(canvas.toDataURL());
        };

        // 图片加载失败处理，回退到文本水印
        img.onerror = () => {
          // 清空画布重新开始
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.textBaseline = "top";
          ctx.textAlign = font.textAlign || "center";
          ctx.fillStyle = font.color;
          ctx.globalAlpha = opacity;
          ctx.font = fontStyleString;

          // 渲染文本水印
          this.renderTextWatermark(ctx, content, x, y, font.fontSize);
          resolve(canvas.toDataURL());
        };

        // 设置图片源
        img.src = image;
      });
    } else {
      // 没有图片，直接渲染文本水印
      this.renderTextWatermark(ctx, content, x, y, font.fontSize);
      return canvas.toDataURL();
    }
  }

  // 渲染文本水印
  renderTextWatermark(ctx, content, x, y, fontSize) {
    // 保存当前状态
    ctx.save();

    // 重置转换矩阵，确保从干净的状态开始
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    // 移动到水印中心点
    ctx.translate(x, y);

    // 应用旋转（从参数获取旋转角度）
    ctx.rotate((Math.PI / 180) * this.params.rotate);

    // 处理多行文本
    if (Array.isArray(content)) {
      const lineHeight = fontSize * 1.5; // 行高是字体大小的1.5倍
      const totalHeight = lineHeight * (content.length - 1);
      const startY = -totalHeight / 2; // 相对于中心点的Y坐标

      content.forEach((text, index) => {
        const lineY = startY + lineHeight * index;
        // 在原点绘制文本（因为已经平移到中心点）
        if (ctx.textAlign === "center") {
          ctx.fillText(text, 0, lineY);
        } else {
          ctx.fillText(text, -ctx.measureText(text).width / 2, lineY);
        }
      });
    } else {
      // 在原点绘制文本
      if (ctx.textAlign === "center") {
        ctx.fillText(content, 0, -fontSize / 2);
      } else {
        ctx.fillText(content, -ctx.measureText(content).width / 2, -fontSize / 2);
      }
    }

    // 恢复状态
    ctx.restore();
  }

  // 获取或创建水印 DOM
  getOrCreateWatermarkDom() {
    let watermarkDom = this.params.container.querySelector(".ihm-watermark"); // 限定在当前容器内查找
    if (!watermarkDom) {
      watermarkDom = document.createElement("div");
      watermarkDom.setAttribute("class", "ihm-watermark");
      this.params.container.style.position = "relative"; // 确保容器有 position 属性
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
  async updateWatermarkStyle() {
    const watermarkDom = this.getOrCreateWatermarkDom();
    const currentStyle = watermarkDom.getAttribute("style");

    // 如果样式字符串为空，则等待生成完成
    if (!this.styleStr) {
      this.styleStr = await this.styleStrPromise;
    }

    if (currentStyle !== this.styleStr) {
      watermarkDom.setAttribute("style", this.styleStr);
    }
  }

  // 处理容器 DOM 的变更
  handleContainerMutations(mutationsList, observer) {
    mutationsList.forEach((mutation) => {
      const watermarkDom = this.params.container.querySelector(".ihm-watermark"); // 当前容器查找
      if (!watermarkDom) {
        this.updateWatermarkStyle(); // 如果水印 DOM 被移除，重新创建
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
  async output() {
    await this.updateWatermarkStyle();
    this.containerObserver.observe(this.params.container, {
      attributes: true,
      childList: true,
      characterData: true,
    });
  }

  // 销毁水印
  destroy() {
    const watermarkDom = this.params.container.querySelector(".ihm-watermark"); // 限定在当前容器查找
    if (watermarkDom) {
      watermarkDom.remove();
    }
    this.watermarkObserver.disconnect();
    this.containerObserver.disconnect();
  }

  // 更新配置并重新生成水印
  async update(config) {
    // 更新参数
    if (config) {
      // 处理font参数的特殊合并
      if (config.font) {
        this.params.font = {
          ...this.params.font,
          ...config.font,
        };
        delete config.font; // 从config中删除，避免被下面的展开覆盖
      }

      this.params = {
        ...this.params,
        ...config,
      };

      // gap参数归一化
      if (!Array.isArray(this.params.gap) || this.params.gap.length !== 2) {
        this.params.gap = [100, 100];
      }

      // 更新offset参数
      if (!this.params.offset || !Array.isArray(this.params.offset) || this.params.offset.length !== 2) {
        this.params.offset = [this.params.gap[0] / 2, this.params.gap[1] / 2];
      }

      // 更新默认的 x, y 坐标（如果需要）
      if (config.width !== undefined || this.params.x === null || this.params.x === undefined) {
        this.params.x = this.params.x !== null && this.params.x !== undefined ? this.params.x : this.params.width / 2;
      }
      if (config.height !== undefined || this.params.y === null || this.params.y === undefined) {
        this.params.y = this.params.y !== null && this.params.y !== undefined ? this.params.y : this.params.height / 2;
      }

      // 生成新的样式
      this.styleStrPromise = this.generateStyle();
      this.styleStr = await this.styleStrPromise;

      // 更新水印
      await this.updateWatermarkStyle();
    }
  }
}
