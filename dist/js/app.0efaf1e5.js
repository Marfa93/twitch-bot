(function(e){function t(t){for(var s,a,u=t[0],i=t[1],l=t[2],d=0,p=[];d<u.length;d++)a=u[d],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&p.push(o[a][0]),o[a]=0;for(s in i)Object.prototype.hasOwnProperty.call(i,s)&&(e[s]=i[s]);c&&c(t);while(p.length)p.shift()();return r.push.apply(r,l||[]),n()}function n(){for(var e,t=0;t<r.length;t++){for(var n=r[t],s=!0,u=1;u<n.length;u++){var i=n[u];0!==o[i]&&(s=!1)}s&&(r.splice(t--,1),e=a(a.s=n[0]))}return e}var s={},o={app:0},r=[];function a(t){if(s[t])return s[t].exports;var n=s[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=e,a.c=s,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)a.d(n,s,function(t){return e[t]}.bind(null,s));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="/";var u=window["webpackJsonp"]=window["webpackJsonp"]||[],i=u.push.bind(u);u.push=t,u=u.slice();for(var l=0;l<u.length;l++)t(u[l]);var c=i;r.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},1:function(e,t){},"56d7":function(e,t,n){"use strict";n.r(t);var s=n("bc3a"),o=n.n(s),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"home"}},[n("h1",[e._v("Bonjour tout le monde ! Voici un aperçu du chat :")]),e.hasMessages?n("div",{staticClass:"chatbox"},e._l(e.messages,(function(e){return n("message-line",{key:e.id,attrs:{message:e}})})),1):n("div",[n("h2",[e._v("Pas de message pour le moment :(")])]),n("h1",[e._v("Et maintenant les sons que vous balancez !")]),n("audio",{ref:"player",attrs:{src:e.soundUri,autoplay:"",controls:""}},[e._v(" Votre navigateur ne supporte pas l'élément "),n("code",[e._v("audio")]),e._v(". ")])])},a=[],u=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e._v("["+e._s(e.message.sent)+"] <"+e._s(e.message.sender)+">: "+e._s(e.message.message))])},i=[],l={name:"message-line",props:["message"]},c=l,d=n("2877"),p=Object(d["a"])(c,u,i,!1,null,null,null),h=p.exports,f=n("8055"),m=n.n(f);const g=m()(),v=10,y="!";function _(e){const t=new XMLHttpRequest;var n=!1;return t.open("HEAD",e,!1),t.onreadystatechange=function(){4===t.readyState&&(n=200===t.status||0===t.status)},t.send(null),n}const b={messages:[],soundUri:"",playlist:[]};var w={name:"Home",data:function(){return b},components:{MessageLine:h},created:function(){g.on("chat-message",e=>{this.messages.length>v&&(this.messages=this.messages.slice(-(v-1))),this.getSound(e.message),e.sent=new Date(parseInt(e.sent)).toLocaleTimeString(),this.messages.push(e)})},mounted:function(){const e=this.$refs.player;e.onended=t=>{this.soundUri="",this.playlist.length&&(this.soundUri=this.playlist.shift(),e.load())},e.onerror=function(){this.soundUri="",console.log("Error "+e.error.code+"; details: "+e.error.message)}},computed:{hasMessages:function(){return this.messages.length>0}},methods:{getSound:function(e){if(e.charAt(0)==y){const t=e.replace(y,"").toLowerCase();this.getSoundUri(t)}},getSoundUri:function(e){const t=`${e}.mp3`;_(t)&&(this.$refs.player.ended&&0===this.playlist.length||!this.soundUri?this.soundUri=t:this.playlist.push(t))}}},O=w,j=Object(d["a"])(O,r,a,!1,null,null,null),S=j.exports,x=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"soundsList"},[n("h4",[e._v("Liste des sons disponibles :")]),n("ul",e._l(e.sounds,(function(t){return n("li",{key:t.id},[e._v(" "+e._s(t.soundname)+" ")])})),0)])},U=[];const M={sounds:[]};var P={name:"sounds-list",data:function(){return M},mounted(){o.a.get("/soundslist").then(e=>this.sounds=e.data)}},L=P,$=Object(d["a"])(L,x,U,!1,null,null,null),E=$.exports;o.a.defaults.baseURL="http://localhost:8080";const k=[{path:"/home",component:S},{path:"/sounds",component:E},{path:"*",redirect:"/sounds"}],V=new VueRouter({routes:k,mode:"history"});new Vue({router:V}).$mount("#app")}});
//# sourceMappingURL=app.0efaf1e5.js.map