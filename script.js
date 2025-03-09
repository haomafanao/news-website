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

// 存储新闻数据的变量
let newsData = {
    breaking: [],
    hot: [],
    latest: []
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
            ? newsData.hot 
            : newsData.hot.filter(news => news.category === currentCategory),
        latest: currentCategory === 'all'
            ? newsData.latest
            : newsData.latest.filter(news => news.category === currentCategory)
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

// 显示新闻详情模态框
function showModal(news) {
    const modal = document.getElementById('newsModal');
    const modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = renderNewsDetail(news);
    modal.style.display = 'block';
}

// 隐藏新闻详情模态框
function hideModal() {
    const modal = document.getElementById('newsModal');
    modal.style.display = 'none';
}

// 设置新闻详情模态框
function setupModal() {
    const modal = document.getElementById('newsModal');
    const closeButton = document.querySelector('.close-button');

    // 点击新闻卡片或列表项时显示详情
    document.addEventListener('click', (e) => {
        const newsCard = e.target.closest('.news-card, .news-item');
        if (newsCard) {
            const newsId = parseInt(newsCard.dataset.id);
            const allNews = [...newsData.hot, ...newsData.latest];
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
        const allNews = [...newsData.hot, ...newsData.latest];
        
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
    const breakingNews = newsData.breaking;
    
    if (!breakingNews.length) return;
    
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
    
    if (!newsData.breaking.length) return;

    // 自动播放
    function startAutoPlay() {
        breakingNewsInterval = setInterval(() => {
            currentBreakingIndex = (currentBreakingIndex + 1) % newsData.breaking.length;
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
            const news = newsData.breaking.find(n => n.id === newsId);
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
        // 调用新闻API获取数据
        const response = await fetch(`${newsApiUrl}?apikey=${newsApiKey}&language=zh&country=cn`);
        if (!response.ok) {
            throw new Error('获取新闻失败');
        }
        
        const data = await response.json();
        
        // 处理API返回的数据
        const articles = data.results || [];
        
        // 将新闻分类
        newsData = {
            breaking: articles.slice(0, 5).map((article, index) => ({
                id: `b${index + 1}`,
                title: article.title,
                time: new Date(article.pubDate).toLocaleTimeString('zh-CN', {hour: '2-digit', minute: '2-digit'}),
                source: article.source_name || '未知来源',
                category: article.category?.[0] || 'general'
            })),
            hot: articles.slice(5, 8).map((article, index) => ({
                id: index + 1,
                title: article.title,
                description: article.description || '暂无描述',
                content: article.content || '暂无内容',
                image: article.image_url || defaultImage,
                source: article.source_name || '未知来源',
                time: new Date(article.pubDate).toLocaleString('zh-CN'),
                category: article.category?.[0] || 'general'
            })),
            latest: articles.slice(8, 10).map((article, index) => ({
                id: index + 4,
                title: article.title,
                description: article.description || '暂无描述',
                content: article.content || '暂无内容',
                image: article.image_url || defaultImage,
                source: article.source_name || '未知来源',
                time: new Date(article.pubDate).toLocaleString('zh-CN'),
                category: article.category?.[0] || 'general'
            }))
        };

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