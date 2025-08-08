import './style.scss';
import { gsap } from 'gsap';

gsap.to('#box', {
  x: 200,
  rotation: 360,
  duration: 2,
  ease: 'power2.inOut',
});