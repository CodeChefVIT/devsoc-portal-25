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

// Interface for the 'team' table
export interface ITeam {
  id: string; // UUID
  name: string; // TEXT, not null
  number_of_people: number; // INTEGER, not null
  round_qualified: number; // INTEGER, not null
  code: string; // TEXT, not null
}

// Interface for the 'score' table
export interface IScore {
  id: string; // UUID
  team_id: string; // UUID, not null
  design?: number; // INTEGER, nullable
  implementation?: number; // INTEGER, nullable
  presentation?: number; // INTEGER, nullable
  round: number; // INTEGER, not null
}

// Interface for the 'submission' table
export interface ISubmission {
  id: string; // UUID
  github_link?: string; // TEXT, nullable
  figma_link?: string; // TEXT, nullable
  ppt_link?: string; // TEXT, nullable
  other_link?: string; // TEXT, nullable
  team_id: string; // UUID, not null
}

// Interface for the 'ideas' table
export interface IIdea {
  id: string; // UUID
  github_link: string;
  figma_link: string;
  other_link: string;
  title: string; // TEXT, not null
  description: string; // TEXT, not null
  track: "Open Innovation" | "Other Track Option 1" | "Other Track Option 2"; // TEXT, not null
}
