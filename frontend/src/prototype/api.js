export async function api(path, options = {}) {
  const isForm = options.body instanceof FormData;
  let response;
  try {
    response = await fetch('/api' + path, {
      credentials: 'same-origin', ...options,
      headers: { ...(!isForm && options.body ? { 'Content-Type': 'application/json' } : {}), ...options.headers },
      body: options.body && !isForm ? JSON.stringify(options.body) : options.body,
    });
  } catch (error) {
    if (error.name === 'AbortError') throw error;
    throw new Error('We couldn’t connect. Check that SayAnonymous is running, then try again.');
  }
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw Object.assign(new Error(data.message || 'Something went wrong. Please try again.'), { status: response.status });
  return data;
}
