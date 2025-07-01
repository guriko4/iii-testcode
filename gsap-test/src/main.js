import './style.scss';
import { gsap } from 'gsap';

document.querySelector('.stage').addEventListener('click', () => {
  const tl = gsap.timeline();
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
      x: -20,
      duration: 1,
      ease: "back.out(1.7)"
    })
    .to('#img-icon', {
      scale: 1,
      x: 0,
      duration: .6,
    })
});