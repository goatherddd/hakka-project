// 滚动监听和导航功能
class HakkaCultureWebsite {
    constructor() {
        this.sections = document.querySelectorAll('.section');
        this.navDots = document.querySelectorAll('.nav-dot');
        this.currentSection = 0;
        this.isScrolling = false;
        
        this.init();
    }

    init() {
        this.setupScrollListener();
        this.setupNavigation();
        this.setupIntersectionObserver();
        this.setupMapInteractions();
        this.setupFileUpload();
        this.setupStorySubmission();
    }

    setupScrollListener() {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.updateActiveSection();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    setupNavigation() {
        this.navDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.scrollToSection(index);
            });
        });
    }

    setupIntersectionObserver() {
        const options = {
            threshold: 0.5,
            rootMargin: '-10% 0px -10% 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    this.triggerSectionAnimations(entry.target);
                }
            });
        }, options);

        this.sections.forEach(section => {
            observer.observe(section);
        });
    }

    setupMapInteractions() {
        const locationDots = document.querySelectorAll('.location-dot');
        
        locationDots.forEach(dot => {
            dot.addEventListener('click', () => {
                this.showLocationInfo(dot);
            });
        });
    }

    setupFileUpload() {
        const fileInput = document.getElementById('story-upload');
        const uploadArea = document.querySelector('.upload-area');
        
        if (fileInput) {
            fileInput.addEventListener('change', (e) => {
                this.handleFileUpload(e.target.files[0]);
            });
        }
        
        if (uploadArea) {
            uploadArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                uploadArea.style.background = 'rgba(139, 115, 85, 0.2)';
            });
            
            uploadArea.addEventListener('dragleave', () => {
                uploadArea.style.background = 'rgba(139, 115, 85, 0.05)';
            });
            
            uploadArea.addEventListener('drop', (e) => {
                e.preventDefault();
                uploadArea.style.background = 'rgba(139, 115, 85, 0.05)';
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    this.handleFileUpload(files[0]);
                }
            });
        }
    }

    setupStorySubmission() {
        const submitBtn = document.querySelector('.submit-btn');
        const textarea = document.querySelector('.story-form textarea');
        
        if (submitBtn && textarea) {
            submitBtn.addEventListener('click', () => {
                this.submitStory(textarea.value);
            });
        }
    }

    updateActiveSection() {
        const scrollPosition = window.scrollY + window.innerHeight / 2;
        
        this.sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                this.setActiveSection(index);
            }
        });
    }

    setActiveSection(index) {
        if (this.currentSection === index) return;
        
        // 移除所有活动状态
        this.navDots.forEach(dot => dot.classList.remove('active'));
        this.sections.forEach(section => section.classList.remove('active'));
        
        // 设置新的活动状态
        this.navDots[index].classList.add('active');
        this.sections[index].classList.add('active');
        
        this.currentSection = index;
    }

    scrollToSection(index) {
        if (this.isScrolling) return;
        
        this.isScrolling = true;
        const targetSection = this.sections[index];
        const targetPosition = targetSection.offsetTop;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // 防止滚动期间重复触发
        setTimeout(() => {
            this.isScrolling = false;
        }, 1000);
    }

    triggerSectionAnimations(section) {
        // 触发特定章节的动画
        const sectionId = section.id;
        
        switch(sectionId) {
            case 'first-taste':
                this.animateMigrationMap();
                break;
            case 'second-taste':
                this.animateRailroad();
                break;
            case 'third-taste':
                this.animateTulou();
                break;
            case 'fourth-taste':
                this.animateModernCity();
                break;
            case 'your-taste':
                this.animateCommunity();
                break;
        }
    }

    animateMigrationMap() {
        const routeLine = document.querySelector('.route-line');
        const locationDots = document.querySelectorAll('.location-dot');
        
        if (routeLine) {
            routeLine.style.animation = 'none';
            setTimeout(() => {
                routeLine.style.animation = 'route-draw 3s ease-in-out';
            }, 100);
        }
        
        locationDots.forEach((dot, index) => {
            setTimeout(() => {
                dot.style.animation = 'none';
                setTimeout(() => {
                    dot.style.animation = 'dot-appear 0.5s ease-in-out';
                }, 100);
            }, index * 500);
        });
    }

    animateRailroad() {
        const worker = document.querySelector('.worker-silhouette');
        if (worker) {
            worker.style.animation = 'worker-walk 2s ease-in-out';
        }
    }

    animateTulou() {
        const building = document.querySelector('.tulou-building');
        const inside = document.querySelector('.inside-scene');
        const outside = document.querySelector('.outside-scene');
        
        if (building) {
            building.style.animation = 'tulou-appear 1s ease-in-out';
        }
        
        if (inside && outside) {
            setTimeout(() => {
                inside.style.animation = 'scene-fade-in 1s ease-in-out';
                outside.style.animation = 'scene-fade-in 1s ease-in-out 0.5s';
            }, 500);
        }
    }

    animateModernCity() {
        const cityscape = document.querySelector('.cityscape');
        const couple = document.querySelector('.elderly-couple');
        
        if (cityscape) {
            cityscape.style.animation = 'city-rise 2s ease-in-out';
        }
        
        if (couple) {
            setTimeout(() => {
                couple.style.animation = 'couple-walk 1.5s ease-in-out';
            }, 1000);
        }
    }

    animateCommunity() {
        const people = document.querySelector('.people-silhouettes');
        const bubbles = document.querySelector('.story-bubbles');
        
        if (people) {
            people.style.animation = 'people-gather 1s ease-in-out';
        }
        
        if (bubbles) {
            setTimeout(() => {
                bubbles.style.animation = 'bubble-float 3s ease-in-out infinite';
            }, 500);
        }
    }

    showLocationInfo(dot) {
        const location = dot.getAttribute('data-location');
        const locationText = dot.textContent;
        
        // 创建位置信息弹窗
        const modal = document.createElement('div');
        modal.className = 'location-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${locationText}</h3>
                    <button class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <p>${this.getLocationDescription(location)}</p>
                </div>
            </div>
        `;

        // 添加样式
        const style = document.createElement('style');
        style.textContent = `
            .location-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .location-modal.show {
                opacity: 1;
            }
            
            .modal-content {
                background: white;
                border-radius: 15px;
                max-width: 500px;
                width: 90%;
                transform: scale(0.8);
                transition: transform 0.3s ease;
            }
            
            .location-modal.show .modal-content {
                transform: scale(1);
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20px;
                border-bottom: 1px solid #eee;
            }
            
            .modal-header h3 {
                color: #8b7355;
                margin: 0;
            }
            
            .close-btn {
                background: none;
                border: none;
                font-size: 2rem;
                cursor: pointer;
                color: #666;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .close-btn:hover {
                color: #8b7355;
            }
            
            .modal-body {
                padding: 20px;
            }
            
            .modal-body p {
                color: #4a4a4a;
                line-height: 1.6;
            }
        `;

        document.head.appendChild(style);
        document.body.appendChild(modal);

        // 显示模态框
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);

        // 关闭模态框
        const closeBtn = modal.querySelector('.close-btn');
        const closeModal = () => {
            modal.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        };

        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    getLocationDescription(location) {
        const descriptions = {
            'henan': '汴州，中原故土，黄河边最肥沃的地方。这里是阿飞祖辈世代居住的地方，也是客家文化的发源地。',
            'hubei': '湖北，第一次南迁的目的地。客家人在这里短暂停留，躲避战乱，寻找新的生存空间。',
            'hunan': '湖南，翻越梅岭，穿越瘴气之地。这里的自然环境恶劣，但客家人依然坚持前行。',
            'jiangxi': '江西，赣南老林，毒沼之地。客家人在这里经历了最艰难的迁徙过程。',
            'fujian': '福建，最终定居地。客家人在这里建立了围屋，开始了新的生活。'
        };
        
        return descriptions[location] || '这里是客家人迁徙路线上的重要节点。';
    }

    handleFileUpload(file) {
        if (!file) return;
        
        const uploadArea = document.querySelector('.upload-area');
        const uploadIcon = document.querySelector('.upload-icon');
        const uploadText = document.querySelector('.upload-area p');
        
        // 显示上传成功信息
        uploadIcon.textContent = '✅';
        uploadText.textContent = `已上传: ${file.name}`;
        
        // 3秒后恢复原状
        setTimeout(() => {
            uploadIcon.textContent = '📤';
            uploadText.textContent = '点击上传照片、视频或文字';
        }, 3000);
        
        // 这里可以添加实际的文件处理逻辑
        console.log('文件上传:', file.name, file.type, file.size);
    }

    submitStory(storyText) {
        if (!storyText.trim()) {
            alert('请输入您的故事内容');
            return;
        }
        
        const submitBtn = document.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        // 显示提交中状态
        submitBtn.textContent = '提交中...';
        submitBtn.disabled = true;
        
        // 模拟提交过程
        setTimeout(() => {
            submitBtn.textContent = '提交成功！';
            submitBtn.style.background = '#4CAF50';
            
            // 3秒后恢复
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '#8b7355';
                submitBtn.disabled = false;
            }, 3000);
        }, 2000);
        
        // 这里可以添加实际的提交逻辑
        console.log('故事提交:', storyText);
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    new HakkaCultureWebsite();
    
    // 添加一些额外的交互效果
    addParallaxEffect();
    addHoverEffects();
    addCustomAnimations();
});

// 视差效果
function addParallaxEffect() {
    const illustrations = document.querySelectorAll('.tea-bowl-animation, .migration-map, .railroad-illustration, .tulou-illustration, .modern-city, .community-illustration');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        illustrations.forEach((illustration, index) => {
            const rate = scrolled * -0.5;
            const yPos = -(scrolled * 0.1) + (index * 50);
            illustration.style.transform = `translateY(${yPos}px) rotate(${rate * 0.01}deg)`;
        });
    });
}

// 悬停效果
function addHoverEffects() {
    const interactiveElements = document.querySelectorAll('.story-element, .timeline-item, .inside-wall, .outside-wall');
    
    interactiveElements.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-5px)';
            item.style.boxShadow = '0 10px 25px rgba(139, 115, 85, 0.2)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
            item.style.boxShadow = '0 5px 15px rgba(139, 115, 85, 0.1)';
        });
    });
}

// 自定义动画
function addCustomAnimations() {
    // 添加CSS动画
    const style = document.createElement('style');
    style.textContent = `
        @keyframes worker-walk {
            0% { transform: translateX(-50%) translateY(0); }
            50% { transform: translateX(-50%) translateY(-10px); }
            100% { transform: translateX(-50%) translateY(0); }
        }
        
        @keyframes tulou-appear {
            0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0; }
            100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }
        
        @keyframes scene-fade-in {
            0% { opacity: 0; transform: scale(0.5); }
            100% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes city-rise {
            0% { transform: translateY(100%); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes couple-walk {
            0% { transform: translateX(-50%) translateX(-20px); }
            100% { transform: translateX(-50%) translateX(20px); }
        }
        
        @keyframes people-gather {
            0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
            100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

// 平滑滚动到顶部
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// 键盘导航支持
document.addEventListener('keydown', (e) => {
    const sections = document.querySelectorAll('.section');
    const currentSection = document.querySelector('.section.active');
    const currentIndex = Array.from(sections).indexOf(currentSection);
    
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        const nextIndex = Math.min(currentIndex + 1, sections.length - 1);
        sections[nextIndex].scrollIntoView({ behavior: 'smooth' });
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        const prevIndex = Math.max(currentIndex - 1, 0);
        sections[prevIndex].scrollIntoView({ behavior: 'smooth' });
    }
});

// 触摸设备支持
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const sections = document.querySelectorAll('.section');
    const currentSection = document.querySelector('.section.active');
    const currentIndex = Array.from(sections).indexOf(currentSection);
    
    if (touchEndY < touchStartY - 50) {
        // 向上滑动
        const nextIndex = Math.min(currentIndex + 1, sections.length - 1);
        sections[nextIndex].scrollIntoView({ behavior: 'smooth' });
    } else if (touchEndY > touchStartY + 50) {
        // 向下滑动
        const prevIndex = Math.max(currentIndex - 1, 0);
        sections[prevIndex].scrollIntoView({ behavior: 'smooth' });
    }
} 