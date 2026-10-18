import fs from 'node:fs';
const root=new URL('../',import.meta.url),dest=new URL('dist/',root);
fs.rmSync(dest,{recursive:true,force:true});fs.mkdirSync(dest,{recursive:true});
for(const path of ['index.html','css','js','assets','_headers'])fs.cpSync(new URL(path,root),new URL(path,dest),{recursive:true});
fs.mkdirSync(new URL('data/',dest));fs.mkdirSync(new URL('reports/',dest));
for(const path of ['data/exam-2026.json','data/extra-questions.json','data/study-points.json','reports/analysis.json','reports/study-report.html'])fs.copyFileSync(new URL(path,root),new URL(path,dest));
console.log('公開用 dist/ を生成しました（教材PDF・開発用ファイルを含みません）');
