import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {

  // 対象のステージを読み込み
  const stage1 = document.querySelector('.stage1');
  if (!stage1) return;

  // GSAPタイムライン用グローバル変数
  let tl = null;

  // クラスstage1の挙動
  function animationStage1(forward = true) {
    // 以前のアニメが残ってるかもなので、いったん消す
    if (tl) tl.kill();
    tl = gsap.timeline({ defaults: { duration: 0.5 } });

    if (forward) {

      tl.to('#woman-arm', {
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
    } else {
      tl.to('#woman-arm', { rotation: 0 }, 0)
        .to('#left-comment', { scale: 0, opacity: 0 }, 0)
        .to('#arrow', { opacity: 0, x: -400 }, 0)
        .to('#img-icon', { scale: 0, x: -200, duration: .6 }, 0)
        .to('#right-comment', { scale: 0, opacity: 0 }, 0)
        .to('#pc-document', { opacity: 0 }, 0)
        .to('#man-arm', { rotation: 0, }, 0);
    }
  }

  // スマホまたはタブレット検出 ホバーできないand指操作のもの
  const isMobile = window.matchMedia('(hover:none) and (pointer:coarse)').matches;

  // PCならホバーで再生
  if (!isMobile) {
    stage1.addEventListener('mouseenter', () => {
      animationStage1(true);
    });
    stage1.addEventListener('mouseleave', () => {
      animationStage1(false);
    });
  }

  // モバイルはスクロール表示で一度だけ再生
  if (isMobile) {
    ScrollTrigger.create({
      trigger: stage1,
      start: "top 80%",
      once: true,
      onEnter: () => {
        animationStage1(true);
      }
    });
  }
});

// document.querySelector('.stage').addEventListener('click', () => {
//   const tl = gsap.timeline();
//   tl.to('#woman-arm', {
//     rotation: 24,
//     transformOrigin: '31% 78%',
//     duration: 0.5
//   })
//     .to('#left-comment', {
//       scale: 1,
//       opacity: 1,
//       duration: .4,
//       ease: "back.out(2.5)"
//     })
//     .to('#arrow', {
//       opacity: 1,
//       x: -20,
//       duration: 1,
//       ease: "back.out(1.7)"
//     })
//     .to('#img-icon', {
//       scale: 1,
//       x: 0,
//       duration: .6
//     })
//     .to('#right-comment', {
//       scale: 1,
//       opacity: 1,
//       duration: .4,
//       ease: "back.out(2.5)"
//     })
//     .to('#pc-document', {
//       opacity: 1,
//       duration: 1,
//       ease: "power2.out"
//     })
//     .to('#man-arm', {
//       rotation: 120,
//       transformOrigin: '82.89% 73%',
//     })
// });