'use client';

import Link from 'next/link';
import SearchBox from './SearchBox';

const menus = [
  { label: '首页', href: '/', key: 'home' },
  { label: '素材市场', href: '/market', key: 'market' },
  { label: '灵感发现', href: '/market?from=collection&q=灵感发现', key: 'inspire' },
  { label: '创作者社区', href: '/market?from=designer&q=林夕工作室', key: 'creator' },
];

export default function TopBar({ active = 'home', onSearch = () => {}, showSearch = true, keyword }) {
  return (
    <header className="topbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
        <div className="logo-mark" style={{ width: 30, height: 30, flexBasis: 30, fontSize: 16 }}>p</div>
        <span className="logo-text" style={{ fontSize: 17 }}>Pixroro</span>
      </div>

      <nav className="top-menus">
        {menus.map((m) => (
          <Link key={m.key} href={m.href} className={`top-menu ${active === m.key ? 'active' : ''}`}>
            {m.label}
          </Link>
        ))}
      </nav>

      <div className="top-right">
        {showSearch && <SearchBox onSearch={onSearch} externalKeyword={keyword} />}
        <div className="user-area">
          <div className="avatar">访</div>
          <div>
            <div className="user-name">未登录</div>
            <div className="user-role">登录解锁收藏与下载</div>
          </div>
          <button className="btn-login">登录 / 注册</button>
        </div>
      </div>
    </header>
  );
}
