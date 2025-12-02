-- Fix SECURITY DEFINER functions by setting search_path to prevent privilege escalation
-- This addresses the security warning: "Function Search Path Mutable"

ALTER FUNCTION public.calculate_avg_response_time(integer) SET search_path = public;
ALTER FUNCTION public.calculate_error_rate(integer) SET search_path = public;
ALTER FUNCTION public.generate_api_key_hash(text) SET search_path = public;
ALTER FUNCTION public.recalculate_project_spent_budget() SET search_path = public;
ALTER FUNCTION public.schedule_next_backup() SET search_path = public;
ALTER FUNCTION public.validate_webhook_signature(text, text, text) SET search_path = public;