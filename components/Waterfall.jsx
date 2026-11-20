'use client';

import { useState } from 'react';
import { assets, followAssets } from '../lib/mock';

export default function Waterfall() {
  const [tab, setTab] = useState('hot');
  const list = tab === 'hot' ? assets : followAssets;

  return (
    <>
      <div className="tabs">
        <button className={`tab ${tab === 'hot' ? 'active' : ''}`} onClick={() => setTab('hot')}>
          热门素材
        </button>
        <button className={`tab ${tab === 'follow' ? 'active' : ''}`} onClick={() => setTab('follow')}>
          关注列表
        </button>
      </div>
      <div className="waterfall">
        {list.map((a) => (
          <div className="wf-card" key={a.id}>
            <div className="wf-cover" style={{ height: a.height, background: a.gradient }}>
              <span className="wf-type">{a.type}</span>
            </div>
            <div className="wf-body">
              <div className="wf-title">{a.title}</div>
              <div className="wf-foot">
                <span className="wf-author">{a.author}</span>
                <span className="wf-likes">♡ {a.likes}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
