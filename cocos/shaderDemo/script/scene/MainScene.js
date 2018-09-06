// Generated by CoffeeScript 1.12.7
var MainScene;

MainScene = function() {};

MainScene.prototype.init = function() {
  this.ctor = cc.Scene.extend({
    ctor: function(params) {
      this._super();
      return this.dataList = [];
    },
    onEnter: function() {
      var layer, node;
      this._super();
      console.log("enter == > " + "MainScene");
      node = new cc.Node();
      this.addChild(node);
      node.setName("layerNode");
      this.createList();
      layer = new TapWater().get();
      return node.addChild(layer);
    },
    createList: function() {
      var data, node, size, sprite, tableView;
      node = new cc.Node();
      this.addChild(node);
      size = cc.winSize;
      sprite = new cc.Sprite(res.HelloWorld_png);
      sprite.attr({
        x: size.width / 2,
        y: size.height / 2
      });
      node.addChild(sprite, 0);
      tableView = new cc.TableView(this, cc.size(200, cc.winSize.height));
      tableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
      tableView.x = 0;
      tableView.y = 0;
      tableView.setDelegate(this);
      tableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
      node.addChild(tableView);
      data = [
        {
          item: "TapWater"
        }, {
          item: "LayerWave"
        }
      ];
      this.dataList = data;
      tableView.reloadData();
      return cc.director.setNotificationNode(node);
    },
    tableCellTouched: function(table, cell) {
      var data, idx, layer, layerNode, runnineScene;
      cc.log("cell touched at index: " + cell.getIdx());
      idx = cell.getIdx();
      data = this.dataList[idx];
      runnineScene = cc.director.getRunningScene();
      layer = new window[data.item]().get();
      layerNode = runnineScene.getChildByName("layerNode");
      if (layerNode) {
        layerNode.removeAllChildren();
        return layerNode.addChild(layer);
      }
    },
    tableCellSizeForIndex: function(table, idx) {
      return cc.size(150, 50);
    },
    tableCellAtIndex: function(table, idx) {
      var cell, data, label, strValue;
      strValue = idx.toFixed(0);
      data = this.dataList[idx];
      cell = table.dequeueCell();
      label;
      if (!cell) {
        cell = new cc.TableViewCell();
        label = new cc.LabelTTF(data.item, "Helvetica", 30);
        label.x = 0;
        label.y = 0;
        label.anchorX = 0;
        label.anchorY = 0;
        label.color = cc.color(255, 0, 0, 255);
        cell.addChild(label);
      } else {
        label = cell.getChildByTag(123);
        label.setString(data.item);
      }
      return cell;
    },
    numberOfCellsInTableView: function(table) {
      return this.dataList.length;
    }
  });
};

MainScene.prototype.get = function(cb, cbTarget, params) {
  this.init();
  return new this.ctor(params);
};
