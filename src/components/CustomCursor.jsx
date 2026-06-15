import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect touch device — hide custom cursor on mobile/touch
    const checkTouch = () => {
      const touch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
      setIsTouch(touch);
    };
    checkTouch();
  }, []);

  useEffect(() => {
    if (isTouch) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    };

    const animate = () => {
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      follower.style.left = followerX + 'px';
      follower.style.top = followerY + 'px';
      requestAnimationFrame(animate);
    };

    const addListeners = () => {
      document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', () => { cursor.classList.add('hover'); follower.classList.add('hover'); });
        el.addEventListener('mouseleave', () => { cursor.classList.remove('hover'); follower.classList.remove('hover'); });
      });
    };

    document.addEventListener('mousemove', onMouseMove);
    setTimeout(addListeners, 500);
    animate();
    return () => document.removeEventListener('mousemove', onMouseMove);
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={followerRef} className="cursor-follower" />
    </>
  );
}
