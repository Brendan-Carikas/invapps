import { Skill } from '../types/User';

export interface SkillCSV {
  id: string;
  name: string;
  category: string;
}

export const parseSkillsCSV = async (): Promise<SkillCSV[]> => {
  try {
    const response = await fetch('/data/skills.csv');
    const csvText = await response.text();
    
    // Split the CSV into lines and remove the header
    const lines = csvText.split('\n');
    const [header, ...dataRows] = lines;
    
    return dataRows
      .filter((row: string) => row.trim() !== '')
      .map((row: string) => {
        const [id, name, category] = row.split(',');
        return {
          id: id.trim(),
          name: name.trim(),
          category: category.trim()
        };
      });
  } catch (error) {
    console.error('Error parsing skills CSV:', error);
    return [];
  }
};

export const getSkillsByCategory = (skills: SkillCSV[], category: string): SkillCSV[] => {
  return skills.filter(skill => skill.category === category);
};

export const getAllCategories = (skills: SkillCSV[]): string[] => {
  return Array.from(new Set(skills.map(skill => skill.category)));
};