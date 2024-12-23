// 图片点击放大功能
function initializeImageZoom() {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.getElementsByClassName('modal-close')[0];
    
    // 获取所有可放大的图片
    const zoomableImages = document.querySelectorAll('.touchpoint-image, .design-image, .content-image, .full-width-image');
    
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