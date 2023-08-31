export interface UserType {
  id: string;
  email: string;
  is_admin: boolean;
  snippets: string[];
}

export interface UserContextType {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
}