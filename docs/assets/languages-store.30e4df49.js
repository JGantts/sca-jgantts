import{ag as n}from"./index.852e6e4e.js";const t=[],o=[],a=n("languages",{state:()=>({languages:null,currentTab:"loadsave"}),actions:{loadSaveFile(e){e?this.languages=e:this.languages=null},excuteUndo(){const e=t.pop();!e||(e.undo(),o.push(e))},excuteRedo(){const e=o.pop();!e||(e.do(),t.push(e))},executeDo(e){e.do(),t.push(e)}}});export{a as u};