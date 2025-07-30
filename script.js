// script.js
gsap.registerPlugin(ScrollToPlugin, ScrollTrigger, ScrollSmoother);

window.addEventListener('load', () => {
  // 初始化 smoother
  const smoother = ScrollSmoother.create({
    wrapper: 'body',
    content: 'body',
    smooth: 1.8,
    effects: true
  });

  // 标题淡入
  gsap.to("#title", { duration: 1.5, opacity: 1, y: 0, ease: "power2.out" });

  // **用 smoother 滚动到第二屏** 
  document.querySelector(".down-arrow").addEventListener("click", () => {
    smoother.scrollTo("#second", { duration: 1 });
  });

  // 滚动触发淡入
  gsap.utils.toArray(".page").forEach(sec => {
    gsap.from(sec.querySelector(".content"), {
      opacity: 0, y: 50, duration: 1, ease: "power2.out",
      scrollTrigger: { trigger: sec, start: "top 80%", end: "top 30%", toggleActions: "play none none reverse" }
    });
  });

  // 第二屏 pin + scrub
  gsap.timeline({
    scrollTrigger: { trigger: "#second", start: "top top", end: "bottom+=100 top", scrub: true, pin: true }
  })
  .from("#second .content h2", { x: -200, opacity: 0, duration: 1 })
  .from("#second .content p",  { x:  200, opacity: 0, duration: 1 }, "<0.5");
});