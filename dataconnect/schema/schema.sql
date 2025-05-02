-- Firebase DataConnect Schema for Partners in Biz

-- Users table
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  display_name TEXT,
  photo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Workspaces table
CREATE TABLE workspaces (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  logo_url TEXT,
  created_by TEXT NOT NULL REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL REFERENCES users(id),
  name TEXT NOT NULL,
  bio TEXT,
  avatar_url TEXT,
  skills TEXT[],
  interests TEXT[],
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Workspace Members table (many-to-many relationship between users and workspaces)
CREATE TABLE workspace_members (
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  profile_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  role TEXT NOT NULL CHECK (role IN ('owner', 'admin', 'member', 'guest')),
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (workspace_id, user_id)
);

-- Workspace Invitations table
CREATE TABLE workspace_invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'member', 'guest')),
  invited_by TEXT NOT NULL REFERENCES users(id),
  status TEXT NOT NULL CHECK (status IN ('pending', 'accepted', 'declined')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP WITH TIME ZONE,
  UNIQUE (workspace_id, email)
);

-- Business Profiles table
CREATE TABLE business_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  industry TEXT,
  description TEXT,
  location TEXT,
  website TEXT,
  employee_count INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Partner Preferences table
CREATE TABLE partner_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  industries TEXT[],
  locations TEXT[],
  min_employee_count INTEGER,
  max_employee_count INTEGER,
  skills_needed TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Row-Level Security Policies

-- Users table policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY users_select_own ON users
  FOR SELECT
  USING (id = current_user_id());

CREATE POLICY users_update_own ON users
  FOR UPDATE
  USING (id = current_user_id());

-- Workspaces table policies
ALTER TABLE workspaces ENABLE ROW LEVEL SECURITY;

CREATE POLICY workspaces_select ON workspaces
  FOR SELECT
  USING (
    id IN (
      SELECT workspace_id 
      FROM workspace_members 
      WHERE user_id = current_user_id()
    )
  );

CREATE POLICY workspaces_insert ON workspaces
  FOR INSERT
  WITH CHECK (created_by = current_user_id());

CREATE POLICY workspaces_update ON workspaces
  FOR UPDATE
  USING (
    id IN (
      SELECT workspace_id 
      FROM workspace_members 
      WHERE user_id = current_user_id() 
      AND role IN ('owner', 'admin')
    )
  );

CREATE POLICY workspaces_delete ON workspaces
  FOR DELETE
  USING (
    id IN (
      SELECT workspace_id 
      FROM workspace_members 
      WHERE user_id = current_user_id() 
      AND role = 'owner'
    )
  );

-- Profiles table policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY profiles_select_own ON profiles
  FOR SELECT
  USING (user_id = current_user_id());

CREATE POLICY profiles_insert_own ON profiles
  FOR INSERT
  WITH CHECK (user_id = current_user_id());

CREATE POLICY profiles_update_own ON profiles
  FOR UPDATE
  USING (user_id = current_user_id());

CREATE POLICY profiles_delete_own ON profiles
  FOR DELETE
  USING (user_id = current_user_id());

-- Workspace Members table policies
ALTER TABLE workspace_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY workspace_members_select ON workspace_members
  FOR SELECT
  USING (
    workspace_id IN (
      SELECT workspace_id 
      FROM workspace_members 
      WHERE user_id = current_user_id()
    )
  );

CREATE POLICY workspace_members_insert ON workspace_members
  FOR INSERT
  WITH CHECK (
    workspace_id IN (
      SELECT workspace_id 
      FROM workspace_members 
      WHERE user_id = current_user_id() 
      AND role IN ('owner', 'admin')
    )
  );

CREATE POLICY workspace_members_update ON workspace_members
  FOR UPDATE
  USING (
    workspace_id IN (
      SELECT workspace_id 
      FROM workspace_members 
      WHERE user_id = current_user_id() 
      AND role IN ('owner', 'admin')
    )
  );

CREATE POLICY workspace_members_delete ON workspace_members
  FOR DELETE
  USING (
    workspace_id IN (
      SELECT workspace_id 
      FROM workspace_members 
      WHERE user_id = current_user_id() 
      AND role IN ('owner', 'admin')
    )
  );

-- Functions

-- Function to get current user ID from Firebase Auth
CREATE OR REPLACE FUNCTION current_user_id() RETURNS TEXT AS $$
BEGIN
  RETURN current_setting('request.jwt.claims.sub', TRUE);
EXCEPTION
  WHEN OTHERS THEN
    RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to automatically create a user record when a new user signs up
CREATE OR REPLACE FUNCTION create_user_on_signup()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO users (id, email, display_name, photo_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.display_name,
    NEW.photo_url
  );
  
  -- Create a default profile for the user
  INSERT INTO profiles (user_id, name, is_default)
  VALUES (NEW.id, COALESCE(NEW.display_name, 'Default Profile'), TRUE);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to automatically create a workspace member record when a user creates a workspace
CREATE OR REPLACE FUNCTION add_creator_as_workspace_owner()
RETURNS TRIGGER AS $$
DECLARE
  default_profile_id UUID;
BEGIN
  -- Find the user's default profile
  SELECT id INTO default_profile_id
  FROM profiles
  WHERE user_id = NEW.created_by AND is_default = TRUE
  LIMIT 1;
  
  -- Add the creator as an owner
  INSERT INTO workspace_members (workspace_id, user_id, profile_id, role)
  VALUES (NEW.id, NEW.created_by, default_profile_id, 'owner');
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Triggers

-- Trigger to create user record on signup
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION create_user_on_signup();

-- Trigger to add workspace creator as owner
CREATE TRIGGER on_workspace_created
AFTER INSERT ON workspaces
FOR EACH ROW
EXECUTE FUNCTION add_creator_as_workspace_owner();

-- Indexes for performance

CREATE INDEX idx_workspace_members_user_id ON workspace_members(user_id);
CREATE INDEX idx_workspace_members_workspace_id ON workspace_members(workspace_id);
CREATE INDEX idx_profiles_user_id ON profiles(user_id);
CREATE INDEX idx_workspace_invitations_email ON workspace_invitations(email);
CREATE INDEX idx_workspace_invitations_workspace_id ON workspace_invitations(workspace_id);
