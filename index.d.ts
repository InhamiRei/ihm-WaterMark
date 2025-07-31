declare module "ihm-watermark" {
  interface FontOptions {
    color?: string;
    fontSize?: number;
    fontWeight?: string | number;
    fontFamily?: string;
    fontStyle?: string;
    textAlign?: string;
  }

  interface WaterMarkConfig {
    // 必填参数
    container: HTMLElement;
    // 可选参数
    width?: number;
    height?: number;
    content?: string | string[];
    image?: string | null;
    rotate?: number;
    zIndex?: number;
    opacity?: number;
    gap?: [number, number];
    offset?: [number, number] | null;
    font?: FontOptions;
  }

  class ihm_WaterMark {
    constructor(config: WaterMarkConfig);

    params: WaterMarkConfig;
    watermarkX: number;
    watermarkY: number;
    styleStr: string;
    styleStrPromise: Promise<string>;
    containerObserver: MutationObserver;
    watermarkObserver: MutationObserver;

    generateStyle(): Promise<string>;
    toDataURL(): string | Promise<string>;
    renderTextWatermark(ctx: CanvasRenderingContext2D, content: string | string[], x: number, y: number, fontSize: number): void;
    getOrCreateWatermarkDom(): HTMLElement;
    updateWatermarkStyle(): Promise<void>;
    handleContainerMutations(mutationsList: MutationRecord[], observer: MutationObserver): void;
    handleWatermarkMutations(mutationsList: MutationRecord[], observer: MutationObserver): void;
    output(): Promise<void>;
    destroy(): void;
    update(config: Partial<WaterMarkConfig>): Promise<void>;
  }

  export default function ihmWaterMark(config: WaterMarkConfig): ihm_WaterMark;
}
