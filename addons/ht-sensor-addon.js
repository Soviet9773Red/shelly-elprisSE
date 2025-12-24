// @license (c) Jussi Isotalo - https://github.com/jisotalo/shelly-porssisahko-en
// @license (c) SE1-4 anpassad av Alexander - https://elpris.eu
/** ver. 1.0.4 H&T addon
 * insert directly into main script after // end of shelly-elpris
 * Controls cheap hours and ON-time based on temperature
 * H&T Gen2-3: Settings -> Actions -> Temperature -> Then do:
 * http://ip/script/1/update-temp?temp=$temperature
 * where: ip = device IP, /script/1 = shelly-elprisSE script number
 * Test: http://ip/script/1/update-temp?temp=18
 */

let INST = 0; // 0 = config#1, 1 = config#2 etc.
// How old temperature data is allowed in hours
let TEMP_MAX_AGE_HOURS = 3;
// How to apply H&T logic Custom ranges
let RANGES = true; // true = both Custom ranges, false = Custom range 1 only
// Latest known temperature data
let data = {temp: null, ts: Date.now(), valid: false};
// Fallback config, when no data stored or H&T data is missing or outdated
let fallbConf = {hours: 14, min: 60};

function fTime(ts){let d=new Date(ts);let h=d.getHours();let m=d.getMinutes();let s=d.getSeconds();return(h<10?"0":"")+h+":"+(m<10?"0":"")+m+":"+(s<10?"0":"")+s}function USER_CONFIG(inst,initialized){if(inst!=INST){return}const state=_;const config=state.c.i[inst];let priceNow=state.s&&state.s.p&&state.s.p[0]?state.s.p[0].now:undefined;let alwaysOnOverride=priceNow!==undefined&&(config.m2&&typeof config.m2.l==="number")&&priceNow<=config.m2.l;let alwaysOffOverride=priceNow!==undefined&&(config.m2&&typeof config.m2.m==="number")&&priceNow>=config.m2.m;if(typeof config.m2=="undefined"){print("[H&T] Config not available yet - user has not saved settings");return}if(config.m2&&typeof config.m2.c==="number"&&typeof config.m==="number"){fallbConf.hours=config.m2.c;fallbConf.min=config.m;print("[H&T] Using cheapest time from Setup:",fallbConf)}let hours=fallbConf.hours;let min=fallbConf.min;try{let mode=config.mode!==undefined?config.mode:2;let tStr=data.temp===null||data.temp===undefined?"-":data.temp.toFixed(1);let age=(Date.now()-data.ts)/36e5;if(!data.valid){state.si[inst].str=mode===2?"Waiting H&T data since "+fTime(data.ts)+" ...<br>"+"Using cheapest time from Setup: "+hours+" h, ON-time: "+min+" min":"H&T active (waiting data), no effect in this mode"}else{print("[H&T] event updated temperature:",data.temp.toFixed(1),"°C");if(age<=TEMP_MAX_AGE_HOURS){
	
// Change the number of heating hours and minutes (min) based on t°C from H&T
// Example logic for 2x12 hours periods
	(data.temp <= 18 ) ? (hours = 11, min = 60) :
	(data.temp <  19 ) ? (hours = 10, min = 60) :
	(data.temp <  20 ) ? (hours = 9,  min = 60) :
	(data.temp <  21 ) ? (hours = 8,  min = 45) :
	(data.temp < 21.5) ? (hours = 7,  min = 45) :
	(data.temp < 22.5) ? (hours = 4,  min = 45) :
	(data.temp >=22.5) ? (hours = 1,  min = 30) : null; // almost OFF
// End of custom logic
	
let htMsg=mode===2?"H&T event updated @ "+fTime(data.ts)+" | "+tStr+"°C<br>"+"Cheapest time tuned: "+hours+"h, ON-time: "+min+" min":"H&T active ("+tStr+"°C), no effect in this mode";if(mode===2){alwaysOffOverride?htMsg+=", but overridden by Always OFF price value":alwaysOnOverride?htMsg+=", but overridden by Always ON price value":void 0}state.si[inst].str=htMsg;print("[H&T] Changed number of cheapest hours:",hours,"h and ON-time:",min,"min")}else{print("Outdated °C data -> Last Setup values applied");data.valid=false;data.temp=null;data.ts=Date.now();state.si[inst].str="Outdated °C data ("+age.toFixed(1)+" h)<br>"+"Using saved config: "+hours+" h, ON-time: "+min+" min"}}}catch(err){state.si[inst].str="Error in temp. control:"+err;print("[H&T] An error occurred in the USER_CONFIG function:",err)}config.m2.c=hours;config.m=min;RANGES&&Number(config.m2.p)===-2?config.m2.c2=hours:void 0}function parseParams(params){let res={};let splitted=params.split("&");for(let i=0;i<splitted.length;i++){let pair=splitted[i].split("=");res[pair[0]]=pair[1]}return res}function onHttpReq(req,resp){try{let params=parseParams(req.query);req=null;if(params.temp!=undefined){data={temp:Number(params.temp),ts:Date.now(),valid:true};_.si[INST].chkTs=0;resp.code=200}else{print("[H&T] Failed to update temp. data, 'temp' is missing from parameters:",params);resp.code=400}resp.send()}catch(err){print("[H&T] Error:",err)}}HTTPServer.registerEndpoint("update-temp",onHttpReq);
//end of addon



