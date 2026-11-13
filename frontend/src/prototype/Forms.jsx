import React, { useState } from 'react';
import { api } from './api';
import { Avatar, Icon } from './ui';
export const topicNames = ['Campus life', 'Academics', 'Relationships', 'Small wins', 'Just saying'];
export function AuthForm({ onSuccess, onDemo, demoEnabled }) {
  const [mode, setMode] = useState('register');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  async function submit(e) {
    e.preventDefault(); setBusy(true); setError('');
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try { await api('/auth/' + mode, { method: 'POST', body: data }); await onSuccess(); }
    catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }
  return <>
    <p className="muted">A nickname for your thoughts. A little room to breathe.</p>
    <div className="segmented"><button onClick={() => { setMode('register'); setError(''); }} className={mode === 'register' ? 'active' : ''}>Create an account</button><button onClick={() => { setMode('login'); setError(''); }} className={mode === 'login' ? 'active' : ''}>Log in</button></div>
    <form className="stack-form" onSubmit={submit} key={mode}>
      {mode === 'register' && <label>Your public nickname<input autoFocus name="username" placeholder="e.g. MoonMochi" maxLength={24} required autoComplete="nickname" /></label>}
      <label>Email<input autoFocus={mode === 'login'} type="email" name="email" placeholder="you@example.com" required maxLength={254} autoComplete="email" /></label>
      <label>Password<input type="password" name="password" placeholder={mode === 'register' ? 'At least 8 characters' : 'Your password'} minLength={mode === 'register' ? 8 : 1} maxLength={72} required autoComplete={mode === 'register' ? 'new-password' : 'current-password'} /></label>
      <p className="small muted">Your nickname appears on posts. Your email is never displayed to other members.</p>
      {error && <p className="form-error" role="alert">{error}</p>}
      <button className="button primary wide" disabled={busy}>{busy ? 'One moment…' : mode === 'register' ? 'Find your little space' : 'Welcome back'}<Icon name="arrow" size={17} /></button>
    </form>
    {demoEnabled && <div className="demo-choice"><span>Just looking around?</span><button className="text-button" disabled={busy} onClick={async () => { setBusy(true); try { await onDemo(); } catch (err) { setError(err.message); } finally { setBusy(false); } }}>Try the demo<Icon name="arrow" size={15} /></button></div>}
  </>;
}
export function Composer({ user, onSignIn, onPublish }) {
  const [content, setContent] = useState('');
  const [topic, setTopic] = useState('Just saying');
  const [image, setImage] = useState(null);
  const [fileKey, setFileKey] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  async function submit(e) {
    e.preventDefault();
    if (!user) return onSignIn();
    if (!content.trim() || busy) return;
    setBusy(true); setError('');
    const data = new FormData(); data.append('content', content.trim()); data.append('topic', topic);
    if (image) data.append('image', image);
    try {
      await api('/post/create', { method: 'POST', body: data });
      setContent(''); setImage(null); setFileKey(k => k + 1); onPublish();
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }
  return <form className="composer card" onSubmit={submit}>
    <div className="composer-top"><Avatar number={user?.avatar || 1} />{user ? <label className="sr-only" htmlFor="thought">Your thought</label> : null}
      {user ? <textarea id="thought" maxLength={1200} rows={2} value={content} onChange={e => setContent(e.target.value)} placeholder={`What’s on your mind, ${user.username}?`} required /> : <button type="button" className="composer-prompt" onClick={onSignIn}>What’s on your mind? This is your space.</button>}
    </div>
    {image && <div className="attachment"><Icon name="image" size={16} /><span>{image.name}</span><button className="icon-button" type="button" aria-label="Remove image" onClick={() => { setImage(null); setFileKey(k => k + 1); }}><Icon name="close" size={15} /></button></div>}
    <div className="composer-bottom"><div className="composer-tools">
      <label className="attach-button" title="Add an image"><Icon name="image" size={19} /><span>Photo</span><input key={fileKey} type="file" className="sr-only" aria-label="Attach an image" accept="image/jpeg,image/png,image/webp,image/gif" disabled={!user || busy} onChange={e => { const f = e.target.files[0]; if (f && f.size > 5 * 1024 * 1024) { setError('Choose an image smaller than 5 MB.'); e.target.value = ''; } else { setError(''); setImage(f || null); } }} /></label>
      <select aria-label="Post topic" value={topic} onChange={e => setTopic(e.target.value)} disabled={!user || busy}>{topicNames.map(t => <option key={t}>{t}</option>)}</select>
    </div><div className="composer-submit">{content && <span className="character-count">{content.length}/1200</span>}<button type={user ? 'submit' : 'button'} onClick={!user ? onSignIn : undefined} className="button primary" disabled={busy || (!!user && !content.trim())}>{busy ? 'Sharing…' : 'Share a thought'}<Icon name="plus" size={16} /></button></div></div>
    {error && <p className="form-error" role="alert">{error}</p>}
  </form>;
}
export function ProfileForm({ user, stats, onSaved }) {
  const [nickname, setNickname] = useState(user.username);
  const [description, setDescription] = useState(user.description || '');
  const [avatar, setAvatar] = useState(user.avatar);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  async function submit(e) {
    e.preventDefault(); setBusy(true); setError('');
    try { const result = await api('/profile', { method: 'PUT', body: { pseudonym: nickname, description, avatar } }); onSaved(result); }
    catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }
  return <div className="card profile-panel"><div className="profile-intro"><Avatar number={avatar} size="large" /><div><h2>{user.username}</h2><p className="muted">{user.isDemo ? 'Your demo identity' : 'Your corner of the community'}</p></div></div>
    <div className="profile-stats">{['posts', 'comments', 'likes'].map(key => <div key={key}><strong>{stats?.[key] ?? '—'}</strong><span>{key === 'likes' ? 'likes given' : key}</span></div>)}</div>
    <form className="stack-form" onSubmit={submit}>
      <fieldset><legend>Pick your little companion</legend><div className="avatar-picker">{[1, 2, 3, 4, 5, 6].map(n => <button key={n} type="button" aria-label={'Choose avatar ' + n} aria-pressed={n === avatar} className={avatar === n ? 'selected' : ''} onClick={() => setAvatar(n)}><Avatar number={n} /></button>)}</div></fieldset>
      <label>Public nickname<input value={nickname} onChange={e => setNickname(e.target.value)} maxLength={24} required /></label>
      <label>A little about you<textarea value={description} onChange={e => setDescription(e.target.value)} maxLength={200} rows={3} placeholder="Only what you feel comfortable sharing." /></label>
      <p className="small muted">Changing your nickname updates the name shown on your existing posts and replies.</p>
      {error && <p className="form-error" role="alert">{error}</p>}
      <button className="button primary" disabled={busy}>{busy ? 'Saving…' : 'Save profile'}<Icon name="check" size={17} /></button>
    </form></div>;
}
export function ReportForm({ post, onClose, onReported }) {
  const [reason, setReason] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  return <form className="stack-form" onSubmit={async e => {
    e.preventDefault(); setBusy(true); setError('');
    try { await api(`/post/${post.id}/report`, { method: 'POST', body: { reason } }); onReported(); onClose(); }
    catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }}><p className="muted">Help keep this space thoughtful. Your report is private.</p><label>What’s the concern?<textarea autoFocus value={reason} onChange={e => setReason(e.target.value)} maxLength={300} rows={4} required placeholder="Tell us what seems wrong…" /></label><p className="small muted">This prototype stores reports locally. There is no live moderation team or automatic removal.</p>{error && <p className="form-error" role="alert">{error}</p>}<button className="button primary" disabled={busy || !reason.trim()}>{busy ? 'Recording…' : 'Record report'}</button></form>;
}
