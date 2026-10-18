export function createExam(questions,now=Date.now(),uuid=globalThis.crypto.randomUUID()) {return {id:uuid,startedAt:new Date(now).toISOString(),deadline:now+7200000,questionIds:questions.map(q=>q.id),answers:{},index:0};}
export function createStudy(questions,mode='study'){return {questionIds:questions.map(q=>q.id),index:0,answers:{},mode};}
export function chooseAnswer(session,id,selected){if(!Number.isInteger(selected)||selected<1||selected>4)throw new Error('選択肢は1〜4です');session.answers[id]=selected;}
