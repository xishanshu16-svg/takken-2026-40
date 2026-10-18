import fs from 'node:fs';
const root=new URL('../',import.meta.url),read=p=>JSON.parse(fs.readFileSync(new URL(p,root),'utf8'));
const qs=[...read('data/exam-2026.json'),...read('data/extra-questions.json')];
const e=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const refs=[...new Map(qs.flatMap(q=>q.sources).map(s=>[s.url,s])).values()];
const fields=['宅建業法','法令上の制限','権利関係','税・その他'];
const strategies={
 '宅建業法':'35条と37条、免許・登録、専任者、媒介の期間と義務、8種制限、報酬を優先します。主語を業者・宅建士・売主・依頼者に分け、契約前か後か、買主も業者かを先に確認します。',
 '法令上の制限':'区域と行為を特定し、許可・事前届出・事後届出・不要を判断します。都市計画の区域と面積、農地の現況と転用、建築確認の2025年施行基準、盛土規制の期限は条件をセットで覚えます。',
 '権利関係':'当事者間か第三者との関係か、第三者の善意・無過失が必要かを整理します。取消しと無効、履行拒絶と解除、借地と借家を区別することが基本です。2026年改正の区分所有法と登記義務も候補です。',
 '税・その他':'税は取得・所有・譲渡を分け、非課税と控除の条件を確認します。統計は暦年と年度、公表年と対象年を区別します。広告の徒歩換算、機構・地形・構造材料の基本は得点源候補です。'
};
const html=`<!doctype html><html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>2026宅建 学習分析・出題候補レポート</title><link rel="stylesheet" href="../css/style.css"></head><body><header class="topbar"><strong>2026宅建40点突破AI</strong><a href="../index.html#home">学習アプリへ →</a></header><main class="source-report">
<div class="eyebrow">STUDY STRATEGY / 2026.10.18</div><h1>40点を狙う、論点の選び方。</h1><p class="muted">提供教材の分析と公式資料の照合に基づく学習設計です。出題・得点・合格は保証しません。</p>
<section class="panel"><h2>分析の範囲と予測の位置付け</h2><p>提供PDF9冊・計644ページの抽出本文を全頁確認し、出題分野・関連テーマ・判断条件・資料に記載された過去問年度を整理しました。画像目視で644ページすべてを検品したという意味ではありません。PDF抽出で混在する解説断片は法令本文を優先して判断しています。</p><p>本試験の全年度を網羅した集計は実施していません。教材内の掲載数から本試験の出題確率を算出していません。A・B・Cは教材内での扱い、基本性、改正との関係、条件・数字の混同しやすさによる学習優先度です。</p>
<div class="table-wrap"><table><thead><tr><th>資料</th><th>分野</th><th>物理ページ</th></tr></thead><tbody>${[['chapter01.pdf','業法',73],['chapter02.pdf','権利',71],['chapter03.pdf','法令',52],['chapter04.pdf','税その他',11],['ex_chapter01.pdf','業法Q&A',114],['ex_chapter02.pdf','権利Q&A',108],['ex_chapter03.pdf','法令Q&A',71],['ex_chapter04.pdf','税その他Q&A',39],['r8_practice.pdf','統計',5]].map(r=>'<tr>'+r.map(v=>'<td>'+v+'</td>').join('')+'</tr>').join('')}</tbody></table></div><p>全頁テーマ索引・教材に記載された過去年・修正判断の詳細は <a href="analysis.json">分析JSON</a> にあります。各問の関連教材ページはPDFの物理ページ（1起算）です。元PDF自体は公開していません。</p></section>
<section class="panel"><h2>40点の基本配分と学習順</h2><p>宅建業法19/20、法令7/8、権利関係10/14、税その他4/8。業法の失点を減らし、法令の基本を固める順序を軸にします。模試で不足した分野のA論点を先に戻り、理由まで説明できることを目標にします。</p><p>35〜39点はあと1〜5点を取るA論点と誤答復習、30〜34点は基本と典型事例、29点以下は原則の理解を優先。40点以上でも誤答した例外を確認します。これらは本試験の合否判定ではありません。</p></section>
${fields.map((f,i)=>`<section class="panel"><div class="eyebrow">PRIORITY 0${i+1}</div><h2>${f}：出題候補と判断の軸</h2><p>${strategies[f]}</p><div class="table-wrap"><table><thead><tr><th>優先度</th><th>本試験セットの候補</th><th>採用理由</th></tr></thead><tbody>${qs.filter(q=>q.field===f&&q.set==='exam').map(q=>`<tr><td>${q.importance}</td><td>問${q.number} ${e(q.theme)}</td><td>${e(q.rationale)}</td></tr>`).join('')}</tbody></table></div><p>A：最優先 ／ B：確実に理解 ／ C：余裕があれば。出題確率ではありません。</p></section>`).join('')}
<section class="panel"><h2>2026年向けに確認した変更点</h2><ul>
<li>区分所有法：2026年4月1日以降に招集手続を開始する集会の規律、決議の母数、通知事項、経過措置。条件を問題文に明示しました。</li>
<li>住所等変更登記：2026年4月1日施行の申請義務。2年の期限と過料を、相続登記や罰金と区別します。</li>
<li>宅建業法：管理業者が管理者である場合の重要事項追加、現行の低廉な空家等の報酬特例を照合しました。</li>
<li>建築確認：2025年施行の対象規模を旧基準の記憶と混同しないようにしています。</li>
<li>不動産取得税：2026年改正後の免税点・住宅面積の扱いと旧教材記述に差があります。本試験では確認できた非課税原則を採用し、分野別分析JSONに注意点と公式出典を記録しています。</li>
<li>法人企業統計：添付の対象年度を2026年9月公表資料と同じ「最新」と扱っていません。未照合の最新原表数値は本試験に不採用です。</li></ul></section>
<section class="panel"><h2>採用した統計</h2><div class="table-wrap"><table><thead><tr><th>対象</th><th>確認値</th><th>問題</th></tr></thead><tbody><tr><td>2025年1〜12月 新設住宅着工</td><td>740,667戸・前年比6.5%減</td><td>本試験48</td></tr><tr><td>2026年1月1日時点 地価公示</td><td>全国住宅地2.1%上昇</td><td>追加98</td></tr></tbody></table></div><p>対象期間、全国平均か地域別か、公表時点をセットで確認します。公式情報は該当問題の解説にも掲載しています。</p></section>
<section class="panel"><h2>ひっかけの型と解き方</h2><ol><li>主語の入替：免許権者、所在地知事、市町村長、農業委員会を区別。</li><li>時点の入替：契約、引渡し、知った時のどこから期間が始まるか。</li><li>原則・例外の逆転：常に、一切、だけの記述は条件を確認。</li><li>数字の比較：以下と未満、割合と金額の両方を満たすかを検算。</li><li>民法と業法の混同：業者か、業者が自ら売主かを先に確定。</li><li>個数・組合せ：ア〜エを独立判定してから選択肢へ照合。</li></ol></section>
<section class="panel"><h2>直前60分</h2><p>0〜20分：業法 ／ 20〜35分：法令 ／ 35〜45分：権利 ／ 45〜55分：税その他 ／ 55〜60分：数字と例外。アプリにA優先度の短い暗記チェック73項目を収録しました。</p><p>一般受験者は12:30までに着席、本試験は13:00〜15:00。受験票・会場と移動時間を先に確認してください。<a href="https://www.retio.or.jp/exam/schedule/">公式日程</a></p></section>
<section class="panel"><h2>全100問の論点・根拠・採用理由</h2>${qs.map(q=>`<details><summary>${q.set==='exam'?'本試験':'追加'} 問${q.number} / ${e(q.theme)} / 優先度${q.importance}</summary><p>${e(q.rationale)}</p><p>根拠：${e(q.law)} ${e(q.articles)}<br>関連教材：${q.pdfReferences.map(p=>e(p.file)+' PDF '+p.page+'ページ').join(' ／ ')}</p><p>${q.sources.map(s=>`<a href="${e(s.url)}" target="_blank" rel="noopener">${e(s.title)}</a>`).join('<br>')}</p></details>`).join('')}</section>
<section class="panel"><h2>公式根拠一覧</h2>${refs.map(s=>`<p><a href="${e(s.url)}" target="_blank" rel="noopener noreferrer">${e(s.title)}</a></p>`).join('')}</section></main><footer>法令基準 2026年4月1日 ／ 公式情報照合 2026年10月18日。予想・得点を保証しません。</footer></body></html>`;
fs.writeFileSync(new URL('reports/study-report.html',root),html);
