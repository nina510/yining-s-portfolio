// 将 scrollToVideo 函数定义在全局作用域
function scrollToVideo() {
    const videoContainer = document.querySelector('.video-container');
    if (videoContainer) {
        const headerOffset = 100;
        const elementPosition = videoContainer.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const floatingNav = document.querySelector('.floating-nav');
    const sections = document.querySelectorAll('.content-block[id]');
    const navLinks = document.querySelectorAll('.floating-nav-link');
    const headerOffset = 100;  // 设置偏移量，确保标题不被顶部导航栏遮挡
    
    // 拖拽相关变量
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;

    // 监听滚动事件，高亮当前部分
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // 添加平滑滚动效果
    document.querySelectorAll('.floating-nav-link, .insight-link, .back-to-insight').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').slice(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 拖拽功能
    function dragStart(e) {
        if (e.type === "touchstart") {
            initialX = e.touches[0].clientX - xOffset;
            initialY = e.touches[0].clientY - yOffset;
        } else {
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;
        }
        
        if (e.target.closest('.floating-nav')) {
            isDragging = true;
        }
    }

    function dragEnd() {
        initialX = currentX;
        initialY = currentY;
        isDragging = false;
    }

    function drag(e) {
        if (isDragging) {
            e.preventDefault();
            
            if (e.type === "touchmove") {
                currentX = e.touches[0].clientX - initialX;
                currentY = e.touches[0].clientY - initialY;
            } else {
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
            }

            xOffset = currentX;
            yOffset = currentY;
            
            setTranslate(currentX, currentY, floatingNav);
        }
    }

    function setTranslate(xPos, yPos, el) {
        el.style.transform = `translate(${xPos}px, ${yPos}px)`;
    }

    // 添加事件监听器
    floatingNav.addEventListener('mousedown', dragStart, false);
    document.addEventListener('mousemove', drag, false);
    document.addEventListener('mouseup', dragEnd, false);

    // 触摸事件支持
    floatingNav.addEventListener('touchstart', dragStart, false);
    document.addEventListener('touchmove', drag, false);
    document.addEventListener('touchend', dragEnd, false);

    // 防止链接点击触发拖拽
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (isDragging) {
                e.preventDefault();
            }
        });
    });

    // 图片点击放大功能
    const modal = document.querySelector('.image-modal');
    const modalImg = document.getElementById('modal-image');
    const closeBtn = document.querySelector('.close-modal');
    
    // 获取所有可点击的图片
    const images = document.querySelectorAll('.hero-image, .content-image, .design-image, .full-width-image, .interview-image, .solution-image, .insight-detail-image, .touchpoint-image, .scenario-image, .solve-image, .solve-additional-image, .research-image, .training-image, .product-image, .development-image, .final-image');
    
    // 为每个图片添加点击事件
    images.forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = 'block';
            modalImg.src = this.src;
            document.body.style.overflow = 'hidden'; // 防止背景滚动
        });
    });
    
    // 点击关闭按钮或模态框背景关闭图片
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // 恢复滚动
    }
    
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // ESC 键关闭模态框
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
}); 