// Utilities di sicurezza condivise per le Edge Functions
export interface SecurityCheck {
  isValid: boolean;
  error?: string;
  sanitized?: any;
}

export function validateEmail(email: string): SecurityCheck {
  if (!email || typeof email !== 'string') {
    return { isValid: false, error: 'Email richiesta' };
  }
  
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  if (!emailRegex.test(email) || email.length > 254) {
    return { isValid: false, error: 'Formato email non valido' };
  }

  // Check for suspicious patterns
  const suspiciousPatterns = /(temp|fake|test|spam|noreply|no-reply)/i;
  if (suspiciousPatterns.test(email)) {
    return { isValid: false, error: 'Email non valida' };
  }

  return { isValid: true, sanitized: email.toLowerCase().trim() };
}

export function validateTextInput(text: string, minLength: number, maxLength: number, fieldName: string): SecurityCheck {
  if (!text || typeof text !== 'string') {
    return { isValid: false, error: `${fieldName} richiesto` };
  }

  const trimmed = text.trim();
  if (trimmed.length < minLength || trimmed.length > maxLength) {
    return { isValid: false, error: `${fieldName} deve essere tra ${minLength} e ${maxLength} caratteri` };
  }

  // Remove potential XSS and malicious content
  const sanitized = trimmed
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '');

  return { isValid: true, sanitized };
}

export function logSecurityEvent(
  eventType: string, 
  details: Record<string, any>, 
  request: Request
): void {
  const userAgent = request.headers.get("user-agent") || "unknown";
  const forwardedFor = request.headers.get("x-forwarded-for") || "unknown";
  const referer = request.headers.get("referer") || "unknown";
  
  console.log('SECURITY_EVENT', JSON.stringify({
    type: eventType,
    timestamp: new Date().toISOString(),
    ip: forwardedFor,
    userAgent,
    referer,
    details
  }));
}

export function detectSuspiciousActivity(request: Request): SecurityCheck {
  const userAgent = request.headers.get("user-agent") || "";
  const forwardedFor = request.headers.get("x-forwarded-for") || "";
  
  // Check for bot patterns
  const botPatterns = /(bot|crawler|spider|scraper|curl|wget|postman)/i;
  if (botPatterns.test(userAgent)) {
    return { 
      isValid: false, 
      error: 'Attività sospetta rilevata' 
    };
  }

  // Check for suspicious IP patterns (basic check)
  if (forwardedFor.includes('127.0.0.1') || forwardedFor.includes('localhost')) {
    logSecurityEvent('SUSPICIOUS_IP', { ip: forwardedFor }, request);
  }

  return { isValid: true };
}

export function rateLimitCheck(
  identifier: string,
  maxRequests: number = 10,
  windowMinutes: number = 60
): SecurityCheck {
  // In a real implementation, this would use Redis or database
  // For now, just log the attempt
  console.log(`RATE_LIMIT_CHECK: ${identifier} - ${maxRequests}/${windowMinutes}min`);
  return { isValid: true };
}