(function(){"use strict";var e=$("#rotor").eq(0),t=0,n=.5,r=new Rickshaw.Graph.Ajax({element:document.getElementById("chart"),width:960,height:500,stroke:!0,renderer:"bar",dataURL:"./json/index.php",onData:function(e){e[0].data[0].y=80;return e},onComplete:function(e){r=e.graph;r.offset="pct";var t=new Rickshaw.Graph.HoverDetail({graph:r,yFormatter:function(e){n=e/1e3;return e}}),i=new Rickshaw.Graph.Behavior.Series.Toggle({graph:r,legend:legend}),s=new Rickshaw.Graph.Axis.Time({graph:r});s.render()},series:[{name:"Wind",color:"#491D37"}]}),i=function(){t+=n;t>360&&(t-=360);var r="rotateZ("+t+"deg)";e.css({"-webkit-transform":r,"-moz-transform":r,"-ms-transform":r,"-o-transform":r,transform:r});requestAnimationFrame(i)};i()})();