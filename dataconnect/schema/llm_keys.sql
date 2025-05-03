-- LLM Keys table
CREATE TABLE llm_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type TEXT NOT NULL CHECK (entity_type IN ('user', 'profile', 'workspace')),
  entity_id TEXT NOT NULL,
  provider TEXT NOT NULL CHECK (provider IN ('openai', 'anthropic', 'gemini', 'ollama', 'xai')),
  encrypted_key TEXT,
  encryption_iv TEXT,
  config JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (entity_type, entity_id, provider)
);

-- Index for faster lookups
CREATE INDEX idx_llm_keys_entity ON llm_keys(entity_type, entity_id);
CREATE INDEX idx_llm_keys_provider ON llm_keys(provider);

-- Row-Level Security Policies
ALTER TABLE llm_keys ENABLE ROW LEVEL SECURITY;

-- Users can view and manage their own keys
CREATE POLICY llm_keys_user_select ON llm_keys
  FOR SELECT
  USING (
    (entity_type = 'user' AND entity_id = current_user_id()) OR
    (entity_type = 'profile' AND entity_id IN (
      SELECT id::text FROM profiles WHERE user_id = current_user_id()
    )) OR
    (entity_type = 'workspace' AND entity_id IN (
      SELECT workspace_id::text FROM workspace_members 
      WHERE user_id = current_user_id() AND role = 'owner'
    ))
  );

CREATE POLICY llm_keys_user_insert ON llm_keys
  FOR INSERT
  WITH CHECK (
    (entity_type = 'user' AND entity_id = current_user_id()) OR
    (entity_type = 'profile' AND entity_id IN (
      SELECT id::text FROM profiles WHERE user_id = current_user_id()
    )) OR
    (entity_type = 'workspace' AND entity_id IN (
      SELECT workspace_id::text FROM workspace_members 
      WHERE user_id = current_user_id() AND role = 'owner'
    ))
  );

CREATE POLICY llm_keys_user_update ON llm_keys
  FOR UPDATE
  USING (
    (entity_type = 'user' AND entity_id = current_user_id()) OR
    (entity_type = 'profile' AND entity_id IN (
      SELECT id::text FROM profiles WHERE user_id = current_user_id()
    )) OR
    (entity_type = 'workspace' AND entity_id IN (
      SELECT workspace_id::text FROM workspace_members 
      WHERE user_id = current_user_id() AND role = 'owner'
    ))
  );

CREATE POLICY llm_keys_user_delete ON llm_keys
  FOR DELETE
  USING (
    (entity_type = 'user' AND entity_id = current_user_id()) OR
    (entity_type = 'profile' AND entity_id IN (
      SELECT id::text FROM profiles WHERE user_id = current_user_id()
    )) OR
    (entity_type = 'workspace' AND entity_id IN (
      SELECT workspace_id::text FROM workspace_members 
      WHERE user_id = current_user_id() AND role = 'owner'
    ))
  );
