!function(){var t=angular.module("turbine-directives",[]);t.directive("turbine",function(){return{restrict:"E",templateUrl:"./templates/turbine.html"}}),t.directive("turbineStats",function(){return{restrict:"E",templateUrl:"./templates/turbine-stats.html"}})}(),function(){"use strict";var t=angular.module("windTurbineApp",["turbine-directives","ngBootstrap","angular-rickshaw"]);t.controller("turbineController",["$scope","$http",function(t,e){t.rotationSpeed=10,this.graph={},this.currentPercentage=0,this.speed=0,this.wattage=0,this.displayDate=new Date,t.prevSpeed=0,this.usageExamples=[{action:"That's enough to power",consumption:.00483,object:"homes",image:"home"},{action:"Or enough to boil the water for",consumption:16e-6,object:"cups of tea"},{action:"Or making",consumption:33e-6,object:"slices of toasts",image:"toast"}],this.updateStats=function(e,a,i){if(15e3>a){var r=a/500;r!==t.prevSpeed&&(t.prevSpeed=r,n(r,i),this.wattage=a,this.displayDate=new Date(1e3*e),this.hola=(new Date-this.displayDate)/6e4,this.isCurrent=(new Date-this.displayDate)/6e4<30,this.currentPercentage=i)}return a+"MW"};var a=function(e,a,i,n,r,s){var o=this.updateStats(a,i,s.value.z);return t.$digest(),o},i=function(){},n=function(e,a){var i=$("#turbine-rotor-container"),n=$("#turbine-rotor").eq(0),s=$("#turbine-percentage-complete").eq(0),o=13/e,u=o+"s",h=1.9*e,c=r(n.css("transform")),d=r(i.css("transform")),m=2*a+"%";0===e&&(u="3000000s"),t.rotationSpeed=u;var l=n[0].style;l.webkitAnimationPlayState=l.mozAnimationPlayState=l.oAnimationPlayState=l.animationPlayState="paused",n.removeClass("animated"),i.css("transform","rotateZ("+(c+d+h)+"deg)"),l.webkitAnimationDuration=l.mozAnimationDuration=l.oAnimationDuration=l.animationDuration=u,l.webkitAnimationPlayState=l.mozAnimationPlayState=l.oAnimationPlayState=l.animationPlayState="running",setTimeout(function(){n.addClass("animated")},0),s[0].style.height=m,s[0].style.width=m},r=function(t){var e=0;if("none"!==t){var a=t.split("(")[1];a=a.split(")")[0],a=a.split(",");var i=a[0],n=a[1],r=(a[2],a[3],Math.sqrt(i*i+n*n),Math.atan2(n,i));0>r&&(r+=2*Math.PI),e=Math.round(r*(180/Math.PI))}return e};this.graph.options={renderer:"area",height:200},this.graph.features={hover:{formatter:a.bind(this)},yAxis:{},xAxis:{timeFixture:new Rickshaw.Fixtures.Time.Local},complete:i.bind(this)},this.graph.series=[{name:"Wind",color:"#007232",data:[{x:0,y:0}]}],this.daterange={startDate:moment().subtract("days",7),endDate:moment()},t.loadInData=function(){if("undefined"!=typeof this.daterange){var t=this;e.get("./json/",{params:{start:this.daterange.startDate.unix(),end:this.daterange.endDate.unix()}}).success(function(e){t.graph.series=e;var a=e[0].data.pop();t.updateStats(a.x,a.y,a.z)})}}.bind(this),t.$watch(function(){return this.daterange}.bind(this),function(){t.loadInData()})}])}();