export interface UserType {
  id: number;
  email: string;
  is_admin: boolean;
  picture?: string;
  snippets?: string[];
  snippet_count?: number;
}

export interface UserContextType {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  logout: () => void; 
  login: () => void;
}

export interface SnippetType{
  id: number;
  text_content: string;
  user?: UserType;
  tags?: TagType[];
  user_id: number;
}
export interface TagType{
  name: string;
  id: number;
  snippets?: SnippetType[];
}
