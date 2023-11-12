// pages/2048/2048.ts

/// <reference path="./main.ts" />
/// <reference path="./grid.ts" />

Page({
  data: {
    hidden: false,
    start: "开始游戏",
    num: [
      [-1, -1, -1, -1],
      [-1, -1, -1, -1],
      [-1, -1, -1, -1],
      [-1, -1, -1, -1],
    ],
    score: 0,
    bestScore: 0,
    endMsg: "",
    over: false,
    main: new Main(4),
  },

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
      hidden: true,
      over: false,
      score: 0,
      num: main.board.grid,
    });
  },

  gameOver() {
    this.setData({ over: true });

    if (this.data.score >= 2048) {
      this.setData({ endMsg: "恭喜达到2048" });
      wx.setStorageSync("highScore", this.data.score);
    } else if (this.data.score > this.data.bestScore) {
      this.setData({ endMsg: "创造新纪录！" });
      wx.setStorageSync("highScore", this.data.score);
    } else {
      this.setData({ endMsg: "游戏结束!" });
    }
  },

  touchStartX: 0,
  touchStartY: 0,
  touchEndX: 0,
  touchEndY: 0,

  touchStart(event: WechatMiniprogram.TouchEvent) {
    let touch = event.touches[0];
    this.touchStartX = touch.clientX;
    this.touchStartY = touch.clientY;
  },

  touchMove(event: WechatMiniprogram.TouchEvent) {
    let touch = event.touches[0];
    this.touchEndX = touch.clientX;
    this.touchEndY = touch.clientY;
  },

  touchEnd() {
    let disX = this.touchStartX - this.touchEndX;
    let absDisX = Math.abs(disX);
    let disY = this.touchStartY - this.touchEndY;
    let absDisY = Math.abs(disY);

    if (this.data.main.isOver()) {
      this.gameOver();
    } else {
      if (Math.max(absDisX, absDisY) > 10) {
        this.setData({ start: "重新开始" });
        let direction =
          absDisX > absDisY ? (disX < 0 ? 1 : 3) : disY < 0 ? 2 : 0;
        let data = this.data.main.move(direction);
        this.updateView(data);
      }
    }
  },

  updateView(data: number[][]) {
    let max = 0;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (data[i][j] != -1 && data[i][j] > max) max = data[i][j];
      }
    }
    this.setData({
      num: data,
      score: max,
    });
  },

  onShareAppMessage() {
    return {
      title: "2048小游戏",
      desc: "来试试你能达到多少分",
      path: "page/user?id=123",
    };
  },
});
