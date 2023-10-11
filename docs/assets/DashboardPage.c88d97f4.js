var $=Object.defineProperty;var Q=(t,e,n)=>e in t?$(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var b=(t,e,n)=>(Q(t,typeof e!="symbol"?e+"":e,n),n);import{c as T,h as N,f as V}from"./QBtn.0d30a63d.js";import{i as U,X as _,Y as B,a7 as j,c as W,h as O,g as K,d as P,m as u,F as f,y as w,q as y,t as s,l as a,x as v,ag as q,r as D,f as S,ah as E,s as A,Q as H,E as z,G}from"./index.49ab4c6c.js";import{u as L}from"./languages-store.000833d6.js";import{Q as M}from"./QInput.b17d81c2.js";import"./use-dark.8eb40b8c.js";var X=T({name:"QPage",props:{padding:Boolean,styleFn:Function},setup(t,{slots:e}){const{proxy:{$q:n}}=K(),o=U(B,_);if(o===_)return console.error("QPage needs to be a deep child of QLayout"),_;if(U(j,_)===_)return console.error("QPage needs to be child of QPageContainer"),_;const d=W(()=>{const i=(o.header.space===!0?o.header.size:0)+(o.footer.space===!0?o.footer.size:0);if(typeof t.styleFn=="function"){const m=o.isContainer.value===!0?o.containerHeight.value:n.screen.height;return t.styleFn(i,m)}return{minHeight:o.isContainer.value===!0?o.containerHeight.value-i+"px":n.screen.height===0?i!==0?`calc(100vh - ${i}px)`:"100vh":n.screen.height-i+"px"}}),l=W(()=>`q-page${t.padding===!0?" q-layout-padding":""}`);return()=>O("main",{class:l.value,style:d.value},N(e.default))}});const F=L();function R(t){let e="";switch(t.kind){case"syllables":for(const n of t.syllables)e!==""&&(e+="."),e+=Y(n);break;case"phones":e+=C(t.phones);break}return e}function Y(t){let e=C(t.onset);return e+=C(t.rhyme.nucleus),e+=C(t.rhyme.coda),e}function C(t){let e="";for(const n of t)e+=I(n);return e}function I(t){var e,n;return t==null||F.languages==null?"":(n=(e=Object.values(F.languages.data.phonemes).filter(o=>o.featureStops.every(r=>J(t,r)))[0])==null?void 0:e.IPA)!=null?n:"Error]"}function J(t,e){return t.features[e.categoryId]===e.stopId}const Z=s("h2",null,"List of words:",-1),ee=P({__name:"LexemeListComponent",setup(t){const e=L();return(n,o)=>{var r;return a(),u(f,null,[Z,(a(!0),u(f,null,w((r=y(e).languages)==null?void 0:r.data.words,d=>(a(),u("li",{key:d.id,class:"roman-medium"},v(y(R)(d.entryForm)),1))),128))],64)}}});function te(t,e){const n=[],o=[];let r=!1;for(const d of t.split(".")){const l=ne(d,e),i=[],m=[],x=[];let g=!1;for(const c of l)switch(c.syllabic){case"Syllabic":if(g)throw new Error("Couldn't parse syllables.");g=!0,m.push(k(c));break;case"Nonsyllabic":switch(o.push(k(c)),e.data.phoneTypes[c.typeID].articulation){case"Vowel":m.push(k(c));break;case"Consonant":g?x.push(k(c)):i.push(k(c));break}break}r=r||g,n.push({id:crypto.randomUUID(),onset:i,rhyme:{nucleus:m,coda:x}})}return r?{id:crypto.randomUUID(),kind:"syllables",syllables:n}:{id:crypto.randomUUID(),kind:"phones",phones:o}}function ne(t,e){const n=[];let o=!1,r=0,d=0;for(;!o;){const l=Object.values(e.data.languages)[0].phonemesAll[d];if(!l){o=!0;break}t.substring(r,r+l.IPA.length)===l.IPA?(n.push(l),r+=l.IPA.length,d=0):(d+=1,d>=Object.values(e.data.languages)[0].phonemesAll.length&&(d=0,r+=1,r>=t.length&&(o=!0)))}return n}function k(t){if(!t)return{id:crypto.randomUUID(),type:"",features:{}};const e={};for(const n of t.featureStops)e[n.categoryId]=n.stopId;return{id:crypto.randomUUID(),type:t.typeID,features:e}}function oe(t){const e=L();!e.languages||e.languages.data.words.push(t)}function re(t){console.log("blarg");const e=L();if(!e.languages)return;const n=e.languages.data.words.filter(r=>r.id===t.id)[0],o=e.languages.data.words.indexOf(n);e.languages.data.words.splice(o,1)}class se{constructor(e){b(this,"kind","add");b(this,"lexeme");b(this,"do",()=>{switch(this.kind){case"add":this.addLexeme();break;case"remove":this.removeLexeme();break}});b(this,"undo",()=>{switch(this.kind){case"add":this.removeLexeme();break;case"remove":this.addLexeme();break}});this.lexeme=e}addLexeme(){oe(this.lexeme)}removeLexeme(){re(this.lexeme)}}class ae extends se{constructor(){super(...arguments);b(this,"kind","add")}}function le(t){return{id:crypto.randomUUID(),entryForm:t.word,entryTreeLimb:"",entryDate:0}}const ue=q("userSanity",{state:()=>({dashboard:{newWord:""}}),actions:{}}),de=s("br",null,null,-1),ie={key:0},ce=s("tr",null,[s("th",null,"O"),s("th",null,"N"),s("th",null,"C")],-1),he={key:1},me=s("tr",null,[s("th",null,"Nonsyllabic")],-1),pe={class:"ipa"},fe=s("br",null,null,-1),ye=P({__name:"NewLexemeComponent",setup(t){const e=L(),n=ue(),o=D(null),r=D({});function d(){if(l=null,o.value=null,r.value="",!!e.languages&&n.dashboard.newWord!=="")try{l=te(n.dashboard.newWord,e.languages),o.value=l,r.value=R(l)}catch(m){console.log(m)}}let l=null;function i(){!l||(e.executeDo(new ae(le({word:l}))),n.dashboard.newWord="",d())}return(m,x)=>{var g,c;return a(),u(f,null,[S(M,{rounded:"",outlined:"",modelValue:y(n).dashboard.newWord,"onUpdate:modelValue":[x[0]||(x[0]=h=>y(n).dashboard.newWord=h),d],label:"New Word",onKeydown:E(H(i,["prevent"]),["enter"])},null,8,["modelValue","onKeydown"]),de,s("p",null,"Interpretation: "+v(r.value),1),((g=o.value)==null?void 0:g.kind)=="syllables"?(a(),u("div",ie,[s("table",null,[ce,(a(!0),u(f,null,w(o.value.syllables,h=>(a(),u("tr",{key:h.id},[s("td",null,[(a(!0),u(f,null,w(h.onset,p=>(a(),u("span",{key:p.id},v(y(I)(p)),1))),128))]),s("td",null,[(a(!0),u(f,null,w(h.rhyme.nucleus,p=>(a(),u("span",{key:p.id},v(y(I)(p)),1))),128))]),s("td",null,[(a(!0),u(f,null,w(h.rhyme.coda,p=>(a(),u("span",{key:p.id},v(y(I)(p)),1))),128))])]))),128))])])):A("",!0),((c=o.value)==null?void 0:c.kind)=="phones"?(a(),u("div",he,[s("table",null,[me,s("tr",null,[s("td",pe,[(a(!0),u(f,null,w(o.value.phones,h=>(a(),u("span",{key:h.id},v(y(I)(h)),1))),128))])])])])):A("",!0),fe,S(V,{color:"primary",label:"Add to list",elevated:"",rounded:"",onClick:i})],64)}}}),ge={style:{position:"relative",display:"grid"}},be=s("br",null,null,-1),Le=P({__name:"DashboardPage",setup(t){return(e,n)=>(a(),z(X,{class:"row items-center justify-evenly"},{default:G(()=>[s("div",ge,[S(ye),be,S(ee)])]),_:1}))}});export{Le as default};