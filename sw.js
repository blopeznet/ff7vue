if(!self.define){let e,s={};const i=(i,r)=>(i=new URL(i+".js",r).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(r,c)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(s[n])return;let t={};const l=e=>i(e,n),d={module:{uri:n},exports:t,require:l};s[n]=Promise.all(r.map((e=>d[e]||l(e)))).then((e=>(c(...e),t)))}}define(["./workbox-3e911b1d"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-0CYsp0JH.css",revision:null},{url:"assets/index-NdwpziLB.js",revision:null},{url:"index.html",revision:"8b94388977cd6edfbb66d978988a333c"},{url:"registerSW.js",revision:"3a0ee80fe02529417bbec587dba194a4"},{url:"styles/app.css",revision:"879fe373f120a1242eb04f7d60f81913"},{url:"styles/endFight.css",revision:"a00bdbae413ce03e17fcf397dc3043b1"},{url:"styles/endGame.css",revision:"eeda5b4bfb5e5edcc71e5b50588064b0"},{url:"styles/fight.css",revision:"9b0b893aaddf148c7c76b48f47c8b7a8"},{url:"styles/history.css",revision:"b607d92e7a8caf1d1e9c789ea7767b82"},{url:"styles/home.css",revision:"5fa4ef88cf53705b4643bf02ec1af114"},{url:"styles/map.css",revision:"830c26eac6d80f212e7b51b0d09f08bc"},{url:"styles/menu.css",revision:"28ba6aa3453257eaadcda6cd39d68023"},{url:"styles/menumap.css",revision:"77eca79efbf373330eca3ad0fea651b6"},{url:"styles/styles.css",revision:"4278e5f40d258307c54336467a686288"},{url:"manifest.webmanifest",revision:"4145a6fd5e2cb21e7c5c99c7ff6eef52"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
