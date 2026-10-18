// 40点の学習目標に合わせた着手順。的中・得点を保証する区分ではありません。
export const CORE_NUMBERS = [
  26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,45,
  15,16,17,18,19,20,21,
  1,2,3,4,5,6,9,11,12,13,
  23,24,25,47
];
export const isCore = question => CORE_NUMBERS.includes(question.number);
export const orderedCoreQuestions = questions => CORE_NUMBERS.map(number=>questions.find(q=>q.number===number)).filter(Boolean);
export function memoryChecks(state, questions){
 const allowed=new Set(questions.filter(isCore).map(q=>q.id));
 return [...new Set((Array.isArray(state.memoryChecks)?state.memoryChecks:[]).filter(id=>allowed.has(id)))];
}
export function migrateStudySession(state, questions){
 // 過去の成績・解答・お気に入りは保持し、進行中の演習だけ現行50問へ合わせる。
 if(!state.studySession)return;
 const allowed=new Set(questions.map(q=>q.id));
 const ids=state.studySession.questionIds.filter(id=>allowed.has(id));
 if(!ids.length){state.studySession=null;return;}
 state.studySession={...state.studySession,questionIds:ids,index:Math.min(state.studySession.index,ids.length-1)};
}
