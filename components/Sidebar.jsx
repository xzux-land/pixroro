'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const groups = [
  {
    title: '发现',
    items: [
      { icon: '⌂', label: '首页', href: '/', key: 'home' },
      { icon: '▦', label: '素材市场', href: '/market', key: 'market' },
      { icon: '◈', label: '热门组合', href: '/market?from=collection&q=热门组合', key: 'collection' },
      { icon: '◎', label: '创作者', href: '/market?from=designer&q=林夕工作室', key: 'creator' },
    ],
  },
  {
    title: '我的',
    items: [
      { icon: '♡', label: '我的关注', href: '/', key: 'follow' },
      { icon: '☆', label: '我的收藏', href: '/', key: 'fav' },
      { icon: '⚙', label: '设置', href: '/', key: 'setting' },
    ],
  },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside className={`sidebar ${collapsed ? 'is-collapsed' : ''}`}>
      <div className="sidebar-head">
        <div className="logo-mark">p</div>
        <span className="logo-text">pixro<span className="logo-dot">.</span></span>
        <button
          className="sidebar-toggle"
          onClick={() => setCollapsed((v) => !v)}
          title={collapsed ? '展开导航' : '收起导航'}
        >
          {collapsed ? '»' : '«'}
        </button>
      </div>

      {groups.map((g) => (
        <div key={g.title}>
          <div className="nav-group-title">{g.title}</div>
          {g.items.map((it) => {
            const active = pathname === '/' ? it.key === 'home' : it.key === 'market' && pathname.startsWith('/market');
            return (
              <Link key={it.label} href={it.href} className={`nav-item ${active ? 'active' : ''}`}>
                <span className="nav-icon">{it.icon}</span>
                <span className="nav-label">{it.label}</span>
              </Link>
            );
          })}
        </div>
      ))}

      <div className="sidebar-foot">
        当前为前端原型演示<br />数据均为本地 mock
      </div>
    </aside>
  );
}
