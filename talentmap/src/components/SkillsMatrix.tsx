import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Rating,
  Stack,
  Tooltip,
  Alert,
  OutlinedInput,
  Checkbox,
  ListItemText,
  SelectChangeEvent,
  ToggleButton,
  Autocomplete,
  Tabs,
  Tab
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon } from '@mui/icons-material';
import { parseSkillsCSV, SkillCSV, getSkillsByCategory, getAllCategories } from '../utils/skillsUtils';
import { useUsers } from './UserContext';
import { useTheme } from './ThemeContext';
import { User, UserSkill } from '../types/User';

interface SkillDialogProps {
  open: boolean;
  onClose: () => void;
  user: User;
  allSkills: SkillCSV[];
  onSave: (userId: number, newSkills: UserSkill[]) => void;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`skills-tabpanel-${index}`}
      aria-labelledby={`skills-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `skills-tab-${index}`,
    'aria-controls': `skills-tabpanel-${index}`,
  };
}

const skillLevelDescriptions = {
  1: "Beginner - Basic knowledge, needs guidance",
  2: "Intermediate - Can work with supervision",
  3: "Proficient - Works independently on most tasks",
  4: "Advanced - Deep knowledge, can teach others",
  5: "Expert - Subject matter expert, leads initiatives"
};

const yearsOfExperienceRules = {
  1: { min: 0, max: 2 },
  2: { min: 1, max: 3 },
  3: { min: 2, max: 5 },
  4: { min: 3, max: 8 },
  5: { min: 5, max: 999 }
};

const SkillDialog: React.FC<SkillDialogProps> = ({ open, onClose, user, allSkills, onSave }) => {
  const [selectedSkills, setSelectedSkills] = useState<UserSkill[]>(user.skills || []);
  const [newSkill, setNewSkill] = useState<string>('');
  const [newSkillLevel, setNewSkillLevel] = useState<number>(3);
  const [newSkillYears, setNewSkillYears] = useState<number>(1);
  const [validationError, setValidationError] = useState<string>('');

  const validateSkillLevel = (level: number, years: number): string | null => {
    const rule = yearsOfExperienceRules[level as keyof typeof yearsOfExperienceRules];
    if (!rule) return "Invalid skill level";
    
    if (years < rule.min) {
      return `Level ${level} requires at least ${rule.min} year${rule.min !== 1 ? 's' : ''} of experience`;
    }
    if (years > rule.max) {
      return `Level ${level} typically has up to ${rule.max} year${rule.max !== 1 ? 's' : ''} of experience`;
    }
    
    return null;
  };

  const handleAddSkill = () => {
    if (!newSkill) return;
    
    if (selectedSkills.some(skill => skill.skillId === newSkill)) {
      setValidationError('This skill has already been added');
      return;
    }

    const validationError = validateSkillLevel(newSkillLevel, newSkillYears);
    if (validationError) {
      setValidationError(validationError);
      return;
    }
    
    setSelectedSkills(prev => [
      ...prev,
      {
        skillId: newSkill,
        level: newSkillLevel,
        yearsOfExperience: newSkillYears
      }
    ]);
    
    setNewSkill('');
    setNewSkillLevel(3);
    setNewSkillYears(1);
    setValidationError('');
  };

  useEffect(() => {
    if (newSkillLevel && newSkillYears) {
      const error = validateSkillLevel(newSkillLevel, newSkillYears);
      setValidationError(error || '');
    }
  }, [newSkillLevel, newSkillYears]);

  const handleRemoveSkill = (skillId: string) => {
    setSelectedSkills(prev => prev.filter(skill => skill.skillId !== skillId));
  };

  const handleSave = () => {
    onSave(user.id, selectedSkills);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit Skills - {user.name}</DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 2 }}>
          {validationError && (
            <Alert severity="error" onClose={() => setValidationError('')}>
              {validationError}
            </Alert>
          )}
          
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-end' }}>
            <FormControl fullWidth>
              <InputLabel>Add Skill</InputLabel>
              <Select
                value={newSkill}
                label="Add Skill"
                onChange={(e) => setNewSkill(e.target.value)}
              >
                {allSkills
                  .filter(skill => !selectedSkills.some(s => s.skillId === skill.id))
                  .map(skill => (
                    <MenuItem key={skill.id} value={skill.id}>
                      {skill.name} ({skill.category})
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 120 }}>
              <Typography component="legend">Level</Typography>
              <Tooltip 
                title={
                  <Box>
                    {Object.entries(skillLevelDescriptions).map(([level, desc]) => (
                      <Typography key={level} variant="caption" display="block">
                        {level}★: {desc}
                      </Typography>
                    ))}
                  </Box>
                }
                arrow
              >
                <Rating
                  value={newSkillLevel}
                  onChange={(_, value) => {
                    setNewSkillLevel(value || 3);
                    setValidationError('');
                  }}
                />
              </Tooltip>
            </Box>
            <Tooltip title={
              `Years of experience required for level ${newSkillLevel}: 
               ${yearsOfExperienceRules[newSkillLevel as keyof typeof yearsOfExperienceRules].min}-
               ${yearsOfExperienceRules[newSkillLevel as keyof typeof yearsOfExperienceRules].max} years`
            }>
              <TextField
                label="Years"
                type="number"
                value={newSkillYears}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setNewSkillYears(value);
                  setValidationError('');
                }}
                sx={{ width: 100 }}
                inputProps={{ 
                  min: yearsOfExperienceRules[newSkillLevel as keyof typeof yearsOfExperienceRules].min,
                  step: 1 
                }}
                error={!!validationError}
              />
            </Tooltip>
            <Button
              variant="contained"
              onClick={handleAddSkill}
              disabled={!newSkill || !!validationError}
              startIcon={<AddIcon />}
            >
              Add
            </Button>
          </Box>

          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {selectedSkills.map(userSkill => {
              const skill = allSkills.find(s => s.id === userSkill.skillId);
              return skill ? (
                <Chip
                  key={userSkill.skillId}
                  label={`${skill.name} (${userSkill.level}★, ${userSkill.yearsOfExperience}y)`}
                  onDelete={() => handleRemoveSkill(userSkill.skillId)}
                  color="primary"
                />
              ) : null;
            })}
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

const calculateSkillGaps = (users: User[], skills: SkillCSV[], teams: string[]) => {
  const gaps: Record<string, Record<string, number>> = {};

  // Initialize gaps object
  teams.forEach(team => {
    gaps[team] = {};
    skills.forEach(skill => {
      gaps[team][skill.id] = 0;
    });
  });

  // Calculate team sizes
  const teamSizes: Record<string, number> = {};
  teams.forEach(team => {
    teamSizes[team] = users.filter(user => user.team === team).length;
  });

  // Count users with each skill per team
  users.forEach(user => {
    if (!user.team || !user.skills) return;
    
    user.skills.forEach(userSkill => {
      if (gaps[user.team] && gaps[user.team][userSkill.skillId] !== undefined) {
        gaps[user.team][userSkill.skillId]++;
      }
    });
  });

  // Convert counts to percentages
  teams.forEach(team => {
    const teamSize = teamSizes[team];
    if (teamSize > 0) {
      Object.keys(gaps[team]).forEach(skillId => {
        gaps[team][skillId] = (gaps[team][skillId] / teamSize) * 100;
      });
    }
  });

  return gaps;
};

const getColorForPercentage = (percentage: number): string => {
  // Red for low coverage (0%), green for high coverage (100%)
  const hue = (percentage * 120) / 100; // 0 is red, 120 is green
  return `hsl(${hue}, 70%, 50%)`;
};

const SkillsMatrix: React.FC = () => {
  const { users, setUsers } = useUsers();
  const { headingFontWeights, pageTitleFontSize, headingFont } = useTheme();
  const [skills, setSkills] = useState<SkillCSV[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [tabValue, setTabValue] = useState(0);
  const [reportFilterType, setReportFilterType] = useState<'team' | 'skill'>('team');
  const [reportSelectedTeams, setReportSelectedTeams] = useState<string[]>([]);
  const [reportSelectedSkills, setReportSelectedSkills] = useState<string[]>([]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    const loadSkills = async () => {
      const loadedSkills = await parseSkillsCSV();
      console.log('Loaded skills:', loadedSkills);
      setSkills(loadedSkills);
      setCategories(getAllCategories(loadedSkills));
    };
    
    loadSkills();
  }, []);

  const teams = React.useMemo(() => {
    const uniqueTeams = Array.from(new Set(users.map(user => user.team))).filter(Boolean);
    console.log('Available teams:', uniqueTeams);
    return uniqueTeams;
  }, [users]);

  const handleTeamToggle = (team: string) => {
    setSelectedTeams(prev => {
      const isSelected = prev.includes(team);
      const newTeams = isSelected 
        ? prev.filter(t => t !== team)
        : [...prev, team];
      console.log('Toggling team:', team, 'Current selected:', prev, 'New selected:', newTeams);
      return newTeams;
    });
  };

  const filteredUsers = React.useMemo(() => {
    console.log('Filtering users with teams:', selectedTeams);
    return users.filter(user => {
      const matchesTeam = selectedTeams.length === 0 || selectedTeams.includes(user.team);
      const matchesSkills = selectedSkills.length === 0 || 
        user.skills?.some(userSkill => selectedSkills.includes(userSkill.skillId));
      
      console.log('User:', user.name, 'Team:', user.team, 'Matches team:', matchesTeam);
      return matchesTeam && matchesSkills;
    });
  }, [users, selectedTeams, selectedSkills]);

  const handleSkillsChange = (_event: React.SyntheticEvent, newValue: SkillCSV[]) => {
    setSelectedSkills(newValue.map(skill => skill.id));
  };

  const handleUpdateUserSkills = (userId: number, newSkills: UserSkill[]) => {
    const updatedUsers = users.map((user: User) => 
      user.id === userId 
        ? { ...user, skills: newSkills }
        : user
    );
    setUsers(updatedUsers);
  };

  const filteredTeams = React.useMemo(() => {
    return reportFilterType === 'team' && reportSelectedTeams.length > 0
      ? teams.filter(team => reportSelectedTeams.includes(team))
      : teams;
  }, [teams, reportFilterType, reportSelectedTeams]);

  const filteredSkills = React.useMemo(() => {
    return reportFilterType === 'skill' && reportSelectedSkills.length > 0
      ? skills.filter(skill => reportSelectedSkills.includes(skill.id))
      : skills;
  }, [skills, reportFilterType, reportSelectedSkills]);

  const skillGaps = React.useMemo(() => {
    return calculateSkillGaps(users, skills, teams);
  }, [users, skills, teams]);

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography 
          component="h1" 
          sx={{ 
            fontWeight: headingFontWeights?.pageTitle || 700,
            fontSize: pageTitleFontSize,
            fontFamily: headingFont
          }}
        >
          Skills matrix
        </Typography>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="skills matrix tabs">
          <Tab label="Manage" {...a11yProps(0)} />
          <Tab label="Report" {...a11yProps(1)} />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <FormControl sx={{ minWidth: 300 }}>
            <Autocomplete
              multiple
              value={skills.filter(skill => selectedSkills.includes(skill.id))}
              onChange={handleSkillsChange}
              options={skills}
              getOptionLabel={(option) => `${option.name} (${option.category})`}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Filter by Skills"
                  placeholder="Search skills..."
                />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    label={option.name}
                    size="small"
                    {...getTagProps({ index })}
                  />
                ))
              }
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  <Box>
                    <Typography>{option.name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {option.category}
                    </Typography>
                  </Box>
                </li>
              )}
              isOptionEqualToValue={(option, value) => option.id === value.id}
            />
          </FormControl>

          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
            {teams.map(team => (
              <Chip
                key={team}
                label={team}
                onClick={() => handleTeamToggle(team)}
                color={selectedTeams.includes(team) ? 'primary' : 'default'}
                variant={selectedTeams.includes(team) ? 'filled' : 'outlined'}
                sx={{ 
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: theme => selectedTeams.includes(team) 
                      ? theme.palette.primary.dark 
                      : theme.palette.action.hover
                  },
                  transition: 'background-color 0.2s'
                }}
              />
            ))}
          </Box>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Team</TableCell>
                <TableCell>Skills</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers
                .map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>
                      <Chip 
                        label={user.team} 
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                        {user.skills?.map(userSkill => {
                          const skill = skills.find(s => s.id === userSkill.skillId);
                          return skill ? (
                            <Chip
                              key={userSkill.skillId}
                              label={`${skill.name} (${userSkill.level}★, ${userSkill.yearsOfExperience}y)`}
                              size="small"
                              variant="outlined"
                            />
                          ) : null;
                        })}
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        onClick={() => setEditingUser(user)}
                        size="small"
                        color="primary"
                        startIcon={<EditIcon />}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Box sx={{ width: '100%', overflowX: 'auto' }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Skills Gap Heatmap</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Percentage of team members with each skill. Higher percentages (green) indicate better coverage, 
            lower percentages (red) indicate potential skill gaps.
          </Typography>

          <Box sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'flex-start' }}>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Filter Type</InputLabel>
              <Select
                value={reportFilterType}
                label="Filter Type"
                onChange={(e) => {
                  setReportFilterType(e.target.value as 'team' | 'skill');
                  setReportSelectedTeams([]);
                  setReportSelectedSkills([]);
                }}
              >
                <MenuItem value="team">Filter by Team</MenuItem>
                <MenuItem value="skill">Filter by Skill</MenuItem>
              </Select>
            </FormControl>

            {reportFilterType === 'team' ? (
              <FormControl sx={{ minWidth: 300 }}>
                <InputLabel>Select Teams</InputLabel>
                <Select
                  multiple
                  value={reportSelectedTeams}
                  onChange={(e) => setReportSelectedTeams(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)}
                  input={<OutlinedInput label="Select Teams" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} size="small" />
                      ))}
                    </Box>
                  )}
                >
                  {teams.map((team) => (
                    <MenuItem key={team} value={team}>
                      <Checkbox checked={reportSelectedTeams.indexOf(team) > -1} />
                      <ListItemText primary={team} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              <FormControl sx={{ minWidth: 300 }}>
                <InputLabel>Select Skills</InputLabel>
                <Select
                  multiple
                  value={reportSelectedSkills}
                  onChange={(e) => setReportSelectedSkills(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)}
                  input={<OutlinedInput label="Select Skills" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => {
                        const skill = skills.find(s => s.id === value);
                        return skill ? (
                          <Chip key={value} label={skill.name} size="small" />
                        ) : null;
                      })}
                    </Box>
                  )}
                >
                  {skills.map((skill) => (
                    <MenuItem key={skill.id} value={skill.id}>
                      <Checkbox checked={reportSelectedSkills.indexOf(skill.id) > -1} />
                      <ListItemText primary={`${skill.name} (${skill.category})`} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </Box>
          
          <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ minWidth: 200 }}>Skill</TableCell>
                  {filteredTeams.map(team => (
                    <TableCell 
                      key={team}
                      align="center"
                      sx={{ minWidth: 120 }}
                    >
                      <Chip 
                        label={team}
                        size="small"
                        color="primary"
                        variant="outlined"
                        sx={{ mb: 1 }}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredSkills.map(skill => (
                  <TableRow key={skill.id}>
                    <TableCell component="th" scope="row">
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                          {skill.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {skill.category}
                        </Typography>
                      </Box>
                    </TableCell>
                    {filteredTeams.map(team => {
                      const percentage = skillGaps[team]?.[skill.id] || 0;
                      return (
                        <TableCell 
                          key={`${skill.id}-${team}`}
                          align="center"
                          sx={{
                            backgroundColor: getColorForPercentage(percentage),
                            color: percentage > 50 ? 'black' : 'white',
                            fontWeight: 'bold'
                          }}
                        >
                          {percentage.toFixed(0)}%
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </TabPanel>

      {editingUser && (
        <SkillDialog
          open={true}
          onClose={() => setEditingUser(null)}
          user={editingUser}
          allSkills={skills}
          onSave={handleUpdateUserSkills}
        />
      )}
    </Box>
  );
};

export default SkillsMatrix;