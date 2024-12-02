import T_watermark from "./components/waterMark.js";
/**
 * 时间轴入口函数
 * @returns 返回时间轴组件实例
 */
function TWatermark(config) {
  return new T_watermark(config);
}

window.TWatermark = TWatermark;
export default TWatermark;
