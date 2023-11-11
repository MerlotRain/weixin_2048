// pages/2048/2048.ts

/// <reference path="./main.ts" />
/// <reference path="./grid.ts" />

Page({
  data: {
    hidden: false,
    start: "开始游戏",
    num: [],
    score: 0,
    bestScore: 0,
    endMsg: "",
    over: false,
  },

  onLoad() {},

  onReady() {
    if (wx.getStorageSync("highScore")) {
      wx.setStorageSync("highScore", 0);
    }
    this.gameStart();
  },

  gameStart() {
    let main = new Main(4);
    this.setData({ main: main, bestScore: wx.getStorageSync("highScore") });

    this.setData({
        hidden:true,
        over:false,
        score:0
    })
  },

  gameOver() {

  },

  
  

  onShow() {},

  onHide() {},

  onUnload() {},

  onPullDownRefresh() {},

  onReachBottom() {},

  onShareAppMessage() {
      return {
          title:'2048小游戏',
          desc: '来试试你能达到多少分',
          path: 'page/user?id=123'   
      }
  },
});
