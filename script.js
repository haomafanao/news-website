// 新闻数据源配置
const newsSources = [
    {
        name: '新浪新闻',
        url: 'https://news.sina.com.cn/',
        api: 'https://news.sina.com.cn/api/feed/'
    },
    {
        name: '腾讯新闻',
        url: 'https://news.qq.com/',
        api: 'https://news.qq.com/api/feed/'
    },
    {
        name: '网易新闻',
        url: 'https://news.163.com/',
        api: 'https://news.163.com/api/feed/'
    }
];

// 模拟新闻数据（实际项目中应该从API获取）
const mockNews = {
    all: {
        breaking: [
            {
                id: 'b1',
                title: '央行宣布降准0.5个百分点，释放长期资金约1万亿元',
                time: '10:30',
                source: '财经网',
                category: 'finance'
            },
            {
                id: 'b2',
                title: '国务院常务会议：部署促进消费升级措施',
                time: '10:15',
                source: '新华社',
                category: 'domestic'
            },
            {
                id: 'b3',
                title: '全球股市震荡，美联储维持利率不变',
                time: '10:00',
                source: '路透社',
                category: 'finance'
            },
            {
                id: 'b4',
                title: '全国两会召开在即，代表委员陆续抵京',
                time: '09:45',
                source: '人民日报',
                category: 'domestic'
            },
            {
                id: 'b5',
                title: '新能源汽车补贴政策调整，市场反应积极',
                time: '09:30',
                source: '经济日报',
                category: 'finance'
            }
        ],
        hot: [
            {
                id: 1,
                title: '全国两会召开在即，代表委员陆续抵京',
                description: '2024年全国两会即将召开，各地代表委员已陆续抵京，准备参加这一重要会议。',
                content: '2024年全国两会即将召开，各地代表委员已陆续抵京。本次两会将聚焦经济发展、民生改善、科技创新等重大议题。代表委员们将就国家发展大计建言献策，共商国是。',
                image: 'https://picsum.photos/800/600?random=1',
                source: '新浪新闻',
                time: '2024-03-07 10:30',
                category: 'domestic'
            },
            {
                id: 2,
                title: '科技创新引领未来，人工智能发展新突破',
                description: '我国在人工智能领域取得重大突破，多项技术达到国际领先水平。',
                content: '我国在人工智能领域取得重大突破，多项技术达到国际领先水平。特别是在自然语言处理、计算机视觉等领域，我国科研人员开发的新算法和模型在国际评测中屡获佳绩。',
                image: 'https://picsum.photos/800/600?random=2',
                source: '腾讯新闻',
                time: '2024-03-07 09:15',
                category: 'tech'
            },
            {
                id: 3,
                title: '全球气候变化：各国积极应对',
                description: '世界各国采取积极措施应对气候变化，推动绿色低碳发展。',
                content: '世界各国采取积极措施应对气候变化，推动绿色低碳发展。多个国家承诺到2050年实现碳中和目标，并出台了一系列政策措施支持可再生能源发展。',
                image: 'https://picsum.photos/800/600?random=3',
                source: '网易新闻',
                time: '2024-03-07 08:45',
                category: 'international'
            }
        ],
        latest: [
            {
                id: 4,
                title: '新能源汽车市场持续增长',
                description: '2024年新能源汽车销量再创新高，市场渗透率不断提升。',
                content: '2024年新能源汽车销量再创新高，市场渗透率不断提升。随着技术进步和成本下降，新能源汽车正在成为越来越多消费者的选择。',
                image: 'https://picsum.photos/800/600?random=4',
                source: '新浪新闻',
                time: '2024-03-07 11:20',
                category: 'finance'
            },
            {
                id: 5,
                title: '体育赛事：亚洲杯精彩回顾',
                description: '亚洲杯足球赛精彩回顾，多支球队展现出色表现。',
                content: '亚洲杯足球赛精彩回顾，多支球队展现出色表现。本届赛事展现了亚洲足球的进步，多场比赛精彩纷呈，令人印象深刻。',
                image: 'https://picsum.photos/800/600?random=5',
                source: '腾讯新闻',
                time: '2024-03-07 10:55',
                category: 'sports'
            }
        ]
    }
};

// 当前视图状态
let currentView = 'grid';
let currentCategory = 'all';

// 轮播新闻相关变量
let currentBreakingIndex = 0;
let breakingNewsInterval;

// 渲染新闻卡片
function renderNewsCard(news) {
    return `
        <div class="news-card" data-id="${news.id}">
            <img src="${news.image}" alt="${news.title}">
            <div class="news-card-content">
                <h3>${news.title}</h3>
                <p>${news.description}</p>
                <div class="source">来源：${news.source} | ${news.time}</div>
            </div>
        </div>
    `;
}

// 渲染新闻列表项
function renderNewsItem(news) {
    return `
        <div class="news-item" data-id="${news.id}">
            <img src="${news.image}" alt="${news.title}">
            <div class="news-item-content">
                <h3>${news.title}</h3>
                <p>${news.description}</p>
                <div class="source">来源：${news.source} | ${news.time}</div>
            </div>
        </div>
    `;
}

// 渲染新闻详情
function renderNewsDetail(news) {
    return `
        <div class="news-detail">
            <h2>${news.title}</h2>
            <div class="news-meta">
                <span>来源：${news.source}</span>
                <span>发布时间：${news.time}</span>
            </div>
            <img src="${news.image}" alt="${news.title}" class="detail-image">
            <div class="news-content">
                <p>${news.content}</p>
            </div>
        </div>
    `;
}

// 渲染轮播新闻项
function renderBreakingNewsItem(news) {
    return `
        <div class="breaking-news-item" data-id="${news.id}">
            <span class="time">${news.time}</span>
            <span class="title">${news.title}</span>
            <span class="source">${news.source}</span>
        </div>
    `;
}

// 加载新闻数据
function loadNews() {
    showLoading();
    const hotNewsContainer = document.getElementById('hotNews');
    const latestNewsContainer = document.getElementById('latestNews');

    // 根据当前分类筛选新闻
    const filteredNews = {
        hot: currentCategory === 'all' 
            ? mockNews.all.hot 
            : mockNews.all.hot.filter(news => news.category === currentCategory),
        latest: currentCategory === 'all'
            ? mockNews.all.latest
            : mockNews.all.latest.filter(news => news.category === currentCategory)
    };

    // 根据当前视图模式渲染新闻
    if (currentView === 'grid') {
        hotNewsContainer.innerHTML = filteredNews.hot.map(renderNewsCard).join('');
    } else {
        hotNewsContainer.innerHTML = filteredNews.hot.map(renderNewsItem).join('');
    }

    latestNewsContainer.innerHTML = filteredNews.latest.map(renderNewsItem).join('');

    hideLoading();
}

// 显示加载动画
function showLoading() {
    document.getElementById('loadingSpinner').style.display = 'flex';
}

// 隐藏加载动画
function hideLoading() {
    document.getElementById('loadingSpinner').style.display = 'none';
}

// 设置新闻详情模态框
function setupModal() {
    const modal = document.getElementById('newsModal');
    const modalContent = document.getElementById('modalContent');
    const closeButton = document.querySelector('.close-button');

    function showModal(news) {
        modalContent.innerHTML = renderNewsDetail(news);
        modal.style.display = 'block';
    }

    function hideModal() {
        modal.style.display = 'none';
    }

    // 点击新闻卡片或列表项时显示详情
    document.addEventListener('click', (e) => {
        const newsCard = e.target.closest('.news-card, .news-item');
        if (newsCard) {
            const newsId = parseInt(newsCard.dataset.id);
            const allNews = [...mockNews.all.hot, ...mockNews.all.latest];
            const news = allNews.find(n => n.id === newsId);
            if (news) {
                showModal(news);
            }
        }
    });

    // 点击关闭按钮时隐藏模态框
    closeButton.addEventListener('click', hideModal);

    // 点击模态框外部时隐藏
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideModal();
        }
    });
}

// 设置视图切换
function setupViewToggle() {
    const viewToggles = document.querySelectorAll('.view-toggle');
    const hotNewsContainer = document.getElementById('hotNews');

    viewToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const view = toggle.dataset.view;
            if (view !== currentView) {
                currentView = view;
                viewToggles.forEach(t => t.classList.remove('active'));
                toggle.classList.add('active');
                loadNews();
            }
        });
    });
}

// 设置分类切换
function setupCategoryToggle() {
    const categoryLinks = document.querySelectorAll('.nav-links a');

    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = link.dataset.category;
            if (category !== currentCategory) {
                currentCategory = category;
                categoryLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                loadNews();
            }
        });
    });
}

// 设置刷新功能
function setupRefresh() {
    const refreshButton = document.querySelector('.refresh-button');
    
    refreshButton.addEventListener('click', () => {
        refreshButton.querySelector('i').classList.add('fa-spin');
        loadNews();
        setTimeout(() => {
            refreshButton.querySelector('i').classList.remove('fa-spin');
        }, 1000);
    });
}

// 搜索功能
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        const allNews = [...mockNews.all.hot, ...mockNews.all.latest];
        
        const filteredNews = allNews.filter(news => 
            news.title.toLowerCase().includes(searchTerm) ||
            news.description.toLowerCase().includes(searchTerm)
        );

        const hotNewsContainer = document.getElementById('hotNews');
        const latestNewsContainer = document.getElementById('latestNews');

        if (filteredNews.length > 0) {
            if (currentView === 'grid') {
                hotNewsContainer.innerHTML = filteredNews.map(renderNewsCard).join('');
            } else {
                hotNewsContainer.innerHTML = filteredNews.map(renderNewsItem).join('');
            }
            latestNewsContainer.innerHTML = '';
        } else {
            hotNewsContainer.innerHTML = '<p>未找到相关新闻</p>';
            latestNewsContainer.innerHTML = '';
        }
    }

    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

// 更新轮播新闻显示
function updateBreakingNews() {
    const breakingNewsList = document.getElementById('breakingNewsList');
    const breakingNews = mockNews.all.breaking;
    
    // 清空现有内容
    breakingNewsList.innerHTML = '';
    
    // 创建所有新闻项
    breakingNews.forEach((news, index) => {
        const newsElement = document.createElement('div');
        newsElement.className = 'breaking-news-item';
        newsElement.dataset.id = news.id;
        newsElement.innerHTML = `
            <span class="time">${news.time}</span>
            <span class="title">${news.title}</span>
            <span class="source">${news.source}</span>
        `;
        
        // 设置初始位置
        newsElement.style.top = `${index * 40}px`;
        breakingNewsList.appendChild(newsElement);
        
        // 延迟添加 active 类，实现动画效果
        setTimeout(() => {
            newsElement.classList.add('active');
        }, 50);
    });
}

// 设置轮播新闻自动播放
function setupBreakingNews() {
    const breakingNewsList = document.getElementById('breakingNewsList');
    const breakingNews = mockNews.all.breaking;

    // 自动播放
    function startAutoPlay() {
        breakingNewsInterval = setInterval(() => {
            currentBreakingIndex = (currentBreakingIndex + 1) % breakingNews.length;
            updateBreakingNews();
        }, 3000); // 每3秒切换一次
    }

    // 停止自动播放
    function stopAutoPlay() {
        clearInterval(breakingNewsInterval);
    }

    // 鼠标悬停时暂停自动播放
    breakingNewsList.addEventListener('mouseenter', stopAutoPlay);
    breakingNewsList.addEventListener('mouseleave', startAutoPlay);

    // 点击新闻项显示详情
    breakingNewsList.addEventListener('click', (e) => {
        const newsItem = e.target.closest('.breaking-news-item');
        if (newsItem) {
            const newsId = newsItem.dataset.id;
            const news = breakingNews.find(n => n.id === newsId);
            if (news) {
                showModal(news);
            }
        }
    });

    // 初始化显示
    updateBreakingNews();
    startAutoPlay();
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    loadNews();
    setupSearch();
    setupModal();
    setupViewToggle();
    setupCategoryToggle();
    setupRefresh();
    setupBreakingNews();
}); 