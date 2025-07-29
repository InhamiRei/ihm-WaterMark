// 工具方法：判断是否为 null 或 undefined
export const isNullOrUndefined = (value) => {
  return value === null || value === undefined;
};

// 工具方法：判断是否为函数
export const isFunction = (value) => {
  return typeof value === "function";
};

// 工具方法：判断是否为 DOM 节点
export const isDom = (value) => {
  return typeof HTMLElement === "object"
    ? value instanceof HTMLElement
    : value && typeof value === "object" && value.nodeType === 1 && typeof value.nodeName === "string";
};
