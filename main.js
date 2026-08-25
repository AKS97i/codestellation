var zf=Object.create;var Hr=Object.defineProperty;var Hf=Object.getOwnPropertyDescriptor;var Vf=Object.getOwnPropertyNames;var Gf=Object.getPrototypeOf,Wf=Object.prototype.hasOwnProperty;var Xf=(i,t)=>{for(var e in t)Hr(i,e,{get:t[e],enumerable:!0})},Mh=(i,t,e,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Vf(t))!Wf.call(i,s)&&s!==e&&Hr(i,s,{get:()=>t[s],enumerable:!(n=Hf(t,s))||n.enumerable});return i};var jt=(i,t,e)=>(e=i!=null?zf(Gf(i)):{},Mh(t||!i||!i.__esModule?Hr(e,"default",{value:i,enumerable:!0}):e,i)),$f=i=>Mh(Hr({},"__esModule",{value:!0}),i);var m_={};Xf(m_,{default:()=>Ml});module.exports=$f(m_);var Lf=require("obsidian");var Hi="codestellation-home",Vi="codestellation-workspace",Vr="Codestellation",wh=`${Vr}/_data`,Oe=`${Vr}/projects`;var rn=require("obsidian");function Gi(i){let t=0;for(let e=0;e<i.length;e++)t=t*31+i.charCodeAt(e)|0;return Math.abs(t)%360}function Us(i,t=70,e=55){let n=t/100,s=e/100,r=(1-Math.abs(2*s-1))*n,a=r*(1-Math.abs(i/60%2-1)),o=s-r/2,l=0,c=0,h=0;i<60?[l,c,h]=[r,a,0]:i<120?[l,c,h]=[a,r,0]:i<180?[l,c,h]=[0,r,a]:i<240?[l,c,h]=[0,a,r]:i<300?[l,c,h]=[a,0,r]:[l,c,h]=[r,0,a];let d=u=>Math.round((u+o)*255).toString(16).padStart(2,"0");return`#${d(l)}${d(c)}${d(h)}`}function Eh(i){let t=/^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(i);if(!t)return 0;let e=parseInt(t[1],16)/255,n=parseInt(t[2],16)/255,s=parseInt(t[3],16)/255,r=Math.max(e,n,s),a=Math.min(e,n,s),o=r-a;if(o===0)return 0;let l;return r===e?l=(n-s)/o%6:r===n?l=(s-e)/o+2:l=(e-n)/o+4,l*=60,l<0?l+360:l}var Tl="Codestellation/_data/projects.json";function Gr(i){return(i.split("/").filter(Boolean).pop()??i).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"project"}async function Ye(i){if(!await i.adapter.exists(Tl))return[];let e=await i.adapter.read(Tl);try{let n=JSON.parse(e);return Array.isArray(n)?n:[]}catch{return[]}}async function He(i,t){await i.adapter.write(Tl,JSON.stringify(t,null,2))}function Th(i,{name:t,path:e,hue:n}){if(i.find(l=>l.path===e))return i;let r=Gr(e),a=2;for(;i.some(l=>l.id===r);)r=`${Gr(e)}-${a}`,a++;let o={id:r,name:t,path:e,hue:n??Gi(r),graphPath:null,importedAt:new Date().toISOString(),showBranchMoons:!0,showBranchSatellites:!0};return[...i,o]}var no="185";var Qh=0,cc=1,tu=2;var fr=1,eu=2,gs=3,kn=0,Ne=1,nn=2,En=0,Ti=1,Tn=2,hc=3,uc=4,nu=5;var ni=100,iu=101,su=102,ru=103,au=104,ou=200,lu=201,cu=202,hu=203,ya=204,_a=205,uu=206,du=207,fu=208,pu=209,mu=210,gu=211,xu=212,yu=213,_u=214,va=0,ba=1,Sa=2,Ai=3,Ma=4,wa=5,Ea=6,Ta=7,dc=0,vu=1,bu=2,dn=0,fc=1,pc=2,mc=3,pr=4,gc=5,xc=6,yc=7;var _c=300,hi=301,Li=302,io=303,so=304,mr=306,ii=1e3,bn=1001,Aa=1002,Pe=1003,Su=1004;var gr=1005;var Le=1006,ro=1007;var ui=1008;var $e=1009,vc=1010,bc=1011,xs=1012,ao=1013,fn=1014,pn=1015,An=1016,oo=1017,lo=1018,ys=1020,Sc=35902,Mc=35899,wc=1021,Ec=1022,sn=1023,Sn=1026,di=1027,Tc=1028,co=1029,fi=1030,ho=1031;var uo=1033,xr=33776,yr=33777,_r=33778,vr=33779,fo=35840,po=35841,mo=35842,go=35843,xo=36196,yo=37492,_o=37496,vo=37488,bo=37489,br=37490,So=37491,Mo=37808,wo=37809,Eo=37810,To=37811,Ao=37812,Co=37813,Ro=37814,Po=37815,Io=37816,Lo=37817,Do=37818,No=37819,Uo=37820,Fo=37821,Oo=36492,Bo=36494,ko=36495,zo=36283,Ho=36284,Sr=36285,Vo=36286;var Ws=2300,Ca=2301,xa=2302,Ql=2303,tc=2400,ec=2401,nc=2402;var Mu=3200;var Go=0,wu=1,Wn="",Ee="srgb",Xs="srgb-linear",$s="linear",Kt="srgb";var wi=7680;var ic=519,Eu=512,Tu=513,Au=514,Wo=515,Cu=516,Ru=517,Xo=518,Pu=519,Ra=35044;var Ac="300 es",cn=2e3,os=2001;function qf(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Yf(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function qs(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Iu(){let i=qs("canvas");return i.style.display="block",i}var Ah={},ls=null;function Ys(...i){let t="THREE."+i.shift();ls?ls("log",t,...i):console.log(t,...i)}function Lu(i){let t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Rt(...i){i=Lu(i);let t="THREE."+i.shift();if(ls)ls("warn",t,...i);else{let e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function Pt(...i){i=Lu(i);let t="THREE."+i.shift();if(ls)ls("error",t,...i);else{let e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function Ei(...i){let t=i.join(" ");t in Ah||(Ah[t]=!0,Rt(...i))}function Du(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}var Nu={[va]:ba,[Sa]:Ea,[Ma]:Ta,[Ai]:wa,[ba]:va,[Ea]:Sa,[Ta]:Ma,[wa]:Ai},Mn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let s=n[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}},Be=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var Al=Math.PI/180,Pa=180/Math.PI;function ei(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Be[i&255]+Be[i>>8&255]+Be[i>>16&255]+Be[i>>24&255]+"-"+Be[t&255]+Be[t>>8&255]+"-"+Be[t>>16&15|64]+Be[t>>24&255]+"-"+Be[e&63|128]+Be[e>>8&255]+"-"+Be[e>>16&255]+Be[e>>24&255]+Be[n&255]+Be[n>>8&255]+Be[n>>16&255]+Be[n>>24&255]).toLowerCase()}function Xt(i,t,e){return Math.max(t,Math.min(e,i))}function jf(i,t){return(i%t+t)%t}function Cl(i,t,e){return(1-e)*i+e*t}function vn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function ee(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var Lc=class Lc{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Xt(this.x,t.x,e.x),this.y=Xt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Xt(this.x,t,e),this.y=Xt(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Xt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Xt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Lc.prototype.isVector2=!0;var Dt=Lc,wn=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let l=n[s+0],c=n[s+1],h=n[s+2],d=n[s+3],u=r[a+0],m=r[a+1],x=r[a+2],v=r[a+3];if(d!==v||l!==u||c!==m||h!==x){let p=l*u+c*m+h*x+d*v;p<0&&(u=-u,m=-m,x=-x,v=-v,p=-p);let f=1-o;if(p<.9995){let S=Math.acos(p),T=Math.sin(S);f=Math.sin(f*S)/T,o=Math.sin(o*S)/T,l=l*f+u*o,c=c*f+m*o,h=h*f+x*o,d=d*f+v*o}else{l=l*f+u*o,c=c*f+m*o,h=h*f+x*o,d=d*f+v*o;let S=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=S,c*=S,h*=S,d*=S}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,s,r,a){let o=n[s],l=n[s+1],c=n[s+2],h=n[s+3],d=r[a],u=r[a+1],m=r[a+2],x=r[a+3];return t[e]=o*x+h*d+l*m-c*u,t[e+1]=l*x+h*u+c*d-o*m,t[e+2]=c*x+h*m+o*u-l*d,t[e+3]=h*x-o*d-l*u-c*m,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(s/2),d=o(r/2),u=l(n/2),m=l(s/2),x=l(r/2);switch(a){case"XYZ":this._x=u*h*d+c*m*x,this._y=c*m*d-u*h*x,this._z=c*h*x+u*m*d,this._w=c*h*d-u*m*x;break;case"YXZ":this._x=u*h*d+c*m*x,this._y=c*m*d-u*h*x,this._z=c*h*x-u*m*d,this._w=c*h*d+u*m*x;break;case"ZXY":this._x=u*h*d-c*m*x,this._y=c*m*d+u*h*x,this._z=c*h*x+u*m*d,this._w=c*h*d-u*m*x;break;case"ZYX":this._x=u*h*d-c*m*x,this._y=c*m*d+u*h*x,this._z=c*h*x-u*m*d,this._w=c*h*d+u*m*x;break;case"YZX":this._x=u*h*d+c*m*x,this._y=c*m*d+u*h*x,this._z=c*h*x-u*m*d,this._w=c*h*d-u*m*x;break;case"XZY":this._x=u*h*d-c*m*x,this._y=c*m*d-u*h*x,this._z=c*h*x+u*m*d,this._w=c*h*d+u*m*x;break;default:Rt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],d=e[10],u=n+o+d;if(u>0){let m=.5/Math.sqrt(u+1);this._w=.25/m,this._x=(h-l)*m,this._y=(r-c)*m,this._z=(a-s)*m}else if(n>o&&n>d){let m=2*Math.sqrt(1+n-o-d);this._w=(h-l)/m,this._x=.25*m,this._y=(s+a)/m,this._z=(r+c)/m}else if(o>d){let m=2*Math.sqrt(1+o-n-d);this._w=(r-c)/m,this._x=(s+a)/m,this._y=.25*m,this._z=(l+h)/m}else{let m=2*Math.sqrt(1+d-n-o);this._w=(a-s)/m,this._x=(r+c)/m,this._y=(l+h)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Xt(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-s*o,this._w=a*h-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let l=1-e;if(o<.9995){let c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,e=Math.sin(e*c)/h,this._x=this._x*l+n*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this._onChangeCallback()}else this._x=this._x*l+n*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Dc=class Dc{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Ch.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Ch.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*n),h=2*(o*e-r*s),d=2*(r*n-a*e);return this.x=e+l*c+a*d-o*h,this.y=n+l*h+o*c-r*d,this.z=s+l*d+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Xt(this.x,t.x,e.x),this.y=Xt(this.y,t.y,e.y),this.z=Xt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Xt(this.x,t,e),this.y=Xt(this.y,t,e),this.z=Xt(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Xt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Rl.copy(this).projectOnVector(t),this.sub(Rl)}reflect(t){return this.sub(Rl.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Xt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Dc.prototype.isVector3=!0;var L=Dc,Rl=new L,Ch=new wn,Nc=class Nc{constructor(t,e,n,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c)}set(t,e,n,s,r,a,o,l,c){let h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],d=n[7],u=n[2],m=n[5],x=n[8],v=s[0],p=s[3],f=s[6],S=s[1],T=s[4],b=s[7],A=s[2],M=s[5],C=s[8];return r[0]=a*v+o*S+l*A,r[3]=a*p+o*T+l*M,r[6]=a*f+o*b+l*C,r[1]=c*v+h*S+d*A,r[4]=c*p+h*T+d*M,r[7]=c*f+h*b+d*C,r[2]=u*v+m*S+x*A,r[5]=u*p+m*T+x*M,r[8]=u*f+m*b+x*C,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*r*h+n*o*l+s*r*c-s*a*l}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=h*a-o*c,u=o*l-h*r,m=c*r-a*l,x=e*d+n*u+s*m;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);let v=1/x;return t[0]=d*v,t[1]=(s*c-h*n)*v,t[2]=(o*n-s*a)*v,t[3]=u*v,t[4]=(h*e-s*l)*v,t[5]=(s*r-o*e)*v,t[6]=m*v,t[7]=(n*l-c*e)*v,t[8]=(a*e-n*r)*v,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return Ei("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Pl.makeScale(t,e)),this}rotate(t){return Ei("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Pl.makeRotation(-t)),this}translate(t,e){return Ei("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Pl.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}};Nc.prototype.isMatrix3=!0;var Ut=Nc,Pl=new Ut,Rh=new Ut().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ph=new Ut().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Zf(){let i={enabled:!0,workingColorSpace:Xs,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Kt&&(s.r=Bn(s.r),s.g=Bn(s.g),s.b=Bn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Kt&&(s.r=as(s.r),s.g=as(s.g),s.b=as(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Wn?$s:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Ei("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Ei("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Xs]:{primaries:t,whitePoint:n,transfer:$s,toXYZ:Rh,fromXYZ:Ph,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Ee},outputColorSpaceConfig:{drawingBufferColorSpace:Ee}},[Ee]:{primaries:t,whitePoint:n,transfer:Kt,toXYZ:Rh,fromXYZ:Ph,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Ee}}}),i}var Wt=Zf();function Bn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function as(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Wi,Ia=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Wi===void 0&&(Wi=qs("canvas")),Wi.width=t.width,Wi.height=t.height;let s=Wi.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=Wi}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=qs("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Bn(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Bn(e[n]/255)*255):e[n]=Bn(e[n]);return{data:e,width:t.width,height:t.height}}else return Rt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Jf=0,cs=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Jf++}),this.uuid=ei(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Il(s[a].image)):r.push(Il(s[a]))}else r=Il(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function Il(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Ia.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Rt("Texture: Unable to serialize Texture."),{})}var Kf=0,Ll=new L,Ge=class i extends Mn{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=bn,s=bn,r=Le,a=ui,o=sn,l=$e,c=i.DEFAULT_ANISOTROPY,h=Wn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Kf++}),this.uuid=ei(),this.name="",this.source=new cs(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Dt(0,0),this.repeat=new Dt(1,1),this.center=new Dt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ut,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Ll).x}get height(){return this.source.getSize(Ll).y}get depth(){return this.source.getSize(Ll).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){Rt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Rt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==_c)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case ii:t.x=t.x-Math.floor(t.x);break;case bn:t.x=t.x<0?0:1;break;case Aa:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case ii:t.y=t.y-Math.floor(t.y);break;case bn:t.y=t.y<0?0:1;break;case Aa:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Ge.DEFAULT_IMAGE=null;Ge.DEFAULT_MAPPING=_c;Ge.DEFAULT_ANISOTROPY=1;var Uc=class Uc{constructor(t=0,e=0,n=0,s=1){this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,l=t.elements,c=l[0],h=l[4],d=l[8],u=l[1],m=l[5],x=l[9],v=l[2],p=l[6],f=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-v)<.01&&Math.abs(x-p)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+v)<.1&&Math.abs(x+p)<.1&&Math.abs(c+m+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let T=(c+1)/2,b=(m+1)/2,A=(f+1)/2,M=(h+u)/4,C=(d+v)/4,y=(x+p)/4;return T>b&&T>A?T<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(T),s=M/n,r=C/n):b>A?b<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(b),n=M/s,r=y/s):A<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(A),n=C/r,s=y/r),this.set(n,s,r,e),this}let S=Math.sqrt((p-x)*(p-x)+(d-v)*(d-v)+(u-h)*(u-h));return Math.abs(S)<.001&&(S=1),this.x=(p-x)/S,this.y=(d-v)/S,this.z=(u-h)/S,this.w=Math.acos((c+m+f-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Xt(this.x,t.x,e.x),this.y=Xt(this.y,t.y,e.y),this.z=Xt(this.z,t.z,e.z),this.w=Xt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Xt(this.x,t,e),this.y=Xt(this.y,t,e),this.z=Xt(this.z,t,e),this.w=Xt(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Xt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Uc.prototype.isVector4=!0;var ue=Uc,La=class extends Mn{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Le,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new ue(0,0,t,e),this.scissorTest=!1,this.viewport=new ue(0,0,t,e),this.textures=[];let s={width:t,height:e,depth:n.depth},r=new Ge(s),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:Le,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new cs(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ke=class extends La{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},js=class extends Ge{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Pe,this.minFilter=Pe,this.wrapR=bn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Da=class extends Ge{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Pe,this.minFilter=Pe,this.wrapR=bn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var eo=class eo{constructor(t,e,n,s,r,a,o,l,c,h,d,u,m,x,v,p){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c,h,d,u,m,x,v,p)}set(t,e,n,s,r,a,o,l,c,h,d,u,m,x,v,p){let f=this.elements;return f[0]=t,f[4]=e,f[8]=n,f[12]=s,f[1]=r,f[5]=a,f[9]=o,f[13]=l,f[2]=c,f[6]=h,f[10]=d,f[14]=u,f[3]=m,f[7]=x,f[11]=v,f[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new eo().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,n=t.elements,s=1/Xi.setFromMatrixColumn(t,0).length(),r=1/Xi.setFromMatrixColumn(t,1).length(),a=1/Xi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){let u=a*h,m=a*d,x=o*h,v=o*d;e[0]=l*h,e[4]=-l*d,e[8]=c,e[1]=m+x*c,e[5]=u-v*c,e[9]=-o*l,e[2]=v-u*c,e[6]=x+m*c,e[10]=a*l}else if(t.order==="YXZ"){let u=l*h,m=l*d,x=c*h,v=c*d;e[0]=u+v*o,e[4]=x*o-m,e[8]=a*c,e[1]=a*d,e[5]=a*h,e[9]=-o,e[2]=m*o-x,e[6]=v+u*o,e[10]=a*l}else if(t.order==="ZXY"){let u=l*h,m=l*d,x=c*h,v=c*d;e[0]=u-v*o,e[4]=-a*d,e[8]=x+m*o,e[1]=m+x*o,e[5]=a*h,e[9]=v-u*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){let u=a*h,m=a*d,x=o*h,v=o*d;e[0]=l*h,e[4]=x*c-m,e[8]=u*c+v,e[1]=l*d,e[5]=v*c+u,e[9]=m*c-x,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){let u=a*l,m=a*c,x=o*l,v=o*c;e[0]=l*h,e[4]=v-u*d,e[8]=x*d+m,e[1]=d,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=m*d+x,e[10]=u-v*d}else if(t.order==="XZY"){let u=a*l,m=a*c,x=o*l,v=o*c;e[0]=l*h,e[4]=-d,e[8]=c*h,e[1]=u*d+v,e[5]=a*h,e[9]=m*d-x,e[2]=x*d-m,e[6]=o*h,e[10]=v*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Qf,t,tp)}lookAt(t,e,n){let s=this.elements;return je.subVectors(t,e),je.lengthSq()===0&&(je.z=1),je.normalize(),jn.crossVectors(n,je),jn.lengthSq()===0&&(Math.abs(n.z)===1?je.x+=1e-4:je.z+=1e-4,je.normalize(),jn.crossVectors(n,je)),jn.normalize(),Wr.crossVectors(je,jn),s[0]=jn.x,s[4]=Wr.x,s[8]=je.x,s[1]=jn.y,s[5]=Wr.y,s[9]=je.y,s[2]=jn.z,s[6]=Wr.z,s[10]=je.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],d=n[5],u=n[9],m=n[13],x=n[2],v=n[6],p=n[10],f=n[14],S=n[3],T=n[7],b=n[11],A=n[15],M=s[0],C=s[4],y=s[8],E=s[12],R=s[1],P=s[5],F=s[9],q=s[13],Y=s[2],k=s[6],G=s[10],V=s[14],K=s[3],et=s[7],ct=s[11],dt=s[15];return r[0]=a*M+o*R+l*Y+c*K,r[4]=a*C+o*P+l*k+c*et,r[8]=a*y+o*F+l*G+c*ct,r[12]=a*E+o*q+l*V+c*dt,r[1]=h*M+d*R+u*Y+m*K,r[5]=h*C+d*P+u*k+m*et,r[9]=h*y+d*F+u*G+m*ct,r[13]=h*E+d*q+u*V+m*dt,r[2]=x*M+v*R+p*Y+f*K,r[6]=x*C+v*P+p*k+f*et,r[10]=x*y+v*F+p*G+f*ct,r[14]=x*E+v*q+p*V+f*dt,r[3]=S*M+T*R+b*Y+A*K,r[7]=S*C+T*P+b*k+A*et,r[11]=S*y+T*F+b*G+A*ct,r[15]=S*E+T*q+b*V+A*dt,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],d=t[6],u=t[10],m=t[14],x=t[3],v=t[7],p=t[11],f=t[15],S=l*m-c*u,T=o*m-c*d,b=o*u-l*d,A=a*m-c*h,M=a*u-l*h,C=a*d-o*h;return e*(v*S-p*T+f*b)-n*(x*S-p*A+f*M)+s*(x*T-v*A+f*C)-r*(x*b-v*M+p*C)}determinantAffine(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[1],a=t[5],o=t[9],l=t[2],c=t[6],h=t[10];return e*(a*h-o*c)-n*(r*h-o*l)+s*(r*c-a*l)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=t[9],u=t[10],m=t[11],x=t[12],v=t[13],p=t[14],f=t[15],S=e*o-n*a,T=e*l-s*a,b=e*c-r*a,A=n*l-s*o,M=n*c-r*o,C=s*c-r*l,y=h*v-d*x,E=h*p-u*x,R=h*f-m*x,P=d*p-u*v,F=d*f-m*v,q=u*f-m*p,Y=S*q-T*F+b*P+A*R-M*E+C*y;if(Y===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let k=1/Y;return t[0]=(o*q-l*F+c*P)*k,t[1]=(s*F-n*q-r*P)*k,t[2]=(v*C-p*M+f*A)*k,t[3]=(u*M-d*C-m*A)*k,t[4]=(l*R-a*q-c*E)*k,t[5]=(e*q-s*R+r*E)*k,t[6]=(p*b-x*C-f*T)*k,t[7]=(h*C-u*b+m*T)*k,t[8]=(a*F-o*R+c*y)*k,t[9]=(n*R-e*F-r*y)*k,t[10]=(x*M-v*b+f*S)*k,t[11]=(d*b-h*M-m*S)*k,t[12]=(o*E-a*P-l*y)*k,t[13]=(e*P-n*E+s*y)*k,t[14]=(v*T-x*A-p*S)*k,t[15]=(h*A-d*T+u*S)*k,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+n,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,d=o+o,u=r*c,m=r*h,x=r*d,v=a*h,p=a*d,f=o*d,S=l*c,T=l*h,b=l*d,A=n.x,M=n.y,C=n.z;return s[0]=(1-(v+f))*A,s[1]=(m+b)*A,s[2]=(x-T)*A,s[3]=0,s[4]=(m-b)*M,s[5]=(1-(u+f))*M,s[6]=(p+S)*M,s[7]=0,s[8]=(x+T)*C,s[9]=(p-S)*C,s[10]=(1-(u+v))*C,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let a=Xi.set(s[0],s[1],s[2]).length(),o=Xi.set(s[4],s[5],s[6]).length(),l=Xi.set(s[8],s[9],s[10]).length();r<0&&(a=-a),an.copy(this);let c=1/a,h=1/o,d=1/l;return an.elements[0]*=c,an.elements[1]*=c,an.elements[2]*=c,an.elements[4]*=h,an.elements[5]*=h,an.elements[6]*=h,an.elements[8]*=d,an.elements[9]*=d,an.elements[10]*=d,e.setFromRotationMatrix(an),n.x=a,n.y=o,n.z=l,this}makePerspective(t,e,n,s,r,a,o=cn,l=!1){let c=this.elements,h=2*r/(e-t),d=2*r/(n-s),u=(e+t)/(e-t),m=(n+s)/(n-s),x,v;if(l)x=r/(a-r),v=a*r/(a-r);else if(o===cn)x=-(a+r)/(a-r),v=-2*a*r/(a-r);else if(o===os)x=-a/(a-r),v=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=m,c[13]=0,c[2]=0,c[6]=0,c[10]=x,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=cn,l=!1){let c=this.elements,h=2/(e-t),d=2/(n-s),u=-(e+t)/(e-t),m=-(n+s)/(n-s),x,v;if(l)x=1/(a-r),v=a/(a-r);else if(o===cn)x=-2/(a-r),v=-(a+r)/(a-r);else if(o===os)x=-1/(a-r),v=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=d,c[9]=0,c[13]=m,c[2]=0,c[6]=0,c[10]=x,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}};eo.prototype.isMatrix4=!0;var oe=eo,Xi=new L,an=new oe,Qf=new L(0,0,0),tp=new L(1,1,1),jn=new L,Wr=new L,je=new L,Ih=new oe,Lh=new wn,zn=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],d=s[2],u=s[6],m=s[10];switch(e){case"XYZ":this._y=Math.asin(Xt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,m),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Xt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Xt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,m),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Xt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,m),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Xt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-Xt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,m),this._y=0);break;default:Rt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Ih.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Ih,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Lh.setFromEuler(this),this.setFromQuaternion(Lh,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};zn.DEFAULT_ORDER="XYZ";var Zs=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},ep=0,Dh=new L,$i=new wn,Ln=new oe,Xr=new L,Fs=new L,np=new L,ip=new wn,Nh=new L(1,0,0),Uh=new L(0,1,0),Fh=new L(0,0,1),Oh={type:"added"},sp={type:"removed"},qi={type:"childadded",child:null},Dl={type:"childremoved",child:null},De=class i extends Mn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ep++}),this.uuid=ei(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new L,e=new zn,n=new wn,s=new L(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new oe},normalMatrix:{value:new Ut}}),this.matrix=new oe,this.matrixWorld=new oe,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Zs,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return $i.setFromAxisAngle(t,e),this.quaternion.multiply($i),this}rotateOnWorldAxis(t,e){return $i.setFromAxisAngle(t,e),this.quaternion.premultiply($i),this}rotateX(t){return this.rotateOnAxis(Nh,t)}rotateY(t){return this.rotateOnAxis(Uh,t)}rotateZ(t){return this.rotateOnAxis(Fh,t)}translateOnAxis(t,e){return Dh.copy(t).applyQuaternion(this.quaternion),this.position.add(Dh.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Nh,t)}translateY(t){return this.translateOnAxis(Uh,t)}translateZ(t){return this.translateOnAxis(Fh,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Ln.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Xr.copy(t):Xr.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Fs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ln.lookAt(Fs,Xr,this.up):Ln.lookAt(Xr,Fs,this.up),this.quaternion.setFromRotationMatrix(Ln),s&&(Ln.extractRotation(s.matrixWorld),$i.setFromRotationMatrix(Ln),this.quaternion.premultiply($i.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Pt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Oh),qi.child=t,this.dispatchEvent(qi),qi.child=null):Pt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(sp),Dl.child=t,this.dispatchEvent(Dl),Dl.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Ln.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Ln.multiply(t.parent.matrixWorld)),t.applyMatrix4(Ln),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Oh),qi.child=t,this.dispatchEvent(qi),qi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Fs,t,np),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Fs,ip,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,n=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*s,r[13]+=n-r[1]*e-r[5]*n-r[9]*s,r[14]+=s-r[2]*e-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){let s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let d=l[c];r(t.shapes,d)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){let o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),d=a(t.shapes),u=a(t.skeletons),m=a(t.animations),x=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),m.length>0&&(n.animations=m),x.length>0&&(n.nodes=x)}return n.object=s,n;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}};De.DEFAULT_UP=new L(0,1,0);De.DEFAULT_MATRIX_AUTO_UPDATE=!0;De.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Je=class extends De{constructor(){super(),this.isGroup=!0,this.type="Group"}},rp={type:"move"},hs=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Je,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Je,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Je,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(let v of t.hand.values()){let p=e.getJointPose(v,n),f=this._getHandJoint(c,v);p!==null&&(f.matrix.fromArray(p.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=p.radius),f.visible=p!==null}let h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),m=.02,x=.005;c.inputState.pinching&&u>m+x?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=m-x&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(rp)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new Je;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},Uu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Zn={h:0,s:0,l:0},$r={h:0,s:0,l:0};function Nl(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var It=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ee){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Wt.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=Wt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Wt.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=Wt.workingColorSpace){if(t=jf(t,1),e=Xt(e,0,1),n=Xt(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=Nl(a,r,t+1/3),this.g=Nl(a,r,t),this.b=Nl(a,r,t-1/3)}return Wt.colorSpaceToWorking(this,s),this}setStyle(t,e=Ee){function n(r){r!==void 0&&parseFloat(r)<1&&Rt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Rt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);Rt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ee){let n=Uu[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Rt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Bn(t.r),this.g=Bn(t.g),this.b=Bn(t.b),this}copyLinearToSRGB(t){return this.r=as(t.r),this.g=as(t.g),this.b=as(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ee){return Wt.workingToColorSpace(ke.copy(this),t),Math.round(Xt(ke.r*255,0,255))*65536+Math.round(Xt(ke.g*255,0,255))*256+Math.round(Xt(ke.b*255,0,255))}getHexString(t=Ee){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Wt.workingColorSpace){Wt.workingToColorSpace(ke.copy(this),e);let n=ke.r,s=ke.g,r=ke.b,a=Math.max(n,s,r),o=Math.min(n,s,r),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let d=a-o;switch(c=h<=.5?d/(a+o):d/(2-a-o),a){case n:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-n)/d+2;break;case r:l=(n-s)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=Wt.workingColorSpace){return Wt.workingToColorSpace(ke.copy(this),e),t.r=ke.r,t.g=ke.g,t.b=ke.b,t}getStyle(t=Ee){Wt.workingToColorSpace(ke.copy(this),t);let e=ke.r,n=ke.g,s=ke.b;return t!==Ee?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Zn),this.setHSL(Zn.h+t,Zn.s+e,Zn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Zn),t.getHSL($r);let n=Cl(Zn.h,$r.h,e),s=Cl(Zn.s,$r.s,e),r=Cl(Zn.l,$r.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},ke=new It;It.NAMES=Uu;var Js=class i{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new It(t),this.density=e}clone(){return new i(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var Ks=class extends De{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new zn,this.environmentIntensity=1,this.environmentRotation=new zn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}},on=new L,Dn=new L,Ul=new L,Nn=new L,Yi=new L,ji=new L,Bh=new L,Fl=new L,Ol=new L,Bl=new L,kl=new ue,zl=new ue,Hl=new ue,On=class i{constructor(t=new L,e=new L,n=new L){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),on.subVectors(t,e),s.cross(on);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){on.subVectors(s,e),Dn.subVectors(n,e),Ul.subVectors(t,e);let a=on.dot(on),o=on.dot(Dn),l=on.dot(Ul),c=Dn.dot(Dn),h=Dn.dot(Ul),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;let u=1/d,m=(c*l-o*h)*u,x=(a*h-o*l)*u;return r.set(1-m-x,x,m)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Nn)===null?!1:Nn.x>=0&&Nn.y>=0&&Nn.x+Nn.y<=1}static getInterpolation(t,e,n,s,r,a,o,l){return this.getBarycoord(t,e,n,s,Nn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Nn.x),l.addScaledVector(a,Nn.y),l.addScaledVector(o,Nn.z),l)}static getInterpolatedAttribute(t,e,n,s,r,a){return kl.setScalar(0),zl.setScalar(0),Hl.setScalar(0),kl.fromBufferAttribute(t,e),zl.fromBufferAttribute(t,n),Hl.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(kl,r.x),a.addScaledVector(zl,r.y),a.addScaledVector(Hl,r.z),a}static isFrontFacing(t,e,n,s){return on.subVectors(n,e),Dn.subVectors(t,e),on.cross(Dn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return on.subVectors(this.c,this.b),Dn.subVectors(this.a,this.b),on.cross(Dn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,a,o;Yi.subVectors(s,n),ji.subVectors(r,n),Fl.subVectors(t,n);let l=Yi.dot(Fl),c=ji.dot(Fl);if(l<=0&&c<=0)return e.copy(n);Ol.subVectors(t,s);let h=Yi.dot(Ol),d=ji.dot(Ol);if(h>=0&&d<=h)return e.copy(s);let u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(n).addScaledVector(Yi,a);Bl.subVectors(t,r);let m=Yi.dot(Bl),x=ji.dot(Bl);if(x>=0&&m<=x)return e.copy(r);let v=m*c-l*x;if(v<=0&&c>=0&&x<=0)return o=c/(c-x),e.copy(n).addScaledVector(ji,o);let p=h*x-m*d;if(p<=0&&d-h>=0&&m-x>=0)return Bh.subVectors(r,s),o=(d-h)/(d-h+(m-x)),e.copy(s).addScaledVector(Bh,o);let f=1/(p+v+u);return a=v*f,o=u*f,e.copy(n).addScaledVector(Yi,a).addScaledVector(ji,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},si=class{constructor(t=new L(1/0,1/0,1/0),e=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(ln.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(ln.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=ln.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,ln):ln.fromBufferAttribute(r,a),ln.applyMatrix4(t.matrixWorld),this.expandByPoint(ln);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),qr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),qr.copy(n.boundingBox)),qr.applyMatrix4(t.matrixWorld),this.union(qr)}let s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,ln),ln.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Os),Yr.subVectors(this.max,Os),Zi.subVectors(t.a,Os),Ji.subVectors(t.b,Os),Ki.subVectors(t.c,Os),Jn.subVectors(Ji,Zi),Kn.subVectors(Ki,Ji),vi.subVectors(Zi,Ki);let e=[0,-Jn.z,Jn.y,0,-Kn.z,Kn.y,0,-vi.z,vi.y,Jn.z,0,-Jn.x,Kn.z,0,-Kn.x,vi.z,0,-vi.x,-Jn.y,Jn.x,0,-Kn.y,Kn.x,0,-vi.y,vi.x,0];return!Vl(e,Zi,Ji,Ki,Yr)||(e=[1,0,0,0,1,0,0,0,1],!Vl(e,Zi,Ji,Ki,Yr))?!1:(jr.crossVectors(Jn,Kn),e=[jr.x,jr.y,jr.z],Vl(e,Zi,Ji,Ki,Yr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,ln).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(ln).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Un[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Un[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Un[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Un[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Un[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Un[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Un[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Un[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Un),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},Un=[new L,new L,new L,new L,new L,new L,new L,new L],ln=new L,qr=new si,Zi=new L,Ji=new L,Ki=new L,Jn=new L,Kn=new L,vi=new L,Os=new L,Yr=new L,jr=new L,bi=new L;function Vl(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){bi.fromArray(i,r);let o=s.x*Math.abs(bi.x)+s.y*Math.abs(bi.y)+s.z*Math.abs(bi.z),l=t.dot(bi),c=e.dot(bi),h=n.dot(bi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var Me=new L,Zr=new Dt,ap=0,Te=class extends Mn{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:ap++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Ra,this.updateRanges=[],this.gpuType=pn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Zr.fromBufferAttribute(this,e),Zr.applyMatrix3(t),this.setXY(e,Zr.x,Zr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Me.fromBufferAttribute(this,e),Me.applyMatrix3(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Me.fromBufferAttribute(this,e),Me.applyMatrix4(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Me.fromBufferAttribute(this,e),Me.applyNormalMatrix(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Me.fromBufferAttribute(this,e),Me.transformDirection(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=vn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ee(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=vn(e,this.array)),e}setX(t,e){return this.normalized&&(e=ee(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=vn(e,this.array)),e}setY(t,e){return this.normalized&&(e=ee(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=vn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ee(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=vn(e,this.array)),e}setW(t,e){return this.normalized&&(e=ee(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=ee(e,this.array),n=ee(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=ee(e,this.array),n=ee(n,this.array),s=ee(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=ee(e,this.array),n=ee(n,this.array),s=ee(s,this.array),r=ee(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Ra&&(t.usage=this.usage),t}dispose(){this.dispatchEvent({type:"dispose"})}};var Qs=class extends Te{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var tr=class extends Te{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var ge=class extends Te{constructor(t,e,n){super(new Float32Array(t),e,n)}},op=new si,Bs=new L,Gl=new L,ri=class{constructor(t=new L,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):op.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Bs.subVectors(t,this.center);let e=Bs.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Bs,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Gl.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Bs.copy(t.center).add(Gl)),this.expandByPoint(Bs.copy(t.center).sub(Gl))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},lp=0,en=new oe,Wl=new De,Qi=new L,Ze=new si,ks=new si,Re=new L,Se=class i extends Mn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:lp++}),this.uuid=ei(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(qf(t)?tr:Qs)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Ut().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return en.makeRotationFromQuaternion(t),this.applyMatrix4(en),this}rotateX(t){return en.makeRotationX(t),this.applyMatrix4(en),this}rotateY(t){return en.makeRotationY(t),this.applyMatrix4(en),this}rotateZ(t){return en.makeRotationZ(t),this.applyMatrix4(en),this}translate(t,e,n){return en.makeTranslation(t,e,n),this.applyMatrix4(en),this}scale(t,e,n){return en.makeScale(t,e,n),this.applyMatrix4(en),this}lookAt(t){return Wl.lookAt(t),Wl.updateMatrix(),this.applyMatrix4(Wl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Qi).negate(),this.translate(Qi.x,Qi.y,Qi.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new ge(n,3))}else{let n=Math.min(t.length,e.count);for(let s=0;s<n;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Rt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new si);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Pt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];Ze.setFromBufferAttribute(r),this.morphTargetsRelative?(Re.addVectors(this.boundingBox.min,Ze.min),this.boundingBox.expandByPoint(Re),Re.addVectors(this.boundingBox.max,Ze.max),this.boundingBox.expandByPoint(Re)):(this.boundingBox.expandByPoint(Ze.min),this.boundingBox.expandByPoint(Ze.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Pt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ri);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Pt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(t){let n=this.boundingSphere.center;if(Ze.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];ks.setFromBufferAttribute(o),this.morphTargetsRelative?(Re.addVectors(Ze.min,ks.min),Ze.expandByPoint(Re),Re.addVectors(Ze.max,ks.max),Ze.expandByPoint(Re)):(Ze.expandByPoint(ks.min),Ze.expandByPoint(ks.max))}Ze.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)Re.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Re));if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Re.fromBufferAttribute(o,c),l&&(Qi.fromBufferAttribute(t,c),Re.add(Qi)),s=Math.max(s,n.distanceToSquared(Re))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Pt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Pt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new Te(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],l=[];for(let y=0;y<n.count;y++)o[y]=new L,l[y]=new L;let c=new L,h=new L,d=new L,u=new Dt,m=new Dt,x=new Dt,v=new L,p=new L;function f(y,E,R){c.fromBufferAttribute(n,y),h.fromBufferAttribute(n,E),d.fromBufferAttribute(n,R),u.fromBufferAttribute(r,y),m.fromBufferAttribute(r,E),x.fromBufferAttribute(r,R),h.sub(c),d.sub(c),m.sub(u),x.sub(u);let P=1/(m.x*x.y-x.x*m.y);isFinite(P)&&(v.copy(h).multiplyScalar(x.y).addScaledVector(d,-m.y).multiplyScalar(P),p.copy(d).multiplyScalar(m.x).addScaledVector(h,-x.x).multiplyScalar(P),o[y].add(v),o[E].add(v),o[R].add(v),l[y].add(p),l[E].add(p),l[R].add(p))}let S=this.groups;S.length===0&&(S=[{start:0,count:t.count}]);for(let y=0,E=S.length;y<E;++y){let R=S[y],P=R.start,F=R.count;for(let q=P,Y=P+F;q<Y;q+=3)f(t.getX(q+0),t.getX(q+1),t.getX(q+2))}let T=new L,b=new L,A=new L,M=new L;function C(y){A.fromBufferAttribute(s,y),M.copy(A);let E=o[y];T.copy(E),T.sub(A.multiplyScalar(A.dot(E))).normalize(),b.crossVectors(M,E);let P=b.dot(l[y])<0?-1:1;a.setXYZW(y,T.x,T.y,T.z,P)}for(let y=0,E=S.length;y<E;++y){let R=S[y],P=R.start,F=R.count;for(let q=P,Y=P+F;q<Y;q+=3)C(t.getX(q+0)),C(t.getX(q+1)),C(t.getX(q+2))}this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new Te(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,m=n.count;u<m;u++)n.setXYZ(u,0,0,0);let s=new L,r=new L,a=new L,o=new L,l=new L,c=new L,h=new L,d=new L;if(t)for(let u=0,m=t.count;u<m;u+=3){let x=t.getX(u+0),v=t.getX(u+1),p=t.getX(u+2);s.fromBufferAttribute(e,x),r.fromBufferAttribute(e,v),a.fromBufferAttribute(e,p),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),o.fromBufferAttribute(n,x),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,p),o.add(h),l.add(h),c.add(h),n.setXYZ(x,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let u=0,m=e.count;u<m;u+=3)s.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),a.fromBufferAttribute(e,u+2),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Re.fromBufferAttribute(t,e),Re.normalize(),t.setXYZ(e,Re.x,Re.y,Re.z)}toNonIndexed(){function t(o,l){let c=o.array,h=o.itemSize,d=o.normalized,u=new c.constructor(l.length*h),m=0,x=0;for(let v=0,p=l.length;v<p;v++){o.isInterleavedBufferAttribute?m=l[v]*o.data.stride+o.offset:m=l[v]*h;for(let f=0;f<h;f++)u[x++]=c[m++]}return new Te(u,h,d)}if(this.index===null)return Rt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=t(l,n);e.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let h=0,d=c.length;h<d;h++){let u=c[h],m=t(u,n);l.push(m)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){let m=c[d];h.push(m.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let s=t.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],d=r[c];for(let u=0,m=d.length;u<m;u++)h.push(d[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let c=0,h=a.length;c<h;c++){let d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},Na=class{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Ra,this.updateRanges=[],this.version=0,this.uuid=ei()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ei()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ei()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Ve=new L,er=class i{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Ve.fromBufferAttribute(this,e),Ve.applyMatrix4(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ve.fromBufferAttribute(this,e),Ve.applyNormalMatrix(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ve.fromBufferAttribute(this,e),Ve.transformDirection(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=vn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ee(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=ee(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=ee(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=ee(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=ee(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=vn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=vn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=vn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=vn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=ee(e,this.array),n=ee(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=ee(e,this.array),n=ee(n,this.array),s=ee(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=ee(e,this.array),n=ee(n,this.array),s=ee(s,this.array),r=ee(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){Ys("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new Te(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new i(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){Ys("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},cp=0,hn=class extends Mn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:cp++}),this.uuid=ei(),this.name="",this.type="Material",this.blending=Ti,this.side=kn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ya,this.blendDst=_a,this.blendEquation=ni,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new It(0,0,0),this.blendAlpha=0,this.depthFunc=Ai,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ic,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=wi,this.stencilZFail=wi,this.stencilZPass=wi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){Rt(`Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Rt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ti&&(n.blending=this.blending),this.side!==kn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ya&&(n.blendSrc=this.blendSrc),this.blendDst!==_a&&(n.blendDst=this.blendDst),this.blendEquation!==ni&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ai&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ic&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==wi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==wi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==wi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(e){let r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new It().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Dt().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Dt().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},ai=class extends hn{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new It(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},ts,zs=new L,es=new L,ns=new L,is=new Dt,Hs=new Dt,Fu=new oe,Jr=new L,Vs=new L,Kr=new L,kh=new Dt,Xl=new Dt,zh=new Dt,Ci=class extends De{constructor(t=new ai){if(super(),this.isSprite=!0,this.type="Sprite",ts===void 0){ts=new Se;let e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Na(e,5);ts.setIndex([0,1,2,0,2,3]),ts.setAttribute("position",new er(n,3,0,!1)),ts.setAttribute("uv",new er(n,2,3,!1))}this.geometry=ts,this.material=t,this.center=new Dt(.5,.5),this.count=1}raycast(t,e){t.camera===null&&Pt('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),es.setFromMatrixScale(this.matrixWorld),Fu.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),ns.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&es.multiplyScalar(-ns.z);let n=this.material.rotation,s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));let a=this.center;Qr(Jr.set(-.5,-.5,0),ns,a,es,s,r),Qr(Vs.set(.5,-.5,0),ns,a,es,s,r),Qr(Kr.set(.5,.5,0),ns,a,es,s,r),kh.set(0,0),Xl.set(1,0),zh.set(1,1);let o=t.ray.intersectTriangle(Jr,Vs,Kr,!1,zs);if(o===null&&(Qr(Vs.set(-.5,.5,0),ns,a,es,s,r),Xl.set(0,1),o=t.ray.intersectTriangle(Jr,Kr,Vs,!1,zs),o===null))return;let l=t.ray.origin.distanceTo(zs);l<t.near||l>t.far||e.push({distance:l,point:zs.clone(),uv:On.getInterpolation(zs,Jr,Vs,Kr,kh,Xl,zh,new Dt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}};function Qr(i,t,e,n,s,r){is.subVectors(i,e).addScalar(.5).multiply(n),s!==void 0?(Hs.x=r*is.x-s*is.y,Hs.y=s*is.x+r*is.y):Hs.copy(is),i.copy(t),i.x+=Hs.x,i.y+=Hs.y,i.applyMatrix4(Fu)}var Fn=new L,$l=new L,ta=new L,Qn=new L,ql=new L,ea=new L,Yl=new L,us=class{constructor(t=new L,e=new L(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Fn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Fn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Fn.copy(this.origin).addScaledVector(this.direction,e),Fn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){$l.copy(t).add(e).multiplyScalar(.5),ta.copy(e).sub(t).normalize(),Qn.copy(this.origin).sub($l);let r=t.distanceTo(e)*.5,a=-this.direction.dot(ta),o=Qn.dot(this.direction),l=-Qn.dot(ta),c=Qn.lengthSq(),h=Math.abs(1-a*a),d,u,m,x;if(h>0)if(d=a*l-o,u=a*o-l,x=r*h,d>=0)if(u>=-x)if(u<=x){let v=1/h;d*=v,u*=v,m=d*(d+a*u+2*o)+u*(a*d+u+2*l)+c}else u=r,d=Math.max(0,-(a*u+o)),m=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(a*u+o)),m=-d*d+u*(u+2*l)+c;else u<=-x?(d=Math.max(0,-(-a*r+o)),u=d>0?-r:Math.min(Math.max(-r,-l),r),m=-d*d+u*(u+2*l)+c):u<=x?(d=0,u=Math.min(Math.max(-r,-l),r),m=u*(u+2*l)+c):(d=Math.max(0,-(a*r+o)),u=d>0?r:Math.min(Math.max(-r,-l),r),m=-d*d+u*(u+2*l)+c);else u=a>0?-r:r,d=Math.max(0,-(a*u+o)),m=-d*d+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy($l).addScaledVector(ta,u),m}intersectSphere(t,e){Fn.subVectors(t.center,this.origin);let n=Fn.dot(this.direction),s=Fn.dot(Fn)-n*n,r=t.radius*t.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,l,c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(n=(t.min.x-u.x)*c,s=(t.max.x-u.x)*c):(n=(t.max.x-u.x)*c,s=(t.min.x-u.x)*c),h>=0?(r=(t.min.y-u.y)*h,a=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,a=(t.min.y-u.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(t.min.z-u.z)*d,l=(t.max.z-u.z)*d):(o=(t.max.z-u.z)*d,l=(t.min.z-u.z)*d),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Fn)!==null}intersectTriangle(t,e,n,s,r){ql.subVectors(e,t),ea.subVectors(n,t),Yl.crossVectors(ql,ea);let a=this.direction.dot(Yl),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Qn.subVectors(this.origin,t);let l=o*this.direction.dot(ea.crossVectors(Qn,ea));if(l<0)return null;let c=o*this.direction.dot(ql.cross(Qn));if(c<0||l+c>a)return null;let h=-o*Qn.dot(Yl);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Ri=class extends hn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new It(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new zn,this.combine=dc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},Hh=new oe,Si=new us,na=new ri,Vh=new L,ia=new L,sa=new L,ra=new L,jl=new L,aa=new L,Gh=new L,oa=new L,xe=class extends De{constructor(t=new Se,e=new Ri){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let o=this.morphTargetInfluences;if(r&&o){aa.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=o[l],d=r[l];h!==0&&(jl.fromBufferAttribute(d,t),a?aa.addScaledVector(jl,h):aa.addScaledVector(jl.sub(e),h))}e.add(aa)}return e}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),na.copy(n.boundingSphere),na.applyMatrix4(r),Si.copy(t.ray).recast(t.near),!(na.containsPoint(Si.origin)===!1&&(Si.intersectSphere(na,Vh)===null||Si.origin.distanceToSquared(Vh)>(t.far-t.near)**2))&&(Hh.copy(r).invert(),Si.copy(t.ray).applyMatrix4(Hh),!(n.boundingBox!==null&&Si.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Si)))}_computeIntersections(t,e,n){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,m=r.drawRange;if(o!==null)if(Array.isArray(a))for(let x=0,v=u.length;x<v;x++){let p=u[x],f=a[p.materialIndex],S=Math.max(p.start,m.start),T=Math.min(o.count,Math.min(p.start+p.count,m.start+m.count));for(let b=S,A=T;b<A;b+=3){let M=o.getX(b),C=o.getX(b+1),y=o.getX(b+2);s=la(this,f,t,n,c,h,d,M,C,y),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{let x=Math.max(0,m.start),v=Math.min(o.count,m.start+m.count);for(let p=x,f=v;p<f;p+=3){let S=o.getX(p),T=o.getX(p+1),b=o.getX(p+2);s=la(this,a,t,n,c,h,d,S,T,b),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let x=0,v=u.length;x<v;x++){let p=u[x],f=a[p.materialIndex],S=Math.max(p.start,m.start),T=Math.min(l.count,Math.min(p.start+p.count,m.start+m.count));for(let b=S,A=T;b<A;b+=3){let M=b,C=b+1,y=b+2;s=la(this,f,t,n,c,h,d,M,C,y),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{let x=Math.max(0,m.start),v=Math.min(l.count,m.start+m.count);for(let p=x,f=v;p<f;p+=3){let S=p,T=p+1,b=p+2;s=la(this,a,t,n,c,h,d,S,T,b),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}}};function hp(i,t,e,n,s,r,a,o){let l;if(t.side===Ne?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,t.side===kn,o),l===null)return null;oa.copy(o),oa.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(oa);return c<e.near||c>e.far?null:{distance:c,point:oa.clone(),object:i}}function la(i,t,e,n,s,r,a,o,l,c){i.getVertexPosition(o,ia),i.getVertexPosition(l,sa),i.getVertexPosition(c,ra);let h=hp(i,t,e,n,ia,sa,ra,Gh);if(h){let d=new L;On.getBarycoord(Gh,ia,sa,ra,d),s&&(h.uv=On.getInterpolatedAttribute(s,o,l,c,d,new Dt)),r&&(h.uv1=On.getInterpolatedAttribute(r,o,l,c,d,new Dt)),a&&(h.normal=On.getInterpolatedAttribute(a,o,l,c,d,new L),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a:o,b:l,c,normal:new L,materialIndex:0};On.getNormal(ia,sa,ra,u.normal),h.face=u,h.barycoord=d}return h}var Ua=class extends Ge{constructor(t=null,e=1,n=1,s,r,a,o,l,c=Pe,h=Pe,d,u){super(null,a,o,l,c,h,s,r,d,u),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Zl=new L,up=new L,dp=new Ut,_n=class{constructor(t=new L(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=Zl.subVectors(n,e).cross(up.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){let s=t.delta(Zl),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let a=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(s,a)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||dp.getNormalMatrix(t),s=this.coplanarPoint(Zl).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},Mi=new ri,fp=new Dt(.5,.5),ca=new L,ds=class{constructor(t=new _n,e=new _n,n=new _n,s=new _n,r=new _n,a=new _n){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=cn,n=!1){let s=this.planes,r=t.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],d=r[5],u=r[6],m=r[7],x=r[8],v=r[9],p=r[10],f=r[11],S=r[12],T=r[13],b=r[14],A=r[15];if(s[0].setComponents(c-a,m-h,f-x,A-S).normalize(),s[1].setComponents(c+a,m+h,f+x,A+S).normalize(),s[2].setComponents(c+o,m+d,f+v,A+T).normalize(),s[3].setComponents(c-o,m-d,f-v,A-T).normalize(),n)s[4].setComponents(l,u,p,b).normalize(),s[5].setComponents(c-l,m-u,f-p,A-b).normalize();else if(s[4].setComponents(c-l,m-u,f-p,A-b).normalize(),e===cn)s[5].setComponents(c+l,m+u,f+p,A+b).normalize();else if(e===os)s[5].setComponents(l,u,p,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Mi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Mi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Mi)}intersectsSprite(t){Mi.center.set(0,0,0);let e=fp.distanceTo(t.center);return Mi.radius=.7071067811865476+e,Mi.applyMatrix4(t.matrixWorld),this.intersectsSphere(Mi)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(ca.x=s.normal.x>0?t.max.x:t.min.x,ca.y=s.normal.y>0?t.max.y:t.min.y,ca.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(ca)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Pi=class extends hn{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new It(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},Fa=new L,Oa=new L,Wh=new oe,Gs=new us,ha=new ri,Jl=new L,Xh=new L,fs=class extends De{constructor(t=new Se,e=new Pi){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)Fa.fromBufferAttribute(e,s-1),Oa.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=Fa.distanceTo(Oa);t.setAttribute("lineDistance",new ge(n,1))}else Rt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ha.copy(n.boundingSphere),ha.applyMatrix4(s),ha.radius+=r,t.ray.intersectsSphere(ha)===!1)return;Wh.copy(s).invert(),Gs.copy(t.ray).applyMatrix4(Wh);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){let m=Math.max(0,a.start),x=Math.min(h.count,a.start+a.count);for(let v=m,p=x-1;v<p;v+=c){let f=h.getX(v),S=h.getX(v+1),T=ua(this,t,Gs,l,f,S,v);T&&e.push(T)}if(this.isLineLoop){let v=h.getX(x-1),p=h.getX(m),f=ua(this,t,Gs,l,v,p,x-1);f&&e.push(f)}}else{let m=Math.max(0,a.start),x=Math.min(u.count,a.start+a.count);for(let v=m,p=x-1;v<p;v+=c){let f=ua(this,t,Gs,l,v,v+1,v);f&&e.push(f)}if(this.isLineLoop){let v=ua(this,t,Gs,l,x-1,m,x-1);v&&e.push(v)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function ua(i,t,e,n,s,r,a){let o=i.geometry.attributes.position;if(Fa.fromBufferAttribute(o,s),Oa.fromBufferAttribute(o,r),e.distanceSqToSegment(Fa,Oa,Jl,Xh)>n)return;Jl.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo(Jl);if(!(c<t.near||c>t.far))return{distance:c,point:Xh.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}var Ii=class extends hn{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new It(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},$h=new oe,sc=new us,da=new ri,fa=new L,ps=class extends De{constructor(t=new Se,e=new Ii){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),da.copy(n.boundingSphere),da.applyMatrix4(s),da.radius+=r,t.ray.intersectsSphere(da)===!1)return;$h.copy(s).invert(),sc.copy(t.ray).applyMatrix4($h);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,d=n.attributes.position;if(c!==null){let u=Math.max(0,a.start),m=Math.min(c.count,a.start+a.count);for(let x=u,v=m;x<v;x++){let p=c.getX(x);fa.fromBufferAttribute(d,p),qh(fa,p,l,s,t,e,this)}}else{let u=Math.max(0,a.start),m=Math.min(d.count,a.start+a.count);for(let x=u,v=m;x<v;x++)fa.fromBufferAttribute(d,x),qh(fa,x,l,s,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function qh(i,t,e,n,s,r,a){let o=sc.distanceSqToPoint(i);if(o<e){let l=new L;sc.closestPointToPoint(i,l),l.applyMatrix4(n);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}var nr=class extends Ge{constructor(t=[],e=hi,n,s,r,a,o,l,c,h){super(t,e,n,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},We=class extends Ge{constructor(t,e,n,s,r,a,o,l,c){super(t,e,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Hn=class extends Ge{constructor(t,e,n=fn,s,r,a,o=Pe,l=Pe,c,h=Sn,d=1){if(h!==Sn&&h!==di)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:t,height:e,depth:d};super(u,s,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new cs(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},Ba=class extends Hn{constructor(t,e=fn,n=hi,s,r,a=Pe,o=Pe,l,c=Sn){let h={width:t,height:t,depth:1},d=[h,h,h,h,h,h];super(t,t,e,n,s,r,a,o,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},ir=class extends Ge{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},Vn=class i extends Se{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],h=[],d=[],u=0,m=0;x("z","y","x",-1,-1,n,e,t,a,r,0),x("z","y","x",1,-1,n,e,-t,a,r,1),x("x","z","y",1,1,t,n,e,s,a,2),x("x","z","y",1,-1,t,n,-e,s,a,3),x("x","y","z",1,-1,t,e,n,s,r,4),x("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new ge(c,3)),this.setAttribute("normal",new ge(h,3)),this.setAttribute("uv",new ge(d,2));function x(v,p,f,S,T,b,A,M,C,y,E){let R=b/C,P=A/y,F=b/2,q=A/2,Y=M/2,k=C+1,G=y+1,V=0,K=0,et=new L;for(let ct=0;ct<G;ct++){let dt=ct*P-q;for(let mt=0;mt<k;mt++){let zt=mt*R-F;et[v]=zt*S,et[p]=dt*T,et[f]=Y,c.push(et.x,et.y,et.z),et[v]=0,et[p]=0,et[f]=M>0?1:-1,h.push(et.x,et.y,et.z),d.push(mt/C),d.push(1-ct/y),V+=1}}for(let ct=0;ct<y;ct++)for(let dt=0;dt<C;dt++){let mt=u+dt+k*ct,zt=u+dt+k*(ct+1),Lt=u+(dt+1)+k*(ct+1),qt=u+(dt+1)+k*ct;l.push(mt,zt,qt),l.push(zt,Lt,qt),K+=6}o.addGroup(m,K,E),m+=K,u+=V}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var ka=class i extends Se{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};let r=[],a=[];o(s),c(n),h(),this.setAttribute("position",new ge(r,3)),this.setAttribute("normal",new ge(r.slice(),3)),this.setAttribute("uv",new ge(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(S){let T=new L,b=new L,A=new L;for(let M=0;M<e.length;M+=3)m(e[M+0],T),m(e[M+1],b),m(e[M+2],A),l(T,b,A,S)}function l(S,T,b,A){let M=A+1,C=[];for(let y=0;y<=M;y++){C[y]=[];let E=S.clone().lerp(b,y/M),R=T.clone().lerp(b,y/M),P=M-y;for(let F=0;F<=P;F++)F===0&&y===M?C[y][F]=E:C[y][F]=E.clone().lerp(R,F/P)}for(let y=0;y<M;y++)for(let E=0;E<2*(M-y)-1;E++){let R=Math.floor(E/2);E%2===0?(u(C[y][R+1]),u(C[y+1][R]),u(C[y][R])):(u(C[y][R+1]),u(C[y+1][R+1]),u(C[y+1][R]))}}function c(S){let T=new L;for(let b=0;b<r.length;b+=3)T.x=r[b+0],T.y=r[b+1],T.z=r[b+2],T.normalize().multiplyScalar(S),r[b+0]=T.x,r[b+1]=T.y,r[b+2]=T.z}function h(){let S=new L;for(let T=0;T<r.length;T+=3){S.x=r[T+0],S.y=r[T+1],S.z=r[T+2];let b=p(S)/2/Math.PI+.5,A=f(S)/Math.PI+.5;a.push(b,1-A)}x(),d()}function d(){for(let S=0;S<a.length;S+=6){let T=a[S+0],b=a[S+2],A=a[S+4],M=Math.max(T,b,A),C=Math.min(T,b,A);M>.9&&C<.1&&(T<.2&&(a[S+0]+=1),b<.2&&(a[S+2]+=1),A<.2&&(a[S+4]+=1))}}function u(S){r.push(S.x,S.y,S.z)}function m(S,T){let b=S*3;T.x=t[b+0],T.y=t[b+1],T.z=t[b+2]}function x(){let S=new L,T=new L,b=new L,A=new L,M=new Dt,C=new Dt,y=new Dt;for(let E=0,R=0;E<r.length;E+=9,R+=6){S.set(r[E+0],r[E+1],r[E+2]),T.set(r[E+3],r[E+4],r[E+5]),b.set(r[E+6],r[E+7],r[E+8]),M.set(a[R+0],a[R+1]),C.set(a[R+2],a[R+3]),y.set(a[R+4],a[R+5]),A.copy(S).add(T).add(b).divideScalar(3);let P=p(A);v(M,R+0,S,P),v(C,R+2,T,P),v(y,R+4,b,P)}}function v(S,T,b,A){A<0&&S.x===1&&(a[T]=S.x-1),b.x===0&&b.z===0&&(a[T]=A/2/Math.PI+.5)}function p(S){return Math.atan2(S.z,-S.x)}function f(S){return Math.atan2(-S.y,Math.sqrt(S.x*S.x+S.z*S.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.vertices,t.indices,t.radius,t.detail)}};var sr=class i extends ka{constructor(t=1,e=0){let n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new i(t.radius,t.detail)}};var rr=class i extends Se{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(s),c=o+1,h=l+1,d=t/o,u=e/l,m=[],x=[],v=[],p=[];for(let f=0;f<h;f++){let S=f*u-a;for(let T=0;T<c;T++){let b=T*d-r;x.push(b,-S,0),v.push(0,0,1),p.push(T/o),p.push(1-f/l)}}for(let f=0;f<l;f++)for(let S=0;S<o;S++){let T=S+c*f,b=S+c*(f+1),A=S+1+c*(f+1),M=S+1+c*f;m.push(T,b,M),m.push(b,A,M)}this.setIndex(m),this.setAttribute("position",new ge(x,3)),this.setAttribute("normal",new ge(v,3)),this.setAttribute("uv",new ge(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}},ar=class i extends Se{constructor(t=.5,e=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);let o=[],l=[],c=[],h=[],d=t,u=(e-t)/s,m=new L,x=new Dt;for(let v=0;v<=s;v++){for(let p=0;p<=n;p++){let f=r+p/n*a;m.x=d*Math.cos(f),m.y=d*Math.sin(f),l.push(m.x,m.y,m.z),c.push(0,0,1),x.x=(m.x/e+1)/2,x.y=(m.y/e+1)/2,h.push(x.x,x.y)}d+=u}for(let v=0;v<s;v++){let p=v*(n+1);for(let f=0;f<n;f++){let S=f+p,T=S,b=S+n+1,A=S+n+2,M=S+1;o.push(T,b,M),o.push(b,A,M)}}this.setIndex(o),this.setAttribute("position",new ge(l,3)),this.setAttribute("normal",new ge(c,3)),this.setAttribute("uv",new ge(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}};var Gn=class i extends Se{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,h=[],d=new L,u=new L,m=[],x=[],v=[],p=[];for(let f=0;f<=n;f++){let S=[],T=f/n,b=a+T*o,A=t*Math.cos(b),M=Math.sqrt(t*t-A*A),C=0;f===0&&a===0?C=.5/e:f===n&&l===Math.PI&&(C=-.5/e);for(let y=0;y<=e;y++){let E=y/e,R=s+E*r;d.x=-M*Math.cos(R),d.y=A,d.z=M*Math.sin(R),x.push(d.x,d.y,d.z),u.copy(d).normalize(),v.push(u.x,u.y,u.z),p.push(E+C,1-T),S.push(c++)}h.push(S)}for(let f=0;f<n;f++)for(let S=0;S<e;S++){let T=h[f][S+1],b=h[f][S],A=h[f+1][S],M=h[f+1][S+1];(f!==0||a>0)&&m.push(T,b,M),(f!==n-1||l<Math.PI)&&m.push(b,A,M)}this.setIndex(m),this.setAttribute("position",new ge(x,3)),this.setAttribute("normal",new ge(v,3)),this.setAttribute("uv",new ge(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};function Di(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];if(Yh(s))s.isRenderTargetTexture?(Rt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone();else if(Array.isArray(s))if(Yh(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();t[e][n]=r}else t[e][n]=s.slice();else t[e][n]=s}}return t}function ze(i){let t={};for(let e=0;e<i.length;e++){let n=Di(i[e]);for(let s in n)t[s]=n[s]}return t}function Yh(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function pp(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Cc(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Wt.workingColorSpace}var Ou={clone:Di,merge:ze},mp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,gp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Xe=class extends hn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=mp,this.fragmentShader=gp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Di(t.uniforms),this.uniformsGroups=pp(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let n in t.uniforms){let s=t.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=e[s.value]||null;break;case"c":this.uniforms[n].value=new It().setHex(s.value);break;case"v2":this.uniforms[n].value=new Dt().fromArray(s.value);break;case"v3":this.uniforms[n].value=new L().fromArray(s.value);break;case"v4":this.uniforms[n].value=new ue().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Ut().fromArray(s.value);break;case"m4":this.uniforms[n].value=new oe().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},za=class extends Xe{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},un=class extends hn{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new It(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new It(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Go,this.normalScale=new Dt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new zn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var Ha=class extends hn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Mu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Va=class extends hn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function pa(i,t){return!i||i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}var oi=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];t:{e:{let a;n:{i:if(!(t<s)){for(let o=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=e[++n],t<s)break e}a=e.length;break n}if(!(t>=r)){let o=e[1];t<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=e[--n-1],t>=r)break e}a=n,n=0;break n}break t}for(;n<a;){let o=n+a>>>1;t<e[o]?a=o:n=o+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let a=0;a!==s;++a)e[a]=n[r+a];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Ga=class extends oi{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:tc,endingEnd:tc}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,a=t+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case ec:r=t,o=2*e-n;break;case nc:r=s.length-2,o=e+s[r]-s[r+1];break;default:r=t,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case ec:a=t,l=2*n-e;break;case nc:a=1,l=n+s[1]-s[0];break;default:a=t-1,l=e}let c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-o),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,m=this._weightNext,x=(n-e)/(s-e),v=x*x,p=v*x,f=-u*p+2*u*v-u*x,S=(1+u)*p+(-1.5-2*u)*v+(-.5+u)*x+1,T=(-1-m)*p+(1.5+m)*v+.5*x,b=m*p-m*v;for(let A=0;A!==o;++A)r[A]=f*a[h+A]+S*a[c+A]+T*a[l+A]+b*a[d+A];return r}},Wa=class extends oi{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=(n-e)/(s-e),d=1-h;for(let u=0;u!==o;++u)r[u]=a[c+u]*d+a[l+u]*h;return r}},Xa=class extends oi{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},$a=class extends oi{interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this.inTangents,d=this.outTangents;if(!h||!d){let x=(n-e)/(s-e),v=1-x;for(let p=0;p!==o;++p)r[p]=a[c+p]*v+a[l+p]*x;return r}let u=o*2,m=t-1;for(let x=0;x!==o;++x){let v=a[c+x],p=a[l+x],f=m*u+x*2,S=d[f],T=d[f+1],b=t*u+x*2,A=h[b],M=h[b+1],C=(n-e)/(s-e),y,E,R,P,F;for(let q=0;q<8;q++){y=C*C,E=y*C,R=1-C,P=R*R,F=P*R;let k=F*e+3*P*C*S+3*R*y*A+E*s-n;if(Math.abs(k)<1e-10)break;let G=3*P*(S-e)+6*R*C*(A-S)+3*y*(s-A);if(Math.abs(G)<1e-10)break;C=C-k/G,C=Math.max(0,Math.min(1,C))}r[x]=F*v+3*P*C*T+3*R*y*M+E*p}return r}},Qe=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=pa(e,this.TimeBufferType),this.values=pa(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:pa(t.times,Array),values:pa(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Xa(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Wa(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Ga(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new $a(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case Ws:e=this.InterpolantFactoryMethodDiscrete;break;case Ca:e=this.InterpolantFactoryMethodLinear;break;case xa:e=this.InterpolantFactoryMethodSmooth;break;case Ql:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Rt("KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ws;case this.InterpolantFactoryMethodLinear:return Ca;case this.InterpolantFactoryMethodSmooth:return xa;case this.InterpolantFactoryMethodBezier:return Ql}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t}return this}trim(t,e){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<t;)++r;for(;a!==-1&&n[a]>e;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(Pt("KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(Pt("KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){Pt("KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(a!==null&&a>l){Pt("KeyframeTrack: Out of order keys.",this,o,l,a),t=!1;break}a=l}if(s!==void 0&&Yf(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){Pt("KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===xa,r=t.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=t[o],h=t[o+1];if(c!==h&&(o!==1||c!==t[0]))if(s)l=!0;else{let d=o*n,u=d-n,m=d+n;for(let x=0;x!==n;++x){let v=e[d+x];if(v!==e[u+x]||v!==e[m+x]){l=!0;break}}}if(l){if(o!==a){t[a]=t[o];let d=o*n,u=a*n;for(let m=0;m!==n;++m)e[u+m]=e[d+m]}++a}}if(r>0){t[a]=t[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)e[l+c]=e[o+c];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}};Qe.prototype.ValueTypeName="";Qe.prototype.TimeBufferType=Float32Array;Qe.prototype.ValueBufferType=Float32Array;Qe.prototype.DefaultInterpolation=Ca;var li=class extends Qe{constructor(t,e,n){super(t,e,n)}};li.prototype.ValueTypeName="bool";li.prototype.ValueBufferType=Array;li.prototype.DefaultInterpolation=Ws;li.prototype.InterpolantFactoryMethodLinear=void 0;li.prototype.InterpolantFactoryMethodSmooth=void 0;var qa=class extends Qe{constructor(t,e,n,s){super(t,e,n,s)}};qa.prototype.ValueTypeName="color";var Ya=class extends Qe{constructor(t,e,n,s){super(t,e,n,s)}};Ya.prototype.ValueTypeName="number";var ja=class extends oi{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-e)/(s-e),c=t*o;for(let h=c+o;c!==h;c+=4)wn.slerpFlat(r,0,a,c-o,a,c,l);return r}},or=class extends Qe{constructor(t,e,n,s){super(t,e,n,s)}InterpolantFactoryMethodLinear(t){return new ja(this.times,this.values,this.getValueSize(),t)}};or.prototype.ValueTypeName="quaternion";or.prototype.InterpolantFactoryMethodSmooth=void 0;var ci=class extends Qe{constructor(t,e,n){super(t,e,n)}};ci.prototype.ValueTypeName="string";ci.prototype.ValueBufferType=Array;ci.prototype.DefaultInterpolation=Ws;ci.prototype.InterpolantFactoryMethodLinear=void 0;ci.prototype.InterpolantFactoryMethodSmooth=void 0;var Za=class extends Qe{constructor(t,e,n,s){super(t,e,n,s)}};Za.prototype.ValueTypeName="vector";var Ja=class{constructor(t,e,n){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this._abortController=null,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){let d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=c.length;d<u;d+=2){let m=c[d],x=c[d+1];if(m.global&&(m.lastIndex=0),m.test(h))return x}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Bu=new Ja,Ka=class{constructor(t){this.manager=t!==void 0?t:Bu,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};Ka.DEFAULT_MATERIAL_NAME="__DEFAULT";var ms=class extends De{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new It(t),this.intensity=e}dispose(){this.dispatchEvent({type:"dispose"})}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}},lr=class extends ms{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(De.DEFAULT_UP),this.updateMatrix(),this.groundColor=new It(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){let e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}},Kl=new oe,jh=new L,Zh=new L,rc=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Dt(512,512),this.mapType=$e,this.map=null,this.mapPass=null,this.matrix=new oe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ds,this._frameExtents=new Dt(1,1),this._viewportCount=1,this._viewports=[new ue(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,n=this.matrix;jh.setFromMatrixPosition(t.matrixWorld),e.position.copy(jh),Zh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Zh),e.updateMatrixWorld(),Kl.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Kl,e.coordinateSystem,e.reversedDepth),e.coordinateSystem===os||e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Kl)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},ma=new L,ga=new wn,yn=new L,cr=class extends De{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new oe,this.projectionMatrix=new oe,this.projectionMatrixInverse=new oe,this.coordinateSystem=cn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(ma,ga,yn),yn.x===1&&yn.y===1&&yn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ma,ga,yn.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(ma,ga,yn),yn.x===1&&yn.y===1&&yn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ma,ga,yn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},ti=new L,Jh=new Dt,Kh=new Dt,Ie=class extends cr{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Pa*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Al*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Pa*2*Math.atan(Math.tan(Al*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){ti.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(ti.x,ti.y).multiplyScalar(-t/ti.z),ti.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ti.x,ti.y).multiplyScalar(-t/ti.z)}getViewSize(t,e){return this.getViewBounds(t,Jh,Kh),e.subVectors(Kh,Jh)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Al*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var ac=class extends rc{constructor(){super(new Ie(90,1,.5,500)),this.isPointLightShadow=!0}},hr=class extends ms{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new ac}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.distance=this.distance,e.object.decay=this.decay,e.object.shadow=this.shadow.toJSON(),e}},ur=class extends cr{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,a=n+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}};var dr=class extends ms{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}};var ss=-90,rs=1,Qa=class extends De{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Ie(ss,rs,t,e);s.layers=this.layers,this.add(s);let r=new Ie(ss,rs,t,e);r.layers=this.layers,this.add(r);let a=new Ie(ss,rs,t,e);a.layers=this.layers,this.add(a);let o=new Ie(ss,rs,t,e);o.layers=this.layers,this.add(o);let l=new Ie(ss,rs,t,e);l.layers=this.layers,this.add(l);let c=new Ie(ss,rs,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,l]=e;for(let c of e)this.remove(c);if(t===cn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===os)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),m=t.getActiveMipmapLevel(),x=t.xr.enabled;t.xr.enabled=!1;let v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let p=!1;t.isWebGLRenderer===!0?p=t.state.buffers.depth.getReversed():p=t.reversedDepthBuffer,t.setRenderTarget(n,0,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,2,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,3,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(n,4,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(d,u,m),t.xr.enabled=x,n.texture.needsPMREMUpdate=!0}},to=class extends Ie{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}};var Rc="\\[\\]\\.:\\/",xp=new RegExp("["+Rc+"]","g"),Pc="[^"+Rc+"]",yp="[^"+Rc.replace("\\.","")+"]",_p=/((?:WC+[\/:])*)/.source.replace("WC",Pc),vp=/(WCOD+)?/.source.replace("WCOD",yp),bp=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Pc),Sp=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Pc),Mp=new RegExp("^"+_p+vp+bp+Sp+"$"),wp=["material","materials","bones","map"],oc=class{constructor(t,e,n){let s=n||ce.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},ce=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(xp,"")}static parseTrackName(t){let e=Mp.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);wp.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let l=n(o.children);if(l)return l}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Rt("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){Pt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Pt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Pt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Pt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Pt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){Pt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){Pt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let a=t[s];if(a===void 0){let c=e.nodeName;Pt("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){Pt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Pt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ce.Composite=oc;ce.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ce.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ce.prototype.GetterByBindingType=[ce.prototype._getValue_direct,ce.prototype._getValue_array,ce.prototype._getValue_arrayElement,ce.prototype._getValue_toArray];ce.prototype.SetterByBindingTypeAndVersioning=[[ce.prototype._setValue_direct,ce.prototype._setValue_direct_setNeedsUpdate,ce.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ce.prototype._setValue_array,ce.prototype._setValue_array_setNeedsUpdate,ce.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ce.prototype._setValue_arrayElement,ce.prototype._setValue_arrayElement_setNeedsUpdate,ce.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ce.prototype._setValue_fromArray,ce.prototype._setValue_fromArray_setNeedsUpdate,ce.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var b_=new Float32Array(1);var Fc=class Fc{constructor(t,e,n,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,s){let r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=s,this}};Fc.prototype.isMatrix2=!0;var lc=Fc;function Ic(i,t,e,n){let s=Ep(n);switch(e){case wc:return i*t;case Tc:return i*t/s.components*s.byteLength;case co:return i*t/s.components*s.byteLength;case fi:return i*t*2/s.components*s.byteLength;case ho:return i*t*2/s.components*s.byteLength;case Ec:return i*t*3/s.components*s.byteLength;case sn:return i*t*4/s.components*s.byteLength;case uo:return i*t*4/s.components*s.byteLength;case xr:case yr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case _r:case vr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case po:case go:return Math.max(i,16)*Math.max(t,8)/4;case fo:case mo:return Math.max(i,8)*Math.max(t,8)/2;case xo:case yo:case vo:case bo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case _o:case br:case So:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Mo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case wo:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Eo:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case To:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Ao:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Co:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Ro:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Po:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Io:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Lo:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Do:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case No:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Uo:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Fo:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Oo:case Bo:case ko:return Math.ceil(i/4)*Math.ceil(t/4)*16;case zo:case Ho:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Sr:case Vo:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Ep(i){switch(i){case $e:case vc:return{byteLength:1,components:1};case xs:case bc:case An:return{byteLength:2,components:1};case oo:case lo:return{byteLength:2,components:4};case fn:case ao:case pn:return{byteLength:4,components:1};case Sc:case Mc:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:no}}));typeof window<"u"&&(window.__THREE__?Rt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=no);function od(){let i=null,t=!1,e=null,n=null;function s(r,a){e(r,a),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&i!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Tp(i){let t=new WeakMap;function e(o,l){let c=o.array,h=o.usage,d=c.byteLength,u=i.createBuffer();i.bindBuffer(l,u),i.bufferData(l,c,h),o.onUploadCallback();let m;if(c instanceof Float32Array)m=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)m=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?m=i.HALF_FLOAT:m=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)m=i.SHORT;else if(c instanceof Uint32Array)m=i.UNSIGNED_INT;else if(c instanceof Int32Array)m=i.INT;else if(c instanceof Int8Array)m=i.BYTE;else if(c instanceof Uint8Array)m=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)m=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:m,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,c){let h=l.array,d=l.updateRanges;if(i.bindBuffer(c,o),d.length===0)i.bufferSubData(c,0,h);else{d.sort((m,x)=>m.start-x.start);let u=0;for(let m=1;m<d.length;m++){let x=d[u],v=d[m];v.start<=x.start+x.count+1?x.count=Math.max(x.count,v.start+v.count-x.start):(++u,d[u]=v)}d.length=u+1;for(let m=0,x=d.length;m<x;m++){let v=d[m];i.bufferSubData(c,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=t.get(o);l&&(i.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var Ap=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Cp=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Rp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Pp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ip=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Lp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Dp=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Np=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Up=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Fp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Op=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Bp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,kp=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,zp=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Hp=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Vp=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Gp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Wp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Xp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,$p=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,qp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Yp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,jp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Zp=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Jp=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Kp=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,Qp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,tm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,em=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,nm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,im="gl_FragColor = linearToOutputTexel( gl_FragColor );",sm=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,rm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,am=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,om=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,lm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,cm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,hm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,um=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,dm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,pm=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,mm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,gm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,xm=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ym=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,_m=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,vm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,bm=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Sm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Mm=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,wm=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Em=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Tm=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Am=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Cm=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Rm=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Pm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Im=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Lm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Dm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Nm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Um=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Fm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Om=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Bm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,km=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,zm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Hm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Vm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Gm=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Wm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Xm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,$m=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,qm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ym=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,jm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Zm=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Jm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Km=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Qm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,tg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,eg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,ng=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,ig=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,sg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,rg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,ag=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,og=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,lg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,cg=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,hg=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,ug=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,dg=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,fg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,pg=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,mg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,gg=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,xg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,yg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,_g=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,vg=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,bg=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Sg=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Mg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,wg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Eg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Tg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Ag=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Cg=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Rg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Pg=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ig=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Lg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Dg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Ng=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Ug=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Fg=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Og=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Bg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,kg=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,zg=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Hg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Vg=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Gg=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Wg=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Xg=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,$g=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,qg=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Yg=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,jg=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Zg=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Jg=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Kg=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Qg=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,t0=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,e0=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,n0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,i0=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,s0=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,r0=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,a0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Bt={alphahash_fragment:Ap,alphahash_pars_fragment:Cp,alphamap_fragment:Rp,alphamap_pars_fragment:Pp,alphatest_fragment:Ip,alphatest_pars_fragment:Lp,aomap_fragment:Dp,aomap_pars_fragment:Np,batching_pars_vertex:Up,batching_vertex:Fp,begin_vertex:Op,beginnormal_vertex:Bp,bsdfs:kp,iridescence_fragment:zp,bumpmap_pars_fragment:Hp,clipping_planes_fragment:Vp,clipping_planes_pars_fragment:Gp,clipping_planes_pars_vertex:Wp,clipping_planes_vertex:Xp,color_fragment:$p,color_pars_fragment:qp,color_pars_vertex:Yp,color_vertex:jp,common:Zp,cube_uv_reflection_fragment:Jp,defaultnormal_vertex:Kp,displacementmap_pars_vertex:Qp,displacementmap_vertex:tm,emissivemap_fragment:em,emissivemap_pars_fragment:nm,colorspace_fragment:im,colorspace_pars_fragment:sm,envmap_fragment:rm,envmap_common_pars_fragment:am,envmap_pars_fragment:om,envmap_pars_vertex:lm,envmap_physical_pars_fragment:_m,envmap_vertex:cm,fog_vertex:hm,fog_pars_vertex:um,fog_fragment:dm,fog_pars_fragment:fm,gradientmap_pars_fragment:pm,lightmap_pars_fragment:mm,lights_lambert_fragment:gm,lights_lambert_pars_fragment:xm,lights_pars_begin:ym,lights_toon_fragment:vm,lights_toon_pars_fragment:bm,lights_phong_fragment:Sm,lights_phong_pars_fragment:Mm,lights_physical_fragment:wm,lights_physical_pars_fragment:Em,lights_fragment_begin:Tm,lights_fragment_maps:Am,lights_fragment_end:Cm,lightprobes_pars_fragment:Rm,logdepthbuf_fragment:Pm,logdepthbuf_pars_fragment:Im,logdepthbuf_pars_vertex:Lm,logdepthbuf_vertex:Dm,map_fragment:Nm,map_pars_fragment:Um,map_particle_fragment:Fm,map_particle_pars_fragment:Om,metalnessmap_fragment:Bm,metalnessmap_pars_fragment:km,morphinstance_vertex:zm,morphcolor_vertex:Hm,morphnormal_vertex:Vm,morphtarget_pars_vertex:Gm,morphtarget_vertex:Wm,normal_fragment_begin:Xm,normal_fragment_maps:$m,normal_pars_fragment:qm,normal_pars_vertex:Ym,normal_vertex:jm,normalmap_pars_fragment:Zm,clearcoat_normal_fragment_begin:Jm,clearcoat_normal_fragment_maps:Km,clearcoat_pars_fragment:Qm,iridescence_pars_fragment:tg,opaque_fragment:eg,packing:ng,premultiplied_alpha_fragment:ig,project_vertex:sg,dithering_fragment:rg,dithering_pars_fragment:ag,roughnessmap_fragment:og,roughnessmap_pars_fragment:lg,shadowmap_pars_fragment:cg,shadowmap_pars_vertex:hg,shadowmap_vertex:ug,shadowmask_pars_fragment:dg,skinbase_vertex:fg,skinning_pars_vertex:pg,skinning_vertex:mg,skinnormal_vertex:gg,specularmap_fragment:xg,specularmap_pars_fragment:yg,tonemapping_fragment:_g,tonemapping_pars_fragment:vg,transmission_fragment:bg,transmission_pars_fragment:Sg,uv_pars_fragment:Mg,uv_pars_vertex:wg,uv_vertex:Eg,worldpos_vertex:Tg,background_vert:Ag,background_frag:Cg,backgroundCube_vert:Rg,backgroundCube_frag:Pg,cube_vert:Ig,cube_frag:Lg,depth_vert:Dg,depth_frag:Ng,distance_vert:Ug,distance_frag:Fg,equirect_vert:Og,equirect_frag:Bg,linedashed_vert:kg,linedashed_frag:zg,meshbasic_vert:Hg,meshbasic_frag:Vg,meshlambert_vert:Gg,meshlambert_frag:Wg,meshmatcap_vert:Xg,meshmatcap_frag:$g,meshnormal_vert:qg,meshnormal_frag:Yg,meshphong_vert:jg,meshphong_frag:Zg,meshphysical_vert:Jg,meshphysical_frag:Kg,meshtoon_vert:Qg,meshtoon_frag:t0,points_vert:e0,points_frag:n0,shadow_vert:i0,shadow_frag:s0,sprite_vert:r0,sprite_frag:a0},ut={common:{diffuse:{value:new It(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ut},alphaMap:{value:null},alphaMapTransform:{value:new Ut},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ut}},envmap:{envMap:{value:null},envMapRotation:{value:new Ut},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ut}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ut}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ut},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ut},normalScale:{value:new Dt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ut},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ut}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ut}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ut}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new It(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new L},probesMax:{value:new L},probesResolution:{value:new L}},points:{diffuse:{value:new It(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ut},alphaTest:{value:0},uvTransform:{value:new Ut}},sprite:{diffuse:{value:new It(16777215)},opacity:{value:1},center:{value:new Dt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ut},alphaMap:{value:null},alphaMapTransform:{value:new Ut},alphaTest:{value:0}}},Rn={basic:{uniforms:ze([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.fog]),vertexShader:Bt.meshbasic_vert,fragmentShader:Bt.meshbasic_frag},lambert:{uniforms:ze([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,ut.lights,{emissive:{value:new It(0)},envMapIntensity:{value:1}}]),vertexShader:Bt.meshlambert_vert,fragmentShader:Bt.meshlambert_frag},phong:{uniforms:ze([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,ut.lights,{emissive:{value:new It(0)},specular:{value:new It(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Bt.meshphong_vert,fragmentShader:Bt.meshphong_frag},standard:{uniforms:ze([ut.common,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.roughnessmap,ut.metalnessmap,ut.fog,ut.lights,{emissive:{value:new It(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Bt.meshphysical_vert,fragmentShader:Bt.meshphysical_frag},toon:{uniforms:ze([ut.common,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.gradientmap,ut.fog,ut.lights,{emissive:{value:new It(0)}}]),vertexShader:Bt.meshtoon_vert,fragmentShader:Bt.meshtoon_frag},matcap:{uniforms:ze([ut.common,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,{matcap:{value:null}}]),vertexShader:Bt.meshmatcap_vert,fragmentShader:Bt.meshmatcap_frag},points:{uniforms:ze([ut.points,ut.fog]),vertexShader:Bt.points_vert,fragmentShader:Bt.points_frag},dashed:{uniforms:ze([ut.common,ut.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Bt.linedashed_vert,fragmentShader:Bt.linedashed_frag},depth:{uniforms:ze([ut.common,ut.displacementmap]),vertexShader:Bt.depth_vert,fragmentShader:Bt.depth_frag},normal:{uniforms:ze([ut.common,ut.bumpmap,ut.normalmap,ut.displacementmap,{opacity:{value:1}}]),vertexShader:Bt.meshnormal_vert,fragmentShader:Bt.meshnormal_frag},sprite:{uniforms:ze([ut.sprite,ut.fog]),vertexShader:Bt.sprite_vert,fragmentShader:Bt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ut},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Bt.background_vert,fragmentShader:Bt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ut}},vertexShader:Bt.backgroundCube_vert,fragmentShader:Bt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Bt.cube_vert,fragmentShader:Bt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Bt.equirect_vert,fragmentShader:Bt.equirect_frag},distance:{uniforms:ze([ut.common,ut.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Bt.distance_vert,fragmentShader:Bt.distance_frag},shadow:{uniforms:ze([ut.lights,ut.fog,{color:{value:new It(0)},opacity:{value:1}}]),vertexShader:Bt.shadow_vert,fragmentShader:Bt.shadow_frag}};Rn.physical={uniforms:ze([Rn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ut},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ut},clearcoatNormalScale:{value:new Dt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ut},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ut},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ut},sheen:{value:0},sheenColor:{value:new It(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ut},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ut},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ut},transmissionSamplerSize:{value:new Dt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ut},attenuationDistance:{value:0},attenuationColor:{value:new It(0)},specularColor:{value:new It(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ut},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ut},anisotropyVector:{value:new Dt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ut}}]),vertexShader:Bt.meshphysical_vert,fragmentShader:Bt.meshphysical_frag};var $o={r:0,b:0,g:0},o0=new oe,ld=new Ut;ld.set(-1,0,0,0,1,0,0,0,1);function l0(i,t,e,n,s,r){let a=new It(0),o=s===!0?0:1,l,c,h=null,d=0,u=null;function m(S){let T=S.isScene===!0?S.background:null;if(T&&T.isTexture){let b=S.backgroundBlurriness>0;T=t.get(T,b)}return T}function x(S){let T=!1,b=m(S);b===null?p(a,o):b&&b.isColor&&(p(b,1),T=!0);let A=i.xr.getEnvironmentBlendMode();A==="additive"?e.buffers.color.setClear(0,0,0,1,r):A==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(i.autoClear||T)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function v(S,T){let b=m(T);b&&(b.isCubeTexture||b.mapping===mr)?(c===void 0&&(c=new xe(new Vn(1,1,1),new Xe({name:"BackgroundCubeMaterial",uniforms:Di(Rn.backgroundCube.uniforms),vertexShader:Rn.backgroundCube.vertexShader,fragmentShader:Rn.backgroundCube.fragmentShader,side:Ne,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(A,M,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=b,c.material.uniforms.backgroundBlurriness.value=T.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(o0.makeRotationFromEuler(T.backgroundRotation)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(ld),c.material.toneMapped=Wt.getTransfer(b.colorSpace)!==Kt,(h!==b||d!==b.version||u!==i.toneMapping)&&(c.material.needsUpdate=!0,h=b,d=b.version,u=i.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null)):b&&b.isTexture&&(l===void 0&&(l=new xe(new rr(2,2),new Xe({name:"BackgroundMaterial",uniforms:Di(Rn.background.uniforms),vertexShader:Rn.background.vertexShader,fragmentShader:Rn.background.fragmentShader,side:kn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=b,l.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,l.material.toneMapped=Wt.getTransfer(b.colorSpace)!==Kt,b.matrixAutoUpdate===!0&&b.updateMatrix(),l.material.uniforms.uvTransform.value.copy(b.matrix),(h!==b||d!==b.version||u!==i.toneMapping)&&(l.material.needsUpdate=!0,h=b,d=b.version,u=i.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null))}function p(S,T){S.getRGB($o,Cc(i)),e.buffers.color.setClear($o.r,$o.g,$o.b,T,r)}function f(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(S,T=1){a.set(S),o=T,p(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(S){o=S,p(a,o)},render:x,addToRenderList:v,dispose:f}}function c0(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null),r=s,a=!1;function o(P,F,q,Y,k){let G=!1,V=d(P,Y,q,F);r!==V&&(r=V,c(r.object)),G=m(P,Y,q,k),G&&x(P,Y,q,k),k!==null&&t.update(k,i.ELEMENT_ARRAY_BUFFER),(G||a)&&(a=!1,b(P,F,q,Y),k!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(k).buffer))}function l(){return i.createVertexArray()}function c(P){return i.bindVertexArray(P)}function h(P){return i.deleteVertexArray(P)}function d(P,F,q,Y){let k=Y.wireframe===!0,G=n[F.id];G===void 0&&(G={},n[F.id]=G);let V=P.isInstancedMesh===!0?P.id:0,K=G[V];K===void 0&&(K={},G[V]=K);let et=K[q.id];et===void 0&&(et={},K[q.id]=et);let ct=et[k];return ct===void 0&&(ct=u(l()),et[k]=ct),ct}function u(P){let F=[],q=[],Y=[];for(let k=0;k<e;k++)F[k]=0,q[k]=0,Y[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:q,attributeDivisors:Y,object:P,attributes:{},index:null}}function m(P,F,q,Y){let k=r.attributes,G=F.attributes,V=0,K=q.getAttributes();for(let et in K)if(K[et].location>=0){let dt=k[et],mt=G[et];if(mt===void 0&&(et==="instanceMatrix"&&P.instanceMatrix&&(mt=P.instanceMatrix),et==="instanceColor"&&P.instanceColor&&(mt=P.instanceColor)),dt===void 0||dt.attribute!==mt||mt&&dt.data!==mt.data)return!0;V++}return r.attributesNum!==V||r.index!==Y}function x(P,F,q,Y){let k={},G=F.attributes,V=0,K=q.getAttributes();for(let et in K)if(K[et].location>=0){let dt=G[et];dt===void 0&&(et==="instanceMatrix"&&P.instanceMatrix&&(dt=P.instanceMatrix),et==="instanceColor"&&P.instanceColor&&(dt=P.instanceColor));let mt={};mt.attribute=dt,dt&&dt.data&&(mt.data=dt.data),k[et]=mt,V++}r.attributes=k,r.attributesNum=V,r.index=Y}function v(){let P=r.newAttributes;for(let F=0,q=P.length;F<q;F++)P[F]=0}function p(P){f(P,0)}function f(P,F){let q=r.newAttributes,Y=r.enabledAttributes,k=r.attributeDivisors;q[P]=1,Y[P]===0&&(i.enableVertexAttribArray(P),Y[P]=1),k[P]!==F&&(i.vertexAttribDivisor(P,F),k[P]=F)}function S(){let P=r.newAttributes,F=r.enabledAttributes;for(let q=0,Y=F.length;q<Y;q++)F[q]!==P[q]&&(i.disableVertexAttribArray(q),F[q]=0)}function T(P,F,q,Y,k,G,V){V===!0?i.vertexAttribIPointer(P,F,q,k,G):i.vertexAttribPointer(P,F,q,Y,k,G)}function b(P,F,q,Y){v();let k=Y.attributes,G=q.getAttributes(),V=F.defaultAttributeValues;for(let K in G){let et=G[K];if(et.location>=0){let ct=k[K];if(ct===void 0&&(K==="instanceMatrix"&&P.instanceMatrix&&(ct=P.instanceMatrix),K==="instanceColor"&&P.instanceColor&&(ct=P.instanceColor)),ct!==void 0){let dt=ct.normalized,mt=ct.itemSize,zt=t.get(ct);if(zt===void 0)continue;let Lt=zt.buffer,qt=zt.type,Z=zt.bytesPerElement,ot=qt===i.INT||qt===i.UNSIGNED_INT||ct.gpuType===ao;if(ct.isInterleavedBufferAttribute){let nt=ct.data,$=nt.stride,xt=ct.offset;if(nt.isInstancedInterleavedBuffer){for(let _t=0;_t<et.locationSize;_t++)f(et.location+_t,nt.meshPerAttribute);P.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=nt.meshPerAttribute*nt.count)}else for(let _t=0;_t<et.locationSize;_t++)p(et.location+_t);i.bindBuffer(i.ARRAY_BUFFER,Lt);for(let _t=0;_t<et.locationSize;_t++)T(et.location+_t,mt/et.locationSize,qt,dt,$*Z,(xt+mt/et.locationSize*_t)*Z,ot)}else{if(ct.isInstancedBufferAttribute){for(let nt=0;nt<et.locationSize;nt++)f(et.location+nt,ct.meshPerAttribute);P.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=ct.meshPerAttribute*ct.count)}else for(let nt=0;nt<et.locationSize;nt++)p(et.location+nt);i.bindBuffer(i.ARRAY_BUFFER,Lt);for(let nt=0;nt<et.locationSize;nt++)T(et.location+nt,mt/et.locationSize,qt,dt,mt*Z,mt/et.locationSize*nt*Z,ot)}}else if(V!==void 0){let dt=V[K];if(dt!==void 0)switch(dt.length){case 2:i.vertexAttrib2fv(et.location,dt);break;case 3:i.vertexAttrib3fv(et.location,dt);break;case 4:i.vertexAttrib4fv(et.location,dt);break;default:i.vertexAttrib1fv(et.location,dt)}}}}S()}function A(){E();for(let P in n){let F=n[P];for(let q in F){let Y=F[q];for(let k in Y){let G=Y[k];for(let V in G)h(G[V].object),delete G[V];delete Y[k]}}delete n[P]}}function M(P){if(n[P.id]===void 0)return;let F=n[P.id];for(let q in F){let Y=F[q];for(let k in Y){let G=Y[k];for(let V in G)h(G[V].object),delete G[V];delete Y[k]}}delete n[P.id]}function C(P){for(let F in n){let q=n[F];for(let Y in q){let k=q[Y];if(k[P.id]===void 0)continue;let G=k[P.id];for(let V in G)h(G[V].object),delete G[V];delete k[P.id]}}}function y(P){for(let F in n){let q=n[F],Y=P.isInstancedMesh===!0?P.id:0,k=q[Y];if(k!==void 0){for(let G in k){let V=k[G];for(let K in V)h(V[K].object),delete V[K];delete k[G]}delete q[Y],Object.keys(q).length===0&&delete n[F]}}}function E(){R(),a=!0,r!==s&&(r=s,c(r.object))}function R(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:E,resetDefaultState:R,dispose:A,releaseStatesOfGeometry:M,releaseStatesOfObject:y,releaseStatesOfProgram:C,initAttributes:v,enableAttribute:p,disableUnusedAttributes:S}}function h0(i,t,e){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),e.update(c,n,1)}function a(l,c,h){h!==0&&(i.drawArraysInstanced(n,l,c,h),e.update(c,n,h))}function o(l,c,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let u=0;for(let m=0;m<h;m++)u+=c[m];e.update(u,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function u0(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let C=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(C){return!(C!==sn&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){let y=C===An&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==$e&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==pn&&!y)}function l(C){if(C==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(Rt("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let d=e.logarithmicDepthBuffer===!0,u=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&u===!1&&Rt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let m=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),p=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),S=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),T=i.getParameter(i.MAX_VARYING_VECTORS),b=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),A=i.getParameter(i.MAX_SAMPLES),M=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:m,maxVertexTextures:x,maxTextureSize:v,maxCubemapSize:p,maxAttributes:f,maxVertexUniforms:S,maxVaryings:T,maxFragmentUniforms:b,maxSamples:A,samples:M}}function d0(i){let t=this,e=null,n=0,s=!1,r=!1,a=new _n,o=new Ut,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){let m=d.length!==0||u||n!==0||s;return s=u,n=d.length,m},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,m){let x=d.clippingPlanes,v=d.clipIntersection,p=d.clipShadows,f=i.get(d);if(!s||x===null||x.length===0||r&&!p)r?h(null):c();else{let S=r?0:n,T=S*4,b=f.clippingState||null;l.value=b,b=h(x,u,T,m);for(let A=0;A!==T;++A)b[A]=e[A];f.clippingState=b,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,u,m,x){let v=d!==null?d.length:0,p=null;if(v!==0){if(p=l.value,x!==!0||p===null){let f=m+v*4,S=u.matrixWorldInverse;o.getNormalMatrix(S),(p===null||p.length<f)&&(p=new Float32Array(f));for(let T=0,b=m;T!==v;++T,b+=4)a.copy(d[T]).applyMatrix4(S,o),a.normal.toArray(p,b),p[b+3]=a.constant}l.value=p,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,p}}var pi=4,ku=[.125,.215,.35,.446,.526,.582],Ni=20,f0=256,Mr=new ur,zu=new It,Oc=null,Bc=0,kc=0,zc=!1,p0=new L,Yo=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){let{size:a=256,position:o=p0}=r;Oc=this._renderer.getRenderTarget(),Bc=this._renderer.getActiveCubeFace(),kc=this._renderer.getActiveMipmapLevel(),zc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,n,s,l,o),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Gu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Vu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(Oc,Bc,kc),this._renderer.xr.enabled=zc,t.scissorTest=!1,_s(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===hi||t.mapping===Li?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Oc=this._renderer.getRenderTarget(),Bc=this._renderer.getActiveCubeFace(),kc=this._renderer.getActiveMipmapLevel(),zc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Le,minFilter:Le,generateMipmaps:!1,type:An,format:sn,colorSpace:Xs,depthBuffer:!1},s=Hu(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Hu(t,e,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=m0(r)),this._blurMaterial=x0(r,t,e),this._ggxMaterial=g0(r,t,e)}return s}_compileMaterial(t){let e=new xe(new Se,t);this._renderer.compile(e,Mr)}_sceneToCubeUV(t,e,n,s,r){let l=new Ie(90,1,e,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,m=d.toneMapping;d.getClearColor(zu),d.toneMapping=dn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new xe(new Vn,new Ri({name:"PMREM.Background",side:Ne,depthWrite:!1,depthTest:!1})));let v=this._backgroundBox,p=v.material,f=!1,S=t.background;S?S.isColor&&(p.color.copy(S),t.background=null,f=!0):(p.color.copy(zu),f=!0);for(let T=0;T<6;T++){let b=T%3;b===0?(l.up.set(0,c[T],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[T],r.y,r.z)):b===1?(l.up.set(0,0,c[T]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[T],r.z)):(l.up.set(0,c[T],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[T]));let A=this._cubeSize;_s(s,b*A,T>2?A:0,A,A),d.setRenderTarget(s),f&&d.render(v,l),d.render(t,l)}d.toneMapping=m,d.autoClear=u,t.background=S}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===hi||t.mapping===Li;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Gu()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Vu());let r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=t;let l=this._cubeSize;_s(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,Mr)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=n}_applyGGXFilter(t,e,n){let s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let l=a.uniforms,c=n/(this._lodMeshes.length-1),h=e/(this._lodMeshes.length-1),d=Math.sqrt(c*c-h*h),u=0+c*1.25,m=d*u,{_lodMax:x}=this,v=this._sizeLods[n],p=3*v*(n>x-pi?n-x+pi:0),f=4*(this._cubeSize-v);l.envMap.value=t.texture,l.roughness.value=m,l.mipInt.value=x-e,_s(r,p,f,3*v,2*v),s.setRenderTarget(r),s.render(o,Mr),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=x-n,_s(t,p,f,3*v,2*v),s.setRenderTarget(t),s.render(o,Mr)}_blur(t,e,n,s,r){let a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,s,"latitudinal",r),this._halfBlur(a,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,a,o){let l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Pt("blur direction must be either latitudinal or longitudinal!");let h=3,d=this._lodMeshes[s];d.material=c;let u=c.uniforms,m=this._sizeLods[n]-1,x=isFinite(r)?Math.PI/(2*m):2*Math.PI/(2*Ni-1),v=r/x,p=isFinite(r)?1+Math.floor(h*v):Ni;p>Ni&&Rt(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Ni}`);let f=[],S=0;for(let C=0;C<Ni;++C){let y=C/v,E=Math.exp(-y*y/2);f.push(E),C===0?S+=E:C<p&&(S+=2*E)}for(let C=0;C<f.length;C++)f[C]=f[C]/S;u.envMap.value=t.texture,u.samples.value=p,u.weights.value=f,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);let{_lodMax:T}=this;u.dTheta.value=x,u.mipInt.value=T-n;let b=this._sizeLods[s],A=3*b*(s>T-pi?s-T+pi:0),M=4*(this._cubeSize-b);_s(e,A,M,3*b,2*b),l.setRenderTarget(e),l.render(d,Mr)}};function m0(i){let t=[],e=[],n=[],s=i,r=i-pi+1+ku.length;for(let a=0;a<r;a++){let o=Math.pow(2,s);t.push(o);let l=1/o;a>i-pi?l=ku[a-i+pi-1]:a===0&&(l=0),e.push(l);let c=1/(o-2),h=-c,d=1+c,u=[h,h,d,h,d,d,h,h,d,d,h,d],m=6,x=6,v=3,p=2,f=1,S=new Float32Array(v*x*m),T=new Float32Array(p*x*m),b=new Float32Array(f*x*m);for(let M=0;M<m;M++){let C=M%3*2/3-1,y=M>2?0:-1,E=[C,y,0,C+2/3,y,0,C+2/3,y+1,0,C,y,0,C+2/3,y+1,0,C,y+1,0];S.set(E,v*x*M),T.set(u,p*x*M);let R=[M,M,M,M,M,M];b.set(R,f*x*M)}let A=new Se;A.setAttribute("position",new Te(S,v)),A.setAttribute("uv",new Te(T,p)),A.setAttribute("faceIndex",new Te(b,f)),n.push(new xe(A,null)),s>pi&&s--}return{lodMeshes:n,sizeLods:t,sigmas:e}}function Hu(i,t,e){let n=new Ke(i,t,e);return n.texture.mapping=mr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function _s(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function g0(i,t,e){return new Xe({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:f0,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Jo(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:En,depthTest:!1,depthWrite:!1})}function x0(i,t,e){let n=new Float32Array(Ni),s=new L(0,1,0);return new Xe({name:"SphericalGaussianBlur",defines:{n:Ni,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Jo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:En,depthTest:!1,depthWrite:!1})}function Vu(){return new Xe({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Jo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:En,depthTest:!1,depthWrite:!1})}function Gu(){return new Xe({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Jo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:En,depthTest:!1,depthWrite:!1})}function Jo(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}var jo=class extends Ke{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new nr(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Vn(5,5,5),r=new Xe({name:"CubemapFromEquirect",uniforms:Di(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ne,blending:En});r.uniforms.tEquirect.value=e;let a=new xe(s,r),o=e.minFilter;return e.minFilter===ui&&(e.minFilter=Le),new Qa(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}};function y0(i){let t=new WeakMap,e=new WeakMap,n=null;function s(u,m=!1){return u==null?null:m?a(u):r(u)}function r(u){if(u&&u.isTexture){let m=u.mapping;if(m===io||m===so)if(t.has(u)){let x=t.get(u).texture;return o(x,u.mapping)}else{let x=u.image;if(x&&x.height>0){let v=new jo(x.height);return v.fromEquirectangularTexture(i,u),t.set(u,v),u.addEventListener("dispose",c),o(v.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){let m=u.mapping,x=m===io||m===so,v=m===hi||m===Li;if(x||v){let p=e.get(u),f=p!==void 0?p.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==f)return n===null&&(n=new Yo(i)),p=x?n.fromEquirectangular(u,p):n.fromCubemap(u,p),p.texture.pmremVersion=u.pmremVersion,e.set(u,p),p.texture;if(p!==void 0)return p.texture;{let S=u.image;return x&&S&&S.height>0||v&&S&&l(S)?(n===null&&(n=new Yo(i)),p=x?n.fromEquirectangular(u):n.fromCubemap(u),p.texture.pmremVersion=u.pmremVersion,e.set(u,p),u.addEventListener("dispose",h),p.texture):null}}}return u}function o(u,m){return m===io?u.mapping=hi:m===so&&(u.mapping=Li),u}function l(u){let m=0,x=6;for(let v=0;v<x;v++)u[v]!==void 0&&m++;return m===x}function c(u){let m=u.target;m.removeEventListener("dispose",c);let x=t.get(m);x!==void 0&&(t.delete(m),x.dispose())}function h(u){let m=u.target;m.removeEventListener("dispose",h);let x=e.get(m);x!==void 0&&(e.delete(m),x.dispose())}function d(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:d}}function _0(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&Ei("WebGLRenderer: "+n+" extension not supported."),s}}}function v0(i,t,e,n){let s={},r=new WeakMap;function a(d){let u=d.target;u.index!==null&&t.remove(u.index);for(let x in u.attributes)t.remove(u.attributes[x]);u.removeEventListener("dispose",a),delete s[u.id];let m=r.get(u);m&&(t.remove(m),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function o(d,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,e.memory.geometries++),u}function l(d){let u=d.attributes;for(let m in u)t.update(u[m],i.ARRAY_BUFFER)}function c(d){let u=[],m=d.index,x=d.attributes.position,v=0;if(x===void 0)return;if(m!==null){let S=m.array;v=m.version;for(let T=0,b=S.length;T<b;T+=3){let A=S[T+0],M=S[T+1],C=S[T+2];u.push(A,M,M,C,C,A)}}else{let S=x.array;v=x.version;for(let T=0,b=S.length/3-1;T<b;T+=3){let A=T+0,M=T+1,C=T+2;u.push(A,M,M,C,C,A)}}let p=new(x.count>=65535?tr:Qs)(u,1);p.version=v;let f=r.get(d);f&&t.remove(f),r.set(d,p)}function h(d){let u=r.get(d);if(u){let m=d.index;m!==null&&u.version<m.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:h}}function b0(i,t,e){let n;function s(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function l(d,u){i.drawElements(n,u,r,d*a),e.update(u,n,1)}function c(d,u,m){m!==0&&(i.drawElementsInstanced(n,u,r,d*a,m),e.update(u,n,m))}function h(d,u,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,d,0,m);let v=0;for(let p=0;p<m;p++)v+=u[p];e.update(v,n,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function S0(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:Pt("WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function M0(i,t,e){let n=new WeakMap,s=new ue;function r(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0,u=n.get(o);if(u===void 0||u.count!==d){let E=function(){C.dispose(),n.delete(o),o.removeEventListener("dispose",E)};u!==void 0&&u.texture.dispose();let m=o.morphAttributes.position!==void 0,x=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],f=o.morphAttributes.normal||[],S=o.morphAttributes.color||[],T=0;m===!0&&(T=1),x===!0&&(T=2),v===!0&&(T=3);let b=o.attributes.position.count*T,A=1;b>t.maxTextureSize&&(A=Math.ceil(b/t.maxTextureSize),b=t.maxTextureSize);let M=new Float32Array(b*A*4*d),C=new js(M,b,A,d);C.type=pn,C.needsUpdate=!0;let y=T*4;for(let R=0;R<d;R++){let P=p[R],F=f[R],q=S[R],Y=b*A*4*R;for(let k=0;k<P.count;k++){let G=k*y;m===!0&&(s.fromBufferAttribute(P,k),M[Y+G+0]=s.x,M[Y+G+1]=s.y,M[Y+G+2]=s.z,M[Y+G+3]=0),x===!0&&(s.fromBufferAttribute(F,k),M[Y+G+4]=s.x,M[Y+G+5]=s.y,M[Y+G+6]=s.z,M[Y+G+7]=0),v===!0&&(s.fromBufferAttribute(q,k),M[Y+G+8]=s.x,M[Y+G+9]=s.y,M[Y+G+10]=s.z,M[Y+G+11]=q.itemSize===4?s.w:1)}}u={count:d,texture:C,size:new Dt(b,A)},n.set(o,u),o.addEventListener("dispose",E)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let m=0;for(let v=0;v<c.length;v++)m+=c[v];let x=o.morphTargetsRelative?1:1-m;l.getUniforms().setValue(i,"morphTargetBaseInfluence",x),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",u.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function w0(i,t,e,n,s){let r=new WeakMap;function a(c){let h=s.render.frame,d=c.geometry,u=t.get(c,d);if(r.get(u)!==h&&(t.update(u),r.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){let m=c.skeleton;r.get(m)!==h&&(m.update(),r.set(m,h))}return u}function o(){r=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:a,dispose:o}}var E0={[fc]:"LINEAR_TONE_MAPPING",[pc]:"REINHARD_TONE_MAPPING",[mc]:"CINEON_TONE_MAPPING",[pr]:"ACES_FILMIC_TONE_MAPPING",[xc]:"AGX_TONE_MAPPING",[yc]:"NEUTRAL_TONE_MAPPING",[gc]:"CUSTOM_TONE_MAPPING"};function T0(i,t,e,n,s,r){let a=new Ke(t,e,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,depthTexture:s?new Hn(t,e):void 0}),o=new Ke(t,e,{type:An,depthBuffer:!1,stencilBuffer:!1}),l=new Se;l.setAttribute("position",new ge([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new ge([0,2,0,0,2,0],2));let c=new za({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),h=new xe(l,c),d=new ur(-1,1,1,-1,0,1),u=null,m=null,x=!1,v,p=null,f=[],S=!1;this.setSize=function(T,b){a.setSize(T,b),o.setSize(T,b);for(let A=0;A<f.length;A++){let M=f[A];M.setSize&&M.setSize(T,b)}},this.setEffects=function(T){f=T,S=f.length>0&&f[0].isRenderPass===!0;let b=a.width,A=a.height;for(let M=0;M<f.length;M++){let C=f[M];C.setSize&&C.setSize(b,A)}},this.begin=function(T,b){if(x||T.toneMapping===dn&&f.length===0)return!1;if(p=b,b!==null){let A=b.width,M=b.height;(a.width!==A||a.height!==M)&&this.setSize(A,M)}return S===!1&&T.setRenderTarget(a),v=T.toneMapping,T.toneMapping=dn,!0},this.hasRenderPass=function(){return S},this.end=function(T,b){T.toneMapping=v,x=!0;let A=a,M=o;for(let C=0;C<f.length;C++){let y=f[C];if(y.enabled!==!1&&(y.render(T,M,A,b),y.needsSwap!==!1)){let E=A;A=M,M=E}}if(u!==T.outputColorSpace||m!==T.toneMapping){u=T.outputColorSpace,m=T.toneMapping,c.defines={},Wt.getTransfer(u)===Kt&&(c.defines.SRGB_TRANSFER="");let C=E0[m];C&&(c.defines[C]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=A.texture,T.setRenderTarget(p),T.render(h,d),p=null,x=!1},this.isCompositing=function(){return x},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),o.dispose(),l.dispose(),c.dispose()}}var cd=new Ge,Gc=new Hn(1,1),hd=new js,ud=new Da,dd=new nr,Wu=[],Xu=[],$u=new Float32Array(16),qu=new Float32Array(9),Yu=new Float32Array(4);function bs(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=Wu[s];if(r===void 0&&(r=new Float32Array(s),Wu[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function Ae(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Ce(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Ko(i,t){let e=Xu[t];e===void 0&&(e=new Int32Array(t),Xu[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function A0(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function C0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ae(e,t))return;i.uniform2fv(this.addr,t),Ce(e,t)}}function R0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ae(e,t))return;i.uniform3fv(this.addr,t),Ce(e,t)}}function P0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ae(e,t))return;i.uniform4fv(this.addr,t),Ce(e,t)}}function I0(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ae(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Ce(e,t)}else{if(Ae(e,n))return;Yu.set(n),i.uniformMatrix2fv(this.addr,!1,Yu),Ce(e,n)}}function L0(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ae(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Ce(e,t)}else{if(Ae(e,n))return;qu.set(n),i.uniformMatrix3fv(this.addr,!1,qu),Ce(e,n)}}function D0(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ae(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Ce(e,t)}else{if(Ae(e,n))return;$u.set(n),i.uniformMatrix4fv(this.addr,!1,$u),Ce(e,n)}}function N0(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function U0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ae(e,t))return;i.uniform2iv(this.addr,t),Ce(e,t)}}function F0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ae(e,t))return;i.uniform3iv(this.addr,t),Ce(e,t)}}function O0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ae(e,t))return;i.uniform4iv(this.addr,t),Ce(e,t)}}function B0(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function k0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ae(e,t))return;i.uniform2uiv(this.addr,t),Ce(e,t)}}function z0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ae(e,t))return;i.uniform3uiv(this.addr,t),Ce(e,t)}}function H0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ae(e,t))return;i.uniform4uiv(this.addr,t),Ce(e,t)}}function V0(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Gc.compareFunction=e.isReversedDepthBuffer()?Xo:Wo,r=Gc):r=cd,e.setTexture2D(t||r,s)}function G0(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||ud,s)}function W0(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||dd,s)}function X0(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||hd,s)}function $0(i){switch(i){case 5126:return A0;case 35664:return C0;case 35665:return R0;case 35666:return P0;case 35674:return I0;case 35675:return L0;case 35676:return D0;case 5124:case 35670:return N0;case 35667:case 35671:return U0;case 35668:case 35672:return F0;case 35669:case 35673:return O0;case 5125:return B0;case 36294:return k0;case 36295:return z0;case 36296:return H0;case 35678:case 36198:case 36298:case 36306:case 35682:return V0;case 35679:case 36299:case 36307:return G0;case 35680:case 36300:case 36308:case 36293:return W0;case 36289:case 36303:case 36311:case 36292:return X0}}function q0(i,t){i.uniform1fv(this.addr,t)}function Y0(i,t){let e=bs(t,this.size,2);i.uniform2fv(this.addr,e)}function j0(i,t){let e=bs(t,this.size,3);i.uniform3fv(this.addr,e)}function Z0(i,t){let e=bs(t,this.size,4);i.uniform4fv(this.addr,e)}function J0(i,t){let e=bs(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function K0(i,t){let e=bs(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Q0(i,t){let e=bs(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function tx(i,t){i.uniform1iv(this.addr,t)}function ex(i,t){i.uniform2iv(this.addr,t)}function nx(i,t){i.uniform3iv(this.addr,t)}function ix(i,t){i.uniform4iv(this.addr,t)}function sx(i,t){i.uniform1uiv(this.addr,t)}function rx(i,t){i.uniform2uiv(this.addr,t)}function ax(i,t){i.uniform3uiv(this.addr,t)}function ox(i,t){i.uniform4uiv(this.addr,t)}function lx(i,t,e){let n=this.cache,s=t.length,r=Ko(e,s);Ae(n,r)||(i.uniform1iv(this.addr,r),Ce(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=Gc:a=cd;for(let o=0;o!==s;++o)e.setTexture2D(t[o]||a,r[o])}function cx(i,t,e){let n=this.cache,s=t.length,r=Ko(e,s);Ae(n,r)||(i.uniform1iv(this.addr,r),Ce(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||ud,r[a])}function hx(i,t,e){let n=this.cache,s=t.length,r=Ko(e,s);Ae(n,r)||(i.uniform1iv(this.addr,r),Ce(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||dd,r[a])}function ux(i,t,e){let n=this.cache,s=t.length,r=Ko(e,s);Ae(n,r)||(i.uniform1iv(this.addr,r),Ce(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||hd,r[a])}function dx(i){switch(i){case 5126:return q0;case 35664:return Y0;case 35665:return j0;case 35666:return Z0;case 35674:return J0;case 35675:return K0;case 35676:return Q0;case 5124:case 35670:return tx;case 35667:case 35671:return ex;case 35668:case 35672:return nx;case 35669:case 35673:return ix;case 5125:return sx;case 36294:return rx;case 36295:return ax;case 36296:return ox;case 35678:case 36198:case 36298:case 36306:case 35682:return lx;case 35679:case 36299:case 36307:return cx;case 35680:case 36300:case 36308:case 36293:return hx;case 36289:case 36303:case 36311:case 36292:return ux}}var Wc=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=$0(e.type)}},Xc=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=dx(e.type)}},$c=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(t,e[o.id],n)}}},Hc=/(\w+)(\])?(\[|\.)?/g;function ju(i,t){i.seq.push(t),i.map[t.id]=t}function fx(i,t,e){let n=i.name,s=n.length;for(Hc.lastIndex=0;;){let r=Hc.exec(n),a=Hc.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){ju(e,c===void 0?new Wc(o,i,t):new Xc(o,i,t));break}else{let d=e.map[o];d===void 0&&(d=new $c(o),ju(e,d)),e=d}}}var vs=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=t.getActiveUniform(e,a),l=t.getUniformLocation(e,o.name);fx(o,l,this)}let s=[],r=[];for(let a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){let o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let a=t[s];a.id in e&&n.push(a)}return n}};function Zu(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var px=37297,mx=0;function gx(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}var Ju=new Ut;function xx(i){Wt._getMatrix(Ju,Wt.workingColorSpace,i);let t=`mat3( ${Ju.elements.map(e=>e.toFixed(4))} )`;switch(Wt.getTransfer(i)){case $s:return[t,"LinearTransferOETF"];case Kt:return[t,"sRGBTransferOETF"];default:return Rt("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Ku(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+gx(i.getShaderSource(t),o)}else return r}function yx(i,t){let e=xx(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}var _x={[fc]:"Linear",[pc]:"Reinhard",[mc]:"Cineon",[pr]:"ACESFilmic",[xc]:"AgX",[yc]:"Neutral",[gc]:"Custom"};function vx(i,t){let e=_x[t];return e===void 0?(Rt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var qo=new L;function bx(){Wt.getLuminanceCoefficients(qo);let i=qo.x.toFixed(4),t=qo.y.toFixed(4),e=qo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Sx(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Er).join(`
`)}function Mx(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function wx(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function Er(i){return i!==""}function Qu(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function td(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Ex=/^[ \t]*#include +<([\w\d./]+)>/gm;function qc(i){return i.replace(Ex,Ax)}var Tx=new Map;function Ax(i,t){let e=Bt[t];if(e===void 0){let n=Tx.get(t);if(n!==void 0)e=Bt[n],Rt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return qc(e)}var Cx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ed(i){return i.replace(Cx,Rx)}function Rx(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function nd(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}var Px={[fr]:"SHADOWMAP_TYPE_PCF",[gs]:"SHADOWMAP_TYPE_VSM"};function Ix(i){return Px[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var Lx={[hi]:"ENVMAP_TYPE_CUBE",[Li]:"ENVMAP_TYPE_CUBE",[mr]:"ENVMAP_TYPE_CUBE_UV"};function Dx(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":Lx[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var Nx={[Li]:"ENVMAP_MODE_REFRACTION"};function Ux(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Nx[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var Fx={[dc]:"ENVMAP_BLENDING_MULTIPLY",[vu]:"ENVMAP_BLENDING_MIX",[bu]:"ENVMAP_BLENDING_ADD"};function Ox(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Fx[i.combine]||"ENVMAP_BLENDING_NONE"}function Bx(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function kx(i,t,e,n){let s=i.getContext(),r=e.defines,a=e.vertexShader,o=e.fragmentShader,l=Ix(e),c=Dx(e),h=Ux(e),d=Ox(e),u=Bx(e),m=Sx(e),x=Mx(r),v=s.createProgram(),p,f,S=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x].filter(Er).join(`
`),p.length>0&&(p+=`
`),f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x].filter(Er).join(`
`),f.length>0&&(f+=`
`)):(p=[nd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Er).join(`
`),f=[nd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==dn?"#define TONE_MAPPING":"",e.toneMapping!==dn?Bt.tonemapping_pars_fragment:"",e.toneMapping!==dn?vx("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Bt.colorspace_pars_fragment,yx("linearToOutputTexel",e.outputColorSpace),bx(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Er).join(`
`)),a=qc(a),a=Qu(a,e),a=td(a,e),o=qc(o),o=Qu(o,e),o=td(o,e),a=ed(a),o=ed(o),e.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,p=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,f=["#define varying in",e.glslVersion===Ac?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Ac?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);let T=S+p+a,b=S+f+o,A=Zu(s,s.VERTEX_SHADER,T),M=Zu(s,s.FRAGMENT_SHADER,b);s.attachShader(v,A),s.attachShader(v,M),e.index0AttributeName!==void 0?s.bindAttribLocation(v,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function C(P){if(i.debug.checkShaderErrors){let F=s.getProgramInfoLog(v)||"",q=s.getShaderInfoLog(A)||"",Y=s.getShaderInfoLog(M)||"",k=F.trim(),G=q.trim(),V=Y.trim(),K=!0,et=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(K=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,A,M);else{let ct=Ku(s,A,"vertex"),dt=Ku(s,M,"fragment");Pt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+k+`
`+ct+`
`+dt)}else k!==""?Rt("WebGLProgram: Program Info Log:",k):(G===""||V==="")&&(et=!1);et&&(P.diagnostics={runnable:K,programLog:k,vertexShader:{log:G,prefix:p},fragmentShader:{log:V,prefix:f}})}s.deleteShader(A),s.deleteShader(M),y=new vs(s,v),E=wx(s,v)}let y;this.getUniforms=function(){return y===void 0&&C(this),y};let E;this.getAttributes=function(){return E===void 0&&C(this),E};let R=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return R===!1&&(R=s.getProgramParameter(v,px)),R},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=mx++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=A,this.fragmentShader=M,this}var zx=0,Yc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){let s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new jc(t),e.set(t,n)),n}},jc=class{constructor(t){this.id=zx++,this.code=t,this.usedTimes=0}};function Hx(i){return i===fi||i===br||i===Sr}function Vx(i,t,e,n,s,r){let a=new Zs,o=new Yc,l=new Set,c=[],h=new Map,d=n.logarithmicDepthBuffer,u=n.precision,m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(y){return l.add(y),y===0?"uv":`uv${y}`}function v(y,E,R,P,F,q){let Y=P.fog,k=F.geometry,G=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?P.environment:null,V=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,K=t.get(y.envMap||G,V),et=K&&K.mapping===mr?K.image.height:null,ct=m[y.type];y.precision!==null&&(u=n.getMaxPrecision(y.precision),u!==y.precision&&Rt("WebGLProgram.getParameters:",y.precision,"not supported, using",u,"instead."));let dt=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,mt=dt!==void 0?dt.length:0,zt=0;k.morphAttributes.position!==void 0&&(zt=1),k.morphAttributes.normal!==void 0&&(zt=2),k.morphAttributes.color!==void 0&&(zt=3);let Lt,qt,Z,ot;if(ct){let bt=Rn[ct];Lt=bt.vertexShader,qt=bt.fragmentShader}else{Lt=y.vertexShader,qt=y.fragmentShader;let bt=o.getVertexShaderStage(y),pe=o.getFragmentShaderStage(y);o.update(y,bt,pe),Z=bt.id,ot=pe.id}let nt=i.getRenderTarget(),$=i.state.buffers.depth.getReversed(),xt=F.isInstancedMesh===!0,_t=F.isBatchedMesh===!0,$t=!!y.map,Ft=!!y.matcap,Ht=!!K,Vt=!!y.aoMap,Gt=!!y.lightMap,le=!!y.bumpMap&&y.wireframe===!1,Qt=!!y.normalMap,_e=!!y.displacementMap,we=!!y.emissiveMap,Zt=!!y.metalnessMap,fe=!!y.roughnessMap,D=y.anisotropy>0,he=y.clearcoat>0,Jt=y.dispersion>0,w=y.iridescence>0,g=y.sheen>0,U=y.transmission>0,z=D&&!!y.anisotropyMap,W=he&&!!y.clearcoatMap,it=he&&!!y.clearcoatNormalMap,at=he&&!!y.clearcoatRoughnessMap,X=w&&!!y.iridescenceMap,J=w&&!!y.iridescenceThicknessMap,lt=g&&!!y.sheenColorMap,Mt=g&&!!y.sheenRoughnessMap,Q=!!y.specularMap,st=!!y.specularColorMap,Tt=!!y.specularIntensityMap,Ct=U&&!!y.transmissionMap,Nt=U&&!!y.thicknessMap,I=!!y.gradientMap,rt=!!y.alphaMap,j=y.alphaTest>0,ht=!!y.alphaHash,gt=!!y.extensions,tt=dn;y.toneMapped&&(nt===null||nt.isXRRenderTarget===!0)&&(tt=i.toneMapping);let wt={shaderID:ct,shaderType:y.type,shaderName:y.name,vertexShader:Lt,fragmentShader:qt,defines:y.defines,customVertexShaderID:Z,customFragmentShaderID:ot,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:u,batching:_t,batchingColor:_t&&F._colorsTexture!==null,instancing:xt,instancingColor:xt&&F.instanceColor!==null,instancingMorph:xt&&F.morphTexture!==null,outputColorSpace:nt===null?i.outputColorSpace:nt.isXRRenderTarget===!0?nt.texture.colorSpace:Wt.workingColorSpace,alphaToCoverage:!!y.alphaToCoverage,map:$t,matcap:Ft,envMap:Ht,envMapMode:Ht&&K.mapping,envMapCubeUVHeight:et,aoMap:Vt,lightMap:Gt,bumpMap:le,normalMap:Qt,displacementMap:_e,emissiveMap:we,normalMapObjectSpace:Qt&&y.normalMapType===wu,normalMapTangentSpace:Qt&&y.normalMapType===Go,packedNormalMap:Qt&&y.normalMapType===Go&&Hx(y.normalMap.format),metalnessMap:Zt,roughnessMap:fe,anisotropy:D,anisotropyMap:z,clearcoat:he,clearcoatMap:W,clearcoatNormalMap:it,clearcoatRoughnessMap:at,dispersion:Jt,iridescence:w,iridescenceMap:X,iridescenceThicknessMap:J,sheen:g,sheenColorMap:lt,sheenRoughnessMap:Mt,specularMap:Q,specularColorMap:st,specularIntensityMap:Tt,transmission:U,transmissionMap:Ct,thicknessMap:Nt,gradientMap:I,opaque:y.transparent===!1&&y.blending===Ti&&y.alphaToCoverage===!1,alphaMap:rt,alphaTest:j,alphaHash:ht,combine:y.combine,mapUv:$t&&x(y.map.channel),aoMapUv:Vt&&x(y.aoMap.channel),lightMapUv:Gt&&x(y.lightMap.channel),bumpMapUv:le&&x(y.bumpMap.channel),normalMapUv:Qt&&x(y.normalMap.channel),displacementMapUv:_e&&x(y.displacementMap.channel),emissiveMapUv:we&&x(y.emissiveMap.channel),metalnessMapUv:Zt&&x(y.metalnessMap.channel),roughnessMapUv:fe&&x(y.roughnessMap.channel),anisotropyMapUv:z&&x(y.anisotropyMap.channel),clearcoatMapUv:W&&x(y.clearcoatMap.channel),clearcoatNormalMapUv:it&&x(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:at&&x(y.clearcoatRoughnessMap.channel),iridescenceMapUv:X&&x(y.iridescenceMap.channel),iridescenceThicknessMapUv:J&&x(y.iridescenceThicknessMap.channel),sheenColorMapUv:lt&&x(y.sheenColorMap.channel),sheenRoughnessMapUv:Mt&&x(y.sheenRoughnessMap.channel),specularMapUv:Q&&x(y.specularMap.channel),specularColorMapUv:st&&x(y.specularColorMap.channel),specularIntensityMapUv:Tt&&x(y.specularIntensityMap.channel),transmissionMapUv:Ct&&x(y.transmissionMap.channel),thicknessMapUv:Nt&&x(y.thicknessMap.channel),alphaMapUv:rt&&x(y.alphaMap.channel),vertexTangents:!!k.attributes.tangent&&(Qt||D),vertexNormals:!!k.attributes.normal,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!k.attributes.uv&&($t||rt),fog:!!Y,useFog:y.fog===!0,fogExp2:!!Y&&Y.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||k.attributes.normal===void 0&&Qt===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:$,skinning:F.isSkinnedMesh===!0,hasPositionAttribute:k.attributes.position!==void 0,morphTargets:k.morphAttributes.position!==void 0,morphNormals:k.morphAttributes.normal!==void 0,morphColors:k.morphAttributes.color!==void 0,morphTargetsCount:mt,morphTextureStride:zt,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numLightProbeGrids:q.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:y.dithering,shadowMapEnabled:i.shadowMap.enabled&&R.length>0,shadowMapType:i.shadowMap.type,toneMapping:tt,decodeVideoTexture:$t&&y.map.isVideoTexture===!0&&Wt.getTransfer(y.map.colorSpace)===Kt,decodeVideoTextureEmissive:we&&y.emissiveMap.isVideoTexture===!0&&Wt.getTransfer(y.emissiveMap.colorSpace)===Kt,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===nn,flipSided:y.side===Ne,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:gt&&y.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(gt&&y.extensions.multiDraw===!0||_t)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return wt.vertexUv1s=l.has(1),wt.vertexUv2s=l.has(2),wt.vertexUv3s=l.has(3),l.clear(),wt}function p(y){let E=[];if(y.shaderID?E.push(y.shaderID):(E.push(y.customVertexShaderID),E.push(y.customFragmentShaderID)),y.defines!==void 0)for(let R in y.defines)E.push(R),E.push(y.defines[R]);return y.isRawShaderMaterial===!1&&(f(E,y),S(E,y),E.push(i.outputColorSpace)),E.push(y.customProgramCacheKey),E.join()}function f(y,E){y.push(E.precision),y.push(E.outputColorSpace),y.push(E.envMapMode),y.push(E.envMapCubeUVHeight),y.push(E.mapUv),y.push(E.alphaMapUv),y.push(E.lightMapUv),y.push(E.aoMapUv),y.push(E.bumpMapUv),y.push(E.normalMapUv),y.push(E.displacementMapUv),y.push(E.emissiveMapUv),y.push(E.metalnessMapUv),y.push(E.roughnessMapUv),y.push(E.anisotropyMapUv),y.push(E.clearcoatMapUv),y.push(E.clearcoatNormalMapUv),y.push(E.clearcoatRoughnessMapUv),y.push(E.iridescenceMapUv),y.push(E.iridescenceThicknessMapUv),y.push(E.sheenColorMapUv),y.push(E.sheenRoughnessMapUv),y.push(E.specularMapUv),y.push(E.specularColorMapUv),y.push(E.specularIntensityMapUv),y.push(E.transmissionMapUv),y.push(E.thicknessMapUv),y.push(E.combine),y.push(E.fogExp2),y.push(E.sizeAttenuation),y.push(E.morphTargetsCount),y.push(E.morphAttributeCount),y.push(E.numDirLights),y.push(E.numPointLights),y.push(E.numSpotLights),y.push(E.numSpotLightMaps),y.push(E.numHemiLights),y.push(E.numRectAreaLights),y.push(E.numDirLightShadows),y.push(E.numPointLightShadows),y.push(E.numSpotLightShadows),y.push(E.numSpotLightShadowsWithMaps),y.push(E.numLightProbes),y.push(E.shadowMapType),y.push(E.toneMapping),y.push(E.numClippingPlanes),y.push(E.numClipIntersection),y.push(E.depthPacking)}function S(y,E){a.disableAll(),E.instancing&&a.enable(0),E.instancingColor&&a.enable(1),E.instancingMorph&&a.enable(2),E.matcap&&a.enable(3),E.envMap&&a.enable(4),E.normalMapObjectSpace&&a.enable(5),E.normalMapTangentSpace&&a.enable(6),E.clearcoat&&a.enable(7),E.iridescence&&a.enable(8),E.alphaTest&&a.enable(9),E.vertexColors&&a.enable(10),E.vertexAlphas&&a.enable(11),E.vertexUv1s&&a.enable(12),E.vertexUv2s&&a.enable(13),E.vertexUv3s&&a.enable(14),E.vertexTangents&&a.enable(15),E.anisotropy&&a.enable(16),E.alphaHash&&a.enable(17),E.batching&&a.enable(18),E.dispersion&&a.enable(19),E.batchingColor&&a.enable(20),E.gradientMap&&a.enable(21),E.packedNormalMap&&a.enable(22),E.vertexNormals&&a.enable(23),y.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.reversedDepthBuffer&&a.enable(4),E.skinning&&a.enable(5),E.morphTargets&&a.enable(6),E.morphNormals&&a.enable(7),E.morphColors&&a.enable(8),E.premultipliedAlpha&&a.enable(9),E.shadowMapEnabled&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),E.decodeVideoTextureEmissive&&a.enable(20),E.alphaToCoverage&&a.enable(21),E.numLightProbeGrids>0&&a.enable(22),E.hasPositionAttribute&&a.enable(23),y.push(a.mask)}function T(y){let E=m[y.type],R;if(E){let P=Rn[E];R=Ou.clone(P.uniforms)}else R=y.uniforms;return R}function b(y,E){let R=h.get(E);return R!==void 0?++R.usedTimes:(R=new kx(i,E,y,s),c.push(R),h.set(E,R)),R}function A(y){if(--y.usedTimes===0){let E=c.indexOf(y);c[E]=c[c.length-1],c.pop(),h.delete(y.cacheKey),y.destroy()}}function M(y){o.remove(y)}function C(){o.dispose()}return{getParameters:v,getProgramCacheKey:p,getUniforms:T,acquireProgram:b,releaseProgram:A,releaseShaderCache:M,programs:c,dispose:C}}function Gx(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function Wx(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function id(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function sd(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(u){let m=0;return u.isInstancedMesh&&(m+=2),u.isSkinnedMesh&&(m+=1),m}function o(u,m,x,v,p,f){let S=i[t];return S===void 0?(S={id:u.id,object:u,geometry:m,material:x,materialVariant:a(u),groupOrder:v,renderOrder:u.renderOrder,z:p,group:f},i[t]=S):(S.id=u.id,S.object=u,S.geometry=m,S.material=x,S.materialVariant=a(u),S.groupOrder=v,S.renderOrder=u.renderOrder,S.z=p,S.group=f),t++,S}function l(u,m,x,v,p,f){let S=o(u,m,x,v,p,f);x.transmission>0?n.push(S):x.transparent===!0?s.push(S):e.push(S)}function c(u,m,x,v,p,f){let S=o(u,m,x,v,p,f);x.transmission>0?n.unshift(S):x.transparent===!0?s.unshift(S):e.unshift(S)}function h(u,m,x){e.length>1&&e.sort(u||Wx),n.length>1&&n.sort(m||id),s.length>1&&s.sort(m||id),x&&(e.reverse(),n.reverse(),s.reverse())}function d(){for(let u=t,m=i.length;u<m;u++){let x=i[u];if(x.id===null)break;x.id=null,x.object=null,x.geometry=null,x.material=null,x.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:d,sort:h}}function Xx(){let i=new WeakMap;function t(n,s){let r=i.get(n),a;return r===void 0?(a=new sd,i.set(n,[a])):s>=r.length?(a=new sd,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function $x(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new L,color:new It};break;case"SpotLight":e={position:new L,direction:new L,color:new It,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new L,color:new It,distance:0,decay:0};break;case"HemisphereLight":e={direction:new L,skyColor:new It,groundColor:new It};break;case"RectAreaLight":e={color:new It,position:new L,halfWidth:new L,halfHeight:new L};break}return i[t.id]=e,e}}}function qx(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Dt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Dt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Dt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var Yx=0;function jx(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function Zx(i){let t=new $x,e=qx(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new L);let s=new L,r=new oe,a=new oe;function o(c){let h=0,d=0,u=0;for(let E=0;E<9;E++)n.probe[E].set(0,0,0);let m=0,x=0,v=0,p=0,f=0,S=0,T=0,b=0,A=0,M=0,C=0;c.sort(jx);for(let E=0,R=c.length;E<R;E++){let P=c[E],F=P.color,q=P.intensity,Y=P.distance,k=null;if(P.shadow&&P.shadow.map&&(P.shadow.map.texture.format===fi?k=P.shadow.map.texture:k=P.shadow.map.depthTexture||P.shadow.map.texture),P.isAmbientLight)h+=F.r*q,d+=F.g*q,u+=F.b*q;else if(P.isLightProbe){for(let G=0;G<9;G++)n.probe[G].addScaledVector(P.sh.coefficients[G],q);C++}else if(P.isDirectionalLight){let G=t.get(P);if(G.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let V=P.shadow,K=e.get(P);K.shadowIntensity=V.intensity,K.shadowBias=V.bias,K.shadowNormalBias=V.normalBias,K.shadowRadius=V.radius,K.shadowMapSize=V.mapSize,n.directionalShadow[m]=K,n.directionalShadowMap[m]=k,n.directionalShadowMatrix[m]=P.shadow.matrix,S++}n.directional[m]=G,m++}else if(P.isSpotLight){let G=t.get(P);G.position.setFromMatrixPosition(P.matrixWorld),G.color.copy(F).multiplyScalar(q),G.distance=Y,G.coneCos=Math.cos(P.angle),G.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),G.decay=P.decay,n.spot[v]=G;let V=P.shadow;if(P.map&&(n.spotLightMap[A]=P.map,A++,V.updateMatrices(P),P.castShadow&&M++),n.spotLightMatrix[v]=V.matrix,P.castShadow){let K=e.get(P);K.shadowIntensity=V.intensity,K.shadowBias=V.bias,K.shadowNormalBias=V.normalBias,K.shadowRadius=V.radius,K.shadowMapSize=V.mapSize,n.spotShadow[v]=K,n.spotShadowMap[v]=k,b++}v++}else if(P.isRectAreaLight){let G=t.get(P);G.color.copy(F).multiplyScalar(q),G.halfWidth.set(P.width*.5,0,0),G.halfHeight.set(0,P.height*.5,0),n.rectArea[p]=G,p++}else if(P.isPointLight){let G=t.get(P);if(G.color.copy(P.color).multiplyScalar(P.intensity),G.distance=P.distance,G.decay=P.decay,P.castShadow){let V=P.shadow,K=e.get(P);K.shadowIntensity=V.intensity,K.shadowBias=V.bias,K.shadowNormalBias=V.normalBias,K.shadowRadius=V.radius,K.shadowMapSize=V.mapSize,K.shadowCameraNear=V.camera.near,K.shadowCameraFar=V.camera.far,n.pointShadow[x]=K,n.pointShadowMap[x]=k,n.pointShadowMatrix[x]=P.shadow.matrix,T++}n.point[x]=G,x++}else if(P.isHemisphereLight){let G=t.get(P);G.skyColor.copy(P.color).multiplyScalar(q),G.groundColor.copy(P.groundColor).multiplyScalar(q),n.hemi[f]=G,f++}}p>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ut.LTC_FLOAT_1,n.rectAreaLTC2=ut.LTC_FLOAT_2):(n.rectAreaLTC1=ut.LTC_HALF_1,n.rectAreaLTC2=ut.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;let y=n.hash;(y.directionalLength!==m||y.pointLength!==x||y.spotLength!==v||y.rectAreaLength!==p||y.hemiLength!==f||y.numDirectionalShadows!==S||y.numPointShadows!==T||y.numSpotShadows!==b||y.numSpotMaps!==A||y.numLightProbes!==C)&&(n.directional.length=m,n.spot.length=v,n.rectArea.length=p,n.point.length=x,n.hemi.length=f,n.directionalShadow.length=S,n.directionalShadowMap.length=S,n.pointShadow.length=T,n.pointShadowMap.length=T,n.spotShadow.length=b,n.spotShadowMap.length=b,n.directionalShadowMatrix.length=S,n.pointShadowMatrix.length=T,n.spotLightMatrix.length=b+A-M,n.spotLightMap.length=A,n.numSpotLightShadowsWithMaps=M,n.numLightProbes=C,y.directionalLength=m,y.pointLength=x,y.spotLength=v,y.rectAreaLength=p,y.hemiLength=f,y.numDirectionalShadows=S,y.numPointShadows=T,y.numSpotShadows=b,y.numSpotMaps=A,y.numLightProbes=C,n.version=Yx++)}function l(c,h){let d=0,u=0,m=0,x=0,v=0,p=h.matrixWorldInverse;for(let f=0,S=c.length;f<S;f++){let T=c[f];if(T.isDirectionalLight){let b=n.directional[d];b.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(p),d++}else if(T.isSpotLight){let b=n.spot[m];b.position.setFromMatrixPosition(T.matrixWorld),b.position.applyMatrix4(p),b.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(p),m++}else if(T.isRectAreaLight){let b=n.rectArea[x];b.position.setFromMatrixPosition(T.matrixWorld),b.position.applyMatrix4(p),a.identity(),r.copy(T.matrixWorld),r.premultiply(p),a.extractRotation(r),b.halfWidth.set(T.width*.5,0,0),b.halfHeight.set(0,T.height*.5,0),b.halfWidth.applyMatrix4(a),b.halfHeight.applyMatrix4(a),x++}else if(T.isPointLight){let b=n.point[u];b.position.setFromMatrixPosition(T.matrixWorld),b.position.applyMatrix4(p),u++}else if(T.isHemisphereLight){let b=n.hemi[v];b.direction.setFromMatrixPosition(T.matrixWorld),b.direction.transformDirection(p),v++}}}return{setup:o,setupView:l,state:n}}function rd(i){let t=new Zx(i),e=[],n=[],s=[];function r(u){d.camera=u,e.length=0,n.length=0,s.length=0}function a(u){e.push(u)}function o(u){n.push(u)}function l(u){s.push(u)}function c(){t.setup(e)}function h(u){t.setupView(e,u)}let d={lightsArray:e,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:d,setupLights:c,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function Jx(i){let t=new WeakMap;function e(s,r=0){let a=t.get(s),o;return a===void 0?(o=new rd(i),t.set(s,[o])):r>=a.length?(o=new rd(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}var Kx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Qx=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,ty=[new L(1,0,0),new L(-1,0,0),new L(0,1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1)],ey=[new L(0,-1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1),new L(0,-1,0),new L(0,-1,0)],ad=new oe,wr=new L,Vc=new L;function ny(i,t,e){let n=new ds,s=new Dt,r=new Dt,a=new ue,o=new Ha,l=new Va,c={},h=e.maxTextureSize,d={[kn]:Ne,[Ne]:kn,[nn]:nn},u=new Xe({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Dt},radius:{value:4}},vertexShader:Kx,fragmentShader:Qx}),m=u.clone();m.defines.HORIZONTAL_PASS=1;let x=new Se;x.setAttribute("position",new Te(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let v=new xe(x,u),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=fr;let f=this.type;this.render=function(M,C,y){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||M.length===0)return;this.type===eu&&(Rt("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=fr);let E=i.getRenderTarget(),R=i.getActiveCubeFace(),P=i.getActiveMipmapLevel(),F=i.state;F.setBlending(En),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);let q=f!==this.type;q&&C.traverse(function(Y){Y.material&&(Array.isArray(Y.material)?Y.material.forEach(k=>k.needsUpdate=!0):Y.material.needsUpdate=!0)});for(let Y=0,k=M.length;Y<k;Y++){let G=M[Y],V=G.shadow;if(V===void 0){Rt("WebGLShadowMap:",G,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;s.copy(V.mapSize);let K=V.getFrameExtents();s.multiply(K),r.copy(V.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/K.x),s.x=r.x*K.x,V.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/K.y),s.y=r.y*K.y,V.mapSize.y=r.y));let et=i.state.buffers.depth.getReversed();if(V.camera._reversedDepth=et,V.map===null||q===!0){if(V.map!==null&&(V.map.depthTexture!==null&&(V.map.depthTexture.dispose(),V.map.depthTexture=null),V.map.dispose()),this.type===gs){if(G.isPointLight){Rt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}V.map=new Ke(s.x,s.y,{format:fi,type:An,minFilter:Le,magFilter:Le,generateMipmaps:!1}),V.map.texture.name=G.name+".shadowMap",V.map.depthTexture=new Hn(s.x,s.y,pn),V.map.depthTexture.name=G.name+".shadowMapDepth",V.map.depthTexture.format=Sn,V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=Pe,V.map.depthTexture.magFilter=Pe}else G.isPointLight?(V.map=new jo(s.x),V.map.depthTexture=new Ba(s.x,fn)):(V.map=new Ke(s.x,s.y),V.map.depthTexture=new Hn(s.x,s.y,fn)),V.map.depthTexture.name=G.name+".shadowMap",V.map.depthTexture.format=Sn,this.type===fr?(V.map.depthTexture.compareFunction=et?Xo:Wo,V.map.depthTexture.minFilter=Le,V.map.depthTexture.magFilter=Le):(V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=Pe,V.map.depthTexture.magFilter=Pe);V.camera.updateProjectionMatrix()}let ct=V.map.isWebGLCubeRenderTarget?6:1;for(let dt=0;dt<ct;dt++){if(V.map.isWebGLCubeRenderTarget)i.setRenderTarget(V.map,dt),i.clear();else{dt===0&&(i.setRenderTarget(V.map),i.clear());let mt=V.getViewport(dt);a.set(r.x*mt.x,r.y*mt.y,r.x*mt.z,r.y*mt.w),F.viewport(a)}if(G.isPointLight){let mt=V.camera,zt=V.matrix,Lt=G.distance||mt.far;Lt!==mt.far&&(mt.far=Lt,mt.updateProjectionMatrix()),wr.setFromMatrixPosition(G.matrixWorld),mt.position.copy(wr),Vc.copy(mt.position),Vc.add(ty[dt]),mt.up.copy(ey[dt]),mt.lookAt(Vc),mt.updateMatrixWorld(),zt.makeTranslation(-wr.x,-wr.y,-wr.z),ad.multiplyMatrices(mt.projectionMatrix,mt.matrixWorldInverse),V._frustum.setFromProjectionMatrix(ad,mt.coordinateSystem,mt.reversedDepth)}else V.updateMatrices(G);n=V.getFrustum(),b(C,y,V.camera,G,this.type)}V.isPointLightShadow!==!0&&this.type===gs&&S(V,y),V.needsUpdate=!1}f=this.type,p.needsUpdate=!1,i.setRenderTarget(E,R,P)};function S(M,C){let y=t.update(v);u.defines.VSM_SAMPLES!==M.blurSamples&&(u.defines.VSM_SAMPLES=M.blurSamples,m.defines.VSM_SAMPLES=M.blurSamples,u.needsUpdate=!0,m.needsUpdate=!0),M.mapPass===null&&(M.mapPass=new Ke(s.x,s.y,{format:fi,type:An})),u.uniforms.shadow_pass.value=M.map.depthTexture,u.uniforms.resolution.value=M.mapSize,u.uniforms.radius.value=M.radius,i.setRenderTarget(M.mapPass),i.clear(),i.renderBufferDirect(C,null,y,u,v,null),m.uniforms.shadow_pass.value=M.mapPass.texture,m.uniforms.resolution.value=M.mapSize,m.uniforms.radius.value=M.radius,i.setRenderTarget(M.map),i.clear(),i.renderBufferDirect(C,null,y,m,v,null)}function T(M,C,y,E){let R=null,P=y.isPointLight===!0?M.customDistanceMaterial:M.customDepthMaterial;if(P!==void 0)R=P;else if(R=y.isPointLight===!0?l:o,i.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){let F=R.uuid,q=C.uuid,Y=c[F];Y===void 0&&(Y={},c[F]=Y);let k=Y[q];k===void 0&&(k=R.clone(),Y[q]=k,C.addEventListener("dispose",A)),R=k}if(R.visible=C.visible,R.wireframe=C.wireframe,E===gs?R.side=C.shadowSide!==null?C.shadowSide:C.side:R.side=C.shadowSide!==null?C.shadowSide:d[C.side],R.alphaMap=C.alphaMap,R.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,R.map=C.map,R.clipShadows=C.clipShadows,R.clippingPlanes=C.clippingPlanes,R.clipIntersection=C.clipIntersection,R.displacementMap=C.displacementMap,R.displacementScale=C.displacementScale,R.displacementBias=C.displacementBias,R.wireframeLinewidth=C.wireframeLinewidth,R.linewidth=C.linewidth,y.isPointLight===!0&&R.isMeshDistanceMaterial===!0){let F=i.properties.get(R);F.light=y}return R}function b(M,C,y,E,R){if(M.visible===!1)return;if(M.layers.test(C.layers)&&(M.isMesh||M.isLine||M.isPoints)&&(M.castShadow||M.receiveShadow&&R===gs)&&(!M.frustumCulled||n.intersectsObject(M))){M.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,M.matrixWorld);let q=t.update(M),Y=M.material;if(Array.isArray(Y)){let k=q.groups;for(let G=0,V=k.length;G<V;G++){let K=k[G],et=Y[K.materialIndex];if(et&&et.visible){let ct=T(M,et,E,R);M.onBeforeShadow(i,M,C,y,q,ct,K),i.renderBufferDirect(y,null,q,ct,M,K),M.onAfterShadow(i,M,C,y,q,ct,K)}}}else if(Y.visible){let k=T(M,Y,E,R);M.onBeforeShadow(i,M,C,y,q,k,null),i.renderBufferDirect(y,null,q,k,M,null),M.onAfterShadow(i,M,C,y,q,k,null)}}let F=M.children;for(let q=0,Y=F.length;q<Y;q++)b(F[q],C,y,E,R)}function A(M){M.target.removeEventListener("dispose",A);for(let y in c){let E=c[y],R=M.target.uuid;R in E&&(E[R].dispose(),delete E[R])}}}function iy(i,t){function e(){let I=!1,rt=new ue,j=null,ht=new ue(0,0,0,0);return{setMask:function(gt){j!==gt&&!I&&(i.colorMask(gt,gt,gt,gt),j=gt)},setLocked:function(gt){I=gt},setClear:function(gt,tt,wt,bt,pe){pe===!0&&(gt*=bt,tt*=bt,wt*=bt),rt.set(gt,tt,wt,bt),ht.equals(rt)===!1&&(i.clearColor(gt,tt,wt,bt),ht.copy(rt))},reset:function(){I=!1,j=null,ht.set(-1,0,0,0)}}}function n(){let I=!1,rt=!1,j=null,ht=null,gt=null;return{setReversed:function(tt){if(rt!==tt){let wt=t.get("EXT_clip_control");tt?wt.clipControlEXT(wt.LOWER_LEFT_EXT,wt.ZERO_TO_ONE_EXT):wt.clipControlEXT(wt.LOWER_LEFT_EXT,wt.NEGATIVE_ONE_TO_ONE_EXT),rt=tt;let bt=gt;gt=null,this.setClear(bt)}},getReversed:function(){return rt},setTest:function(tt){tt?nt(i.DEPTH_TEST):$(i.DEPTH_TEST)},setMask:function(tt){j!==tt&&!I&&(i.depthMask(tt),j=tt)},setFunc:function(tt){if(rt&&(tt=Nu[tt]),ht!==tt){switch(tt){case va:i.depthFunc(i.NEVER);break;case ba:i.depthFunc(i.ALWAYS);break;case Sa:i.depthFunc(i.LESS);break;case Ai:i.depthFunc(i.LEQUAL);break;case Ma:i.depthFunc(i.EQUAL);break;case wa:i.depthFunc(i.GEQUAL);break;case Ea:i.depthFunc(i.GREATER);break;case Ta:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ht=tt}},setLocked:function(tt){I=tt},setClear:function(tt){gt!==tt&&(gt=tt,rt&&(tt=1-tt),i.clearDepth(tt))},reset:function(){I=!1,j=null,ht=null,gt=null,rt=!1}}}function s(){let I=!1,rt=null,j=null,ht=null,gt=null,tt=null,wt=null,bt=null,pe=null;return{setTest:function(re){I||(re?nt(i.STENCIL_TEST):$(i.STENCIL_TEST))},setMask:function(re){rt!==re&&!I&&(i.stencilMask(re),rt=re)},setFunc:function(re,mn,gn){(j!==re||ht!==mn||gt!==gn)&&(i.stencilFunc(re,mn,gn),j=re,ht=mn,gt=gn)},setOp:function(re,mn,gn){(tt!==re||wt!==mn||bt!==gn)&&(i.stencilOp(re,mn,gn),tt=re,wt=mn,bt=gn)},setLocked:function(re){I=re},setClear:function(re){pe!==re&&(i.clearStencil(re),pe=re)},reset:function(){I=!1,rt=null,j=null,ht=null,gt=null,tt=null,wt=null,bt=null,pe=null}}}let r=new e,a=new n,o=new s,l=new WeakMap,c=new WeakMap,h={},d={},u={},m=new WeakMap,x=[],v=null,p=!1,f=null,S=null,T=null,b=null,A=null,M=null,C=null,y=new It(0,0,0),E=0,R=!1,P=null,F=null,q=null,Y=null,k=null,G=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),V=!1,K=0,et=i.getParameter(i.VERSION);et.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(et)[1]),V=K>=1):et.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(et)[1]),V=K>=2);let ct=null,dt={},mt=i.getParameter(i.SCISSOR_BOX),zt=i.getParameter(i.VIEWPORT),Lt=new ue().fromArray(mt),qt=new ue().fromArray(zt);function Z(I,rt,j,ht){let gt=new Uint8Array(4),tt=i.createTexture();i.bindTexture(I,tt),i.texParameteri(I,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(I,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let wt=0;wt<j;wt++)I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY?i.texImage3D(rt,0,i.RGBA,1,1,ht,0,i.RGBA,i.UNSIGNED_BYTE,gt):i.texImage2D(rt+wt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,gt);return tt}let ot={};ot[i.TEXTURE_2D]=Z(i.TEXTURE_2D,i.TEXTURE_2D,1),ot[i.TEXTURE_CUBE_MAP]=Z(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ot[i.TEXTURE_2D_ARRAY]=Z(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ot[i.TEXTURE_3D]=Z(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),nt(i.DEPTH_TEST),a.setFunc(Ai),le(!1),Qt(cc),nt(i.CULL_FACE),Vt(En);function nt(I){h[I]!==!0&&(i.enable(I),h[I]=!0)}function $(I){h[I]!==!1&&(i.disable(I),h[I]=!1)}function xt(I,rt){return u[I]!==rt?(i.bindFramebuffer(I,rt),u[I]=rt,I===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=rt),I===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=rt),!0):!1}function _t(I,rt){let j=x,ht=!1;if(I){j=m.get(rt),j===void 0&&(j=[],m.set(rt,j));let gt=I.textures;if(j.length!==gt.length||j[0]!==i.COLOR_ATTACHMENT0){for(let tt=0,wt=gt.length;tt<wt;tt++)j[tt]=i.COLOR_ATTACHMENT0+tt;j.length=gt.length,ht=!0}}else j[0]!==i.BACK&&(j[0]=i.BACK,ht=!0);ht&&i.drawBuffers(j)}function $t(I){return v!==I?(i.useProgram(I),v=I,!0):!1}let Ft={[ni]:i.FUNC_ADD,[iu]:i.FUNC_SUBTRACT,[su]:i.FUNC_REVERSE_SUBTRACT};Ft[ru]=i.MIN,Ft[au]=i.MAX;let Ht={[ou]:i.ZERO,[lu]:i.ONE,[cu]:i.SRC_COLOR,[ya]:i.SRC_ALPHA,[mu]:i.SRC_ALPHA_SATURATE,[fu]:i.DST_COLOR,[uu]:i.DST_ALPHA,[hu]:i.ONE_MINUS_SRC_COLOR,[_a]:i.ONE_MINUS_SRC_ALPHA,[pu]:i.ONE_MINUS_DST_COLOR,[du]:i.ONE_MINUS_DST_ALPHA,[gu]:i.CONSTANT_COLOR,[xu]:i.ONE_MINUS_CONSTANT_COLOR,[yu]:i.CONSTANT_ALPHA,[_u]:i.ONE_MINUS_CONSTANT_ALPHA};function Vt(I,rt,j,ht,gt,tt,wt,bt,pe,re){if(I===En){p===!0&&($(i.BLEND),p=!1);return}if(p===!1&&(nt(i.BLEND),p=!0),I!==nu){if(I!==f||re!==R){if((S!==ni||A!==ni)&&(i.blendEquation(i.FUNC_ADD),S=ni,A=ni),re)switch(I){case Ti:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Tn:i.blendFunc(i.ONE,i.ONE);break;case hc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case uc:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Pt("WebGLState: Invalid blending: ",I);break}else switch(I){case Ti:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Tn:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case hc:Pt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case uc:Pt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Pt("WebGLState: Invalid blending: ",I);break}T=null,b=null,M=null,C=null,y.set(0,0,0),E=0,f=I,R=re}return}gt=gt||rt,tt=tt||j,wt=wt||ht,(rt!==S||gt!==A)&&(i.blendEquationSeparate(Ft[rt],Ft[gt]),S=rt,A=gt),(j!==T||ht!==b||tt!==M||wt!==C)&&(i.blendFuncSeparate(Ht[j],Ht[ht],Ht[tt],Ht[wt]),T=j,b=ht,M=tt,C=wt),(bt.equals(y)===!1||pe!==E)&&(i.blendColor(bt.r,bt.g,bt.b,pe),y.copy(bt),E=pe),f=I,R=!1}function Gt(I,rt){I.side===nn?$(i.CULL_FACE):nt(i.CULL_FACE);let j=I.side===Ne;rt&&(j=!j),le(j),I.blending===Ti&&I.transparent===!1?Vt(En):Vt(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),a.setFunc(I.depthFunc),a.setTest(I.depthTest),a.setMask(I.depthWrite),r.setMask(I.colorWrite);let ht=I.stencilWrite;o.setTest(ht),ht&&(o.setMask(I.stencilWriteMask),o.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),o.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),we(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?nt(i.SAMPLE_ALPHA_TO_COVERAGE):$(i.SAMPLE_ALPHA_TO_COVERAGE)}function le(I){P!==I&&(I?i.frontFace(i.CW):i.frontFace(i.CCW),P=I)}function Qt(I){I!==Qh?(nt(i.CULL_FACE),I!==F&&(I===cc?i.cullFace(i.BACK):I===tu?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):$(i.CULL_FACE),F=I}function _e(I){I!==q&&(V&&i.lineWidth(I),q=I)}function we(I,rt,j){I?(nt(i.POLYGON_OFFSET_FILL),(Y!==rt||k!==j)&&(Y=rt,k=j,a.getReversed()&&(rt=-rt),i.polygonOffset(rt,j))):$(i.POLYGON_OFFSET_FILL)}function Zt(I){I?nt(i.SCISSOR_TEST):$(i.SCISSOR_TEST)}function fe(I){I===void 0&&(I=i.TEXTURE0+G-1),ct!==I&&(i.activeTexture(I),ct=I)}function D(I,rt,j){j===void 0&&(ct===null?j=i.TEXTURE0+G-1:j=ct);let ht=dt[j];ht===void 0&&(ht={type:void 0,texture:void 0},dt[j]=ht),(ht.type!==I||ht.texture!==rt)&&(ct!==j&&(i.activeTexture(j),ct=j),i.bindTexture(I,rt||ot[I]),ht.type=I,ht.texture=rt)}function he(){let I=dt[ct];I!==void 0&&I.type!==void 0&&(i.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function Jt(){try{i.compressedTexImage2D(...arguments)}catch(I){Pt("WebGLState:",I)}}function w(){try{i.compressedTexImage3D(...arguments)}catch(I){Pt("WebGLState:",I)}}function g(){try{i.texSubImage2D(...arguments)}catch(I){Pt("WebGLState:",I)}}function U(){try{i.texSubImage3D(...arguments)}catch(I){Pt("WebGLState:",I)}}function z(){try{i.compressedTexSubImage2D(...arguments)}catch(I){Pt("WebGLState:",I)}}function W(){try{i.compressedTexSubImage3D(...arguments)}catch(I){Pt("WebGLState:",I)}}function it(){try{i.texStorage2D(...arguments)}catch(I){Pt("WebGLState:",I)}}function at(){try{i.texStorage3D(...arguments)}catch(I){Pt("WebGLState:",I)}}function X(){try{i.texImage2D(...arguments)}catch(I){Pt("WebGLState:",I)}}function J(){try{i.texImage3D(...arguments)}catch(I){Pt("WebGLState:",I)}}function lt(I){return d[I]!==void 0?d[I]:i.getParameter(I)}function Mt(I,rt){d[I]!==rt&&(i.pixelStorei(I,rt),d[I]=rt)}function Q(I){Lt.equals(I)===!1&&(i.scissor(I.x,I.y,I.z,I.w),Lt.copy(I))}function st(I){qt.equals(I)===!1&&(i.viewport(I.x,I.y,I.z,I.w),qt.copy(I))}function Tt(I,rt){let j=c.get(rt);j===void 0&&(j=new WeakMap,c.set(rt,j));let ht=j.get(I);ht===void 0&&(ht=i.getUniformBlockIndex(rt,I.name),j.set(I,ht))}function Ct(I,rt){let ht=c.get(rt).get(I);l.get(rt)!==ht&&(i.uniformBlockBinding(rt,ht,I.__bindingPointIndex),l.set(rt,ht))}function Nt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},d={},ct=null,dt={},u={},m=new WeakMap,x=[],v=null,p=!1,f=null,S=null,T=null,b=null,A=null,M=null,C=null,y=new It(0,0,0),E=0,R=!1,P=null,F=null,q=null,Y=null,k=null,Lt.set(0,0,i.canvas.width,i.canvas.height),qt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:nt,disable:$,bindFramebuffer:xt,drawBuffers:_t,useProgram:$t,setBlending:Vt,setMaterial:Gt,setFlipSided:le,setCullFace:Qt,setLineWidth:_e,setPolygonOffset:we,setScissorTest:Zt,activeTexture:fe,bindTexture:D,unbindTexture:he,compressedTexImage2D:Jt,compressedTexImage3D:w,texImage2D:X,texImage3D:J,pixelStorei:Mt,getParameter:lt,updateUBOMapping:Tt,uniformBlockBinding:Ct,texStorage2D:it,texStorage3D:at,texSubImage2D:g,texSubImage3D:U,compressedTexSubImage2D:z,compressedTexSubImage3D:W,scissor:Q,viewport:st,reset:Nt}}function sy(i,t,e,n,s,r,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Dt,h=new WeakMap,d=new Set,u,m=new WeakMap,x=!1;try{x=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(w,g){return x?new OffscreenCanvas(w,g):qs("canvas")}function p(w,g,U){let z=1,W=Jt(w);if((W.width>U||W.height>U)&&(z=U/Math.max(W.width,W.height)),z<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){let it=Math.floor(z*W.width),at=Math.floor(z*W.height);u===void 0&&(u=v(it,at));let X=g?v(it,at):u;return X.width=it,X.height=at,X.getContext("2d").drawImage(w,0,0,it,at),Rt("WebGLRenderer: Texture has been resized from ("+W.width+"x"+W.height+") to ("+it+"x"+at+")."),X}else return"data"in w&&Rt("WebGLRenderer: Image in DataTexture is too big ("+W.width+"x"+W.height+")."),w;return w}function f(w){return w.generateMipmaps}function S(w){i.generateMipmap(w)}function T(w){return w.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?i.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function b(w,g,U,z,W,it=!1){if(w!==null){if(i[w]!==void 0)return i[w];Rt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let at;z&&(at=t.get("EXT_texture_norm16"),at||Rt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let X=g;if(g===i.RED&&(U===i.FLOAT&&(X=i.R32F),U===i.HALF_FLOAT&&(X=i.R16F),U===i.UNSIGNED_BYTE&&(X=i.R8),U===i.UNSIGNED_SHORT&&at&&(X=at.R16_EXT),U===i.SHORT&&at&&(X=at.R16_SNORM_EXT)),g===i.RED_INTEGER&&(U===i.UNSIGNED_BYTE&&(X=i.R8UI),U===i.UNSIGNED_SHORT&&(X=i.R16UI),U===i.UNSIGNED_INT&&(X=i.R32UI),U===i.BYTE&&(X=i.R8I),U===i.SHORT&&(X=i.R16I),U===i.INT&&(X=i.R32I)),g===i.RG&&(U===i.FLOAT&&(X=i.RG32F),U===i.HALF_FLOAT&&(X=i.RG16F),U===i.UNSIGNED_BYTE&&(X=i.RG8),U===i.UNSIGNED_SHORT&&at&&(X=at.RG16_EXT),U===i.SHORT&&at&&(X=at.RG16_SNORM_EXT)),g===i.RG_INTEGER&&(U===i.UNSIGNED_BYTE&&(X=i.RG8UI),U===i.UNSIGNED_SHORT&&(X=i.RG16UI),U===i.UNSIGNED_INT&&(X=i.RG32UI),U===i.BYTE&&(X=i.RG8I),U===i.SHORT&&(X=i.RG16I),U===i.INT&&(X=i.RG32I)),g===i.RGB_INTEGER&&(U===i.UNSIGNED_BYTE&&(X=i.RGB8UI),U===i.UNSIGNED_SHORT&&(X=i.RGB16UI),U===i.UNSIGNED_INT&&(X=i.RGB32UI),U===i.BYTE&&(X=i.RGB8I),U===i.SHORT&&(X=i.RGB16I),U===i.INT&&(X=i.RGB32I)),g===i.RGBA_INTEGER&&(U===i.UNSIGNED_BYTE&&(X=i.RGBA8UI),U===i.UNSIGNED_SHORT&&(X=i.RGBA16UI),U===i.UNSIGNED_INT&&(X=i.RGBA32UI),U===i.BYTE&&(X=i.RGBA8I),U===i.SHORT&&(X=i.RGBA16I),U===i.INT&&(X=i.RGBA32I)),g===i.RGB&&(U===i.UNSIGNED_SHORT&&at&&(X=at.RGB16_EXT),U===i.SHORT&&at&&(X=at.RGB16_SNORM_EXT),U===i.UNSIGNED_INT_5_9_9_9_REV&&(X=i.RGB9_E5),U===i.UNSIGNED_INT_10F_11F_11F_REV&&(X=i.R11F_G11F_B10F)),g===i.RGBA){let J=it?$s:Wt.getTransfer(W);U===i.FLOAT&&(X=i.RGBA32F),U===i.HALF_FLOAT&&(X=i.RGBA16F),U===i.UNSIGNED_BYTE&&(X=J===Kt?i.SRGB8_ALPHA8:i.RGBA8),U===i.UNSIGNED_SHORT&&at&&(X=at.RGBA16_EXT),U===i.SHORT&&at&&(X=at.RGBA16_SNORM_EXT),U===i.UNSIGNED_SHORT_4_4_4_4&&(X=i.RGBA4),U===i.UNSIGNED_SHORT_5_5_5_1&&(X=i.RGB5_A1)}return(X===i.R16F||X===i.R32F||X===i.RG16F||X===i.RG32F||X===i.RGBA16F||X===i.RGBA32F)&&t.get("EXT_color_buffer_float"),X}function A(w,g){let U;return w?g===null||g===fn||g===ys?U=i.DEPTH24_STENCIL8:g===pn?U=i.DEPTH32F_STENCIL8:g===xs&&(U=i.DEPTH24_STENCIL8,Rt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):g===null||g===fn||g===ys?U=i.DEPTH_COMPONENT24:g===pn?U=i.DEPTH_COMPONENT32F:g===xs&&(U=i.DEPTH_COMPONENT16),U}function M(w,g){return f(w)===!0||w.isFramebufferTexture&&w.minFilter!==Pe&&w.minFilter!==Le?Math.log2(Math.max(g.width,g.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?g.mipmaps.length:1}function C(w){let g=w.target;g.removeEventListener("dispose",C),E(g),g.isVideoTexture&&h.delete(g),g.isHTMLTexture&&d.delete(g)}function y(w){let g=w.target;g.removeEventListener("dispose",y),P(g)}function E(w){let g=n.get(w);if(g.__webglInit===void 0)return;let U=w.source,z=m.get(U);if(z){let W=z[g.__cacheKey];W.usedTimes--,W.usedTimes===0&&R(w),Object.keys(z).length===0&&m.delete(U)}n.remove(w)}function R(w){let g=n.get(w);i.deleteTexture(g.__webglTexture);let U=w.source,z=m.get(U);delete z[g.__cacheKey],a.memory.textures--}function P(w){let g=n.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),n.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let z=0;z<6;z++){if(Array.isArray(g.__webglFramebuffer[z]))for(let W=0;W<g.__webglFramebuffer[z].length;W++)i.deleteFramebuffer(g.__webglFramebuffer[z][W]);else i.deleteFramebuffer(g.__webglFramebuffer[z]);g.__webglDepthbuffer&&i.deleteRenderbuffer(g.__webglDepthbuffer[z])}else{if(Array.isArray(g.__webglFramebuffer))for(let z=0;z<g.__webglFramebuffer.length;z++)i.deleteFramebuffer(g.__webglFramebuffer[z]);else i.deleteFramebuffer(g.__webglFramebuffer);if(g.__webglDepthbuffer&&i.deleteRenderbuffer(g.__webglDepthbuffer),g.__webglMultisampledFramebuffer&&i.deleteFramebuffer(g.__webglMultisampledFramebuffer),g.__webglColorRenderbuffer)for(let z=0;z<g.__webglColorRenderbuffer.length;z++)g.__webglColorRenderbuffer[z]&&i.deleteRenderbuffer(g.__webglColorRenderbuffer[z]);g.__webglDepthRenderbuffer&&i.deleteRenderbuffer(g.__webglDepthRenderbuffer)}let U=w.textures;for(let z=0,W=U.length;z<W;z++){let it=n.get(U[z]);it.__webglTexture&&(i.deleteTexture(it.__webglTexture),a.memory.textures--),n.remove(U[z])}n.remove(w)}let F=0;function q(){F=0}function Y(){return F}function k(w){F=w}function G(){let w=F;return w>=s.maxTextures&&Rt("WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+s.maxTextures),F+=1,w}function V(w){let g=[];return g.push(w.wrapS),g.push(w.wrapT),g.push(w.wrapR||0),g.push(w.magFilter),g.push(w.minFilter),g.push(w.anisotropy),g.push(w.internalFormat),g.push(w.format),g.push(w.type),g.push(w.generateMipmaps),g.push(w.premultiplyAlpha),g.push(w.flipY),g.push(w.unpackAlignment),g.push(w.colorSpace),g.join()}function K(w,g){let U=n.get(w);if(w.isVideoTexture&&D(w),w.isRenderTargetTexture===!1&&w.isExternalTexture!==!0&&w.version>0&&U.__version!==w.version){let z=w.image;if(z===null)Rt("WebGLRenderer: Texture marked for update but no image data found.");else if(z.complete===!1)Rt("WebGLRenderer: Texture marked for update but image is incomplete");else{$(U,w,g);return}}else w.isExternalTexture&&(U.__webglTexture=w.sourceTexture?w.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,U.__webglTexture,i.TEXTURE0+g)}function et(w,g){let U=n.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&U.__version!==w.version){$(U,w,g);return}else w.isExternalTexture&&(U.__webglTexture=w.sourceTexture?w.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,U.__webglTexture,i.TEXTURE0+g)}function ct(w,g){let U=n.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&U.__version!==w.version){$(U,w,g);return}e.bindTexture(i.TEXTURE_3D,U.__webglTexture,i.TEXTURE0+g)}function dt(w,g){let U=n.get(w);if(w.isCubeDepthTexture!==!0&&w.version>0&&U.__version!==w.version){xt(U,w,g);return}e.bindTexture(i.TEXTURE_CUBE_MAP,U.__webglTexture,i.TEXTURE0+g)}let mt={[ii]:i.REPEAT,[bn]:i.CLAMP_TO_EDGE,[Aa]:i.MIRRORED_REPEAT},zt={[Pe]:i.NEAREST,[Su]:i.NEAREST_MIPMAP_NEAREST,[gr]:i.NEAREST_MIPMAP_LINEAR,[Le]:i.LINEAR,[ro]:i.LINEAR_MIPMAP_NEAREST,[ui]:i.LINEAR_MIPMAP_LINEAR},Lt={[Eu]:i.NEVER,[Pu]:i.ALWAYS,[Tu]:i.LESS,[Wo]:i.LEQUAL,[Au]:i.EQUAL,[Xo]:i.GEQUAL,[Cu]:i.GREATER,[Ru]:i.NOTEQUAL};function qt(w,g){if(g.type===pn&&t.has("OES_texture_float_linear")===!1&&(g.magFilter===Le||g.magFilter===ro||g.magFilter===gr||g.magFilter===ui||g.minFilter===Le||g.minFilter===ro||g.minFilter===gr||g.minFilter===ui)&&Rt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(w,i.TEXTURE_WRAP_S,mt[g.wrapS]),i.texParameteri(w,i.TEXTURE_WRAP_T,mt[g.wrapT]),(w===i.TEXTURE_3D||w===i.TEXTURE_2D_ARRAY)&&i.texParameteri(w,i.TEXTURE_WRAP_R,mt[g.wrapR]),i.texParameteri(w,i.TEXTURE_MAG_FILTER,zt[g.magFilter]),i.texParameteri(w,i.TEXTURE_MIN_FILTER,zt[g.minFilter]),g.compareFunction&&(i.texParameteri(w,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(w,i.TEXTURE_COMPARE_FUNC,Lt[g.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(g.magFilter===Pe||g.minFilter!==gr&&g.minFilter!==ui||g.type===pn&&t.has("OES_texture_float_linear")===!1)return;if(g.anisotropy>1||n.get(g).__currentAnisotropy){let U=t.get("EXT_texture_filter_anisotropic");i.texParameterf(w,U.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(g.anisotropy,s.getMaxAnisotropy())),n.get(g).__currentAnisotropy=g.anisotropy}}}function Z(w,g){let U=!1;w.__webglInit===void 0&&(w.__webglInit=!0,g.addEventListener("dispose",C));let z=g.source,W=m.get(z);W===void 0&&(W={},m.set(z,W));let it=V(g);if(it!==w.__cacheKey){W[it]===void 0&&(W[it]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,U=!0),W[it].usedTimes++;let at=W[w.__cacheKey];at!==void 0&&(W[w.__cacheKey].usedTimes--,at.usedTimes===0&&R(g)),w.__cacheKey=it,w.__webglTexture=W[it].texture}return U}function ot(w,g,U){return Math.floor(Math.floor(w/U)/g)}function nt(w,g,U,z){let it=w.updateRanges;if(it.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,g.width,g.height,U,z,g.data);else{it.sort((Mt,Q)=>Mt.start-Q.start);let at=0;for(let Mt=1;Mt<it.length;Mt++){let Q=it[at],st=it[Mt],Tt=Q.start+Q.count,Ct=ot(st.start,g.width,4),Nt=ot(Q.start,g.width,4);st.start<=Tt+1&&Ct===Nt&&ot(st.start+st.count-1,g.width,4)===Ct?Q.count=Math.max(Q.count,st.start+st.count-Q.start):(++at,it[at]=st)}it.length=at+1;let X=e.getParameter(i.UNPACK_ROW_LENGTH),J=e.getParameter(i.UNPACK_SKIP_PIXELS),lt=e.getParameter(i.UNPACK_SKIP_ROWS);e.pixelStorei(i.UNPACK_ROW_LENGTH,g.width);for(let Mt=0,Q=it.length;Mt<Q;Mt++){let st=it[Mt],Tt=Math.floor(st.start/4),Ct=Math.ceil(st.count/4),Nt=Tt%g.width,I=Math.floor(Tt/g.width),rt=Ct,j=1;e.pixelStorei(i.UNPACK_SKIP_PIXELS,Nt),e.pixelStorei(i.UNPACK_SKIP_ROWS,I),e.texSubImage2D(i.TEXTURE_2D,0,Nt,I,rt,j,U,z,g.data)}w.clearUpdateRanges(),e.pixelStorei(i.UNPACK_ROW_LENGTH,X),e.pixelStorei(i.UNPACK_SKIP_PIXELS,J),e.pixelStorei(i.UNPACK_SKIP_ROWS,lt)}}function $(w,g,U){let z=i.TEXTURE_2D;(g.isDataArrayTexture||g.isCompressedArrayTexture)&&(z=i.TEXTURE_2D_ARRAY),g.isData3DTexture&&(z=i.TEXTURE_3D);let W=Z(w,g),it=g.source;e.bindTexture(z,w.__webglTexture,i.TEXTURE0+U);let at=n.get(it);if(it.version!==at.__version||W===!0){if(e.activeTexture(i.TEXTURE0+U),(typeof ImageBitmap<"u"&&g.image instanceof ImageBitmap)===!1){let j=Wt.getPrimaries(Wt.workingColorSpace),ht=g.colorSpace===Wn?null:Wt.getPrimaries(g.colorSpace),gt=g.colorSpace===Wn||j===ht?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,g.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,gt)}e.pixelStorei(i.UNPACK_ALIGNMENT,g.unpackAlignment);let J=p(g.image,!1,s.maxTextureSize);J=he(g,J);let lt=r.convert(g.format,g.colorSpace),Mt=r.convert(g.type),Q=b(g.internalFormat,lt,Mt,g.normalized,g.colorSpace,g.isVideoTexture);qt(z,g);let st,Tt=g.mipmaps,Ct=g.isVideoTexture!==!0,Nt=at.__version===void 0||W===!0,I=it.dataReady,rt=M(g,J);if(g.isDepthTexture)Q=A(g.format===di,g.type),Nt&&(Ct?e.texStorage2D(i.TEXTURE_2D,1,Q,J.width,J.height):e.texImage2D(i.TEXTURE_2D,0,Q,J.width,J.height,0,lt,Mt,null));else if(g.isDataTexture)if(Tt.length>0){Ct&&Nt&&e.texStorage2D(i.TEXTURE_2D,rt,Q,Tt[0].width,Tt[0].height);for(let j=0,ht=Tt.length;j<ht;j++)st=Tt[j],Ct?I&&e.texSubImage2D(i.TEXTURE_2D,j,0,0,st.width,st.height,lt,Mt,st.data):e.texImage2D(i.TEXTURE_2D,j,Q,st.width,st.height,0,lt,Mt,st.data);g.generateMipmaps=!1}else Ct?(Nt&&e.texStorage2D(i.TEXTURE_2D,rt,Q,J.width,J.height),I&&nt(g,J,lt,Mt)):e.texImage2D(i.TEXTURE_2D,0,Q,J.width,J.height,0,lt,Mt,J.data);else if(g.isCompressedTexture)if(g.isCompressedArrayTexture){Ct&&Nt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,rt,Q,Tt[0].width,Tt[0].height,J.depth);for(let j=0,ht=Tt.length;j<ht;j++)if(st=Tt[j],g.format!==sn)if(lt!==null)if(Ct){if(I)if(g.layerUpdates.size>0){let gt=Ic(st.width,st.height,g.format,g.type);for(let tt of g.layerUpdates){let wt=st.data.subarray(tt*gt/st.data.BYTES_PER_ELEMENT,(tt+1)*gt/st.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,j,0,0,tt,st.width,st.height,1,lt,wt)}g.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,j,0,0,0,st.width,st.height,J.depth,lt,st.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,j,Q,st.width,st.height,J.depth,0,st.data,0,0);else Rt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ct?I&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,j,0,0,0,st.width,st.height,J.depth,lt,Mt,st.data):e.texImage3D(i.TEXTURE_2D_ARRAY,j,Q,st.width,st.height,J.depth,0,lt,Mt,st.data)}else{Ct&&Nt&&e.texStorage2D(i.TEXTURE_2D,rt,Q,Tt[0].width,Tt[0].height);for(let j=0,ht=Tt.length;j<ht;j++)st=Tt[j],g.format!==sn?lt!==null?Ct?I&&e.compressedTexSubImage2D(i.TEXTURE_2D,j,0,0,st.width,st.height,lt,st.data):e.compressedTexImage2D(i.TEXTURE_2D,j,Q,st.width,st.height,0,st.data):Rt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ct?I&&e.texSubImage2D(i.TEXTURE_2D,j,0,0,st.width,st.height,lt,Mt,st.data):e.texImage2D(i.TEXTURE_2D,j,Q,st.width,st.height,0,lt,Mt,st.data)}else if(g.isDataArrayTexture)if(Ct){if(Nt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,rt,Q,J.width,J.height,J.depth),I)if(g.layerUpdates.size>0){let j=Ic(J.width,J.height,g.format,g.type);for(let ht of g.layerUpdates){let gt=J.data.subarray(ht*j/J.data.BYTES_PER_ELEMENT,(ht+1)*j/J.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ht,J.width,J.height,1,lt,Mt,gt)}g.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,J.width,J.height,J.depth,lt,Mt,J.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Q,J.width,J.height,J.depth,0,lt,Mt,J.data);else if(g.isData3DTexture)Ct?(Nt&&e.texStorage3D(i.TEXTURE_3D,rt,Q,J.width,J.height,J.depth),I&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,J.width,J.height,J.depth,lt,Mt,J.data)):e.texImage3D(i.TEXTURE_3D,0,Q,J.width,J.height,J.depth,0,lt,Mt,J.data);else if(g.isFramebufferTexture){if(Nt)if(Ct)e.texStorage2D(i.TEXTURE_2D,rt,Q,J.width,J.height);else{let j=J.width,ht=J.height;for(let gt=0;gt<rt;gt++)e.texImage2D(i.TEXTURE_2D,gt,Q,j,ht,0,lt,Mt,null),j>>=1,ht>>=1}}else if(g.isHTMLTexture){if("texElementImage2D"in i){let j=i.canvas;if(j.hasAttribute("layoutsubtree")||j.setAttribute("layoutsubtree","true"),J.parentNode!==j){j.appendChild(J),d.add(g),j.onpaint=ht=>{let gt=ht.changedElements;for(let tt of d)gt.includes(tt.image)&&(tt.needsUpdate=!0)},j.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,J);else{let gt=i.RGBA,tt=i.RGBA,wt=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,gt,tt,wt,J)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Tt.length>0){if(Ct&&Nt){let j=Jt(Tt[0]);e.texStorage2D(i.TEXTURE_2D,rt,Q,j.width,j.height)}for(let j=0,ht=Tt.length;j<ht;j++)st=Tt[j],Ct?I&&e.texSubImage2D(i.TEXTURE_2D,j,0,0,lt,Mt,st):e.texImage2D(i.TEXTURE_2D,j,Q,lt,Mt,st);g.generateMipmaps=!1}else if(Ct){if(Nt){let j=Jt(J);e.texStorage2D(i.TEXTURE_2D,rt,Q,j.width,j.height)}I&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,lt,Mt,J)}else e.texImage2D(i.TEXTURE_2D,0,Q,lt,Mt,J);f(g)&&S(z),at.__version=it.version,g.onUpdate&&g.onUpdate(g)}w.__version=g.version}function xt(w,g,U){if(g.image.length!==6)return;let z=Z(w,g),W=g.source;e.bindTexture(i.TEXTURE_CUBE_MAP,w.__webglTexture,i.TEXTURE0+U);let it=n.get(W);if(W.version!==it.__version||z===!0){e.activeTexture(i.TEXTURE0+U);let at=Wt.getPrimaries(Wt.workingColorSpace),X=g.colorSpace===Wn?null:Wt.getPrimaries(g.colorSpace),J=g.colorSpace===Wn||at===X?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,g.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),e.pixelStorei(i.UNPACK_ALIGNMENT,g.unpackAlignment),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,J);let lt=g.isCompressedTexture||g.image[0].isCompressedTexture,Mt=g.image[0]&&g.image[0].isDataTexture,Q=[];for(let tt=0;tt<6;tt++)!lt&&!Mt?Q[tt]=p(g.image[tt],!0,s.maxCubemapSize):Q[tt]=Mt?g.image[tt].image:g.image[tt],Q[tt]=he(g,Q[tt]);let st=Q[0],Tt=r.convert(g.format,g.colorSpace),Ct=r.convert(g.type),Nt=b(g.internalFormat,Tt,Ct,g.normalized,g.colorSpace),I=g.isVideoTexture!==!0,rt=it.__version===void 0||z===!0,j=W.dataReady,ht=M(g,st);qt(i.TEXTURE_CUBE_MAP,g);let gt;if(lt){I&&rt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,ht,Nt,st.width,st.height);for(let tt=0;tt<6;tt++){gt=Q[tt].mipmaps;for(let wt=0;wt<gt.length;wt++){let bt=gt[wt];g.format!==sn?Tt!==null?I?j&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,wt,0,0,bt.width,bt.height,Tt,bt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,wt,Nt,bt.width,bt.height,0,bt.data):Rt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):I?j&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,wt,0,0,bt.width,bt.height,Tt,Ct,bt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,wt,Nt,bt.width,bt.height,0,Tt,Ct,bt.data)}}}else{if(gt=g.mipmaps,I&&rt){gt.length>0&&ht++;let tt=Jt(Q[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,ht,Nt,tt.width,tt.height)}for(let tt=0;tt<6;tt++)if(Mt){I?j&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,0,0,Q[tt].width,Q[tt].height,Tt,Ct,Q[tt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,Nt,Q[tt].width,Q[tt].height,0,Tt,Ct,Q[tt].data);for(let wt=0;wt<gt.length;wt++){let pe=gt[wt].image[tt].image;I?j&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,wt+1,0,0,pe.width,pe.height,Tt,Ct,pe.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,wt+1,Nt,pe.width,pe.height,0,Tt,Ct,pe.data)}}else{I?j&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,0,0,Tt,Ct,Q[tt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,Nt,Tt,Ct,Q[tt]);for(let wt=0;wt<gt.length;wt++){let bt=gt[wt];I?j&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,wt+1,0,0,Tt,Ct,bt.image[tt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,wt+1,Nt,Tt,Ct,bt.image[tt])}}}f(g)&&S(i.TEXTURE_CUBE_MAP),it.__version=W.version,g.onUpdate&&g.onUpdate(g)}w.__version=g.version}function _t(w,g,U,z,W,it){let at=r.convert(U.format,U.colorSpace),X=r.convert(U.type),J=b(U.internalFormat,at,X,U.normalized,U.colorSpace),lt=n.get(g),Mt=n.get(U);if(Mt.__renderTarget=g,!lt.__hasExternalTextures){let Q=Math.max(1,g.width>>it),st=Math.max(1,g.height>>it);W===i.TEXTURE_3D||W===i.TEXTURE_2D_ARRAY?e.texImage3D(W,it,J,Q,st,g.depth,0,at,X,null):e.texImage2D(W,it,J,Q,st,0,at,X,null)}e.bindFramebuffer(i.FRAMEBUFFER,w),fe(g)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,z,W,Mt.__webglTexture,0,Zt(g)):(W===i.TEXTURE_2D||W>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&W<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,z,W,Mt.__webglTexture,it),e.bindFramebuffer(i.FRAMEBUFFER,null)}function $t(w,g,U){if(i.bindRenderbuffer(i.RENDERBUFFER,w),g.depthBuffer){let z=g.depthTexture,W=z&&z.isDepthTexture?z.type:null,it=A(g.stencilBuffer,W),at=g.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;fe(g)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Zt(g),it,g.width,g.height):U?i.renderbufferStorageMultisample(i.RENDERBUFFER,Zt(g),it,g.width,g.height):i.renderbufferStorage(i.RENDERBUFFER,it,g.width,g.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,at,i.RENDERBUFFER,w)}else{let z=g.textures;for(let W=0;W<z.length;W++){let it=z[W],at=r.convert(it.format,it.colorSpace),X=r.convert(it.type),J=b(it.internalFormat,at,X,it.normalized,it.colorSpace);fe(g)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Zt(g),J,g.width,g.height):U?i.renderbufferStorageMultisample(i.RENDERBUFFER,Zt(g),J,g.width,g.height):i.renderbufferStorage(i.RENDERBUFFER,J,g.width,g.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ft(w,g,U){let z=g.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,w),!(g.depthTexture&&g.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let W=n.get(g.depthTexture);if(W.__renderTarget=g,(!W.__webglTexture||g.depthTexture.image.width!==g.width||g.depthTexture.image.height!==g.height)&&(g.depthTexture.image.width=g.width,g.depthTexture.image.height=g.height,g.depthTexture.needsUpdate=!0),z){if(W.__webglInit===void 0&&(W.__webglInit=!0,g.depthTexture.addEventListener("dispose",C)),W.__webglTexture===void 0){W.__webglTexture=i.createTexture(),e.bindTexture(i.TEXTURE_CUBE_MAP,W.__webglTexture),qt(i.TEXTURE_CUBE_MAP,g.depthTexture);let lt=r.convert(g.depthTexture.format),Mt=r.convert(g.depthTexture.type),Q;g.depthTexture.format===Sn?Q=i.DEPTH_COMPONENT24:g.depthTexture.format===di&&(Q=i.DEPTH24_STENCIL8);for(let st=0;st<6;st++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,Q,g.width,g.height,0,lt,Mt,null)}}else K(g.depthTexture,0);let it=W.__webglTexture,at=Zt(g),X=z?i.TEXTURE_CUBE_MAP_POSITIVE_X+U:i.TEXTURE_2D,J=g.depthTexture.format===di?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(g.depthTexture.format===Sn)fe(g)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,J,X,it,0,at):i.framebufferTexture2D(i.FRAMEBUFFER,J,X,it,0);else if(g.depthTexture.format===di)fe(g)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,J,X,it,0,at):i.framebufferTexture2D(i.FRAMEBUFFER,J,X,it,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Ht(w){let g=n.get(w),U=w.isWebGLCubeRenderTarget===!0;if(g.__boundDepthTexture!==w.depthTexture){let z=w.depthTexture;if(g.__depthDisposeCallback&&g.__depthDisposeCallback(),z){let W=()=>{delete g.__boundDepthTexture,delete g.__depthDisposeCallback,z.removeEventListener("dispose",W)};z.addEventListener("dispose",W),g.__depthDisposeCallback=W}g.__boundDepthTexture=z}if(w.depthTexture&&!g.__autoAllocateDepthBuffer)if(U)for(let z=0;z<6;z++)Ft(g.__webglFramebuffer[z],w,z);else{let z=w.texture.mipmaps;z&&z.length>0?Ft(g.__webglFramebuffer[0],w,0):Ft(g.__webglFramebuffer,w,0)}else if(U){g.__webglDepthbuffer=[];for(let z=0;z<6;z++)if(e.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer[z]),g.__webglDepthbuffer[z]===void 0)g.__webglDepthbuffer[z]=i.createRenderbuffer(),$t(g.__webglDepthbuffer[z],w,!1);else{let W=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,it=g.__webglDepthbuffer[z];i.bindRenderbuffer(i.RENDERBUFFER,it),i.framebufferRenderbuffer(i.FRAMEBUFFER,W,i.RENDERBUFFER,it)}}else{let z=w.texture.mipmaps;if(z&&z.length>0?e.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer),g.__webglDepthbuffer===void 0)g.__webglDepthbuffer=i.createRenderbuffer(),$t(g.__webglDepthbuffer,w,!1);else{let W=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,it=g.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,it),i.framebufferRenderbuffer(i.FRAMEBUFFER,W,i.RENDERBUFFER,it)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Vt(w,g,U){let z=n.get(w);g!==void 0&&_t(z.__webglFramebuffer,w,w.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),U!==void 0&&Ht(w)}function Gt(w){let g=w.texture,U=n.get(w),z=n.get(g);w.addEventListener("dispose",y);let W=w.textures,it=w.isWebGLCubeRenderTarget===!0,at=W.length>1;if(at||(z.__webglTexture===void 0&&(z.__webglTexture=i.createTexture()),z.__version=g.version,a.memory.textures++),it){U.__webglFramebuffer=[];for(let X=0;X<6;X++)if(g.mipmaps&&g.mipmaps.length>0){U.__webglFramebuffer[X]=[];for(let J=0;J<g.mipmaps.length;J++)U.__webglFramebuffer[X][J]=i.createFramebuffer()}else U.__webglFramebuffer[X]=i.createFramebuffer()}else{if(g.mipmaps&&g.mipmaps.length>0){U.__webglFramebuffer=[];for(let X=0;X<g.mipmaps.length;X++)U.__webglFramebuffer[X]=i.createFramebuffer()}else U.__webglFramebuffer=i.createFramebuffer();if(at)for(let X=0,J=W.length;X<J;X++){let lt=n.get(W[X]);lt.__webglTexture===void 0&&(lt.__webglTexture=i.createTexture(),a.memory.textures++)}if(w.samples>0&&fe(w)===!1){U.__webglMultisampledFramebuffer=i.createFramebuffer(),U.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,U.__webglMultisampledFramebuffer);for(let X=0;X<W.length;X++){let J=W[X];U.__webglColorRenderbuffer[X]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,U.__webglColorRenderbuffer[X]);let lt=r.convert(J.format,J.colorSpace),Mt=r.convert(J.type),Q=b(J.internalFormat,lt,Mt,J.normalized,J.colorSpace,w.isXRRenderTarget===!0),st=Zt(w);i.renderbufferStorageMultisample(i.RENDERBUFFER,st,Q,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+X,i.RENDERBUFFER,U.__webglColorRenderbuffer[X])}i.bindRenderbuffer(i.RENDERBUFFER,null),w.depthBuffer&&(U.__webglDepthRenderbuffer=i.createRenderbuffer(),$t(U.__webglDepthRenderbuffer,w,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(it){e.bindTexture(i.TEXTURE_CUBE_MAP,z.__webglTexture),qt(i.TEXTURE_CUBE_MAP,g);for(let X=0;X<6;X++)if(g.mipmaps&&g.mipmaps.length>0)for(let J=0;J<g.mipmaps.length;J++)_t(U.__webglFramebuffer[X][J],w,g,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+X,J);else _t(U.__webglFramebuffer[X],w,g,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+X,0);f(g)&&S(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(at){for(let X=0,J=W.length;X<J;X++){let lt=W[X],Mt=n.get(lt),Q=i.TEXTURE_2D;(w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(Q=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(Q,Mt.__webglTexture),qt(Q,lt),_t(U.__webglFramebuffer,w,lt,i.COLOR_ATTACHMENT0+X,Q,0),f(lt)&&S(Q)}e.unbindTexture()}else{let X=i.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(X=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(X,z.__webglTexture),qt(X,g),g.mipmaps&&g.mipmaps.length>0)for(let J=0;J<g.mipmaps.length;J++)_t(U.__webglFramebuffer[J],w,g,i.COLOR_ATTACHMENT0,X,J);else _t(U.__webglFramebuffer,w,g,i.COLOR_ATTACHMENT0,X,0);f(g)&&S(X),e.unbindTexture()}w.depthBuffer&&Ht(w)}function le(w){let g=w.textures;for(let U=0,z=g.length;U<z;U++){let W=g[U];if(f(W)){let it=T(w),at=n.get(W).__webglTexture;e.bindTexture(it,at),S(it),e.unbindTexture()}}}let Qt=[],_e=[];function we(w){if(w.samples>0){if(fe(w)===!1){let g=w.textures,U=w.width,z=w.height,W=i.COLOR_BUFFER_BIT,it=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,at=n.get(w),X=g.length>1;if(X)for(let lt=0;lt<g.length;lt++)e.bindFramebuffer(i.FRAMEBUFFER,at.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+lt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,at.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+lt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,at.__webglMultisampledFramebuffer);let J=w.texture.mipmaps;J&&J.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,at.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,at.__webglFramebuffer);for(let lt=0;lt<g.length;lt++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(W|=i.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(W|=i.STENCIL_BUFFER_BIT)),X){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,at.__webglColorRenderbuffer[lt]);let Mt=n.get(g[lt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Mt,0)}i.blitFramebuffer(0,0,U,z,0,0,U,z,W,i.NEAREST),l===!0&&(Qt.length=0,_e.length=0,Qt.push(i.COLOR_ATTACHMENT0+lt),w.depthBuffer&&w.resolveDepthBuffer===!1&&(Qt.push(it),_e.push(it),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,_e)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Qt))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),X)for(let lt=0;lt<g.length;lt++){e.bindFramebuffer(i.FRAMEBUFFER,at.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+lt,i.RENDERBUFFER,at.__webglColorRenderbuffer[lt]);let Mt=n.get(g[lt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,at.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+lt,i.TEXTURE_2D,Mt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,at.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&l){let g=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[g])}}}function Zt(w){return Math.min(s.maxSamples,w.samples)}function fe(w){let g=n.get(w);return w.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&g.__useRenderToTexture!==!1}function D(w){let g=a.render.frame;h.get(w)!==g&&(h.set(w,g),w.update())}function he(w,g){let U=w.colorSpace,z=w.format,W=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||U!==Xs&&U!==Wn&&(Wt.getTransfer(U)===Kt?(z!==sn||W!==$e)&&Rt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Pt("WebGLTextures: Unsupported texture color space:",U)),g}function Jt(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(c.width=w.naturalWidth||w.width,c.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(c.width=w.displayWidth,c.height=w.displayHeight):(c.width=w.width,c.height=w.height),c}this.allocateTextureUnit=G,this.resetTextureUnits=q,this.getTextureUnits=Y,this.setTextureUnits=k,this.setTexture2D=K,this.setTexture2DArray=et,this.setTexture3D=ct,this.setTextureCube=dt,this.rebindTextures=Vt,this.setupRenderTarget=Gt,this.updateRenderTargetMipmap=le,this.updateMultisampleRenderTarget=we,this.setupDepthRenderbuffer=Ht,this.setupFrameBufferTexture=_t,this.useMultisampledRTT=fe,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function ry(i,t){function e(n,s=Wn){let r,a=Wt.getTransfer(s);if(n===$e)return i.UNSIGNED_BYTE;if(n===oo)return i.UNSIGNED_SHORT_4_4_4_4;if(n===lo)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Sc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Mc)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===vc)return i.BYTE;if(n===bc)return i.SHORT;if(n===xs)return i.UNSIGNED_SHORT;if(n===ao)return i.INT;if(n===fn)return i.UNSIGNED_INT;if(n===pn)return i.FLOAT;if(n===An)return i.HALF_FLOAT;if(n===wc)return i.ALPHA;if(n===Ec)return i.RGB;if(n===sn)return i.RGBA;if(n===Sn)return i.DEPTH_COMPONENT;if(n===di)return i.DEPTH_STENCIL;if(n===Tc)return i.RED;if(n===co)return i.RED_INTEGER;if(n===fi)return i.RG;if(n===ho)return i.RG_INTEGER;if(n===uo)return i.RGBA_INTEGER;if(n===xr||n===yr||n===_r||n===vr)if(a===Kt)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===xr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===yr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===_r)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===vr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===xr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===yr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===_r)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===vr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===fo||n===po||n===mo||n===go)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===fo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===po)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===mo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===go)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===xo||n===yo||n===_o||n===vo||n===bo||n===br||n===So)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===xo||n===yo)return a===Kt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===_o)return a===Kt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===vo)return r.COMPRESSED_R11_EAC;if(n===bo)return r.COMPRESSED_SIGNED_R11_EAC;if(n===br)return r.COMPRESSED_RG11_EAC;if(n===So)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Mo||n===wo||n===Eo||n===To||n===Ao||n===Co||n===Ro||n===Po||n===Io||n===Lo||n===Do||n===No||n===Uo||n===Fo)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Mo)return a===Kt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===wo)return a===Kt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Eo)return a===Kt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===To)return a===Kt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ao)return a===Kt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Co)return a===Kt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ro)return a===Kt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Po)return a===Kt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Io)return a===Kt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Lo)return a===Kt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Do)return a===Kt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===No)return a===Kt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Uo)return a===Kt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Fo)return a===Kt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Oo||n===Bo||n===ko)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Oo)return a===Kt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Bo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===ko)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===zo||n===Ho||n===Sr||n===Vo)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===zo)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Ho)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Sr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Vo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ys?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var ay=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,oy=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Zc=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new ir(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new Xe({vertexShader:ay,fragmentShader:oy,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new xe(new rr(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Jc=class extends Mn{constructor(t,e){super();let n=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,d=null,u=null,m=null,x=null,v=typeof XRWebGLBinding<"u",p=new Zc,f={},S=e.getContextAttributes(),T=null,b=null,A=[],M=[],C=new Dt,y=null,E=new Ie;E.viewport=new ue;let R=new Ie;R.viewport=new ue;let P=[E,R],F=new to,q=null,Y=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let ot=A[Z];return ot===void 0&&(ot=new hs,A[Z]=ot),ot.getTargetRaySpace()},this.getControllerGrip=function(Z){let ot=A[Z];return ot===void 0&&(ot=new hs,A[Z]=ot),ot.getGripSpace()},this.getHand=function(Z){let ot=A[Z];return ot===void 0&&(ot=new hs,A[Z]=ot),ot.getHandSpace()};function k(Z){let ot=M.indexOf(Z.inputSource);if(ot===-1)return;let nt=A[ot];nt!==void 0&&(nt.update(Z.inputSource,Z.frame,c||a),nt.dispatchEvent({type:Z.type,data:Z.inputSource}))}function G(){s.removeEventListener("select",k),s.removeEventListener("selectstart",k),s.removeEventListener("selectend",k),s.removeEventListener("squeeze",k),s.removeEventListener("squeezestart",k),s.removeEventListener("squeezeend",k),s.removeEventListener("end",G),s.removeEventListener("inputsourceschange",V);for(let Z=0;Z<A.length;Z++){let ot=M[Z];ot!==null&&(M[Z]=null,A[Z].disconnect(ot))}q=null,Y=null,p.reset();for(let Z in f)delete f[Z];t.setRenderTarget(T),m=null,u=null,d=null,s=null,b=null,qt.stop(),n.isPresenting=!1,t.setPixelRatio(y),t.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){r=Z,n.isPresenting===!0&&Rt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){o=Z,n.isPresenting===!0&&Rt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Z){c=Z},this.getBaseLayer=function(){return u!==null?u:m},this.getBinding=function(){return d===null&&v&&(d=new XRWebGLBinding(s,e)),d},this.getFrame=function(){return x},this.getSession=function(){return s},this.setSession=async function(Z){if(s=Z,s!==null){if(T=t.getRenderTarget(),s.addEventListener("select",k),s.addEventListener("selectstart",k),s.addEventListener("selectend",k),s.addEventListener("squeeze",k),s.addEventListener("squeezestart",k),s.addEventListener("squeezeend",k),s.addEventListener("end",G),s.addEventListener("inputsourceschange",V),S.xrCompatible!==!0&&await e.makeXRCompatible(),y=t.getPixelRatio(),t.getSize(C),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let nt=null,$=null,xt=null;S.depth&&(xt=S.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,nt=S.stencil?di:Sn,$=S.stencil?ys:fn);let _t={colorFormat:e.RGBA8,depthFormat:xt,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer(_t),s.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),b=new Ke(u.textureWidth,u.textureHeight,{format:sn,type:$e,depthTexture:new Hn(u.textureWidth,u.textureHeight,$,void 0,void 0,void 0,void 0,void 0,void 0,nt),stencilBuffer:S.stencil,colorSpace:t.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{let nt={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(s,e,nt),s.updateRenderState({baseLayer:m}),t.setPixelRatio(1),t.setSize(m.framebufferWidth,m.framebufferHeight,!1),b=new Ke(m.framebufferWidth,m.framebufferHeight,{format:sn,type:$e,colorSpace:t.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),qt.setContext(s),qt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function V(Z){for(let ot=0;ot<Z.removed.length;ot++){let nt=Z.removed[ot],$=M.indexOf(nt);$>=0&&(M[$]=null,A[$].disconnect(nt))}for(let ot=0;ot<Z.added.length;ot++){let nt=Z.added[ot],$=M.indexOf(nt);if($===-1){for(let _t=0;_t<A.length;_t++)if(_t>=M.length){M.push(nt),$=_t;break}else if(M[_t]===null){M[_t]=nt,$=_t;break}if($===-1)break}let xt=A[$];xt&&xt.connect(nt)}}let K=new L,et=new L;function ct(Z,ot,nt){K.setFromMatrixPosition(ot.matrixWorld),et.setFromMatrixPosition(nt.matrixWorld);let $=K.distanceTo(et),xt=ot.projectionMatrix.elements,_t=nt.projectionMatrix.elements,$t=xt[14]/(xt[10]-1),Ft=xt[14]/(xt[10]+1),Ht=(xt[9]+1)/xt[5],Vt=(xt[9]-1)/xt[5],Gt=(xt[8]-1)/xt[0],le=(_t[8]+1)/_t[0],Qt=$t*Gt,_e=$t*le,we=$/(-Gt+le),Zt=we*-Gt;if(ot.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(Zt),Z.translateZ(we),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),xt[10]===-1)Z.projectionMatrix.copy(ot.projectionMatrix),Z.projectionMatrixInverse.copy(ot.projectionMatrixInverse);else{let fe=$t+we,D=Ft+we,he=Qt-Zt,Jt=_e+($-Zt),w=Ht*Ft/D*fe,g=Vt*Ft/D*fe;Z.projectionMatrix.makePerspective(he,Jt,w,g,fe,D),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function dt(Z,ot){ot===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(ot.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(s===null)return;let ot=Z.near,nt=Z.far;p.texture!==null&&(p.depthNear>0&&(ot=p.depthNear),p.depthFar>0&&(nt=p.depthFar)),F.near=R.near=E.near=ot,F.far=R.far=E.far=nt,(q!==F.near||Y!==F.far)&&(s.updateRenderState({depthNear:F.near,depthFar:F.far}),q=F.near,Y=F.far),F.layers.mask=Z.layers.mask|6,E.layers.mask=F.layers.mask&-5,R.layers.mask=F.layers.mask&-3;let $=Z.parent,xt=F.cameras;dt(F,$);for(let _t=0;_t<xt.length;_t++)dt(xt[_t],$);xt.length===2?ct(F,E,R):F.projectionMatrix.copy(E.projectionMatrix),mt(Z,F,$)};function mt(Z,ot,nt){nt===null?Z.matrix.copy(ot.matrixWorld):(Z.matrix.copy(nt.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(ot.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(ot.projectionMatrix),Z.projectionMatrixInverse.copy(ot.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=Pa*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(u===null&&m===null))return l},this.setFoveation=function(Z){l=Z,u!==null&&(u.fixedFoveation=Z),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=Z)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(F)},this.getCameraTexture=function(Z){return f[Z]};let zt=null;function Lt(Z,ot){if(h=ot.getViewerPose(c||a),x=ot,h!==null){let nt=h.views;m!==null&&(t.setRenderTargetFramebuffer(b,m.framebuffer),t.setRenderTarget(b));let $=!1;nt.length!==F.cameras.length&&(F.cameras.length=0,$=!0);for(let Ft=0;Ft<nt.length;Ft++){let Ht=nt[Ft],Vt=null;if(m!==null)Vt=m.getViewport(Ht);else{let le=d.getViewSubImage(u,Ht);Vt=le.viewport,Ft===0&&(t.setRenderTargetTextures(b,le.colorTexture,le.depthStencilTexture),t.setRenderTarget(b))}let Gt=P[Ft];Gt===void 0&&(Gt=new Ie,Gt.layers.enable(Ft),Gt.viewport=new ue,P[Ft]=Gt),Gt.matrix.fromArray(Ht.transform.matrix),Gt.matrix.decompose(Gt.position,Gt.quaternion,Gt.scale),Gt.projectionMatrix.fromArray(Ht.projectionMatrix),Gt.projectionMatrixInverse.copy(Gt.projectionMatrix).invert(),Gt.viewport.set(Vt.x,Vt.y,Vt.width,Vt.height),Ft===0&&(F.matrix.copy(Gt.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),$===!0&&F.cameras.push(Gt)}let xt=s.enabledFeatures;if(xt&&xt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&v){d=n.getBinding();let Ft=d.getDepthInformation(nt[0]);Ft&&Ft.isValid&&Ft.texture&&p.init(Ft,s.renderState)}if(xt&&xt.includes("camera-access")&&v){t.state.unbindTexture(),d=n.getBinding();for(let Ft=0;Ft<nt.length;Ft++){let Ht=nt[Ft].camera;if(Ht){let Vt=f[Ht];Vt||(Vt=new ir,f[Ht]=Vt);let Gt=d.getCameraImage(Ht);Vt.sourceTexture=Gt}}}}for(let nt=0;nt<A.length;nt++){let $=M[nt],xt=A[nt];$!==null&&xt!==void 0&&xt.update($,ot,c||a)}zt&&zt(Z,ot),ot.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ot}),x=null}let qt=new od;qt.setAnimationLoop(Lt),this.setAnimationLoop=function(Z){zt=Z},this.dispose=function(){}}},ly=new oe,fd=new Ut;fd.set(-1,0,0,0,1,0,0,0,1);function cy(i,t){function e(p,f){p.matrixAutoUpdate===!0&&p.updateMatrix(),f.value.copy(p.matrix)}function n(p,f){f.color.getRGB(p.fogColor.value,Cc(i)),f.isFog?(p.fogNear.value=f.near,p.fogFar.value=f.far):f.isFogExp2&&(p.fogDensity.value=f.density)}function s(p,f,S,T,b){f.isNodeMaterial?f.uniformsNeedUpdate=!1:f.isMeshBasicMaterial?r(p,f):f.isMeshLambertMaterial?(r(p,f),f.envMap&&(p.envMapIntensity.value=f.envMapIntensity)):f.isMeshToonMaterial?(r(p,f),d(p,f)):f.isMeshPhongMaterial?(r(p,f),h(p,f),f.envMap&&(p.envMapIntensity.value=f.envMapIntensity)):f.isMeshStandardMaterial?(r(p,f),u(p,f),f.isMeshPhysicalMaterial&&m(p,f,b)):f.isMeshMatcapMaterial?(r(p,f),x(p,f)):f.isMeshDepthMaterial?r(p,f):f.isMeshDistanceMaterial?(r(p,f),v(p,f)):f.isMeshNormalMaterial?r(p,f):f.isLineBasicMaterial?(a(p,f),f.isLineDashedMaterial&&o(p,f)):f.isPointsMaterial?l(p,f,S,T):f.isSpriteMaterial?c(p,f):f.isShadowMaterial?(p.color.value.copy(f.color),p.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(p,f){p.opacity.value=f.opacity,f.color&&p.diffuse.value.copy(f.color),f.emissive&&p.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(p.map.value=f.map,e(f.map,p.mapTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,e(f.alphaMap,p.alphaMapTransform)),f.bumpMap&&(p.bumpMap.value=f.bumpMap,e(f.bumpMap,p.bumpMapTransform),p.bumpScale.value=f.bumpScale,f.side===Ne&&(p.bumpScale.value*=-1)),f.normalMap&&(p.normalMap.value=f.normalMap,e(f.normalMap,p.normalMapTransform),p.normalScale.value.copy(f.normalScale),f.side===Ne&&p.normalScale.value.negate()),f.displacementMap&&(p.displacementMap.value=f.displacementMap,e(f.displacementMap,p.displacementMapTransform),p.displacementScale.value=f.displacementScale,p.displacementBias.value=f.displacementBias),f.emissiveMap&&(p.emissiveMap.value=f.emissiveMap,e(f.emissiveMap,p.emissiveMapTransform)),f.specularMap&&(p.specularMap.value=f.specularMap,e(f.specularMap,p.specularMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest);let S=t.get(f),T=S.envMap,b=S.envMapRotation;T&&(p.envMap.value=T,p.envMapRotation.value.setFromMatrix4(ly.makeRotationFromEuler(b)).transpose(),T.isCubeTexture&&T.isRenderTargetTexture===!1&&p.envMapRotation.value.premultiply(fd),p.reflectivity.value=f.reflectivity,p.ior.value=f.ior,p.refractionRatio.value=f.refractionRatio),f.lightMap&&(p.lightMap.value=f.lightMap,p.lightMapIntensity.value=f.lightMapIntensity,e(f.lightMap,p.lightMapTransform)),f.aoMap&&(p.aoMap.value=f.aoMap,p.aoMapIntensity.value=f.aoMapIntensity,e(f.aoMap,p.aoMapTransform))}function a(p,f){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,f.map&&(p.map.value=f.map,e(f.map,p.mapTransform))}function o(p,f){p.dashSize.value=f.dashSize,p.totalSize.value=f.dashSize+f.gapSize,p.scale.value=f.scale}function l(p,f,S,T){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,p.size.value=f.size*S,p.scale.value=T*.5,f.map&&(p.map.value=f.map,e(f.map,p.uvTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,e(f.alphaMap,p.alphaMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest)}function c(p,f){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,p.rotation.value=f.rotation,f.map&&(p.map.value=f.map,e(f.map,p.mapTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,e(f.alphaMap,p.alphaMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest)}function h(p,f){p.specular.value.copy(f.specular),p.shininess.value=Math.max(f.shininess,1e-4)}function d(p,f){f.gradientMap&&(p.gradientMap.value=f.gradientMap)}function u(p,f){p.metalness.value=f.metalness,f.metalnessMap&&(p.metalnessMap.value=f.metalnessMap,e(f.metalnessMap,p.metalnessMapTransform)),p.roughness.value=f.roughness,f.roughnessMap&&(p.roughnessMap.value=f.roughnessMap,e(f.roughnessMap,p.roughnessMapTransform)),f.envMap&&(p.envMapIntensity.value=f.envMapIntensity)}function m(p,f,S){p.ior.value=f.ior,f.sheen>0&&(p.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),p.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(p.sheenColorMap.value=f.sheenColorMap,e(f.sheenColorMap,p.sheenColorMapTransform)),f.sheenRoughnessMap&&(p.sheenRoughnessMap.value=f.sheenRoughnessMap,e(f.sheenRoughnessMap,p.sheenRoughnessMapTransform))),f.clearcoat>0&&(p.clearcoat.value=f.clearcoat,p.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(p.clearcoatMap.value=f.clearcoatMap,e(f.clearcoatMap,p.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,e(f.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(p.clearcoatNormalMap.value=f.clearcoatNormalMap,e(f.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Ne&&p.clearcoatNormalScale.value.negate())),f.dispersion>0&&(p.dispersion.value=f.dispersion),f.iridescence>0&&(p.iridescence.value=f.iridescence,p.iridescenceIOR.value=f.iridescenceIOR,p.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(p.iridescenceMap.value=f.iridescenceMap,e(f.iridescenceMap,p.iridescenceMapTransform)),f.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=f.iridescenceThicknessMap,e(f.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),f.transmission>0&&(p.transmission.value=f.transmission,p.transmissionSamplerMap.value=S.texture,p.transmissionSamplerSize.value.set(S.width,S.height),f.transmissionMap&&(p.transmissionMap.value=f.transmissionMap,e(f.transmissionMap,p.transmissionMapTransform)),p.thickness.value=f.thickness,f.thicknessMap&&(p.thicknessMap.value=f.thicknessMap,e(f.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=f.attenuationDistance,p.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(p.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(p.anisotropyMap.value=f.anisotropyMap,e(f.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=f.specularIntensity,p.specularColor.value.copy(f.specularColor),f.specularColorMap&&(p.specularColorMap.value=f.specularColorMap,e(f.specularColorMap,p.specularColorMapTransform)),f.specularIntensityMap&&(p.specularIntensityMap.value=f.specularIntensityMap,e(f.specularIntensityMap,p.specularIntensityMapTransform))}function x(p,f){f.matcap&&(p.matcap.value=f.matcap)}function v(p,f){let S=t.get(f).light;p.referencePosition.value.setFromMatrixPosition(S.matrixWorld),p.nearDistance.value=S.shadow.camera.near,p.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function hy(i,t,e,n){let s={},r={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(b,A){let M=A.program;n.uniformBlockBinding(b,M)}function c(b,A){let M=s[b.id];M===void 0&&(p(b),M=h(b),s[b.id]=M,b.addEventListener("dispose",S));let C=A.program;n.updateUBOMapping(b,C);let y=t.render.frame;r[b.id]!==y&&(u(b),r[b.id]=y)}function h(b){let A=d();b.__bindingPointIndex=A;let M=i.createBuffer(),C=b.__size,y=b.usage;return i.bindBuffer(i.UNIFORM_BUFFER,M),i.bufferData(i.UNIFORM_BUFFER,C,y),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,A,M),M}function d(){for(let b=0;b<o;b++)if(a.indexOf(b)===-1)return a.push(b),b;return Pt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(b){let A=s[b.id],M=b.uniforms,C=b.__cache;i.bindBuffer(i.UNIFORM_BUFFER,A);for(let y=0,E=M.length;y<E;y++){let R=M[y];if(Array.isArray(R))for(let P=0,F=R.length;P<F;P++)m(R[P],y,P,C);else m(R,y,0,C)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function m(b,A,M,C){if(v(b,A,M,C)===!0){let y=b.__offset,E=b.value;if(Array.isArray(E)){let R=0;for(let P=0;P<E.length;P++){let F=E[P],q=f(F);x(F,b.__data,R),typeof F!="number"&&typeof F!="boolean"&&!F.isMatrix3&&!ArrayBuffer.isView(F)&&(R+=q.storage/Float32Array.BYTES_PER_ELEMENT)}}else x(E,b.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,y,b.__data)}}function x(b,A,M){typeof b=="number"||typeof b=="boolean"?A[0]=b:b.isMatrix3?(A[0]=b.elements[0],A[1]=b.elements[1],A[2]=b.elements[2],A[3]=0,A[4]=b.elements[3],A[5]=b.elements[4],A[6]=b.elements[5],A[7]=0,A[8]=b.elements[6],A[9]=b.elements[7],A[10]=b.elements[8],A[11]=0):ArrayBuffer.isView(b)?A.set(new b.constructor(b.buffer,b.byteOffset,A.length)):b.toArray(A,M)}function v(b,A,M,C){let y=b.value,E=A+"_"+M;if(C[E]===void 0)return typeof y=="number"||typeof y=="boolean"?C[E]=y:ArrayBuffer.isView(y)?C[E]=y.slice():C[E]=y.clone(),!0;{let R=C[E];if(typeof y=="number"||typeof y=="boolean"){if(R!==y)return C[E]=y,!0}else{if(ArrayBuffer.isView(y))return!0;if(R.equals(y)===!1)return R.copy(y),!0}}return!1}function p(b){let A=b.uniforms,M=0,C=16;for(let E=0,R=A.length;E<R;E++){let P=Array.isArray(A[E])?A[E]:[A[E]];for(let F=0,q=P.length;F<q;F++){let Y=P[F],k=Array.isArray(Y.value)?Y.value:[Y.value];for(let G=0,V=k.length;G<V;G++){let K=k[G],et=f(K),ct=M%C,dt=ct%et.boundary,mt=ct+dt;M+=dt,mt!==0&&C-mt<et.storage&&(M+=C-mt),Y.__data=new Float32Array(et.storage/Float32Array.BYTES_PER_ELEMENT),Y.__offset=M,M+=et.storage}}}let y=M%C;return y>0&&(M+=C-y),b.__size=M,b.__cache={},this}function f(b){let A={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(A.boundary=4,A.storage=4):b.isVector2?(A.boundary=8,A.storage=8):b.isVector3||b.isColor?(A.boundary=16,A.storage=12):b.isVector4?(A.boundary=16,A.storage=16):b.isMatrix3?(A.boundary=48,A.storage=48):b.isMatrix4?(A.boundary=64,A.storage=64):b.isTexture?Rt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(b)?(A.boundary=16,A.storage=b.byteLength):Rt("WebGLRenderer: Unsupported uniform value type.",b),A}function S(b){let A=b.target;A.removeEventListener("dispose",S);let M=a.indexOf(A.__bindingPointIndex);a.splice(M,1),i.deleteBuffer(s[A.id]),delete s[A.id],delete r[A.id]}function T(){for(let b in s)i.deleteBuffer(s[b]);a=[],s={},r={}}return{bind:l,update:c,dispose:T}}var uy=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Cn=null;function dy(){return Cn===null&&(Cn=new Ua(uy,16,16,fi,An),Cn.name="DFG_LUT",Cn.minFilter=Le,Cn.magFilter=Le,Cn.wrapS=bn,Cn.wrapT=bn,Cn.generateMipmaps=!1,Cn.needsUpdate=!0),Cn}var Zo=class{constructor(t={}){let{canvas:e=Iu(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:m=$e}=t;this.isWebGLRenderer=!0;let x;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");x=n.getContextAttributes().alpha}else x=a;let v=m,p=new Set([uo,ho,co]),f=new Set([$e,fn,xs,ys,oo,lo]),S=new Uint32Array(4),T=new Int32Array(4),b=new L,A=null,M=null,C=[],y=[],E=null;this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=dn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let R=this,P=!1,F=null,q=null,Y=null,k=null;this._outputColorSpace=Ee;let G=0,V=0,K=null,et=-1,ct=null,dt=new ue,mt=new ue,zt=null,Lt=new It(0),qt=0,Z=e.width,ot=e.height,nt=1,$=null,xt=null,_t=new ue(0,0,Z,ot),$t=new ue(0,0,Z,ot),Ft=!1,Ht=new ds,Vt=!1,Gt=!1,le=new oe,Qt=new L,_e=new ue,we={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Zt=!1;function fe(){return K===null?nt:1}let D=n;function he(_,N){return e.getContext(_,N)}try{let _={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${no}`),e.addEventListener("webglcontextlost",pe,!1),e.addEventListener("webglcontextrestored",re,!1),e.addEventListener("webglcontextcreationerror",mn,!1),D===null){let N="webgl2";if(D=he(N,_),D===null)throw he(N)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(_){throw Pt("WebGLRenderer: "+_.message),_}let Jt,w,g,U,z,W,it,at,X,J,lt,Mt,Q,st,Tt,Ct,Nt,I,rt,j,ht,gt,tt;function wt(){Jt=new _0(D),Jt.init(),ht=new ry(D,Jt),w=new u0(D,Jt,t,ht),g=new iy(D,Jt),w.reversedDepthBuffer&&u&&g.buffers.depth.setReversed(!0),q=D.createFramebuffer(),Y=D.createFramebuffer(),k=D.createFramebuffer(),U=new S0(D),z=new Gx,W=new sy(D,Jt,g,z,w,ht,U),it=new y0(R),at=new Tp(D),gt=new c0(D,at),X=new v0(D,at,U,gt),J=new w0(D,X,at,gt,U),I=new M0(D,w,W),Tt=new d0(z),lt=new Vx(R,it,Jt,w,gt,Tt),Mt=new cy(R,z),Q=new Xx,st=new Jx(Jt),Nt=new l0(R,it,g,J,x,l),Ct=new ny(R,J,w),tt=new hy(D,U,w,g),rt=new h0(D,Jt,U),j=new b0(D,Jt,U),U.programs=lt.programs,R.capabilities=w,R.extensions=Jt,R.properties=z,R.renderLists=Q,R.shadowMap=Ct,R.state=g,R.info=U}wt(),v!==$e&&(E=new T0(v,e.width,e.height,o,s,r));let bt=new Jc(R,D);this.xr=bt,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){let _=Jt.get("WEBGL_lose_context");_&&_.loseContext()},this.forceContextRestore=function(){let _=Jt.get("WEBGL_lose_context");_&&_.restoreContext()},this.getPixelRatio=function(){return nt},this.setPixelRatio=function(_){_!==void 0&&(nt=_,this.setSize(Z,ot,!1))},this.getSize=function(_){return _.set(Z,ot)},this.setSize=function(_,N,H=!0){if(bt.isPresenting){Rt("WebGLRenderer: Can't change size while VR device is presenting.");return}Z=_,ot=N,e.width=Math.floor(_*nt),e.height=Math.floor(N*nt),H===!0&&(e.style.width=_+"px",e.style.height=N+"px"),E!==null&&E.setSize(e.width,e.height),this.setViewport(0,0,_,N)},this.getDrawingBufferSize=function(_){return _.set(Z*nt,ot*nt).floor()},this.setDrawingBufferSize=function(_,N,H){Z=_,ot=N,nt=H,e.width=Math.floor(_*H),e.height=Math.floor(N*H),this.setViewport(0,0,_,N)},this.setEffects=function(_){if(v===$e){Pt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(_){for(let N=0;N<_.length;N++)if(_[N].isOutputPass===!0){Rt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}E.setEffects(_||[])},this.getCurrentViewport=function(_){return _.copy(dt)},this.getViewport=function(_){return _.copy(_t)},this.setViewport=function(_,N,H,O){_.isVector4?_t.set(_.x,_.y,_.z,_.w):_t.set(_,N,H,O),g.viewport(dt.copy(_t).multiplyScalar(nt).round())},this.getScissor=function(_){return _.copy($t)},this.setScissor=function(_,N,H,O){_.isVector4?$t.set(_.x,_.y,_.z,_.w):$t.set(_,N,H,O),g.scissor(mt.copy($t).multiplyScalar(nt).round())},this.getScissorTest=function(){return Ft},this.setScissorTest=function(_){g.setScissorTest(Ft=_)},this.setOpaqueSort=function(_){$=_},this.setTransparentSort=function(_){xt=_},this.getClearColor=function(_){return _.copy(Nt.getClearColor())},this.setClearColor=function(){Nt.setClearColor(...arguments)},this.getClearAlpha=function(){return Nt.getClearAlpha()},this.setClearAlpha=function(){Nt.setClearAlpha(...arguments)},this.clear=function(_=!0,N=!0,H=!0){let O=0;if(_){let B=!1;if(K!==null){let pt=K.texture.format;B=p.has(pt)}if(B){let pt=K.texture.type,vt=f.has(pt),ft=Nt.getClearColor(),St=Nt.getClearAlpha(),Et=ft.r,Ot=ft.g,kt=ft.b;vt?(S[0]=Et,S[1]=Ot,S[2]=kt,S[3]=St,D.clearBufferuiv(D.COLOR,0,S)):(T[0]=Et,T[1]=Ot,T[2]=kt,T[3]=St,D.clearBufferiv(D.COLOR,0,T))}else O|=D.COLOR_BUFFER_BIT}N&&(O|=D.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),H&&(O|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O!==0&&D.clear(O)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(_){_.setRenderer(this),F=_},this.dispose=function(){e.removeEventListener("webglcontextlost",pe,!1),e.removeEventListener("webglcontextrestored",re,!1),e.removeEventListener("webglcontextcreationerror",mn,!1),Nt.dispose(),Q.dispose(),st.dispose(),z.dispose(),it.dispose(),J.dispose(),gt.dispose(),tt.dispose(),lt.dispose(),bt.dispose(),bt.removeEventListener("sessionstart",mh),bt.removeEventListener("sessionend",gh),_i.stop()};function pe(_){_.preventDefault(),Ys("WebGLRenderer: Context Lost."),P=!0}function re(){Ys("WebGLRenderer: Context Restored."),P=!1;let _=U.autoReset,N=Ct.enabled,H=Ct.autoUpdate,O=Ct.needsUpdate,B=Ct.type;wt(),U.autoReset=_,Ct.enabled=N,Ct.autoUpdate=H,Ct.needsUpdate=O,Ct.type=B}function mn(_){Pt("WebGLRenderer: A WebGL context could not be created. Reason: ",_.statusMessage)}function gn(_){let N=_.target;N.removeEventListener("dispose",gn),Df(N)}function Df(_){Nf(_),z.remove(_)}function Nf(_){let N=z.get(_).programs;N!==void 0&&(N.forEach(function(H){lt.releaseProgram(H)}),_.isShaderMaterial&&lt.releaseShaderCache(_))}this.renderBufferDirect=function(_,N,H,O,B,pt){N===null&&(N=we);let vt=B.isMesh&&B.matrixWorld.determinantAffine()<0,ft=Of(_,N,H,O,B);g.setMaterial(O,vt);let St=H.index,Et=1;if(O.wireframe===!0){if(St=X.getWireframeAttribute(H),St===void 0)return;Et=2}let Ot=H.drawRange,kt=H.attributes.position,At=Ot.start*Et,te=(Ot.start+Ot.count)*Et;pt!==null&&(At=Math.max(At,pt.start*Et),te=Math.min(te,(pt.start+pt.count)*Et)),St!==null?(At=Math.max(At,0),te=Math.min(te,St.count)):kt!=null&&(At=Math.max(At,0),te=Math.min(te,kt.count));let ve=te-At;if(ve<0||ve===1/0)return;gt.setup(B,O,ft,H,St);let me,ne=rt;if(St!==null&&(me=at.get(St),ne=j,ne.setIndex(me)),B.isMesh)O.wireframe===!0?(g.setLineWidth(O.wireframeLinewidth*fe()),ne.setMode(D.LINES)):ne.setMode(D.TRIANGLES);else if(B.isLine){let Fe=O.linewidth;Fe===void 0&&(Fe=1),g.setLineWidth(Fe*fe()),B.isLineSegments?ne.setMode(D.LINES):B.isLineLoop?ne.setMode(D.LINE_LOOP):ne.setMode(D.LINE_STRIP)}else B.isPoints?ne.setMode(D.POINTS):B.isSprite&&ne.setMode(D.TRIANGLES);if(B.isBatchedMesh)if(Jt.get("WEBGL_multi_draw"))ne.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{let Fe=B._multiDrawStarts,yt=B._multiDrawCounts,qe=B._multiDrawCount,Yt=St?at.get(St).bytesPerElement:1,tn=z.get(O).currentProgram.getUniforms();for(let xn=0;xn<qe;xn++)tn.setValue(D,"_gl_DrawID",xn),ne.render(Fe[xn]/Yt,yt[xn])}else if(B.isInstancedMesh)ne.renderInstances(At,ve,B.count);else if(H.isInstancedBufferGeometry){let Fe=H._maxInstanceCount!==void 0?H._maxInstanceCount:1/0,yt=Math.min(H.instanceCount,Fe);ne.renderInstances(At,ve,yt)}else ne.render(At,ve)};function ph(_,N,H){_.transparent===!0&&_.side===nn&&_.forceSinglePass===!1?(_.side=Ne,_.needsUpdate=!0,zr(_,N,H),_.side=kn,_.needsUpdate=!0,zr(_,N,H),_.side=nn):zr(_,N,H)}this.compile=function(_,N,H=null){H===null&&(H=_),M=st.get(H),M.init(N),y.push(M),H.traverseVisible(function(B){B.isLight&&B.layers.test(N.layers)&&(M.pushLight(B),B.castShadow&&M.pushShadow(B))}),_!==H&&_.traverseVisible(function(B){B.isLight&&B.layers.test(N.layers)&&(M.pushLight(B),B.castShadow&&M.pushShadow(B))}),M.setupLights();let O=new Set;return _.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;let pt=B.material;if(pt)if(Array.isArray(pt))for(let vt=0;vt<pt.length;vt++){let ft=pt[vt];ph(ft,H,B),O.add(ft)}else ph(pt,H,B),O.add(pt)}),M=y.pop(),O},this.compileAsync=function(_,N,H=null){let O=this.compile(_,N,H);return new Promise(B=>{function pt(){if(O.forEach(function(vt){z.get(vt).currentProgram.isReady()&&O.delete(vt)}),O.size===0){B(_);return}setTimeout(pt,10)}Jt.get("KHR_parallel_shader_compile")!==null?pt():setTimeout(pt,10)})};let wl=null;function Uf(_){wl&&wl(_)}function mh(){_i.stop()}function gh(){_i.start()}let _i=new od;_i.setAnimationLoop(Uf),typeof self<"u"&&_i.setContext(self),this.setAnimationLoop=function(_){wl=_,bt.setAnimationLoop(_),_===null?_i.stop():_i.start()},bt.addEventListener("sessionstart",mh),bt.addEventListener("sessionend",gh),this.render=function(_,N){if(N!==void 0&&N.isCamera!==!0){Pt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;F!==null&&F.renderStart(_,N);let H=bt.enabled===!0&&bt.isPresenting===!0,O=E!==null&&(K===null||H)&&E.begin(R,K);if(_.matrixWorldAutoUpdate===!0&&_.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),bt.enabled===!0&&bt.isPresenting===!0&&(E===null||E.isCompositing()===!1)&&(bt.cameraAutoUpdate===!0&&bt.updateCamera(N),N=bt.getCamera()),_.isScene===!0&&_.onBeforeRender(R,_,N,K),M=st.get(_,y.length),M.init(N),M.state.textureUnits=W.getTextureUnits(),y.push(M),le.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),Ht.setFromProjectionMatrix(le,cn,N.reversedDepth),Gt=this.localClippingEnabled,Vt=Tt.init(this.clippingPlanes,Gt),A=Q.get(_,C.length),A.init(),C.push(A),bt.enabled===!0&&bt.isPresenting===!0){let vt=R.xr.getDepthSensingMesh();vt!==null&&El(vt,N,-1/0,R.sortObjects)}El(_,N,0,R.sortObjects),A.finish(),R.sortObjects===!0&&A.sort($,xt,N.reversedDepth),Zt=bt.enabled===!1||bt.isPresenting===!1||bt.hasDepthSensing()===!1,Zt&&Nt.addToRenderList(A,_),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Vt===!0&&Tt.beginShadows();let B=M.state.shadowsArray;if(Ct.render(B,_,N),Vt===!0&&Tt.endShadows(),(O&&E.hasRenderPass())===!1){let vt=A.opaque,ft=A.transmissive;if(M.setupLights(),N.isArrayCamera){let St=N.cameras;if(ft.length>0)for(let Et=0,Ot=St.length;Et<Ot;Et++){let kt=St[Et];yh(vt,ft,_,kt)}Zt&&Nt.render(_);for(let Et=0,Ot=St.length;Et<Ot;Et++){let kt=St[Et];xh(A,_,kt,kt.viewport)}}else ft.length>0&&yh(vt,ft,_,N),Zt&&Nt.render(_),xh(A,_,N)}K!==null&&V===0&&(W.updateMultisampleRenderTarget(K),W.updateRenderTargetMipmap(K)),O&&E.end(R),_.isScene===!0&&_.onAfterRender(R,_,N),gt.resetDefaultState(),et=-1,ct=null,y.pop(),y.length>0?(M=y[y.length-1],W.setTextureUnits(M.state.textureUnits),Vt===!0&&Tt.setGlobalState(R.clippingPlanes,M.state.camera)):M=null,C.pop(),C.length>0?A=C[C.length-1]:A=null,F!==null&&F.renderEnd()};function El(_,N,H,O){if(_.visible===!1)return;if(_.layers.test(N.layers)){if(_.isGroup)H=_.renderOrder;else if(_.isLOD)_.autoUpdate===!0&&_.update(N);else if(_.isLightProbeGrid)M.pushLightProbeGrid(_);else if(_.isLight)M.pushLight(_),_.castShadow&&M.pushShadow(_);else if(_.isSprite){if(!_.frustumCulled||Ht.intersectsSprite(_)){O&&_e.setFromMatrixPosition(_.matrixWorld).applyMatrix4(le);let vt=J.update(_),ft=_.material;ft.visible&&A.push(_,vt,ft,H,_e.z,null)}}else if((_.isMesh||_.isLine||_.isPoints)&&(!_.frustumCulled||Ht.intersectsObject(_))){let vt=J.update(_),ft=_.material;if(O&&(_.boundingSphere!==void 0?(_.boundingSphere===null&&_.computeBoundingSphere(),_e.copy(_.boundingSphere.center)):(vt.boundingSphere===null&&vt.computeBoundingSphere(),_e.copy(vt.boundingSphere.center)),_e.applyMatrix4(_.matrixWorld).applyMatrix4(le)),Array.isArray(ft)){let St=vt.groups;for(let Et=0,Ot=St.length;Et<Ot;Et++){let kt=St[Et],At=ft[kt.materialIndex];At&&At.visible&&A.push(_,vt,At,H,_e.z,kt)}}else ft.visible&&A.push(_,vt,ft,H,_e.z,null)}}let pt=_.children;for(let vt=0,ft=pt.length;vt<ft;vt++)El(pt[vt],N,H,O)}function xh(_,N,H,O){let{opaque:B,transmissive:pt,transparent:vt}=_;M.setupLightsView(H),Vt===!0&&Tt.setGlobalState(R.clippingPlanes,H),O&&g.viewport(dt.copy(O)),B.length>0&&kr(B,N,H),pt.length>0&&kr(pt,N,H),vt.length>0&&kr(vt,N,H),g.buffers.depth.setTest(!0),g.buffers.depth.setMask(!0),g.buffers.color.setMask(!0),g.setPolygonOffset(!1)}function yh(_,N,H,O){if((H.isScene===!0?H.overrideMaterial:null)!==null)return;if(M.state.transmissionRenderTarget[O.id]===void 0){let At=Jt.has("EXT_color_buffer_half_float")||Jt.has("EXT_color_buffer_float");M.state.transmissionRenderTarget[O.id]=new Ke(1,1,{generateMipmaps:!0,type:At?An:$e,minFilter:ui,samples:Math.max(4,w.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Wt.workingColorSpace})}let pt=M.state.transmissionRenderTarget[O.id],vt=O.viewport||dt;pt.setSize(vt.z*R.transmissionResolutionScale,vt.w*R.transmissionResolutionScale);let ft=R.getRenderTarget(),St=R.getActiveCubeFace(),Et=R.getActiveMipmapLevel();R.setRenderTarget(pt),R.getClearColor(Lt),qt=R.getClearAlpha(),qt<1&&R.setClearColor(16777215,.5),R.clear(),Zt&&Nt.render(H);let Ot=R.toneMapping;R.toneMapping=dn;let kt=O.viewport;if(O.viewport!==void 0&&(O.viewport=void 0),M.setupLightsView(O),Vt===!0&&Tt.setGlobalState(R.clippingPlanes,O),kr(_,H,O),W.updateMultisampleRenderTarget(pt),W.updateRenderTargetMipmap(pt),Jt.has("WEBGL_multisampled_render_to_texture")===!1){let At=!1;for(let te=0,ve=N.length;te<ve;te++){let me=N[te],{object:ne,geometry:Fe,material:yt,group:qe}=me;if(yt.side===nn&&ne.layers.test(O.layers)){let Yt=yt.side;yt.side=Ne,yt.needsUpdate=!0,_h(ne,H,O,Fe,yt,qe),yt.side=Yt,yt.needsUpdate=!0,At=!0}}At===!0&&(W.updateMultisampleRenderTarget(pt),W.updateRenderTargetMipmap(pt))}R.setRenderTarget(ft,St,Et),R.setClearColor(Lt,qt),kt!==void 0&&(O.viewport=kt),R.toneMapping=Ot}function kr(_,N,H){let O=N.isScene===!0?N.overrideMaterial:null;for(let B=0,pt=_.length;B<pt;B++){let vt=_[B],{object:ft,geometry:St,group:Et}=vt,Ot=vt.material;Ot.allowOverride===!0&&O!==null&&(Ot=O),ft.layers.test(H.layers)&&_h(ft,N,H,St,Ot,Et)}}function _h(_,N,H,O,B,pt){_.onBeforeRender(R,N,H,O,B,pt),_.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,_.matrixWorld),_.normalMatrix.getNormalMatrix(_.modelViewMatrix),B.onBeforeRender(R,N,H,O,_,pt),B.transparent===!0&&B.side===nn&&B.forceSinglePass===!1?(B.side=Ne,B.needsUpdate=!0,R.renderBufferDirect(H,N,O,B,_,pt),B.side=kn,B.needsUpdate=!0,R.renderBufferDirect(H,N,O,B,_,pt),B.side=nn):R.renderBufferDirect(H,N,O,B,_,pt),_.onAfterRender(R,N,H,O,B,pt)}function zr(_,N,H){N.isScene!==!0&&(N=we);let O=z.get(_),B=M.state.lights,pt=M.state.shadowsArray,vt=B.state.version,ft=lt.getParameters(_,B.state,pt,N,H,M.state.lightProbeGridArray),St=lt.getProgramCacheKey(ft),Et=O.programs;O.environment=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?N.environment:null,O.fog=N.fog;let Ot=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap;O.envMap=it.get(_.envMap||O.environment,Ot),O.envMapRotation=O.environment!==null&&_.envMap===null?N.environmentRotation:_.envMapRotation,Et===void 0&&(_.addEventListener("dispose",gn),Et=new Map,O.programs=Et);let kt=Et.get(St);if(kt!==void 0){if(O.currentProgram===kt&&O.lightsStateVersion===vt)return bh(_,ft),kt}else ft.uniforms=lt.getUniforms(_),F!==null&&_.isNodeMaterial&&F.build(_,H,ft),_.onBeforeCompile(ft,R),kt=lt.acquireProgram(ft,St),Et.set(St,kt),O.uniforms=ft.uniforms;let At=O.uniforms;return(!_.isShaderMaterial&&!_.isRawShaderMaterial||_.clipping===!0)&&(At.clippingPlanes=Tt.uniform),bh(_,ft),O.needsLights=kf(_),O.lightsStateVersion=vt,O.needsLights&&(At.ambientLightColor.value=B.state.ambient,At.lightProbe.value=B.state.probe,At.directionalLights.value=B.state.directional,At.directionalLightShadows.value=B.state.directionalShadow,At.spotLights.value=B.state.spot,At.spotLightShadows.value=B.state.spotShadow,At.rectAreaLights.value=B.state.rectArea,At.ltc_1.value=B.state.rectAreaLTC1,At.ltc_2.value=B.state.rectAreaLTC2,At.pointLights.value=B.state.point,At.pointLightShadows.value=B.state.pointShadow,At.hemisphereLights.value=B.state.hemi,At.directionalShadowMatrix.value=B.state.directionalShadowMatrix,At.spotLightMatrix.value=B.state.spotLightMatrix,At.spotLightMap.value=B.state.spotLightMap,At.pointShadowMatrix.value=B.state.pointShadowMatrix),O.lightProbeGrid=M.state.lightProbeGridArray.length>0,O.currentProgram=kt,O.uniformsList=null,kt}function vh(_){if(_.uniformsList===null){let N=_.currentProgram.getUniforms();_.uniformsList=vs.seqWithValue(N.seq,_.uniforms)}return _.uniformsList}function bh(_,N){let H=z.get(_);H.outputColorSpace=N.outputColorSpace,H.batching=N.batching,H.batchingColor=N.batchingColor,H.instancing=N.instancing,H.instancingColor=N.instancingColor,H.instancingMorph=N.instancingMorph,H.skinning=N.skinning,H.morphTargets=N.morphTargets,H.morphNormals=N.morphNormals,H.morphColors=N.morphColors,H.morphTargetsCount=N.morphTargetsCount,H.numClippingPlanes=N.numClippingPlanes,H.numIntersection=N.numClipIntersection,H.vertexAlphas=N.vertexAlphas,H.vertexTangents=N.vertexTangents,H.toneMapping=N.toneMapping}function Ff(_,N){if(_.length===0)return null;if(_.length===1)return _[0].texture!==null?_[0]:null;b.setFromMatrixPosition(N.matrixWorld);for(let H=0,O=_.length;H<O;H++){let B=_[H];if(B.texture!==null&&B.boundingBox.containsPoint(b))return B}return null}function Of(_,N,H,O,B){N.isScene!==!0&&(N=we),W.resetTextureUnits();let pt=N.fog,vt=O.isMeshStandardMaterial||O.isMeshLambertMaterial||O.isMeshPhongMaterial?N.environment:null,ft=K===null?R.outputColorSpace:K.isXRRenderTarget===!0?K.texture.colorSpace:Wt.workingColorSpace,St=O.isMeshStandardMaterial||O.isMeshLambertMaterial&&!O.envMap||O.isMeshPhongMaterial&&!O.envMap,Et=it.get(O.envMap||vt,St),Ot=O.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,kt=!!H.attributes.tangent&&(!!O.normalMap||O.anisotropy>0),At=!!H.morphAttributes.position,te=!!H.morphAttributes.normal,ve=!!H.morphAttributes.color,me=dn;O.toneMapped&&(K===null||K.isXRRenderTarget===!0)&&(me=R.toneMapping);let ne=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,Fe=ne!==void 0?ne.length:0,yt=z.get(O),qe=M.state.lights;if(Vt===!0&&(Gt===!0||_!==ct)){let ae=_===ct&&O.id===et;Tt.setState(O,_,ae)}let Yt=!1;O.version===yt.__version?(yt.needsLights&&yt.lightsStateVersion!==qe.state.version||yt.outputColorSpace!==ft||B.isBatchedMesh&&yt.batching===!1||!B.isBatchedMesh&&yt.batching===!0||B.isBatchedMesh&&yt.batchingColor===!0&&B.colorTexture===null||B.isBatchedMesh&&yt.batchingColor===!1&&B.colorTexture!==null||B.isInstancedMesh&&yt.instancing===!1||!B.isInstancedMesh&&yt.instancing===!0||B.isSkinnedMesh&&yt.skinning===!1||!B.isSkinnedMesh&&yt.skinning===!0||B.isInstancedMesh&&yt.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&yt.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&yt.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&yt.instancingMorph===!1&&B.morphTexture!==null||yt.envMap!==Et||O.fog===!0&&yt.fog!==pt||yt.numClippingPlanes!==void 0&&(yt.numClippingPlanes!==Tt.numPlanes||yt.numIntersection!==Tt.numIntersection)||yt.vertexAlphas!==Ot||yt.vertexTangents!==kt||yt.morphTargets!==At||yt.morphNormals!==te||yt.morphColors!==ve||yt.toneMapping!==me||yt.morphTargetsCount!==Fe||!!yt.lightProbeGrid!=M.state.lightProbeGridArray.length>0)&&(Yt=!0):(Yt=!0,yt.__version=O.version);let tn=yt.currentProgram;Yt===!0&&(tn=zr(O,N,B),F&&O.isNodeMaterial&&F.onUpdateProgram(O,tn,yt));let xn=!1,$n=!1,ki=!1,ie=tn.getUniforms(),be=yt.uniforms;if(g.useProgram(tn.program)&&(xn=!0,$n=!0,ki=!0),O.id!==et&&(et=O.id,$n=!0),yt.needsLights){let ae=Ff(M.state.lightProbeGridArray,B);yt.lightProbeGrid!==ae&&(yt.lightProbeGrid=ae,$n=!0)}if(xn||ct!==_){g.buffers.depth.getReversed()&&_.reversedDepth!==!0&&(_._reversedDepth=!0,_.updateProjectionMatrix()),ie.setValue(D,"projectionMatrix",_.projectionMatrix),ie.setValue(D,"viewMatrix",_.matrixWorldInverse);let Yn=ie.map.cameraPosition;Yn!==void 0&&Yn.setValue(D,Qt.setFromMatrixPosition(_.matrixWorld)),w.logarithmicDepthBuffer&&ie.setValue(D,"logDepthBufFC",2/(Math.log(_.far+1)/Math.LN2)),(O.isMeshPhongMaterial||O.isMeshToonMaterial||O.isMeshLambertMaterial||O.isMeshBasicMaterial||O.isMeshStandardMaterial||O.isShaderMaterial)&&ie.setValue(D,"isOrthographic",_.isOrthographicCamera===!0),ct!==_&&(ct=_,$n=!0,ki=!0)}if(yt.needsLights&&(qe.state.directionalShadowMap.length>0&&ie.setValue(D,"directionalShadowMap",qe.state.directionalShadowMap,W),qe.state.spotShadowMap.length>0&&ie.setValue(D,"spotShadowMap",qe.state.spotShadowMap,W),qe.state.pointShadowMap.length>0&&ie.setValue(D,"pointShadowMap",qe.state.pointShadowMap,W)),B.isSkinnedMesh){ie.setOptional(D,B,"bindMatrix"),ie.setOptional(D,B,"bindMatrixInverse");let ae=B.skeleton;ae&&(ae.boneTexture===null&&ae.computeBoneTexture(),ie.setValue(D,"boneTexture",ae.boneTexture,W))}B.isBatchedMesh&&(ie.setOptional(D,B,"batchingTexture"),ie.setValue(D,"batchingTexture",B._matricesTexture,W),ie.setOptional(D,B,"batchingIdTexture"),ie.setValue(D,"batchingIdTexture",B._indirectTexture,W),ie.setOptional(D,B,"batchingColorTexture"),B._colorsTexture!==null&&ie.setValue(D,"batchingColorTexture",B._colorsTexture,W));let qn=H.morphAttributes;if((qn.position!==void 0||qn.normal!==void 0||qn.color!==void 0)&&I.update(B,H,tn),($n||yt.receiveShadow!==B.receiveShadow)&&(yt.receiveShadow=B.receiveShadow,ie.setValue(D,"receiveShadow",B.receiveShadow)),(O.isMeshStandardMaterial||O.isMeshLambertMaterial||O.isMeshPhongMaterial)&&O.envMap===null&&N.environment!==null&&(be.envMapIntensity.value=N.environmentIntensity),be.dfgLUT!==void 0&&(be.dfgLUT.value=dy()),$n){if(ie.setValue(D,"toneMappingExposure",R.toneMappingExposure),yt.needsLights&&Bf(be,ki),pt&&O.fog===!0&&Mt.refreshFogUniforms(be,pt),Mt.refreshMaterialUniforms(be,O,nt,ot,M.state.transmissionRenderTarget[_.id]),yt.needsLights&&yt.lightProbeGrid){let ae=yt.lightProbeGrid;be.probesSH.value=ae.texture,be.probesMin.value.copy(ae.boundingBox.min),be.probesMax.value.copy(ae.boundingBox.max),be.probesResolution.value.copy(ae.resolution)}vs.upload(D,vh(yt),be,W)}if(O.isShaderMaterial&&O.uniformsNeedUpdate===!0&&(vs.upload(D,vh(yt),be,W),O.uniformsNeedUpdate=!1),O.isSpriteMaterial&&ie.setValue(D,"center",B.center),ie.setValue(D,"modelViewMatrix",B.modelViewMatrix),ie.setValue(D,"normalMatrix",B.normalMatrix),ie.setValue(D,"modelMatrix",B.matrixWorld),O.uniformsGroups!==void 0){let ae=O.uniformsGroups;for(let Yn=0,zi=ae.length;Yn<zi;Yn++){let Sh=ae[Yn];tt.update(Sh,tn),tt.bind(Sh,tn)}}return tn}function Bf(_,N){_.ambientLightColor.needsUpdate=N,_.lightProbe.needsUpdate=N,_.directionalLights.needsUpdate=N,_.directionalLightShadows.needsUpdate=N,_.pointLights.needsUpdate=N,_.pointLightShadows.needsUpdate=N,_.spotLights.needsUpdate=N,_.spotLightShadows.needsUpdate=N,_.rectAreaLights.needsUpdate=N,_.hemisphereLights.needsUpdate=N}function kf(_){return _.isMeshLambertMaterial||_.isMeshToonMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isShadowMaterial||_.isShaderMaterial&&_.lights===!0}this.getActiveCubeFace=function(){return G},this.getActiveMipmapLevel=function(){return V},this.getRenderTarget=function(){return K},this.setRenderTargetTextures=function(_,N,H){let O=z.get(_);O.__autoAllocateDepthBuffer=_.resolveDepthBuffer===!1,O.__autoAllocateDepthBuffer===!1&&(O.__useRenderToTexture=!1),z.get(_.texture).__webglTexture=N,z.get(_.depthTexture).__webglTexture=O.__autoAllocateDepthBuffer?void 0:H,O.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(_,N){let H=z.get(_);H.__webglFramebuffer=N,H.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(_,N=0,H=0){K=_,G=N,V=H;let O=null,B=!1,pt=!1;if(_){let ft=z.get(_);if(ft.__useDefaultFramebuffer!==void 0){g.bindFramebuffer(D.FRAMEBUFFER,ft.__webglFramebuffer),dt.copy(_.viewport),mt.copy(_.scissor),zt=_.scissorTest,g.viewport(dt),g.scissor(mt),g.setScissorTest(zt),et=-1;return}else if(ft.__webglFramebuffer===void 0)W.setupRenderTarget(_);else if(ft.__hasExternalTextures)W.rebindTextures(_,z.get(_.texture).__webglTexture,z.get(_.depthTexture).__webglTexture);else if(_.depthBuffer){let Ot=_.depthTexture;if(ft.__boundDepthTexture!==Ot){if(Ot!==null&&z.has(Ot)&&(_.width!==Ot.image.width||_.height!==Ot.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");W.setupDepthRenderbuffer(_)}}let St=_.texture;(St.isData3DTexture||St.isDataArrayTexture||St.isCompressedArrayTexture)&&(pt=!0);let Et=z.get(_).__webglFramebuffer;_.isWebGLCubeRenderTarget?(Array.isArray(Et[N])?O=Et[N][H]:O=Et[N],B=!0):_.samples>0&&W.useMultisampledRTT(_)===!1?O=z.get(_).__webglMultisampledFramebuffer:Array.isArray(Et)?O=Et[H]:O=Et,dt.copy(_.viewport),mt.copy(_.scissor),zt=_.scissorTest}else dt.copy(_t).multiplyScalar(nt).floor(),mt.copy($t).multiplyScalar(nt).floor(),zt=Ft;if(H!==0&&(O=q),g.bindFramebuffer(D.FRAMEBUFFER,O)&&g.drawBuffers(_,O),g.viewport(dt),g.scissor(mt),g.setScissorTest(zt),B){let ft=z.get(_.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+N,ft.__webglTexture,H)}else if(pt){let ft=N;for(let St=0;St<_.textures.length;St++){let Et=z.get(_.textures[St]);D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0+St,Et.__webglTexture,H,ft)}}else if(_!==null&&H!==0){let ft=z.get(_.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,ft.__webglTexture,H)}et=-1},this.readRenderTargetPixels=function(_,N,H,O,B,pt,vt,ft=0){if(!(_&&_.isWebGLRenderTarget)){Pt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let St=z.get(_).__webglFramebuffer;if(_.isWebGLCubeRenderTarget&&vt!==void 0&&(St=St[vt]),St){g.bindFramebuffer(D.FRAMEBUFFER,St);try{let Et=_.textures[ft],Ot=Et.format,kt=Et.type;if(_.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+ft),!w.textureFormatReadable(Ot)){Pt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!w.textureTypeReadable(kt)){Pt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=_.width-O&&H>=0&&H<=_.height-B&&D.readPixels(N,H,O,B,ht.convert(Ot),ht.convert(kt),pt)}finally{let Et=K!==null?z.get(K).__webglFramebuffer:null;g.bindFramebuffer(D.FRAMEBUFFER,Et)}}},this.readRenderTargetPixelsAsync=async function(_,N,H,O,B,pt,vt,ft=0){if(!(_&&_.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let St=z.get(_).__webglFramebuffer;if(_.isWebGLCubeRenderTarget&&vt!==void 0&&(St=St[vt]),St)if(N>=0&&N<=_.width-O&&H>=0&&H<=_.height-B){g.bindFramebuffer(D.FRAMEBUFFER,St);let Et=_.textures[ft],Ot=Et.format,kt=Et.type;if(_.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+ft),!w.textureFormatReadable(Ot))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!w.textureTypeReadable(kt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let At=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,At),D.bufferData(D.PIXEL_PACK_BUFFER,pt.byteLength,D.STREAM_READ),D.readPixels(N,H,O,B,ht.convert(Ot),ht.convert(kt),0);let te=K!==null?z.get(K).__webglFramebuffer:null;g.bindFramebuffer(D.FRAMEBUFFER,te);let ve=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await Du(D,ve,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,At),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,pt),D.deleteBuffer(At),D.deleteSync(ve),pt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(_,N=null,H=0){let O=Math.pow(2,-H),B=Math.floor(_.image.width*O),pt=Math.floor(_.image.height*O),vt=N!==null?N.x:0,ft=N!==null?N.y:0;W.setTexture2D(_,0),D.copyTexSubImage2D(D.TEXTURE_2D,H,0,0,vt,ft,B,pt),g.unbindTexture()},this.copyTextureToTexture=function(_,N,H=null,O=null,B=0,pt=0){let vt,ft,St,Et,Ot,kt,At,te,ve,me=_.isCompressedTexture?_.mipmaps[pt]:_.image;if(H!==null)vt=H.max.x-H.min.x,ft=H.max.y-H.min.y,St=H.isBox3?H.max.z-H.min.z:1,Et=H.min.x,Ot=H.min.y,kt=H.isBox3?H.min.z:0;else{let be=Math.pow(2,-B);vt=Math.floor(me.width*be),ft=Math.floor(me.height*be),_.isDataArrayTexture?St=me.depth:_.isData3DTexture?St=Math.floor(me.depth*be):St=1,Et=0,Ot=0,kt=0}O!==null?(At=O.x,te=O.y,ve=O.z):(At=0,te=0,ve=0);let ne=ht.convert(N.format),Fe=ht.convert(N.type),yt;N.isData3DTexture?(W.setTexture3D(N,0),yt=D.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(W.setTexture2DArray(N,0),yt=D.TEXTURE_2D_ARRAY):(W.setTexture2D(N,0),yt=D.TEXTURE_2D),g.activeTexture(D.TEXTURE0),g.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,N.flipY),g.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),g.pixelStorei(D.UNPACK_ALIGNMENT,N.unpackAlignment);let qe=g.getParameter(D.UNPACK_ROW_LENGTH),Yt=g.getParameter(D.UNPACK_IMAGE_HEIGHT),tn=g.getParameter(D.UNPACK_SKIP_PIXELS),xn=g.getParameter(D.UNPACK_SKIP_ROWS),$n=g.getParameter(D.UNPACK_SKIP_IMAGES);g.pixelStorei(D.UNPACK_ROW_LENGTH,me.width),g.pixelStorei(D.UNPACK_IMAGE_HEIGHT,me.height),g.pixelStorei(D.UNPACK_SKIP_PIXELS,Et),g.pixelStorei(D.UNPACK_SKIP_ROWS,Ot),g.pixelStorei(D.UNPACK_SKIP_IMAGES,kt);let ki=_.isDataArrayTexture||_.isData3DTexture,ie=N.isDataArrayTexture||N.isData3DTexture;if(_.isDepthTexture){let be=z.get(_),qn=z.get(N),ae=z.get(be.__renderTarget),Yn=z.get(qn.__renderTarget);g.bindFramebuffer(D.READ_FRAMEBUFFER,ae.__webglFramebuffer),g.bindFramebuffer(D.DRAW_FRAMEBUFFER,Yn.__webglFramebuffer);for(let zi=0;zi<St;zi++)ki&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,z.get(_).__webglTexture,B,kt+zi),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,z.get(N).__webglTexture,pt,ve+zi)),D.blitFramebuffer(Et,Ot,vt,ft,At,te,vt,ft,D.DEPTH_BUFFER_BIT,D.NEAREST);g.bindFramebuffer(D.READ_FRAMEBUFFER,null),g.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(B!==0||_.isRenderTargetTexture||z.has(_)){let be=z.get(_),qn=z.get(N);g.bindFramebuffer(D.READ_FRAMEBUFFER,Y),g.bindFramebuffer(D.DRAW_FRAMEBUFFER,k);for(let ae=0;ae<St;ae++)ki?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,be.__webglTexture,B,kt+ae):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,be.__webglTexture,B),ie?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,qn.__webglTexture,pt,ve+ae):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,qn.__webglTexture,pt),B!==0?D.blitFramebuffer(Et,Ot,vt,ft,At,te,vt,ft,D.COLOR_BUFFER_BIT,D.NEAREST):ie?D.copyTexSubImage3D(yt,pt,At,te,ve+ae,Et,Ot,vt,ft):D.copyTexSubImage2D(yt,pt,At,te,Et,Ot,vt,ft);g.bindFramebuffer(D.READ_FRAMEBUFFER,null),g.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else ie?_.isDataTexture||_.isData3DTexture?D.texSubImage3D(yt,pt,At,te,ve,vt,ft,St,ne,Fe,me.data):N.isCompressedArrayTexture?D.compressedTexSubImage3D(yt,pt,At,te,ve,vt,ft,St,ne,me.data):D.texSubImage3D(yt,pt,At,te,ve,vt,ft,St,ne,Fe,me):_.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,pt,At,te,vt,ft,ne,Fe,me.data):_.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,pt,At,te,me.width,me.height,ne,me.data):D.texSubImage2D(D.TEXTURE_2D,pt,At,te,vt,ft,ne,Fe,me);g.pixelStorei(D.UNPACK_ROW_LENGTH,qe),g.pixelStorei(D.UNPACK_IMAGE_HEIGHT,Yt),g.pixelStorei(D.UNPACK_SKIP_PIXELS,tn),g.pixelStorei(D.UNPACK_SKIP_ROWS,xn),g.pixelStorei(D.UNPACK_SKIP_IMAGES,$n),pt===0&&N.generateMipmaps&&D.generateMipmap(yt),g.unbindTexture()},this.initRenderTarget=function(_){z.get(_).__webglFramebuffer===void 0&&W.setupRenderTarget(_)},this.initTexture=function(_){_.isCubeTexture?W.setTextureCube(_,0):_.isData3DTexture?W.setTexture3D(_,0):_.isDataArrayTexture||_.isCompressedArrayTexture?W.setTexture2DArray(_,0):W.setTexture2D(_,0),g.unbindTexture()},this.resetState=function(){G=0,V=0,K=null,g.reset(),gt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return cn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=Wt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Wt._getUnpackColorSpace()}};function py(i){let t=2166136261;for(let e=0;e<i.length;e++)t^=i.charCodeAt(e),t=Math.imul(t,16777619);return t>>>0}function Ss(i,t){let e=i+Math.imul(t,2654435769)>>>0;return e^=e>>>16,e=Math.imul(e,569420461),e^=e>>>15,e=Math.imul(e,1935289751),e^=e>>>15,(e>>>0)/4294967295}function my(i){let t=Math.min(1,Math.log10(Math.max(0,i)+1)/Math.log10(10001));return Math.min(.82,.48+t*.34)}function Tr(i,t,e){let n=py(i.id),s=Math.max(0,t),r=(i.hue%360+360)%360;return{seed:n,radius:e===void 0?.48+Ss(n,1)*.28:my(e),orbitRadius:3.4+s*1.95,orbitTilt:-.24+s%3*.2+(Ss(n,2)-.5)*.08,speed:.055+Ss(n,3)*.028,axialTilt:(Ss(n,4)-.5)*.72,surfaceHue:r,atmosphereHue:(r+18+Ss(n,5)*34)%360,hasRings:Ss(n,6)>.63,hasLife:i.hasLife??s%3===1}}var _d=.94;function gy(i){return i==="minimal"?{starCount:700,planetSegments:28,pixelRatioCap:1,antialias:!1,galaxyDust:!1,nebulae:!1,shootingStars:!1,sunFlames:4}:i==="calm"?{starCount:1900,planetSegments:44,pixelRatioCap:1.25,antialias:!0,galaxyDust:!0,nebulae:!0,shootingStars:!0,sunFlames:9}:{starCount:3200,planetSegments:64,pixelRatioCap:1.5,antialias:!0,galaxyDust:!0,nebulae:!0,shootingStars:!0,sunFlames:14}}function Qo(i){let t=(Math.round(i)%360+360)%360;return{base:t,dust:(t+18)%360,nebulae:[t,(t+48)%360,(t+312)%360]}}function xy(i){let t=i.length;return i.slice(0,12).map(e=>({name:e.name,kind:e.location==="remote"?"satellite":"moon",stale:e.stale,totalBranches:t}))}function pd(i,t){return t==="moon"?i.showBranchMoons!==!1:i.showBranchSatellites!==!1}function yy(i,t=1.5){return Math.min(t,i>0?i:1)}function md(i,t){let e=t<.9?2.65:t>1.7?1.95:2.28;return i*e}function gd(i,t){return Math.max(t*1.2,Math.min(t*4,i))}function _y(i,t,e){let n=Math.cos(e)*i;return new L(Math.sin(t)*n,Math.sin(e)*i,Math.cos(t)*n)}function vy(i,t,e){let n=i.clone().sub(t).normalize(),s=new L().crossVectors(n,new L(0,1,0));return s.lengthSq()<1e-4&&s.set(1,0,0),i.clone().add(s.normalize().multiplyScalar(e))}function by(i,t,e,n){let s=.82*_d*t/Math.max(.001,i*e);return Math.min(n,s)}function xd(i){return Math.max(.65,Math.min(1.18,i))}function Sy(i,t){return-.3+i/Math.max(1,t)*Math.PI*2}var Qc=class{constructor(t=n=>requestAnimationFrame(n),e=n=>cancelAnimationFrame(n)){this.requestFrame=t;this.cancelFrame=e;this.frame=null}start(t){if(this.frame!==null)return;let e=n=>{t(n),this.frame=this.requestFrame(e)};this.frame=this.requestFrame(e)}stop(){this.frame!==null&&this.cancelFrame(this.frame),this.frame=null}isRunning(){return this.frame!==null}};function Ar(i){let t=i||1;return()=>(t=Math.imul(t^t>>>15,1|t),t^=t+Math.imul(t^t>>>7,61|t),((t^t>>>14)>>>0)/4294967296)}function Ms(i,t,e){return`hsl(${i} ${t}% ${e}%)`}function Kc(i){let t=document.createElement("canvas");t.width=512,t.height=256;let e=t.getContext("2d");if(!e)return new We(t);let n=Ar(i.seed);if(i.hasLife){let a=e.createLinearGradient(0,0,0,t.height);a.addColorStop(0,"#4cb2ca"),a.addColorStop(.46,"#17668e"),a.addColorStop(1,"#082c55"),e.fillStyle=a,e.fillRect(0,0,t.width,t.height);for(let l=0;l<54;l++){let c=n()*t.width,h=24+n()*(t.height-48),d=8+n()*44,u=5+n()*23;e.beginPath(),e.ellipse(c,h,d,u,(n()-.5)*1.4,0,Math.PI*2),e.fillStyle=n()>.34?Ms(92+n()*42,42+n()*28,24+n()*24):Ms(38,46,40),e.globalAlpha=.58+n()*.32,e.fill()}e.globalAlpha=.18,e.fillStyle="#d7fbff",e.fillRect(0,0,t.width,9),e.fillRect(0,t.height-9,t.width,9),e.globalAlpha=1;let o=new We(t);return o.colorSpace=Ee,o.wrapS=ii,o.anisotropy=4,o}let s=e.createLinearGradient(0,0,0,t.height);s.addColorStop(0,Ms(i.surfaceHue+8,58,55)),s.addColorStop(.5,Ms(i.surfaceHue,62,37)),s.addColorStop(1,Ms(i.surfaceHue-12,70,20)),e.fillStyle=s,e.fillRect(0,0,t.width,t.height);for(let a=0;a<22;a++){let o=n()*t.height,l=3+n()*24,c=i.surfaceHue+(n()-.5)*42;e.fillStyle=Ms(c,44+n()*28,24+n()*32),e.globalAlpha=.08+n()*.18,e.fillRect(0,o,t.width,l)}for(let a=0;a<90;a++){let o=n()*t.width,l=n()*t.height,c=5+n()*35,h=2+n()*11;e.beginPath(),e.ellipse(o,l,c,h,n()*Math.PI,0,Math.PI*2),e.fillStyle=n()>.5?"#ffffff":"#060817",e.globalAlpha=.025+n()*.09,e.fill()}e.globalAlpha=1;let r=new We(t);return r.colorSpace=Ee,r.wrapS=ii,r.anisotropy=4,r}function yd(i){let t=document.createElement("canvas");t.width=512,t.height=256;let e=t.getContext("2d");if(!e)return new We(t);let n=Ar(i^85725397);for(let r=0;r<95;r++){let a=n()*t.width,o=n()*t.height,l=10+n()*55,c=2+n()*10,h=e.createRadialGradient(a,o,0,a,o,l);h.addColorStop(0,`rgba(255,255,255,${.18+n()*.34})`),h.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=h,e.save(),e.translate(a,o),e.scale(1,c/l),e.beginPath(),e.arc(0,0,l,0,Math.PI*2),e.fill(),e.restore()}let s=new We(t);return s.colorSpace=Ee,s.wrapS=ii,s}function My(i,t){let e=document.createElement("canvas");e.width=256,e.height=256;let n=e.getContext("2d");if(!n)return new We(e);let s=n.createRadialGradient(128,128,2,128,128,126);s.addColorStop(0,i),s.addColorStop(.16,t),s.addColorStop(.48,"rgba(255, 154, 67, 0.16)"),s.addColorStop(1,"rgba(28, 18, 86, 0)"),n.fillStyle=s,n.fillRect(0,0,256,256);let r=new We(e);return r.colorSpace=Ee,r}function wy(i){let t=document.createElement("canvas");t.width=256,t.height=256;let e=t.getContext("2d");if(!e)return new We(t);let n=e.createRadialGradient(128,128,0,128,128,126);return n.addColorStop(0,`hsla(${i}, 88%, 67%, 0.34)`),n.addColorStop(.32,`hsla(${i+22}, 72%, 48%, 0.14)`),n.addColorStop(1,`hsla(${i}, 75%, 30%, 0)`),e.fillStyle=n,e.fillRect(0,0,256,256),new We(t)}function Ey(){let i=document.createElement("canvas");i.width=128,i.height=256;let t=i.getContext("2d");if(!t)return new We(i);let e=t.createLinearGradient(64,248,64,8);return e.addColorStop(0,"rgba(255,246,180,0.96)"),e.addColorStop(.28,"rgba(255,151,48,0.78)"),e.addColorStop(.7,"rgba(255,70,18,0.24)"),e.addColorStop(1,"rgba(255,38,8,0)"),t.fillStyle=e,t.beginPath(),t.moveTo(64,4),t.bezierCurveTo(90,78,112,154,78,248),t.bezierCurveTo(68,255,60,255,50,248),t.bezierCurveTo(14,154,42,74,64,4),t.fill(),new We(i)}function Ty(i){return i<.5?4*i*i*i:1-Math.pow(-2*i+2,3)/2}var tl=class{constructor(t){this.options=t;this.scene=new Ks;this.camera=new Ie(40,1,.1,160);this.loop=new Qc;this.planets=new Map;this.disposableTextures=[];this.homePosition=new L;this.homeTarget=new L;this.lookTarget=new L;this.sunMaterial=null;this.sunFlares=null;this.sunFlames=[];this.starfield=null;this.galaxyDust=null;this.shootingStars=[];this.nextShootingStarAt=3600;this.shootingRandom=Ar(358949);this.transition=null;this.focusedId=null;this.highlightedId=null;this.lastTime=null;this.width=1;this.height=1;this.systemRadius=5.2;this.homeDistance=0;this.cameraYaw=0;this.cameraPitch=.23;this.dragging=!1;this.dragX=0;this.dragY=0;this.disposed=!1;this.handleWheel=t=>{t.preventDefault(),this.zoomBy(Math.exp(t.deltaY*.0012))};this.handlePointerDown=t=>{t.button!==0||this.focusedId||(this.dragging=!0,this.dragX=t.clientX,this.dragY=t.clientY,this.canvas.setPointerCapture(t.pointerId),this.canvas.classList.add("is-dragging"))};this.handlePointerMove=t=>{if(!this.dragging)return;let e=t.clientX-this.dragX,n=t.clientY-this.dragY;this.dragX=t.clientX,this.dragY=t.clientY,this.rotateBy(-e*.005,n*.004)};this.handlePointerUp=t=>{this.dragging&&(this.dragging=!1,this.canvas.hasPointerCapture(t.pointerId)&&this.canvas.releasePointerCapture(t.pointerId),this.canvas.classList.remove("is-dragging"))};this.reducedMotion=!!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,this.quality=gy(t.sceneIntensity??"cinematic"),this.renderer=new Zo({antialias:this.quality.antialias,alpha:!0,powerPreference:t.sceneIntensity==="minimal"?"low-power":"high-performance"}),this.renderer.setPixelRatio(yy(window.devicePixelRatio,this.quality.pixelRatioCap)),this.renderer.outputColorSpace=Ee,this.renderer.toneMapping=pr,this.renderer.toneMappingExposure=1.12,this.canvas=this.renderer.domElement,this.canvas.className="cs-galaxy-canvas",this.canvas.setAttribute("aria-hidden","true"),t.container.appendChild(this.canvas),this.canvas.addEventListener("wheel",this.handleWheel,{passive:!1}),this.canvas.addEventListener("pointerdown",this.handlePointerDown),this.canvas.addEventListener("pointermove",this.handlePointerMove),this.canvas.addEventListener("pointerup",this.handlePointerUp),this.canvas.addEventListener("pointercancel",this.handlePointerUp),this.scene.fog=new Js(329490,.013),this.createLights(),this.createStarfield(),this.quality.galaxyDust&&this.createGalaxyDust(),this.quality.nebulae&&this.createNebulae(),this.createSun(),this.createPlanets(t.entries),this.resize(),this.render(0)}start(){this.disposed||(this.lastTime=null,this.loop.start(t=>this.render(t)))}stop(){this.loop.stop(),this.lastTime=null}resize(){let t=this.options.container.getBoundingClientRect();this.width=Math.max(1,Math.round(t.width)),this.height=Math.max(1,Math.round(t.height)),this.renderer.setSize(this.width,this.height,!1),this.camera.aspect=this.width/this.height,this.camera.updateProjectionMatrix();let e=[...this.planets.values()].at(-1)?.identity;this.systemRadius=e?e.orbitRadius+e.radius:5.2,this.homeDistance===0?this.homeDistance=md(this.systemRadius,this.camera.aspect):this.homeDistance=gd(this.homeDistance,this.systemRadius),this.homeTarget.set(0,0,0),this.updateHomePosition(),!this.focusedId&&!this.transition&&(this.camera.position.copy(this.homePosition),this.lookTarget.copy(this.homeTarget),this.camera.lookAt(this.lookTarget))}setHighlightedProject(t){this.highlightedId=t}setProjectHue(t,e){let n=this.planets.get(t);if(!n)return;n.identity.surfaceHue=(e%360+360)%360,n.identity.atmosphereHue=(n.identity.surfaceHue+34)%360;let s=n.surface.material.map,r=Kc(n.identity);this.disposableTextures.push(r),n.surface.material.map=r,n.surface.material.needsUpdate=!0,s?.dispose(),n.atmosphere.material.color.setHSL(n.identity.atmosphereHue/360,.76,n.identity.hasLife?.72:.66)}setProjectScale(t,e){let n=this.planets.get(t);n&&(n.baseScale=xd(e))}setProjectLife(t,e){let n=this.planets.get(t);if(!n||n.identity.hasLife===e)return;n.identity.hasLife=e;let s=n.surface.material.map,r=Kc(n.identity);if(this.disposableTextures.push(r),n.surface.material.map=r,n.surface.material.needsUpdate=!0,s?.dispose(),n.clouds&&(n.root.remove(n.clouds),n.clouds.geometry.dispose(),n.clouds.material.map?.dispose(),n.clouds.material.dispose(),n.clouds=null),e){let a=yd(n.identity.seed);this.disposableTextures.push(a),n.clouds=new xe(new Gn(n.identity.radius*1.022,Math.max(24,this.quality.planetSegments-4),Math.max(24,this.quality.planetSegments-4)),new un({map:a,transparent:!0,opacity:.72,depthWrite:!1,roughness:1})),n.root.add(n.clouds)}n.atmosphere.material.opacity=e?.24:.16}projectHasLife(t){return this.planets.get(t)?.identity.hasLife??!1}setProjectOrbitalVisible(t,e,n){this.planets.get(t)?.orbitals.forEach(r=>{r.kind===e&&(r.pivot.visible=n)})}zoomBy(t){this.focusedId||this.transition||(this.homeDistance=gd(this.homeDistance*t,this.systemRadius),this.updateHomePosition(),this.camera.position.copy(this.homePosition),this.camera.lookAt(this.homeTarget))}rotateBy(t,e){this.focusedId||this.transition||(this.cameraYaw+=t,this.cameraPitch=Math.max(-.12,Math.min(.72,this.cameraPitch+e)),this.updateHomePosition(),this.camera.position.copy(this.homePosition),this.lookTarget.copy(this.homeTarget),this.camera.lookAt(this.lookTarget))}fitSystem(){this.focusedId||this.transition||(this.homeDistance=md(this.systemRadius,this.camera.aspect),this.cameraYaw=0,this.cameraPitch=.23,this.updateHomePosition(),this.camera.position.copy(this.homePosition),this.lookTarget.copy(this.homeTarget),this.camera.lookAt(this.lookTarget))}focusProject(t,e){let n=this.planets.get(t);if(!n)return;this.focusedId=t,n.root.updateWorldMatrix(!0,!1);let s=n.root.getWorldPosition(new L),r=this.camera.position.clone().sub(s).normalize(),a=s.clone().add(r.multiplyScalar(4.6)).add(new L(0,.35,0)),o=vy(s,a,.82);this.beginTransition(a,o,e)}returnToSystem(t){this.focusedId=null,this.beginTransition(this.homePosition,this.homeTarget,t)}dispose(){this.disposed||(this.disposed=!0,this.stop(),this.scene.traverse(t=>{let e=t;e.geometry?.dispose(),(Array.isArray(e.material)?e.material:e.material?[e.material]:[]).forEach(s=>s.dispose())}),this.disposableTextures.forEach(t=>t.dispose()),this.canvas.removeEventListener("wheel",this.handleWheel),this.canvas.removeEventListener("pointerdown",this.handlePointerDown),this.canvas.removeEventListener("pointermove",this.handlePointerMove),this.canvas.removeEventListener("pointerup",this.handlePointerUp),this.canvas.removeEventListener("pointercancel",this.handlePointerUp),this.renderer.dispose(),this.canvas.remove())}beginTransition(t,e,n){if(this.reducedMotion){this.camera.position.copy(t),this.lookTarget.copy(e),this.camera.lookAt(this.lookTarget),n?.();return}this.transition={startedAt:performance.now(),duration:920,fromPosition:this.camera.position.clone(),toPosition:t.clone(),fromTarget:this.lookTarget.clone(),toTarget:e.clone(),onComplete:n}}updateHomePosition(){this.homePosition.copy(_y(this.homeDistance,this.cameraYaw,this.cameraPitch))}createLights(){this.scene.add(new lr(10466030,1185069,1.18)),this.scene.add(new dr(5398927,.62));let t=new hr(16760942,78,36,1.65);t.position.set(0,0,0),this.scene.add(t)}createStarfield(){let t=Ar(12607063),e=this.quality.starCount,n=new Float32Array(e*3),s=new Float32Array(e*3),r=Qo(this.options.galaxyAccentHue??230).base,a=[new It().setHSL(r/360,.7,.76),new It(14542591),new It().setHSL((r+58)%360/360,.58,.78)];for(let c=0;c<e;c++){let h=26+t()*92,d=t()*Math.PI*2,u=Math.acos(2*t()-1);n[c*3]=h*Math.sin(u)*Math.cos(d),n[c*3+1]=h*Math.cos(u),n[c*3+2]=h*Math.sin(u)*Math.sin(d);let m=a[Math.floor(t()*a.length)];s[c*3]=m.r,s[c*3+1]=m.g,s[c*3+2]=m.b}let o=new Se;o.setAttribute("position",new Te(n,3)),o.setAttribute("color",new Te(s,3));let l=new Ii({size:.11,sizeAttenuation:!0,transparent:!0,opacity:.9,vertexColors:!0});this.starfield=new ps(o,l),this.scene.add(this.starfield)}createGalaxyDust(){let t=Ar(6953566),e=Qo(this.options.galaxyAccentHue??230).dust/360,n=1200,s=new Float32Array(n*3),r=new Float32Array(n*3);for(let l=0;l<n;l++){let c=l%3,h=4+Math.pow(t(),.62)*34,d=h*.2+c*(Math.PI*2/3)+(t()-.5)*.72;s[l*3]=Math.cos(d)*h,s[l*3+1]=(t()-.5)*(.35+h*.045),s[l*3+2]=Math.sin(d)*h-18;let u=new It().setHSL((e+(t()-.5)*.1+1)%1,.54,.55+t()*.3);r[l*3]=u.r,r[l*3+1]=u.g,r[l*3+2]=u.b}let a=new Se;a.setAttribute("position",new Te(s,3)),a.setAttribute("color",new Te(r,3));let o=new Ii({size:.075,transparent:!0,opacity:.46,vertexColors:!0,blending:Tn,depthWrite:!1});this.galaxyDust=new ps(a,o),this.scene.add(this.galaxyDust)}createNebulae(){let t=Qo(this.options.galaxyAccentHue??230);[{hue:t.nebulae[0],x:-15,y:4,z:-22,size:28,opacity:.24},{hue:t.nebulae[1],x:17,y:-7,z:-28,size:34,opacity:.2},{hue:t.nebulae[2],x:4,y:12,z:-35,size:24,opacity:.14}].forEach(n=>{let s=wy(n.hue);this.disposableTextures.push(s);let r=this.options.sceneIntensity==="calm"?.48:1,a=new ai({map:s,transparent:!0,opacity:n.opacity*r,blending:Tn,depthWrite:!1}),o=new Ci(a);o.position.set(n.x,n.y,n.z),o.scale.setScalar(n.size),this.scene.add(o)})}createSun(){this.sunMaterial=new Xe({uniforms:{uTime:{value:0},uCore:{value:new It(16773544)},uEdge:{value:new It(16738847)}},vertexShader:`
        varying vec3 vPosition;
        varying vec3 vNormal;
        void main() {
          vPosition = position;
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,fragmentShader:`
        uniform float uTime;
        uniform vec3 uCore;
        uniform vec3 uEdge;
        varying vec3 vPosition;
        varying vec3 vNormal;
        float hash(vec3 p) { return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453); }
        void main() {
          vec3 p = normalize(vPosition);
          float cells = sin((p.x + p.y * 0.72) * 34.0 + uTime * 0.55) * sin((p.z - p.y) * 27.0 - uTime * 0.38);
          float granules = hash(floor((p + 1.0) * 36.0 + uTime * 0.05));
          float spot = smoothstep(0.76, 0.98, sin(p.x * 8.0 + p.z * 5.0) * sin(p.y * 10.0 - p.x * 3.0));
          float facing = clamp(abs(vNormal.z), 0.0, 1.0);
          vec3 color = mix(uEdge, uCore, 0.38 + facing * 0.48 + cells * 0.08 + granules * 0.08);
          color *= 1.0 - spot * 0.28;
          gl_FragColor = vec4(color, 1.0);
        }
      `});let t=Math.max(32,this.quality.planetSegments+8),e=new xe(new Gn(_d,t,t),this.sunMaterial);this.scene.add(e);let n=My("rgba(255,255,236,1)","rgba(255,183,77,0.76)");this.disposableTextures.push(n),[3.7,5.8].forEach((r,a)=>{let o=new Ci(new ai({map:n,transparent:!0,opacity:a===0?.92:.34,blending:Tn,depthWrite:!1}));o.scale.setScalar(r),this.scene.add(o)}),this.sunFlares=new Je;let s=Ey();this.disposableTextures.push(s);for(let r=0;r<this.quality.sunFlames;r++){let a=r/this.quality.sunFlames*Math.PI*2,o=new ai({map:s,color:r%2===0?16747570:16765034,transparent:!0,opacity:.24,rotation:-a+Math.PI/2,blending:Tn,depthWrite:!1}),l=new Ci(o);l.position.set(Math.cos(a)*1.04,Math.sin(a)*1.04,0),l.scale.set(.22+r%3*.035,.58,1),this.sunFlares.add(l),this.sunFlames.push({sprite:l,material:o,angle:a,phase:r*.87})}this.scene.add(this.sunFlares)}createPlanets(t){t.forEach((e,n)=>{let s=Tr(e,n,this.options.graphNodeCounts?.get(e.id)),r=new Je;r.rotation.x=s.orbitTilt,r.rotation.z=(n%2===0?-1:1)*.04*(n+1),this.scene.add(r);let a=[];for(let T=0;T<=128;T++){let b=T/128*Math.PI*2;a.push(new L(Math.cos(b)*s.orbitRadius,0,Math.sin(b)*s.orbitRadius))}let o=new Se().setFromPoints(a),l=new It().setHSL(Qo(this.options.galaxyAccentHue??230).base/360,.56,.66),c=new Pi({color:l,transparent:!0,opacity:.19});r.add(new fs(o,c));let h=new Je;h.rotation.z=s.axialTilt,r.add(h);let d=Kc(s);this.disposableTextures.push(d);let u=this.quality.planetSegments,m=new xe(new Gn(s.radius,u,u),new un({map:d,roughness:.78,metalness:.06}));h.add(m);let x=new It().setHSL(s.atmosphereHue/360,.76,.66),v=new xe(new Gn(s.radius*1.065,Math.max(24,u-8),Math.max(24,u-8)),new Ri({color:x,transparent:!0,opacity:.16,side:Ne,blending:Tn}));h.add(v);let p=null;if(s.hasLife){let T=yd(s.seed);this.disposableTextures.push(T),p=new xe(new Gn(s.radius*1.022,Math.max(24,u-4),Math.max(24,u-4)),new un({map:T,transparent:!0,opacity:.72,depthWrite:!1,roughness:1})),h.add(p)}if(s.hasRings){let T=new xe(new ar(s.radius*1.32,s.radius*1.88,this.quality.planetSegments>=64?96:48),new un({color:x,transparent:!0,opacity:.36,side:nn,roughness:.88}));T.rotation.x=Math.PI/2,h.add(T)}let f=Sy(n,t.length);h.position.set(Math.cos(f)*s.orbitRadius,0,Math.sin(f)*s.orbitRadius);let S=this.createBranchOrbitals(h,s,this.options.projectBranches?.get(e.id)??[],e);this.planets.set(e.id,{id:e.id,identity:s,orbitPlane:r,root:h,surface:m,atmosphere:v,clouds:p,orbitals:S,angle:f,baseScale:xd(e.planetScale??1)})})}createBranchOrbitals(t,e,n,s){let r=xy(n);return r.map((a,o)=>{let l=new Je;l.rotation.x=.34+o%3*.26,l.rotation.z=(o%2===0?1:-1)*(.12+o%4*.08),l.rotation.y=o/Math.max(1,r.length)*Math.PI*2;let c=e.radius*(1.58+o%4*.34);if(a.kind==="moon"){let h=new xe(new sr(e.radius*(a.stale?.065:.082),this.quality.planetSegments>=44?2:1),new un({color:a.stale?7304325:12174042,roughness:.94,metalness:.02}));h.position.x=c,l.add(h),l.visible=pd(s,a.kind)}else{let h=new Je,d=new un({color:a.stale?7238016:13358830,roughness:.45,metalness:.72}),u=new un({color:4548269,roughness:.38,metalness:.48,emissive:1320532,emissiveIntensity:.34});h.add(new xe(new Vn(e.radius*.09,e.radius*.07,e.radius*.07),d));let m=new xe(new Vn(e.radius*.12,e.radius*.012,e.radius*.075),u);m.position.x=-e.radius*.11;let x=m.clone();x.position.x*=-1,h.add(m,x),h.position.x=c,h.scale.setScalar(.86),l.add(h),l.visible=pd(s,a.kind)}return t.add(l),{pivot:l,kind:a.kind,speed:(a.kind==="moon"?.34:.52)+o*.023}})}render(t){if(this.disposed)return;let e=this.lastTime===null?0:Math.min(.05,(t-this.lastTime)/1e3);this.lastTime=t;let n=!this.reducedMotion&&!this.focusedId&&!this.transition;if(this.planets.forEach(s=>{n&&this.highlightedId!==s.id&&(s.angle+=s.identity.speed*e),s.root.position.set(Math.cos(s.angle)*s.identity.orbitRadius,0,Math.sin(s.angle)*s.identity.orbitRadius),this.reducedMotion||(s.surface.rotation.y+=e*(.12+s.identity.speed)),!this.reducedMotion&&s.clouds&&(s.clouds.rotation.y+=e*.075),this.reducedMotion||s.orbitals.forEach(c=>{c.pivot.rotation.y+=e*c.speed});let r=this.highlightedId===s.id||this.focusedId===s.id,a=r?s.baseScale*1.08:s.baseScale,o=s.root.getWorldPosition(new L),l=by(s.identity.radius,this.camera.position.distanceTo(o),this.camera.position.length(),a);s.root.scale.lerp(new L(l,l,l),Math.min(1,e*7)),s.atmosphere.material.opacity=r?.38:.16}),this.sunMaterial&&(this.sunMaterial.uniforms.uTime.value=t/1e3),this.sunFlares&&!this.reducedMotion&&(this.sunFlares.rotation.z=t*35e-6),this.reducedMotion||(this.starfield&&(this.starfield.rotation.y=t*35e-7,this.starfield.material.opacity=.84+Math.sin(t*.0011)*.06),this.galaxyDust&&(this.galaxyDust.rotation.y=-t*6e-6),this.sunFlames.forEach((s,r)=>{let a=.5+.5*Math.sin(t*.0042+s.phase),o=1.01+a*.07;s.sprite.position.set(Math.cos(s.angle)*o,Math.sin(s.angle)*o,0),s.sprite.scale.set(.18+a*.08,.42+a*(.25+r%3*.04),1),s.material.opacity=.13+a*.23}),this.quality.shootingStars&&this.updateShootingStars(t,e)),this.transition){let s=Math.min(1,(t-this.transition.startedAt)/this.transition.duration),r=Ty(s);if(this.camera.position.lerpVectors(this.transition.fromPosition,this.transition.toPosition,r),this.lookTarget.lerpVectors(this.transition.fromTarget,this.transition.toTarget,r),s>=1){let a=this.transition.onComplete;this.transition=null,a?.()}}this.camera.lookAt(this.lookTarget),this.renderer.render(this.scene,this.camera),this.publishProjectPositions()}publishProjectPositions(){let t=this.options.container.getBoundingClientRect();this.planets.forEach(e=>{let n=e.root.getWorldPosition(new L);n.project(this.camera),this.options.onProjectPosition?.({id:e.id,x:(n.x*.5+.5)*t.width,y:(-n.y*.5+.5)*t.height,depth:n.z,visible:n.z>-1&&n.z<1})})}updateShootingStars(t,e){if(t>=this.nextShootingStarAt&&this.shootingStars.length<2){let n=new Se().setFromPoints([new L(0,0,0),new L(-2.8,1.15,0)]),s=new Pi({color:14411263,transparent:!0,opacity:0,blending:Tn}),r=new fs(n,s);r.position.set(-15+this.shootingRandom()*20,5+this.shootingRandom()*9,-20-this.shootingRandom()*12),this.scene.add(r),this.shootingStars.push({line:r,velocity:new L(9+this.shootingRandom()*5,-4-this.shootingRandom()*3,0),age:0,duration:1.1+this.shootingRandom()*.55}),this.nextShootingStarAt=t+5500+this.shootingRandom()*9e3}for(let n=this.shootingStars.length-1;n>=0;n--){let s=this.shootingStars[n];s.age+=e;let r=s.age/s.duration;s.line.position.addScaledVector(s.velocity,e),s.line.material.opacity=Math.sin(Math.min(1,r)*Math.PI)*.72,r>=1&&(this.scene.remove(s.line),s.line.geometry.dispose(),s.line.material.dispose(),this.shootingStars.splice(n,1))}}};var Ay=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],Cy=["January","February","March","April","May","June","July","August","September","October","November","December"];function Ry(i=new Date){let t=i.getHours();return t>=5&&t<11?"morning":t>=11&&t<17?"day":t>=17&&t<21?"sunset":"night"}function Py(i){switch(i){case"morning":return"Good morning";case"day":return"Good afternoon";case"sunset":return"Good evening";default:return"Good night"}}function Iy(i=new Date){let t=i.getDay();return t>=1&&t<=5}function Ly(i){return`${Ay[i.getDay()]}, ${Cy[i.getMonth()]} ${i.getDate()}`}function Dy(i){let t=i.getHours(),e=i.getMinutes(),n=t>=12?"PM":"AM";return t=t%12||12,`${t}:${String(e).padStart(2,"0")} ${n}`}function Ny(i,t,e){let n=!1,s,r=()=>{n||(n=!0,clearTimeout(s),i.removeEventListener("transitionend",r),t())};return i.addEventListener("transitionend",r,{once:!0}),s=setTimeout(r,e),()=>{n=!0,clearTimeout(s),i.removeEventListener("transitionend",r)}}function vd(i,t={}){let e=new Date,n=Ry(e),s=`${Py(n)}, ${t.name||"there"}`,r=document.createElement("div");if(r.className=`cs-greeting cs-sky-${n}`,r.innerHTML=`
    <div class="cs-greeting-text">
      <div class="cs-greeting-line">${s}</div>
      <div class="cs-greeting-sub">${Ly(e)} \xB7 ${Dy(e)}</div>
    </div>
  `,i.appendChild(r),n==="night"){let l=document.createElement("div");l.className="cs-greeting-stars";for(let c=0;c<40;c++){let h=document.createElement("div");h.className="cs-star"+(Math.random()>.88?" cs-star-big":""),h.style.left=Math.random()*100+"%",h.style.top=Math.random()*70+"%",h.style.animationDelay=Math.random()*2.5+"s",l.appendChild(h)}r.insertBefore(l,r.firstChild)}r.offsetWidth,r.classList.add("is-visible");let a=()=>{},o=setTimeout(()=>{a=Ny(r,()=>{r.remove(),t.onDone?.({state:n,isWeekday:Iy(e)})},520),r.classList.add("is-leaving")},t.holdMs??2200);return()=>{clearTimeout(o),a(),r.remove()}}var de=require("obsidian");var Fi=jt(require("node:fs/promises"),1),mi=jt(require("node:path"),1),Ed=jt(require("node:os"),1);var bd=jt(require("node:os"),1),Ui=jt(require("node:path"),1),ws=bd.homedir(),Ue={claudeCodeProjects:Ui.join(ws,".claude","projects"),codexSessions:Ui.join(ws,".codex","sessions"),codexConfig:Ui.join(ws,".codex","config.toml"),codexSessionIndex:Ui.join(ws,".codex","session_index.jsonl")};function Sd(){return process.platform==="win32"?["graphify.exe","graphify.cmd","graphify"]:["graphify",Ui.join(ws,".local","bin","graphify"),"/opt/homebrew/bin/graphify","/usr/local/bin/graphify"]}function Md(){return process.platform==="win32"?["claude.exe","claude.cmd","claude"]:["claude","/opt/homebrew/bin/claude","/usr/local/bin/claude",Ui.join(ws,".local","bin","claude")]}var wd=require("node:child_process");function ye(i,t,{cwd:e,timeoutMs:n=15e3}={}){return new Promise((s,r)=>{(0,wd.execFile)(i,t,{cwd:e,timeout:n,maxBuffer:1024*1024*32},(a,o,l)=>{if(a){r(Object.assign(a,{stdout:o,stderr:l}));return}s({stdout:o,stderr:l})})})}async function Uy(){if(process.platform!=="win32")return[];let i=[],t=[process.env.APPDATA&&mi.join(process.env.APPDATA,"Python"),process.env.LOCALAPPDATA&&mi.join(process.env.LOCALAPPDATA,"Programs","Python")].filter(e=>!!e);for(let e of t){let n=await Fi.readdir(e).catch(()=>[]);for(let s of n)/^Python\d/i.test(s)&&i.push(mi.join(e,s,"Scripts","graphify.exe"))}return process.env.USERPROFILE&&(i.push(mi.join(process.env.USERPROFILE,"pipx","bin","graphify.exe")),i.push(mi.join(process.env.USERPROFILE,".local","bin","graphify.exe"))),i}async function el(){let[i,t]=await Promise.all([Fi.stat(Ue.claudeCodeProjects).then(e=>e.isDirectory()).catch(()=>!1),Fi.stat(Ue.codexSessions).then(e=>e.isDirectory()).catch(()=>!1)]);return{claudeCode:i,codex:t}}var Rr;function Fy(){Rr=void 0}async function Oy(){if(process.platform!=="darwin")return[];let i=mi.join(Ed.homedir(),"Library","Python");return(await Fi.readdir(i).catch(()=>[])).map(e=>mi.join(i,e,"bin","graphify"))}async function By(){if(Rr!==void 0)return Rr;let i=[...Sd(),...await Oy(),...await Uy()];for(let t of i)try{let{stdout:e}=await ye(t,["--version"]),n=e.match(/(\d+\.\d+\.\d+)/);return Rr={bin:t,version:n?.[1]??null},Rr}catch{}return{bin:null,version:null}}async function Xn(i={}){i.forceRefresh&&Fy();let{bin:t,version:e}=await By();return{installed:t!==null,version:e,bin:t}}async function Td(i){return Fi.stat(`${i}/graphify-out/graph.json`).then(t=>t.isFile()).catch(()=>!1)}var Cr;async function nl(){if(Cr!==void 0)return Cr;for(let i of Md())try{return await ye(i,["--version"]),Cr=i,Cr}catch{}return Cr=null,null}var th=jt(require("node:fs/promises"),1),eh=jt(require("node:path"),1);var Ad=jt(require("node:readline"),1),Cd=require("node:fs");async function Rd(i){let t={sessionId:"",cwd:null,customTitle:null,lastPrompt:null,firstTimestamp:null,lastTimestamp:null,messageCount:0,totalInputTokens:0,totalOutputTokens:0,totalCacheCreationTokens:0,totalCacheReadTokens:0,modelsUsed:[],tokensByModel:{},unparsedLineCount:0},e=new Set,n=Ad.createInterface({input:(0,Cd.createReadStream)(i,"utf8"),crlfDelay:1/0});for await(let s of n){if(!s.trim())continue;let r;try{r=JSON.parse(s)}catch{t.unparsedLineCount++;continue}if(!t.sessionId&&typeof r.sessionId=="string"&&(t.sessionId=r.sessionId),!t.cwd&&typeof r.cwd=="string"&&(t.cwd=r.cwd),typeof r.timestamp=="string"&&((!t.firstTimestamp||r.timestamp<t.firstTimestamp)&&(t.firstTimestamp=r.timestamp),(!t.lastTimestamp||r.timestamp>t.lastTimestamp)&&(t.lastTimestamp=r.timestamp)),r.type==="custom-title"&&typeof r.customTitle=="string"&&(t.customTitle=r.customTitle),r.type==="last-prompt"&&typeof r.lastPrompt=="string"&&(t.lastPrompt=r.lastPrompt),r.type==="assistant"){t.messageCount++;let a=r.message?.usage,o=r.message?.model;if(typeof o=="string"&&e.add(o),a){t.totalInputTokens+=a.input_tokens??0,t.totalOutputTokens+=a.output_tokens??0,t.totalCacheCreationTokens+=a.cache_creation_input_tokens??0,t.totalCacheReadTokens+=a.cache_read_input_tokens??0;let l=typeof o=="string"?o:"unknown",c=(a.input_tokens??0)+(a.output_tokens??0);t.tokensByModel[l]=(t.tokensByModel[l]??0)+c}}}return t.modelsUsed=Array.from(e),t}async function gi(){let i;try{i=await th.readdir(Ue.claudeCodeProjects)}catch{return[]}let t=new Map;for(let e of i){let n=eh.join(Ue.claudeCodeProjects,e),s;try{s=await th.readdir(n)}catch{continue}for(let r of s){if(!r.endsWith(".jsonl"))continue;let a=eh.join(n,r),o;try{o=await Rd(a)}catch{continue}if(!o.cwd)continue;let l=t.get(o.cwd)??[];l.push(o),t.set(o.cwd,l)}}return Array.from(t.entries()).map(([e,n])=>({cwd:e,sessions:n}))}var Dd=jt(require("node:fs/promises"),1),Nd=jt(require("node:path"),1);var Pd=jt(require("node:readline"),1),Id=require("node:fs");async function Ld(i){let t={sessionId:null,cwd:null,cliVersion:null,model:null,firstTimestamp:null,lastTimestamp:null,totalTokens:0,totalInputTokens:0,totalOutputTokens:0,unparsedLineCount:0},e=null,n=null,s=null,r=Pd.createInterface({input:(0,Id.createReadStream)(i,"utf8"),crlfDelay:1/0});for await(let a of r){if(!a.trim())continue;let o;try{o=JSON.parse(a)}catch{t.unparsedLineCount++;continue}if(typeof o.timestamp=="string"&&((!t.firstTimestamp||o.timestamp<t.firstTimestamp)&&(t.firstTimestamp=o.timestamp),(!t.lastTimestamp||o.timestamp>t.lastTimestamp)&&(t.lastTimestamp=o.timestamp)),o.type==="session_meta"){let l=o.payload;l?.id&&(t.sessionId=l.id),l?.cli_version&&(t.cliVersion=l.cli_version),typeof l?.cwd=="string"&&(e=l.cwd)}else if(o.type==="turn_context"){let l=o.payload;typeof l?.cwd=="string"&&(n=l.cwd),Array.isArray(l?.workspace_roots)&&l.workspace_roots.length>0&&(s=l.workspace_roots[0]),typeof l?.model=="string"&&(t.model=l.model)}else if(o.type==="event_msg"){let l=o.payload;if(l?.type==="token_count"&&l.info?.total_token_usage){let c=l.info.total_token_usage;t.totalInputTokens=c.input_tokens??t.totalInputTokens,t.totalOutputTokens=c.output_tokens??t.totalOutputTokens,t.totalTokens=c.total_tokens??t.totalTokens}}}return t.cwd=s??n??e,t}async function xi(){let i;try{i=await Ud(Ue.codexSessions,3)}catch{return[]}let t=new Map;for(let e of i){let n;try{n=await Ld(e)}catch{continue}if(!n.cwd)continue;let s=t.get(n.cwd)??[];s.push(n),t.set(n.cwd,s)}return Array.from(t.entries()).map(([e,n])=>({cwd:e,sessions:n}))}async function Ud(i,t){let e=await Dd.readdir(i,{withFileTypes:!0}),n=[];for(let s of e){let r=Nd.join(i,s.name);s.isDirectory()&&t>0?n.push(...await Ud(r,t-1).catch(()=>[])):s.isFile()&&s.name.endsWith(".jsonl")&&n.push(r)}return n}var Fd=jt(require("node:fs/promises"),1),Od=jt(require("node:path"),1);async function Bd(){let[i,t]=await Promise.all([gi().catch(()=>[]),xi().catch(()=>[])]),e=new Map;for(let s of i)e.set(s.cwd,(e.get(s.cwd)??0)+s.sessions.length);for(let s of t)e.set(s.cwd,(e.get(s.cwd)??0)+s.sessions.length);let n=[];for(let[s,r]of e)await Fd.stat(s).then(o=>o.isDirectory()).catch(()=>!1)&&n.push({cwd:s,name:Od.basename(s),sessionCount:r});return n.sort((s,r)=>r.sessionCount-s.sessionCount)}function nh(){return[Vr,wh,Oe]}function kd(i){return[`${Oe}/${i}`,`${Oe}/${i}/graph`,`${Oe}/${i}/worklogs`]}async function il(i,t,e){for(let n of t)await i.adapter.exists(n)||await i.createFolder(n),e?.(n)}async function zd(i,t){let e=`${Oe}/${t.id}/overview.md`,n=ky(t);await i.adapter.exists(e)?await i.adapter.write(e,n):await i.create(e,n)}function ky(i){return`---
codestellation_id: ${i.id}
path: "${i.path}"
imported_at: ${i.importedAt}
---

# ${i.name}

- **Path:** \`${i.path}\`
- **Imported:** ${new Date(i.importedAt).toLocaleDateString()}
- **Graphify graph:** ${i.graphPath?`[[${i.graphPath}]]`:"not yet generated"}

This note is managed by Codestellation and regenerated on each setup run.
Project stats (sessions, tokens, branches) render live in the plugin's own
view rather than being written here as static text.
`}var Hd=jt(require("node:fs/promises"),1);async function Pr(i){let t=await Hd.readFile(i,"utf8"),e=JSON.parse(t),n=Array.isArray(e.nodes)?e.nodes:[],s=Array.isArray(e.links)?e.links:[],r=new Map(n.map(a=>[a.id,a]));return{nodes:n,edges:s,nodesById:r}}function Vd(i,t){let e=new Map;for(let c of i.nodes){let h=c.community??-1;e.set(h,(e.get(h)??0)+1)}let n=Array.from(e.entries()).sort((c,h)=>h[1]-c[1]),s=new Set,r=0;for(let[c,h]of n){if(r>0&&r+h>t)break;s.add(c),r+=h}let a=i.nodes.filter(c=>s.has(c.community??-1)),o=new Set(a.map(c=>c.id)),l=i.edges.filter(c=>o.has(c.source)&&o.has(c.target));return{directed:!0,multigraph:!1,graph:{},nodes:a,links:l,hyperedges:[]}}var sl=jt(require("node:fs/promises"),1);async function rl(i,t){let e=await sl.readFile(i,"utf8"),n=JSON.parse(e);for(let s of n.nodes)s.type==="group"&&(s.color=t);await sl.writeFile(i,JSON.stringify(n))}var Es=jt(require("node:fs/promises"),1),ih=jt(require("node:path"),1);async function Ts(i){if(!await Es.stat(ih.join(i,".git")).then(()=>!0).catch(()=>!1))return;let e=ih.join(i,".gitignore"),n=await Es.readFile(e,"utf8").catch(()=>"");if(n.split(`
`).map(o=>o.trim()).some(o=>o==="graphify-out"||o==="graphify-out/"||o==="/graphify-out"||o==="/graphify-out/"))return;let a=`${n.length>0&&!n.endsWith(`
`)?`
`:""}
# added by Codestellation: graphify's build output, not meant to be committed
graphify-out/
`;await Es.writeFile(e,n+a)}var Ir=jt(require("node:path"),1),As=jt(require("node:fs/promises"),1),Gd=jt(require("node:os"),1),zy=300,sh=300;function Oi(i){return()=>{i().catch(t=>{console.error("[Codestellation] onboarding step failed",t),new de.Notice(`Something went wrong: ${t.message??t}`)})}}var al=["name","detect","projects","graphify","folders","done"],Pn=class extends de.Modal{constructor(e,n,s="name",r){super(e);this.stepIndex=0;this.userName="";this.discovered=[];this.selected=new Set;this.colors=new Map;this.graphifyNeeded=[];this.graphifyChoices=new Map;this.exportMode="full";this.plugin=n,this.userName=n.settings.userName,this.stepIndex=al.indexOf(s),this.onFinished=r}async onOpen(){this.contentEl.addClass("cs-modal"),await il(this.app.vault,nh()),this.render()}onClose(){this.onFinished?.(),this.contentEl.empty()}get step(){return al[this.stepIndex]}goto(e){this.stepIndex=al.indexOf(e),this.render()}next(){this.stepIndex=Math.min(this.stepIndex+1,al.length-1),this.render()}render(){let{contentEl:e}=this;switch(e.empty(),e.createEl("h2",{text:"Codestellation setup"}),this.step){case"name":return this.renderName();case"detect":return this.renderDetect();case"projects":return this.renderProjects();case"graphify":return this.renderGraphify();case"folders":return this.renderFolders();case"done":return this.renderDone()}}renderName(){let{contentEl:e}=this;e.createEl("p",{text:"What should Codestellation call you? This is used for the greeting on the home screen."}),new de.Setting(e).addText(n=>n.setPlaceholder("Your name").setValue(this.userName).onChange(s=>{this.userName=s})),new de.Setting(e).addButton(n=>n.setButtonText("Next").setCta().onClick(Oi(async()=>{this.plugin.settings.userName=this.userName.trim()||"there",await this.plugin.saveSettings(),this.next()})))}async renderDetect(){let{contentEl:e}=this;e.createEl("p",{text:"Checking for Claude Code and Codex\u2026"});let n=await el();if(e.empty(),e.createEl("h2",{text:"Codestellation setup"}),e.createEl("p",{text:`Claude Code: ${n.claudeCode?"found \u2713":"not found"}. Codex: ${n.codex?"found \u2713":"not found"}.`}),!n.claudeCode&&!n.codex){e.createEl("p",{text:"Neither was found on this machine. Codestellation reads their local session history to discover your projects. Install and run at least one of them, then come back here.",cls:"setting-item-description"}),new de.Setting(e).addButton(s=>s.setButtonText("Check again").onClick(()=>this.render()));return}new de.Setting(e).addButton(s=>s.setButtonText("Next").setCta().onClick(()=>this.next()))}async renderProjects(){let{contentEl:e}=this;e.createEl("p",{text:"Looking through your local session history\u2026"});let n=await Bd(),s=await Ye(this.app.vault),r=new Set(s.map(a=>a.path));if(this.discovered=n.filter(a=>!r.has(a.cwd)),e.empty(),e.createEl("h2",{text:"Codestellation setup"}),this.discovered.length===0){let a=s.length>0?"No new projects found, everything in your session history is already imported.":"No existing projects found in your session history yet. You can add one later from the home screen.";e.createEl("p",{text:a}),new de.Setting(e).addButton(o=>o.setButtonText(s.length>0?"Close":"Next").setCta().onClick(()=>{s.length>0?this.close():this.goto("folders")}));return}e.createEl("p",{text:"We found you were working on these. Pick which ones to import, and their planet color:"});for(let a of this.discovered)this.colors.has(a.cwd)||this.colors.set(a.cwd,Us(Gi(Gr(a.cwd)))),new de.Setting(e).setName(a.name).setDesc(`${a.cwd} \xB7 ${a.sessionCount} session${a.sessionCount===1?"":"s"}`).addColorPicker(o=>o.setValue(this.colors.get(a.cwd)).onChange(l=>this.colors.set(a.cwd,l))).addToggle(o=>o.setValue(this.selected.has(a.cwd)).onChange(l=>{l?this.selected.add(a.cwd):this.selected.delete(a.cwd)}));new de.Setting(e).addButton(a=>a.setButtonText("Next").setCta().onClick(Oi(async()=>{let l=await Ye(this.app.vault);for(let c of this.discovered)if(this.selected.has(c.cwd)){let h=this.colors.get(c.cwd);l=Th(l,{name:c.name,path:c.cwd,hue:h?Eh(h):void 0})}await He(this.app.vault,l),this.next()})))}async renderGraphify(){let{contentEl:e}=this,n=this.discovered.filter(r=>this.selected.has(r.cwd));if(n.length===0){this.goto("folders");return}e.createEl("p",{text:"Checking for existing graphify graphs\u2026"});let s=await Xn();this.graphifyNeeded=[];for(let r of n)await Td(r.cwd)||this.graphifyNeeded.push(r);if(e.empty(),e.createEl("h2",{text:"Codestellation setup"}),new de.Setting(e).setName("Vault export").setDesc(`How much of each graph to export into the vault. "Full" writes one note per node (can be thousands of files for a large project). "Lighter" keeps only the largest ~${sh} nodes' worth of communities.`).addDropdown(r=>r.addOption("full","Full export (all nodes)").addOption("lite",`Lighter export (top ~${sh} nodes)`).setValue(this.exportMode).onChange(a=>{this.exportMode=a})),!s.installed){e.createEl("p",{text:"graphify isn't installed, so graphs can't be generated right now. Imported projects without an existing graph will just show as ungraphed for now."});let r="pip install graphifyy",a=e.createEl("p");a.createSpan({text:"Install it with: "}),a.createEl("code",{text:r});let o=a.createEl("button",{cls:"cs-btn cs-btn-ghost",text:"Copy"});o.style.marginLeft="8px",o.addEventListener("click",async()=>{await navigator.clipboard.writeText(r),new de.Notice("Copied. Run it, then use Re-detect here.")});let l=e.createEl("button",{cls:"cs-btn cs-btn-primary",text:"Re-detect Graphify"});l.addEventListener("click",Oi(async()=>{l.disabled=!0,l.setText("Checking\u2026");let c=await Xn({forceRefresh:!0});if(c.installed){new de.Notice(`Graphify detected${c.version?` (v${c.version})`:""}.`),this.render();return}l.disabled=!1,l.setText("Re-detect Graphify"),new de.Notice("Graphify is still not visible to Obsidian. Check Diagnostics for searched paths.")})),process.platform==="win32"&&e.createEl("p",{cls:"setting-item-description",text:"Already installed it? On Windows, Obsidian only sees PATH changes from a full restart, not just reopening this wizard. Fully quit and reopen Obsidian, then try again."}),new de.Setting(e).addButton(c=>c.setButtonText("Next").setCta().onClick(Oi(async()=>{let h=n.filter(d=>!this.graphifyNeeded.includes(d));await this.runWithProgress("Setting things up\u2026",d=>this.exportGraphsIntoVault(h,d),h.length),this.next()})));return}if(this.graphifyNeeded.length===0){e.createEl("p",{text:"Every selected project already has a graphify graph \u2014 nothing to generate."}),new de.Setting(e).addButton(r=>r.setButtonText("Next").setCta().onClick(Oi(async()=>{await this.runWithProgress("Exporting graphs into your vault\u2026",a=>this.exportGraphsIntoVault(n,a),n.length),this.next()})));return}e.createEl("p",{text:"These projects don't have a graphify graph yet. Generating one uses more tokens up front than normal. Pick which ones to generate now (you can always do this later per-project):"});for(let r of this.graphifyNeeded)new de.Setting(e).setName(r.name).setDesc("No graphify graph found").addToggle(a=>a.setValue(!1).onChange(o=>this.graphifyChoices.set(r.cwd,o)));new de.Setting(e).addButton(r=>r.setButtonText("Next").setCta().onClick(Oi(async()=>{let a=this.graphifyNeeded.filter(o=>this.graphifyChoices.get(o.cwd));await this.runWithProgress("Setting up graphify\u2026",async o=>{let l=s.bin??"graphify";for(let c of a){o(`\u23F3 Generating graph for ${c.name}\u2026 this can take a while`);try{await ye(l,[c.cwd,"--no-viz"],{timeoutMs:10*60*1e3}),await Ts(c.cwd),o(`\u2713 Graph generated for ${c.name}`)}catch(h){let d=h.message??String(h);if(/no LLM API key found/i.test(d)){o(`\u2139 No LLM API key configured, retrying ${c.name} as code-only (skips docs/images, needs no key)`);try{await ye(l,[c.cwd,"--no-viz","--code-only"],{timeoutMs:10*60*1e3}),await Ts(c.cwd),o(`\u2713 Graph generated for ${c.name} (code-only)`);continue}catch(u){o(`\u26A0 Failed to generate a graph for ${c.name} even as code-only: ${u.message}`);continue}}o(`\u26A0 Failed to generate a graph for ${c.name}: ${d}`);continue}}await this.exportGraphsIntoVault(n,o)},a.length+n.length),this.next()})))}async runWithProgress(e,n,s){let{contentEl:r}=this;r.empty(),r.createEl("h2",{text:"Codestellation setup"});let a=r.createDiv({cls:"cs-progress-card"}),o=a.createDiv({cls:"cs-progress-status"}),l=o.createDiv({cls:"cs-spinner"}),c=o.createSpan({text:e}),h=a.createDiv({cls:"cs-progress-list"}),d=0,u=!1,m=()=>{s&&s>0&&c.setText(`${e} (${Math.min(d,s)}/${s})`)},x=v=>{let p=h.createDiv({cls:"cs-progress-row"}),f=/^[✓]/.test(v),S=/^[⚠✗]/.test(v);p.addClass(f?"is-done":S?"is-warn":"is-info"),p.setText(v.replace(/^[✓⚠✗ℹ⏳]\s*/,"")),(f||S)&&(d++,m()),S&&(u=!0)};try{await n(x)}catch(v){x(`\u26A0 ${v.message??v}`)}l.remove(),o.addClass(u?"is-warn":"is-done"),c.setText(u?"Finished with some errors, review before continuing":"Done"),await new Promise(v=>{new de.Setting(r).addButton(p=>p.setButtonText("Continue").setCta().onClick(()=>v()))})}async exportGraphsIntoVault(e,n){if(e.length===0)return;let s=this.app.vault.adapter;if(!(s instanceof de.FileSystemAdapter))return;let r=s.getBasePath(),a=(await Xn()).bin??"graphify",o=await Ye(this.app.vault);for(let l of e){let c=o.find(m=>m.path===l.cwd);if(!c)continue;let h=await this.graphNodeCount(l.cwd);h!==null&&h>zy&&n?.(`\u2139 ${l.name}'s graph has ${h.toLocaleString()} nodes, using the "${this.exportMode}" export you selected.`),await Ts(l.cwd);let d=`${r}/${Oe}/${c.id}/graph`;n?.(`\u23F3 Exporting graph for ${l.name} into the vault\u2026`);let u=null;try{if(this.exportMode==="lite"){let p=await Pr(Ir.join(l.cwd,"graphify-out","graph.json")),f=Vd(p,sh);u=Ir.join(Gd.tmpdir(),`codestellation-lite-${c.id}-${Date.now()}.json`),await As.writeFile(u,JSON.stringify(f)),n?.(`  (filtered to ${f.nodes.length} nodes across its largest communities)`)}let m=["export","obsidian","--dir",d];u&&m.push("--graph",u),await ye(a,m,{cwd:l.cwd,timeoutMs:5*60*1e3}),c.graphPath=`${Oe}/${c.id}/graph/graph.canvas`;let x=`${r}/${c.graphPath}`;await rl(x,Us(c.hue));let v=u??Ir.join(l.cwd,"graphify-out","graph.json");await As.copyFile(v,`${d}/graph.json`).catch(p=>{n?.(`\u26A0 Couldn't copy graph.json into the vault for ${l.name}: ${p.message}`)}),n?.(`\u2713 Exported graph for ${l.name}`)}catch(m){n?.(`\u26A0 Couldn't export the graph for ${l.name}: ${m.message}`)}finally{u&&await As.unlink(u).catch(()=>{})}}await He(this.app.vault,o)}async graphNodeCount(e){try{return(await Pr(Ir.join(e,"graphify-out","graph.json"))).nodes.length}catch{return null}}async renderFolders(){await this.runWithProgress("Setting things up\u2026",async e=>{await il(this.app.vault,nh(),s=>e(`\u2713 ${s}`));let n=await Ye(this.app.vault);for(let s of n)await il(this.app.vault,kd(s.id),r=>e(`\u2713 ${r}`)),await zd(this.app.vault,s),e(`\u2713 ${Oe}/${s.id}/overview.md`)}),this.next()}renderDone(){let{contentEl:e}=this;e.createEl("p",{text:`All set, ${this.plugin.settings.userName}. Your vault is ready.`}),new de.Setting(e).addButton(n=>n.setButtonText("Open Codestellation").setCta().onClick(Oi(async()=>{this.plugin.settings.onboardingComplete=!0,await this.plugin.saveSettings(),this.close(),await this.plugin.activateHomeView()})))}};var ol=require("obsidian"),Cs=class extends ol.Modal{constructor(t,e){super(t),this.onStartTour=e}onOpen(){let{contentEl:t}=this;t.addClass("cs-modal"),t.addClass("cs-help-modal"),t.createEl("h2",{text:"How Codestellation actually works"}),Lr(t,"Importing a project",["Codestellation reads your local Claude Code / Codex session history to find projects you've actually worked in, then writes a registry entry plus an overview note into this vault under Codestellation/.","This only imports metadata (name, path, color) \u2014 it does not copy your source code into the vault."]),Lr(t,"The graphify graph \u2014 where it actually lives",["graphify always builds its output as graphify-out/ inside your real project folder. That's graphify's own behavior, not something this plugin controls, and it can't be redirected elsewhere.","Codestellation copies the raw graph.json from there into this vault too (Codestellation/projects/<slug>/graph/graph.json), alongside a graphify-generated .canvas file and per-node notes.","These are two different things for two different jobs: the project folder copy is what graphify's own CLI (query/explain/path) actually reads. The vault copy only feeds this plugin's own Graph tab canvas \u2014 nothing outside Codestellation reads the vault copy."]),Lr(t,"How this actually helps Claude",["Separately from this plugin, if you have the graphify skill installed in your own Claude Code setup, Claude auto-detects graphify-out/ in a project folder and queries the graph instead of reading files one by one for structural questions \u2014 cheaper and faster than raw file reads.",`The "Start new session here" button (Chats tab) copies a command that cds into the project and starts Claude with a system-prompt reminder to use graphify. That's a nudge, not a guarantee: it only works if you have graphify (and ideally the graphify skill) installed on your own machine \u2014 this plugin can't install or configure that for you.`]),Lr(t,"Chats",["Lists real Claude Code / Codex sessions found for this project. Titles come from Claude's own custom-title (or your first prompt as a fallback), and from Codex's session_index.jsonl.",`"Copy resume command" copies claude --resume <id> to your clipboard \u2014 Obsidian can't embed an interactive chat, so resuming happens in your own terminal.`]),Lr(t,"Branches, Work Log, Check-in",["Branches and the branch comparator read directly from git \u2014 always current, nothing cached.","Work Log AI summaries are currently disabled (a permission-prompt bug when shelling out from inside Obsidian) \u2014 it shows a plain commit list instead.","Check-in is a manual status-bar timer you start yourself \u2014 nothing here tracks time automatically."]),t.createEl("p",{cls:"setting-item-description",text:"Full, current list of what's estimated, faked, or not built yet is in the README on GitHub."}),this.onStartTour&&new ol.Setting(t).addButton(e=>e.setButtonText("Start guided tour").setCta().onClick(()=>{this.close(),this.onStartTour?.()}))}onClose(){this.contentEl.empty()}};function Lr(i,t,e){i.createEl("h3",{text:t});for(let n of e)i.createEl("p",{text:n})}var Rs=class{constructor(t,e){this.index=0;this.overlay=null;this.onResize=()=>this.render();this.root=t,this.steps=e}start(){this.steps.length!==0&&(this.index=0,window.addEventListener("resize",this.onResize),this.render())}stop(){window.removeEventListener("resize",this.onResize),this.overlay?.remove(),this.overlay=null}render(){this.overlay?.remove();let t=this.steps[this.index];t.onEnter?.();let e=this.root.querySelector(t.selector),n=document.createElement("div");n.className="cs-guide-overlay",this.root.appendChild(n),this.overlay=n;let s=n.createDiv({cls:"cs-guide-highlight"});if(e){let h=e.getBoundingClientRect(),d=this.root.getBoundingClientRect();s.style.left=`${h.left-d.left-8}px`,s.style.top=`${h.top-d.top-8}px`,s.style.width=`${h.width+8*2}px`,s.style.height=`${h.height+8*2}px`}else s.style.display="none";let r=n.createDiv({cls:"cs-guide-card"});if(e){let h=e.getBoundingClientRect(),d=this.root.getBoundingClientRect();d.bottom-h.bottom>160?r.style.top=`${h.bottom-d.top+8+12}px`:(r.style.top=`${Math.max(12,h.top-d.top-12)}px`,r.style.transform="translateY(-100%)"),r.style.left=`${Math.max(12,h.left-d.left)}px`}else r.addClass("cs-guide-card-centered");r.createDiv({cls:"cs-guide-step-count",text:`${this.index+1} / ${this.steps.length}`}),r.createEl("h3",{text:t.title}),r.createEl("p",{text:t.body});let a=r.createDiv({cls:"cs-guide-actions"});a.createEl("button",{cls:"cs-btn cs-btn-ghost",text:"Skip"}).addEventListener("click",()=>this.stop()),this.index>0&&a.createEl("button",{cls:"cs-btn cs-btn-ghost",text:"Back"}).addEventListener("click",()=>{this.index--,this.render()});let l=this.index===this.steps.length-1;a.createEl("button",{cls:"cs-btn cs-btn-primary",text:l?"Done":"Next"}).addEventListener("click",()=>{if(l){this.stop();return}this.index++,this.render()})}};var Wd=["debug","info","warn","error"],rh=class{constructor(t="info"){this.minLevel=t}setLevel(t){this.minLevel=t}enabled(t){return Wd.indexOf(t)>=Wd.indexOf(this.minLevel)}debug(...t){this.enabled("debug")&&console.debug("[Codestellation]",...t)}info(...t){this.enabled("info")&&console.info("[Codestellation]",...t)}warn(...t){this.enabled("warn")&&console.warn("[Codestellation]",...t)}error(...t){this.enabled("error")&&console.error("[Codestellation]",...t)}},se=new rh;function Ps(i,t){i.dataset.csFont=t.interfaceFont,i.dataset.csIntensity=t.sceneIntensity,i.style.setProperty("--cs-galaxy-hue",String(t.galaxyAccentHue))}var Dr=jt(require("node:fs/promises"),1),ll=jt(require("node:path"),1);async function Nr(i){let[t,e]=await Promise.all([ye("git",["for-each-ref","--format=%(refname:short)","refs/heads/"],{cwd:i}),ye("git",["for-each-ref","--format=%(refname:short)","refs/remotes/"],{cwd:i})]),n=new Set(t.stdout.split(`
`).map(o=>o.trim()).filter(Boolean)),s=new Set(e.stdout.split(`
`).map(o=>o.trim()).filter(o=>o&&o.includes("/")&&!o.endsWith("/HEAD")).map(o=>o.replace(/^[^/]+\//,""))),r=new Set([...n,...s]),a=[];for(let o of r){let l=n.has(o),c=s.has(o),h=l&&c?"both":l?"local":"remote";a.push({name:o,location:h,stale:!1})}return await Hy(i,a),a}async function cl(i){if(await Dr.stat(ll.join(i,".git")).then(()=>!0).catch(()=>!1))return Nr(i);let e=await Dr.readdir(i,{withFileTypes:!0}).catch(()=>[]),n=(await Promise.all(e.filter(r=>r.isDirectory()).map(async r=>{let a=ll.join(i,r.name);return await Dr.stat(ll.join(a,".git")).then(()=>!0).catch(()=>!1)?a:null}))).filter(r=>r!==null);return(await Promise.all(n.map(r=>Nr(r).catch(()=>[])))).flat()}async function Hy(i,t){await Promise.all(t.map(async e=>{let n=e.location==="remote"?`origin/${e.name}`:e.name;try{let{stdout:s}=await ye("git",["log","-1","--format=%ct",n],{cwd:i}),r=Number(s.trim());if(Number.isFinite(r)){let a=(Date.now()/1e3-r)/86400;e.stale=a>30}}catch{}}))}var Vy=[{selector:".cs-topbar-title",title:"Welcome to Codestellation",body:"This is your command center: a home screen for every coding project you've imported, built from your real local Claude Code / Codex session history and git repos, not sample data."},{selector:".cs-star-identity",title:"You are the command star",body:"The name here comes from what you entered during setup. Everything orbiting around it is a project you've imported."},{selector:".cs-celestial-target",title:"Each target is one project",body:"Hover one to highlight it, click to select it. Its color was either auto-generated or picked by you during import."},{selector:".cs-celestial-labels",title:"Selecting a project",body:`Clicking a project shows its name, path, and an "Open workspace" button in a card here. That workspace is where the real data lives: stats, chats, branches, graph, and work log, all specific to that one project. A "\u2190 Back to system" button appears in the top-left once you've selected one.`},{selector:".cs-topbar-add",title:"Import more projects any time",body:"This re-runs the project-discovery step of setup without making you redo your name or re-detect Claude/Codex \u2014 it just looks for anything new in your session history."}],hl=class extends rn.ItemView{constructor(e,n){super(e);this.galaxy=null;this.disposeGreeting=null;this.resizeObserver=null;this.plugin=n}getViewType(){return Hi}getDisplayText(){return"Codestellation"}getIcon(){return"orbit"}async onOpen(){let e=this.app.workspace;this.registerEvent(e.on("codestellation:refresh-home",()=>this.reload())),await this.buildScene({showGreetingAnim:!0})}async reload(){this.teardown(),await this.buildScene({showGreetingAnim:!1})}async buildScene({showGreetingAnim:e}){let n=this.containerEl.children[1];n.empty(),n.style.padding="0";let s=await Ye(this.app.vault),r=s.filter($=>!$.hidden),[a,o]=await Promise.all([this.loadGraphNodeCounts(s),this.loadProjectBranches(s)]),l=n.createDiv({cls:"cs-shell cs-home-shell cs-galaxy-shell"});Ps(l,this.plugin.settings);let c=l.createDiv({cls:"cs-topbar cs-galaxy-topbar"});c.createDiv({cls:"cs-topbar-title",text:"Codestellation"});let h=c.createDiv({cls:"cs-topbar-actions"});h.createEl("button",{cls:"cs-btn cs-btn-ghost cs-topbar-add",text:"+ Add project"}).addEventListener("click",()=>new Pn(this.app,this.plugin,"projects",()=>this.reload()).open());let u=h.createEl("button",{cls:"cs-btn cs-btn-ghost",text:"Manage"});h.createEl("button",{cls:"cs-btn cs-btn-ghost",text:"? Help"}).addEventListener("click",()=>new Cs(this.app,()=>new Rs(l,Vy).start()).open());let x=l.createDiv({cls:"cs-project-manager"});x.hidden=!0,x.createDiv({cls:"cs-project-manager-title",text:"Manage project worlds"}),x.createDiv({cls:"cs-project-manager-subtitle",text:"Hide worlds temporarily or remove only their Codestellation registration."});let v=x.createDiv({cls:"cs-project-manager-appearance"}),p=v.createEl("label",{cls:"cs-manager-control"});p.createSpan({text:"Interface font"});let f=p.createEl("select",{cls:"cs-filter"});[["obsidian","Obsidian"],["system","System"],["serif","Editorial serif"],["mono","Monospace"]].forEach(([$,xt])=>f.createEl("option",{value:$,text:xt})),f.value=this.plugin.settings.interfaceFont,f.addEventListener("change",()=>{this.plugin.settings.interfaceFont=f.value,Ps(l,this.plugin.settings),this.plugin.saveSettings()});let S=v.createEl("label",{cls:"cs-manager-control"});S.createSpan({text:"Galaxy accent"});let T=S.createEl("input",{cls:"cs-manager-accent-slider",type:"range"});T.min="0",T.max="359",T.value=String(this.plugin.settings.galaxyAccentHue),T.addEventListener("input",()=>{this.plugin.settings.galaxyAccentHue=Number(T.value),Ps(l,this.plugin.settings)}),T.addEventListener("change",()=>this.plugin.saveSettings().then(()=>this.reload()));let b=v.createEl("label",{cls:"cs-manager-control"});b.createSpan({text:"Scene"});let A=b.createEl("select",{cls:"cs-filter"});A.createEl("option",{value:"minimal",text:"Minimal \xB7 low-end PCs"}),A.createEl("option",{value:"calm",text:"Calm"}),A.createEl("option",{value:"cinematic",text:"Cinematic"}),A.value=this.plugin.settings.sceneIntensity,A.addEventListener("change",()=>{this.plugin.settings.sceneIntensity=A.value,this.plugin.saveSettings().then(()=>this.reload())});let M=x.createDiv({cls:"cs-project-manager-list"});s.forEach($=>this.renderProjectManagerRow(M,$,s)),u.addEventListener("click",()=>{x.hidden=!x.hidden,u.classList.toggle("is-active",!x.hidden)});let C=l.createDiv({cls:"cs-solar-wrap cs-galaxy-wrap"}),y=C.createDiv({cls:"cs-home-intro cs-galaxy-intro"});y.createDiv({cls:"cs-home-eyebrow",text:"Live project system"}),y.createDiv({cls:"cs-home-title",text:"Your work, in orbit."});let E=s.length-r.length;y.createDiv({cls:"cs-home-subtitle",text:`${r.length} active project${r.length===1?"":"s"}${E?` \xB7 ${E} hidden`:""} \xB7 select a world to enter`}),y.createDiv({cls:"cs-home-preview-banner",text:"Preview build \xB7 evolving in small steps \xB7 occasional breakage is expected"});let R=l.createDiv({cls:"cs-hub-stage"}),P=R.createEl("button",{cls:"cs-btn cs-btn-ghost cs-hub-back",text:"\u2190 Back to system"});P.hidden=!0;let F=R.createDiv({cls:"cs-hub-content cs-galaxy-project-card cs-world-inspector"});if(r.length===0){this.renderEmptyState(C,E>0?"All project worlds are hidden. Use Manage to restore one.":void 0);return}let q=C.createDiv({cls:"cs-galaxy-host"}),Y=C.createDiv({cls:"cs-celestial-labels"}),k=Y.createDiv({cls:"cs-star-identity"});k.createSpan({cls:"cs-star-identity-name",text:this.plugin.settings.userName||"You"}),k.createSpan({cls:"cs-star-identity-role",text:"Command star"});let G=C.createDiv({cls:"cs-galaxy-controls"}),V=G.createEl("button",{cls:"cs-galaxy-control",text:"\u21BA"});V.setAttribute("aria-label","Rotate system left");let K=G.createEl("button",{cls:"cs-galaxy-control",text:"\u2212"});K.setAttribute("aria-label","Zoom out");let et=G.createEl("button",{cls:"cs-galaxy-control cs-galaxy-control-fit",text:"Fit"});et.setAttribute("aria-label","Fit all planets in view");let ct=G.createEl("button",{cls:"cs-galaxy-control",text:"+"});ct.setAttribute("aria-label","Zoom in");let dt=G.createEl("button",{cls:"cs-galaxy-control",text:"\u21BB"});dt.setAttribute("aria-label","Rotate system right"),G.createSpan({cls:"cs-galaxy-control-hint",text:"Drag to rotate \xB7 scroll to zoom"});let mt=new Map;r.forEach(($,xt)=>{let _t=Y.createEl("button",{cls:"cs-celestial-target"});_t.style.setProperty("--planet-hue",String($.hue)),_t.setAttribute("aria-label",`Open ${$.name}`),_t.dataset.projectId=$.id,_t.createSpan({cls:"cs-celestial-target-ring"});let $t=_t.createSpan({cls:"cs-celestial-target-copy"});$t.createSpan({cls:"cs-celestial-target-name",text:$.name}),Tr($,xt,a.get($.id)).hasLife&&$t.createSpan({cls:"cs-celestial-life",text:"\u25CF Living world"}),$t.createSpan({cls:"cs-celestial-target-hint",text:"Enter workspace"}),mt.set($.id,_t)});let zt=null,Lt=null,qt=({id:$,x:xt,y:_t,depth:$t,visible:Ft})=>{let Ht=mt.get($);if(!Ht)return;let Vt=Math.max(.82,Math.min(1.12,1-$t*.08));Ht.style.setProperty("--cs-project-x",`${xt}px`),Ht.style.setProperty("--cs-project-y",`${_t}px`),Ht.style.setProperty("--cs-project-scale",String(Vt)),Ht.style.zIndex=String(Math.round(20-$t*6)),Ht.classList.toggle("is-behind",$t>.76||!Ft)},Z=$=>{F.empty();let xt=F.createDiv({cls:"cs-project-preview"});xt.appendChild(P),P.hidden=!1,xt.createDiv({cls:"cs-home-eyebrow",text:"Selected world"}),xt.createDiv({cls:"cs-planet-card-name",text:$.name}),xt.createDiv({cls:"cs-planet-card-sub",text:$.path});let _t=r.findIndex(Q=>Q.id===$.id),$t=Tr($,_t,a.get($.id)),Ft=xt.createDiv({cls:"cs-world-meta"}),Ht=a.get($.id);Ht!==void 0&&Ft.createSpan({cls:"cs-world-chip",text:`${Ht.toLocaleString()} graph nodes`});let Vt=o.get($.id)??[],Gt=Vt.length;Ft.createSpan({cls:"cs-world-chip",text:`${Gt} branch orbital${Gt===1?"":"s"}`});let le=null;$t.hasLife&&(le=Ft.createSpan({cls:"cs-world-chip cs-world-chip-life",text:"\u25CF Living world"})),xt.createDiv({cls:"cs-project-preview-copy",text:"Chats, branches, graph context, activity, and work logs\u2014together in one focused workspace."});let Qt=xt.createDiv({cls:"cs-world-appearance"});Qt.style.setProperty("--world-hue",String($.hue));let _e=Qt.createDiv({cls:"cs-world-appearance-header"});_e.createSpan({text:"Planet color"});let we=_e.createSpan({cls:"cs-world-color-value",text:`${Math.round($.hue)}\xB0`}),Zt=Qt.createEl("input",{cls:"cs-world-color-slider",type:"range"});Zt.min="0",Zt.max="359",Zt.step="1",Zt.value=String(Math.round($.hue)),Zt.setAttribute("aria-label",`Planet color for ${$.name}`),Zt.style.setProperty("--world-hue",String($.hue)),Zt.addEventListener("input",()=>{let Q=Number(Zt.value);$.hue=Q,we.setText(`${Q}\xB0`),Qt.style.setProperty("--world-hue",String(Q)),mt.get($.id)?.style.setProperty("--planet-hue",String(Q)),Lt?.setProjectHue($.id,Q)}),Zt.addEventListener("change",()=>{He(this.app.vault,s).catch(Q=>{se.error("failed to save planet color for",$.id,Q),new rn.Notice(`Couldn't save the planet color for ${$.name}.`)})});let fe=Qt.createDiv({cls:"cs-world-appearance-header cs-world-size-header"});fe.createSpan({text:"Planet size"});let D=fe.createSpan({cls:"cs-world-size-value",text:`${Math.round(($.planetScale??1)*100)}%`}),he=Qt.createEl("input",{cls:"cs-world-size-slider",type:"range"});he.min="65",he.max="118",he.step="1",he.value=String(Math.round(($.planetScale??1)*100)),he.setAttribute("aria-label",`Planet size for ${$.name}`),he.addEventListener("input",()=>{let Q=Number(he.value)/100;$.planetScale=Q,D.setText(`${he.value}%`),Lt?.setProjectScale($.id,Q)}),he.addEventListener("change",()=>{He(this.app.vault,s).catch(Q=>{se.error("failed to save planet size for",$.id,Q),new rn.Notice(`Couldn't save the planet size for ${$.name}.`)})});let Jt=Qt.createEl("label",{cls:"cs-world-life-toggle"}),w=Jt.createEl("input",{type:"checkbox"});w.checked=$t.hasLife;let g=Jt.createSpan();g.createSpan({cls:"cs-world-life-title",text:"Living world"}),g.createSpan({cls:"cs-world-life-subtitle",text:"Oceans, continents, clouds, and a biosphere glow"}),w.addEventListener("change",()=>{$.hasLife=w.checked,Lt?.setProjectLife($.id,w.checked);let Q=mt.get($.id)?.querySelector(".cs-celestial-target-copy");if(Q?.querySelector(".cs-celestial-life")?.remove(),w.checked&&Q){let st=document.createElement("span");st.className="cs-celestial-life",st.textContent="\u25CF Living world",Q.insertBefore(st,Q.querySelector(".cs-celestial-target-hint")),le??(le=Ft.createSpan({cls:"cs-world-chip cs-world-chip-life",text:"\u25CF Living world"}))}else le?.remove(),le=null;He(this.app.vault,s).catch(st=>{se.error("failed to save living-world choice for",$.id,st),new rn.Notice(`Couldn't save the living-world choice for ${$.name}.`)})});let U=Vt.filter(Q=>Q.location!=="remote").length,z=Vt.filter(Q=>Q.location==="remote").length,W=Qt.createDiv({cls:"cs-world-orbitals"}),it=W.createDiv({cls:"cs-world-orbitals-heading"});it.createSpan({text:"Branch orbitals"}),it.createSpan({cls:"cs-world-orbitals-total",text:`${Gt} branches`});let at=(Q,st,Tt,Ct)=>{let Nt=W.createEl("label",{cls:"cs-world-orbital-toggle"}),I=Nt.createEl("input",{type:"checkbox"});I.checked=Ct;let rt=Nt.createSpan();rt.createSpan({cls:"cs-world-orbital-title",text:st}),rt.createSpan({cls:"cs-world-orbital-subtitle",text:`${Tt} ${Q==="moon"?"local/shared branches":"remote-only branches"}`}),I.addEventListener("change",()=>{Q==="moon"?$.showBranchMoons=I.checked:$.showBranchSatellites=I.checked,Lt?.setProjectOrbitalVisible($.id,Q,I.checked),He(this.app.vault,s).catch(j=>{se.error("failed to save branch orbital visibility for",$.id,j),new rn.Notice(`Couldn't save branch orbital visibility for ${$.name}.`)})})};at("moon","Show moons",U,$.showBranchMoons!==!1),at("satellite","Show satellites",z,$.showBranchSatellites!==!1);let X=xt.createDiv({cls:"cs-project-preview-actions"});X.createEl("button",{cls:"cs-btn cs-btn-primary",text:"Open workspace \u2192"}).addEventListener("click",()=>{this.plugin.activateWorkspaceView($.id).catch(Q=>{se.error("failed to open workspace view for",$.id,Q),new rn.Notice(`Couldn't open the workspace for ${$.name}: ${Q.message??Q}`)})}),X.createEl("button",{cls:"cs-btn cs-btn-ghost",text:"Hide"}).addEventListener("click",()=>{$.hidden=!0,He(this.app.vault,s).then(()=>this.reload()).catch(Q=>{se.error("failed to hide project",$.id,Q),new rn.Notice(`Couldn't hide ${$.name}.`)})});let Mt=X.createEl("button",{cls:"cs-btn cs-btn-danger-ghost",text:"Remove\u2026"});this.bindRegistryRemoval(Mt,$,s),F.classList.add("is-visible")},ot=$=>{zt||(zt=$,R.classList.add("is-active"),C.classList.add("is-backgrounded"),mt.forEach((xt,_t)=>xt.classList.toggle("is-selected",_t===$.id)),Lt?.focusProject($.id,()=>Z($)),Lt||Z($))};mt.forEach(($,xt)=>{let _t=r.find($t=>$t.id===xt);_t&&($.addEventListener("mouseenter",()=>Lt?.setHighlightedProject(xt)),$.addEventListener("mouseleave",()=>Lt?.setHighlightedProject(null)),$.addEventListener("focus",()=>Lt?.setHighlightedProject(xt)),$.addEventListener("blur",()=>Lt?.setHighlightedProject(null)),$.addEventListener("click",()=>ot(_t)))});let nt=()=>{if(!zt)return;F.classList.remove("is-visible"),P.hidden=!0;let $=()=>{R.classList.remove("is-active"),C.classList.remove("is-backgrounded"),mt.forEach(xt=>xt.classList.remove("is-selected")),zt=null};Lt?.returnToSystem($),Lt||$()};P.addEventListener("click",nt),V.addEventListener("click",()=>Lt?.rotateBy(-.22,0)),dt.addEventListener("click",()=>Lt?.rotateBy(.22,0)),K.addEventListener("click",()=>Lt?.zoomBy(1.18)),ct.addEventListener("click",()=>Lt?.zoomBy(.84)),et.addEventListener("click",()=>Lt?.fitSystem()),l.addEventListener("keydown",$=>{$.key==="Escape"&&zt&&($.preventDefault(),nt())});try{Lt=new tl({container:q,entries:r,graphNodeCounts:a,projectBranches:o,sceneIntensity:this.plugin.settings.sceneIntensity,galaxyAccentHue:this.plugin.settings.galaxyAccentHue,onProjectPosition:qt}),this.galaxy=Lt}catch($){se.error("3D galaxy initialization failed; using accessible project list",$),q.remove(),Y.classList.add("is-fallback"),mt.forEach(xt=>xt.classList.add("is-fallback"))}if(this.resizeObserver=new ResizeObserver($=>{$[0]?.contentRect.width>0&&$[0]?.contentRect.height>0?(Lt?.resize(),Lt?.start()):Lt?.stop()}),this.resizeObserver.observe(l),!e){Lt?.start();return}C.style.opacity="0",this.disposeGreeting=vd(l,{name:this.plugin.settings.userName||"there",onDone:()=>{C.style.transition="opacity 900ms ease",C.style.opacity="1",Lt?.start()}})}renderProjectManagerRow(e,n,s){let r=e.createDiv({cls:"cs-project-manager-row"}),a=r.createDiv({cls:"cs-project-manager-copy"});a.createDiv({cls:"cs-project-manager-name",text:n.name}),a.createDiv({cls:"cs-project-manager-path",text:n.path});let o=r.createDiv({cls:"cs-project-manager-actions"});o.createEl("button",{cls:"cs-btn cs-btn-ghost",text:n.hidden?"Show":"Hide"}).addEventListener("click",()=>{n.hidden=!n.hidden,He(this.app.vault,s).then(()=>this.reload()).catch(h=>{se.error("failed to update project visibility",n.id,h),new rn.Notice(`Couldn't ${n.hidden?"hide":"show"} ${n.name}.`)})});let c=o.createEl("button",{cls:"cs-btn cs-btn-danger-ghost",text:"Remove\u2026"});this.bindRegistryRemoval(c,n,s)}bindRegistryRemoval(e,n,s){let r=!1,a=null;e.addEventListener("click",()=>{if(!r){r=!0,e.setText("Confirm remove"),e.classList.add("is-armed"),a=window.setTimeout(()=>{r=!1,e.setText("Remove\u2026"),e.classList.remove("is-armed")},5e3);return}a!==null&&window.clearTimeout(a);let o=s.findIndex(l=>l.id===n.id);o>=0&&s.splice(o,1),He(this.app.vault,s).then(()=>(new rn.Notice(`${n.name} was removed from Codestellation. Project files were not touched.`),this.reload())).catch(l=>{se.error("failed to remove project registration",n.id,l),new rn.Notice(`Couldn't remove ${n.name} from Codestellation.`)})})}renderEmptyState(e,n="No project worlds yet."){let s=e.createDiv({cls:"cs-empty"});s.createEl("p",{text:n}),s.createEl("button",{cls:"cs-btn cs-btn-primary",text:"Import a project"}).addEventListener("click",()=>new Pn(this.app,this.plugin,"projects",()=>this.reload()).open())}async loadGraphNodeCounts(e){let n=new Map;return await Promise.all(e.map(async s=>{if(!s.graphPath)return;let r=s.graphPath.replace(/\/graph\.canvas$/,"");try{let o=(await this.app.vault.adapter.list(r)).files.filter(l=>l.endsWith(".md")).length;o>0&&n.set(s.id,o)}catch(a){se.debug("could not count graph nodes for planet sizing",s.id,a)}})),n}async loadProjectBranches(e){let n=new Map;return await Promise.all(e.map(async s=>{try{n.set(s.id,await cl(s.path))}catch(r){se.debug("could not load git branches for orbital objects",s.id,r),n.set(s.id,[])}})),n}teardown(){this.galaxy?.dispose(),this.disposeGreeting?.(),this.resizeObserver?.disconnect(),this.galaxy=null,this.disposeGreeting=null,this.resizeObserver=null}async onClose(){this.teardown()}};var Tf=require("obsidian");function Xd(i,t){if(!i||!t)return 0;let e=new Date(t).getTime()-new Date(i).getTime();return!Number.isFinite(e)||e<=0?0:Math.min(e/(1e3*60*60),4)}function $d(i,t){return i?t?i>t?i:t:i:t}function ul(i,t){let e={},n=0,s=0,r=null,a=0;for(let o of i){for(let[l,c]of Object.entries(o.tokensByModel))e[l]=(e[l]??0)+c,n+=c;s+=Xd(o.firstTimestamp,o.lastTimestamp),r=$d(r,o.lastTimestamp),a+=o.unparsedLineCount}for(let o of t){let l=o.model??"unknown",c=o.totalInputTokens+o.totalOutputTokens;e[l]=(e[l]??0)+c,n+=c,s+=Xd(o.firstTimestamp,o.lastTimestamp),r=$d(r,o.lastTimestamp),a+=o.unparsedLineCount}return{sessionCount:i.length+t.length,totalTokens:n,tokensByModel:e,timeSpentHoursEstimate:s,lastActive:r,unparsedLineCount:a}}var qd=jt(require("node:readline"),1),Yd=require("node:fs"),jd=jt(require("node:fs/promises"),1);async function Zd(){let i=new Map;if(!await jd.stat(Ue.codexSessionIndex).then(()=>!0).catch(()=>!1))return i;let e=qd.createInterface({input:(0,Yd.createReadStream)(Ue.codexSessionIndex,"utf8"),crlfDelay:1/0});for await(let n of e)if(n.trim())try{let s=JSON.parse(n);typeof s.id=="string"&&typeof s.thread_name=="string"&&i.set(s.id,s.thread_name)}catch{}return i}function Jd(i){return i>=1e6?`${(i/1e6).toFixed(1)}M`:i>=1e3?`${(i/1e3).toFixed(1)}K`:String(i)}function Gy(i){return i<1?`${Math.round(i*60)}m`:`${i.toFixed(1)}h`}function Wy(i){if(!i)return"never";let t=Date.now()-new Date(i).getTime(),e=Math.floor(t/864e5);return e<=0?"today":e===1?"yesterday":`${e} days ago`}function Is(i,t,e,n){let s=i.createDiv({cls:"cs-stat"});s.createDiv({cls:"cs-stat-label",text:t}),s.createDiv({cls:"cs-stat-value",text:e}),n&&s.createDiv({cls:"cs-chat-meta",text:n})}function Kd(i,t){i.empty();let{entry:e,stats:n,branchCount:s}=t,r=i.createDiv({cls:"cs-stat-grid"});Is(r,"Sessions",String(n.sessionCount));let a=Object.entries(n.tokensByModel).sort((l,c)=>c[1]-l[1]).map(([l,c])=>`${l}: ${Jd(c)}`).join(" \xB7 ");Is(r,"Tokens used",Jd(n.totalTokens),a||void 0),Is(r,"Time spent",Gy(n.timeSpentHoursEstimate),"estimate, capped per session"),Is(r,"Branches",String(s)),Is(r,"Tokens saved","N/A","not tracked yet, needs a live query to measure against"),Is(r,"Last active",Wy(n.lastActive)),n.unparsedLineCount>0&&i.createDiv({cls:"cs-chat-meta",text:`\u26A0 ${n.unparsedLineCount} log line${n.unparsedLineCount===1?"":"s"} couldn't be parsed and were skipped, so numbers above may undercount slightly.`});let o=i.createDiv({cls:"cs-chat-meta"});o.style.marginTop="var(--cs-space-4)",o.setText(e.path)}var Xy={A:"added",D:"removed",M:"modified"};async function Qd(i,t,e){let{stdout:n}=await ye("git",["diff","--name-status",`${t}...${e}`],{cwd:i});return n.split(`
`).map(s=>s.trim()).filter(Boolean).map(s=>{let[r,...a]=s.split("	"),o=Xy[r[0]]??"modified";return{path:a[a.length-1],status:o}})}async function ah(i,t,e){let{stdout:n}=await ye("git",["log",`${e}..${t}`,"--pretty=format:%H%s"],{cwd:i});return n.split(`
`).map(s=>s.trim()).filter(Boolean).map(s=>{let[r,a]=s.split("");return{hash:r,subject:a}})}var $y={local:"local",remote:"remote",both:"local + remote"},qy={added:"added",removed:"removed",modified:"changed"};function oh(i,t){if(i.empty(),t.length===0||t.every(n=>n.branches.length===0)){i.createDiv({cls:"cs-empty",text:"No branches found (or this isn\u2019t a git repo)."});return}let e=t.length>1;for(let n of t){e&&i.createDiv({cls:"cs-section-label",text:n.label});let s=i.createDiv({cls:"cs-branch-section"});Yy(s,n.branches,n.repoPath)}}function Yy(i,t,e){if(t.length===0){i.createDiv({cls:"cs-empty",text:"No branches found."});return}let n=[...t].sort((h,d)=>Number(h.stale)-Number(d.stale)||h.name.localeCompare(d.name)),s=i.createDiv();for(let h of n){let d=s.createDiv({cls:`cs-branch-row${h.stale?" is-stale":""}`});d.createDiv({cls:"cs-branch-dot"}),d.createSpan({text:h.name}),d.createSpan({cls:"cs-badge",text:$y[h.location]}),h.stale&&d.createSpan({cls:"cs-badge",text:"stale (30d+)"})}if(n.length<2)return;i.createDiv({cls:"cs-section-label",text:"Compare two branches"});let r=i.createDiv({cls:"cs-filter-row"}),a=r.createEl("select",{cls:"cs-filter"}),o=r.createEl("select",{cls:"cs-filter"});for(let h of n)a.createEl("option",{value:h.name,text:h.name}),o.createEl("option",{value:h.name,text:h.name});a.value=n[0].name,o.value=n[1].name;let l=r.createEl("button",{cls:"cs-btn cs-btn-primary",text:"Compare"}),c=i.createDiv();l.addEventListener("click",async()=>{let h=a.value,d=o.value;if(h===d){c.empty(),c.createDiv({cls:"cs-empty",text:"Pick two different branches to compare."});return}c.empty(),c.createDiv({cls:"cs-empty",text:"Comparing\u2026"});try{let[u,m,x]=await Promise.all([ah(e,h,d),ah(e,d,h),Qd(e,h,d)]);jy(c,{refA:h,refB:d,onlyA:u,onlyB:m,fileDiff:x})}catch(u){c.empty(),c.createDiv({cls:"cs-empty",text:`Could not compare these branches: ${u.message??u}`})}})}function jy(i,t){i.empty();let e=i.createDiv({cls:"cs-stat-grid"});if(tf(e,`Only on ${t.refA}`,t.onlyA),tf(e,`Only on ${t.refB}`,t.onlyB),i.createDiv({cls:"cs-section-label",text:`Files changed (${t.refA} \u2192 ${t.refB})`}),t.fileDiff.length===0){i.createDiv({cls:"cs-empty",text:"No file differences."});return}for(let n of t.fileDiff){let s=i.createDiv({cls:"cs-branch-row"});s.createSpan({text:n.path}),s.createSpan({cls:"cs-badge",text:qy[n.status]})}}function tf(i,t,e){let n=i.createDiv({cls:"cs-stat"});if(n.createDiv({cls:"cs-stat-label",text:t}),e.length===0){n.createDiv({cls:"cs-chat-meta",text:"none"});return}for(let s of e)n.createDiv({cls:"cs-chat-meta",text:`${s.hash.slice(0,7)} ${s.subject}`})}var In=require("obsidian"),pl=jt(require("node:path"),1),ml=jt(require("node:fs/promises"),1);var Zy=Math.PI*(3-Math.sqrt(5));function Jy(i,t=20){let n=(i.split(/[\\/]/).pop()||i).replace(/\.[a-z0-9]+$/i,"").replace(/([a-z0-9])([A-Z])/g,"$1 $2").replace(/[^a-zA-Z0-9]+/g," ").trim().split(/\s+/).filter(Boolean);if(n.length===0)return"Community";let s=n[0];for(let r of n.slice(1)){if(`${s} ${r}`.length>t)return`${s}\u2026`;s+=` ${r}`}return s.length>t?`${s.slice(0,t-1)}\u2026`:s}function ef(i,t){let e=t.maxNodes??1500,n=i.length,s=new Map;for(let p of i){let f=p.community??-1,S=s.get(f)??[];S.push(p),s.set(f,S)}let r=Array.from(s.entries()).sort((p,f)=>f[1].length-p[1].length),a=new Map,o=[];if(r.length===0)return{positions:a,communities:o,renderedCount:0,totalCount:n};let l=0,c=e;for(let[,p]of r){if(c<=0)break;l++,c-=p.length}let h=Math.ceil(Math.sqrt(l)),d=Math.ceil(l/h),u=t.width/h,m=t.height/d,x=Math.min(u,m)*.42,v=0;t:for(let p=0;p<r.length;p++){let[f,S]=r[p],T=p%h,b=Math.floor(p/h),A=b%2===1?Math.min(u*.12,18):0,M=Math.min(t.width-u*.45,u*(T+.5)+A),C=m*(b+.5),y=Math.min(1,Math.sqrt(S.length)/12),E=Math.max(4,x*y);o.push({id:f,x:M,y:C,radius:E,nodeCount:S.length,label:Jy(S[0]?.community_name||`Community ${f}`)});for(let R=0;R<S.length;R++){if(v>=e)break t;let P=R*Zy,F=Math.sqrt((R+1)/S.length),q=E*F;a.set(S[R].id,{x:M+Math.cos(P)*q,y:C+Math.sin(P)*q}),v++}}return{positions:a,communities:o,renderedCount:v,totalCount:n}}var Ky=.78,Qy=6,nf=1400,t_=2200,e_=12;function Ls(i,t,e=68){return`hsla(${Gi(String(i??"none"))}, 76%, ${e}%, ${t})`}var dl=class{constructor(t,e){this.degreeCache=new Map;this.offsetX=0;this.offsetY=0;this.scale=1;this.dragging=!1;this.lastDragX=0;this.lastDragY=0;this.hoveredNodeId=null;this.selectedNodeId=null;this.highlights=[];this.rafId=null;this.disposed=!1;this.onMouseUp=()=>{this.dragging=!1,this.canvas.classList.remove("is-dragging")};this.onMouseMove=t=>{let e=this.canvas.getBoundingClientRect(),n=t.clientX-e.left,s=t.clientY-e.top;if(this.dragging){this.offsetX+=t.clientX-this.lastDragX,this.offsetY+=t.clientY-this.lastDragY,this.lastDragX=t.clientX,this.lastDragY=t.clientY,this.hideTooltip(),this.draw();return}let r=this.findNodeAt(n,s);this.hoveredNodeId=r?.id??null,r?this.showTooltip(r,n,s):this.hideTooltip(),this.draw()};this.graph=e,t.classList.add("cs-graph-stage");let n=t.getBoundingClientRect();this.width=Math.max(n.width,300),this.height=Math.max(n.height,300),this.pixelRatio=Math.min(window.devicePixelRatio||1,2),this.canvas=t.createEl("canvas",{cls:"cs-graph-canvas"}),this.canvas.width=Math.round(this.width*this.pixelRatio),this.canvas.height=Math.round(this.height*this.pixelRatio);let s=this.canvas.getContext("2d");if(!s)throw new Error("canvas 2d context unavailable");this.ctx=s;let r=ef(e.nodes,{width:this.width,height:this.height});this.positions=r.positions,this.communities=r.communities,this.renderedCount=r.renderedCount,this.totalCount=r.totalCount;for(let h of e.edges)this.degreeCache.set(h.source,(this.degreeCache.get(h.source)??0)+1),this.degreeCache.set(h.target,(this.degreeCache.get(h.target)??0)+1);this.tooltip=t.createDiv({cls:"cs-graph-tooltip"}),this.tooltip.hidden=!0;let a=t.createDiv({cls:"cs-graph-controls"}),o=a.createEl("button",{cls:"cs-graph-control",text:"\u2212"});o.setAttribute("aria-label","Zoom graph out");let l=a.createEl("button",{cls:"cs-graph-control cs-graph-control-fit",text:"Fit"});l.setAttribute("aria-label","Reset graph view");let c=a.createEl("button",{cls:"cs-graph-control",text:"+"});c.setAttribute("aria-label","Zoom graph in"),o.addEventListener("click",()=>this.zoomAround(this.width/2,this.height/2,.82)),c.addEventListener("click",()=>this.zoomAround(this.width/2,this.height/2,1.2)),l.addEventListener("click",()=>this.resetView()),this.bindInteraction(),this.draw()}bindInteraction(){this.canvas.addEventListener("mousedown",t=>{this.dragging=!0,this.lastDragX=t.clientX,this.lastDragY=t.clientY,this.canvas.classList.add("is-dragging")}),window.addEventListener("mouseup",this.onMouseUp),window.addEventListener("mousemove",this.onMouseMove),this.canvas.addEventListener("mouseleave",()=>{this.dragging||(this.hoveredNodeId=null,this.hideTooltip(),this.draw())}),this.canvas.addEventListener("click",t=>{if(this.dragging)return;let e=this.canvas.getBoundingClientRect(),n=this.findNodeAt(t.clientX-e.left,t.clientY-e.top);this.selectedNodeId=n?.id??null,n&&this.highlightNodes([n.id]),this.draw()}),this.canvas.addEventListener("dblclick",()=>this.resetView()),this.canvas.addEventListener("wheel",t=>{t.preventDefault();let e=this.canvas.getBoundingClientRect();this.zoomAround(t.clientX-e.left,t.clientY-e.top,t.deltaY<0?1.12:.89)},{passive:!1})}getRenderStats(){return{renderedCount:this.renderedCount,totalCount:this.totalCount}}highlightNodes(t){let e=Date.now(),n=new Set;for(let s of t)if(this.positions.has(s)){n.add(s);for(let r of this.graph.edges)r.source===s&&n.add(r.target),r.target===s&&n.add(r.source)}for(let s of n)this.positions.has(s)&&this.highlights.push({nodeId:s,startedAt:e});n.size>0&&this.startAnimating()}zoomAround(t,e,n){let s=Math.min(7,Math.max(.35,this.scale*n)),r=(t-this.offsetX)/this.scale,a=(e-this.offsetY)/this.scale;this.offsetX=t-r*s,this.offsetY=e-a*s,this.scale=s,this.draw()}resetView(){this.offsetX=0,this.offsetY=0,this.scale=1,this.draw()}findNodeAt(t,e){let n=(t-this.offsetX)/this.scale,s=(e-this.offsetY)/this.scale,r=null,a=9/this.scale;for(let o of this.graph.nodes){let l=this.positions.get(o.id);if(!l)continue;let c=Math.hypot(l.x-n,l.y-s);c<=a&&(!r||c<r.distance)&&(r={node:o,distance:c})}return r?.node??null}showTooltip(t,e,n){this.tooltip.empty(),this.tooltip.createDiv({cls:"cs-graph-tooltip-title",text:t.label||t.id}),this.tooltip.createDiv({cls:"cs-graph-tooltip-meta",text:`${t.community_name||`Community ${t.community??"\u2014"}`} \xB7 ${this.degreeCache.get(t.id)??0} connections`}),this.tooltip.style.left=`${Math.min(this.width-220,e+14)}px`,this.tooltip.style.top=`${Math.max(10,n-12)}px`,this.tooltip.hidden=!1}hideTooltip(){this.tooltip.hidden=!0}startAnimating(){if(this.rafId!==null)return;let t=()=>{let e=Date.now();this.highlights=this.highlights.filter(n=>e-n.startedAt<nf),this.draw(),this.highlights.length>0&&!this.disposed?this.rafId=requestAnimationFrame(t):this.rafId=null};this.rafId=requestAnimationFrame(t)}draw(){let{ctx:t}=this;t.setTransform(this.pixelRatio,0,0,this.pixelRatio,0,0),t.clearRect(0,0,this.width,this.height);let e=t.createRadialGradient(this.width*.48,this.height*.42,0,this.width/2,this.height/2,Math.max(this.width,this.height)*.72);e.addColorStop(0,"#11162d"),e.addColorStop(.5,"#080b1c"),e.addColorStop(1,"#03050e"),t.fillStyle=e,t.fillRect(0,0,this.width,this.height);for(let a=0;a<100;a++){let o=a*83.17%1*this.width,l=a*47.63%1*this.height;t.fillStyle=`rgba(196,211,255,${.12+a%5*.035})`,t.fillRect(o,l,a%11===0?1.4:.8,a%11===0?1.4:.8)}t.save(),t.translate(this.offsetX,this.offsetY),t.scale(this.scale,this.scale);for(let a=0;a<this.communities.length;a++){let o=this.communities[a],l=t.createRadialGradient(o.x,o.y,0,o.x,o.y,o.radius*1.18);if(l.addColorStop(0,Ls(o.id,.085,62)),l.addColorStop(1,Ls(o.id,0,50)),t.fillStyle=l,t.beginPath(),t.arc(o.x,o.y,o.radius*1.18,0,Math.PI*2),t.fill(),t.strokeStyle=Ls(o.id,.2,62),t.lineWidth=.75/this.scale,t.setLineDash([3/this.scale,5/this.scale]),t.stroke(),t.setLineDash([]),this.scale>=.72&&a<e_){let c=8.5/this.scale,h=Math.max(14/this.scale,o.y-o.radius+11/this.scale);t.font=`650 ${c}px -apple-system, BlinkMacSystemFont, sans-serif`,t.textAlign="center";let d=t.measureText(o.label).width;t.fillStyle="rgba(4, 7, 18, 0.78)",t.fillRect(o.x-d/2-5/this.scale,h-c+1/this.scale,d+10/this.scale,c+6/this.scale),t.fillStyle=Ls(o.id,.82,82),t.fillText(o.label,o.x,h)}}t.lineWidth=.42/this.scale;let n=Math.max(1,Math.ceil(this.graph.edges.length/t_));for(let a=0;a<this.graph.edges.length;a++){let o=this.graph.edges[a],l=this.positions.get(o.source),c=this.positions.get(o.target);if(!l||!c)continue;let h=o.source===this.hoveredNodeId||o.target===this.hoveredNodeId||o.source===this.selectedNodeId||o.target===this.selectedNodeId;!h&&a%n!==0||(t.strokeStyle=h?"rgba(143,168,255,0.48)":"rgba(180,195,238,0.035)",t.beginPath(),t.moveTo(l.x,l.y),t.lineTo(c.x,c.y),t.stroke())}let s=new Set(this.highlights.map(a=>a.nodeId));for(let a of this.graph.nodes){let o=this.positions.get(a.id);if(!o||s.has(a.id))continue;let l=this.degreeCache.get(a.id)??0,c=a.id===this.hoveredNodeId||a.id===this.selectedNodeId,h=(c?4:Ky+Math.min(1.8,Math.log2(l+1)*.3))/this.scale;t.fillStyle=Ls(a.community,c?.98:.72,c?82:68),c&&(t.shadowColor=Ls(a.community,.88,68),t.shadowBlur=13/this.scale),t.beginPath(),t.arc(o.x,o.y,h,0,Math.PI*2),t.fill(),t.shadowBlur=0}let r=Date.now();for(let a of this.highlights){let o=this.positions.get(a.nodeId);if(!o)continue;let l=(r-a.startedAt)/nf,c=Math.max(0,1-l),h=(Qy-l*2.5)/this.scale;t.fillStyle=`rgba(255,209,132,${c})`,t.shadowColor="rgba(255,174,76,0.9)",t.shadowBlur=14/this.scale,t.beginPath(),t.arc(o.x,o.y,Math.max(h,1),0,Math.PI*2),t.fill(),t.shadowBlur=0}t.restore()}destroy(){this.disposed=!0,this.rafId!==null&&cancelAnimationFrame(this.rafId),window.removeEventListener("mouseup",this.onMouseUp),window.removeEventListener("mousemove",this.onMouseMove)}};var Ur=jt(require("node:fs"),1),Bi=jt(require("node:fs/promises"),1),lh=jt(require("node:path"),1),rf=jt(require("node:readline"),1);var n_=["file_path","path","notebook_path"];function sf(i){let t;try{t=JSON.parse(i)}catch{return[]}if(typeof t!="object"||t===null)return[];let e=t;if(e.type!=="assistant")return[];let s=e.message?.content;if(!Array.isArray(s))return[];let r=[];for(let a of s){if(typeof a!="object"||a===null)continue;let o=a;if(o.type!=="tool_use")continue;let l=o.input;if(typeof l!="object"||l===null)continue;let c=l;for(let h of n_){let d=c[h];if(typeof d=="string"&&d.length>0){r.push({toolName:typeof o.name=="string"?o.name:"unknown",filePath:d});break}}}return r}async function i_(i){let t;try{t=await Bi.readdir(Ue.claudeCodeProjects)}catch{return null}let e=[];for(let n of t){let s=lh.join(Ue.claudeCodeProjects,n),r=await Bi.readdir(s).catch(()=>[]);for(let a of r){if(!a.endsWith(".jsonl"))continue;let o=lh.join(s,a),l=await Bi.stat(o).catch(()=>null);l&&e.push({file:o,mtimeMs:l.mtimeMs})}}e.sort((n,s)=>s.mtimeMs-n.mtimeMs);for(let n of e.slice(0,50))if(await s_(n.file,i))return n.file;return null}async function s_(i,t){let e=rf.createInterface({input:Ur.createReadStream(i,"utf8"),crlfDelay:1/0}),n=0;try{for await(let s of e){n++;try{if(JSON.parse(s)?.cwd===t)return!0}catch{}if(n>5)break}}finally{e.close()}return!1}function af(i,t){let e=null,n=0,s=!1;(async()=>{let a=await i_(i);if(!a||s)return;n=(await Bi.stat(a).catch(()=>null))?.size??0,e=Ur.watch(a,{persistent:!1},()=>{r(a).catch(()=>{})})})();async function r(a){let o=await Bi.stat(a).catch(()=>null);if(!o||o.size<=n){o&&(n=o.size);return}let l=n;n=o.size;let c=Ur.createReadStream(a,{start:l,end:o.size-1,encoding:"utf8"}),h="";for await(let u of c)h+=u;let d=[];for(let u of h.split(`
`))if(u.trim())for(let m of sf(u))d.push(m.filePath);d.length>0&&t(d)}return()=>{s=!0,e?.close()}}var fl=jt(require("node:path"),1);function of(i,t,e){let n=fl.relative(t,e);return n.startsWith("..")||fl.isAbsolute(n)?[]:i.nodes.filter(s=>s.source_file===n).map(s=>s.id)}async function lf(i,t,e,n){if(i.empty(),!e.graphPath)return r_(i,t,e,n);let s=e.graphPath,r=i.createDiv({cls:"cs-filter-row"});r.createEl("button",{cls:"cs-btn cs-btn-primary",text:"Open graph canvas"}).addEventListener("click",async()=>{let h=t.vault.getAbstractFileByPath(s);if(!(h instanceof In.TFile)){se.warn("graph canvas file missing at",s);return}await t.workspace.getLeaf("tab").openFile(h)}),r.createEl("button",{cls:"cs-btn cs-btn-ghost",text:"Open native graph view"}).addEventListener("click",()=>{t.commands?.executeCommandById?.("graph:open")});let l=i.createDiv({cls:"cs-chat-meta"}),c=i.createDiv({cls:"cs-graph-host"});c.style.width="100%";try{let h=t.vault.adapter,d=h instanceof In.FileSystemAdapter?pl.join(h.getBasePath(),s.replace(/graph\.canvas$/,"graph.json")):null,u=d&&await ml.stat(d).then(()=>!0).catch(()=>!1)?d:pl.join(e.path,"graphify-out","graph.json"),m=await Pr(u),x=new dl(c,m),v=x.getRenderStats();l.setText(v.renderedCount<v.totalCount?`${v.renderedCount.toLocaleString()} of ${v.totalCount.toLocaleString()} nodes shown (largest communities only, see graph.json for the full set) \xB7 ${m.edges.length.toLocaleString()} links`:`${v.totalCount.toLocaleString()} nodes \xB7 ${m.edges.length.toLocaleString()} links`);let p=af(e.path,f=>{let S=f.flatMap(T=>of(m,e.path,T));S.length>0&&x.highlightNodes(S)});return()=>{p(),x.destroy()}}catch{return l.setText("Live canvas unavailable (graph.json not found on disk)."),()=>{}}}async function r_(i,t,e,n){i.createDiv({cls:"cs-empty",text:"No graphify graph generated for this project yet."});let s=await Xn();if(!s.installed){let o="pip install graphifyy",l=i.createEl("p");l.createSpan({text:"Install graphify with: "}),l.createEl("code",{text:o});let c=l.createEl("button",{cls:"cs-btn cs-btn-ghost",text:"Copy"});c.style.marginLeft="8px",c.addEventListener("click",async()=>{await navigator.clipboard.writeText(o),new In.Notice("Copied. Run it, then use Re-detect here.")});let h=i.createEl("button",{cls:"cs-btn cs-btn-primary",text:"Re-detect Graphify"});return h.addEventListener("click",async()=>{h.disabled=!0,h.setText("Checking\u2026");let d=await Xn({forceRefresh:!0});if(d.installed){new In.Notice(`Graphify detected${d.version?` (v${d.version})`:""}.`),n?.();return}h.disabled=!1,h.setText("Re-detect Graphify"),new In.Notice("Graphify is still not visible to Obsidian. Run Codestellation: Show diagnostics to inspect searched paths.")}),()=>{}}let r=i.createEl("button",{cls:"cs-btn cs-btn-primary",text:"Generate graph now"}),a=i.createDiv({cls:"cs-chat-meta"});return r.addEventListener("click",async()=>{r.disabled=!0,a.setText("Generating\u2026 this can take a while for a large project.");try{await a_(t,e,s.bin??"graphify",o=>a.setText(o)),new In.Notice(`Graph generated for ${e.name}.`),n?.()}catch(o){a.setText(`Couldn't generate a graph: ${o.message??o}`),r.disabled=!1}}),()=>{}}async function a_(i,t,e,n){let s=i.vault.adapter;if(!(s instanceof In.FileSystemAdapter))throw new Error("vault adapter is not a real filesystem");let r=s.getBasePath();try{await ye(e,[t.path,"--no-viz"],{timeoutMs:10*60*1e3})}catch(c){let h=c.message??String(c);if(/no LLM API key found/i.test(h))n("No LLM API key configured, retrying as code-only\u2026"),await ye(e,[t.path,"--no-viz","--code-only"],{timeoutMs:10*60*1e3});else throw c}await Ts(t.path);let a=`${r}/${Oe}/${t.id}/graph`;n("Exporting into the vault\u2026"),await ye(e,["export","obsidian","--dir",a],{cwd:t.path,timeoutMs:5*60*1e3});let o=await Ye(i.vault),l=o.find(c=>c.id===t.id);if(!l)throw new Error("project no longer in the registry");l.graphPath=`${Oe}/${t.id}/graph/graph.canvas`,await rl(`${r}/${l.graphPath}`,Us(l.hue)),await ml.copyFile(pl.join(t.path,"graphify-out","graph.json"),`${a}/graph.json`).catch(()=>{}),await He(i.vault,o),t.graphPath=l.graphPath}var _f=require("obsidian");function hf(i,t){return i?i.length>8?i.slice(0,8):i:t}function uf(i){return i?new Date(i).toLocaleString(void 0,{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}):"unknown date"}var cf=80;function o_(i){if(i.customTitle)return i.customTitle;if(i.lastPrompt){let t=i.lastPrompt.trim();return t.length>cf?`${t.slice(0,cf)}\u2026`:t}return`Session ${hf(i.sessionId,"?")}, ${uf(i.firstTimestamp)}`}function df(i){return i.filter(t=>t.sessionId).map(t=>({id:t.sessionId,title:o_(t),agent:"claude",updatedAt:t.lastTimestamp??t.firstTimestamp??new Date(0).toISOString(),messageCount:t.messageCount}))}function ff(i,t=new Map){return i.filter(e=>e.sessionId).map(e=>({id:e.sessionId,title:e.sessionId&&t.get(e.sessionId)||`Session ${hf(e.sessionId,"?")}, ${uf(e.firstTimestamp)}`,agent:"codex",updatedAt:e.lastTimestamp??e.firstTimestamp??new Date(0).toISOString(),messageCount:0}))}function pf(i,t){return[...i,...t].sort((e,n)=>e.updatedAt<n.updatedAt?1:-1)}function mf(i){return`claude --resume ${i}`}function gf(i){return`cd "${i}" && claude --append-system-prompt "This project has a graphify knowledge graph in graphify-out/. Use the graphify CLI (graphify query, graphify explain, graphify path) instead of reading files directly for structural questions about this codebase."`}function xf(i){return`Codex session id: ${i} (check your Codex CLI's own --help for the resume flag)`}var ch=15;function l_(i){let t=Date.now()-new Date(i).getTime(),e=Math.floor(t/864e5);return e<=0?"today":e===1?"yesterday":`${e}d ago`}async function yf(i){await navigator.clipboard.writeText(i),new _f.Notice("Copied to clipboard")}function vf(i,t,e){i.empty();let n="all",s=0,r=i.createDiv({cls:"cs-filter-row"});r.createEl("button",{cls:"cs-btn cs-btn-primary",text:"Start new session here"}).addEventListener("click",()=>yf(gf(e))),r.createSpan({cls:"cs-chat-meta",text:"Copies a terminal command that cds into the project and starts Claude with a graphify reminder."});let o=i.createDiv({cls:"cs-filter-row"}),l=i.createDiv({cls:"cs-chat-list"}),c=i.createDiv({cls:"cs-chat-pager"}),h=[{key:"all",label:"All"},{key:"claude",label:"Claude"},{key:"codex",label:"Codex"}],d=new Map;for(let m of h){let x=o.createEl("button",{cls:`cs-filter${m.key===n?" is-active":""}`,text:m.label});x.addEventListener("click",()=>{n=m.key,s=0;for(let[v,p]of d)p.classList.toggle("is-active",v===n);u()}),d.set(m.key,x)}function u(){l.empty(),c.empty();let m=n==="all"?t:t.filter(p=>p.agent===n);if(m.length===0){l.createDiv({cls:"cs-empty",text:"No sessions found for this project yet."});return}let x=Math.max(1,Math.ceil(m.length/ch));s=Math.min(s,x-1);let v=m.slice(s*ch,(s+1)*ch);for(let p of v){let f=l.createDiv({cls:"cs-chat-row"}),S=f.createDiv({cls:"cs-chat-row-main"});S.createDiv({cls:"cs-chat-title",text:p.title}),S.createDiv({cls:"cs-chat-meta",text:`${l_(p.updatedAt)} \xB7 ${p.messageCount||"?"} messages`});let T=f.createDiv({cls:"cs-chat-row-side"});T.createSpan({cls:`cs-badge cs-badge-${p.agent}`,text:p.agent}),T.createEl("button",{cls:"cs-btn cs-btn-ghost",text:"Copy resume command"}).addEventListener("click",A=>{A.stopPropagation();let M=p.agent==="claude"?mf(p.id):xf(p.id);yf(M)})}if(x>1){let p=c.createEl("button",{cls:"cs-btn cs-btn-ghost",text:"< Prev"});p.disabled=s===0,p.addEventListener("click",()=>{s--,u()}),c.createSpan({cls:"cs-chat-meta",text:`Page ${s+1} of ${x} (${m.length} sessions)`});let f=c.createEl("button",{cls:"cs-btn cs-btn-ghost",text:"Next >"});f.disabled=s>=x-1,f.addEventListener("click",()=>{s++,u()})}}u()}var uh=require("obsidian");var hh="";async function bf(i,t){let e=`${t} 00:00:00`,n=`${t} 23:59:59`,{stdout:s}=await ye("git",["log","--all",`--since=${e}`,`--until=${n}`,`--pretty=format:%H${hh}%an${hh}%s`],{cwd:i});return s.split(`
`).map(r=>r.trim()).filter(Boolean).map(r=>{let[a,o,l]=r.split(hh);return{hash:a,author:o,subject:l}})}function c_(i){let t=i.commits.length>0?i.commits.map(e=>`- ${e.subject}`).join(`
`):"(no commits on this date)";return[`Write a short, plain-language work log summary for "${i.projectName}" on ${i.date}.`,"Base it only on the commit messages below \u2014 do not invent details that aren't implied by them.","Format: 3-6 bullet points, each one line, no preamble or sign-off.","","Commits:",t].join(`
`)}var h_=!1;async function Sf(i){if(!h_)return{summary:gl(i),generatedByAi:!1};let t=await nl();if(!t)return{summary:gl(i),generatedByAi:!1};try{let{stdout:e}=await ye(t,["-p",c_(i),"--output-format","text"],{timeoutMs:6e4}),n=e.trim();return n?{summary:n,generatedByAi:!0}:{summary:gl(i),generatedByAi:!1}}catch{return{summary:gl(i),generatedByAi:!1}}}function gl(i){return i.commits.length===0?"(no commits on this date)":i.commits.map(t=>`- ${t.subject}`).join(`
`)}function u_(){let i=new Date;return`${i.getFullYear()}-${String(i.getMonth()+1).padStart(2,"0")}-${String(i.getDate()).padStart(2,"0")}`}function Mf(i,t){return i?i.slice(0,10)===t:!1}function wf(i,t,e){i.empty();let n=i.createEl("input",{cls:"cs-date-input",type:"date"});n.value=u_();let s=i.createEl("button",{cls:"cs-btn cs-btn-primary",text:"Generate work log"}),r=i.createDiv({cls:"cs-worklog-out"});r.setText("Pick a date and generate a work log for it."),s.addEventListener("click",async()=>{let a=n.value;if(!a){new uh.Notice("Pick a date first.");return}s.disabled=!0,r.setText("Generating\u2026");try{let[o,l,c]=await Promise.all([bf(e.path,a).catch(()=>[]),gi(),xi()]),h=(l.find(p=>p.cwd===e.path)?.sessions??[]).filter(p=>Mf(p.firstTimestamp,a)),d=(c.find(p=>p.cwd===e.path)?.sessions??[]).filter(p=>Mf(p.firstTimestamp,a)),u=ul(h,d),m=await Sf({projectName:e.name,date:a,commits:o,sessionCount:u.sessionCount,totalTokens:u.totalTokens,timeSpentHoursEstimate:u.timeSpentHoursEstimate}),x=`${e.name}, ${a}
${u.sessionCount} session(s) \xB7 ${u.totalTokens.toLocaleString()} tokens \xB7 ~${u.timeSpentHoursEstimate.toFixed(1)}h
${m.generatedByAi?"":`(plain commit list for now, AI-written summaries are still being worked on)
`}
`;r.setText(x+m.summary);let v=`${Oe}/${e.id}/worklogs/${a}.md`;await t.adapter.write(v,`# ${e.name}, ${a}

${x}
${m.summary}
`),new uh.Notice(`Saved to ${v}`)}catch(o){se.error("failed to generate worklog",o),r.setText(`Could not generate a work log: ${o.message??o}`)}finally{s.disabled=!1}})}var Fr=jt(require("node:fs/promises"),1),xl=jt(require("node:path"),1);async function d_(i){let t=await Fr.readdir(i,{withFileTypes:!0}).catch(()=>[]),e=[];for(let n of t){if(!n.isDirectory())continue;await Fr.stat(xl.join(i,n.name,".git")).then(()=>!0).catch(()=>!1)&&e.push(n.name)}return e}var Ef=["overview","chats","branches","graph","worklog"],f_={overview:"Overview",chats:"Chats",branches:"Branches",graph:"Graph",worklog:"Work Log"},yl=class extends Tf.ItemView{constructor(e,n){super(e);this.projectId=null;this.entry=null;this.activeTab="overview";this.disposeGraphPanel=null;this.plugin=n}getViewType(){return Vi}getDisplayText(){return this.entry?.name??"Codestellation workspace"}getIcon(){return"orbit"}async setState(e,n){let s=e?.projectId??null;this.projectId=s,await super.setState(e,n),await this.render()}getState(){return{projectId:this.projectId}}async onOpen(){await this.render()}async render(){try{await this.renderUnsafe()}catch(e){se.error("workspace view failed to render",e);let n=this.containerEl.children[1];n.empty(),n.createDiv({cls:"cs-empty",text:`Something went wrong opening this workspace: ${e.message??e}`})}}async renderUnsafe(){let e=this.containerEl.children[1];if(e.empty(),e.style.padding="0",!this.projectId){e.createDiv({cls:"cs-empty",text:"No project selected. Open this from a planet\u2019s Launch button."});return}let s=(await Ye(this.app.vault)).find(v=>v.id===this.projectId)??null;if(this.entry=s,!s){e.createDiv({cls:"cs-empty",text:`Project "${this.projectId}" isn't in the registry anymore (was it removed?).`});return}let r=e.createDiv({cls:"cs-shell cs-workspace-shell"});Ps(r,this.plugin.settings);let a=r.createDiv({cls:"cs-hub-content cs-workspace-content is-visible"});a.style.position="static",a.style.width="100%",a.style.height="100%";let o=a.createDiv({cls:"cs-hub-header"});o.createDiv({cls:"cs-hub-title",text:s.name});let l=o.createEl("button",{cls:"cs-btn cs-btn-ghost",text:"? Help"});a.createDiv({cls:"cs-wip-banner",text:"Preview build \xB7 Codestellation is evolving in small steps. Expect occasional breakage and unfinished behavior."});let c=a.createDiv({cls:"cs-tabs"}),h=new Map;for(let v of Ef){let p=c.createEl("button",{cls:`cs-tab${v===this.activeTab?" is-active":""}`,text:f_[v]});p.addEventListener("click",()=>this.switchTab(v,h,d)),h.set(v,p)}let d=new Map;for(let v of Ef){let p=a.createDiv({cls:`cs-tab-panel${v===this.activeTab?" is-active":""}`});d.set(v,p)}let u=[{selector:".cs-hub-title",title:"Your project workspace",body:`Everything here is scoped to ${s.name} specifically: real sessions, real git branches, real tokens used. Nothing on this page is a mockup.`},{selector:".cs-wip-banner",title:"Still v0.1",body:"Some of what follows is fully built, some is a deliberate stand-in for something not finished yet \u2014 this tour calls that out tab by tab rather than hiding it."},{selector:".cs-tabs",onEnter:()=>this.switchTab("overview",h,d),title:"Overview",body:"Session count, tokens used (with a per-model breakdown), an estimated time-spent figure, and branch count \u2014 all computed fresh from disk each time you open this tab, not cached."},{selector:".cs-tabs",onEnter:()=>this.switchTab("chats",h,d),title:"Chats",body:`Every Claude/Codex session found for this project, with real titles where available. "Copy resume command" hands off to your terminal \u2014 Obsidian can't embed an interactive chat. "Start new session here" copies a command that reminds Claude to use graphify instead of reading files raw.`},{selector:".cs-tabs",onEnter:()=>this.switchTab("branches",h,d),title:"Branches",body:"Local/remote/both, with stale branches (30+ days) flagged. Pick two branches to compare: unique commits per side, plus a file-level diff. Projects that bundle multiple repos in one folder show each repo's branches separately."},{selector:".cs-tabs",onEnter:()=>this.switchTab("graph",h,d),title:"Graph",body:"If a graphify graph exists, this renders it as a live, pannable canvas \u2014 editing a file in an active Claude Code session for this project highlights its node here within a few seconds. If no graph exists yet, you can generate one right from this tab."},{selector:".cs-tabs",onEnter:()=>this.switchTab("worklog",h,d),title:"Work Log",body:"Pick a date, get real commits and session stats for that day. AI-written summaries are currently disabled (a permission-prompt bug when calling out to Claude from inside Obsidian) \u2014 you get a plain commit list instead for now."}];l.addEventListener("click",()=>new Cs(this.app,()=>new Rs(r,u).start()).open());for(let v of d.values())v.createDiv({cls:"cs-empty",text:"Loading\u2026"});let m=[],x=[];try{let[v,p]=await Promise.all([gi(),xi()]);m=v.find(f=>f.cwd===s.path)?.sessions??[],x=p.find(f=>f.cwd===s.path)?.sessions??[]}catch(v){se.error("failed to scan sessions",v)}await Promise.all([this.loadOverview(d.get("overview"),s,m,x),this.loadChats(d.get("chats"),s,m,x),this.loadBranches(d.get("branches"),s),this.loadGraph(d.get("graph"),s),this.loadWorklog(d.get("worklog"),s)])}async loadWorklog(e,n){try{wf(e,this.app.vault,n)}catch(s){se.error("failed to load worklog panel",s),e.empty(),e.createDiv({cls:"cs-empty",text:"Could not load the work log panel."})}}switchTab(e,n,s){this.activeTab=e;for(let[r,a]of n)a.classList.toggle("is-active",r===e);for(let[r,a]of s)a.classList.toggle("is-active",r===e)}async loadOverview(e,n,s,r){try{let a=await cl(n.path).catch(()=>[]),o=ul(s,r);Kd(e,{entry:n,stats:o,branchCount:a.length})}catch(a){se.error("failed to load overview stats",a),e.empty(),e.createDiv({cls:"cs-empty",text:"Could not load stats for this project."})}}async loadChats(e,n,s,r){try{let a=await Zd(),o=pf(df(s),ff(r,a));vf(e,o,n.path)}catch(a){se.error("failed to load chats",a),e.empty(),e.createDiv({cls:"cs-empty",text:"Could not load chat sessions for this project."})}}async loadBranches(e,n){try{if(await Fr.stat(xl.join(n.path,".git")).then(()=>!0).catch(()=>!1)){let o=await Nr(n.path);oh(e,[{label:n.name,repoPath:n.path,branches:o}]);return}let r=await d_(n.path);if(r.length===0){e.empty(),e.createDiv({cls:"cs-empty",text:"This folder isn't a git repository (no .git found here or in its immediate subfolders)."});return}let a=await Promise.all(r.map(async o=>{let l=xl.join(n.path,o),c=await Nr(l).catch(()=>[]);return{label:o,repoPath:l,branches:c}}));oh(e,a)}catch(s){se.error("failed to load branches",s),e.empty(),e.createDiv({cls:"cs-empty",text:"Could not read branches (is this still a git repo at that path?)."})}}async loadGraph(e,n){try{this.disposeGraphPanel?.(),this.disposeGraphPanel=await lf(e,this.app,n,()=>this.loadGraph(e,n))}catch(s){se.error("failed to load graph panel",s),e.empty(),e.createDiv({cls:"cs-empty",text:"Could not load the graph for this project."})}}async onClose(){this.disposeGraphPanel?.()}};var yi=require("obsidian"),_l=class extends yi.PluginSettingTab{constructor(t,e){super(t,e),this.plugin=e}display(){let{containerEl:t}=this;t.empty(),t.createEl("h2",{text:"Codestellation"}),t.createEl("p",{text:"v0.1, testing phase. Expect breaking changes between versions.",cls:"setting-item-description"}),new yi.Setting(t).setName("Your name").setDesc("Used for the greeting on the home screen.").addText(e=>e.setValue(this.plugin.settings.userName).onChange(async n=>{this.plugin.settings.userName=n,await this.plugin.saveSettings()})),new yi.Setting(t).setName("Check-in target (hours)").setDesc('You get a "time to head home?" prompt once you cross this after checking in.').addText(e=>e.setValue(String(this.plugin.settings.checkInTargetHours)).onChange(async n=>{let s=Number(n);!Number.isFinite(s)||s<=0||(this.plugin.settings.checkInTargetHours=s,await this.plugin.saveSettings())})),new yi.Setting(t).setName("Interface font").setDesc("Applied to Codestellation home and workspace views.").addDropdown(e=>e.addOption("obsidian","Obsidian default").addOption("system","System").addOption("serif","Editorial serif").addOption("mono","Monospace").setValue(this.plugin.settings.interfaceFont).onChange(async n=>{this.plugin.settings.interfaceFont=n,await this.plugin.saveSettings()})),new yi.Setting(t).setName("Galaxy accent hue").setDesc("0\u2013359. Changes the accent used across the solar system and workspaces.").addSlider(e=>e.setLimits(0,359,1).setDynamicTooltip().setValue(this.plugin.settings.galaxyAccentHue).onChange(async n=>{this.plugin.settings.galaxyAccentHue=n,await this.plugin.saveSettings()})),new yi.Setting(t).setName("Scene intensity").setDesc("Minimal reduces geometry, effects, and GPU load. Calm and Cinematic progressively add detail.").addDropdown(e=>e.addOption("minimal","Minimal (low-end PCs)").addOption("calm","Calm").addOption("cinematic","Cinematic").setValue(this.plugin.settings.sceneIntensity).onChange(async n=>{this.plugin.settings.sceneIntensity=n,await this.plugin.saveSettings()}))}};var dh={userName:"",checkInTargetHours:8,onboardingComplete:!1,interfaceFont:"obsidian",galaxyAccentHue:230,sceneIntensity:"cinematic",showBranchMoons:!0,showBranchSatellites:!0};var Pf=require("obsidian");var Or="Codestellation/_data/checkins.json";async function Af(i){if(!await i.adapter.exists(Or))return null;try{let e=await i.adapter.read(Or),n=JSON.parse(e);return!n||typeof n.startedAt!="string"?null:n}catch{return null}}async function Br(i,t){if(t===null){await i.adapter.exists(Or)&&await i.adapter.remove(Or);return}await i.adapter.write(Or,JSON.stringify(t,null,2))}function fh(i,t){let e=t-new Date(i.startedAt).getTime();return Math.max(0,e/(1e3*60*60))}function Cf(i,t){return fh(i,t)>=i.targetHours}function Rf(i){let t=Math.round(i*60),e=Math.floor(t/60),n=t%60;return e===0?`${n}m`:`${e}h ${n}m`}var p_=3e4,vl=class{constructor(t,e,n){this.current=null;this.intervalId=null;this.notifiedThisCheckIn=!1;this.el=t,this.vault=e,this.getSettings=n,this.el.addClass("cs-checkin-bar")}async init(){this.current=await Af(this.vault),this.render(),this.intervalId=window.setInterval(()=>this.tick(),p_)}destroy(){this.intervalId!==null&&window.clearInterval(this.intervalId)}tick(){this.current&&(this.render(),!this.notifiedThisCheckIn&&Cf(this.current,Date.now())&&(this.notifiedThisCheckIn=!0,this.showTargetNotice()))}showTargetNotice(){let t=document.createDocumentFragment();t.appendText(`You've hit your ${this.current.targetHours}h target. Time to head home?`);let e=t.createDiv({cls:"cs-filter-row"}),n=e.createEl("button",{cls:"cs-btn cs-btn-primary",text:"Check out"}),s=e.createEl("button",{cls:"cs-btn cs-btn-ghost",text:"Keep going"}),r=new Pf.Notice(t,0);n.addEventListener("click",()=>{r.hide(),this.checkOut()}),s.addEventListener("click",()=>r.hide())}async checkIn(){this.current={projectId:null,startedAt:new Date().toISOString(),targetHours:this.getSettings().checkInTargetHours},this.notifiedThisCheckIn=!1,await Br(this.vault,this.current),this.render()}async checkOut(){this.current=null,await Br(this.vault,null),this.render()}render(){if(this.el.empty(),!this.current){this.el.createEl("span",{cls:"cs-checkin-toggle",text:"Check in"}).addEventListener("click",()=>this.checkIn());return}let t=fh(this.current,Date.now());this.el.createEl("span",{text:`\u23F1 ${Rf(t)}`}).addClass("cs-checkin-elapsed");let n=this.el.createEl("span",{cls:"cs-checkin-toggle",text:"Check out"});n.style.marginLeft="8px",n.addEventListener("click",()=>this.checkOut())}};var Ds=require("obsidian");async function If(i){let t=[];t.push(`Codestellation diagnostics, ${new Date().toISOString()}`),t.push(`Platform: ${process.platform}`),t.push("");let e=await el();t.push(`Claude Code session history found: ${e.claudeCode} (${Ue.claudeCodeProjects})`),t.push(`Codex session history found: ${e.codex} (${Ue.codexSessions})`);let n=await nl();t.push(`Claude CLI resolved to: ${n??"(not found, work log AI summaries will fall back to a plain commit list)"}`);let s=await Xn();t.push(`graphify: ${s.installed?`found at ${s.bin} (v${s.version??"unknown"})`:"not found. Install with: pip install graphifyy"}`),t.push(""),t.push(`Registered projects: ${i.length}`);for(let r of i)t.push(`  - ${r.name} (${r.id}) \u2192 ${r.path}${r.graphPath?` [graph: ${r.graphPath}]`:" [no graph]"}`);t.push("");try{let[r,a]=await Promise.all([gi(),xi()]),o=r.reduce((d,u)=>d+u.sessions.length,0),l=a.reduce((d,u)=>d+u.sessions.length,0),c=r.reduce((d,u)=>d+u.sessions.reduce((m,x)=>m+x.unparsedLineCount,0),0),h=a.reduce((d,u)=>d+u.sessions.reduce((m,x)=>m+x.unparsedLineCount,0),0);t.push(`Claude Code sessions on disk: ${o} across ${r.length} project path(s), ${c} unparsed line(s)`),t.push(`Codex sessions on disk: ${l} across ${a.length} project path(s), ${h} unparsed line(s)`)}catch(r){t.push(`Session scan failed: ${r.message??r}`)}return t.join(`
`)}var bl=class extends Ds.Modal{constructor(t){super(t)}async onOpen(){let{contentEl:t}=this;t.addClass("cs-modal"),t.createEl("h2",{text:"Codestellation diagnostics"});let e=t.createEl("pre",{text:"Gathering\u2026"});e.style.whiteSpace="pre-wrap",e.style.userSelect="text",e.style.maxHeight="60vh",e.style.overflowY="auto";let n=await Ye(this.app.vault),s=await If(n);e.setText(s),new Ds.Setting(t).addButton(r=>r.setButtonText("Copy to clipboard").setCta().onClick(async()=>{await navigator.clipboard.writeText(s),new Ds.Notice("Copied. Paste this into your bug report.")}))}onClose(){this.contentEl.empty()}};var Ns=require("obsidian");var Sl=class extends Ns.Modal{constructor(t,e){super(t),this.plugin=e}onOpen(){let{contentEl:t}=this;t.addClass("cs-modal"),t.createEl("h2",{text:"Reset Codestellation data?"}),t.createEl("p",{text:"This clears the imported-project registry, any active check-in, and re-triggers the setup wizard on next launch. It does NOT delete any notes, graphs, or work logs already written into your vault."}),new Ns.Setting(t).addButton(e=>e.setButtonText("Cancel").onClick(()=>this.close())).addButton(e=>e.setButtonText("Reset").setWarning().onClick(async()=>{await He(this.app.vault,[]),await Br(this.app.vault,null),this.plugin.settings.onboardingComplete=!1,await this.plugin.saveSettings(),new Ns.Notice("Codestellation data reset. Reopen the home view or reload Obsidian to re-run setup."),this.close()}))}onClose(){this.contentEl.empty()}};var Ml=class extends Lf.Plugin{constructor(){super(...arguments);this.settings=dh;this.checkInBar=null}async onload(){await this.loadSettings(),this.checkInBar=new vl(this.addStatusBarItem(),this.app.vault,()=>this.settings),await this.checkInBar.init(),this.registerView(Hi,e=>new hl(e,this)),this.registerView(Vi,e=>new yl(e,this)),this.addRibbonIcon("orbit","Open Codestellation",()=>{this.activateHomeView()}),this.addRibbonIcon("folder-plus","Codestellation: Import a project",()=>{new Pn(this.app,this,"projects",()=>this.notifyProjectsChanged()).open()}),this.addCommand({id:"open-home",name:"Open home",callback:()=>this.activateHomeView()}),this.addCommand({id:"run-onboarding",name:"Run setup wizard",callback:()=>new Pn(this.app,this,"name",()=>this.notifyProjectsChanged()).open()}),this.addCommand({id:"import-project",name:"Import a project",callback:()=>new Pn(this.app,this,"projects",()=>this.notifyProjectsChanged()).open()}),this.addCommand({id:"show-diagnostics",name:"Show diagnostics",callback:()=>new bl(this.app).open()}),this.addCommand({id:"reset-data",name:"Reset plugin data",callback:()=>new Sl(this.app,this).open()}),this.addSettingTab(new _l(this.app,this)),this.settings.onboardingComplete||this.app.workspace.onLayoutReady(()=>new Pn(this.app,this,"name",()=>this.notifyProjectsChanged()).open()),se.info("loaded v0.1.0")}onunload(){this.checkInBar?.destroy(),se.info("unloaded")}async activateHomeView(){let{workspace:e}=this.app,n=e.getLeavesOfType(Hi)[0]??null;n||(n=e.getLeaf("tab"),await n.setViewState({type:Hi,active:!0})),e.revealLeaf(n)}async activateWorkspaceView(e){let{workspace:n}=this.app,s=n.getLeavesOfType(Vi).find(a=>a.getViewState().state?.projectId===e),r=s??n.getLeaf("tab");s||await r.setViewState({type:Vi,active:!0,state:{projectId:e}}),n.revealLeaf(r)}notifyProjectsChanged(){this.app.workspace.trigger("codestellation:refresh-home")}async loadSettings(){this.settings=Object.assign({},dh,await this.loadData())}async saveSettings(){await this.saveData(this.settings)}};
/*! Bundled license information:

three/build/three.core.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)

three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
