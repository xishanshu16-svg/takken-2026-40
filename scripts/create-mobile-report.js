import fs from 'node:fs';
import {isCore} from '../js/curriculum.js';
const root=new URL('../',import.meta.url);
const read=p=>JSON.parse(fs.readFileSync(new URL(p,root),'utf8'));
const qs=read('data/exam-2026.json'),points=read('data/study-points.json');
const e=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fields=['宅建業法','法令上の制限','権利関係','税・その他'];
const refs=[...new Map(qs.flatMap(q=>q.sources).map(s=>[s.url,s])).values()];
const html=`<!doctype html><html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>これだけ覚える40・厳選50問 | 2026宅建40点突破AI</title><meta name="description" content="携帯向け宅建教材。覚える40の要点と、その内容を確認する50問。"><link rel="stylesheet" href="../css/style.css"><link rel="stylesheet" href="../css/mobile-focus.css"></head><body class="focus-report">
<header class="report-header"><a href="../#home">宅建40点突破 <small>2026</small></a><a href="../#practice">50問を解く →</a></header>
<main><section class="focus-intro"><span class="focus-kicker">携帯で学ぶ / 50問だけに集中</span><h1>これだけ覚える40。<br>確認する問題は50問。</h1><p>先に基本ルールを覚え、問題で確認します。<br>目標は40 / 50点。まずは業法から。</p></section>
<div class="report-jump"><a href="#remember">① 覚える40</a><a href="#questions">② 解く50問</a><a href="../#review">③ 間違いを復習</a></div>
<p class="memory-guide">下の要点はそのまま読めます。「覚えた」チェックを保存したい場合は、<a href="../#memorize">暗記アプリを開く →</a></p>
<section id="remember"><div class="section-heading"><h2>① これだけ覚える40</h2></div><p class="memory-guide">基本ルールを短く整理しました。例外・細かな適用条件は「問題で確認」の解説で確認してください。</p><div class="report-field-jump">${fields.map((f,i)=>`<a href="#remember-${i}">${f}</a>`).join('')}</div>
${fields.map((f,i)=>`<section id="remember-${i}" class="report-field"><h2>${f}<small> ${points.filter(p=>p.field===f).length}項目</small></h2><div class="memory-cards">${points.filter(p=>p.field===f).map(p=>`<article class="memory-card"><div class="memory-card-top"><span>問${p.number}につながる要点</span></div><h3>${e(p.theme)}</h3><p class="memory-rule">${e(p.point)}</p><a class="memory-question-link" href="../#question/${p.questionId}">この内容を問題で確認 →</a></article>`).join('')}</div></section>`).join('')}</section>
<section id="questions"><div class="section-heading"><h2>② 厳選50問の問題集</h2></div><p>先に固める40問と仕上げ10問。各問4択で、回答すると正解と全選択肢の理由が表示されます。</p><a class="button" href="../#practice">50問の問題集を開く →</a><div class="focus-question-list">${qs.map(q=>`<a class="focus-question-row" href="../#question/${q.id}"><span class="row-number">${q.number}</span><span><small>${e(q.field)} · ${isCore(q)?'先に固める':'仕上げ'}</small><strong>${e(q.theme)}</strong></span><b aria-hidden="true">→</b></a>`).join('')}</div></section>
<section id="plan" class="focus-plan"><h2>40点を狙う配分</h2><div class="target-split">${[['宅建業法',19,20],['権利関係',10,14],['法令上の制限',7,8],['税・その他',4,8]].map(([f,n,total])=>`<div><span>${f}</span><strong>${n}<small> / ${total}点</small></strong></div>`).join('')}</div><p>業法 → 法令 → 権利 → 税その他の順に学習。間違えたら、その問題の要点に戻ります。選んだ40問は学習の着手順で、出題・正答や得点を保証するものではありません。</p></section>
<details class="report-method"><summary>教材の分析方法・法令基準・出典</summary><p>提供PDF9冊・644ページの抽出本文を分野別に確認。教材の掲載回数を本試験全体の出題頻度や的中率として扱っていません。全頁画像の目視検査を実施したという意味ではありません。</p><p>法令は2026年4月1日基準。問題の本文・全肢解説・関連PDF物理ページ・採用理由はアプリの解説から確認できます。元PDFは再配布していません。</p><p>旧版で作成した100問から、公開教材をこの50問に絞りました。<a href="analysis.json">元資料の分析記録</a></p>${refs.map(s=>`<p><a href="${e(s.url)}" target="_blank" rel="noopener noreferrer">${e(s.title)}</a></p>`).join('')}</details>
</main><footer>学習目標は40点。出題的中・得点・合格を保証しません。</footer><nav class="report-bottom-nav" aria-label="学習メニュー"><a href="#remember">覚える40</a><a href="#questions">問題50問</a><a href="../#home">学習アプリ</a></nav></body></html>`;
fs.writeFileSync(new URL('reports/study-report.html',root),html);
