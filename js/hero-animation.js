class HeroAnimation {
    constructor() {
        // 获取所有需要动画的元素
        this.nameElement = document.querySelector('.hero .name-line .name');  // 修改选择器
        this.contentElements = document.querySelectorAll('.hero .content-line span');  // 保持不变
        this.interests = document.querySelector('.hero .interests');  // 保持不变
        this.button = document.querySelector('.hero .view-work-button');  // 保持不变

        // 确保所有元素初始状态为不可见
        this.initElements();
        // 开始动画序列
        this.startAnimation();
    }

    initElements() {
        // 设置所有元素的初始状态为不可见
        const elements = [this.nameElement, ...this.contentElements, this.interests, this.button];
        elements.forEach(el => {
            if (el) {
                // 设置初始状态
                el.style.cssText = `
                    opacity: 0;
                    transform: translateY(20px);
                    transition: all 0.8s ease;
                    visibility: visible;  // 确保元素可见但透明
                `;
            }
        });
    }

    async startAnimation() {
        // 等待一小段时间再开始动画
        await this.wait(500);

        // 显示 Nina
        await this.animateElement(this.nameElement);

        // 逐个显示内容行的单词
        for (const element of this.contentElements) {
            await this.animateElement(element);
            await this.wait(100);  // 每个单词之间的间隔
        }

        // 显示兴趣描述
        await this.wait(200);  // 稍长的间隔
        await this.animateElement(this.interests);

        // 显示按钮
        await this.wait(200);
        await this.animateElement(this.button);
    }

    animateElement(element) {
        return new Promise(resolve => {
            if (!element) {
                resolve();
                return;
            }

            // 设置过渡后的状态
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';

            // 等待动画完成
            element.addEventListener('transitionend', () => resolve(), { once: true });
        });
    }

    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// 在页面加载完成后初始化动画
document.addEventListener('DOMContentLoaded', () => {
    // 检查是否存在 intro-animation
    const introAnimation = document.getElementById('intro-animation');
    if (!introAnimation || introAnimation.style.display === 'none') {
        // 如果不存在 intro-animation 或已经隐藏，直接初始化
        new HeroAnimation();
    }
}); 