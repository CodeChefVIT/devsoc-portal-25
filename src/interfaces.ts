// Interface for the 'user' table



interface TeamMember {
  first_name: string;
  last_name: string;
  email: string;
  phone_no: string;
  github_profile: string;
  is_leader: boolean;
}

export interface ITeam {
  team_name: string;
  number_of_people: number;
  round_qualified: number;
  code: string;
  members: TeamMember[];
}

export interface Me {
  message: string;
  user: IUser;
  team: ITeam;
}


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
export interface APIResponse<T> {
  status: string;
  message: string;
  data: T;
}

// Interface for the 'submission' table
export interface ISubmission {
  title: string;
  description: string;
  track: "Open Innovation"| "Other Track Option 1"| "Other Track Option 2";
  github_link: string; // TEXT, nullable
  figma_link: string; // TEXT, nullable
  other_link: string; // TEXT, nullable
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
