var Client=function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=1)}([function(t,e,n){},function(t,e,n){"use strict";n.r(e),n.d(e,"getGeoData",(function(){return r})),n.d(e,"calcTripLength",(function(){return o}));function r(t){t.preventDefault();let e=document.getElementById("zip"),n=document.getElementById("start-date"),r=document.getElementById("end-date"),c=new Date(n.value),l=new Date(r.value);document.getElementById("trip-start-date").innerHTML=c.getDate()+"."+(c.getMonth()+1)+"."+c.getFullYear(),document.getElementById("trip-end-date").innerHTML=l.getDate()+"."+(l.getMonth()+1)+"."+l.getFullYear(),i("http://localhost:3003/geonames/place",{location:e.value}).then((function(t){a("http://localhost:3003/geonames/getPlace").then((function(t,n){let r=t;const u=Math.ceil(Math.abs((c-new Date)/864e5)),d=o(c,l);document.getElementById("trip-length").innerHTML=d+" day(s)",document.getElementById("destination").innerHTML=e.value+", "+r.countryCode+" is "+u+" day(s) away",i("http://localhost:3003/darksky/forecast",{lat:r.lat,lng:r.lng,start:c.getTime()/1e3}).then((function(t){a("http://localhost:3003/darksky/getForecast").then((function(t,e){document.getElementById("trip-weather").innerHTML=t.summary,document.getElementById("temp-max").innerHTML=t.temperatureHigh+" C°",document.getElementById("temp-low").innerHTML=t.temperatureLow+" C°"}))})),i("http://localhost:3003/pixabay/image",{destination:e.value}).then((function(t){a("http://localhost:3003/pixabay/getImage").then((function(t,e){document.getElementById("trip-image").setAttribute("src",t.webformatURL)}))}))}))}))}function o(t,e){return Math.ceil(Math.abs((e-t)/864e5))}const a=async(t="")=>{const e=await fetch(t);try{return await e.json()}catch(t){console.log("error: "+t)}},i=async(t="",e={})=>{const n=await fetch(t,{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});try{return await n.json()}catch(t){console.log("error",t)}};n(0)}]);