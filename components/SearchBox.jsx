'use client';

import { useEffect, useRef, useState } from 'react';
import { hotSearches } from '../lib/mock';

const STORAGE_KEY = 'pixro_search_history';
const MAX_HISTORY = 16;

/**
 * 搜索框交互（对应会议「搜索交互功能规范」）
 * - 聚焦显示「最近搜索」与「热门搜索（热门组合）」
 * - 最近搜索最多 16 条，新记录置顶并替换最旧记录
 * - 点击「删除」直接清空全部历史，无需二次确认
 * - 输入内容时提供清除按钮，一键清空当前输入
 * - 提交后由父组件渲染结果 / 无结果占位
 */
export default function SearchBox({ onSearch, externalKeyword, placeholder = '搜索素材、创作者、组合…' }) {
  const [keyword, setKeyword] = useState('');
  const [focused, setFocused] = useState(false);
  const [history, setHistory] = useState([]);
  const wrapRef = useRef(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setHistory(JSON.parse(raw));
    } catch (e) {
      setHistory([]);
    }
  }, []);

  // 外部清空搜索时（如结果栏「清除搜索」），同步清空输入框
  useEffect(() => {
    if (externalKeyword !== undefined && externalKeyword !== keyword) setKeyword(externalKeyword);
  }, [externalKeyword]);

  // 点击面板外部收起
  useEffect(() => {
    const onDocDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setFocused(false);
    };
    document.addEventListener('mousedown', onDocDown);
    return () => document.removeEventListener('mousedown', onDocDown);
  }, []);

  const persist = (list) => {
    setHistory(list);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      /* 忽略隐私模式下的存储异常 */
    }
  };

  // 新记录去重后置顶；超过 16 条时替换最旧记录
  const addHistory = (word) => {
    const next = [word, ...history.filter((h) => h !== word)].slice(0, MAX_HISTORY);
    persist(next);
  };

  const clearHistory = () => {
    persist([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      /* noop */
    }
  };

  const clearInput = () => {
    setKeyword('');
    onSearch(''); // 同时清掉搜索结果，回到默认视图
  };

  const submit = (word) => {
    const k = (word ?? '').trim();
    if (!k) return;
    addHistory(k);
    setKeyword(k);
    setFocused(false);
    onSearch(k);
  };

  return (
    <div className="search-wrap" ref={wrapRef}>
      <div className={`search-box ${focused ? 'focused' : ''}`}>
        <span className="search-icon">⌕</span>
        <input
          className="search-input"
          value={keyword}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') submit(keyword);
          }}
        />
        {keyword && (
          <button className="search-clear" onClick={clearInput} title="清除搜索内容">
            ×
          </button>
        )}
        <button className="search-submit" onClick={() => submit(keyword)}>
          搜索
        </button>
      </div>

      {focused && (
        <div className="search-panel">
          <div className="sp-head">
            <span>最近搜索</span>
            {history.length > 0 && (
              <button className="sp-del" onClick={clearHistory} title="直接清空全部历史">
                删除
              </button>
            )}
          </div>
          {history.length > 0 ? (
            <div className="sp-tags">
              {history.map((h) => (
                <button key={h} className="sp-tag" onClick={() => submit(h)}>
                  {h}
                </button>
              ))}
            </div>
          ) : (
            <div className="sp-empty-hint">暂无最近搜索，试试下面的热门搜索</div>
          )}

          <div className="sp-divider" />

          <div className="sp-head"><span>热门搜索（热门组合）</span></div>
          <div className="sp-tags sp-hot">
            {hotSearches.map((h) => (
              <button key={h} className="sp-tag" onClick={() => submit(h)}>
                {h}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
