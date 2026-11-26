// =========================================
// 1. 質問データ（3軸 × 各3問 ＝ 全9問）
// =========================================
// axis: 'VR' (正:前衛/直感, 負:後衛/慎重)
//       'PM' (正:突破/情熱, 負:知略/論理)
//       'SC' (正:孤高/特化, 負:協調/支援)
const QUESTIONS = [
  // --- 軸1: 行動スタイル (V vs R) ---
  {
    axis: 'VR',
    hint: '第一の試練：行動の源泉',
    text: '未知のダンジョンを発見したら、下調べをする前にまず足を踏み入れてみたい。',
    direction: 1 // プラス回答で V（前衛）に加算
  },
  {
    axis: 'VR',
    hint: '第二の試練：決断のスピード',
    text: '新しい武器や道具を買うとき、直感で「これだ！」と即決する方だ。',
    direction: 1
  },
  {
    axis: 'VR',
    hint: '第三の試練：危機への反応',
    text: '想定外のトラブルが起きたとき、じっくり考えるより先に体が動く。',
    direction: 1
  },

  // --- 軸2: 問題解決のアプローチ (P vs M) ---
  {
    axis: 'PM',
    hint: '第四の試練：突破の流儀',
    text: '立ちはだかる巨大な壁。理屈をこねるより、気合と行動力で押し切りたい！',
    direction: 1 // プラス回答で P（突破・情熱）に加算
  },
  {
    axis: 'PM',
    hint: '第五の試練：思考の傾向',
    text: '物事を判断するときは、データや効率よりも「自分の心が燃えるか」を重視する。',
    direction: 1
  },
  {
    axis: 'PM',
    hint: '第六の試練：課題への向き合い方',
    text: '複雑なパズルや戦略を練るよりも、シンプルで豪快な解決策が好きだ。',
    direction: 1
  },

  // --- 軸3: パーティでの立ち位置 (S vs C) ---
  {
    axis: 'SC',
    hint: '第七の試練：冒険のスタイル',
    text: '誰かと足並みを揃えるより、自分のペースで自由に動く方が実力を発揮できる。',
    direction: 1 // プラス回答で S（孤高・特化）に加算
  },
  {
    axis: 'SC',
    hint: '第八の試練：役割の好み',
    text: 'サポート役に回るよりも、自分が切り札となって戦局を決める役割に憧れる。',
    direction: 1
  },
  {
    axis: 'SC',
    hint: '第九の試練：休息の過ごし方',
    text: '酒場でみんなと騒ぐよりも、一人で静かに次の冒険の準備をする時間が好きだ。',
    direction: 1
  }
];

// =========================================
// 2. 全8ジョブのマスターデータ
// =========================================
const JOBS = {
  VPS: {
    code: 'VPS',
    icon: '🪓',
    name: '狂戦士（バーサーカー）',
    subtitle: '限界突破の孤高なる刃',
    description: '圧倒的な行動力と情熱を秘めた、生粋の突破者。迷う前に駆け出し、どんな困難も持ち前のエネルギーで粉砕します。自分の信念に真っ直ぐな一匹狼タイプで、ここぞという場面で爆発的な力を発揮するパーティの切り札です。',
    partner: '重装守護者（RPC）や錬金術師（RMC）など、冷静に背中を守ってくれる参謀タイプと組むと無敵の力を発揮します。'
  },
  VPC: {
    code: 'VPC',
    icon: '🛡️',
    name: '聖騎士（パラディン）',
    subtitle: '仲間を守る不屈の盾',
    description: '熱い正義感と行動力を兼ね備えた、天性のリーダータイプ。「誰かのために」という想いが最強の原動力になり、困難な状況でも先頭に立って仲間を鼓舞します。周囲からの信頼も厚く、パーティの精神的支柱となる存在です。',
    partner: '大魔導士（RMS）や暗殺者（RPS）など、一点突破の火力を持つスペシャリストと組むと最高のバランスになります。'
  },
  VMS: {
    code: 'VMS',
    icon: '⚡',
    name: '魔法剣士（スペルブレイド）',
    subtitle: '戦場を舞う知略の閃光',
    description: 'スピード感ある行動力と、クールな分析力を併せ持つスマートな実力者。直感でチャンスを嗅ぎ分け、論理的な戦術で最短ルートの勝利を掴み取ります。自分のスタイルを確立しており、器用に何でもこなせる天才肌です。',
    partner: '吟遊詩人（VMC）や重装守護者（RPC）など、場を整えてくれるサポーターと組むと自由に暴れられます。'
  },
  VMC: {
    code: 'VMC',
    icon: '🎻',
    name: '吟遊詩人（バード）',
    subtitle: '場を盛り上げる奇跡の奏者',
    description: '柔軟な発想力と高いコミュニケーション能力を持つ、パーティのムードメーカー。状況に応じて立ち回りを変える器用さがあり、硬直した空気を一瞬で明るく変える力があります。人と人を繋ぎ、思わぬ幸運を引き寄せる才能の持ち主です。',
    partner: '狂戦士（VPS）や大魔導士（RMS）など、マイペースな職人タイプを上手く乗せてあげることで最高のチームになります。'
  },
  RPS: {
    code: 'RPS',
    icon: '🗡️',
    name: '暗殺者（アサシン）',
    subtitle: '影から一撃を放つ完璧主義者',
    description: '冷静沈着な観察眼と、目標を確実に仕留める集中力を持つプロフェッショナル。無駄な動きを嫌い、勝算を見極めてから動く慎重派です。一人の時間を大切にし、自分の得意分野を極限まで磨き上げる職人気質な一面があります。',
    partner: '聖騎士（VPC）や吟遊詩人（VMC）など、正面から注目を集めてくれる陽のタイプと組むと真価を発揮します。'
  },
  RPC: {
    code: 'RPC',
    icon: '🏰',
    name: '重装守護者（ガーディアン）',
    subtitle: '揺るぎなき鉄壁の要塞',
    description: '誠実さと責任感に溢れ、仲間を全力で支える縁の下の力持ち。派手なパフォーマンスよりも「確実な積み重ね」を大切にし、どんな逆境でも最後まで崩れないタフな精神力を持っています。あなたが後ろにいるだけで、仲間は安心して戦えます。',
    partner: '狂戦士（VPS）や魔法剣士（VMS）など、前線でアグレッシブに攻めるタイプと組むと相性抜群です。'
  },
  RMS: {
    code: 'RMS',
    icon: '🔮',
    name: '大魔導士（アークメイジ）',
    subtitle: '真理を探究する孤高の賢者',
    description: '深い思考力と飽くなき探究心を持つ、知のスペシャリスト。物事の本質をじっくりと見極め、誰も思いつかないような高度な解決策を導き出します。自分の世界観を大切にしており、静かな環境でこそ最大のポテンシャルを発揮します。',
    partner: '聖騎士（VPC）や吟遊詩人（VMC）など、外の世界と繋いでくれる行動派のパートナーが最高の相棒になります。'
  },
  RMC: {
    code: 'RMC',
    icon: '⚗️',
    name: '錬金術師（アルケミスト）',
    subtitle: '知識と工夫で未来を創る参謀',
    description: '冷静な分析力と温かい協調性を兼ね備えた、パーティの頭脳にして名参謀。周囲の状況を細かく観察し、仲間が動きやすいように最適なサポートやアイテムを用意できます。知恵と工夫でピンチをチャンスに変えるクリエイティブな存在です。',
    partner: '狂戦士（VPS）や魔法剣士（VMS）など、直感で突き進むアタッカータイプを裏から操ると最強のコンビになります。'
  }
};

// =========================================
// 3. 状態管理（State）
// =========================================
let currentStep = 0; // 現在の質問インデックス (0〜8)
let answers = [];    // 各質問の回答スコアを保存する配列
let playerName = ''; // 冒険者名
let lastResultJob = null; // シェア用の最新診断結果

// =========================================
// 4. DOM要素の取得
// =========================================
const screens = {
  start: document.getElementById('screen-start'),
  quiz: document.getElementById('screen-quiz'),
  loading: document.getElementById('screen-loading'),
  result: document.getElementById('screen-result')
};

const playerNameInput = document.getElementById('player-name');
const btnStart = document.getElementById('btn-start');
const btnPrev = document.getElementById('btn-prev');
const questionNumber = document.getElementById('question-number');
const questionAxisHint = document.getElementById('question-axis-hint');
const progressBarFill = document.getElementById('progress-bar-fill');
const questionText = document.getElementById('question-text');
const choiceButtons = document.querySelectorAll('.choice-btn');

// モーダル・トースト関連
const modalDex = document.getElementById('modal-dex');
const dexList = document.getElementById('dex-list');
const toast = document.getElementById('toast');

// =========================================
// 5. 画面切り替え関数
// =========================================
function showScreen(screenName) {
  Object.values(screens).forEach(screen => screen.classList.remove('active'));
  screens[screenName].classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// =========================================
// 6. 診断フローの制御
// =========================================
// スタートボタン
btnStart.addEventListener('click', () => {
  const rawName = playerNameInput.value.trim();
  playerName = rawName !== '' ? rawName : '名無しの冒険者';
  
  currentStep = 0;
  answers = [];
  renderQuestion();
  showScreen('quiz');
});

// 質問の描画
function renderQuestion() {
  const q = QUESTIONS[currentStep];
  questionNumber.textContent = `Q.${currentStep + 1} / ${QUESTIONS.length}`;
  questionAxisHint.textContent = q.hint;
  questionText.textContent = q.text;

  // 進捗バーの更新
  const progressPercent = ((currentStep + 1) / QUESTIONS.length) * 100;
  progressBarFill.style.width = `${progressPercent}%`;

  // 「前の質問に戻る」ボタンの有効/無効切り替え
  btnPrev.disabled = currentStep === 0;
}

// 選択肢クリック時の処理
choiceButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const score = Number(btn.dataset.score);
    answers[currentStep] = score;

    if (currentStep < QUESTIONS.length - 1) {
      currentStep++;
      renderQuestion();
    } else {
      // 全問終了 → ローディング演出へ
      startAnalysis();
    }
  });
});

// 前の質問に戻る
btnPrev.addEventListener('click', () => {
  if (currentStep > 0) {
    currentStep--;
    renderQuestion();
  }
});

// 解析演出から結果表示へ
function startAnalysis() {
  showScreen('loading');
  setTimeout(() => {
    calculateAndShowResult();
  }, 1300); // 1.3秒の魔法陣演出
}

// =========================================
// 7. スコア計算と結果の描画
// =========================================
function calculateAndShowResult() {
  const scores = { VR: 0, PM: 0, SC: 0 };

  QUESTIONS.forEach((q, index) => {
    scores[q.axis] += answers[index] * q.direction;
  });

  // 各軸の正負でタイプコードを決定（0以上の場合は前者のタイプ）
  const code1 = scores.VR >= 0 ? 'V' : 'R';
  const code2 = scores.PM >= 0 ? 'P' : 'M';
  const code3 = scores.SC >= 0 ? 'S' : 'C';
  const jobCode = `${code1}${code2}${code3}`;

  const job = JOBS[jobCode];
  lastResultJob = job;

  // 結果画面にデータを反映
  document.getElementById('result-player-name').textContent = playerName;
  document.getElementById('result-icon').textContent = job.icon;
  document.getElementById('result-subtitle').textContent = job.subtitle;
  document.getElementById('result-job-name').textContent = job.name;
  document.getElementById('result-code').textContent = `TYPE: ${job.code}`;
  document.getElementById('result-description').textContent = job.description;
  document.getElementById('result-partner').textContent = job.partner;

  showScreen('result');


/*
  // パラメータバーのアニメーション（各軸のスコア範囲は -6 〜 +6 → 10% 〜 90% にマッピング）
  setTimeout(() => {
    document.getElementById('stat-bar-1').style.width = `${calcBarPercent(scores.VR)}%`;
    document.getElementById('stat-bar-2').style.width = `${calcBarPercent(scores.PM)}%`;
    document.getElementById('stat-bar-3').style.width = `${calcBarPercent(scores.SC)}%`;
  }, 100);
}

// スコア(-6〜+6)をバーの幅(12%〜88%)に変換するヘルパー関数
function calcBarPercent(score) {
  const maxScore = 6;
  // 左側（V, P, S）が強いほどバーが長くなるように計算
  const normalized = (score + maxScore) / (maxScore * 2); // 0.0 〜 1.0
  return Math.round(12 + normalized * 76);
}
*/

// パラメータバーのアニメーション（中央50%から左右に伸びる）
  setTimeout(() => {
    updateStatBar('stat-bar-1', scores.VR);
    updateStatBar('stat-bar-2', scores.PM);
    updateStatBar('stat-bar-3', scores.SC);
  }, 100);
}

// スコア(-6〜+6)に応じて中央から左右にバーを伸ばす関数
function updateStatBar(barId, score) {
  const bar = document.getElementById(barId);
  const maxScore = 6;

  // 左右のラベル要素を取得してリセット
  const labels = bar.closest('.stat-row').querySelectorAll('.stat-labels span');
  labels[0].classList.remove('active-label');
  labels[1].classList.remove('active-label');

  // クラスの初期化
  bar.classList.remove('left', 'right');

  if (score >= 0) {
    // 左側（V, P, S）が強い場合：中央から左へ伸びる（最小でも6%は伸ばして0点でも視認できるようにする）
    const widthPercent = Math.max(6, Math.round((score / maxScore) * 48));
    bar.classList.add('left');
    bar.style.left = `${50 - widthPercent}%`;
    bar.style.width = `${widthPercent}%`;
    labels[0].classList.add('active-label'); // 左ラベルを強調
  } else {
    // 右側（R, M, C）が強い場合：中央から右へ伸びる
    const widthPercent = Math.round((Math.abs(score) / maxScore) * 48);
    bar.classList.add('right');
    bar.style.left = '50%';
    bar.style.width = `${widthPercent}%`;
    labels[1].classList.add('active-label'); // 右ラベルを強調
  }
}

// =========================================
// 8. シェア機能・リトライ・全ジョブ図鑑モーダル
// =========================================
// 結果をクリップボードにコピー

/*
document.getElementById('btn-share').addEventListener('click', () => {
  if (!lastResultJob) return;
  const shareText = `【異世界ギルド・適性ジョブ診断】\n冒険者「${playerName}」の天職は…\n${lastResultJob.icon}『${lastResultJob.name}』でした！\n（${lastResultJob.subtitle}）\n#異世界ギルド診断`;

  navigator.clipboard.writeText(shareText).then(() => {
    showToast('鑑定結果をクリップボードにコピーしました！');
  }).catch(() => {
    showToast('コピーに失敗しました。手動で選択してください。');
  });
});
*/

// 結果をX（旧Twitter）にポストする
document.getElementById('btn-share').addEventListener('click', () => {
  if (!lastResultJob) return;

  const pageUrl = window.location.href; // 公開したページのURLを自動取得
  const shareText = `【異世界ギルド・適性ジョブ診断】\n冒険者「${playerName}」の天職は…\n${lastResultJob.icon}『${lastResultJob.name}』でした！\n～${lastResultJob.subtitle}～\n#異世界ジョブ診断\n`;

  // URLエンコードしてXの投稿画面URLを作成
  const intentUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(pageUrl)}`;

  // 新しいタブでXの投稿画面を開く
  window.open(intentUrl, '_blank', 'noopener,noreferrer');
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

/*
// もう一度鑑定する
document.getElementById('btn-retry').addEventListener('click', () => {
  // バーをリセット
  document.getElementById('stat-bar-1').style.width = '50%';
  document.getElementById('stat-bar-2').style.width = '50%';
  document.getElementById('stat-bar-3').style.width = '50%';
  showScreen('start');
});
*/

// もう一度鑑定する
document.getElementById('btn-retry').addEventListener('click', () => {
  ['stat-bar-1', 'stat-bar-2', 'stat-bar-3'].forEach(id => {
    const bar = document.getElementById(id);
    bar.style.left = '50%';
    bar.style.width = '0%';
  });
  showScreen('start');
});

// 全ジョブ図鑑の生成と開閉
function initDexModal() {
  dexList.innerHTML = '';
  Object.values(JOBS).forEach(job => {
    const item = document.createElement('div');
    item.className = 'dex-item';
    item.innerHTML = `
      <div class="dex-item-header">
        <span class="dex-icon">${job.icon}</span>
        <div>
          <div class="dex-name">${job.name}</div>
          <div class="dex-sub">${job.subtitle}</div>
        </div>
      </div>
      <p class="dex-desc">${job.description}</p>
    `;
    dexList.appendChild(item);
  });
}

document.getElementById('btn-open-dex').addEventListener('click', () => {
  modalDex.classList.add('open');
});

document.getElementById('btn-open-dex-result').addEventListener('click', () => {
  modalDex.classList.add('open');
});

document.getElementById('btn-close-dex').addEventListener('click', () => {
  modalDex.classList.remove('open');
});

modalDex.addEventListener('click', (e) => {
  if (e.target === modalDex) {
    modalDex.classList.remove('open');
  }
});

// 初期化実行
initDexModal();