// 既存機能：ダウンロード
function download(filename, text) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([text], { type: 'text/html' }));
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

// 折りたたみ / 展開
document.querySelectorAll('.toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const content = btn.closest('.criterion').querySelector('.content');
    content.style.display = content.style.display === 'none' ? '' : 'none';
  });
});

// 初期値データ
const initial = {
  1: { title: 'ここに基準の短い見出し', text: 'ここに詳しい説明を書いてください。' },
  2: { title: 'ここに基準の短い見出し', text: 'ここに詳しい説明を入力してください。' },
  3: { title: 'ここに基準の短い見出し', text: 'ここに詳しい説明を入力してください。' }
};

// リセット機能
document.querySelectorAll('.reset').forEach(btn => {
  btn.addEventListener('click', () => {
    const art = btn.closest('.criterion');
    const id = art.getAttribute('data-id');
    art.querySelector('.title').textContent = initial[id].title;
    art.querySelector('.editable').textContent = initial[id].text;
  });
});

// HTMLをダウンロード
document.getElementById('download')?.addEventListener('click', () => {
  const docHead = `
  <!doctype html>
  <html lang="ja">
  <head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
  <title>保存したページ</title></head><body>`;
  const docFoot = '</body></html>';
  const main = document.querySelector('main').outerHTML;
  download('copyright-criteria.html', docHead + main + docFoot);
});

// 内容をコピー
document.getElementById('copy')?.addEventListener('click', async () => {
  const items = [];
  document.querySelectorAll('.criterion').forEach(a => {
    const id = a.dataset.id;
    const title = a.querySelector('.title').textContent.trim();
    const body = a.querySelector('.editable').textContent.trim();
    items.push(id + '. ' + title + '\n' + body);
  });
  items.push('\n補足:\n' + document.querySelector('section.card [contenteditable]')?.textContent.trim());
  const full = items.join('\n\n');
  try {
    await navigator.clipboard.writeText(full);
    alert('内容をクリップボードにコピーしました');
  } catch (e) {
    prompt('コピーできませんでした。以下のテキストを手動でコピーしてください：', full);
  }
});

// contenteditableでTab有効化
document.querySelectorAll('[contenteditable]').forEach(el => {
  el.addEventListener('keydown', e => {
    if (e.key === 'Tab') {
      e.preventDefault();
      document.execCommand('insertText', false, '    ');
    }
  });
});

// --------------------------
// トップに戻るボタン
// --------------------------
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopButton.classList.add('show');
  } else {
    backToTopButton.classList.remove('show');
  }
});

backToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
