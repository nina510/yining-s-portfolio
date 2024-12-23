// banner 点击事件处理
document.addEventListener('DOMContentLoaded', function() {
    const banner = document.querySelector('.view-work-banner');
    const hiddenContent = document.querySelector('.hidden-content');
    
    if (banner && hiddenContent) {
        banner.addEventListener('click', function() {
            hiddenContent.style.display = 'block';
            banner.style.display = 'none';
            
            // 获取 Pre & In Charging 标题的位置
            const firstTitle = hiddenContent.querySelector('h3');
            if (firstTitle) {
                // 计算滚动位置，考虑导航栏高度
                const headerHeight = document.querySelector('.header').offsetHeight;
                const scrollPosition = firstTitle.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                // 平滑滚动到计算出的位置
                window.scrollTo({
                    top: scrollPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
}); 