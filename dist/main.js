var Client=function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t,n){},function(e,t,n){"use strict";n.r(t);function r(e){e.preventDefault();let t=document.getElementById("zip"),n=document.getElementById("start-date"),r=document.getElementById("end-date");o("http://api.geonames.org/postalCodeSearchJSON?placename="+t.value+"&username=szensemann").then((function(e,o){let l=e.postalCodes[0].lat,u=e.postalCodes[0].lng,c=(e.postalCodes[0].postalCode,new Date(n.value)),d=new Date(r.value);const s=Math.ceil(Math.abs((c-new Date)/864e5)),m=a(c,d);document.getElementById("trip-length").innerHTML=m+" day(s)",i("http://localhost:3003/darksky/forecast",{lat:l,lng:u,start:c.getTime()/1e3}).then((function(e){document.getElementById("trip-weather").innerHTML=e.daily.data[0].summary,document.getElementById("temp-max").innerHTML=e.daily.data[0].temperatureHigh+" C°",document.getElementById("temp-low").innerHTML=e.daily.data[0].temperatureLow+" C°"})),i("http://localhost:3003/pixabay/image",{destination:t.value}).then((function(e){var t=e.hits[0].webformatURL;document.getElementById("trip-image").setAttribute("src",t)})),document.getElementById("destination").innerHTML=t.value+", "+e.postalCodes[0].countryCode+" is "+s+" day(s) away",document.getElementById("trip-start-date").innerHTML=c.getDate()+"."+(c.getMonth()+1)+"."+c.getFullYear(),document.getElementById("trip-end-date").innerHTML=d.getDate()+"."+(d.getMonth()+1)+"."+d.getFullYear()}))}function a(e,t){return Math.ceil(Math.abs((t-e)/864e5))}const o=async(e="")=>{const t=await fetch(e);try{return await t.json()}catch(e){console.log("error: "+e)}},i=async(e="",t={})=>{const n=await fetch(e,{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});try{return await n.json()}catch(e){console.log("error",e)}};n(0);n.d(t,"getGeoData",(function(){return r})),n.d(t,"calcTripLength",(function(){return a}))}]);