export interface Skill {
    id: string;
    name: string;
    category: string;
}

export interface UserSkill {
    skillId: string;
    level: number; // 1-5 proficiency level
    yearsOfExperience: number;
}

export interface User {
    id: number;
    name: string;
    team: string;
    location: string;
    jobRole: string;
    imageUrl: string;
    email: string;
    phone: string;
    linkedin: string;
    managerId?: number; 
    directReports?: number[]; 
    skills?: UserSkill[];
}
