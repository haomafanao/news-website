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
let newsData = [];

// 当前分类
let currentCategory = 'all';

// 渲染新闻项
function renderNewsItem(news) {
    return `
        <div class="news-item" onclick="window.open('${news.link}', '_blank')">
            <img src="${news.image}" alt="${news.title}" onerror="this.onerror=null; this.src='${defaultImage}';">
            <div class="news-content">
                <h3>${news.title}</h3>
                <p>${news.description}</p>
                <div class="news-meta">
                    <span>${news.source}</span>
                    <span>${news.time}</span>
                </div>
            </div>
        </div>
    `;
}

// 加载新闻数据
function loadNews() {
    showLoading();
    const newsGrid = document.getElementById('newsGrid');

    // 根据当前分类筛选新闻
    const filteredNews = currentCategory === 'all' 
        ? newsData 
        : newsData.filter(news => news.category === currentCategory);

    // 渲染新闻
    newsGrid.innerHTML = filteredNews.map(renderNewsItem).join('');

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
        const newsGrid = document.getElementById('newsGrid');
        
        const filteredNews = newsData.filter(news => 
            news.title.toLowerCase().includes(searchTerm) ||
            news.description.toLowerCase().includes(searchTerm)
        );

        if (filteredNews.length > 0) {
            newsGrid.innerHTML = filteredNews.map(renderNewsItem).join('');
        } else {
            newsGrid.innerHTML = '<p>未找到相关新闻</p>';
        }
    }

    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

// 获取新闻数据
async function fetchNews() {
    showLoading();
    try {
        // 调用新闻API获取数据
        const response = await fetch(`${newsApiUrl}?apikey=${newsApiKey}&language=zh&country=cn&size=20`);
        if (!response.ok) {
            throw new Error('获取新闻失败');
        }
        
        const data = await response.json();
        
        // 处理API返回的数据
        newsData = (data.results || []).map((article, index) => ({
            id: index + 1,
            title: article.title,
            description: article.description || '暂无描述',
            image: article.image_url || defaultImage,
            source: article.source_name || '未知来源',
            time: new Date(article.pubDate).toLocaleString('zh-CN'),
            category: article.category?.[0] === 'world' ? 'international' : 'domestic',
            link: article.link
        }));

        // 重新渲染页面
        loadNews();
        
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

// 修改页面加载完成后的执行函数
document.addEventListener('DOMContentLoaded', () => {
    // 首次加载时获取新闻
    fetchNews();
    setupSearch();
    setupCategoryToggle();
    setupRefresh();
    
    // 每隔 3 分钟自动刷新新闻
    setInterval(fetchNews, 3 * 60 * 1000);
}); 