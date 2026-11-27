'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

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
      { icon: '♡', label: '我的关注', href: '/?tab=follow', key: 'follow', switchTab: 'follow' },
      { icon: '☆', label: '我的收藏', key: 'fav', placeholder: true },
      { icon: '⚙', label: '设置', key: 'setting', placeholder: true },
    ],
  },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  // 收起瞬间锁住 hover 展开，否则鼠标还停在侧栏上会立刻被 :hover 重新撑开，看起来「没变化」
  const [hoverLocked, setHoverLocked] = useState(false);
  const [activeKey, setActiveKey] = useState(null);
  const [toast, setToast] = useState('');
  const toastTimer = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    // 带 ?tab=follow 进入首页时，让「我的关注」保持高亮
    if (new URLSearchParams(window.location.search).get('tab') === 'follow') setActiveKey('follow');
    return () => clearTimeout(toastTimer.current);
  }, []);

  const fallbackActive = pathname === '/' ? 'home' : 'market';
  const current = activeKey || fallbackActive;

  const toggle = () => {
    const next = !collapsed;
    setCollapsed(next);
    setHoverLocked(next);
  };

  const showToast = (label) => {
    setToast(`「${label}」为前端原型占位模块，暂未开发`);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), 2600);
  };

  return (
    <>
      <aside
        className={`sidebar ${collapsed ? 'is-collapsed' : ''} ${hoverLocked ? 'no-hover-expand' : ''}`}
        onMouseLeave={() => setHoverLocked(false)}
      >
        <div className="sidebar-head">
          <div className="logo-mark">p</div>
          <span className="logo-text">Pixroro</span>
          <button
            className="sidebar-toggle"
            onClick={toggle}
            title={collapsed ? '展开导航' : '收起导航'}
          >
            {collapsed ? '»' : '«'}
          </button>
        </div>

        {groups.map((g) => (
          <div key={g.title}>
            <div className="nav-group-title">{g.title}</div>
            {g.items.map((it) => {
              const cls = `nav-item ${current === it.key ? 'active' : ''}`;
              if (it.placeholder) {
                return (
                  <button
                    key={it.label}
                    type="button"
                    className={cls}
                    onClick={() => {
                      setActiveKey(it.key);
                      showToast(it.label);
                    }}
                  >
                    <span className="nav-icon">{it.icon}</span>
                    <span className="nav-label">{it.label}</span>
                  </button>
                );
              }
              return (
                <Link
                  key={it.label}
                  href={it.href}
                  className={cls}
                  onClick={() => {
                    setActiveKey(it.key);
                    // 同页点击时组件不会重新挂载，用事件通知首页切换瀑布流 Tab
                    if (it.switchTab) {
                      window.dispatchEvent(new CustomEvent('pixro:switch-tab', { detail: it.switchTab }));
                    }
                  }}
                >
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

      {toast && <div className="nav-toast" role="status">{toast}</div>}
    </>
  );
}
