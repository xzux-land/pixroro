'use client';

import Link from 'next/link';
import { useState } from 'react';
import { creators } from '../lib/mock';

export default function CreatorList() {
  const [followed, setFollowed] = useState({});

  const toggle = (name) => setFollowed((f) => ({ ...f, [name]: !f[name] }));

  return (
    <>
      <div className="section-head">
        <div>
          <span className="section-title">活跃创作者</span>
          <span className="section-sub">点击创作者可进入其作品列表</span>
        </div>
        <Link href="/market?from=designer&q=林夕工作室" className="section-more">查看全部 →</Link>
      </div>
      <div className="creator-strip">
        {creators.map((c) => (
          <Link
            key={c.name}
            href={`/market?from=designer&q=${encodeURIComponent(c.name)}`}
            className="creator-chip"
          >
            <div className="creator-av" style={{ background: c.color }}>{c.name.slice(0, 1)}</div>
            <div className="creator-meta">
              <div className="creator-name">{c.name}</div>
              <div className="creator-stat">{c.works} 作品 · {c.fans} 粉丝</div>
            </div>
            <button
              className={`follow-btn ${followed[c.name] ? 'on' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                toggle(c.name);
              }}
            >
              {followed[c.name] ? '已关注' : '+ 关注'}
            </button>
          </Link>
        ))}
      </div>
    </>
  );
}
