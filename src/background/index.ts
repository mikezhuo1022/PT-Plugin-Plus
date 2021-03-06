import PTPlugin from "./service";
import { filters } from "../service/filters";

const PTService = new PTPlugin();

// 监听由活动页面发来的消息事件
chrome.runtime.onMessage.addListener(function(request, sender, callback) {
  PTService.requestMessage(request, sender)
    .then((result: any) => {
      callback && callback(result);
    })
    .catch((result: any) => {
      callback && callback(result);
    });
  return true;
});
// chrome.extension.onRequest.addListener(function(request, sender, callback) {
//   PTService.requestMessage(request, sender)
//     .then((result: any) => {
//       callback && callback(result);
//     })
//     .catch((result: any) => {
//       callback && callback(result);
//     });
//   return true;
// });

// 暴露到 window 对象
Object.assign(window, {
  PTSevriceFilters: filters,
  PTBackgroundService: PTService
});
