// @license (c) Jussi Isotalo - https://github.com/jisotalo/shelly-porssisahko-en
// @license (c) SE1-4 anpassad av Alexander - https://elpris.eu
/* ver. 1.0.7 works with shelly-elpris 3.1.7
 * H&T addon must be placed after the main script // end of shelly-elpris
 * 
 * Controls cheap hours and ON-time based on temperature
 * H&T Gen2-3: Settings -> Actions -> Temperature -> Then do:
 * http://ip/script/1/update-temp?temp=$temperature
 * where: ip = device IP, /script/1 = shelly-elprisSE script number
 * Test: http://ip/script/1/update-temp?temp=18
*/

// H&T application mode:
let HNT_MODE = 2; // 0 = only Config#1, 1 = only #2, 2 = both configs
// How old temperature data is allowed in hours
let TEMP_MAX_AGE_HOURS = 2;
// How to apply H&T logic Custom ranges
let RANGES = true; // true = both Custom ranges, false = Custom range 1 only
// Latest known temperature data
let data = {temp: null, ts: Date.now(), valid: false};
// Fallback config, when no data stored or H&T data is missing or outdated
let fallbConf = {hours: 14, min: 60};

function fTime(ts,mode){let d=new Date(ts),Y=d.getFullYear(),M=d.getMonth()+1,D=d.getDate(),h=d.getHours(),m=d.getMinutes(),s=d.getSeconds(),time=(h<10?"0":"")+h+":"+(m<10?"0":"")+m+":"+(s<10?"0":"")+s;if(mode===1){return Y+"-"+(M<10?"0":"")+M+"-"+(D<10?"0":"")+D+" "+time}return time}function USER_CONFIG(inst,initialized){if(HNT_MODE!==2&&inst!==HNT_MODE){return}const state=_,config=state.c&&state.c.i?state.c.i[inst]:undefined;if(!config){return}let isActive=isInstActive(config);let priceNow=state.s&&state.s.p&&state.s.p[0]?state.s.p[0].now:undefined;let alwaysOnOverride=priceNow!==undefined&&(config.m2&&typeof config.m2.l==="number")&&priceNow<=config.m2.l;let alwaysOffOverride=priceNow!==undefined&&(config.m2&&typeof config.m2.m==="number")&&priceNow>=config.m2.m;if(typeof config.m2=="undefined"){print("[H&T] Config not available yet - user has not saved settings");return}if(config.m2&&typeof config.m2.c==="number"&&typeof config.m==="number"){fallbConf.hours=config.m2.c;fallbConf.min=config.m;print("[H&T] Setup#"+(inst+1)+" values: "+fallbConf.hours+"h / "+fallbConf.min+"min")}let hours=fallbConf.hours;let min=fallbConf.min;try{let mode=config.mode!==undefined?config.mode:2;let tStr=data.temp===null||data.temp===undefined?"-":data.temp.toFixed(1);let age=(Date.now()-data.ts)/36e5;if(!data.valid){state.si[inst].str=isActive?mode===2?"... waiting H&T t°C data since "+fTime(data.ts,1)+"<br>"+"Temporarily using Setup values: "+hours+" h, ON-time: "+min+" min":"H&T: waiting t°C data - not applied in this logic mode":"H&T: Config inactive - no t°C control applied"}else{print("[H&T] Config#"+(inst+1)+" Temp update: "+data.temp.toFixed(1)+"°C");if(age<=TEMP_MAX_AGE_HOURS){
	
// Change the number of heating hours and minutes (min) based on t°C from H&T
// Example logic for 2x12 hours periods
	(data.temp <= 18 ) ? (hours = 11, min = 60) :
	(data.temp <  19 ) ? (hours = 10, min = 60) :
	(data.temp <  20 ) ? (hours = 9,  min = 60) :
	(data.temp <  21 ) ? (hours = 8,  min = 60) :
	(data.temp < 21.5) ? (hours = 7,  min = 60) :
	(data.temp <  22 ) ? (hours = 4,  min = 60) :
	(data.temp <  23 ) ? (hours = 1,  min = 60) : // almost OFF
	(data.temp >= 23 ) ? (hours = 0,  min = 60) : void 0; // OFF
// End of custom logic
	
let htMsg=mode===2?"H&T event updated @ "+fTime(data.ts)+" | "+tStr+"°C<br>"+"Cheapest time tuned: "+hours+"h, ON-time: "+min+" min":"H&T active ("+tStr+"°C), but no effect in this logic mode";if(mode===2){alwaysOffOverride?htMsg+=", Always OFF limit applied":alwaysOnOverride?htMsg+=", Always ON limit applied":void 0}state.si[inst].str=isActive?htMsg:"H&T: Config inactive - no t°C control applied";print("[H&T] Config#"+(inst+1)+" Tuned: "+hours+"h / "+min+"min")}else{print("Outdated °C data -> Last Setup values applied");data.valid=false;data.temp=null;data.ts=Date.now();state.si[inst].str="Outdated °C data ("+age.toFixed(1)+" h)"+(isActive?"<br>Using saved config: "+hours+" h, ON-time: "+min+" min":"<br>Config inactive - control suspended")}}}catch(err){state.si[inst].str="Error in temp. control:"+err;print("[H&T] Error in the USER_CONFIG function:",err)}if(isActive){config.m2.c=hours;config.m=min;RANGES&&Number(config.m2.p)===-2?config.m2.c2=hours:void 0}}function parseParams(params){let res={};let splitted=params.split("&");for(let i=0;i<splitted.length;i++){let pair=splitted[i].split("=");res[pair[0]]=pair[1]}return res}function onHttpReq(req,resp){try{let params=parseParams(req.query);req=null;if(params.temp!=undefined){data={temp:Number(params.temp),ts:Date.now(),valid:true};for(let i=0;i<_.si.length;i++){if(HNT_MODE===2||i===HNT_MODE){_.si[i].chkTs=0}}resp.code=200}else{print("[H&T] Failed to update temp. data, 'temp' is missing from parameters:",params);resp.code=400}resp.send()}catch(err){print("[H&T] Error:",err)}}HTTPServer.registerEndpoint("update-temp",onHttpReq);
//end of addon
