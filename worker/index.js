/**
 * 한일씨앤에스 전자카탈로그 - Q&A 재배상담 API
 *
 * 공개 API
 *   GET  /api/qna              공개 목록 (이름은 가림, 연락처는 절대 내보내지 않음)
 *   POST /api/qna              상담 접수 (multipart/form-data, 사진 최대 3장)
 *   GET  /api/qna/photo/:id    담당자가 '사진 공개'로 둔 답변완료 상담의 사진
 *
 * 담당자 API (로그인 필요)
 *   POST /api/admin/login · /api/admin/logout · GET /api/admin/me
 *   GET  /api/admin/qna
 *   POST /api/admin/qna/:id/answer | hide | show | clear-phone | delete
 *   GET  /api/admin/photo/:id
 *
 * 담당자 비밀번호는 Cloudflare 화면에서 Secret "ADMIN_PASSWORD"로 등록합니다.
 * 등록 전에는 담당자 로그인이 막혀 있습니다(공개 기능은 동작).
 */

const CROPS = ['벼', '고추', '사과', '배', '복숭아', '포도', '시설채소', '기타'];
const REGIONS = ['경북', '경남', '전남', '전북', '충남', '충북', '강원', '경기', '제주', '서울·인천', '부산·대구·울산', '광주·대전·세종', '기타'];
const PRODUCTS = {
  'silicate-fertilizer': '입상규산질 비료',
  'limestone-fertilizer': '입상석회고토 비료',
  'calcium-sulfur-fertilizer': '칼슘유황비료',
  'organic-silicate': '생생나라 규산',
  'organic-limestone': '생생나라 석회고토',
  'organic-mag-sulfur': '생생황 마그유황칼슘',
  'vita-40': '생생비타 40',
  'vita-gold': '생생비타 골드'
};
// 비료관리법상 비료 광고에 쓸 수 없는 표현 (답변 게시 전 차단)
const BANNED = ['방제', '예방', '치료', '살균', '살충', '특효', '완치', '100%'];

const MAX_PHOTOS = 3;
const MAX_PHOTO_BYTES = 1_500_000;
const SESSION_HOURS = 12;
const COOKIE = 'hanil_qna_admin';

let schemaReady = false;

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (!url.pathname.startsWith('/api/')) {
      return env.ASSETS.fetch(request);
    }
    try {
      if (!env.DB) return json({ error: '상담 게시판 저장소가 아직 연결되지 않았습니다.' }, 503);
      await ensureSchema(env.DB);
      return await route(request, env, url, ctx);
    } catch (err) {
      if (err instanceof HttpError) return json({ error: err.message }, err.status);
      console.error('qna error', err && err.stack || err);
      return json({ error: '일시적인 오류입니다. 잠시 후 다시 시도해 주세요.' }, 500);
    }
  }
};

class HttpError extends Error {
  constructor(status, message) { super(message); this.status = status; }
}

async function route(request, env, url, ctx) {
  const p = url.pathname.replace(/\/+$/, '');
  const m = request.method;

  if (p === '/api/shorts' && m === 'GET') return listShorts(env, ctx);
  let ms = p.match(/^\/api\/shorts\/thumb\/([A-Za-z0-9_-]{6,20})$/);
  if (ms && m === 'GET') return shortsThumb(ms[1], ctx);
  if (p === '/api/qna' && m === 'GET') return listPublic(env, url);
  if (p === '/api/qna' && m === 'POST') return createQuestion(request, env);
  let mm = p.match(/^\/api\/qna\/photo\/(\d+)$/);
  if (mm && m === 'GET') return publicPhoto(env, Number(mm[1]));

  if (p === '/api/admin/login' && m === 'POST') return adminLogin(request, env);
  if (p === '/api/admin/logout' && m === 'POST') return adminLogout(request);
  if (p.startsWith('/api/admin/')) {
    const session = await readSession(request, env);
    if (p === '/api/admin/me' && m === 'GET') {
      return json({ loggedIn: !!session, configured: !!env.ADMIN_PASSWORD });
    }
    if (!session) throw new HttpError(401, '담당자 로그인이 필요합니다.');
    if (m === 'POST') requireSameOrigin(request, url);

    if (p === '/api/admin/qna' && m === 'GET') return listAdmin(env);
    mm = p.match(/^\/api\/admin\/photo\/(\d+)$/);
    if (mm && m === 'GET') return adminPhoto(env, Number(mm[1]));
    mm = p.match(/^\/api\/admin\/qna\/(\d+)\/(answer|hide|show|clear-phone|delete)$/);
    if (mm && m === 'POST') return adminAction(request, env, Number(mm[1]), mm[2]);
  }
  throw new HttpError(404, '없는 주소입니다.');
}

/* ───────── 저장소 ───────── */

async function ensureSchema(db) {
  if (schemaReady) return;
  await db.batch([
    db.prepare(`CREATE TABLE IF NOT EXISTS questions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      created_at TEXT NOT NULL,
      crop TEXT NOT NULL,
      body TEXT NOT NULL,
      name TEXT NOT NULL,
      region TEXT NOT NULL,
      phone TEXT,
      soil_ph TEXT,
      soil_si TEXT,
      product TEXT,
      visibility TEXT NOT NULL DEFAULT 'pub',
      status TEXT NOT NULL DEFAULT 'wait',
      hidden INTEGER NOT NULL DEFAULT 0,
      ans_judge TEXT,
      ans_manage TEXT,
      ans_check TEXT,
      ans_product TEXT,
      answered_at TEXT,
      photo_public INTEGER NOT NULL DEFAULT 0,
      ip_hash TEXT
    )`),
    db.prepare(`CREATE TABLE IF NOT EXISTS photos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      qid INTEGER NOT NULL,
      mime TEXT NOT NULL,
      data BLOB NOT NULL,
      created_at TEXT NOT NULL
    )`),
    db.prepare(`CREATE TABLE IF NOT EXISTS login_attempts (
      ip_hash TEXT NOT NULL,
      at INTEGER NOT NULL
    )`),
    db.prepare('CREATE INDEX IF NOT EXISTS idx_q_created ON questions(created_at)'),
    db.prepare('CREATE INDEX IF NOT EXISTS idx_p_qid ON photos(qid)'),
    db.prepare(`CREATE TABLE IF NOT EXISTS shorts (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      ep INTEGER,
      tags TEXT,
      published TEXT,
      alive INTEGER NOT NULL DEFAULT 1,
      checked_at INTEGER NOT NULL DEFAULT 0
    )`),
    db.prepare(`CREATE TABLE IF NOT EXISTS kv (k TEXT PRIMARY KEY, v TEXT)`)
  ]);
  schemaReady = true;
}

/* ───────── 공개 ───────── */

async function listPublic(env) {
  const { results } = await env.DB.prepare(
    `SELECT q.*, (SELECT COUNT(*) FROM photos p WHERE p.qid = q.id) AS photo_count
     FROM questions q WHERE q.hidden = 0 ORDER BY q.id DESC LIMIT 300`
  ).all();
  const ids = results.filter(r => r.visibility === 'pub' && r.status === 'done' && r.photo_public).map(r => r.id);
  const photoMap = await photoIdsFor(env, ids);
  const items = results.map(r => {
    if (r.visibility !== 'pub') {
      return { id: r.id, crop: r.crop, region: r.region, date: kstDate(r.created_at), status: r.status, private: true };
    }
    const item = {
      id: r.id, crop: r.crop, body: r.body, who: maskName(r.name), region: r.region,
      date: kstDate(r.created_at), status: r.status, private: false,
      soil: (r.soil_ph || r.soil_si) ? { ph: r.soil_ph || '', si: r.soil_si || '' } : null
    };
    if (r.status === 'done') {
      item.answer = {
        judge: r.ans_judge || '', manage: r.ans_manage || '', check: r.ans_check || '',
        product: r.ans_product && PRODUCTS[r.ans_product] ? { id: r.ans_product, name: PRODUCTS[r.ans_product] } : null,
        date: r.answered_at ? kstDate(r.answered_at) : ''
      };
      item.photos = photoMap[r.id] || [];
    }
    return item;
  });
  return json({ items }, 200, { 'Cache-Control': 'no-store' });
}

async function photoIdsFor(env, qids) {
  const map = {};
  if (!qids.length) return map;
  const { results } = await env.DB.prepare(
    `SELECT id, qid FROM photos WHERE qid IN (${qids.map(() => '?').join(',')}) ORDER BY id`
  ).bind(...qids).all();
  results.forEach(r => { (map[r.qid] = map[r.qid] || []).push(r.id); });
  return map;
}

async function createQuestion(request, env) {
  const ct = request.headers.get('content-type') || '';
  if (!ct.includes('multipart/form-data')) throw new HttpError(400, '잘못된 요청입니다.');
  const len = Number(request.headers.get('content-length') || 0);
  if (len > 6_000_000) throw new HttpError(413, '사진 용량이 너무 큽니다. 사진 수를 줄여 주세요.');

  const form = await request.formData();
  const get = k => String(form.get(k) || '').trim();

  // 자동 등록 방지: 숨은 칸이 채워졌거나, 화면을 연 지 3초 안에 보낸 경우
  if (get('website')) return json({ ok: true, id: 0 });
  const opened = Number(get('opened_at'));
  if (!opened || Date.now() - opened < 3000) throw new HttpError(400, '잠시 후 다시 등록해 주세요.');

  const crop = get('crop');
  const body = get('body');
  const name = get('name');
  const region = get('region');
  const visibility = get('visibility') === 'priv' ? 'priv' : 'pub';
  const phone = get('phone');
  const product = get('product');
  const ph = get('soil_ph');
  const si = get('soil_si');

  if (!CROPS.includes(crop)) throw new HttpError(400, '작물을 골라 주세요.');
  if (body.length < 5) throw new HttpError(400, '문의 내용을 5자 이상 적어 주세요.');
  if (body.length > 2000) throw new HttpError(400, '문의 내용은 2,000자 이내로 적어 주세요.');
  if (!name || name.length > 30) throw new HttpError(400, '이름 또는 농장명을 30자 이내로 적어 주세요.');
  if (!REGIONS.includes(region)) throw new HttpError(400, '지역을 골라 주세요.');
  if (get('agree') !== 'yes') throw new HttpError(400, '개인정보 수집·이용에 동의해 주세요.');
  if (visibility === 'priv' && !/^[0-9+\-\s()]{9,20}$/.test(phone)) throw new HttpError(400, '비공개 상담은 연락받을 전화번호가 필요합니다.');
  if (product && !PRODUCTS[product]) throw new HttpError(400, '제품을 다시 골라 주세요.');
  if (ph && !/^\d{1,2}(\.\d{1,2})?$/.test(ph)) throw new HttpError(400, 'pH는 숫자로 적어 주세요. 예: 5.4');
  if (si && !/^\d{1,4}(\.\d{1,2})?$/.test(si)) throw new HttpError(400, '유효규산은 숫자로 적어 주세요. 예: 120');
  if (/(https?:\/\/|www\.|\.com\b|\.kr\b|\.net\b)/i.test(body + ' ' + name)) {
    throw new HttpError(400, '인터넷 주소는 적을 수 없습니다. 내용만 적어 주세요.');
  }

  const files = form.getAll('photos').filter(f => f && typeof f === 'object' && f.size > 0);
  if (files.length > MAX_PHOTOS) throw new HttpError(400, `사진은 ${MAX_PHOTOS}장까지 올릴 수 있습니다.`);
  const photos = [];
  for (const f of files) {
    if (f.size > MAX_PHOTO_BYTES) throw new HttpError(413, '사진 한 장이 너무 큽니다. 다시 골라 주세요.');
    const buf = new Uint8Array(await f.arrayBuffer());
    const mime = sniffImage(buf);
    if (!mime) throw new HttpError(400, '사진은 JPG, PNG, WEBP 파일만 올릴 수 있습니다.');
    photos.push({ mime, buf });
  }

  const ip = request.headers.get('cf-connecting-ip') || '';
  const ipHash = await sha256(`qna|${ip}`);
  const recent = await env.DB.prepare(
    `SELECT COUNT(*) AS n FROM questions WHERE ip_hash = ? AND created_at > ?`
  ).bind(ipHash, new Date(Date.now() - 3600_000).toISOString()).first();
  if (recent && recent.n >= 5) throw new HttpError(429, '짧은 시간에 너무 많이 등록하셨습니다. 1시간 뒤에 다시 시도해 주세요.');

  const now = new Date().toISOString();
  const res = await env.DB.prepare(
    `INSERT INTO questions (created_at, crop, body, name, region, phone, soil_ph, soil_si, product, visibility, ip_hash)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(now, crop, body, name, region, visibility === 'priv' ? phone : null, ph || null, si || null, product || null, visibility, ipHash).run();
  const qid = res.meta.last_row_id;
  if (photos.length) {
    await env.DB.batch(photos.map(ph2 =>
      env.DB.prepare('INSERT INTO photos (qid, mime, data, created_at) VALUES (?, ?, ?, ?)').bind(qid, ph2.mime, ph2.buf, now)
    ));
  }
  return json({ ok: true, id: qid }, 201);
}

async function publicPhoto(env, id) {
  const row = await env.DB.prepare(
    `SELECT p.mime, p.data FROM photos p JOIN questions q ON q.id = p.qid
     WHERE p.id = ? AND q.visibility = 'pub' AND q.status = 'done' AND q.hidden = 0 AND q.photo_public = 1`
  ).bind(id).first();
  if (!row) throw new HttpError(404, '사진이 없습니다.');
  return photoResponse(row, 'public, max-age=3600');
}

/* ───────── 담당자 ───────── */

async function adminLogin(request, env) {
  if (!env.ADMIN_PASSWORD) throw new HttpError(503, '담당자 비밀번호가 아직 등록되지 않았습니다. Cloudflare 설정에서 ADMIN_PASSWORD를 등록해 주세요.');
  requireSameOrigin(request, new URL(request.url));
  const ip = request.headers.get('cf-connecting-ip') || '';
  const ipHash = await sha256(`login|${ip}`);
  const since = Date.now() - 15 * 60_000;
  await env.DB.prepare('DELETE FROM login_attempts WHERE at < ?').bind(Date.now() - 24 * 3600_000).run();
  const fails = await env.DB.prepare('SELECT COUNT(*) AS n FROM login_attempts WHERE ip_hash = ? AND at > ?').bind(ipHash, since).first();
  if (fails && fails.n >= 5) throw new HttpError(429, '비밀번호를 여러 번 틀렸습니다. 15분 뒤에 다시 시도해 주세요.');

  let body = {};
  try { body = await request.json(); } catch (e) { /* empty */ }
  const ok = await safeEqual(String(body.password || ''), env.ADMIN_PASSWORD);
  if (!ok) {
    await env.DB.prepare('INSERT INTO login_attempts (ip_hash, at) VALUES (?, ?)').bind(ipHash, Date.now()).run();
    throw new HttpError(401, '비밀번호가 맞지 않습니다.');
  }
  const exp = Date.now() + SESSION_HOURS * 3600_000;
  const token = `${exp}.${await hmac(env.ADMIN_PASSWORD, `session|${exp}`)}`;
  return json({ ok: true }, 200, {
    'Set-Cookie': `${COOKIE}=${token}; Path=/api/admin; HttpOnly; Secure; SameSite=Strict; Max-Age=${SESSION_HOURS * 3600}`
  });
}

function adminLogout() {
  return json({ ok: true }, 200, { 'Set-Cookie': `${COOKIE}=; Path=/api/admin; HttpOnly; Secure; SameSite=Strict; Max-Age=0` });
}

async function readSession(request, env) {
  if (!env.ADMIN_PASSWORD) return null;
  const cookie = request.headers.get('cookie') || '';
  const m = cookie.match(new RegExp(`(?:^|;\\s*)${COOKIE}=([0-9]+)\\.([A-Za-z0-9_-]+)`));
  if (!m) return null;
  const exp = Number(m[1]);
  if (!exp || exp < Date.now()) return null;
  const expect = await hmac(env.ADMIN_PASSWORD, `session|${exp}`);
  return (await safeEqual(m[2], expect)) ? { exp } : null;
}

function requireSameOrigin(request, url) {
  const origin = request.headers.get('origin');
  if (origin && origin !== url.origin) throw new HttpError(403, '허용되지 않은 요청입니다.');
  if ((request.headers.get('x-requested-with') || '') !== 'hanil-qna') throw new HttpError(403, '허용되지 않은 요청입니다.');
}

async function listAdmin(env) {
  const { results } = await env.DB.prepare(
    `SELECT q.id, q.created_at, q.crop, q.body, q.name, q.region, q.phone, q.soil_ph, q.soil_si, q.product,
            q.visibility, q.status, q.hidden, q.ans_judge, q.ans_manage, q.ans_check, q.ans_product, q.answered_at, q.photo_public
     FROM questions q ORDER BY (q.status = 'wait') DESC, q.id DESC LIMIT 500`
  ).all();
  const photoMap = await photoIdsFor(env, results.map(r => r.id));
  results.forEach(r => { r.photos = photoMap[r.id] || []; });
  return json({ items: results, products: PRODUCTS, banned: BANNED }, 200, { 'Cache-Control': 'no-store' });
}

async function adminAction(request, env, id, action) {
  const row = await env.DB.prepare('SELECT id FROM questions WHERE id = ?').bind(id).first();
  if (!row) throw new HttpError(404, '상담을 찾을 수 없습니다.');

  if (action === 'answer') {
    let b = {};
    try { b = await request.json(); } catch (e) { /* empty */ }
    const judge = String(b.judge || '').trim();
    const manage = String(b.manage || '').trim();
    const check = String(b.check || '').trim();
    const product = String(b.product || '');
    if (!judge || !manage) throw new HttpError(400, '상황 판단과 관리 방법은 꼭 적어 주세요.');
    if ((judge + manage + check).length > 4000) throw new HttpError(400, '답변이 너무 깁니다.');
    if (product && !PRODUCTS[product]) throw new HttpError(400, '제품을 다시 골라 주세요.');
    const hit = BANNED.filter(w => (judge + manage + check).includes(w));
    if (hit.length) throw new HttpError(400, `${hit.join(', ')} 표현은 비료 광고에 쓸 수 없습니다. 고친 뒤 게시해 주세요.`);
    await env.DB.prepare(
      `UPDATE questions SET status = 'done', ans_judge = ?, ans_manage = ?, ans_check = ?, ans_product = ?,
       answered_at = COALESCE(answered_at, ?), photo_public = ? WHERE id = ?`
    ).bind(judge, manage, check || null, product || null, new Date().toISOString(), b.photoPublic ? 1 : 0, id).run();
  } else if (action === 'hide') {
    await env.DB.prepare('UPDATE questions SET hidden = 1 WHERE id = ?').bind(id).run();
  } else if (action === 'show') {
    await env.DB.prepare('UPDATE questions SET hidden = 0 WHERE id = ?').bind(id).run();
  } else if (action === 'clear-phone') {
    await env.DB.prepare('UPDATE questions SET phone = NULL WHERE id = ?').bind(id).run();
  } else if (action === 'delete') {
    await env.DB.batch([
      env.DB.prepare('DELETE FROM photos WHERE qid = ?').bind(id),
      env.DB.prepare('DELETE FROM questions WHERE id = ?').bind(id)
    ]);
  }
  return json({ ok: true });
}

async function adminPhoto(env, id) {
  const row = await env.DB.prepare('SELECT mime, data FROM photos WHERE id = ?').bind(id).first();
  if (!row) throw new HttpError(404, '사진이 없습니다.');
  return photoResponse(row, 'private, no-store');
}

/* ───────── 회사 YouTube 쇼츠 (사용 가이드 '흙 이야기') ───────── */
// 채널의 새 영상 목록(RSS)을 1시간마다 확인해 저장합니다. RSS에는 최근 15개만 나오므로
// 한 번 본 영상은 DB에 남겨 두고, 비공개·삭제된 영상은 하루 한 번 확인해 목록에서 뺍니다.
const SHORTS_CHANNEL = 'UCN6ewIFjigwPr7zp9ULdttQ';
const SHORTS_REFRESH_MS = 3600_000;
const SHORTS_RECHECK_MS = 24 * 3600_000;
// RSS를 읽지 못해도 보이도록 이미 확인한 편을 기본값으로 둡니다.
const SHORTS_SEED = [
  ['w0IBg_rxswc', '흙에도 할아버지가 있다고?! 흙의 족보 대공개', 1, ''],
  ['23azP97Xx5o', '흙은 여자, 양분은 남자?! 밭속 자석 연애 이야기', 2, ''],
  ['PclltFTvR0w', '비료에도 암수가 있다! 비 오면 도망가는 질소', 3, ''],
  ['7PGBfMsHCxk', '흙 속에 깡패가 산다?! 뿌리 괴롭히는 범인 검거', 4, '산성 석회']
];

async function listShorts(env, ctx) {
  const db = env.DB;
  const seeded = await db.prepare("SELECT v FROM kv WHERE k = 'shorts_seeded'").first();
  if (!seeded) {
    await db.batch(SHORTS_SEED.map(([id, title, ep, tags]) =>
      db.prepare('INSERT OR IGNORE INTO shorts (id, title, ep, tags, published, alive, checked_at) VALUES (?, ?, ?, ?, ?, 1, 0)')
        .bind(id, title, ep, tags, null)).concat([
      db.prepare("INSERT OR REPLACE INTO kv (k, v) VALUES ('shorts_seeded', '1')")
    ]));
  }
  const last = await db.prepare("SELECT v FROM kv WHERE k = 'shorts_refreshed'").first();
  if (!last || Date.now() - Number(last.v) > SHORTS_REFRESH_MS) {
    await db.prepare("INSERT OR REPLACE INTO kv (k, v) VALUES ('shorts_refreshed', ?)").bind(String(Date.now())).run();
    const job = refreshShorts(env).catch(err => console.error('shorts refresh', err && err.message));
    if (ctx && ctx.waitUntil) ctx.waitUntil(job); else await job;
  }
  const { results } = await db.prepare(
    'SELECT id, title, ep, tags, published FROM shorts WHERE alive = 1 ORDER BY ep IS NULL, ep ASC, published ASC LIMIT 200'
  ).all();
  return json({ channel: 'https://www.youtube.com/@hanilcns', items: results }, 200, { 'Cache-Control': 'public, max-age=300' });
}

async function refreshShorts(env) {
  const db = env.DB;
  const url = env.SHORTS_FEED_URL || `https://www.youtube.com/feeds/videos.xml?channel_id=${SHORTS_CHANNEL}`;
  const res = await fetch(url, { headers: { 'User-Agent': 'hanil-catalog' } });
  if (!res.ok) throw new Error('feed ' + res.status);
  const xml = await res.text();
  const entries = xml.split('<entry>').slice(1);
  const seen = [];
  const stmts = [];
  for (const e of entries) {
    const id = (e.match(/<yt:videoId>([A-Za-z0-9_-]{6,20})<\/yt:videoId>/) || [])[1];
    const rawTitle = unescapeXml((e.match(/<title>([^<]*)<\/title>/) || [])[1] || '');
    const desc = unescapeXml((e.match(/<media:description>([\s\S]*?)<\/media:description>/) || [])[1] || '');
    const published = (e.match(/<published>([^<]+)<\/published>/) || [])[1] || null;
    if (!id || !/#shorts/i.test(rawTitle + ' ' + desc)) continue;
    const ep = Number((rawTitle.match(/(\d+)\s*편/) || [])[1]) || null;
    const title = cleanShortTitle(rawTitle);
    const tags = Array.from(new Set((desc.match(/#([0-9A-Za-z가-힣_]+)/g) || []).map(t => t.slice(1)))).join(' ');
    seen.push(id);
    stmts.push(db.prepare(
      `INSERT INTO shorts (id, title, ep, tags, published, alive, checked_at) VALUES (?, ?, ?, ?, ?, 1, ?)
       ON CONFLICT(id) DO UPDATE SET title = excluded.title, ep = excluded.ep, tags = excluded.tags,
       published = excluded.published, alive = 1, checked_at = excluded.checked_at`
    ).bind(id, title, ep, tags, published, Date.now()));
  }
  if (stmts.length) await db.batch(stmts);

  // 목록에서 사라진 오래된 영상은 공개 상태인지 하루에 한 번 확인 (한 번에 최대 10개)
  const { results } = await db.prepare(
    `SELECT id FROM shorts WHERE alive = 1 AND checked_at < ? ${seen.length ? `AND id NOT IN (${seen.map(() => '?').join(',')})` : ''} LIMIT 10`
  ).bind(Date.now() - SHORTS_RECHECK_MS, ...seen).all();
  for (const r of results) {
    const o = await fetch(`https://www.youtube.com/oembed?format=json&url=${encodeURIComponent('https://www.youtube.com/shorts/' + r.id)}`);
    const alive = o.ok ? 1 : (o.status === 401 || o.status === 403 || o.status === 404 ? 0 : 1);
    await db.prepare('UPDATE shorts SET alive = ?, checked_at = ? WHERE id = ?').bind(alive, Date.now(), r.id).run();
  }
}

function cleanShortTitle(t) {
  return t.replace(/#shorts/ig, '').replace(/\|\s*흙\s*이야기\s*\d+\s*편/g, '').replace(/\s{2,}/g, ' ').replace(/[\s|]+$/, '').trim();
}

function unescapeXml(s) {
  return s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&');
}

async function shortsThumb(id, ctx) {
  // 썸네일을 카다록 서버를 거쳐 보여줘, 누르기 전에는 방문자 정보가 YouTube로 가지 않게 합니다.
  const cache = caches.default;
  const key = new Request(`https://thumb.cache/${id}`);
  const hit = await cache.match(key);
  if (hit) return hit;
  let res;
  try {
    res = await fetch(`https://i.ytimg.com/vi/${id}/oar2.jpg`);
    if (!res.ok) res = await fetch(`https://i.ytimg.com/vi/${id}/hqdefault.jpg`);
  } catch (e) {
    throw new HttpError(502, '썸네일을 불러오지 못했습니다.');
  }
  if (!res.ok) throw new HttpError(404, '썸네일이 없습니다.');
  const out = new Response(res.body, {
    headers: { 'Content-Type': 'image/jpeg', 'Cache-Control': 'public, max-age=86400', 'X-Content-Type-Options': 'nosniff' }
  });
  if (ctx && ctx.waitUntil) ctx.waitUntil(cache.put(key, out.clone()));
  return out;
}

/* ───────── 도움 함수 ───────── */

function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': 'no-store',
      ...headers
    }
  });
}

function photoResponse(row, cache) {
  const data = row.data instanceof ArrayBuffer ? new Uint8Array(row.data) : new Uint8Array(row.data);
  return new Response(data, {
    headers: {
      'Content-Type': row.mime,
      'Cache-Control': cache,
      'X-Content-Type-Options': 'nosniff',
      'Content-Security-Policy': "default-src 'none'"
    }
  });
}

function sniffImage(b) {
  if (b.length > 3 && b[0] === 0xFF && b[1] === 0xD8 && b[2] === 0xFF) return 'image/jpeg';
  if (b.length > 8 && b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4E && b[3] === 0x47) return 'image/png';
  if (b.length > 12 && b[0] === 0x52 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x46 &&
      b[8] === 0x57 && b[9] === 0x45 && b[10] === 0x42 && b[11] === 0x50) return 'image/webp';
  return null;
}

function kstDate(iso) {
  return new Date(Date.parse(iso) + 9 * 3600_000).toISOString().slice(0, 10);
}

function maskName(n) {
  const s = Array.from(String(n || '').trim());
  if (s.length <= 1) return (s[0] || '') + '○';
  if (s.length === 2) return s[0] + '○';
  return s[0] + '○'.repeat(s.length - 2) + s[s.length - 1];
}

async function sha256(text) {
  const d = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return b64url(new Uint8Array(d));
}

async function hmac(secret, text) {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(text));
  return b64url(new Uint8Array(sig));
}

async function safeEqual(a, b) {
  // 길이와 내용이 드러나지 않도록 해시끼리 비교
  const [ha, hb] = await Promise.all([sha256(`eq|${a}`), sha256(`eq|${b}`)]);
  let diff = 0;
  for (let i = 0; i < ha.length; i++) diff |= ha.charCodeAt(i) ^ hb.charCodeAt(i);
  return diff === 0 && ha.length === hb.length;
}

function b64url(bytes) {
  let s = '';
  bytes.forEach(x => { s += String.fromCharCode(x); });
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
