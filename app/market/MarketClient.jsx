'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import SearchBox from '../../components/SearchBox';
import Sidebar from '../../components/Sidebar';
import TopBar from '../../components/TopBar';
import { assets, filterLabels, filterOptions, marketTabs, tabToTypes } from '../../lib/mock';

const DEFAULTS = {
  sort: '最新发布',
  license: '全部',
  budget: '全部',
  feature: '全部',
  designer: '全部',
  leadTime: '全部',
};

const budgetMatch = (price, budget) => {
  if (budget === '免费') return price === 0;
  if (budget === '¥0-100') return price > 0 && price <= 100;
  if (budget === '¥100-500') return price > 100 && price <= 500;
  if (budget === '¥500 以上') return price > 500;
  return true;
};

export default function MarketClient({ from, q }) {
  const [tab, setTab] = useState('全部素材');
  const [keyword, setKeyword] = useState('');
  const [filters, setFilters] = useState(DEFAULTS);

  const setFilter = (key, value) => setFilters((f) => ({ ...f, [key]: value }));

  // 组合 / 设计师列表页：按来源预过滤（组合详情页本期不开发）
  const base = useMemo(() => {
    if (from === 'designer' && q) return assets.filter((a) => a.author === q);
    return assets;
  }, [from, q]);

  const list = useMemo(() => {
    let r = [...base];
    const types = tabToTypes[tab];
    if (types) r = r.filter((a) => types.includes(a.type));
    if (keyword) {
      const k = keyword.toLowerCase();
      r = r.filter((a) => `${a.title} ${a.author} ${a.type}`.toLowerCase().includes(k));
    }
    if (filters.license !== '全部') r = r.filter((a) => a.license === filters.license);
    if (filters.feature !== '全部') r = r.filter((a) => a.featured === filters.feature);
    if (filters.designer !== '全部') r = r.filter((a) => a.designerType === filters.designer);
    if (filters.leadTime !== '全部') r = r.filter((a) => a.leadTime === filters.leadTime);
    if (filters.budget !== '全部') r = r.filter((a) => budgetMatch(a.price, filters.budget));

    if (filters.sort === '最新发布') r.sort((a, b) => b.id - a.id);
    if (filters.sort === '最受欢迎') r.sort((a, b) => b.likes - a.likes);
    if (filters.sort === '价格从低到高') r.sort((a, b) => a.price - b.price);
    return r;
  }, [base, tab, keyword, filters]);

  const fromTitle =
    from === 'designer' ? `设计师 · ${q} 的作品列表` :
    from === 'collection' ? `组合 · ${q} 的素材列表` : '';

  return (
    <div className="page-frame">
      <Sidebar />
      <div className="main">
        <TopBar active="market" showSearch={false} />

        <div className="content">
          <div className="market-title">素材市场</div>
          <div className="market-desc">
            支持按标签、排序状态、授权属性、预算属性、露出位置、设计师类型与排单期筛选
          </div>

          {fromTitle && (
            <div className="from-banner">
              {fromTitle}
              <Link href="/market">返回全部素材</Link>
            </div>
          )}

          {/* 顶部搜索功能，交互与首页一致 */}
          <div className="market-search">
            <SearchBox
              onSearch={setKeyword}
              externalKeyword={keyword}
              placeholder="在素材市场中搜索…"
            />
          </div>

          {/* 首期预设 5 个标签页 */}
          <div className="market-tabs">
            {marketTabs.map((t) => (
              <button
                key={t}
                className={`mtab ${tab === t ? 'active' : ''}`}
                onClick={() => setTab(t)}
              >
                {t}
              </button>
            ))}
          </div>

          {/* 6 类筛选条件 */}
          <div className="filter-bar">
            {Object.keys(DEFAULTS).map((key) => (
              <div className="filter-item" key={key}>
                <label>{filterLabels[key]}</label>
                <select value={filters[key]} onChange={(e) => setFilter(key, e.target.value)}>
                  {filterOptions[key].map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>
            ))}
            <button
              className="filter-reset"
              onClick={() => { setFilters(DEFAULTS); setKeyword(''); setTab('全部素材'); }}
            >
              重置筛选
            </button>
          </div>

          <div className="market-result-info">
            <span>共 <strong>{list.length}</strong> 个素材{keyword ? ` · 关键词「${keyword}」` : ''}</span>
            <span>当前标签：{tab}</span>
          </div>

          {list.length > 0 ? (
            <div className="market-grid">
              {list.map((a) => (
                <div className="mk-card" key={a.id}>
                  <div className="mk-cover" style={{ background: a.gradient }}>
                    <span className="mk-badge">{a.type}</span>
                  </div>
                  <div className="mk-body">
                    <div className="mk-title">{a.title}</div>
                    <div className="mk-meta">
                      <span className="mk-author">{a.author}</span>
                      <span className="mk-price">{a.price === 0 ? '免费' : `¥${a.price}`}</span>
                    </div>
                    <div className="mk-tags">
                      <span className="mk-tag">{a.license}</span>
                      <span className="mk-tag">{a.featured}</span>
                      <span className="mk-tag">{a.designerType}</span>
                      <span className="mk-tag">{a.leadTime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-placeholder">▧</div>
              <div className="empty-text">暂无搜索内容</div>
              <div className="empty-hint">当前筛选条件下没有素材，试试调整标签或筛选条件</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
