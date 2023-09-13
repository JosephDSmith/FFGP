export interface UserType {
  id: string;
  email: string;
  is_admin: boolean;
  picture?: string;
  snippets?: string[];
}

export interface UserContextType {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
}

export interface SnippetType{
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