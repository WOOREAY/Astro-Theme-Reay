/**
 * Internationalization configuration for the template.
 * Provides English and Chinese label dictionaries.
 */

export const defaultLang = 'en' as const;
export const languages = {
  en: 'English',
  zh: '中文',
} as const;

export type Language = keyof typeof languages;

export const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.blog': 'Blog',
    'nav.archives': 'Archives',
    'nav.projects': 'Projects',
    'nav.links': 'Links',
    'nav.about': 'About',
    
    // Home page
    'home.hero.subtitle': 'Your professional headline',
    'home.hero.intro': 'Introduce yourself, highlight your strengths, and summarise what drives your work.',
    'home.hero.scroll': 'Scroll down',
    
    // Posts section
    'posts.title': 'Latest Posts',
    'posts.subtitle': 'Record Learning · Share Thoughts · Continuous Growth',
    'posts.readMore': 'Read Article',
    'posts.viewAll': 'View All Articles',
    'posts.stats.total': 'Total Articles',
    'posts.stats.updating': 'Continuously Updating',
    
    // Projects section
    'projects.title': 'Featured Projects',
    'projects.subtitle': 'Open Source · Technical Practice · Continuous Creation',
    'projects.featured': 'Featured',
    'projects.viewProject': 'View Project',
    'projects.viewAll': 'View All Projects',
    'projects.stats.featured': 'Featured Projects',
    'projects.stats.stars': 'Stars',
    'projects.noDescription': 'No description',
    
    // About section
    'about.title': 'About Me',
    'about.subtitle': 'Summarise your expertise and interests',
    'about.dev-tools.title': 'Development Tools',
    'about.dev-tools.subtitle': 'Programming and design tools you rely on',
    'about.productivity.title': 'Productivity Tools',
    'about.productivity.subtitle': 'Applications that support your workflow',
    'about.interests.title': 'Interests',
    'about.interests.subtitle': 'Life beyond coding',
    
    // Site info section
    'site.title': 'About This Site',
    'site.subtitle': 'A modern, clean, and flexible Astro starter theme',
    'site.stats.articles': 'Total Articles',
    'site.stats.tags': 'Tags',
    'site.stats.words': 'Total Words',
    'site.stats.thisYear': 'Published This Year',
    'site.tech.title': 'Tech Stack',
    'site.tech.subtitle': 'Modern',
    'site.tech.description': 'Built with Astro, UnoCSS, and TypeScript',
    
    // Footer
    'footer.navigation': 'Quick Navigation',
    'footer.subscribe': 'Subscribe',
    
    // Theme
    'theme.toggle.light': 'Switch theme (current: light)',
    'theme.toggle.dark': 'Switch theme (current: dark)',
    
    // Language
    'lang.switch': 'Switch Language',
    
    // Page titles
    'page.title.home': 'Home',
    'page.title.blog': 'Blog',
    'page.title.archives': 'Archives',
    'page.title.projects': 'Projects',
    'page.title.links': 'Links',
    'page.title.about': 'About',
    
    // Blog page
    'blog.title': 'Blog',
    'blog.subtitle': 'Thoughts, tutorials, and insights',
    'blog.allPosts': 'All Posts',
    'blog.readTime': 'min read',
    'blog.publishedOn': 'Published on',
    'blog.updatedOn': 'Updated on',
    'blog.tags': 'Tags',
    'blog.series': 'Series',
    'blog.tableOfContents': 'Table of Contents',
    'blog.relatedPosts': 'Related Posts',
    
    // Projects page
    'projectsPage.title': 'Projects',
    'projectsPage.subtitle': 'Open source works and tech practice',
    'projectsPage.allProjects': 'All Projects',
    'projectsPage.filterByCategory': 'Filter by Category',
    'projectsPage.all': 'All',
    
    // Archives page
    'archives.title': 'Archives',
    'archives.subtitle': 'Browse by time, tags, and series',
    'archives.byTime': 'By Time',
    'archives.byTags': 'By Tags',
    'archives.bySeries': 'By Series',
    'archives.stats.title': 'Statistics',
    'archives.stats.overview': 'Statistics Overview',
    'archives.nav.overview': 'Overview',
    'archives.nav.tags': 'Tags',
    'archives.nav.series': 'Series',
    'archives.nav.timeline': 'Timeline',
    'archives.allTags': 'All Tags',
    'archives.allSeries': 'All Series',
    
    // About page
    'aboutPage.title': 'About',
    'aboutPage.subtitle': 'Share your background and story',
    'about.education.title': 'Education',
    'about.experience.title': 'Work Experience',
    'about.social.title': 'Social Networks',
    'about.social.description': 'Find me on these platforms',
    'about.timeline.title': 'Growth Journey',
    'about.timeline.description': 'My learning and creation journey',
    'about.site.title': 'About This Site',
    'about.site.description': 'Site information and tech stack',
    'about.site.stats': 'Site Statistics',
    'about.site.stats.posts': 'Posts',
    'about.site.stats.words': 'Words',
    'about.site.stats.visitors': 'Visits',
    'about.site.techStack': 'Tech Stack',
    
    // Archives timeline
    'archives.timeline.quickJump': 'Quick Jump:',
    
    // Links page  
    'links.title': 'Links',
    'links.subtitle': 'Curated resources and recommended sites',
    'links.friendLinks': 'Community',
    'links.friendLinks.desc': 'Like-minded creators',
    'links.websites': 'Websites',
    'links.websites.desc': 'Useful references and tools',
    'links.social': 'Social',
    'links.social.desc': 'Stay connected across platforms',
    'links.viewAll': 'View All',
    'links.apply.title': 'Request a Link Exchange',
    'links.apply.requirements': 'Application Requirements',
    'links.apply.siteInfo': 'Site Information',
    'links.apply.siteName': 'Site Name',
    'links.apply.siteUrl': 'Site URL',
    'links.apply.siteDesc': 'Description',
    'links.totalLinks': 'Total Links',
    'links.featured': 'Featured',
    'links.friends': 'Friends',
    'links.sites': 'Sites',
    
    // Archives page detailed
    'archives.totalWords': 'Total Words',
    'archives.avgWords': 'Avg Words',
    'archives.latestUpdate': 'Latest Update',
    'archives.publishedThisYear': 'Published This Year',
    'archives.runningDays': 'Running Days',
    'archives.hotTags': 'Hot Tags',
    'archives.series': 'Series',
    'archives.viewAllTags': 'View All Tags',
    'archives.viewAllSeries': 'View All Series',
    'archives.exploreMore': 'Explore More',
    'archives.timeline': 'Timeline',
    'archives.timeline.desc': 'Browse all posts in chronological order',
    'archives.blogList': 'Blog List',
    'archives.blogList.desc': 'View latest published posts',
    'archives.postsCount': 'posts',
    'archives.browseAllTags': 'Browse all {count} tags',
    'archives.moreSeriesAvailable': '{count} more series available',
    'archives.viewAllSeriesLink': 'view all series',
    'archives.hint.clickTag': 'Click tags to view related posts, or',
    'archives.hint.browseAllTags': 'browse all tags',
    'archives.hint.moreSeries': 'more series available,',
    'archives.hint.viewAllSeries': 'view all series',
  },
  zh: {
    // Navigation
    'nav.home': '首页',
    'nav.blog': '博客',
    'nav.archives': '归档',
    'nav.projects': '项目',
    'nav.links': '链接',
    'nav.about': '关于',
    
    // Home page
    'home.hero.subtitle': '你的职业标签',
    'home.hero.intro': '在此介绍自己，概述擅长技能、热爱的领域，以及你对创作的理解。',
    'home.hero.scroll': '向下滚动',
    
    // Posts section
    'posts.title': '最新文章',
    'posts.subtitle': '记录学习 · 分享思考 · 持续成长',
    'posts.readMore': '阅读文章',
    'posts.viewAll': '查看全部文章',
    'posts.stats.total': '文章总数',
    'posts.stats.updating': '持续更新中',
    
    // Projects section
    'projects.title': '精选项目',
    'projects.subtitle': '开源作品 · 技术实践 · 持续创造',
    'projects.featured': '精选',
    'projects.viewProject': '查看项目',
    'projects.viewAll': '查看全部项目',
    'projects.stats.featured': '个精选项目',
    'projects.stats.stars': 'Stars',
    'projects.noDescription': '暂无描述',
    
    // About section
    'about.title': '关于我',
    'about.subtitle': '简要介绍你的专长与兴趣',
    'about.dev-tools.title': '开发工具',
    'about.dev-tools.subtitle': '日常使用的编程与设计工具',
    'about.productivity.title': '效率工具',
    'about.productivity.subtitle': '提升工作效率的应用',
    'about.interests.title': '兴趣爱好',
    'about.interests.subtitle': '编程之外的生活',
    
    // Site info section
    'site.title': '关于本站',
    'site.subtitle': '一个现代、简洁、可扩展的 Astro 起始主题',
    'site.stats.articles': '文章总数',
    'site.stats.tags': '标签数量',
    'site.stats.words': '总字数',
    'site.stats.thisYear': '今年发布',
    'site.tech.title': '技术栈',
    'site.tech.subtitle': '现代化',
    'site.tech.description': '采用 Astro、UnoCSS 与 TypeScript 构建',
    
    // Footer
    'footer.navigation': '快捷导航',
    'footer.subscribe': '资源订阅',
    
    // Theme
    'theme.toggle.light': '切换主题（当前：亮色）',
    'theme.toggle.dark': '切换主题（当前：暗色）',
    
    // Language
    'lang.switch': '切换语言',
    
    // Page titles
    'page.title.home': '首页',
    'page.title.blog': '博客',
    'page.title.archives': '归档',
    'page.title.projects': '项目',
    'page.title.links': '链接',
    'page.title.about': '关于',
    
    // Blog page
    'blog.title': '博客',
    'blog.subtitle': '思考、教程和见解',
    'blog.allPosts': '全部文章',
    'blog.readTime': '分钟阅读',
    'blog.publishedOn': '发布于',
    'blog.updatedOn': '更新于',
    'blog.tags': '标签',
    'blog.series': '系列',
    'blog.tableOfContents': '目录',
    'blog.relatedPosts': '相关文章',
    
    // Projects page
    'projectsPage.title': '项目',
    'projectsPage.subtitle': '开源作品与技术实践',
    'projectsPage.allProjects': '全部项目',
    'projectsPage.filterByCategory': '按分类筛选',
    'projectsPage.all': '全部',
    
    // Archives page
    'archives.title': '归档',
    'archives.subtitle': '按时间、标签和系列浏览',
    'archives.byTime': '按时间',
    'archives.byTags': '按标签',
    'archives.bySeries': '按系列',
    'archives.stats.title': '统计信息',
    'archives.stats.overview': '统计总览',
    'archives.nav.overview': '统计总览',
    'archives.nav.tags': '标签云',
    'archives.nav.series': '系列专栏',
    'archives.nav.timeline': '时间轴',
    'archives.allTags': '全部标签',
    'archives.allSeries': '全部系列',
    
    // About page
    'aboutPage.title': '关于',
    'aboutPage.subtitle': '更多了解我',
    'about.education.title': '教育经历',
    'about.experience.title': '工作经验',
    'about.social.title': '社交网络',
    'about.social.description': '在这些平台找到我',
    'about.timeline.title': '成长轨迹',
    'about.timeline.description': '我的学习与创作历程',
    'about.site.title': '关于本站',
    'about.site.description': '站点信息与技术栈',
    'about.site.stats': '站点统计',
    'about.site.stats.posts': '文章',
    'about.site.stats.words': '字数',
    'about.site.stats.visitors': '访问',
    'about.site.techStack': '技术栈',
    
    // Archives timeline
    'archives.timeline.quickJump': '快速跳转:',
    
    // Links page
    'links.title': '链接',
    'links.subtitle': '精选资源与推荐站点',
    'links.friendLinks': '社区伙伴',
    'links.friendLinks.desc': '志同道合的创作者',
    'links.websites': '网站合集',
    'links.websites.desc': '值得收藏的工具与资讯',
    'links.social': '社交平台',
    'links.social.desc': '在这些渠道保持联系',
    'links.viewAll': '查看全部',
    'links.apply.title': '申请交换链接',
    'links.apply.requirements': '申请须知',
    'links.apply.siteInfo': '站点信息',
    'links.apply.siteName': '网站名称',
    'links.apply.siteUrl': '网站地址',
    'links.apply.siteDesc': '网站描述',
    'links.totalLinks': '友链总数',
    'links.featured': '精选推荐',
    'links.friends': '好友',
    'links.sites': '网站',
    
    // Archives page detailed
    'archives.totalWords': '总字数',
    'archives.avgWords': '平均字数',
    'archives.latestUpdate': '最近更新',
    'archives.publishedThisYear': '今年发布',
    'archives.runningDays': '运行天数',
    'archives.hotTags': '热门标签',
    'archives.series': '系列专栏',
    'archives.viewAllTags': '查看全部',
    'archives.viewAllSeries': '查看全部',
    'archives.exploreMore': '探索更多',
    'archives.timeline': '时间轴',
    'archives.timeline.desc': '按时间顺序浏览所有文章',
    'archives.blogList': '博客列表',
    'archives.blogList.desc': '查看最新发布的文章',
    'archives.postsCount': '篇文章',
    'archives.browseAllTags': '浏览所有 {count} 个标签',
    'archives.moreSeriesAvailable': '还有 {count} 个系列',
    'archives.viewAllSeriesLink': '查看全部系列',
    'archives.hint.clickTag': '点击标签查看相关文章，或',
    'archives.hint.browseAllTags': '浏览所有标签',
    'archives.hint.moreSeries': '还有更多系列，',
    'archives.hint.viewAllSeries': '查看全部系列',
  },
} as const;

export function useTranslation(lang: Language = defaultLang) {
  return function t(key: keyof typeof translations['en']) {
    return translations[lang][key] || translations[defaultLang][key] || key;
  };
}
