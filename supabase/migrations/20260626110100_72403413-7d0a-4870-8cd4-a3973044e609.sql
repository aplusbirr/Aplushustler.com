
REVOKE EXECUTE ON FUNCTION public.has_role(UUID, app_role) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;

DROP POLICY "Anyone can post comments" ON public.comments;
CREATE POLICY "Anyone can post comments" ON public.comments FOR INSERT
  WITH CHECK (
    char_length(author_name) BETWEEN 1 AND 100
    AND char_length(content) BETWEEN 1 AND 2000
    AND approved = true
  );
