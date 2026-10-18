export const EXAM_MS=120*60*1000;
export const remaining=(deadline,now=Date.now())=>Math.max(0,deadline-now);
export function formatTime(ms){const s=Math.ceil(ms/1000);return [Math.floor(s/3600),Math.floor(s%3600/60),s%60].map(n=>String(n).padStart(2,'0')).join(':');}
