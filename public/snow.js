/** @license
 * DHTML Snowstorm! JavaScript-based snow for web pages
 * Making it snow on the internets since 2003. You're welcome.
 * -----------------------------------------------------------
 * Version 1.44.20131208 (Previous rev: 1.44.20131125)
 * Copyright (c) 2007, Scott Schiller. All rights reserved.
 * Code provided under the BSD License
 * http://schillmania.com/projects/snowstorm/license.txt
 */

/*jslint nomen: true, plusplus: true, sloppy: true, vars: true, white: true */
/*global window, document, navigator, clearInterval, setInterval */

var snowStorm=function(n,l){this.autoStart=!0,this.excludeMobile=!0,this.flakesMax=192,this.flakesMaxActive=128,this.animationInterval=100,this.useGPU=!0,this.className=null,this.excludeMobile=!0,this.flakeBottom=null,this.followMouse=!1,this.snowColor="#e0e0fe",this.snowCharacter="&bull;",this.snowStick=!0,this.targetElement=null,this.useMeltEffect=!0,this.useTwinkleEffect=!1,this.usePositionFixed=!1,this.usePixelPosition=!1,this.freezeOnBlur=!0,this.flakeLeftOffset=0,this.flakeRightOffset=0,this.flakeWidth=8,this.flakeHeight=8,this.vMaxX=0,this.vMaxY=1,this.zIndex=0;var o,s,i,a,e,r=this,t=navigator.userAgent.match(/msie/i),m=navigator.userAgent.match(/msie 6/i),f=navigator.userAgent.match(/mobile|opera m(ob|in)/i),h=t&&"BackCompat"===l.compatMode||m,u=null,c=null,d=null,v=null,p=null,y=1,k=!1,g=!1,x=function(){try{l.createElement("div").style.opacity="0.5"}catch(e){return!1}return!0}(),w=!1,F=l.createDocumentFragment();function b(e){var t=i.call(e),e=t.length;return s?(t[1]="on"+t[1],3<e&&t.pop()):3===e&&t.push(!1),t}function E(e,t){var i=e.shift(),t=[a[t]];s?i[t](e[0],e[1]):i[t].apply(i,e)}function z(e,t){return isNaN(t)&&(t=0),Math.random()*e+t}function H(){n.setTimeout(function(){r.start(!0)},20),r.events.remove(t?l:n,"mousemove",H)}return o=function(){var t,e=n.requestAnimationFrame||n.webkitRequestAnimationFrame||n.mozRequestAnimationFrame||n.oRequestAnimationFrame||n.msRequestAnimationFrame||function(e){n.setTimeout(e,1e3/(r.animationInterval||20))};function i(e){return void 0!==t.style[e]?e:null}s=e?function(){return e.apply(n,arguments)}:null,t=l.createElement("div");var s={transform:{ie:i("-ms-transform"),moz:i("MozTransform"),opera:i("OTransform"),webkit:i("webkitTransform"),w3:i("transform"),prop:null},getAnimationFrame:s};return s.transform.prop=s.transform.w3||s.transform.moz||s.transform.webkit||s.transform.ie||s.transform.opera,t=null,s}(),this.timer=null,this.flakes=[],this.disabled=!1,this.active=!1,this.meltFrameCount=20,this.meltFrames=[],this.setXY=function(e,t,i){if(!e)return!1;r.usePixelPosition||g?(e.style.left=t-r.flakeWidth+"px",e.style.top=i-r.flakeHeight+"px"):h||r.flakeBottom?(e.style.right=100-t/u*100+"%",e.style.top=Math.min(i,p-r.flakeHeight)+"px"):(e.style.right=100-t/u*100+"%",e.style.bottom=100-i/d*100+"%")},this.events=(s=!n.addEventListener&&n.attachEvent,i=Array.prototype.slice,a={add:s?"attachEvent":"addEventListener",remove:s?"detachEvent":"removeEventListener"},{add:function(){E(b(arguments),"add")},remove:function(){E(b(arguments),"remove")}}),this.randomizeWind=function(){var e;if(this.flakes)for(e=0;e<this.flakes.length;e++)this.flakes[e].active&&this.flakes[e].setVelocities()},this.scrollHandler=function(){var e;if(v=r.flakeBottom?0:parseInt(n.scrollY||l.documentElement.scrollTop||(h?l.body.scrollTop:0),10),isNaN(v)&&(v=0),!k&&!r.flakeBottom&&r.flakes)for(e=0;e<r.flakes.length;e++)0===r.flakes[e].active&&r.flakes[e].stick()},this.resizeHandler=function(){d=n.innerWidth||n.innerHeight?(u=n.innerWidth-16-r.flakeRightOffset,r.flakeBottom||n.innerHeight):(u=(l.documentElement.clientWidth||l.body.clientWidth||l.body.scrollWidth)-(t?0:8)-r.flakeRightOffset,r.flakeBottom||l.documentElement.clientHeight||l.body.clientHeight||l.body.scrollHeight),p=l.body.offsetHeight,c=parseInt(u/2,10)},this.resizeHandlerAlt=function(){u=r.targetElement.offsetWidth-r.flakeRightOffset,d=r.flakeBottom||r.targetElement.offsetHeight,c=parseInt(u/2,10),p=l.body.offsetHeight},this.freeze=function(){if(r.disabled)return!1;r.disabled=1,r.timer=null},this.resume=function(){if(!r.disabled)return!1;r.disabled=0,r.timerInit()},this.toggleSnow=function(){r.flakes.length?(r.active=!r.active,r.active?(r.show(),r.resume()):(r.stop(),r.freeze())):r.start()},this.stop=function(){var e;for(this.freeze(),e=0;e<this.flakes.length;e++)this.flakes[e].o.style.display="none";r.events.remove(n,"scroll",r.scrollHandler),r.events.remove(n,"resize",r.resizeHandler),r.freezeOnBlur&&(t?(r.events.remove(l,"focusout",r.freeze),r.events.remove(l,"focusin",r.resume)):(r.events.remove(n,"blur",r.freeze),r.events.remove(n,"focus",r.resume)))},this.show=function(){for(var e=0;e<this.flakes.length;e++)this.flakes[e].o.style.display="block"},this.SnowFlake=function(e,t,i){var s=this;this.type=e,this.x=t||parseInt(z(u-20),10),this.y=isNaN(i)?-z(d)-12:i,this.vX=null,this.vY=null,this.vAmpTypes=[1,1.2,1.4,1.6,1.8],this.vAmp=this.vAmpTypes[this.type]||1,this.melting=!1,this.meltFrameCount=r.meltFrameCount,this.meltFrames=r.meltFrames,this.meltFrame=0,this.twinkleFrame=0,this.active=1,this.fontSize=10+this.type/5*10,this.o=l.createElement("div"),this.o.innerHTML=r.snowCharacter,r.className&&this.o.setAttribute("class",r.className),this.o.style.color=r.snowColor,this.o.style.position=k?"fixed":"absolute",r.useGPU&&o.transform.prop&&(this.o.style[o.transform.prop]="translate3d(0px, 0px, 0px)"),this.o.style.width=r.flakeWidth+"px",this.o.style.height=r.flakeHeight+"px",this.o.style.fontFamily="arial,verdana",this.o.style.cursor="default",this.o.style.overflow="hidden",this.o.style.fontWeight="normal",this.o.style.zIndex=r.zIndex,F.appendChild(this.o),this.refresh=function(){if(isNaN(s.x)||isNaN(s.y))return!1;r.setXY(s.o,s.x,s.y)},this.stick=function(){h||r.targetElement!==l.documentElement&&r.targetElement!==l.body?s.o.style.top=d+v-r.flakeHeight+"px":r.flakeBottom?s.o.style.top=r.flakeBottom+"px":(s.o.style.display="none",s.o.style.bottom="0%",s.o.style.position="fixed",s.o.style.display="block")},this.vCheck=function(){0<=s.vX&&s.vX<.2?s.vX=.2:s.vX<0&&-.2<s.vX&&(s.vX=-.2),0<=s.vY&&s.vY<.2&&(s.vY=.2)},this.move=function(){var e=s.vX*y;s.x+=e,s.y+=s.vY*s.vAmp,s.x>=u||u-s.x<r.flakeWidth?s.x=0:e<0&&s.x-r.flakeLeftOffset<-r.flakeWidth&&(s.x=u-r.flakeWidth-1),s.refresh(),d+v-s.y+r.flakeHeight<r.flakeHeight?(s.active=0,r.snowStick?s.stick():s.recycle()):(r.useMeltEffect&&s.active&&s.type<3&&!s.melting&&.998<Math.random()&&(s.melting=!0,s.melt()),r.useTwinkleEffect&&(s.twinkleFrame<0?.97<Math.random()&&(s.twinkleFrame=parseInt(8*Math.random(),10)):(s.twinkleFrame--,x?s.o.style.opacity=s.twinkleFrame&&s.twinkleFrame%2==0?0:1:s.o.style.visibility=s.twinkleFrame&&s.twinkleFrame%2==0?"hidden":"visible")))},this.animate=function(){s.move()},this.setVelocities=function(){s.vX=z(.12*r.vMaxX,.1),s.vY=1+z(.12*r.vMaxY,.1)},this.setOpacity=function(e,t){if(!x)return!1;e.style.opacity=t},this.melt=function(){r.useMeltEffect&&s.melting&&s.meltFrame<s.meltFrameCount?(s.setOpacity(s.o,s.meltFrames[s.meltFrame]),s.o.style.fontSize=s.fontSize-s.fontSize*(s.meltFrame/s.meltFrameCount)+"px",s.o.style.lineHeight=r.flakeHeight+2+.75*r.flakeHeight*(s.meltFrame/s.meltFrameCount)+"px",s.meltFrame++):s.recycle()},this.recycle=function(){s.o.style.display="none",s.o.style.position=k?"fixed":"absolute",s.o.style.bottom="auto",s.setVelocities(),s.vCheck(),s.meltFrame=0,s.melting=!1,s.setOpacity(s.o,1),s.o.style.padding="0px",s.o.style.margin="0px",s.o.style.fontSize=s.fontSize+"px",s.o.style.lineHeight=r.flakeHeight+2+"px",s.o.style.textAlign="center",s.o.style.verticalAlign="baseline",s.x=parseInt(z(u-r.flakeWidth-20),10),s.y=parseInt(-1*z(d),10)-r.flakeHeight,s.refresh(),s.o.style.display="block",s.active=1},this.recycle(),this.refresh()},this.snow=function(){for(var e=0,t=null,i=0,s=r.flakes.length;i<s;i++)1===r.flakes[i].active&&(r.flakes[i].move(),e++),r.flakes[i].melting&&r.flakes[i].melt();e<r.flakesMaxActive&&0===(t=r.flakes[parseInt(z(r.flakes.length),10)]).active&&(t.melting=!0),r.timer&&o.getAnimationFrame(r.snow)},this.mouseMove=function(e){if(!r.followMouse)return!0;e=parseInt(e.clientX,10);y=e<c?e/c*2-2:(e-=c)/c*2},this.createSnow=function(e,t){for(var i=0;i<e;i++)r.flakes[r.flakes.length]=new r.SnowFlake(parseInt(z(6),10)),(t||i>r.flakesMaxActive)&&(r.flakes[r.flakes.length-1].active=-1);r.targetElement.appendChild(F)},this.timerInit=function(){r.timer=!0,r.snow()},this.init=function(){for(var e=0;e<r.meltFrameCount;e++)r.meltFrames.push(1-e/r.meltFrameCount);r.randomizeWind(),r.createSnow(r.flakesMax),r.events.add(n,"resize",r.resizeHandler),r.events.add(n,"scroll",r.scrollHandler),r.freezeOnBlur&&(t?(r.events.add(l,"focusout",r.freeze),r.events.add(l,"focusin",r.resume)):(r.events.add(n,"blur",r.freeze),r.events.add(n,"focus",r.resume))),r.resizeHandler(),r.scrollHandler(),r.followMouse&&r.events.add(t?l:n,"mousemove",r.mouseMove),r.animationInterval=Math.max(20,r.animationInterval),r.timerInit()},this.start=function(e){if(w){if(e)return!0}else w=!0;if("string"==typeof r.targetElement){e=r.targetElement;if(r.targetElement=l.getElementById(e),!r.targetElement)throw new Error('Snowstorm: Unable to get targetElement "'+e+'"')}if(r.targetElement||(r.targetElement=l.body||l.documentElement),r.targetElement!==l.documentElement&&r.targetElement!==l.body&&(r.resizeHandler=r.resizeHandlerAlt,r.usePixelPosition=!0),r.resizeHandler(),r.usePositionFixed=r.usePositionFixed&&!h&&!r.flakeBottom,n.getComputedStyle)try{g="relative"===n.getComputedStyle(r.targetElement,null).getPropertyValue("position")}catch(e){g=!1}k=r.usePositionFixed,u&&d&&!r.disabled&&(r.init(),r.active=!0)},r.autoStart&&(m=(e=new Date).getUTCMonth()+1,e=e.getUTCDate(),(12==m&&10<=e||1==m&&e<=10)&&r.events.add(n,"load",function e(){r.excludeMobile&&f||H(),r.events.remove(n,"load",e)},!1)),this}(window,document);