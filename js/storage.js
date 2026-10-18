export const STORAGE_KEY='takken2026:v1';
export const emptyState=()=>({version:1,records:{},favorites:[],attempts:[],exams:[],activeExam:null,studySession:null});
const object=x=>!!x&&typeof x==='object'&&!Array.isArray(x);
const ids=x=>Array.isArray(x)&&x.length>0&&x.every(id=>typeof id==='string');
const answers=x=>object(x)&&Object.values(x).every(a=>Number.isInteger(a)&&a>=1&&a<=4);
const session=x=>object(x)&&ids(x.questionIds)&&answers(x.answers)&&Number.isInteger(x.index)&&x.index>=0&&x.index<x.questionIds.length;
const integer=x=>Number.isInteger(x)&&x>=0;
const stamp=x=>typeof x==='string'&&Number.isFinite(Date.parse(x));
const fields=x=>object(x)&&['権利関係','法令上の制限','税・その他','宅建業法'].every(f=>object(x[f])&&integer(x[f].correct)&&integer(x[f].total)&&integer(x[f].answered)&&x[f].correct<=x[f].answered&&x[f].answered<=x[f].total);
export function validState(x){return !!(object(x)&&x.version===1&&object(x.records)&&Object.values(x.records).every(r=>object(r)&&integer(r.attempts)&&integer(r.correct)&&integer(r.wrongCount)&&r.correct<=r.attempts&&typeof r.lastCorrect==='boolean'&&stamp(r.lastAt))&&Array.isArray(x.favorites)&&x.favorites.every(id=>typeof id==='string')&&Array.isArray(x.attempts)&&x.attempts.every(a=>object(a)&&typeof a.questionId==='string'&&typeof a.mode==='string'&&Number.isInteger(a.selected)&&a.selected>=(a.mode==='exam'?0:1)&&a.selected<=4&&typeof a.correct==='boolean'&&stamp(a.at))&&Array.isArray(x.exams)&&x.exams.every(e=>session(e)&&typeof e.id==='string'&&integer(e.score)&&e.score<=e.total&&e.total===e.questionIds.length&&integer(e.unanswered)&&e.unanswered<=e.total&&fields(e.fields)&&stamp(e.finishedAt)&&stamp(e.startedAt))&&(!x.activeExam||(session(x.activeExam)&&typeof x.activeExam.id==='string'&&Number.isFinite(x.activeExam.deadline)&&stamp(x.activeExam.startedAt)))&&(!x.studySession||(session(x.studySession)&&typeof x.studySession.mode==='string')));}
let warning=()=>{};export const onStorageWarning=fn=>{warning=fn;};
export function readState(storage){try{const target=storage??globalThis.localStorage;const raw=target.getItem(STORAGE_KEY);if(!raw)return emptyState();const parsed=JSON.parse(raw);if(!validState(parsed))throw Error('invalid');return {...emptyState(),...parsed};}catch{warning('保存履歴を読み込めません。履歴の復元にはバックアップJSONをご利用ください。');return emptyState();}}
export function writeState(state,storage){try{const target=storage??globalThis.localStorage;target.setItem(STORAGE_KEY,JSON.stringify(state));return true;}catch{warning('ブラウザへの保存に失敗しました。現在の学習は続けられますが、履歴からバックアップを保存してください。');return false;}}
export function recordAnswer(state,q,selected,mode,at=new Date().toISOString()){
 const correct=selected===q.answer;const previous=state.records[q.id]||{attempts:0,correct:0,wrongCount:0};
 state.records[q.id]={...previous,attempts:previous.attempts+1,correct:previous.correct+Number(correct),wrongCount:previous.wrongCount+Number(!correct),lastCorrect:correct,lastAt:at};
 state.attempts.push({questionId:q.id,selected,correct,mode,at});return correct;
}
