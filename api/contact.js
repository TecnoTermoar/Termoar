import { sendContactEmail } from '../server/mail.js'
import { verifyRecaptchaV3 } from '../server/recaptcha.js'
import { Buffer } from 'node:buffer'
import process from 'node:process'

function getClientIp(req) {
  const xff = req.headers?.['x-forwarded-for']
  if (typeof xff === 'string' && xff.trim()) return xff.split(',')[0].trim()
  return req.socket?.remoteAddress || ''
}

async function readJsonBody(req, { limitBytes = 200 * 1024 } = {}) {
  const contentType = String(req.headers?.['content-type'] || '')
  if (!contentType.includes('application/json')) {
    throw new Error('unsupported_content_type')
  }

  const chunks = []
  let total = 0

  for await (const chunk of req) {
    const buf = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)
    total += buf.length
    if (total > limitBytes) throw new Error('payload_too_large')
    chunks.push(buf)
  }

  const raw = Buffer.concat(chunks).toString('utf8')
  if (!raw.trim()) return {}
  return JSON.parse(raw)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.statusCode = 405
    res.setHeader('Allow', 'POST')
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.end(JSON.stringify({ ok: false, error: 'method_not_allowed' }))
    return
  }

  try {
    const body = await readJsonBody(req)

    if (String(process.env.DEBUG_MAIL || '').toLowerCase() === 'true') {
      console.log('[contact] request', {
        ip: getClientIp(req),
        hasToken: Boolean(body?.recaptchaToken),
        email: body?.email,
      })
    }

    const {
      nombre,
      apellido,
      empresa,
      telefono,
      email,
      email2,
      asunto,
      mensaje,
      recaptchaToken,
    } = body || {}

    if (!nombre?.trim() || !apellido?.trim() || !email?.trim() || !email2?.trim() || !mensaje?.trim()) {
      res.statusCode = 400
      res.setHeader('Content-Type', 'application/json; charset=utf-8')
      res.end(JSON.stringify({ ok: false, error: 'missing_required_fields' }))
      return
    }

    const emailNorm = String(email).trim()
    const email2Norm = String(email2).trim()

    if (emailNorm !== email2Norm) {
      res.statusCode = 400
      res.setHeader('Content-Type', 'application/json; charset=utf-8')
      res.end(JSON.stringify({ ok: false, error: 'emails_do_not_match' }))
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailNorm)) {
      res.statusCode = 400
      res.setHeader('Content-Type', 'application/json; charset=utf-8')
      res.end(JSON.stringify({ ok: false, error: 'invalid_email' }))
      return
    }

    const minScore = Number(process.env.RECAPTCHA_MIN_SCORE || 0.5)
    const recaptcha = await verifyRecaptchaV3({
      token: recaptchaToken,
      expectedAction: 'contact',
      minScore,
      remoteip: getClientIp(req),
    })

    if (!recaptcha.ok) {
      res.statusCode = 403
      res.setHeader('Content-Type', 'application/json; charset=utf-8')
      res.end(JSON.stringify({ ok: false, error: 'recaptcha_failed', details: recaptcha.details }))
      return
    }

    const mailResult = await sendContactEmail({
      nombre: String(nombre).trim(),
      apellido: String(apellido).trim(),
      empresa: empresa ? String(empresa).trim() : '',
      telefono: telefono ? String(telefono).trim() : '',
      email: emailNorm,
      asunto: asunto ? String(asunto).trim() : '',
      mensaje: String(mensaje).trim(),
      recaptcha: recaptcha.details,
    })

    const debugMailEnabled = String(process.env.DEBUG_MAIL || '').toLowerCase() === 'true'
    if (debugMailEnabled) {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json; charset=utf-8')
      res.end(JSON.stringify({ ok: true, debugMail: mailResult ?? null }))
      return
    }

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.end(JSON.stringify({ ok: true }))
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)

    if (message === 'payload_too_large') {
      res.statusCode = 413
      res.setHeader('Content-Type', 'application/json; charset=utf-8')
      res.end(JSON.stringify({ ok: false, error: 'payload_too_large' }))
      return
    }

    if (message === 'unsupported_content_type') {
      res.statusCode = 415
      res.setHeader('Content-Type', 'application/json; charset=utf-8')
      res.end(JSON.stringify({ ok: false, error: 'unsupported_content_type' }))
      return
    }

    console.error(err)
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.end(JSON.stringify({ ok: false, error: 'server_error' }))
  }
}
