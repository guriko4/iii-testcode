import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {

  // .stage をすべて取得
  const stages = document.querySelectorAll('.stage');
  if (!stages.length) return;

  stages.forEach((stage) => {
    // 初期セット
    gsap.set(stage, {
      scale: 0.8,
      transformOrigin: "center center",
      boxShadow: 'none'
    });

    // 各stageの case名を取得（例：case1, case2…）
    const caseName = [...stage.classList].find(cls => cls.startsWith('case'));

    // アニメ再生
    const playAnimation = () => {
      gsap.to(stage, {
        scale: 1,
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
        duration: 0.3,
        ease: 'power2.out'
      });

      switch (caseName) {
        case 'case1':
          const tl1 = gsap.timeline();

          tl1.to('#woman-arm', {
            rotation: 24,
            transformOrigin: '31% 78%',
            duration: 0.5
          })
            .to('#left-comment', {
              scale: 1,
              opacity: 1,
              duration: .4,
              ease: "back.out(2.5)"
            })
            .to('#arrow', {
              opacity: 1,
              x: 35,
              duration: 1,
              ease: "back.out(1.7)"
            })
            .to('#img-icon', {
              scale: 1,
              x: 0,
              duration: .6
            })
            .to('#right-comment', {
              scale: 1,
              opacity: 1,
              duration: .4,
              ease: "back.out(2.5)"
            })
            .to('#pc-document', {
              opacity: 1,
              duration: 1,
              ease: "power2.out"
            })
            .to('#man-arm', {
              rotation: 120,
              transformOrigin: '82.89% 73%',
            });
          break;

        case 'case2':
          // case2のアニメ追加予定
          break;
      }
    };

    // アニメ戻す
    const resetAnimation = () => {
      gsap.to(stage, {
        scale: 0.8,
        boxShadow: 'none',
        duration: 0.5,
        ease: 'power2.out'
      });

      switch (caseName) {
        case 'case1':
          const tl1Reset = gsap.timeline();
          tl1Reset.to('#woman-arm', { rotation: 0 }, 0)
            .to('#left-comment', { scale: 0, opacity: 0 }, 0)
            .to('#arrow', { opacity: 0, x: -400 }, 0)
            .to('#img-icon', { scale: 0, x: -200, duration: .6 }, 0)
            .to('#right-comment', { scale: 0, opacity: 0 }, 0)
            .to('#pc-document', { opacity: 0 }, 0)
            .to('#man-arm', { rotation: 0 }, 0);
          break;

        case 'case2':
          // case2の戻し処理
          break;
      }
    };

    // スクロールトリガーを設定！（←ここがstage1→stageになってればOK）
    ScrollTrigger.create({
      trigger: stage,
      start: "top 70%",
      end: "bottom 20%",
      onEnter: () => playAnimation(),
      onLeaveBack: () => resetAnimation()
    });
  });
});