/*Copyright (c) 2013 Olivier Poitrey <rs@dailymotion.com>

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is furnished
 to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.*/
class Ad{constructor(){this.id=null,this.sequence=null,this.system=null,this.title=null,this.description=null,this.advertiser=null,this.pricing=null,this.survey=null,this.errorURLTemplates=[],this.impressionURLTemplates=[],this.creatives=[],this.extensions=[]}}class AdExtension{constructor(){this.attributes={},this.children=[]}}class AdExtensionChild{constructor(){this.name=null,this.value=null,this.attributes={}}}class CompanionAd{constructor(){this.id=null,this.width=0,this.height=0,this.type=null,this.staticResource=null,this.htmlResource=null,this.iframeResource=null,this.altText=null,this.companionClickThroughURLTemplate=null,this.companionClickTrackingURLTemplates=[],this.trackingEvents={}}}class Creative{constructor(e={}){this.id=e.id||null,this.adId=e.adId||null,this.sequence=e.sequence||null,this.apiFramework=e.apiFramework||null,this.trackingEvents={}}}class CreativeCompanion extends Creative{constructor(e={}){super(e),this.type="companion",this.variations=[]}}function track(e,t){resolveURLTemplates(e,t).forEach(e=>{if("undefined"!=typeof window&&null!==window){(new Image).src=e}})}function resolveURLTemplates(e,t={}){const r=[];t.ASSETURI&&(t.ASSETURI=encodeURIComponentRFC3986(t.ASSETURI)),t.CONTENTPLAYHEAD&&(t.CONTENTPLAYHEAD=encodeURIComponentRFC3986(t.CONTENTPLAYHEAD)),t.ERRORCODE&&!/^[0-9]{3}$/.test(t.ERRORCODE)&&(t.ERRORCODE=900),t.CACHEBUSTING=leftpad(Math.round(1e8*Math.random()).toString()),t.TIMESTAMP=encodeURIComponentRFC3986((new Date).toISOString()),t.RANDOM=t.random=t.CACHEBUSTING;for(let i in e){let s=e[i];if("string"==typeof s){for(let e in t){const r=t[e],i=`[${e}]`,n=`%%${e}%%`;s=(s=s.replace(i,r)).replace(n,r)}r.push(s)}}return r}function encodeURIComponentRFC3986(e){return encodeURIComponent(e).replace(/[!'()*]/g,e=>`%${e.charCodeAt(0).toString(16)}`)}function leftpad(e){return e.length<8?range(0,8-e.length,!1).map(e=>"0").join("")+e:e}function range(e,t,r){let i=[],s=e<t,n=r?s?t+1:t-1:t;for(let t=e;s?t<n:t>n;s?t++:t--)i.push(t);return i}function isNumeric(e){return!isNaN(parseFloat(e))&&isFinite(e)}function flatten(e){return e.reduce((e,t)=>e.concat(Array.isArray(t)?flatten(t):t),[])}const util={track:track,resolveURLTemplates:resolveURLTemplates,encodeURIComponentRFC3986:encodeURIComponentRFC3986,leftpad:leftpad,range:range,isNumeric:isNumeric,flatten:flatten};function childByName(e,t){const r=e.childNodes;for(let e in r){const i=r[e];if(i.nodeName===t)return i}}function childrenByName(e,t){const r=[],i=e.childNodes;for(let e in i){const s=i[e];s.nodeName===t&&r.push(s)}return r}function resolveVastAdTagURI(e,t){if(!t)return e;if(0===e.indexOf("//")){const{protocol:t}=location;return`${t}${e}`}if(-1===e.indexOf("://")){return`${t.slice(0,t.lastIndexOf("/"))}/${e}`}return e}function parseBoolean(e){return-1!==["true","TRUE","1"].indexOf(e)}function parseNodeText(e){return e&&(e.textContent||e.text||"").trim()}function copyNodeAttribute(e,t,r){const i=t.getAttribute(e);i&&r.setAttribute(e,i)}function parseDuration(e){if(null==e)return-1;if(util.isNumeric(e))return parseInt(e);const t=e.split(":");if(3!==t.length)return-1;const r=t[2].split(".");let i=parseInt(r[0]);2===r.length&&(i+=parseFloat(`0.${r[1]}`));const s=parseInt(60*t[1]),n=parseInt(60*t[0]*60);return isNaN(n)||isNaN(s)||isNaN(i)||s>3600||i>60?-1:n+s+i}function splitVAST(e){const t=[];let r=null;return e.forEach((i,s)=>{if(i.sequence&&(i.sequence=parseInt(i.sequence,10)),i.sequence>1){const t=e[s-1];if(t&&t.sequence===i.sequence-1)return void(r&&r.push(i));delete i.sequence}r=[i],t.push(r)}),t}function mergeWrapperAdData(e,t){e.errorURLTemplates=t.errorURLTemplates.concat(e.errorURLTemplates),e.impressionURLTemplates=t.impressionURLTemplates.concat(e.impressionURLTemplates),e.extensions=t.extensions.concat(e.extensions),e.creatives.forEach(e=>{if(t.trackingEvents&&t.trackingEvents[e.type])for(let r in t.trackingEvents[e.type]){const i=t.trackingEvents[e.type][r];e.trackingEvents[r]||(e.trackingEvents[r]=[]),e.trackingEvents[r]=e.trackingEvents[r].concat(i)}}),t.videoClickTrackingURLTemplates&&t.videoClickTrackingURLTemplates.length&&e.creatives.forEach(e=>{"linear"===e.type&&(e.videoClickTrackingURLTemplates=e.videoClickTrackingURLTemplates.concat(t.videoClickTrackingURLTemplates))}),t.videoCustomClickURLTemplates&&t.videoCustomClickURLTemplates.length&&e.creatives.forEach(e=>{"linear"===e.type&&(e.videoCustomClickURLTemplates=e.videoCustomClickURLTemplates.concat(t.videoCustomClickURLTemplates))}),t.videoClickThroughURLTemplate&&e.creatives.forEach(e=>{"linear"===e.type&&null==e.videoClickThroughURLTemplate&&(e.videoClickThroughURLTemplate=t.videoClickThroughURLTemplate)})}const parserUtils={childByName:childByName,childrenByName:childrenByName,resolveVastAdTagURI:resolveVastAdTagURI,parseBoolean:parseBoolean,parseNodeText:parseNodeText,copyNodeAttribute:copyNodeAttribute,parseDuration:parseDuration,splitVAST:splitVAST,mergeWrapperAdData:mergeWrapperAdData};function parseCreativeCompanion(e,t){const r=new CreativeCompanion(t);return parserUtils.childrenByName(e,"Companion").forEach(e=>{const t=new CompanionAd;t.id=e.getAttribute("id")||null,t.width=e.getAttribute("width"),t.height=e.getAttribute("height"),t.companionClickTrackingURLTemplates=[],parserUtils.childrenByName(e,"HTMLResource").forEach(e=>{t.type=e.getAttribute("creativeType")||"text/html",t.htmlResource=parserUtils.parseNodeText(e)}),parserUtils.childrenByName(e,"IFrameResource").forEach(e=>{t.type=e.getAttribute("creativeType")||0,t.iframeResource=parserUtils.parseNodeText(e)}),parserUtils.childrenByName(e,"StaticResource").forEach(r=>{t.type=r.getAttribute("creativeType")||0,parserUtils.childrenByName(e,"AltText").forEach(e=>{t.altText=parserUtils.parseNodeText(e)}),t.staticResource=parserUtils.parseNodeText(r)}),parserUtils.childrenByName(e,"TrackingEvents").forEach(e=>{parserUtils.childrenByName(e,"Tracking").forEach(e=>{const r=e.getAttribute("event"),i=parserUtils.parseNodeText(e);r&&i&&(null==t.trackingEvents[r]&&(t.trackingEvents[r]=[]),t.trackingEvents[r].push(i))})}),parserUtils.childrenByName(e,"CompanionClickTracking").forEach(e=>{t.companionClickTrackingURLTemplates.push(parserUtils.parseNodeText(e))}),t.companionClickThroughURLTemplate=parserUtils.parseNodeText(parserUtils.childByName(e,"CompanionClickThrough")),t.companionClickTrackingURLTemplate=parserUtils.parseNodeText(parserUtils.childByName(e,"CompanionClickTracking")),r.variations.push(t)}),r}class CreativeLinear extends Creative{constructor(e={}){super(e),this.type="linear",this.duration=0,this.skipDelay=null,this.mediaFiles=[],this.videoClickThroughURLTemplate=null,this.videoClickTrackingURLTemplates=[],this.videoCustomClickURLTemplates=[],this.adParameters=null,this.icons=[]}}class Icon{constructor(){this.program=null,this.height=0,this.width=0,this.xPosition=0,this.yPosition=0,this.apiFramework=null,this.offset=null,this.duration=0,this.type=null,this.staticResource=null,this.htmlResource=null,this.iframeResource=null,this.iconClickThroughURLTemplate=null,this.iconClickTrackingURLTemplates=[],this.iconViewTrackingURLTemplate=null}}class MediaFile{constructor(){this.id=null,this.fileURL=null,this.deliveryType="progressive",this.mimeType=null,this.codec=null,this.bitrate=0,this.minBitrate=0,this.maxBitrate=0,this.width=0,this.height=0,this.apiFramework=null,this.scalable=null,this.maintainAspectRatio=null}}function parseCreativeLinear(e,t){let r;const i=new CreativeLinear(t);i.duration=parserUtils.parseDuration(parserUtils.parseNodeText(parserUtils.childByName(e,"Duration")));const s=e.getAttribute("skipoffset");if(null==s)i.skipDelay=null;else if("%"===s.charAt(s.length-1)&&-1!==i.duration){const e=parseInt(s,10);i.skipDelay=i.duration*(e/100)}else i.skipDelay=parserUtils.parseDuration(s);const n=parserUtils.childByName(e,"VideoClicks");n&&(i.videoClickThroughURLTemplate=parserUtils.parseNodeText(parserUtils.childByName(n,"ClickThrough")),parserUtils.childrenByName(n,"ClickTracking").forEach(e=>{i.videoClickTrackingURLTemplates.push(parserUtils.parseNodeText(e))}),parserUtils.childrenByName(n,"CustomClick").forEach(e=>{i.videoCustomClickURLTemplates.push(parserUtils.parseNodeText(e))}));const a=parserUtils.childByName(e,"AdParameters");a&&(i.adParameters=parserUtils.parseNodeText(a)),parserUtils.childrenByName(e,"TrackingEvents").forEach(e=>{parserUtils.childrenByName(e,"Tracking").forEach(e=>{let t=e.getAttribute("event");const s=parserUtils.parseNodeText(e);if(t&&s){if("progress"===t){if(!(r=e.getAttribute("offset")))return;t="%"===r.charAt(r.length-1)?`progress-${r}`:`progress-${Math.round(parserUtils.parseDuration(r))}`}null==i.trackingEvents[t]&&(i.trackingEvents[t]=[]),i.trackingEvents[t].push(s)}})}),parserUtils.childrenByName(e,"MediaFiles").forEach(e=>{parserUtils.childrenByName(e,"MediaFile").forEach(e=>{const t=new MediaFile;t.id=e.getAttribute("id"),t.fileURL=parserUtils.parseNodeText(e),t.deliveryType=e.getAttribute("delivery"),t.codec=e.getAttribute("codec"),t.mimeType=e.getAttribute("type"),t.apiFramework=e.getAttribute("apiFramework"),t.bitrate=parseInt(e.getAttribute("bitrate")||0),t.minBitrate=parseInt(e.getAttribute("minBitrate")||0),t.maxBitrate=parseInt(e.getAttribute("maxBitrate")||0),t.width=parseInt(e.getAttribute("width")||0),t.height=parseInt(e.getAttribute("height")||0);let r=e.getAttribute("scalable");r&&"string"==typeof r&&("true"===(r=r.toLowerCase())?t.scalable=!0:"false"===r&&(t.scalable=!1));let s=e.getAttribute("maintainAspectRatio");s&&"string"==typeof s&&("true"===(s=s.toLowerCase())?t.maintainAspectRatio=!0:"false"===s&&(t.maintainAspectRatio=!1)),i.mediaFiles.push(t)})});const o=parserUtils.childByName(e,"Icons");return o&&parserUtils.childrenByName(o,"Icon").forEach(e=>{const t=new Icon;t.program=e.getAttribute("program"),t.height=parseInt(e.getAttribute("height")||0),t.width=parseInt(e.getAttribute("width")||0),t.xPosition=parseXPosition(e.getAttribute("xPosition")),t.yPosition=parseYPosition(e.getAttribute("yPosition")),t.apiFramework=e.getAttribute("apiFramework"),t.offset=parserUtils.parseDuration(e.getAttribute("offset")),t.duration=parserUtils.parseDuration(e.getAttribute("duration")),parserUtils.childrenByName(e,"HTMLResource").forEach(e=>{t.type=e.getAttribute("creativeType")||"text/html",t.htmlResource=parserUtils.parseNodeText(e)}),parserUtils.childrenByName(e,"IFrameResource").forEach(e=>{t.type=e.getAttribute("creativeType")||0,t.iframeResource=parserUtils.parseNodeText(e)}),parserUtils.childrenByName(e,"StaticResource").forEach(e=>{t.type=e.getAttribute("creativeType")||0,t.staticResource=parserUtils.parseNodeText(e)});const r=parserUtils.childByName(e,"IconClicks");r&&(t.iconClickThroughURLTemplate=parserUtils.parseNodeText(parserUtils.childByName(r,"IconClickThrough")),parserUtils.childrenByName(r,"IconClickTracking").forEach(e=>{t.iconClickTrackingURLTemplates.push(parserUtils.parseNodeText(e))})),t.iconViewTrackingURLTemplate=parserUtils.parseNodeText(parserUtils.childByName(e,"IconViewTracking")),i.icons.push(t)}),i}function parseXPosition(e){return-1!==["left","right"].indexOf(e)?e:parseInt(e||0)}function parseYPosition(e){return-1!==["top","bottom"].indexOf(e)?e:parseInt(e||0)}class CreativeNonLinear extends Creative{constructor(e={}){super(e),this.type="nonlinear",this.variations=[]}}class NonLinearAd{constructor(){this.id=null,this.width=0,this.height=0,this.expandedWidth=0,this.expandedHeight=0,this.scalable=!0,this.maintainAspectRatio=!0,this.minSuggestedDuration=0,this.apiFramework="static",this.type=null,this.staticResource=null,this.htmlResource=null,this.iframeResource=null,this.nonlinearClickThroughURLTemplate=null,this.nonlinearClickTrackingURLTemplates=[],this.adParameters=null}}function parseCreativeNonLinear(e,t){const r=new CreativeNonLinear(t);return parserUtils.childrenByName(e,"TrackingEvents").forEach(e=>{let t,i;parserUtils.childrenByName(e,"Tracking").forEach(e=>{t=e.getAttribute("event"),i=parserUtils.parseNodeText(e),t&&i&&(null==r.trackingEvents[t]&&(r.trackingEvents[t]=[]),r.trackingEvents[t].push(i))})}),parserUtils.childrenByName(e,"NonLinear").forEach(e=>{const t=new NonLinearAd;t.id=e.getAttribute("id")||null,t.width=e.getAttribute("width"),t.height=e.getAttribute("height"),t.expandedWidth=e.getAttribute("expandedWidth"),t.expandedHeight=e.getAttribute("expandedHeight"),t.scalable=parserUtils.parseBoolean(e.getAttribute("scalable")),t.maintainAspectRatio=parserUtils.parseBoolean(e.getAttribute("maintainAspectRatio")),t.minSuggestedDuration=parserUtils.parseDuration(e.getAttribute("minSuggestedDuration")),t.apiFramework=e.getAttribute("apiFramework"),parserUtils.childrenByName(e,"HTMLResource").forEach(e=>{t.type=e.getAttribute("creativeType")||"text/html",t.htmlResource=parserUtils.parseNodeText(e)}),parserUtils.childrenByName(e,"IFrameResource").forEach(e=>{t.type=e.getAttribute("creativeType")||0,t.iframeResource=parserUtils.parseNodeText(e)}),parserUtils.childrenByName(e,"StaticResource").forEach(e=>{t.type=e.getAttribute("creativeType")||0,t.staticResource=parserUtils.parseNodeText(e)});const i=parserUtils.childByName(e,"AdParameters");i&&(t.adParameters=parserUtils.parseNodeText(i)),t.nonlinearClickThroughURLTemplate=parserUtils.parseNodeText(parserUtils.childByName(e,"NonLinearClickThrough")),parserUtils.childrenByName(e,"NonLinearClickTracking").forEach(e=>{t.nonlinearClickTrackingURLTemplates.push(parserUtils.parseNodeText(e))}),r.variations.push(t)}),r}function parseAd(e){const t=e.childNodes;for(let r in t){const i=t[r];if(-1!==["Wrapper","InLine"].indexOf(i.nodeName)){if(parserUtils.copyNodeAttribute("id",e,i),parserUtils.copyNodeAttribute("sequence",e,i),"Wrapper"===i.nodeName)return parseWrapper(i);if("InLine"===i.nodeName)return parseInLine(i)}}}function parseInLine(e){const t=e.childNodes,r=new Ad;r.id=e.getAttribute("id")||null,r.sequence=e.getAttribute("sequence")||null;for(let e in t){const i=t[e];switch(i.nodeName){case"Error":r.errorURLTemplates.push(parserUtils.parseNodeText(i));break;case"Impression":r.impressionURLTemplates.push(parserUtils.parseNodeText(i));break;case"Creatives":parserUtils.childrenByName(i,"Creative").forEach(e=>{const t={id:e.getAttribute("id")||null,adId:parseCreativeAdIdAttribute(e),sequence:e.getAttribute("sequence")||null,apiFramework:e.getAttribute("apiFramework")||null};for(let i in e.childNodes){const s=e.childNodes[i];switch(s.nodeName){case"Linear":let e=parseCreativeLinear(s,t);e&&r.creatives.push(e);break;case"NonLinearAds":let i=parseCreativeNonLinear(s,t);i&&r.creatives.push(i);break;case"CompanionAds":let n=parseCreativeCompanion(s,t);n&&r.creatives.push(n)}}});break;case"Extensions":parseExtensions(r.extensions,parserUtils.childrenByName(i,"Extension"));break;case"AdSystem":r.system={value:parserUtils.parseNodeText(i),version:i.getAttribute("version")||null};break;case"AdTitle":r.title=parserUtils.parseNodeText(i);break;case"Description":r.description=parserUtils.parseNodeText(i);break;case"Advertiser":r.advertiser=parserUtils.parseNodeText(i);break;case"Pricing":r.pricing={value:parserUtils.parseNodeText(i),model:i.getAttribute("model")||null,currency:i.getAttribute("currency")||null};break;case"Survey":r.survey=parserUtils.parseNodeText(i)}}return r}function parseWrapper(e){const t=parseInLine(e);let r=parserUtils.childByName(e,"VASTAdTagURI");if(r?t.nextWrapperURL=parserUtils.parseNodeText(r):(r=parserUtils.childByName(e,"VASTAdTagURL"))&&(t.nextWrapperURL=parserUtils.parseNodeText(parserUtils.childByName(r,"URL"))),t.creatives.forEach(e=>{if(-1!==["linear","nonlinear"].indexOf(e.type)){if(e.trackingEvents){t.trackingEvents||(t.trackingEvents={}),t.trackingEvents[e.type]||(t.trackingEvents[e.type]={});for(let r in e.trackingEvents){const i=e.trackingEvents[r];t.trackingEvents[e.type][r]||(t.trackingEvents[e.type][r]=[]),i.forEach(i=>{t.trackingEvents[e.type][r].push(i)})}}e.videoClickTrackingURLTemplates&&(t.videoClickTrackingURLTemplates||(t.videoClickTrackingURLTemplates=[]),e.videoClickTrackingURLTemplates.forEach(e=>{t.videoClickTrackingURLTemplates.push(e)})),e.videoClickThroughURLTemplate&&(t.videoClickThroughURLTemplate=e.videoClickThroughURLTemplate),e.videoCustomClickURLTemplates&&(t.videoCustomClickURLTemplates||(t.videoCustomClickURLTemplates=[]),e.videoCustomClickURLTemplates.forEach(e=>{t.videoCustomClickURLTemplates.push(e)}))}}),t.nextWrapperURL)return t}function parseExtensions(e,t){t.forEach(t=>{const r=new AdExtension,i=t.attributes,s=t.childNodes;if(t.attributes)for(let e in i){const t=i[e];t.nodeName&&t.nodeValue&&(r.attributes[t.nodeName]=t.nodeValue)}for(let e in s){const t=s[e],i=parserUtils.parseNodeText(t);if("#comment"!==t.nodeName&&""!==i){const e=new AdExtensionChild;if(e.name=t.nodeName,e.value=i,t.attributes){const r=t.attributes;for(let t in r){const i=r[t];e.attributes[i.nodeName]=i.nodeValue}}r.children.push(e)}}e.push(r)})}function parseCreativeAdIdAttribute(e){return e.getAttribute("AdID")||e.getAttribute("adID")||e.getAttribute("adId")||null}var domain;function EventHandlers(){}function EventEmitter(){EventEmitter.init.call(this)}function $getMaxListeners(e){return void 0===e._maxListeners?EventEmitter.defaultMaxListeners:e._maxListeners}function emitNone(e,t,r){if(t)e.call(r);else for(var i=e.length,s=arrayClone(e,i),n=0;n<i;++n)s[n].call(r)}function emitOne(e,t,r,i){if(t)e.call(r,i);else for(var s=e.length,n=arrayClone(e,s),a=0;a<s;++a)n[a].call(r,i)}function emitTwo(e,t,r,i,s){if(t)e.call(r,i,s);else for(var n=e.length,a=arrayClone(e,n),o=0;o<n;++o)a[o].call(r,i,s)}function emitThree(e,t,r,i,s,n){if(t)e.call(r,i,s,n);else for(var a=e.length,o=arrayClone(e,a),l=0;l<a;++l)o[l].call(r,i,s,n)}function emitMany(e,t,r,i){if(t)e.apply(r,i);else for(var s=e.length,n=arrayClone(e,s),a=0;a<s;++a)n[a].apply(r,i)}function _addListener(e,t,r,i){var s,n,a;if("function"!=typeof r)throw new TypeError('"listener" argument must be a function');if((n=e._events)?(n.newListener&&(e.emit("newListener",t,r.listener?r.listener:r),n=e._events),a=n[t]):(n=e._events=new EventHandlers,e._eventsCount=0),a){if("function"==typeof a?a=n[t]=i?[r,a]:[a,r]:i?a.unshift(r):a.push(r),!a.warned&&(s=$getMaxListeners(e))&&s>0&&a.length>s){a.warned=!0;var o=new Error("Possible EventEmitter memory leak detected. "+a.length+" "+t+" listeners added. Use emitter.setMaxListeners() to increase limit");o.name="MaxListenersExceededWarning",o.emitter=e,o.type=t,o.count=a.length,emitWarning(o)}}else a=n[t]=r,++e._eventsCount;return e}function emitWarning(e){"function"==typeof console.warn?console.warn(e):console.log(e)}function _onceWrap(e,t,r){var i=!1;function s(){e.removeListener(t,s),i||(i=!0,r.apply(e,arguments))}return s.listener=r,s}function listenerCount(e){var t=this._events;if(t){var r=t[e];if("function"==typeof r)return 1;if(r)return r.length}return 0}function spliceOne(e,t){for(var r=t,i=r+1,s=e.length;i<s;r+=1,i+=1)e[r]=e[i];e.pop()}function arrayClone(e,t){for(var r=new Array(t);t--;)r[t]=e[t];return r}function unwrapListeners(e){for(var t=new Array(e.length),r=0;r<t.length;++r)t[r]=e[r].listener||e[r];return t}function xdr(){let e;return window.XDomainRequest&&(e=new XDomainRequest),e}function supported(){return!!xdr()}function get(e,t,r){let i="function"==typeof window.ActiveXObject?new window.ActiveXObject("Microsoft.XMLDOM"):void 0;if(!i)return r(new Error("FlashURLHandler: Microsoft.XMLDOM format not supported"));i.async=!1,request.open("GET",e),request.timeout=t.timeout||0,request.withCredentials=t.withCredentials||!1,request.send(),request.onprogress=function(){},request.onload=function(){i.loadXML(request.responseText),r(null,i)}}EventHandlers.prototype=Object.create(null),EventEmitter.EventEmitter=EventEmitter,EventEmitter.usingDomains=!1,EventEmitter.prototype.domain=void 0,EventEmitter.prototype._events=void 0,EventEmitter.prototype._maxListeners=void 0,EventEmitter.defaultMaxListeners=10,EventEmitter.init=function(){this.domain=null,EventEmitter.usingDomains&&(!domain.active||this instanceof domain.Domain||(this.domain=domain.active)),this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=new EventHandlers,this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},EventEmitter.prototype.setMaxListeners=function(e){if("number"!=typeof e||e<0||isNaN(e))throw new TypeError('"n" argument must be a positive number');return this._maxListeners=e,this},EventEmitter.prototype.getMaxListeners=function(){return $getMaxListeners(this)},EventEmitter.prototype.emit=function(e){var t,r,i,s,n,a,o,l="error"===e;if(a=this._events)l=l&&null==a.error;else if(!l)return!1;if(o=this.domain,l){if(t=arguments[1],!o){if(t instanceof Error)throw t;var c=new Error('Uncaught, unspecified "error" event. ('+t+")");throw c.context=t,c}return t||(t=new Error('Uncaught, unspecified "error" event')),t.domainEmitter=this,t.domain=o,t.domainThrown=!1,o.emit("error",t),!1}if(!(r=a[e]))return!1;var p="function"==typeof r;switch(i=arguments.length){case 1:emitNone(r,p,this);break;case 2:emitOne(r,p,this,arguments[1]);break;case 3:emitTwo(r,p,this,arguments[1],arguments[2]);break;case 4:emitThree(r,p,this,arguments[1],arguments[2],arguments[3]);break;default:for(s=new Array(i-1),n=1;n<i;n++)s[n-1]=arguments[n];emitMany(r,p,this,s)}return!0},EventEmitter.prototype.addListener=function(e,t){return _addListener(this,e,t,!1)},EventEmitter.prototype.on=EventEmitter.prototype.addListener,EventEmitter.prototype.prependListener=function(e,t){return _addListener(this,e,t,!0)},EventEmitter.prototype.once=function(e,t){if("function"!=typeof t)throw new TypeError('"listener" argument must be a function');return this.on(e,_onceWrap(this,e,t)),this},EventEmitter.prototype.prependOnceListener=function(e,t){if("function"!=typeof t)throw new TypeError('"listener" argument must be a function');return this.prependListener(e,_onceWrap(this,e,t)),this},EventEmitter.prototype.removeListener=function(e,t){var r,i,s,n,a;if("function"!=typeof t)throw new TypeError('"listener" argument must be a function');if(!(i=this._events))return this;if(!(r=i[e]))return this;if(r===t||r.listener&&r.listener===t)0==--this._eventsCount?this._events=new EventHandlers:(delete i[e],i.removeListener&&this.emit("removeListener",e,r.listener||t));else if("function"!=typeof r){for(s=-1,n=r.length;n-- >0;)if(r[n]===t||r[n].listener&&r[n].listener===t){a=r[n].listener,s=n;break}if(s<0)return this;if(1===r.length){if(r[0]=void 0,0==--this._eventsCount)return this._events=new EventHandlers,this;delete i[e]}else spliceOne(r,s);i.removeListener&&this.emit("removeListener",e,a||t)}return this},EventEmitter.prototype.removeAllListeners=function(e){var t,r;if(!(r=this._events))return this;if(!r.removeListener)return 0===arguments.length?(this._events=new EventHandlers,this._eventsCount=0):r[e]&&(0==--this._eventsCount?this._events=new EventHandlers:delete r[e]),this;if(0===arguments.length){for(var i,s=Object.keys(r),n=0;n<s.length;++n)"removeListener"!==(i=s[n])&&this.removeAllListeners(i);return this.removeAllListeners("removeListener"),this._events=new EventHandlers,this._eventsCount=0,this}if("function"==typeof(t=r[e]))this.removeListener(e,t);else if(t)do{this.removeListener(e,t[t.length-1])}while(t[0]);return this},EventEmitter.prototype.listeners=function(e){var t,r=this._events;return r&&(t=r[e])?"function"==typeof t?[t.listener||t]:unwrapListeners(t):[]},EventEmitter.listenerCount=function(e,t){return"function"==typeof e.listenerCount?e.listenerCount(t):listenerCount.call(e,t)},EventEmitter.prototype.listenerCount=listenerCount,EventEmitter.prototype.eventNames=function(){return this._eventsCount>0?Reflect.ownKeys(this._events):[]};const flashURLHandler={get:get,supported:supported};function get$1(e,t,r){r(new Error("Please bundle the library for node to use the node urlHandler"))}const nodeURLHandler={get:get$1};function xhr(){try{const e=new window.XMLHttpRequest;return"withCredentials"in e?e:null}catch(e){return console.log("Error in XHRURLHandler support check:",e),null}}function supported$1(){return!!xhr()}function get$2(e,t,r){if("https:"===window.location.protocol&&0===e.indexOf("http://"))return r(new Error("XHRURLHandler: Cannot go from HTTPS to HTTP."));try{const i=xhr();i.open("GET",e),i.timeout=t.timeout||0,i.withCredentials=t.withCredentials||!1,i.overrideMimeType&&i.overrideMimeType("text/xml"),i.onreadystatechange=function(){4===i.readyState&&(200===i.status?r(null,i.responseXML):r(new Error(`XHRURLHandler: ${i.statusText}`)))},i.send()}catch(e){r(new Error("XHRURLHandler: Unexpected error"))}}const XHRURLHandler={get:get$2,supported:supported$1};function get$3(e,t,r){return r||("function"==typeof t&&(r=t),t={}),"undefined"==typeof window||null===window?nodeURLHandler.get(e,t,r):XHRURLHandler.supported()?XHRURLHandler.get(e,t,r):flashURLHandler.supported()?flashURLHandler.get(e,t,r):r(new Error("Current context is not supported by any of the default URLHandlers. Please provide a custom URLHandler"))}const urlHandler={get:get$3};class VASTResponse{constructor(){this.ads=[],this.errorURLTemplates=[]}}const DEFAULT_MAX_WRAPPER_DEPTH=10,DEFAULT_EVENT_DATA={ERRORCODE:900,extensions:[]};class VASTParser extends EventEmitter{constructor(){super(),this.remainingAds=[],this.parentURLs=[],this.errorURLTemplates=[],this.rootErrorURLTemplates=[],this.maxWrapperDepth=null,this.URLTemplateFilters=[],this.fetchingOptions={}}addURLTemplateFilter(e){"function"==typeof e&&this.URLTemplateFilters.push(e)}removeURLTemplateFilter(){this.URLTemplateFilters.pop()}countURLTemplateFilters(){return this.URLTemplateFilters.length}clearURLTemplateFilters(){this.URLTemplateFilters=[]}trackVastError(e,t,...r){this.emit("VAST-error",Object.assign(DEFAULT_EVENT_DATA,t,...r)),util.track(e,t)}getErrorURLTemplates(){return this.rootErrorURLTemplates.concat(this.errorURLTemplates)}fetchVAST(e,t,r){return new Promise((i,s)=>{this.URLTemplateFilters.forEach(t=>{e=t(e)}),this.parentURLs.push(e),this.emit("VAST-resolving",{url:e,wrapperDepth:t,originalUrl:r}),this.urlHandler.get(e,this.fetchingOptions,(t,r)=>{this.emit("VAST-resolved",{url:e,error:t}),t?s(t):i(r)})})}initParsingStatus(e={}){this.rootURL="",this.remainingAds=[],this.parentURLs=[],this.errorURLTemplates=[],this.rootErrorURLTemplates=[],this.maxWrapperDepth=e.wrapperLimit||DEFAULT_MAX_WRAPPER_DEPTH,this.fetchingOptions={timeout:e.timeout,withCredentials:e.withCredentials},this.urlHandler=e.urlhandler||urlHandler}getRemainingAds(e){if(0===this.remainingAds.length)return Promise.reject(new Error("No more ads are available for the given VAST"));const t=e?util.flatten(this.remainingAds):this.remainingAds.shift();return this.errorURLTemplates=[],this.parentURLs=[],this.resolveAds(t,{wrapperDepth:0,originalUrl:this.rootURL}).then(e=>this.buildVASTResponse(e))}getAndParseVAST(e,t={}){return this.initParsingStatus(t),this.rootURL=e,this.fetchVAST(e).then(r=>(t.originalUrl=e,t.isRootVAST=!0,this.parse(r,t).then(e=>this.buildVASTResponse(e))))}parseVAST(e,t={}){return this.initParsingStatus(t),t.isRootVAST=!0,this.parse(e,t).then(e=>this.buildVASTResponse(e))}buildVASTResponse(e){const t=new VASTResponse;return t.ads=e,t.errorURLTemplates=this.getErrorURLTemplates(),this.completeWrapperResolving(t),t}parse(e,{resolveAll:t=!0,wrapperSequence:r=null,originalUrl:i=null,wrapperDepth:s=0,isRootVAST:n=!1}){if(!e||!e.documentElement||"VAST"!==e.documentElement.nodeName)return Promise.reject(new Error("Invalid VAST XMLDocument"));let a=[];const o=e.documentElement.childNodes;for(let e in o){const t=o[e];if("Error"===t.nodeName){const e=parserUtils.parseNodeText(t);n?this.rootErrorURLTemplates.push(e):this.errorURLTemplates.push(e)}if("Ad"===t.nodeName){const e=parseAd(t);e?a.push(e):this.trackVastError(this.getErrorURLTemplates(),{ERRORCODE:101})}}const l=a.length,c=a[l-1];return 1===l&&void 0!==r&&null!==r&&c&&!c.sequence&&(c.sequence=r),!1===t&&(this.remainingAds=parserUtils.splitVAST(a),a=this.remainingAds.shift()),this.resolveAds(a,{wrapperDepth:s,originalUrl:i})}resolveAds(e=[],{wrapperDepth:t,originalUrl:r}){const i=[];return e.forEach(e=>{const s=this.resolveWrappers(e,t,r);i.push(s)}),Promise.all(i).then(e=>{const i=util.flatten(e);if(!i&&this.remainingAds.length>0){const e=this.remainingAds.shift();return this.resolveAds(e,{wrapperDepth:t,originalUrl:r})}return i})}resolveWrappers(e,t,r){return new Promise((i,s)=>{if(t++,!e.nextWrapperURL)return delete e.nextWrapperURL,i(e);if(t>=this.maxWrapperDepth||-1!==this.parentURLs.indexOf(e.nextWrapperURL))return e.errorCode=302,delete e.nextWrapperURL,i(e);e.nextWrapperURL=parserUtils.resolveVastAdTagURI(e.nextWrapperURL,r);const n=e.sequence;r=e.nextWrapperURL,this.fetchVAST(e.nextWrapperURL,t,r).then(s=>this.parse(s,{originalUrl:r,wrapperSequence:n,wrapperDepth:t}).then(t=>{if(delete e.nextWrapperURL,0===t.length)return e.creatives=[],i(e);t.forEach(t=>{t&&parserUtils.mergeWrapperAdData(t,e)}),i(t)})).catch(t=>{e.errorCode=301,e.errorMessage=t.message,i(e)})})}completeWrapperResolving(e){if(0===e.ads.length)this.trackVastError(e.errorURLTemplates,{ERRORCODE:303});else for(let t=e.ads.length-1;t>=0;t--){let r=e.ads[t];(r.errorCode||0===r.creatives.length)&&(this.trackVastError(r.errorURLTemplates.concat(e.errorURLTemplates),{ERRORCODE:r.errorCode||303},{ERRORMESSAGE:r.errorMessage||""},{extensions:r.extensions},{system:r.system}),e.ads.splice(t,1))}}}let storage=null;const DEFAULT_STORAGE={data:{},length:0,getItem(e){return this.data[e]},setItem(e,t){this.data[e]=t,this.length=Object.keys(this.data).length},removeItem(e){delete data[e],this.length=Object.keys(this.data).length},clear(){this.data={},this.length=0}};class Storage{constructor(){this.storage=this.initStorage()}initStorage(){if(storage)return storage;try{storage="undefined"!=typeof window&&null!==window?window.localStorage||window.sessionStorage:null}catch(e){storage=null}return storage&&!this.isStorageDisabled(storage)||(storage=DEFAULT_STORAGE).clear(),storage}isStorageDisabled(e){const t="__VASTStorage__";try{if(e.setItem(t,t),e.getItem(t)!==t)return e.removeItem(t),!0}catch(e){return!0}return e.removeItem(t),!1}getItem(e){return this.storage.getItem(e)}setItem(e,t){return this.storage.setItem(e,t)}removeItem(e){return this.storage.removeItem(e)}clear(){return this.storage.clear()}}class VASTClient{constructor(e,t,r){this.cappingFreeLunch=e||0,this.cappingMinimumTimeInterval=t||0,this.defaultOptions={withCredentials:!1,timeout:0},this.vastParser=new VASTParser,this.storage=r||new Storage,void 0===this.lastSuccessfulAd&&(this.lastSuccessfulAd=0),void 0===this.totalCalls&&(this.totalCalls=0),void 0===this.totalCallsTimeout&&(this.totalCallsTimeout=0)}getParser(){return this.vastParser}get lastSuccessfulAd(){return this.storage.getItem("vast-client-last-successful-ad")}set lastSuccessfulAd(e){this.storage.setItem("vast-client-last-successful-ad",e)}get totalCalls(){return this.storage.getItem("vast-client-total-calls")}set totalCalls(e){this.storage.setItem("vast-client-total-calls",e)}get totalCallsTimeout(){return this.storage.getItem("vast-client-total-calls-timeout")}set totalCallsTimeout(e){this.storage.setItem("vast-client-total-calls-timeout",e)}hasRemainingAds(){return this.vastParser.remainingAds.length>0}getNextAds(e){return this.vastParser.getRemainingAds(e)}get(e,t={}){const r=Date.now();return(t=Object.assign(this.defaultOptions,t)).hasOwnProperty("resolveAll")||(t.resolveAll=!1),this.totalCallsTimeout<r?(this.totalCalls=1,this.totalCallsTimeout=r+36e5):this.totalCalls++,new Promise((i,s)=>{if(this.cappingFreeLunch>=this.totalCalls)return s(new Error(`VAST call canceled – FreeLunch capping not reached yet ${this.totalCalls}/${this.cappingFreeLunch}`));const n=r-this.lastSuccessfulAd;if(n<0)this.lastSuccessfulAd=0;else if(n<this.cappingMinimumTimeInterval)return s(new Error(`VAST call canceled – (${this.cappingMinimumTimeInterval})ms minimum interval reached`));this.vastParser.getAndParseVAST(e,t).then(e=>i(e)).catch(e=>s(e))})}}const DEFAULT_SKIP_DELAY=-1;class VASTTracker extends EventEmitter{constructor(e,t,r,i=null){super(),this.ad=t,this.creative=r,this.variation=i,this.muted=!1,this.impressed=!1,this.skippable=!1,this.trackingEvents={},this._alreadyTriggeredQuartiles={},this.emitAlwaysEvents=["creativeView","start","firstQuartile","midpoint","thirdQuartile","complete","resume","pause","rewind","skip","closeLinear","close"];for(let e in this.creative.trackingEvents){const t=this.creative.trackingEvents[e];this.trackingEvents[e]=t.slice(0)}this.creative instanceof CreativeLinear?this._initLinearTracking():this._initVariationTracking(),e&&this.on("start",()=>{e.lastSuccessfulAd=Date.now()})}_initLinearTracking(){this.linear=!0,this.skipDelay=this.creative.skipDelay,this.setDuration(this.creative.duration),this.clickThroughURLTemplate=this.creative.videoClickThroughURLTemplate,this.clickTrackingURLTemplates=this.creative.videoClickTrackingURLTemplates}_initVariationTracking(){if(this.linear=!1,this.skipDelay=DEFAULT_SKIP_DELAY,this.variation){for(let e in this.variation.trackingEvents){const t=this.variation.trackingEvents[e];this.trackingEvents[e]?this.trackingEvents[e]=this.trackingEvents[e].concat(t.slice(0)):this.trackingEvents[e]=t.slice(0)}this.variation instanceof NonLinearAd?(this.clickThroughURLTemplate=this.variation.nonlinearClickThroughURLTemplate,this.clickTrackingURLTemplates=this.variation.nonlinearClickTrackingURLTemplates,this.setDuration(this.variation.minSuggestedDuration)):this.variation instanceof CompanionAd&&(this.clickThroughURLTemplate=this.variation.companionClickThroughURLTemplate,this.clickTrackingURLTemplates=this.variation.companionClickTrackingURLTemplates)}}setDuration(e){this.assetDuration=e,this.quartiles={firstQuartile:Math.round(25*this.assetDuration)/100,midpoint:Math.round(50*this.assetDuration)/100,thirdQuartile:Math.round(75*this.assetDuration)/100}}setProgress(e){const t=this.skipDelay||DEFAULT_SKIP_DELAY;if(-1===t||this.skippable||(t>e?this.emit("skip-countdown",t-e):(this.skippable=!0,this.emit("skip-countdown",0))),this.assetDuration>0){const t=[];if(e>0){const r=Math.round(e/this.assetDuration*100);t.push("start"),t.push(`progress-${r}%`),t.push(`progress-${Math.round(e)}`);for(let r in this.quartiles)this.isQuartileReached(r,this.quartiles[r],e)&&(t.push(r),this._alreadyTriggeredQuartiles[r]=!0)}t.forEach(e=>{this.track(e,!0)}),e<this.progress&&this.track("rewind")}this.progress=e}isQuartileReached(e,t,r){let i=!1;return t<=r&&!this._alreadyTriggeredQuartiles[e]&&(i=!0),i}setMuted(e){this.muted!==e&&this.track(e?"mute":"unmute"),this.muted=e}setPaused(e){this.paused!==e&&this.track(e?"pause":"resume"),this.paused=e}setFullscreen(e){this.fullscreen!==e&&this.track(e?"fullscreen":"exitFullscreen"),this.fullscreen=e}setExpand(e){this.expanded!==e&&this.track(e?"expand":"collapse"),this.expanded=e}setSkipDelay(e){"number"==typeof e&&(this.skipDelay=e)}trackImpression(){this.impressed||(this.impressed=!0,this.trackURLs(this.ad.impressionURLTemplates),this.track("creativeView"))}errorWithCode(e){this.trackURLs(this.ad.errorURLTemplates,{ERRORCODE:e})}complete(){this.track("complete")}close(){this.track(this.linear?"closeLinear":"close")}skip(){this.track("skip"),this.trackingEvents=[]}click(e=null){this.clickTrackingURLTemplates&&this.clickTrackingURLTemplates.length&&this.trackURLs(this.clickTrackingURLTemplates);const t=this.clickThroughURLTemplate||e;if(t){const e=this.linear?{CONTENTPLAYHEAD:this.progressFormatted()}:{},r=util.resolveURLTemplates([t],e)[0];this.emit("clickthrough",r)}}track(e,t=!1){"closeLinear"===e&&!this.trackingEvents[e]&&this.trackingEvents.close&&(e="close");const r=this.trackingEvents[e],i=this.emitAlwaysEvents.indexOf(e)>-1;r?(this.emit(e,""),this.trackURLs(r)):i&&this.emit(e,""),t&&(delete this.trackingEvents[e],i&&this.emitAlwaysEvents.splice(this.emitAlwaysEvents.indexOf(e),1))}trackURLs(e,t={}){this.linear&&(this.creative&&this.creative.mediaFiles&&this.creative.mediaFiles[0]&&this.creative.mediaFiles[0].fileURL&&(t.ASSETURI=this.creative.mediaFiles[0].fileURL),t.CONTENTPLAYHEAD=this.progressFormatted()),util.track(e,t)}progressFormatted(){const e=parseInt(this.progress);let t=e/3600;t.length<2&&(t=`0${t}`);let r=e/60%60;r.length<2&&(r=`0${r}`);let i=e%60;return i.length<2&&(i=`0${r}`),`${t}:${r}:${i}.${parseInt(100*(this.progress-e))}`}}export{VASTClient,VASTParser,VASTTracker};