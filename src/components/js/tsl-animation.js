var animation= weex.requireModule('animation')
exports.animation = {
    data:{
      current_rotate:0,
      isreverse:false,
      current_translate:'',
      offsetX:0,
      offsetY:0,
      current_opacity:0,
      current_scale:1,
      current_HexString:''
    },
  //动画
    anim: function (ref, styles, timingFunction, duration, callback) {
        animation.transition(ref, {
            styles: styles,
            timingFunction: timingFunction,
            duration: duration
        }, callback || function() {});
    },
    //旋转
    rotate: function (ref, angles, reverse, callback) {

        var self = this;
        if (reverse) {
          if (!self.data.isreverse) {
            self.data.current_rotate = self.data.current_rotate + angles;
          } else {
            self.data.current_rotate = self.data.current_rotate - angles;
          }
          self.data.isreverse = !self.data.isreverse;
        } else {
          self.data.current_rotate = self.data.current_rotate + angles;
        }

        self.anim(ref, {
            transform: 'rotate(' + self.data.current_rotate + 'deg)'
        }, 'ease-in-out', 500, callback);
    },
    //平移
    translate: function (ref, offsetX, offsetY, reverse, callback) {

        if (reverse) {
          var translate = 'translate(' + offsetX + ', ' + offsetY + ')';
          this.data.current_translate = this.data.current_translate!='' ? '' : translate;
        } else {
          this.data.offsetX = this.data.offsetX + offsetX;
          this.data.offsetY = this.data.offsetY + offsetY;
          var translate = 'translate(' + this.data.offsetX + ', ' + this.data.offsetY + ')';
          this.data.current_translate = translate;
        }

        this.anim(ref, {
            transform: this.data.current_translate
        }, 'ease-in-out', 500, callback);
    },
    //透明度变化
    opacity: function (ref, fromValue, toValue, reverse, callback) {
        var self = this;
        if (reverse) {
          self.data.current_opacity = self.data.current_opacity === toValue ? fromValue : toValue;
        } else {
          self.data.current_opacity = toValue;
        }

        self.anim(ref, {
            opacity: self.data.current_opacity
        }, 'ease-in-out', 500, callback);
    },
    //缩放
    scale: function (ref, fromValue, toValue, reverse, callback) {

      if (reverse) {
        this.data.current_scale = this.data.current_scale === toValue ? fromValue : toValue;
      } else {
        this.data.current_scale = toValue;
      }
      this.anim(ref,{
        transform:'scale('+this.data.current_scale+')'
      },'ease-in-out',500,callback);
    },
    //变色
    color: function (ref, fromHexString, tohexString, reverse, callback) {
      if (reverse) {
        this.data.current_HexString = this.data.current_HexString === tohexString ? fromHexString : tohexString;
      } else {
        this.data.current_HexString = tohexString;
      }
      this.anim(ref,{
        backgroundColor: this.data.current_HexString
      },'ease-in-out',500,callback);
    }

}
