// 新闻 API 配置
const newsApis = {
    newsapi: {
        key: '9f0e15b6821c4b78bf1bff31acab9171',
        url: 'https://newsapi.org/v2/top-headlines'
    },
    tianxingBulletin: {
        key: 'c049f16778a4775341688d6f06ab55d7',
        url: 'https://apis.tianapi.com/bulletin/index'
    },
    tianxingFinance: {
        key: 'c049f16778a4775341688d6f06ab55d7',
        url: 'https://apis.tianapi.com/caijing/index'
    }
};

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
        const newsPromises = [
            fetchNewsAPI(),
            fetchTianxingBulletin(),
            fetchTianxingFinance()
        ];

        const results = await Promise.allSettled(newsPromises);
        let allNews = [];

        results.forEach(result => {
            if (result.status === 'fulfilled' && result.value) {
                allNews = allNews.concat(result.value);
            }
        });

        // 对新闻进行去重和排序
        newsData = removeDuplicateNews(allNews)
            .sort((a, b) => new Date(b.time) - new Date(a.time));

        // 重新渲染页面
        loadNews();
        showNotification('新闻已更新', 'success');
    } catch (error) {
        console.error('更新新闻出错:', error);
        showNotification('部分新闻源更新失败', 'error');
    } finally {
        hideLoading();
    }
}

// 从NewsAPI获取新闻
async function fetchNewsAPI() {
    try {
        const response = await fetch(`${newsApis.newsapi.url}?country=cn&pageSize=50&apiKey=${newsApis.newsapi.key}`);
        if (!response.ok) return [];
        
        const data = await response.json();
        return (data.articles || []).map((article, index) => ({
            id: `newsapi-${index}`,
            title: article.title,
            description: article.description || '暂无描述',
            image: article.urlToImage || defaultImage,
            source: article.source.name || '未知来源',
            time: new Date(article.publishedAt).toLocaleString('zh-CN'),
            category: determineCategory(article),
            link: article.url
        }));
    } catch (error) {
        console.error('NewsAPI获取失败:', error);
        return [];
    }
}

// 从天行数据获取新闻公告
async function fetchTianxingBulletin() {
    try {
        const response = await fetch(`${newsApis.tianxingBulletin.url}?key=${newsApis.tianxingBulletin.key}&num=50`);
        if (!response.ok) return [];
        
        const data = await response.json();
        return (data.result.list || []).map((article, index) => ({
            id: `tianxing-bulletin-${index}`,
            title: article.title,
            description: article.content || '暂无描述',
            image: article.imgurl || defaultImage,
            source: article.source || '未知来源',
            time: article.pubDate,
            category: 'domestic',
            link: article.url
        }));
    } catch (error) {
        console.error('天行新闻公告获取失败:', error);
        return [];
    }
}

// 从天行数据获取财经新闻
async function fetchTianxingFinance() {
    try {
        const response = await fetch(`${newsApis.tianxingFinance.url}?key=${newsApis.tianxingFinance.key}&num=50`);
        if (!response.ok) return [];
        
        const data = await response.json();
        return (data.result.list || []).map((article, index) => ({
            id: `tianxing-finance-${index}`,
            title: article.title,
            description: article.content || '暂无描述',
            image: article.imgurl || defaultImage,
            source: article.source || '未知来源',
            time: article.pubDate,
            category: determineCategory(article),
            link: article.url
        }));
    } catch (error) {
        console.error('天行财经新闻获取失败:', error);
        return [];
    }
}

// 去除重复新闻
function removeDuplicateNews(news) {
    const seen = new Set();
    return news.filter(item => {
        const duplicate = seen.has(item.title);
        seen.add(item.title);
        return !duplicate;
    });
}

// 判断新闻分类
function determineCategory(article) {
    const keywords = {
        international: ['world', 'international', '国际', '全球', '海外'],
        domestic: ['china', 'domestic', '国内', '中国', '大陆', '内地']
    };
    
    const content = [
        article.category?.[0]?.toLowerCase() || '',
        article.title?.toLowerCase() || '',
        article.description?.toLowerCase() || ''
    ].join(' ');
    
    if (keywords.international.some(keyword => content.includes(keyword))) {
        return 'international';
    }
    
    if (keywords.domestic.some(keyword => content.includes(keyword))) {
        return 'domestic';
    }
    
    // 默认为国内新闻
    return 'domestic';
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
    
    // 每隔 15 分钟自动刷新新闻
    setInterval(fetchNews, 15 * 60 * 1000);
}); 