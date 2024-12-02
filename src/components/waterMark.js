class T_watermark {
  constructor(params) {
    this.params = Object.assign(
      {
        container: document.body,
        width: 250,
        height: 150,
        fontSize: 16,
        font: "microsoft yahei",
        color: "#cccccc",
        content: "watermark",
        rotate: -30,
        zIndex: 1000,
        opacity: 0.5,
      },
      params
    );

    this.params.x = this.isNullOrUndefined(params.x) ? this.params.width / 2 : params.x;
    this.params.y = this.isNullOrUndefined(params.y) ? this.params.height / 2 : params.y;

    this.watermarkHost = null; // 宿主元素
    this.styleContent = ""; // 存储基准样式内容
    this.shadowObserver = null; // 观察 ShadowRoot 的变化
    this.checkInterval = null; // 定时检查任务
  }

  isNullOrUndefined(n) {
    return n === null || n === undefined;
  }

  isDom(n) {
    return typeof HTMLElement === "object"
      ? n instanceof HTMLElement
      : n && typeof n === "object" && n.nodeType === 1 && typeof n.nodeName === "string";
  }

  toDataURL() {
    const { width, height, fontSize, font, color, rotate, content, opacity, x, y } = this.params;
    const canvas = document.createElement("canvas");
    canvas.setAttribute("width", `${width}px`);
    canvas.setAttribute("height", `${height}px`);

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

  createWatermarkDom() {
    const { container } = this.params;
    if (!this.isDom(container)) return;

    // 清理旧水印
    if (this.watermarkHost) {
      this.watermarkHost.remove();
    }

    // 创建宿主元素
    this.watermarkHost = document.createElement("div");
    this.watermarkHost.setAttribute("class", "open-watermark");
    this.watermarkHost.style.position = "absolute";
    this.watermarkHost.style.top = "0";
    this.watermarkHost.style.left = "0";
    this.watermarkHost.style.width = "100%";
    this.watermarkHost.style.height = "100%";
    this.watermarkHost.style.zIndex = this.params.zIndex;
    this.watermarkHost.style.pointerEvents = "none";

    // 创建 Shadow DOM
    const shadowRoot = this.watermarkHost.attachShadow({ mode: "closed" });

    // 添加样式和内容到 ShadowRoot
    const style = document.createElement("style");
    this.styleContent = `
      :host {
        display: block;
        width: 100%;
        height: 100%;
        background-repeat: repeat;
        background-image: url('${this.toDataURL()}');
      }
    `;
    style.textContent = this.styleContent;
    shadowRoot.appendChild(style);

    // 插入到容器
    container.style.position = "relative";
    container.insertBefore(this.watermarkHost, container.firstChild);

    // 开始监听 Shadow DOM
    this.startShadowObserver(shadowRoot, style);
  }

  startShadowObserver(shadowRoot, style) {
    // 监听 ShadowRoot 内部变化
    this.shadowObserver = new MutationObserver(() => {
      // 检查样式内容是否被修改
      if (style.textContent !== this.styleContent) {
        style.textContent = this.styleContent; // 恢复样式
      }
    });

    // 开始观察
    this.shadowObserver.observe(shadowRoot, {
      characterData: true,
      childList: true,
      subtree: true,
    });

    // 定时检查任务
    this.startIntervalCheck();
  }

  startIntervalCheck() {
    // 定时检查水印的完整性
    this.checkInterval = setInterval(() => {
      if (!this.watermarkHost || !document.body.contains(this.watermarkHost)) {
        this.output(); // 水印丢失或被删除，重新生成
      }
    }, 1000); // 每秒检查一次
  }

  output() {
    this.createWatermarkDom();
  }

  destroy() {
    if (this.watermarkHost) {
      this.watermarkHost.remove();
      this.watermarkHost = null;
    }
    if (this.shadowObserver) {
      this.shadowObserver.disconnect();
      this.shadowObserver = null;
    }
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
    }
  }
}

export default T_watermark;
