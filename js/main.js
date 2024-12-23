const projects = {
    'ux-ui': [
        {
            title: `DIANDIAN: Mobile Charging System`,
            description: `High-speed & intelligent charging solution. 
                        <div class="project-tags">
                            <button class="tag-button">UX/UI</button>
                            <button class="tag-button">Mobility</button>
                            <button class="tag-button">Service</button>
                        </div>`,
            image: "assets/diandian-cover.png",
            link: "projects/diandian.html"
        },
        ...Array(5).fill().map((_, i) => ({
            title: `UX/UI Project ${i + 2}`,
            description: "Placeholder description for UX/UI project.",
            image: "https://via.placeholder.com/400x300"
        }))
    ],
    'product': Array(6).fill().map((_, i) => ({
        title: `Product Project ${i + 1}`,
        description: "Placeholder description for Product project.",
        image: "https://via.placeholder.com/400x300"
    })),
    'transportation': Array(6).fill().map((_, i) => ({
        title: `Transportation Project ${i + 1}`,
        description: "Placeholder description for Transportation project.",
        image: "https://via.placeholder.com/400x300"
    })),
    'service': Array(6).fill().map((_, i) => ({
        title: `Service Project ${i + 1}`,
        description: "Placeholder description for Service project.",
        image: "https://via.placeholder.com/400x300"
    })),
    'game': Array(6).fill().map((_, i) => ({
        title: `Game Project ${i + 1}`,
        description: "Placeholder description for Game project.",
        image: "https://via.placeholder.com/400x300"
    }))
};

function loadProjects(category = 'all') {
    const grid = document.querySelector('.about-grid');
    grid.innerHTML = '';
    let projectsToShow = category === 'all' ? Object.values(projects).flat() : projects[category] || [];
    projectsToShow.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        
        if (project.link) {
            projectCard.style.cursor = 'pointer';
            projectCard.addEventListener('click', () => {
                window.location.href = project.link;
            });
        }
        
        projectCard.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
            </div>
        `;
        grid.appendChild(projectCard);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadProjects('all');
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            loadProjects(button.dataset.category);
        });
    });
    initializeImageZoom();
});

function scrollToTabs() {
    const tabsSection = document.querySelector('.tabs');
    if (tabsSection) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const offset = headerHeight + 20;
        
        const elementPosition = tabsSection.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// 图片点击放大功能
function initializeImageZoom() {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.getElementsByClassName('modal-close')[0];
    
    // 获取所有可放大的图片
    const zoomableImages = document.querySelectorAll('.touchpoint-image');
    
    if (!modal || !modalImg || !closeBtn || zoomableImages.length === 0) {
        console.log('Missing required elements for image zoom');
        return;
    }

    // 为每个图片添加点击事件
    zoomableImages.forEach(img => {
        img.addEventListener('click', function() {
            console.log('Image clicked');  // 调试用
            modal.style.display = 'block';
            modalImg.src = this.src;
            document.body.style.overflow = 'hidden';
        });
    });
    
    // 点击关闭按钮关闭模态框
    closeBtn.addEventListener('click', closeModal);
    
    // 点击模态框背景关闭模态框
    modal.addEventListener('click', function(e) {
        if (e.target === modal || e.target === modalImg) {
            closeModal();
        }
    });
    
    // 按ESC键关闭模态框
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// 确保在 DOM 加载完成后初始化
document.addEventListener('DOMContentLoaded', initializeImageZoom);

// 修改 banner 点击事件
document.addEventListener('DOMContentLoaded', function() {
    const banner = document.querySelector('.view-work-banner');
    const hiddenContent = document.querySelector('.hidden-content');
    
    if (banner && hiddenContent) {
        banner.addEventListener('click', function() {
            hiddenContent.style.display = 'block';  // 显示隐藏内容
            banner.style.display = 'none';  // 隐藏 banner
            
            // 平滑滚动到内容顶部
            hiddenContent.scrollIntoView({ behavior: 'smooth' });
        });
    }
});