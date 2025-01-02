import React, { useState } from 'react';
import { 
  Box, 
  Grid, 
  Paper, 
  Typography, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  OutlinedInput, 
  Chip, 
  Theme, 
  useTheme as useMuiTheme,
  alpha 
} from '@mui/material';
import { useTheme } from './ThemeContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { User } from '../types/User';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Helper functions to generate contact information
const getEmailFromName = (name: string): string => {
  const [firstName, lastName] = name.toLowerCase().split(' ');
  return `${firstName}.${lastName}@company.com`;
};

const getPhoneNumber = (id: number): string => {
  return `+1 (555) ${String(id).padStart(3, '0')}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`;
};

const getLinkedIn = (name: string): string => {
  return `linkedin.com/in/${name.toLowerCase().replace(' ', '')}`;
};

// Base user data without contact info
const baseUsers = [
  // Engineering Team
  { id: 1, name: 'John Doe', team: 'Engineering', location: 'New York', jobRole: 'Software Engineer', imageUrl: '', skills: [
    { skillId: 'javascript', level: 4, yearsOfExperience: 5 },
    { skillId: 'react', level: 4, yearsOfExperience: 3 }
  ]},
  { id: 2, name: 'Sarah Williams', team: 'Engineering', location: 'San Francisco', jobRole: 'Frontend Developer', imageUrl: '', skills: [
    { skillId: 'react', level: 5, yearsOfExperience: 4 },
    { skillId: 'typescript', level: 4, yearsOfExperience: 3 }
  ]},
  { id: 3, name: 'Emily Davis', team: 'Engineering', location: 'London', jobRole: 'Backend Developer', imageUrl: '', skills: [
    { skillId: 'java', level: 4, yearsOfExperience: 6 },
    { skillId: 'spring', level: 4, yearsOfExperience: 4 }
  ]},
  { id: 4, name: 'Maria Garcia', team: 'Engineering', location: 'Berlin', jobRole: 'DevOps Engineer', imageUrl: '', skills: [
    { skillId: 'python', level: 5, yearsOfExperience: 5 },
    { skillId: 'kubernetes', level: 4, yearsOfExperience: 3 }
  ]},
  { id: 5, name: 'Alex Chen', team: 'Engineering', location: 'Singapore', jobRole: 'Software Engineer', imageUrl: '', skills: [
    { skillId: 'cpp', level: 5, yearsOfExperience: 7 },
    { skillId: 'python', level: 4, yearsOfExperience: 4 }
  ]},
  { id: 6, name: 'James Wilson', team: 'Engineering', location: 'Paris', jobRole: 'Frontend Developer', imageUrl: '', skills: [
    { skillId: 'typescript', level: 5, yearsOfExperience: 4 },
    { skillId: 'react', level: 4, yearsOfExperience: 3 }
  ]},
  { id: 31, name: 'Ryan Cooper', team: 'Engineering', location: 'Tokyo', jobRole: 'Backend Developer', imageUrl: '', skills: [
    { skillId: 'ruby', level: 4, yearsOfExperience: 6 },
    { skillId: 'rails', level: 4, yearsOfExperience: 4 }
  ]},
  { id: 32, name: 'Nina Patel', team: 'Engineering', location: 'Sydney', jobRole: 'DevOps Engineer', imageUrl: '', skills: [
    { skillId: 'swift', level: 5, yearsOfExperience: 5 },
    { skillId: 'aws', level: 4, yearsOfExperience: 3 }
  ]},
  { id: 33, name: 'Marcus Wong', team: 'Engineering', location: 'New York', jobRole: 'Software Architect', imageUrl: '', skills: [
    { skillId: 'go', level: 5, yearsOfExperience: 7 },
    { skillId: 'kubernetes', level: 4, yearsOfExperience: 4 }
  ]},
  { id: 34, name: 'Elena Santos', team: 'Engineering', location: 'Berlin', jobRole: 'Systems Engineer', imageUrl: '', skills: [
    { skillId: 'rust', level: 5, yearsOfExperience: 5 },
    { skillId: 'linux', level: 4, yearsOfExperience: 4 }
  ]},
  
  // Design Team
  { id: 7, name: 'Jane Smith', team: 'Design', location: 'San Francisco', jobRole: 'UI Designer', imageUrl: '', skills: [
    { skillId: 'figma', level: 5, yearsOfExperience: 4 },
    { skillId: 'sketch', level: 4, yearsOfExperience: 3 }
  ]},
  { id: 8, name: 'David Wilson', team: 'Design', location: 'New York', jobRole: 'UX Designer', imageUrl: '', skills: [
    { skillId: 'sketch', level: 5, yearsOfExperience: 5 },
    { skillId: 'adobexd', level: 4, yearsOfExperience: 3 }
  ]},
  { id: 9, name: 'Robert Martinez', team: 'Design', location: 'Tokyo', jobRole: 'Visual Designer', imageUrl: '', skills: [
    { skillId: 'adobexd', level: 5, yearsOfExperience: 4 },
    { skillId: 'photoshop', level: 4, yearsOfExperience: 3 }
  ]},
  { id: 10, name: 'Sophie Martin', team: 'Design', location: 'Berlin', jobRole: 'UI Designer', imageUrl: '', skills: [
    { skillId: 'invision', level: 5, yearsOfExperience: 4 },
    { skillId: 'figma', level: 4, yearsOfExperience: 3 }
  ]},
  { id: 11, name: 'Emma Thompson', team: 'Design', location: 'London', jobRole: 'Product Designer', imageUrl: '', skills: [
    { skillId: 'zeplin', level: 5, yearsOfExperience: 4 },
    { skillId: 'sketch', level: 4, yearsOfExperience: 3 }
  ]},
  { id: 35, name: 'Liam Foster', team: 'Design', location: 'Paris', jobRole: 'Motion Designer', imageUrl: '', skills: [
    { skillId: 'aftereffects', level: 5, yearsOfExperience: 4 },
    { skillId: 'blender', level: 4, yearsOfExperience: 3 }
  ]},
  { id: 36, name: 'Yuki Tanaka', team: 'Design', location: 'Singapore', jobRole: 'Interaction Designer', imageUrl: '', skills: [
    { skillId: 'principle', level: 5, yearsOfExperience: 4 },
    { skillId: 'figma', level: 4, yearsOfExperience: 3 }
  ]},
  { id: 37, name: 'Olivia Chen', team: 'Design', location: 'Sydney', jobRole: 'Brand Designer', imageUrl: '', skills: [
    { skillId: 'illustrator', level: 5, yearsOfExperience: 4 },
    { skillId: 'adobexd', level: 4, yearsOfExperience: 3 }
  ]},
  { id: 38, name: 'Aiden Ross', team: 'Design', location: 'San Francisco', jobRole: 'Design Systems', imageUrl: '', skills: [
    { skillId: 'storybook', level: 5, yearsOfExperience: 4 },
    { skillId: 'react', level: 4, yearsOfExperience: 3 }
  ]},
  
  // Product Team
  { id: 12, name: 'Tom Brown', team: 'Product', location: 'Singapore', jobRole: 'Product Manager', imageUrl: '', skills: [
    { skillId: 'jira', level: 5, yearsOfExperience: 4 },
    { skillId: 'productmanagement', level: 5, yearsOfExperience: 6 }
  ]},
  { id: 13, name: 'James Taylor', team: 'Product', location: 'Paris', jobRole: 'Product Owner', imageUrl: '', skills: [
    { skillId: 'asana', level: 4, yearsOfExperience: 3 },
    { skillId: 'agile', level: 5, yearsOfExperience: 5 }
  ]},
  { id: 14, name: 'Linda Chen', team: 'Product', location: 'Tokyo', jobRole: 'Product Manager', imageUrl: '', skills: [
    { skillId: 'trello', level: 5, yearsOfExperience: 4 },
    { skillId: 'productmanagement', level: 5, yearsOfExperience: 6 }
  ]},
  { id: 15, name: 'Michael Scott', team: 'Product', location: 'Sydney', jobRole: 'Product Analyst', imageUrl: '', skills: [
    { skillId: 'excel', level: 5, yearsOfExperience: 4 },
    { skillId: 'dataanalysis', level: 4, yearsOfExperience: 3 }
  ]},
  { id: 39, name: 'Sofia Rodriguez', team: 'Product', location: 'London', jobRole: 'Product Strategist', imageUrl: '', skills: [
    { skillId: 'tableau', level: 5, yearsOfExperience: 4 },
    { skillId: 'productstrategy', level: 5, yearsOfExperience: 6 }
  ]},
  { id: 40, name: 'Lucas Kim', team: 'Product', location: 'New York', jobRole: 'Product Operations', imageUrl: '', skills: [
    { skillId: 'powerbi', level: 5, yearsOfExperience: 4 },
    { skillId: 'productoperations', level: 5, yearsOfExperience: 6 }
  ]},
  { id: 41, name: 'Eva Weber', team: 'Product', location: 'Berlin', jobRole: 'Technical Product Manager', imageUrl: '', skills: [
    { skillId: 'sql', level: 5, yearsOfExperience: 4 },
    { skillId: 'technicalproductmanagement', level: 5, yearsOfExperience: 6 }
  ]},
  
  // Marketing Team
  { id: 16, name: 'Mike Johnson', team: 'Marketing', location: 'London', jobRole: 'Marketing Manager', imageUrl: '', skills: [
    { skillId: 'googleanalytics', level: 5, yearsOfExperience: 5 },
    { skillId: 'digitalmarketing', level: 5, yearsOfExperience: 7 }
  ]},
  { id: 17, name: 'Lisa Anderson', team: 'Marketing', location: 'New York', jobRole: 'Content Strategist', imageUrl: '', skills: [
    { skillId: 'contentmarketing', level: 5, yearsOfExperience: 4 },
    { skillId: 'seo', level: 4, yearsOfExperience: 3 }
  ]},
  { id: 18, name: 'Jennifer Lee', team: 'Marketing', location: 'San Francisco', jobRole: 'Digital Marketing', imageUrl: '', skills: [
    { skillId: 'hubspot', level: 5, yearsOfExperience: 4 },
    { skillId: 'digitalmarketing', level: 5, yearsOfExperience: 6 }
  ]},
  { id: 19, name: 'Chris Evans', team: 'Marketing', location: 'Berlin', jobRole: 'Marketing Specialist', imageUrl: '', skills: [
    { skillId: 'mailchimp', level: 5, yearsOfExperience: 4 },
    { skillId: 'marketingspecialist', level: 5, yearsOfExperience: 6 }
  ]},
  { id: 20, name: 'Anna Kim', team: 'Marketing', location: 'Singapore', jobRole: 'Content Creator', imageUrl: '', skills: [
    { skillId: 'canva', level: 5, yearsOfExperience: 4 },
    { skillId: 'contentcreation', level: 5, yearsOfExperience: 6 }
  ]},
  { id: 42, name: 'Hugo Martinez', team: 'Marketing', location: 'Paris', jobRole: 'Brand Manager', imageUrl: '', skills: [
    { skillId: 'hootsuite', level: 5, yearsOfExperience: 4 },
    { skillId: 'brandmanagement', level: 5, yearsOfExperience: 6 }
  ]},
  { id: 43, name: 'Zara Ali', team: 'Marketing', location: 'Tokyo', jobRole: 'Growth Manager', imageUrl: '', skills: [
    { skillId: 'ahrefs', level: 5, yearsOfExperience: 4 },
    { skillId: 'growthmanagement', level: 5, yearsOfExperience: 6 }
  ]},
  { id: 44, name: 'Ben Thompson', team: 'Marketing', location: 'Sydney', jobRole: 'SEO Specialist', imageUrl: '', skills: [
    { skillId: 'semrush', level: 5, yearsOfExperience: 4 },
    { skillId: 'seospecialist', level: 5, yearsOfExperience: 6 }
  ]},
  
  // Sales Team
  { id: 21, name: 'Daniel Brown', team: 'Sales', location: 'Tokyo', jobRole: 'Sales Manager', imageUrl: '', skills: [
    { skillId: 'salesforce', level: 5, yearsOfExperience: 6 },
    { skillId: 'negotiation', level: 5, yearsOfExperience: 8 }
  ]},
  { id: 22, name: 'Rachel Green', team: 'Sales', location: 'Sydney', jobRole: 'Account Executive', imageUrl: '', skills: [
    { skillId: 'hubspotcrm', level: 4, yearsOfExperience: 3 },
    { skillId: 'salesmanagement', level: 4, yearsOfExperience: 4 }
  ]},
  { id: 23, name: 'Thomas Mueller', team: 'Sales', location: 'Paris', jobRole: 'Sales Representative', imageUrl: '', skills: [
    { skillId: 'zohocrm', level: 5, yearsOfExperience: 4 },
    { skillId: 'salesrepresentative', level: 5, yearsOfExperience: 6 }
  ]},
  { id: 24, name: 'Sophia Lee', team: 'Sales', location: 'London', jobRole: 'Account Manager', imageUrl: '', skills: [
    { skillId: 'pipedrive', level: 5, yearsOfExperience: 4 },
    { skillId: 'accountmanagement', level: 5, yearsOfExperience: 6 }
  ]},
  { id: 45, name: 'Gabriel Santos', team: 'Sales', location: 'New York', jobRole: 'Business Development', imageUrl: '', skills: [
    { skillId: 'linkedinsalesnavigator', level: 5, yearsOfExperience: 4 },
    { skillId: 'businessdevelopment', level: 5, yearsOfExperience: 6 }
  ]},
  { id: 46, name: 'Isabella Chen', team: 'Sales', location: 'San Francisco', jobRole: 'Sales Operations', imageUrl: '', skills: [
    { skillId: 'salesforcecpq', level: 5, yearsOfExperience: 4 },
    { skillId: 'salesoperations', level: 5, yearsOfExperience: 6 }
  ]},
  { id: 47, name: 'Max Weber', team: 'Sales', location: 'Berlin', jobRole: 'Enterprise Sales', imageUrl: '', skills: [
    { skillId: 'oraclecrm', level: 5, yearsOfExperience: 4 },
    { skillId: 'enterprisesales', level: 5, yearsOfExperience: 6 }
  ]},
  { id: 48, name: 'Lily Zhang', team: 'Sales', location: 'Singapore', jobRole: 'Solutions Consultant', imageUrl: '', skills: [
    { skillId: 'microsoftdynamics', level: 5, yearsOfExperience: 4 },
    { skillId: 'solutionsconsultant', level: 5, yearsOfExperience: 6 }
  ]},
  
  // Support Team
  { id: 25, name: 'Oliver Taylor', team: 'Support', location: 'Berlin', jobRole: 'Support Manager', imageUrl: '', skills: [
    { skillId: 'zendesk', level: 5, yearsOfExperience: 4 },
    { skillId: 'customersupport', level: 5, yearsOfExperience: 6 }
  ]},
  { id: 26, name: 'Isabella Garcia', team: 'Support', location: 'New York', jobRole: 'Customer Success', imageUrl: '', skills: [
    { skillId: 'freshdesk', level: 4, yearsOfExperience: 3 },
    { skillId: 'customerservice', level: 5, yearsOfExperience: 5 }
  ]},
  { id: 27, name: 'William Zhang', team: 'Support', location: 'San Francisco', jobRole: 'Technical Support', imageUrl: '', skills: [
    { skillId: 'jiraservicemanagement', level: 5, yearsOfExperience: 4 },
    { skillId: 'technicalsupport', level: 5, yearsOfExperience: 6 }
  ]},
  { id: 28, name: 'Ava Wilson', team: 'Support', location: 'Tokyo', jobRole: 'Support Specialist', imageUrl: '', skills: [
    { skillId: 'servicenow', level: 5, yearsOfExperience: 4 },
    { skillId: 'supportspecialist', level: 5, yearsOfExperience: 6 }
  ]},
  { id: 29, name: 'Lucas Kim', team: 'Support', location: 'Singapore', jobRole: 'Customer Success', imageUrl: '', skills: [
    { skillId: 'gainsight', level: 5, yearsOfExperience: 4 },
    { skillId: 'customersuccess', level: 5, yearsOfExperience: 6 }
  ]},
  { id: 30, name: 'Mia Johnson', team: 'Support', location: 'Paris', jobRole: 'Technical Support', imageUrl: '', skills: [
    { skillId: 'kustomer', level: 5, yearsOfExperience: 4 },
    { skillId: 'technicalsupport', level: 5, yearsOfExperience: 6 }
  ]},
  { id: 49, name: 'Noah Parker', team: 'Support', location: 'London', jobRole: 'Implementation Specialist', imageUrl: '', skills: [
    { skillId: 'asana', level: 5, yearsOfExperience: 4 },
    { skillId: 'implementationspecialist', level: 5, yearsOfExperience: 6 }
  ]},
  { id: 50, name: 'Emma Davis', team: 'Support', location: 'Sydney', jobRole: 'Customer Experience', imageUrl: '', skills: [
    { skillId: 'medallia', level: 5, yearsOfExperience: 4 },
    { skillId: 'customerexperience', level: 5, yearsOfExperience: 6 }
  ]},
  { id: 51, name: 'Leo Martinez', team: 'Support', location: 'Berlin', jobRole: 'Support Operations', imageUrl: '', skills: [
    { skillId: 'sapcrm', level: 5, yearsOfExperience: 4 },
    { skillId: 'supportoperations', level: 5, yearsOfExperience: 6 }
  ]},
  { id: 52, name: 'Victoria Wong', team: 'Support', location: 'Paris', jobRole: 'Technical Advisor', imageUrl: '', skills: [
    { skillId: 'microsoftdynamics', level: 5, yearsOfExperience: 4 },
    { skillId: 'technicaladvisor', level: 5, yearsOfExperience: 6 }
  ]}
];

// Generate complete mock data with contact info
const mockUsers: User[] = baseUsers.map(user => ({
  ...user,
  email: getEmailFromName(user.name),
  phone: getPhoneNumber(user.id),
  linkedin: getLinkedIn(user.name)
}));

const Dashboard: React.FC = () => {
  const muiTheme = useMuiTheme();
  const { headingFontWeights, pageTitleFontSize, headingFont } = useTheme();
  const isDarkMode = muiTheme.palette.mode === 'dark';

  // Process data for Roles by Location
  const rolesByLocation = mockUsers.reduce((acc: Record<string, Record<string, number>>, user: User) => {
    if (!acc[user.jobRole]) {
      acc[user.jobRole] = {};
    }
    acc[user.jobRole][user.location] = (acc[user.jobRole][user.location] || 0) + 1;
    return acc;
  }, {});

  // Process data for Roles by Team
  const rolesByTeam = mockUsers.reduce((acc: Record<string, Record<string, number>>, user: User) => {
    if (!acc[user.jobRole]) {
      acc[user.jobRole] = {};
    }
    acc[user.jobRole][user.team] = (acc[user.jobRole][user.team] || 0) + 1;
    return acc;
  }, {});

  // Process data for Teams by Location
  const teamsByLocation = mockUsers.reduce((acc: Record<string, Record<string, number>>, user: User) => {
    if (!acc[user.team]) {
      acc[user.team] = {};
    }
    acc[user.team][user.location] = (acc[user.team][user.location] || 0) + 1;
    return acc;
  }, {});

  // Process data for Skills by Location
  const skillsByLocation = mockUsers.reduce((acc: Record<string, Record<string, number>>, user: User) => {
    user.skills?.forEach(userSkill => {
      if (!acc[userSkill.skillId]) {
        acc[userSkill.skillId] = {};
      }
      acc[userSkill.skillId][user.location] = (acc[userSkill.skillId][user.location] || 0) + 1;
    });
    return acc;
  }, {});

  // Process data for Skills by Team
  const skillsByTeam = mockUsers.reduce((acc: Record<string, Record<string, number>>, user: User) => {
    user.skills?.forEach(userSkill => {
      if (!acc[userSkill.skillId]) {
        acc[userSkill.skillId] = {};
      }
      acc[userSkill.skillId][user.team] = (acc[userSkill.skillId][user.team] || 0) + 1;
    });
    return acc;
  }, {});

  // Add state for legend visibility
  const [roleLocationVisibility, setRoleLocationVisibility] = useState<Record<string, boolean>>({});
  const [roleTeamVisibility, setRoleTeamVisibility] = useState<Record<string, boolean>>({});
  const [teamLocationVisibility, setTeamLocationVisibility] = useState<Record<string, boolean>>({});
  const [skillLocationVisibility, setSkillLocationVisibility] = useState<Record<string, boolean>>({});
  const [skillTeamVisibility, setSkillTeamVisibility] = useState<Record<string, boolean>>({});

  // Initialize visibility state when data changes
  React.useEffect(() => {
    const initVisibility = (data: any) => 
      Object.keys(data).reduce((acc, key) => ({ ...acc, [key]: false }), {});

    setRoleLocationVisibility(initVisibility(rolesByLocation));
    setRoleTeamVisibility(initVisibility(rolesByTeam));
    setTeamLocationVisibility(initVisibility(teamsByLocation));
    setSkillLocationVisibility(initVisibility(skillsByLocation));
    setSkillTeamVisibility(initVisibility(skillsByTeam));
  }, []);

  // Generate accessible colors with proper contrast for dark mode
  const generateAccessibleColors = (count: number): { background: string; text: string }[] => {
    return Array.from({ length: count }, (_, i) => {
      const hue = (i * 360) / count;
      // Adjust saturation and lightness based on theme mode
      const background = isDarkMode
        ? `hsl(${hue}, 80%, 65%)` // Brighter colors for dark mode
        : `hsl(${hue}, 65%, 35%)`; // Darker colors for light mode
      
      // Ensure text contrast
      const textColor = isDarkMode ? '#000000' : '#ffffff';
      return { background, text: textColor };
    });
  };

  // Update chart options with custom legend and dark mode support
  const getChartOptions = (title: string) => {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: title,
          color: muiTheme.palette.text.primary,
          font: {
            size: 22,
            weight: 500
          },
          padding: {
            bottom: 10
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1,
            color: muiTheme.palette.text.secondary,
          },
          grid: {
            color: isDarkMode 
              ? 'rgba(255, 255, 255, 0.1)'
              : 'rgba(0, 0, 0, 0.1)',
          }
        },
        x: {
          ticks: {
            color: muiTheme.palette.text.secondary,
          },
          grid: {
            color: isDarkMode 
              ? 'rgba(255, 255, 255, 0.1)'
              : 'rgba(0, 0, 0, 0.1)',
          }
        }
      }
    };
  };

  // Custom legend components with dark mode support
  const LegendSelect = ({ items, visibility, setVisibility, title }: {
    items: string[];
    visibility: Record<string, boolean>;
    setVisibility: (value: Record<string, boolean>) => void;
    title: string;
  }) => {
    const colors = generateAccessibleColors(items.length);
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 250,
        },
      },
    };

    const handleChange = (event: any) => {
      const selectedItems = event.target.value as string[];
      const newVisibility = items.reduce((acc, item) => ({
        ...acc,
        [item]: selectedItems.includes(item),
      }), {});
      setVisibility(newVisibility);
    };

    const selectedItems = Object.entries(visibility)
      .filter(([_, isVisible]) => isVisible)
      .map(([item]) => item);

    return (
      <Box sx={{ mt: 2 }}>
        <FormControl fullWidth>
          <InputLabel id={`${title}-label`}>{title}</InputLabel>
          <Select
            labelId={`${title}-label`}
            multiple
            value={selectedItems}
            onChange={handleChange}
            input={<OutlinedInput label={title} />}
            MenuProps={MenuProps}
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: isDarkMode 
                  ? 'rgba(255, 255, 255, 0.23)'
                  : 'rgba(0, 0, 0, 0.23)',
              },
            }}
          >
            {items.map((item, index) => (
              <MenuItem
                key={item}
                value={item}
                sx={{
                  fontWeight: muiTheme.typography.fontWeightRegular,
                  '&.Mui-selected': {
                    backgroundColor: `${colors[index].background}20`,
                  },
                }}
              >
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 0.5,
            mt: 1,
            p: 1,
            borderRadius: 1,
            backgroundColor: isDarkMode 
              ? 'rgba(255, 255, 255, 0.05)'
              : 'background.paper'
          }}
        >
          {selectedItems.map((value) => {
            const colorIndex = items.indexOf(value);
            const { background } = colors[colorIndex];
            return (
              <Chip
                key={value}
                label={value}
                onDelete={() => {
                  const newVisibility = { ...visibility, [value]: false };
                  setVisibility(newVisibility);
                }}
                size="small"
                sx={{
                  backgroundColor: '#333333',
                  color: '#ffffff',
                  borderColor: background,
                  '& .MuiChip-deleteIcon': {
                    color: '#ffffff',
                    '&:hover': {
                      color: 'rgba(255, 255, 255, 0.8)',
                    },
                  },
                  '&:hover': {
                    backgroundColor: '#444444',
                  },
                }}
              />
            );
          })}
        </Box>
      </Box>
    );
  };

  // Filter datasets based on visibility
  const rolesByLocationData = {
    labels: Array.from(new Set(mockUsers.map(user => user.location))),
    datasets: Object.entries(rolesByLocation)
      .filter(([role]) => roleLocationVisibility[role] !== false)
      .map(([role, locations], index) => ({
        label: role,
        data: Object.values(locations),
        backgroundColor: generateAccessibleColors(Object.keys(rolesByLocation).length)[index].background,
      }))
  };

  const rolesByTeamData = {
    labels: Array.from(new Set(mockUsers.map(user => user.team))),
    datasets: Object.entries(rolesByTeam)
      .filter(([role]) => roleTeamVisibility[role] !== false)
      .map(([role, teams], index) => ({
        label: role,
        data: Object.values(teams),
        backgroundColor: generateAccessibleColors(Object.keys(rolesByTeam).length)[index].background,
      }))
  };

  const teamsByLocationData = {
    labels: Array.from(new Set(mockUsers.map(user => user.location))),
    datasets: Object.entries(teamsByLocation)
      .filter(([team]) => teamLocationVisibility[team] !== false)
      .map(([team, locations], index) => ({
        label: team,
        data: Object.values(locations),
        backgroundColor: generateAccessibleColors(Object.keys(teamsByLocation).length)[index].background,
      }))
  };

  const skillsByLocationData = {
    labels: Array.from(new Set(mockUsers.map(user => user.location))),
    datasets: Object.entries(skillsByLocation)
      .filter(([skillId]) => skillLocationVisibility[skillId] !== false)
      .map(([skillId, locations], index) => ({
        label: skillId,
        data: Object.values(locations),
        backgroundColor: generateAccessibleColors(Object.keys(skillsByLocation).length)[index].background,
      }))
  };

  const skillsByTeamData = {
    labels: Array.from(new Set(mockUsers.map(user => user.team))),
    datasets: Object.entries(skillsByTeam)
      .filter(([skillId]) => skillTeamVisibility[skillId] !== false)
      .map(([skillId, teams], index) => ({
        label: skillId,
        data: Object.values(teams),
        backgroundColor: generateAccessibleColors(Object.keys(skillsByTeam).length)[index].background,
      }))
  };

  return (
    <Box sx={{ width: '100%', pt: 2, p: 3 }}>
      <Typography 
        component="h1" 
        sx={{ 
          fontWeight: headingFontWeights?.pageTitle || 700,
          fontSize: pageTitleFontSize,
          fontFamily: headingFont,
          mb: 3
        }}
      >
        Analytics dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper 
            sx={{ 
              p: 3,
              backgroundColor: isDarkMode
                ? alpha(muiTheme.palette.background.paper, 0.8)
                : muiTheme.palette.background.paper,
              boxShadow: isDarkMode
                ? '0 2px 8px rgba(0, 0, 0, 0.3)'
                : '0 2px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Box sx={{ height: 320, mb: 3 }}>
              <Bar data={rolesByLocationData} options={getChartOptions('Roles by Location')} />
            </Box>
            <LegendSelect
              items={Object.keys(rolesByLocation)}
              visibility={roleLocationVisibility}
              setVisibility={setRoleLocationVisibility}
              title="Select Roles"
            />
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper 
            sx={{ 
              p: 3,
              backgroundColor: isDarkMode
                ? alpha(muiTheme.palette.background.paper, 0.8)
                : muiTheme.palette.background.paper,
              boxShadow: isDarkMode
                ? '0 2px 8px rgba(0, 0, 0, 0.3)'
                : '0 2px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Box sx={{ height: 320, mb: 3 }}>
              <Bar data={rolesByTeamData} options={getChartOptions('Roles by Team')} />
            </Box>
            <LegendSelect
              items={Object.keys(rolesByTeam)}
              visibility={roleTeamVisibility}
              setVisibility={setRoleTeamVisibility}
              title="Select Roles"
            />
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper 
            sx={{ 
              p: 3,
              backgroundColor: isDarkMode
                ? alpha(muiTheme.palette.background.paper, 0.8)
                : muiTheme.palette.background.paper,
              boxShadow: isDarkMode
                ? '0 2px 8px rgba(0, 0, 0, 0.3)'
                : '0 2px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Box sx={{ height: 320, mb: 3 }}>
              <Bar data={teamsByLocationData} options={getChartOptions('Teams by Location')} />
            </Box>
            <LegendSelect
              items={Object.keys(teamsByLocation)}
              visibility={teamLocationVisibility}
              setVisibility={setTeamLocationVisibility}
              title="Select Teams"
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper 
            sx={{ 
              p: 3,
              backgroundColor: isDarkMode
                ? alpha(muiTheme.palette.background.paper, 0.8)
                : muiTheme.palette.background.paper,
              boxShadow: isDarkMode
                ? '0 2px 8px rgba(0, 0, 0, 0.3)'
                : '0 2px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Box sx={{ height: 320, mb: 3 }}>
              <Bar data={skillsByLocationData} options={getChartOptions('Skills by Location')} />
            </Box>
            <LegendSelect
              items={Object.keys(skillsByLocation)}
              visibility={skillLocationVisibility}
              setVisibility={setSkillLocationVisibility}
              title="Select Skills"
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper 
            sx={{ 
              p: 3,
              backgroundColor: isDarkMode
                ? alpha(muiTheme.palette.background.paper, 0.8)
                : muiTheme.palette.background.paper,
              boxShadow: isDarkMode
                ? '0 2px 8px rgba(0, 0, 0, 0.3)'
                : '0 2px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Box sx={{ height: 320, mb: 3 }}>
              <Bar data={skillsByTeamData} options={getChartOptions('Skills by Team')} />
            </Box>
            <LegendSelect
              items={Object.keys(skillsByTeam)}
              visibility={skillTeamVisibility}
              setVisibility={setSkillTeamVisibility}
              title="Select Skills"
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;