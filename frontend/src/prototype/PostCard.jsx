import React, { useState } from 'react';
import { api } from './api';
import { Avatar, Icon, timeAgo } from './ui';
export default function PostCard({ post, user, onSignIn, onUpdate, onRemove, onReport, onActivity }) {
  const [open, setOpen] = useState(false);
  const [replies, setReplies] = useState([]);
  const [reply, setReply] = useState('');
  const [loadingReplies, setLoadingReplies] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState('');
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(post.content);
  async function action(name, work) {
    if (!user) return onSignIn();
    if (busy) return;
    setBusy(name); setError('');
    try { await work(); onActivity(); }
    catch (err) { setError(err.message); if (err.status === 401) onSignIn(); }
    finally { setBusy(''); }
  }
  async function loadReplies() {
    setLoadingReplies(true); setError('');
    try { setReplies(await api(`/comments/${post.id}`)); }
    catch (err) { setError(err.message); }
    finally { setLoadingReplies(false); }
  }
  return <article className="post-card card">
    <header className="post-header"><Avatar number={post.user.avatar} /><div className="post-meta"><strong>{post.user.username}{post.isOwner && <span className="you-tag">you</span>}</strong><time dateTime={post.time}>{timeAgo(post.time)}</time></div><span className={'topic-tag topic-' + post.topic.toLowerCase().split(' ')[0]}>{post.topic}</span></header>
    {editing ? <form className="edit-form" onSubmit={e => { e.preventDefault(); action('edit', async () => { await api(`/post/edit/${post.id}`, { method: 'PUT', body: { content: draft } }); onUpdate({ ...post, content: draft.trim() }); setEditing(false); }); }}><label className="sr-only" htmlFor={'edit-' + post.id}>Edit your thought</label><textarea autoFocus id={'edit-' + post.id} value={draft} onChange={e => setDraft(e.target.value)} maxLength={1200} rows={4} required /><div className="inline-actions"><button type="button" className="button secondary" onClick={() => setEditing(false)}>Cancel</button><button className="button primary" disabled={!!busy || !draft.trim()}>Save changes</button></div></form> : <p className="post-content">{post.content}</p>}
    {post.image && <img className="post-photo" src={post.image} alt="Image shared with this thought" loading="lazy" />}
    <footer className="post-footer"><div className="reaction-group">
      <button className={'reaction ' + (post.isLikedByUser ? 'liked' : '')} aria-label={(post.isLikedByUser ? 'Unlike' : 'Like') + ' thought by ' + post.user.username} aria-pressed={post.isLikedByUser} disabled={!!busy} onClick={() => action('like', async () => { const result = await api(`/${post.isLikedByUser ? 'unlike' : 'like'}/${post.id}`, { method: 'POST' }); onUpdate({ ...post, likes: result.likes, isLikedByUser: !post.isLikedByUser }); })}><Icon name="heart" size={19} fill={post.isLikedByUser ? 'currentColor' : 'none'} /><span>{post.likes}</span></button>
      <button className={'reaction ' + (open ? 'active' : '')} aria-label={'Replies to thought by ' + post.user.username} aria-expanded={open} onClick={() => { setOpen(!open); if (!open) loadReplies(); }}><Icon name="chat" size={19} /><span>{post.comments}</span><span className="reply-label">{post.comments === 1 ? 'reply' : 'replies'}</span></button>
    </div><div className="post-options">
      {post.isOwner && <><button className="icon-button" aria-label="Edit thought" title="Edit thought" onClick={() => { setDraft(post.content); setEditing(true); }}><Icon name="edit" size={17} /></button><button className="icon-button" aria-label="Delete thought" title="Delete thought" disabled={!!busy} onClick={() => { if (window.confirm('Delete this thought and its replies?')) action('delete', async () => { await api(`/post/${post.id}`, { method: 'DELETE' }); onRemove(post.id); }); }}><Icon name="trash" size={17} /></button></>}
      {!post.isOwner && <button className="icon-button report-button" aria-label="Report thought" title="Report thought" onClick={() => user ? onReport(post) : onSignIn()}><Icon name="flag" size={16} /></button>}
      <button className={'icon-button save-button ' + (post.isSavedByUser ? 'saved' : '')} aria-label={post.isSavedByUser ? 'Unsave thought' : 'Save thought'} title={post.isSavedByUser ? 'Unsave thought' : 'Save thought'} aria-pressed={post.isSavedByUser} disabled={!!busy} onClick={() => action('save', async () => { await api(`/post/${post.isSavedByUser ? 'unsave' : 'save'}/${post.id}`, { method: post.isSavedByUser ? 'DELETE' : 'POST' }); onUpdate({ ...post, isSavedByUser: !post.isSavedByUser }); })}><Icon name="bookmark" size={19} fill={post.isSavedByUser ? 'currentColor' : 'none'} /></button>
    </div></footer>
    {open && <section className="replies" aria-label="Replies"><div aria-live="polite">{loadingReplies ? <p className="small muted">Loading replies…</p> : replies.length ? replies.map(c => <div className="reply" key={c.id}><Avatar number={c.avatar} size="tiny" /><div><strong>{c.username}{c.isOwner && <span className="you-tag">you</span>}</strong><p>{c.comment}</p></div>{c.isOwner && <button className="icon-button" aria-label="Delete reply" disabled={!!busy} onClick={() => action('delete-reply', async () => { await api(`/comments/delete/${c.id}`, { method: 'DELETE' }); setReplies(v => v.filter(r => r.id !== c.id)); onUpdate({ ...post, comments: Math.max(0, post.comments - 1) }); })}><Icon name="close" size={14} /></button>}</div>) : <p className="small muted">A little quiet here. Be the first to reply.</p>}</div>
      {user ? <form className="reply-form" onSubmit={e => { e.preventDefault(); action('reply', async () => { await api(`/comments/${post.id}`, { method: 'POST', body: { comment: reply } }); setReply(''); await loadReplies(); onUpdate({ ...post, comments: post.comments + 1 }); }); }}><label className="sr-only" htmlFor={'reply-' + post.id}>Your reply</label><input id={'reply-' + post.id} value={reply} onChange={e => setReply(e.target.value)} maxLength={500} required placeholder="Leave a little kindness…" /><button className="icon-button" disabled={!!busy || !reply.trim()} aria-label="Send reply"><Icon name="arrow" size={19} /></button></form> : <button className="text-button" onClick={onSignIn}>Join the conversation<Icon name="arrow" size={16} /></button>}
    </section>}
    {error && <p className="form-error" role="alert">{error}</p>}
  </article>;
}
