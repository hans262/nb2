## CSS单位
 - vw    视口宽度占比
 - vh    视口高度占比
 - vmin  vh和vw中最小的那个
 - vmax  vh和vw中最大的那个
 - em    相对于父节点倍数单位
 - rem   相对于根节点（html）倍数单位
 - px    像素
 - %     相对于相对于父元素倍数单位

## 属性
 - vertical-align: middle        垂直对其img元素等
 - letter-spacing                字体间距
 - text-transform: uppercase     字体大写
 - text-decoration: underline    下划线
 - border-collapse: collapse     表格默认边框去除
 - colspan                       打通横向单元格
 - rowspan                       纵向

 - white-space: nowrap           禁止换行
 - text-overflow: ellipsis       修剪文本
 - overflow: hidden              必须
 - rgba(0, 0, 0, .9)             有透明度
 - rgb(0, 0, 0)                  红 绿 蓝 三色

 - linear-gradient(to right, red , blue)           线性颜色
 - linear-gradient(to bottom right, red , blue)    线性颜色

 - width: calc(100% - 100px)     css函数计算

 - background-image:url()  设置背景图片
 - background-size: cover; 背景图铺满
 - background-size: 100% auto;  背景图尺寸
 - background-position: center; 背景图定位 水平垂直居中
 - background-position: left center; 水平方向居左，垂直方向居中

## 伪类
 - E:active       鼠标点击与释放之间的样式
 - E:hover        鼠标悬停时候的样式
 - E:link         a标签未被访问前的样式
 - E:visited      a标签已经被访问过的样式
 - E:focus        成为焦点时候的样式
 - E:checked      处于选中checkbox的样式(用于input type为radio与checkbox时)

## 伪元素

 - E::after
 - E::before

## 选择器

 - E *            E元素下的所有元素
 - E > F          E元素下的所有子元素F
 - E + F          紧贴在E元素之后F元素
 - E ~ F          E元素所有兄弟元素F

``` css
  /* 三角形 */
  .triangle_border_right {
    display: block;
    width: 0;
    height: 0;
    border-width: 28px 0 28px 28px;
    border-style: solid;
    border-color: transparent transparent transparent #000;
    /*透明 透明 透明 黄*/
    position: absolute;
    top: 50%;
    left: 0px;
  }

  /* 媒体查询 小于800时候应用下面CSS */
  @media screen and (max-width:800px){
    body{ color: red }
  }

```