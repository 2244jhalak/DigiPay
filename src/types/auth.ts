export interface IAuth {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "user" | "agent" | "admin"; 
  isBlocked?: boolean;   
  isApproved?: "approve" | "suspend";
  profileImage?: string;  
  updatedAt?: Date;
}

export interface WalletType {
  id: string;
  user: {
    name: string;
    email: string;
    role: string;
  };
  balance: number;
  isBlocked: boolean;
  createdAt: string;
  updatedAt: string;
}