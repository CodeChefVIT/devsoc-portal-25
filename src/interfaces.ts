// Interface for the 'user' table
export interface IUser {
  first_name: string;
  last_name: string;
  email: string;
  is_leader: boolean;
  reg_no: string;
  phone_no: string;
  gender: "M" | "F" | "O";
  vit_email: string;
  hostel_block: string;
  room_no: number;
  github_profile: string;
}


// Interface for the 'submission' table
export interface ISubmission {
  github_link?: string; // TEXT, nullable
  figma_link?: string; // TEXT, nullable
  ppt_link?: string; // TEXT, nullable
  other_link?: string; // TEXT, nullable
  team_id: string; // UUID, not null
}

// Interface for the 'ideas' table
export interface IIdea {
  github_link: string;
  figma_link: string;
  other_link: string;
  title: string; // TEXT, not null
  description: string; // TEXT, not null
  track: "Open Innovation" | "Other Track Option 1" | "Other Track Option 2"; // TEXT, not null
}
