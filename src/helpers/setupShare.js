import wx from "weixin-js-sdk";

async function getData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      Referer: "xiedaimala.com",
    },
  });
  return response.json();
}

const setWechatConfig = (signPackage) => {
  wx.config({
    appId: signPackage.appId,
    url: signPackage.url,
    timestamp: signPackage.timestamp,
    nonceStr: signPackage.nonceStr,
    signature: signPackage.signature,
    jsApiList: ["updateTimelineShareData", "updateAppMessageShareData"],
  });
  wx.ready(() => {
    wx.updateAppMessageShareData({
      title: "Happy Programmer's Day!",
      desc: "You can Join the numbers and get to the 1024!",
      link: window.location.href,
      imgUrl:
        "https://static.xiedaimala.com/xdml/image/5939aa7c-d446-47c4-a9c1-ea1e52b10249/2021-10-21-17-54-39.png",
      success: () => {},
    });
    wx.updateTimelineShareData({
      title: "Happy Programmer's Day!",
      link: window.location.href,
      imgUrl:
        "https://static.xiedaimala.com/xdml/image/5939aa7c-d446-47c4-a9c1-ea1e52b10249/2021-10-21-17-54-39.png",
      success: () => {},
    });
  });
};

const setupShare = () => {
  if (window.location.hostname === "localhost") return;
  getData(
    `https://xiedaimala.com/wechat_h5_activities/wechat_config?share_url=${window.location.href}`
  ).then((data) => {
    setWechatConfig(data.sign_package);
  });
};

export { setupShare };
