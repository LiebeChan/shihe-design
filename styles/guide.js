(() => {
  'use strict';
  const cards = [...document.querySelectorAll('.style-card')];
  const buttons = [...document.querySelectorAll('[data-pick]')];
  const filters = [...document.querySelectorAll('[data-filter]')];
  const search = document.querySelector('#style-search');
  const other = document.querySelector('#other-style');
  const status = document.querySelector('#copy-status');
  const fallback = document.querySelector('#copy-fallback');
  const names = cards.map(card => card.dataset.name);
  const key = 'shihe-style-preferences-v1';
  let chosen = new Set();
  let category = '全部';
  try {
    const saved = JSON.parse(localStorage.getItem(key) || '{}');
    chosen = new Set((Array.isArray(saved.styles) ? saved.styles : []).filter(name => names.includes(name)));
    other.value = typeof saved.other === 'string' ? saved.other.slice(0, 500) : '';
  } catch (_) { /* Storage may be unavailable in private or local-file browsing. */ }
  function save() {
    try { localStorage.setItem(key, JSON.stringify({styles: [...chosen], other: other.value})); }
    catch (_) { status.textContent = '当前浏览器无法保存偏好，请及时复制。'; }
  }
  function render() {
    buttons.forEach(button => {
      const selected = chosen.has(button.dataset.pick);
      button.setAttribute('aria-pressed', String(selected));
      button.textContent = selected ? '✓ 已加入偏好' : '＋ 加入偏好';
      button.closest('.style-card').classList.toggle('is-selected', selected);
    });
    document.querySelector('#selected-count').textContent = chosen.size + ' 项';
    const list = document.querySelector('#selected-list');
    list.replaceChildren();
    names.filter(name => chosen.has(name)).forEach(name => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'selected-chip';
      chip.textContent = name + ' ×';
      chip.setAttribute('aria-label', '移除偏好：' + name);
      chip.addEventListener('click', () => { chosen.delete(name); save(); render(); });
      list.append(chip);
    });
    if (!chosen.size) list.textContent = '还没有选择，点击风格卡片上的“加入偏好”即可。';
  }
  function filter() {
    const query = search.value.trim().toLocaleLowerCase();
    let count = 0;
    cards.forEach(card => {
      const match = (category === '全部' || card.dataset.category === category) && card.textContent.toLocaleLowerCase().includes(query);
      card.hidden = !match;
      if (match) count++;
    });
    document.querySelector('#count').textContent = count + ' / 26 种风格';
    document.querySelector('#empty').hidden = count !== 0;
  }
  buttons.forEach(button => button.addEventListener('click', () => {
    const name = button.dataset.pick;
    chosen.has(name) ? chosen.delete(name) : chosen.add(name);
    status.textContent = '';
    fallback.hidden = true;
    save(); render();
  }));
  filters.forEach(button => button.addEventListener('click', () => {
    category = button.dataset.filter;
    filters.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    filter();
  }));
  search.addEventListener('input', filter);
  other.addEventListener('input', save);
  document.querySelector('#clear-preferences').addEventListener('click', () => {
    chosen.clear(); other.value = ''; fallback.hidden = true; status.textContent = '';
    save(); render();
  });
  document.querySelector('#copy-preferences').addEventListener('click', async () => {
    if (!chosen.size && !other.value.trim()) { status.textContent = '请先选择风格或填写其他偏好。'; return; }
    const text = '我的装修风格偏好：\n' + names.filter(name => chosen.has(name)).join('、') + (other.value.trim() ? '\n其他：' + other.value.trim() : '');
    try {
      await navigator.clipboard.writeText(text);
      fallback.hidden = true;
      status.textContent = '已复制，可粘贴到问卷或发送给设计师。';
    } catch (_) {
      fallback.value = text; fallback.hidden = false; fallback.focus(); fallback.select();
      status.textContent = '浏览器不允许自动复制，请复制下方已选中的文字。';
    }
  });
  render(); filter();
})();
