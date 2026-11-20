// 全部为本地 mock 数据，后续接入后端接口时替换本文件即可。

export const gradients = [
  'linear-gradient(135deg,#ff9a9e 0%,#fecfef 100%)',
  'linear-gradient(135deg,#a18cd1 0%,#fbc2eb 100%)',
  'linear-gradient(135deg,#84fab0 0%,#8fd3f4 100%)',
  'linear-gradient(135deg,#fccb90 0%,#d57eeb 100%)',
  'linear-gradient(135deg,#e0c3fc 0%,#8ec5fc 100%)',
  'linear-gradient(135deg,#f093fb 0%,#f5576c 100%)',
  'linear-gradient(135deg,#4facfe 0%,#00f2fe 100%)',
  'linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)',
  'linear-gradient(135deg,#fa709a 0%,#fee140 100%)',
  'linear-gradient(135deg,#30cfd0 0%,#330867 100%)',
  'linear-gradient(135deg,#ffecd2 0%,#fcb69f 100%)',
  'linear-gradient(135deg,#5ee7df 0%,#b490ca 100%)',
  'linear-gradient(135deg,#f6d365 0%,#fda085 100%)',
  'linear-gradient(135deg,#667eea 0%,#764ba2 100%)',
  'linear-gradient(135deg,#f78ca0 0%,#f9748f 100%)',
  'linear-gradient(135deg,#c2e9fb 0%,#a1c4fd 100%)',
];

const rawAssets = [
  ['国潮插画 · 山海经系列', '插画', '林夕工作室'],
  ['618 电商主视觉模板', '模板', '赤木设计'],
  ['3D 玻璃质感图标集', '3D', 'Pixel Lab'],
  ['城市夜景摄影合集', '摄影', '刘川'],
  ['渐变海报版式 Vol.3', '模板', 'MOMO'],
  ['手绘植物图鉴', '插画', '青禾'],
  ['毛玻璃 UI Kit', 'UI', 'Figma 中文社'],
  ['抽象流体背景 4K', '摄影', '光年'],
  ['中式纹样图案包', '插画', '林夕工作室'],
  ['产品渲染场景模板', '3D', 'Pixel Lab'],
  ['极简 PPT 商务模板', '模板', '赤木设计'],
  ['复古胶片人像', '摄影', '刘川'],
  ['孟菲斯风格元素', '插画', 'MOMO'],
  ['APP 组件库 · 深色版', 'UI', 'Figma 中文社'],
  ['霓虹赛博城市', '3D', '光年'],
  ['民宿品牌 VI 手册', '模板', '青禾'],
];

export const assets = rawAssets.map(([title, type, author], i) => ({
  id: i + 1,
  title,
  type,
  author,
  tag: type,
  height: [220, 280, 190, 250, 300, 210, 260, 230][i % 8],
  likes: 120 + ((i * 137) % 1800),
  gradient: gradients[i % gradients.length],
  license: ['可商用', '个人使用', '企业授权'][i % 3],
  price: [0, 49, 199, 599][i % 4],
  featured: i % 3 === 0 ? '首页推荐' : '编辑精选',
  designerType: ['个人设计师', '工作室', '品牌方'][i % 3],
  leadTime: ['可接单', '1周内', '1个月内'][i % 3],
}));

// 关注列表：只展示已关注创作者的素材
export const followingAuthors = ['林夕工作室', '赤木设计', 'Pixel Lab', '刘川'];
export const followAssets = assets.filter((a) => followingAuthors.includes(a.author));

export const hotSearches = [
  '国潮插画', '3D 图标', '618 主视觉', '渐变背景',
  '字体设计', '电商主图', '毛玻璃 UI', '中式纹样',
];

export const creators = [
  { name: '林夕工作室', works: 128, fans: '12.4k', color: gradients[3] },
  { name: '赤木设计', works: 96, fans: '9.8k', color: gradients[13] },
  { name: 'Pixel Lab', works: 214, fans: '21.1k', color: gradients[6] },
  { name: '刘川', works: 73, fans: '6.2k', color: gradients[9] },
  { name: '青禾', works: 155, fans: '15.6k', color: gradients[7] },
  { name: 'MOMO', works: 88, fans: '8.1k', color: gradients[5] },
];

export const collections = [
  { id: 1, title: '国潮当燃 · 中式美学合集', count: 48, gradient: gradients[4] },
  { id: 2, title: '电商大促主视觉灵感', count: 36, gradient: gradients[8] },
  { id: 3, title: '3D 与玻璃质感趋势', count: 27, gradient: gradients[6] },
  { id: 4, title: '极简版式与留白', count: 52, gradient: gradients[15] },
];

export const banners = [
  {
    title: '发现好设计，从这里开始',
    subtitle: '百万级正版素材 · 每日更新 · 可商用授权',
    cta: '逛逛素材市场',
    gradient: 'linear-gradient(120deg,#5a4ff3 0%,#8b5cf6 45%,#ff7a9c 100%)',
  },
  {
    title: '618 大促设计专场',
    subtitle: '主视觉 / 详情页 / Banner 一键拿走',
    cta: '查看专题',
    gradient: 'linear-gradient(120deg,#ff7a59 0%,#ff4d6d 55%,#ffb26b 100%)',
  },
  {
    title: '创作者计划 · 现已开放',
    subtitle: '上传作品，让灵感产生价值',
    cta: '成为创作者',
    gradient: 'linear-gradient(120deg,#0f9b8e 0%,#38c6a3 50%,#9be15d 100%)',
  },
];

export const marketTabs = ['全部素材', '设计模板', '插画', '3D 素材', '摄影图库'];

// 标签 -> 素材 type 映射
export const tabToTypes = {
  '全部素材': null,
  '设计模板': ['模板', 'UI'],
  '插画': ['插画'],
  '3D 素材': ['3D'],
  '摄影图库': ['摄影'],
};

export const filterOptions = {
  sort: ['最新发布', '最受欢迎', '价格从低到高'],
  license: ['全部', '可商用', '个人使用', '企业授权'],
  budget: ['全部', '免费', '¥0-100', '¥100-500', '¥500 以上'],
  feature: ['全部', '首页推荐', '编辑精选'],
  designer: ['全部', '个人设计师', '工作室', '品牌方'],
  leadTime: ['全部', '可接单', '1周内', '1个月内'],
};

export const filterLabels = {
  sort: '排序状态',
  license: '授权属性',
  budget: '预算属性',
  feature: '露出位置',
  designer: '设计师类型',
  leadTime: '排单期',
};
