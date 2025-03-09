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

// 新闻 API 配置
const newsApiKey = 'pub_32499e2b0d2b6b7c4e2c8b8c5e8c7d6b5d4c3b2a';
const newsApiUrl = 'https://newsdata.io/api/1/news';

// 默认图片（Base64编码的灰色背景图）
const defaultImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZWVlIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNHB4IiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+6K+l5pWw5o2u5Li65pWw5o2u5bGV56S6PC90ZXh0Pjwvc3ZnPg==';

// 模拟新闻数据
const mockNews = {
    all: {
        breaking: [
            {
                id: 'b1',
                title: '中美元首通话：就台湾、人工智能等议题深入交换意见',
                time: '14:30',
                source: '新华社',
                category: 'international'
            },
            {
                id: 'b2',
                title: '国内首个量子计算机操作系统发布',
                time: '14:15',
                source: '科技日报',
                category: 'tech'
            },
            {
                id: 'b3',
                title: '两会热点：GDP增长目标定在5%左右',
                time: '14:00',
                source: '经济参考报',
                category: 'domestic'
            },
            {
                id: 'b4',
                title: '欧盟通过AI法案，全球首个AI监管框架',
                time: '13:45',
                source: '路透社',
                category: 'international'
            },
            {
                id: 'b5',
                title: '央行行长：继续实施稳健的货币政策',
                time: '13:30',
                source: '金融时报',
                category: 'finance'
            }
        ],
        hot: [
            {
                id: 1,
                title: '2024年政府工作报告解读：经济发展新动能',
                description: '政府工作报告提出多项重要经济发展目标和政策措施',
                content: '2024年政府工作报告强调，要着力扩大内需，持续深化改革开放，加快建设现代化产业体系。报告提出，今年国内生产总值预期增长5%左右，城镇新增就业1200万人以上。同时，将继续实施积极的财政政策和稳健的货币政策，促进经济持续健康发展。',
                image: defaultImage,
                source: '人民日报',
                time: '2024-03-09 14:30',
                category: 'domestic'
            },
            {
                id: 2,
                title: '量子通信取得重大突破：首次实现千公里级量子纠缠',
                description: '我国科学家在量子通信领域取得重大突破，为构建量子互联网奠定基础',
                content: '中国科学技术大学研究团队成功实现了千公里级的量子纠缠分发，这一突破为未来构建广域量子互联网奠定了重要基础。该成果发表在国际顶级期刊《自然》上，引起国际学术界广泛关注。',
                image: defaultImage,
                source: '科技日报',
                time: '2024-03-09 14:15',
                category: 'tech'
            },
            {
                id: 3,
                title: '全球气候变化应对：196个国家签署新气候协议',
                description: '联合国气候大会达成历史性协议，承诺2050年前实现碳中和',
                content: '在最新一轮联合国气候大会上，196个国家签署了具有里程碑意义的新气候协议。协议要求各国在2050年前实现碳中和，并设立了1000亿美元的气候基金，支持发展中国家应对气候变化。',
                image: defaultImage,
                source: '环球时报',
                time: '2024-03-09 14:00',
                category: 'international'
            }
        ],
        latest: [
            {
                id: 4,
                title: '数字人民币试点范围进一步扩大',
                description: '央行宣布数字人民币试点将扩展至更多城市，应用场景不断丰富',
                content: '中国人民银行宣布，数字人民币试点范围将进一步扩大，新增10个试点城市。同时，数字人民币的应用场景也将从零售支付扩展到政务服务、公共缴费等更多领域。这标志着数字人民币的发展进入新阶段。',
                image: defaultImage,
                source: '金融时报',
                time: '2024-03-09 13:45',
                category: 'finance'
            },
            {
                id: 5,
                title: '新一代人工智能大模型发布，性能提升显著',
                description: '国内科技公司发布新一代AI大模型，在多个领域超越国际先进水平',
                content: '国内领先科技公司今日发布新一代人工智能大模型，在自然语言处理、图像识别等多个领域的性能显著提升，部分指标超越国际先进水平。该模型已开始在医疗、教育、金融等领域进行应用。',
                image: defaultImage,
                source: '中国日报',
                time: '2024-03-09 13:30',
                category: 'tech'
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
        // 调用 API 获取新闻
        fetchNews().finally(() => {
            setTimeout(() => {
                refreshButton.querySelector('i').classList.remove('fa-spin');
            }, 1000);
        });
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

// 获取新闻数据
async function fetchNews() {
    showLoading();
    try {
        // 模拟API延迟
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // 更新时间戳
        const now = new Date();
        mockNews.all.breaking.forEach(news => {
            news.time = now.toLocaleTimeString('zh-CN', {hour: '2-digit', minute: '2-digit'});
        });
        mockNews.all.hot.forEach(news => {
            news.time = now.toLocaleString('zh-CN');
        });
        mockNews.all.latest.forEach(news => {
            news.time = now.toLocaleString('zh-CN');
        });

        // 重新渲染页面
        loadNews();
        updateBreakingNews();
        
        // 显示成功消息
        showNotification('新闻已更新', 'success');
    } catch (error) {
        console.error('更新新闻出错:', error);
        showNotification('更新新闻失败', 'error');
    } finally {
        hideLoading();
    }
}

// 添加通知功能
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    // 3秒后自动消失
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// 添加通知样式
const style = document.createElement('style');
style.textContent = `
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 10px 20px;
    border-radius: 4px;
    color: white;
    z-index: 1000;
    animation: slideIn 0.3s ease-out;
}

.notification.success {
    background-color: #4caf50;
}

.notification.error {
    background-color: #f44336;
}

.notification.info {
    background-color: #2196f3;
}

@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}
`;
document.head.appendChild(style);

// 修改页面加载完成后的执行函数
document.addEventListener('DOMContentLoaded', () => {
    // 首次加载时获取新闻
    fetchNews();
    setupSearch();
    setupModal();
    setupViewToggle();
    setupCategoryToggle();
    setupRefresh();
    setupBreakingNews();
    
    // 每隔 3 分钟自动刷新新闻
    setInterval(fetchNews, 3 * 60 * 1000);
}); 