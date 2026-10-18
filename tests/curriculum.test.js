import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {CORE_NUMBERS,isCore,orderedCoreQuestions,memoryChecks,migrateStudySession} from '../js/curriculum.js';
import {emptyState,writeState,readState,validState} from '../js/storage.js';
const qs=JSON.parse(fs.readFileSync(new URL('../data/exam-2026.json',import.meta.url)));
test('先に固める40問が目標配分19/7/10/4となり、残り10問と重複しない',()=>{
 assert.equal(new Set(CORE_NUMBERS).size,40);
 for(const [field,count] of [['宅建業法',19],['法令上の制限',7],['権利関係',10],['税・その他',4]])assert.equal(qs.filter(q=>q.field===field&&isCore(q)).length,count);
 assert.equal(qs.filter(q=>!isCore(q)).length,10);
 assert.equal(orderedCoreQuestions(qs)[0].number,26);
 assert.deepEqual(orderedCoreQuestions(qs).map(q=>q.number),CORE_NUMBERS);
});
test('旧追加問題の演習を移行しても過去の記録を消さず、現行問題を再開できる',()=>{
 const state=emptyState();state.records={'extra-076':{wrongCount:2}};state.favorites=['extra-076'];
 state.studySession={questionIds:['extra-076','exam-026'],index:1,answers:{'extra-076':2},mode:'study'};
 migrateStudySession(state,qs);assert.deepEqual(state.studySession.questionIds,['exam-026']);assert.equal(state.studySession.index,0);assert.equal(state.records['extra-076'].wrongCount,2);assert.deepEqual(state.favorites,['extra-076']);
 state.studySession={questionIds:['extra-076'],index:0};migrateStudySession(state,qs);assert.equal(state.studySession,null);
});
test('暗記チェックは40問に対応するIDだけを重複なく数える',()=>{
 assert.deepEqual(memoryChecks({memoryChecks:['exam-026','exam-026','extra-076','exam-044']},qs),['exam-026']);
 assert.deepEqual(memoryChecks({},qs),[]);
});
test('覚えたチェックを再読込・履歴復元でも保持し、旧版の履歴も読める',()=>{
 let raw;const storage={getItem:()=>raw,setItem:(_,value)=>{raw=value;}};
 const state=emptyState();state.memoryChecks=['exam-026','exam-033'];writeState(state,storage);
 assert.deepEqual(memoryChecks(readState(storage),qs),['exam-026','exam-033']);
 const old={...emptyState()};delete old.memoryChecks;raw=JSON.stringify(old);assert.ok(validState(old));assert.deepEqual(readState(storage).memoryChecks,[]);
 assert.equal(validState({...emptyState(),memoryChecks:'broken'}),false);
});
