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
  image_content: string;
  text_content: string;
  user?: UserType;
  tags?: TagType[];
}
export interface TagType{
  name: string;
  id: number;
  snippets: SnippetType[];
}

export interface Tag {
  id: number;
  name: string;
}

export interface Snippet {
  id: number;
  image_content: string;
  text_content: string;
  user?: UserType;
  tags?: TagType[];
}
