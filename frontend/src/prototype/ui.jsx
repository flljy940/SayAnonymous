import React, { useEffect, useRef } from 'react';
import one from '../assets/profilePics/profile1.png';
import two from '../assets/profilePics/profile2.png';
import three from '../assets/profilePics/profile3.png';
import four from '../assets/profilePics/profile4.png';
import five from '../assets/profilePics/profile5.png';
import six from '../assets/profilePics/profile6.png';
export const avatars = [one, two, three, four, five, six];
const paths = {
  home: 'M3 10 12 3l9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z',
  heart: 'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z',
  bookmark: 'M6 3h12v18l-6-4-6 4z',
  chat: 'M21 11.5a8.5 8.5 0 0 1-8.5 8.5H5l-3 2 1.5-6A8.5 8.5 0 1 1 21 11.5z',
  bell: 'M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4',
  user: 'M20 21v-2a7 7 0 0 0-14 0v2M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0',
  search: 'M21 21l-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0',
  plus: 'M12 5v14M5 12h14',
  arrow: 'M5 12h14m-6-6 6 6-6 6',
  logout: 'M9 4H4v16h5M10 12h11m-4-4 4 4-4 4',
  image: 'M3 3h18v18H3zM3 16l6-6 8 11m-3-5 3-3 4 4M17 7h.01',
  close: 'm6 6 12 12M6 18 18 6',
  shield: 'M12 3 3 7v6c0 5 9 9 9 9s9-4 9-9V7zM8 12l3 3 5-6',
  spark: 'm12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3z',
  edit: 'm15 4 5 5M4 20l5-1L21 7l-5-5L4 14z',
  trash: 'M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7m4-7v7',
  flag: 'M4 22V3c5-4 10 4 16 0v11c-6 4-11-4-16 0',
  check: 'm5 12 4 4L19 6',
};
export function Icon({ name, size = 20, ...props }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><path d={paths[name] || paths.chat} /></svg>;
}
export function Avatar({ number = 1, size = '', name = '' }) {
  return <span className={'avatar ' + size}><img src={avatars[(Number(number) - 1 + 6) % 6] || avatars[0]} alt={name ? name + ' avatar' : ''} /></span>;
}
export function Logo() {
  return <div className="brand"><span className="brand-mark"><Icon name="chat" size={24} /><span>··</span></span><span>Say<span>Anonymous</span><small>a little space to be you</small></span></div>;
}
export function Dialog({ title, onClose, children }) {
  const ref = useRef(null);
  useEffect(() => { ref.current.showModal(); }, []);
  return <dialog ref={ref} className="dialog" onCancel={onClose} onClick={e => { if (e.target === ref.current) { const r = e.target.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) onClose(); } }} aria-labelledby="dialog-title">
    <div className="dialog-heading"><h2 id="dialog-title">{title}</h2><button className="icon-button" onClick={onClose} aria-label="Close dialog"><Icon name="close" /></button></div>{children}
  </dialog>;
}
export function timeAgo(value) {
  const seconds = Math.max(0, (Date.now() - new Date(value).getTime()) / 1000);
  if (seconds < 60) return 'just now';
  if (seconds < 3600) return Math.floor(seconds / 60) + 'm ago';
  if (seconds < 86400) return Math.floor(seconds / 3600) + 'h ago';
  return Math.floor(seconds / 86400) + 'd ago';
}
