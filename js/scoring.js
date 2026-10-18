export const FIELDS=['権利関係','法令上の制限','税・その他','宅建業法'];
export const TARGETS={'権利関係':10,'法令上の制限':7,'税・その他':4,'宅建業法':19};
export function score(questions,answers){
 const fields=Object.fromEntries(FIELDS.map(f=>[f,{correct:0,total:0,answered:0}]));let correct=0,answered=0;
 for(const q of questions){const f=fields[q.field];f.total++;if(answers[q.id]>=1&&answers[q.id]<=4){answered++;f.answered++;}if(answers[q.id]===q.answer){correct++;f.correct++;}}
 return {correct,total:questions.length,answered,unanswered:questions.length-answered,fields};
}
export function guidance(points){if(points>=40)return '目標到達。残った弱点を確認しましょう。';if(points>=35)return `あと${40-points}点。間違えたA論点と宅建業法を優先して復習しましょう。`;if(points>=30)return '基礎問題と頻出論点を重点復習しましょう。';return '基本事項の理解を優先し、各肢の理由を確認しましょう。';}
