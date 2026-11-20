'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import Banner from '../components/Banner';
import CreatorList from '../components/CreatorList';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import Waterfall from '../components/Waterfall';
import { assets, collections } from '../lib/mock';

export default function Home() {
  const [keyword, setKeyword] = useState('');

  const results = useMemo(() => {
    if (!keyword) return [];
    const k = keyword.toLowerCase();
    return assets.filter((a) => `${a.title} ${a.author} ${a.type}`.toLowerCase().includes(k));
  }, [keyword]);

  return (
    <div className="page-frame">
      <Sidebar />
      <div className="main">
        <TopBar active="home" onSearch={setKeyword} keyword={keyword} />

        <div className="content">
          <div className="hero-row">
            <Banner />
            <div className="combo-col">
              <div className="combo-col-title">热门组合 · 点击查看列表</div>
              {collections.map((c) => (
                <Link
                  key={c.id}
                  className="combo-card"
                  style={{ background: c.gradient }}
                  href={`/market?from=collection&q=${encodeURIComponent(c.title)}`}
                >
                  <div className="combo-title">{c.title}</div>
                  <div className="combo-count">{c.count} 个素材 · 进入列表 →</div>
                </Link>
              ))}
            </div>
          </div>

          <CreatorList />

          {keyword ? (
            <>
              <div className="result-bar">
                <span>「<strong>{keyword}</strong>」的搜索结果 · 共 {results.length} 个素材</span>
                <button className="result-clear" onClick={() => setKeyword('')}>
                  清除搜索，返回首页
                </button>
              </div>

              {results.length > 0 ? (
                <div className="result-grid">
                  {results.map((a) => (
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
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <div className="empty-placeholder">▧</div>
                  <div className="empty-text">暂无搜索内容</div>
                  <div className="empty-hint">换个关键词试试，或从搜索框的「最近搜索 / 热门搜索」中选择</div>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="section-head">
                <div>
                  <span className="section-title">推荐素材</span>
                  <span className="section-sub">瀑布流展示热门素材与关注列表</span>
                </div>
                <Link href="/market" className="section-more">进入素材市场 →</Link>
              </div>
              <Waterfall />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
