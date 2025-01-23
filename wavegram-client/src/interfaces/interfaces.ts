import { ReactNode } from "react";

export interface iconBtn {
    text: string;
    onClick?: () => void;
    children?: ReactNode;     
    disabled?: boolean;       
    outline?: boolean;         
    customClasses?: string;    
    type?: "button" | "submit" | "reset";
}

export interface signupInterface{
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface  loginInterface{
    email: string;
    password: string;
}

export interface FormProps {
    children: React.ReactNode;
  }

export interface BasicDetailsInterface {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zip: string;
}
  
export interface PersonalDetailsInterface {
    dob: string;
    gender: string;
    phone: string;
    email: string;
  }

  export interface PreferencesInterface {
    language: string;
    breakfast: string;
    lunch: string;
    dinner: string;
    wakeTime: string;
    bedTime: string;
    weight: string;
    height: string;
    sms: boolean;
    post: boolean;
  }
  
  export interface FriendInterface {
    fullName: string;
    email: string;
    message: string;
  }

  export interface WaveInterface {
    photos: string;
    videos: string;
    post: string;
  }

  export interface PasswordChangeInterface {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }

  export interface UserDetails {
    id: number;
    profilePhoto: string | null;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    gender: 'Male' | 'Female' | 'Other';
    address: string;
    state: string;
    city: string;
    zip: string;
    password: string;
    isDeleted: boolean;
    isActive: boolean;
    status: boolean;
  }
  