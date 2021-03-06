/**
 * 导入这个是为了本地测试，对于 Chrome 插件实际运行时不起作用
 */
import PTPlugin from "../background/service";
import { EAction } from "../interface/common";

export default class Extension {
  public isExtensionMode: boolean = false;
  constructor() {
    if (window["chrome"] && window.chrome.extension) {
      this.isExtensionMode = true;
    }
  }

  /**
   * 向背景页发送指令
   * @param action 需要执行的命令
   * @param callback 回调函数
   * @param data 附加数据
   */
  public sendRequest(
    action: EAction,
    callback?: any,
    data?: any
  ): Promise<any> {
    return new Promise<any>((resolve?: any, reject?: any) => {
      if (this.isExtensionMode) {
        chrome.runtime.sendMessage(
          {
            action,
            data
          },
          (result: any) => {
            callback && callback(result);
            resolve(result);
          }
        );
        return;
      }

      const PTService = new PTPlugin(true);
      PTService.requestMessage({
        action,
        data
      }).then((result: any) => {
        callback && callback.call(this, result);
        resolve(result);
      });
    });
  }
}
