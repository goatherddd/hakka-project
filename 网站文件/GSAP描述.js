// 注册ScrollTrigger插件
gsap.registerPlugin(ScrollTrigger);

// --------------------------------------------------
// 1. 定义旋转动画函数
// --------------------------------------------------
function createRotationAnimation(element) {
    // 首先让元素可见
    gsap.set(element, { visibility: "visible", opacity: 0 });
    
    // 入场动画
    gsap.to(element, {
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        onComplete: () => {
            // 入场完成后开始旋转动画
            startRotationAnimation(element);
        }
    });
}

function startRotationAnimation(element) {
    // 创建时间线
    const tl = gsap.timeline({ repeat: -1 });
    
    // 顺时针旋转5度，持续1.5秒
    tl.to(element, {
        rotation: 5,
        duration: 1.5,
        ease: "power2.inOut"
    })
    // 逆时针旋转到-5度，持续1.5秒
    .to(element, {
        rotation: -5,
        duration: 1.5,
        ease: "power2.inOut"
    })
    // 回到0度，持续1.5秒
    .to(element, {
        rotation: 0,
        duration: 1.5,
        ease: "power2.inOut"
    });
}

// --------------------------------------------------
// 2. 定义我们的核心入场动画函数（保留原有功能）
// --------------------------------------------------
function animateFallIn(element) {
    gsap.from(element, {
        // 触发器设置
        scrollTrigger: {
            trigger: element,
            start: "top 85%", // 当元素顶部进入视口的85%位置时触发
            toggleActions: "play none none none", // 只播放一次
            // markers: true, // 调试时可以打开，显示触发器位置
        },
        
        // 动画属性
        duration: 1.5,
        xPercent: 100,      // 从右侧100%的位置开始（即元素在容器外右侧）
        yPercent: -100,     // 从上方100%的位置开始（即元素在容器外上方）
        opacity: 0,
        rotation: 15,
        scale: 0.8,
        ease: "power3.out", // 一个比较优雅的缓动效果
        onComplete: () => {
            // 入场动画完成后开始旋转动画
            startRotationAnimation(element);
        }
    });
}

// --------------------------------------------------
// 2. 序幕动画：手部动画
// --------------------------------------------------
function initPrologueAnimation() {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: "#scene-prologue",
            start: "top center",
            end: "bottom center",
            scrub: 1,
        }
    });

    // 手部浮现
    tl.to(".hand", { opacity: 1, duration: 2 })
      .to(".tea-bowl", { opacity: 1, duration: 1 }, "-=1")
      .to(".steam", { opacity: 1, duration: 1 }, "-=0.5")
      .to(".steam", { 
          y: -20, 
          opacity: 0, 
          duration: 2,
          repeat: -1,
          yoyo: true
      }, "-=0.5");
}

// --------------------------------------------------
// 3. 地图动画
// --------------------------------------------------
function initMapAnimation() {
    // 地图路线动画
    const mapTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: "#scene-one",
            start: "top center",
            end: "bottom center",
            scrub: 1,
        }
    });

    // 依次显示各个地点
    const routePoints = document.querySelectorAll('.route-point');
    routePoints.forEach((point, index) => {
        mapTimeline.from(point, {
            opacity: 0,
            scale: 0,
            duration: 0.5,
            delay: index * 0.3
        });
    });
}

// --------------------------------------------------
// 4. 族谱动画
// --------------------------------------------------
function initFamilyTreeAnimation() {
    const treeItems = document.querySelectorAll('.tree-item');
    
    treeItems.forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 80%",
            },
            opacity: 0,
            y: 50,
            duration: 1,
            delay: index * 0.2
        });
    });
}

// --------------------------------------------------
// 5. 信件展开动画
// --------------------------------------------------
function initLetterAnimation() {
    const letter = document.querySelector('#letter');
    const letterContent = letter.querySelector('.letter-content p');
    
    gsap.to(letter, {
        scrollTrigger: {
            trigger: letter,
            start: "top center",
        },
        scaleY: 1,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)",
        onComplete: () => {
            // 信件内容逐字浮现
            gsap.to(letterContent, {
                opacity: 1,
                duration: 0.5,
                stagger: 0.3
            });
        }
    });
}

// --------------------------------------------------
// 6. 铁路地图动画
// --------------------------------------------------
function initRailroadAnimation() {
    const railroadLine = document.querySelector('.railroad-line');
    const workerTombs = document.querySelectorAll('.worker-tomb');
    
    // 铁路线展开
    gsap.from(railroadLine, {
        scrollTrigger: {
            trigger: railroadLine,
            start: "top center",
        },
        scaleX: 0,
        duration: 2,
        ease: "power2.out"
    });
    
    // 墓碑依次出现
    workerTombs.forEach((tomb, index) => {
        gsap.from(tomb, {
            scrollTrigger: {
                trigger: tomb,
                start: "top 80%",
            },
            opacity: 0,
            y: 30,
            duration: 1,
            delay: index * 0.3
        });
    });
}

// --------------------------------------------------
// 7. 分屏动画
// --------------------------------------------------
function initSplitScreenAnimation() {
    const leftSide = document.querySelector('#view-inside');
    const rightSide = document.querySelector('#view-outside');
    
    const splitTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: ".split-screen",
            start: "top center",
        }
    });
    
    splitTimeline.from(leftSide, { xPercent: -100, duration: 1.5 })
                 .from(rightSide, { xPercent: 100, duration: 1.5 }, "<");
}

// --------------------------------------------------
// 8. 现代城市动画
// --------------------------------------------------
function initModernCityAnimation() {
    const elderlyCouple = document.querySelector('.elderly-couple');
    const skyscrapers = document.querySelector('.skyscrapers');
    
    gsap.from(elderlyCouple, {
        scrollTrigger: {
            trigger: elderlyCouple,
            start: "top center",
        },
        x: -100,
        opacity: 0,
        duration: 2
    });
    
    gsap.from(skyscrapers, {
        scrollTrigger: {
            trigger: skyscrapers,
            start: "top center",
        },
        y: 100,
        opacity: 0,
        duration: 2
    });
}

// --------------------------------------------------
// 9. 上传区域动画
// --------------------------------------------------
function initUploadAnimation() {
    const uploadElements = document.querySelectorAll('.upload-section input, .upload-section textarea, .upload-section button');
    
    uploadElements.forEach((element, index) => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: "top 80%",
            },
            opacity: 0,
            y: 30,
            duration: 1,
            delay: index * 0.2
        });
    });
}

// --------------------------------------------------
// 10. 遍历所有需要应用动画的元素
// --------------------------------------------------
const animatedElements = document.querySelectorAll('[data-anim="fall-in"]');

animatedElements.forEach(el => {
    animateFallIn(el);
});

// --------------------------------------------------
// 13. 为所有文字元素添加旋转动画
// --------------------------------------------------
function initTextRotationAnimations() {
    // 获取所有文字元素
    const textElements = document.querySelectorAll('.narrator, .subtitle');
    
    textElements.forEach((element, index) => {
        // 设置初始状态
        gsap.set(element, { 
            visibility: "visible", 
            opacity: 0,
            rotation: 0,
            transformOrigin: "center center"
        });
        
        // 创建滚动触发器
        ScrollTrigger.create({
            trigger: element,
            start: "top 80%",
            onEnter: () => {
                // 入场动画
                gsap.to(element, {
                    opacity: 1,
                    duration: 1,
                    ease: "power2.out",
                    onComplete: () => {
                        // 开始旋转动画
                        startRotationAnimation(element);
                    }
                });
            }
        });
    });
}

// --------------------------------------------------
// 11. 初始化所有特殊动画
// --------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
    initPrologueAnimation();
    initMapAnimation();
    initFamilyTreeAnimation();
    initLetterAnimation();
    initRailroadAnimation();
    initSplitScreenAnimation();
    initModernCityAnimation();
    initUploadAnimation();
    initTextRotationAnimations(); // 添加文字旋转动画
    
    // 添加交互功能
    addInteractivity();
});

// --------------------------------------------------
// 12. 添加交互功能
// --------------------------------------------------
function addInteractivity() {
    // 地图点击事件
    const routePoints = document.querySelectorAll('.route-point');
    routePoints.forEach(point => {
        point.addEventListener('click', function() {
            const location = this.getAttribute('data-location');
            alert(`点击了${location}，这里可以显示详细的历史背景信息。`);
        });
    });
    
    // 墓碑点击事件
    const workerTombs = document.querySelectorAll('.worker-tomb');
    workerTombs.forEach(tomb => {
        tomb.addEventListener('click', function() {
            const worker = this.getAttribute('data-worker');
            alert(`华工：${worker}\n工种：铁路工人\n状态：已故\n埋葬地点：铁轨下`);
        });
    });
    
    // 提交故事按钮
    const submitButton = document.querySelector('#submit-story');
    if (submitButton) {
        submitButton.addEventListener('click', function() {
            const storyText = document.querySelector('#story-text').value;
            if (storyText.trim()) {
                alert('感谢您分享客家故事！您的故事将被保存。');
            } else {
                alert('请先写下您的故事。');
            }
        });
    }
}

