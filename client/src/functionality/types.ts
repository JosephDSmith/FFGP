export interface UserType {
  id: number;
  email: string;
  is_admin: boolean;
  picture?: string;
  snippets?: string[];
}

export interface UserContextType {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  logout: () => void; 
}

export interface SnippetType{
  id: number;
  text_content: string;
  user?: UserType;
  tags?: TagType[];
}
export interface TagType{
  name: string;
  id: number;
  snippets?: SnippetType[];
}
