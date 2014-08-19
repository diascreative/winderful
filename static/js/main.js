!function(t,e){"use strict";var i={speed:.5,prevSpeed:.5,rotationAngle:0,graph:!1,init:function(){this.cacheItems(),this.graph=new Rickshaw.Graph.Ajax({element:e.getElementById("chart"),width:600,height:500,stroke:!0,renderer:"bar",dataURL:"./json/",onData:function(t){return t[0].data[0].y=80,t},onComplete:this.graphSetup.bind(this),series:[{name:"Wind",color:"#491D37"},{name:"Demand",color:"#963"}]}),this.animateWindMill()},cacheItems:function(){this.$rotor=t("#turbine-rotor").eq(0),this.$legend=t("#legend"),this.$css=t('<style type="text/css" id="turbine-css"></style>'),t("head").append(this.$css)},graphSetup:function(e){var i=e.graph,n=(new Rickshaw.Graph.HoverDetail({graph:i,yFormatter:this.hoverGraph.bind(this)}),i.series[0].data.pop()),a=i.series[1].data.pop(),s=n.y/a.y*100;t("#percent").html(s.toFixed(2)),this.setLegend(i)},setLegend:function(t){this.$legend.html("");new Rickshaw.Graph.Legend({graph:t,element:this.$legend[0]})},hoverGraph:function(t){return 15e3>t&&(this.speed=t/1e3),t+" MW"},getData:function(t){this.graph.dataURL=t,this.graph.request()},createNewCSS:function(){var t=6-this.speed+"s",e=this.$rotor.css("transform"),i="#turbine-rotor.animated {-webkit-animation-duration:"+t+";-moz-animation-duration:"+t+";-ms-animation-duration:"+t+";-o-animation-duration:"+t+";animation-duration:"+t+"}";this.$css.html(i),this.$rotor.css("transform",e).removeClass("animated"),setTimeout(function(){this.$rotor.addClass("animated"),console.log(t)}.bind(this),10)},animateWindMill:function(){this.speed!==this.prevSpeed&&(this.prevSpeed=this.speed,this.createNewCSS()),requestAnimationFrame(this.animateWindMill.bind(this))}},n={values:{start:"",end:""},init:function(){this.cacheItems(),this.bindEvents()},cacheItems:function(){this.$form=t("#form"),this.$start=t("#start"),this.$end=t("#end")},bindEvents:function(){var e=this;t("#form").submit(this.submitForm.bind(this)),t("#start").datetimepicker({formatTime:"H.i",minDate:"2009/05/14",onChangeDateTime:this.updateStartTime.bind(this),onShow:function(){var t=e.dateOption(e.$end,"+1970/01/01");this.setOptions({maxDate:t})}}),t("#end").datetimepicker({formatTime:"H.i",maxDate:"+1970/01/01",onChangeDateTime:this.updateEndTime.bind(this),onShow:function(){var t=e.dateOption(e.$start,"2009/05/14");this.setOptions({minDate:t})}})},dateOption:function(t,e){var i=t.val()?t.val():e,n=i.split(" ");return n.length>1&&(i=n[0]),i},updateStartTime:function(t){this.values.start=t&&"undefined"!=typeof t?t.dateFormat("unixtime"):""},updateEndTime:function(t){this.values.end=t&&"undefined"!=typeof t?t.dateFormat("unixtime"):""},submitForm:function(e){e.preventDefault();var n=this.$form.attr("action")+"?"+t.param(this.values);i.getData(n)}};i.init(),n.init()}(jQuery,document);