'use client';

import { useEffect, useState } from 'react';
import { banners } from '../lib/mock';

export default function Banner() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % banners.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const go = (step) => setIndex((i) => (i + step + banners.length) % banners.length);
  const b = banners[index];

  return (
    <div className="banner" style={{ background: b.gradient }}>
      <button className="banner-arrow prev" onClick={() => go(-1)}>‹</button>
      <button className="banner-arrow next" onClick={() => go(1)}>›</button>
      <div className="banner-title">{b.title}</div>
      <div className="banner-sub">{b.subtitle}</div>
      <button className="banner-cta">{b.cta} →</button>
      <div className="banner-dots">
        {banners.map((_, i) => (
          <button
            key={i}
            className={`banner-dot ${i === index ? 'active' : ''}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
