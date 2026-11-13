import React, { useEffect, useRef, useState } from 'react';
import { api } from './api';
import { Avatar, Dialog, Icon, Logo, timeAgo } from './ui';
import { AuthForm, Composer, ProfileForm, ReportForm } from './Forms';
import PostCard from './PostCard';
import './styles.css';
const views = { feed: ['The common room', 'A little space for whatever’s on your mind.'], saved: ['Saved thoughts', 'The words you want to come back to.'], mine: ['My thoughts', 'Your voice, in your own little corner.'], notifications: ['Little updates', 'A little love from the community.'], profile: ['Your little corner', 'Make this space feel a little more like you.'] };
const readView = () => views[location.hash.slice(1)] ? location.hash.slice(1) : 'feed';
export default function App() {
  const [view, setView] = useState(readView);
  const [user, setUser] = useState(undefined);
  const [community, setCommunity] = useState(null);
  const [posts, setPosts] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [sort, setSort] = useState('new');
  const [topic, setTopic] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [hasMore, setHasMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const feedVersion = useRef(0);
  const [refresh, setRefresh] = useState(0);
  const [activity, setActivity] = useState(0);
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState('');
  const [demoBusy, setDemoBusy] = useState(false);
  const composerRef = useRef(null);
  const reload = () => setRefresh(n => n + 1);
  const activityChanged = () => setActivity(n => n + 1);
  useEffect(() => {
    const change = () => { setView(readView()); };
    window.addEventListener('hashchange', change);
    return () => window.removeEventListener('hashchange', change);
  }, []);
  useEffect(() => {
    let alive = true;
    api('/profile').then(data => { if (alive) setUser(data); }).catch(() => { if (alive) setUser(null); });
    return () => { alive = false; };
  }, []);
  useEffect(() => {
    const controller = new AbortController();
    api('/stats/general', { signal: controller.signal }).then(setCommunity).catch(() => {});
    return () => controller.abort();
  }, [refresh, activity]);
  useEffect(() => {
    if (user === undefined) return;
    const controller = new AbortController();
    const options = { signal: controller.signal };
    feedVersion.current += 1;
    setLoading(true); setLoadError(''); setPosts([]); setHasMore(false); setLoadingMore(false);
    async function load() {
      if (view !== 'feed' && !user) { setLoading(false); return; }
      try {
        if (view === 'notifications') setNotifications(await api('/notifications', options));
        else if (view === 'profile') setStats(await api('/stats/me', options));
        else {
          const query = new URLSearchParams({ limit: '20', sort });
          if (view === 'feed') { if (topic) query.set('topic', topic); if (search) query.set('q', search); }
          const path = view === 'saved' ? '/post/posts/saved' : view === 'mine' ? '/profile/my-posts' : '/home/' + sort;
          const results = await api(path + '?' + query, options);
          setPosts(results); setHasMore(results.length === 20);
        }
      } catch (err) {
        if (err.name !== 'AbortError') { setLoadError(err.message); if (err.status === 401) setUser(null); }
      } finally { if (!controller.signal.aborted) setLoading(false); }
    }
    load();
    return () => controller.abort();
  }, [view, user?.id, user === undefined, sort, topic, search, refresh]);
  useEffect(() => { if (toast) { const t = setTimeout(() => setToast(''), 5000); return () => clearTimeout(t); } }, [toast]);
  async function loadMore() {
    if (loadingMore) return;
    const version = feedVersion.current;
    setLoadingMore(true);
    try {
      const query = new URLSearchParams({ limit: '20', offset: String(posts.length), sort });
      if (view === 'feed') { if (topic) query.set('topic', topic); if (search) query.set('q', search); }
      const path = view === 'saved' ? '/post/posts/saved' : view === 'mine' ? '/profile/my-posts' : '/home/' + sort;
      const results = await api(path + '?' + query);
      if (feedVersion.current !== version) return;
      setPosts(current => [...current, ...results.filter(p => !current.some(existing => existing.id === p.id))]);
      setHasMore(results.length === 20);
    } catch (error) { if (feedVersion.current === version) setToast(error.message); }
    finally { if (feedVersion.current === version) setLoadingMore(false); }
  }
  async function logout() {
    try { await api('/auth/logout', { method: 'POST' }); setUser(null); navigate('feed'); setToast('See you around, stranger.'); }
    catch (err) { setToast(err.message); }
  }
  function navigate(next) { location.hash = next; setView(next); }
  function signIn() { setModal({ type: 'auth' }); }
  async function signedIn() { setUser(await api('/profile')); setModal(null); reload(); }
  async function demo() {
    await api('/auth/demo', { method: 'POST' }); await signedIn();
    setToast('Welcome in. Your demo nickname is ready.');
  }
  async function startDemo() {
    setDemoBusy(true);
    try { await demo(); } catch (err) { setToast(err.message); }
    finally { setDemoBusy(false); }
  }
  function writeThought() {
    if (!user) return signIn();
    navigate('feed');
    requestAnimationFrame(() => composerRef.current?.querySelector('textarea')?.focus());
    composerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  function updatePost(changed) {
    setPosts(current => current.map(p => p.id === changed.id ? changed : p).filter(p => view !== 'saved' || p.isSavedByUser));
  }
  const protectedView = view !== 'feed' && !user;
  const [title, subtitle] = views[view];
  return <div className="app-shell">
    <a className="skip-link" href="#main-content" onClick={e => { e.preventDefault(); document.getElementById('main-content').focus(); }}>Skip to content</a>
    <aside className="sidebar">
      <a className="brand-link" href="#feed" aria-label="SayAnonymous home"><Logo /></a>
      <p className="nav-label">YOUR LITTLE SPACE</p>
      <nav aria-label="Main navigation">{[['feed', 'home', 'The common room'], ['saved', 'bookmark', 'Saved thoughts'], ['mine', 'chat', 'My thoughts'], ['notifications', 'bell', 'Notifications']].map(([key, icon, label]) => <a key={key} href={'#' + key} className={'nav-item ' + (view === key ? 'selected' : '')} aria-current={view === key ? 'page' : undefined}><Icon name={icon} size={21} /><span>{label}</span>{view === key && <span className="nav-dot" />}</a>)}</nav>
      <button className="button primary sidebar-compose" onClick={writeThought}><Icon name="plus" size={18} />Share a thought</button>
      <div className="sidebar-note"><span className="tiny-star">✳</span><p>You don’t need the perfect words.<br /><strong>Just your own.</strong></p></div>
      <div className="sidebar-bottom">{user ? <><a href="#profile" className={'identity ' + (view === 'profile' ? 'selected' : '')}><Avatar number={user.avatar} /><span><strong>{user.username}</strong><small>{user.isDemo ? 'Demo explorer' : 'Your public nickname'}</small></span><Icon name="user" size={17} /></a><button className="logout text-button" onClick={logout}><Icon name="logout" size={16} />Log out</button></> : <button className="identity sign-in-identity" onClick={signIn}><Avatar number={1} /><span><strong>Find your voice</strong><small>Join the conversation</small></span><Icon name="arrow" size={17} /></button>}<p className="sidebar-footnote">Made for conversations that matter.</p></div>
    </aside>
    <div className="workspace">
      <header className="topbar"><div className="breadcrumb"><Icon name="spark" size={17} /><span>A little space to be you</span></div><form className="search-form" role="search" onSubmit={e => { e.preventDefault(); setSearch(searchInput.trim()); navigate('feed'); }}><Icon name="search" size={18} /><label className="sr-only" htmlFor="community-search">Search thoughts</label><input id="community-search" value={searchInput} onChange={e => { setSearchInput(e.target.value); if (!e.target.value) setSearch(''); }} maxLength={100} placeholder="Find a thought…" /><button className="icon-button" aria-label="Search thoughts"><Icon name="arrow" size={16} /></button></form><span className="demo-badge"><span />Local prototype</span>{user && <a href="#profile" className="mobile-profile" aria-label="Your profile"><Avatar number={user.avatar} size="tiny" /></a>}{!user && <button className="topbar-login text-button" onClick={signIn}>Log in<Icon name="arrow" size={16} /></button>}</header>
      <main className="content-grid" id="main-content" tabIndex={-1}>
        <section className="main-column">
          {view === 'feed' && !search && <section className="hero"><div className="hero-copy"><p className="eyebrow">LESS FILTER. MORE YOU.</p><h1>Some thoughts are<br /><em>better shared.</em></h1><p className="hero-subtitle">The big feelings, small wins, and everything<br className="desktop-break" /> in between. There’s room for it all here.</p><div className="hero-community"><div className="avatar-stack">{[1, 3, 5].map(n => <Avatar number={n} size="tiny" key={n} />)}</div><span>A campus full of stories. Yours belongs here.</span></div></div><div className="hero-art" aria-hidden="true"><span className="art-spark art-spark-one">✦</span><span className="art-spark art-spark-two">✳</span><div className="art-orbit" /><div className="thought-note note-back"><span>It’s okay to be<br /><strong>a work in progress.</strong></span><span className="note-heart">♡</span></div><div className="thought-note note-front"><Avatar number={1} size="large" /><span>hey, you’re<br /><strong>not alone.</strong><span className="note-dots">···</span></span></div><span className="art-flower">✿</span><span className="art-dot" /></div></section>}
          <div className="section-heading"><div><div className="heading-kicker">{view === 'feed' ? 'MAKE YOURSELF AT HOME' : 'YOUR LITTLE SPACE'}</div><h1 className="page-title">{search && view === 'feed' ? `Thoughts about “${search}”` : title}</h1>{view !== 'feed' && <p className="muted section-subtitle">{subtitle}</p>}</div>{view === 'feed' && <span className="open-label"><span />Everyone’s welcome</span>}</div>
          {view === 'feed' && <><div ref={composerRef}><Composer user={user} onSignIn={signIn} onPublish={() => { setTopic(''); setSearch(''); setSearchInput(''); setSort('new'); reload(); setToast('Your thought has a little space now.'); }} /></div><div className="feed-controls"><div className="feed-tabs" role="group" aria-label="Sort thoughts"><button className={sort === 'new' ? 'active' : ''} aria-pressed={sort === 'new'} onClick={() => { setSort('new'); }}><Icon name="spark" size={17} />Latest</button><button className={sort === 'top' ? 'active' : ''} aria-pressed={sort === 'top'} onClick={() => { setSort('top'); }}><Icon name="heart" size={17} />Most loved</button></div><span className="feed-caption">Good company. Honest conversations.</span></div><div className="topic-chips" role="group" aria-label="Filter by topic">{['', ...(community?.topics.map(t => t.name) || ['Campus life', 'Academics', 'Relationships', 'Small wins', 'Just saying'])].map(t => <button key={t} className={topic === t ? 'active' : ''} aria-pressed={topic === t} onClick={() => { setTopic(t); }}>{t || 'All thoughts'}</button>)}</div>{search && <button className="clear-search text-button" onClick={() => { setSearch(''); setSearchInput(''); }}>Clear search<Icon name="close" size={14} /></button>}</>}
          {loading ? <div className="loading-state" role="status" aria-live="polite"><div className="skeleton card"><span /><span /><span /></div><p>Finding a little company…</p></div> : loadError ? <div className="empty-state card" role="alert"><Icon name="chat" size={30} /><h2>Let’s try that again.</h2><p>{loadError}</p><button className="button secondary" onClick={reload}>Try again</button></div> : protectedView ? <div className="empty-state card"><Icon name="user" size={30} /><h2>Your little space is waiting.</h2><p>Sign in or try the demo to {view === 'saved' ? 'keep thoughts you love' : view === 'mine' ? 'share your own thoughts' : view === 'profile' ? 'choose your public nickname' : 'see your updates'}.</p><button className="button primary" onClick={signIn}>Come on in<Icon name="arrow" size={16} /></button></div> : view === 'profile' ? <div><ProfileForm key={user.id} user={user} stats={stats} onSaved={result => { setUser(result); setToast('Your little corner, updated.'); }} /><button className="text-button profile-logout" onClick={logout}><Icon name="logout" size={16} />Log out</button></div> : view === 'notifications' ? <div className="card notification-list">{notifications.length ? notifications.map(n => <div className={'notification ' + (!n.is_read ? 'unread' : '')} key={n.id}><span className="notification-icon"><Icon name={n.type === 'like' ? 'heart' : 'chat'} size={19} /></span><div><strong>{n.message}</strong><span className="small muted">{timeAgo(n.created_at)}</span></div>{!n.is_read && <button className="icon-button" aria-label="Mark notification read" onClick={async () => { try { await api(`/notifications/${n.id}/read`, { method: 'PUT' }); setNotifications(v => v.map(x => x.id === n.id ? { ...x, is_read: 1 } : x)); } catch (err) { setToast(err.message); } }}><Icon name="check" size={18} /></button>}</div>) : <div className="empty-state"><Icon name="bell" size={30} /><h2>A little quiet, for now.</h2><p>When someone likes or replies to your thoughts, you’ll see it here.</p></div>}</div> : posts.length ? <div className="post-list">{posts.map(post => <PostCard key={post.id + '-' + (user?.id || 'visitor')} post={post} user={user} onSignIn={signIn} onUpdate={updatePost} onActivity={activityChanged} onRemove={id => { setPosts(v => v.filter(p => p.id !== id)); setToast('Thought deleted.'); }} onReport={p => setModal({ type: 'report', post: p })} />)}{hasMore && <button className="button secondary load-more" disabled={loadingMore} onClick={loadMore}>{loadingMore ? 'Finding more thoughts…' : 'A few more thoughts'}<Icon name="arrow" size={16} /></button>}<p className="feed-end"><span />a little more connected<span /></p></div> : <div className="empty-state card"><Icon name={view === 'saved' ? 'bookmark' : 'chat'} size={32} /><h2>{view === 'saved' ? 'Keep the thoughts that stay with you.' : view === 'mine' ? 'Every conversation starts somewhere.' : 'A little quiet in this corner.'}</h2><p>{view === 'saved' ? 'Tap the bookmark on a thought to save it here.' : view === 'mine' ? 'Your first thought could be someone else’s “me too”.' : 'Try another topic or a different search.'}</p><button className="button secondary" onClick={() => view === 'mine' ? writeThought() : (setTopic(''), setSearch(''), setSearchInput(''), navigate('feed'))}>{view === 'mine' ? 'Share your first thought' : 'Explore all thoughts'}<Icon name="arrow" size={16} /></button></div>}
        </section>
        <aside className="right-rail" aria-label="About the community"><section className="welcome-card card"><div className="rail-eyebrow"><Icon name="spark" size={17} />A SOFTER CORNER OF THE INTERNET</div><h2>Come as you are.</h2><p>No perfect profiles. No pressure.<br />Just people figuring things out, together.</p><div className="community-counts"><div><strong>{community?.post_count ?? '—'}</strong><span>thoughts shared</span></div><div><strong>{community?.comment_count ?? '—'}</strong><span>little connections</span></div></div>{!user && <button className="button primary wide" onClick={community?.demoEnabled ? startDemo : signIn} disabled={demoBusy}>{demoBusy ? 'Making room…' : community?.demoEnabled ? 'Take a look around' : 'Join the conversation'}<Icon name="arrow" size={17} /></button>}{community?.demoEnabled && <p className="demo-caption">{user?.isDemo ? 'You’re exploring with a demo identity.' : 'Demo community · sample conversations'}</p>}</section>
          <section className="topics-card card"><div className="rail-heading"><h2>Find your people</h2><span>↗</span></div><p className="small muted">A thought for every kind of day.</p><div className="topic-list">{community?.topics.map((t, i) => <button key={t.name} className={view === 'feed' && topic === t.name ? 'active' : ''} onClick={() => { setTopic(t.name); setSearch(''); setSearchInput(''); navigate('feed'); }}><span className={'topic-symbol symbol-' + i}>{['☕', '✎', '♡', '✳', '…'][i]}</span><span><strong>{t.name}</strong><small>{t.count} {t.count === 1 ? 'thought' : 'thoughts'}</small></span><Icon name="arrow" size={16} /></button>)}</div></section>
          <section className="kindness-card"><span className="kindness-icon"><Icon name="shield" size={24} /></span><h3>A little kindness goes a long way.</h3><p>Be curious. Be respectful. Keep personal details private. There’s a real person behind every nickname.</p><button className="text-button" onClick={() => setModal({ type: 'guidelines' })}>Our community promise<Icon name="arrow" size={15} /></button></section>
          <p className="rail-footer">SayAnonymous <span>✳</span> Stay a little, say a little.</p>
        </aside>
      </main>
    </div>
    {modal && <Dialog title={modal.type === 'auth' ? 'Hey, welcome in.' : modal.type === 'report' ? 'Look out for this space.' : 'Our community promise'} onClose={() => setModal(null)}>{modal.type === 'auth' ? <AuthForm onSuccess={signedIn} onDemo={demo} demoEnabled={community?.demoEnabled} /> : modal.type === 'report' ? <ReportForm post={modal.post} onClose={() => setModal(null)} onReported={() => setToast('Report recorded locally. No live moderation is available in this prototype.')} /> : <div className="guidelines"><p>We’re here to make honest conversations feel a little easier.</p><ul><li>Speak with kindness. Disagree with ideas without attacking people.</li><li>Share your own story. Keep other people’s names and private details out of it.</li><li>A nickname is public. Your email stays off posts, but this service stores your account and content.</li><li>Report harmful content using the flag on a thought. Reports are stored locally in this prototype, without live review.</li></ul><p className="small muted">This is a local prototype for trying the experience. Campus membership and email addresses are not verified.</p></div>}</Dialog>}
    {toast && <div className="toast" role="status"><Icon name="check" size={18} /><span>{toast}</span><button className="icon-button" onClick={() => setToast('')} aria-label="Dismiss notification"><Icon name="close" size={16} /></button></div>}
  </div>;
}
