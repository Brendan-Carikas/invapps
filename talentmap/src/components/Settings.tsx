import React, { useState, useRef, useEffect } from 'react';
import {
    Box,
    Typography,
    Paper,
    FormControl,
    FormLabel,
    RadioGroup,
    Radio,
    FormControlLabel,
    Button,
    Stack,
    useTheme,
    alpha,
    Select,
    MenuItem,
    Tabs,
    Tab,
    Alert,
    IconButton,
    Tooltip,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Grid,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Divider,
    TextField,
    Checkbox,
    Switch,
    Autocomplete,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Badge,
    Chip,
    Avatar,
    CircularProgress,
    LinearProgress,
    Skeleton,
    Card,
    CardContent,
    Link
} from '@mui/material';
import { useTheme as useThemeContext } from './ThemeContext';
import { useUsers } from './UserContext';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SaveIcon from '@mui/icons-material/Save';
import CodeIcon from '@mui/icons-material/Code';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AssessmentIcon from '@mui/icons-material/Assessment';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import { User } from '../types/User';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title as ChartTitle,
    Tooltip as ChartTooltip,
    Legend as ChartLegend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

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
            id={`settings-tabpanel-${index}`}
            aria-labelledby={`settings-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `settings-tab-${index}`,
        'aria-controls': `settings-tabpanel-${index}`,
    };
}

const fontOptions = [
    { value: 'Roboto', label: 'Roboto' },
    { value: 'Open Sans', label: 'Open Sans' },
    { value: 'Lato', label: 'Lato' },
    { value: 'Poppins', label: 'Poppins' },
    { value: 'Montserrat', label: 'Montserrat' },
];

const fontWeightOptions = [
    { value: 300, label: 'Light' },
    { value: 400, label: 'Regular' },
    { value: 500, label: 'Medium' },
    { value: 600, label: 'Semi Bold' },
    { value: 700, label: 'Bold' },
    { value: 800, label: 'Extra Bold' }
];

type HeadingLevel = 'pageTitle' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type HeadingWeights = { [key: string]: number };

const defaultHeadingWeights: HeadingWeights = {
    pageTitle: 700,
    h1: 700,
    h2: 600,
    h3: 600,
    h4: 500,
    h5: 500,
    h6: 500
};

const headingLevels: HeadingLevel[] = ['pageTitle', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

interface ComponentCategory {
    name: string;
    components: string[];
}

const componentsList: ComponentCategory[] = [
    {
        name: 'Layout Components',
        components: [
            'Box - Container for layout and spacing',
            'Grid - Responsive grid system',
            'Stack - Flexible container for vertical/horizontal layouts',
            'Paper - Container with elevation and background',
            'Drawer - Side navigation panel',
            'AppBar - Top navigation bar',
            'Toolbar - Container for AppBar content',
            'Container - Responsive width container',
            'Divider - Horizontal line separator'
        ]
    },
    {
        name: 'Navigation Components',
        components: [
            'Tabs - Content organization and navigation',
            'Tab - Individual tab item',
            'TabPanel - Content container for tabs',
            'List - Vertical list container',
            'ListItem - Individual list item',
            'ListItemIcon - Icon container in list items',
            'ListItemText - Text container in list items',
            'IconButton - Clickable icon button'
        ]
    },
    {
        name: 'Form Components',
        components: [
            'FormControl - Form input wrapper',
            'FormLabel - Form input label',
            'FormControlLabel - Label for form controls',
            'Select - Dropdown selection input',
            'MenuItem - Option in Select dropdown',
            'TextField - Text input field',
            'RadioGroup - Container for radio options',
            'Radio - Individual radio button',
            'Checkbox - Checkmark input',
            'Switch - Toggle input',
            'Autocomplete - Enhanced dropdown with search'
        ]
    },
    {
        name: 'Data Display Components',
        components: [
            'Typography - Text display with variants',
            'Table - Data table container',
            'TableBody - Table body section',
            'TableCell - Individual table cell',
            'TableHead - Table header section',
            'TableRow - Table row container',
            'Tooltip - Hover information display',
            'Badge - Counter or status indicator',
            'Chip - Compact information display',
            'Avatar - User or item image display'
        ]
    },
    {
        name: 'Feedback Components',
        components: [
            'Alert - Status message display',
            'Snackbar - Temporary notification',
            'Dialog - Modal window',
            'DialogTitle - Modal title',
            'DialogContent - Modal content',
            'DialogActions - Modal buttons container',
            'CircularProgress - Loading spinner',
            'LinearProgress - Progress bar',
            'Skeleton - Loading placeholder'
        ]
    },
    {
        name: 'Chart Components',
        components: [
            'Bar Chart - Visualize data with customizable bar charts',
            'Line Chart - Display trends with line graphs',
            'Pie Chart - Show data distribution in a circular format'
        ]
    },
    {
        name: 'Custom Components',
        components: [
            'Navigation - Main navigation wrapper',
            'Dashboard - Analytics dashboard',
            'OrgChart - Organization chart display',
            'SkillsMatrix - Skills management interface',
            'Settings - App configuration interface',
            'UserCard - Display user information and contact details',
            'Dashboard Card - Display team statistics and metrics',
            'LegendSelect - Chart legend with selection',
            'ThemeProvider - Custom theme provider'
        ]
    }
];

const stringToColor = (string: string) => {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xFF;
        color += ('00' + value.toString(16)).substr(-2);
    }
    return color;
};

const Settings: React.FC = () => {
    const [tabValue, setTabValue] = useState(0);
    const [uploadStatus, setUploadStatus] = useState<{
        message: string;
        severity: 'success' | 'error' | 'info';
    } | null>(null);
    const { users, addUsers } = useUsers();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { 
        mode, 
        setMode, 
        primaryColor, 
        setPrimaryColor, 
        secondaryColor, 
        setSecondaryColor, 
        headingFont,
        setHeadingFont,
        bodyFont,
        setBodyFont,
        headingFontWeights,
        setHeadingFontWeights,
        pageTitleFontSize,
        setPageTitleFontSize,
        saveSettings,
        resetToDefaults 
    } = useThemeContext();
    const theme = useTheme();

    // Helper functions for generating user data
    const getGenderFromName = (name: string): 'male' | 'female' => {
        const firstNameLower = name.split(' ')[0].toLowerCase();
        const femaleNames = ['sarah', 'emily', 'maria', 'sophia', 'olivia', 'emma', 'isabella', 'lily'];
        return femaleNames.includes(firstNameLower) ? 'female' : 'male';
    };

    const getImageUrl = (name: string, gender: 'male' | 'female'): string => {
        return `https://xsgames.co/randomusers/avatar.php?g=${gender}`;
    };

    const getEmailFromName = (name: string): string => {
        return name.toLowerCase().replace(' ', '.') + '@company.com';
    };

    const getPhoneNumber = (id: number): string => {
        return `+1 (555) ${String(id).padStart(3, '0')}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`;
    };

    const getLinkedIn = (name: string): string => {
        return `https://linkedin.com/in/${name.toLowerCase().replace(' ', '-')}`;
    };

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const text = e.target?.result as string;
                const lines = text.split('\n');
                const headers = lines[0].split(',').map(header => header.trim());

                // Validate headers
                const requiredHeaders = ['name', 'team', 'location', 'jobRole', 'email', 'phone'];
                const missingHeaders = requiredHeaders.filter(header => !headers.includes(header));

                if (missingHeaders.length > 0) {
                    setUploadStatus({
                        message: `Missing required headers: ${missingHeaders.join(', ')}`,
                        severity: 'error'
                    });
                    return;
                }

                // Parse users
                const newUsers = lines.slice(1)
                    .filter(line => line.trim())
                    .map((line, index) => {
                        const values = line.split(',').map(value => value.trim());
                        const name = values[headers.indexOf('name')];
                        const gender = getGenderFromName(name);
                        const managerName = headers.includes('manager') ? values[headers.indexOf('manager')] : '';
                        
                        const user: User = {
                            id: Date.now() + index,
                            name: '',
                            team: '',
                            location: '',
                            jobRole: '',
                            email: '',
                            phone: '',
                            imageUrl: getImageUrl(name, gender),
                            linkedin: getLinkedIn(name),
                            managerId: undefined // Will be set after all users are processed
                        };

                        headers.forEach((header, i) => {
                            if (values[i] && header in user && header !== 'manager') {
                                (user as any)[header] = values[i];
                            }
                        });

                        // Set default values for missing fields
                        if (!user.email) user.email = getEmailFromName(user.name);
                        if (!user.phone) user.phone = getPhoneNumber(user.id);

                        return { user, managerName };
                    });

                // Process manager relationships
                const processedUsers = newUsers.map(({ user, managerName }) => {
                    if (managerName) {
                        // First look in existing users
                        const existingManager = users.find(u => u.name === managerName);
                        if (existingManager) {
                            user.managerId = existingManager.id;
                        } else {
                            // Then look in newly added users
                            const newManager = newUsers.find(u => u.user.name === managerName);
                            if (newManager) {
                                user.managerId = newManager.user.id;
                            }
                        }
                    }
                    return user;
                });

                // Add new users
                addUsers(processedUsers);
                
                setUploadStatus({
                    message: `Successfully added ${processedUsers.length} users`,
                    severity: 'success'
                });

                // Reset file input
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            } catch (error) {
                setUploadStatus({
                    message: 'Error parsing CSV file. Please check the format.',
                    severity: 'error'
                });
            }
        };

        reader.onerror = () => {
            setUploadStatus({
                message: 'Error reading file',
                severity: 'error'
            });
        };

        reader.readAsText(file);
    };

    const handleSaveUsers = () => {
        try {
            localStorage.setItem('users', JSON.stringify(users));
            setUploadStatus({
                message: 'Users saved successfully',
                severity: 'success'
            });
        } catch (error) {
            setUploadStatus({
                message: 'Error saving users',
                severity: 'error'
            });
        }
    };

    const handleFontWeightChange = (heading: HeadingLevel, weight: number) => {
        const currentWeights = headingFontWeights || defaultHeadingWeights;
        const newWeights = { ...currentWeights, [heading]: weight };
        setHeadingFontWeights(newWeights);
    };

    useEffect(() => {
        if (!headingFontWeights) {
            setHeadingFontWeights(defaultHeadingWeights);
        }
    }, [headingFontWeights, setHeadingFontWeights]);

    const getComponentExample = (componentName: string) => {
        switch (componentName) {
            // Layout Components
            case 'Box':
                return <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'white', borderRadius: 1 }}>Box Example</Box>;
            case 'Grid':
                return (
                    <Grid container spacing={1} sx={{ maxWidth: 200 }}>
                        <Grid item xs={6}><Box sx={{ p: 1, bgcolor: 'primary.main', color: 'white', borderRadius: 1 }}>Grid 1</Box></Grid>
                        <Grid item xs={6}><Box sx={{ p: 1, bgcolor: 'primary.main', color: 'white', borderRadius: 1 }}>Grid 2</Box></Grid>
                    </Grid>
                );
            case 'Stack':
                return (
                    <Stack direction="row" spacing={1} sx={{ maxWidth: 200 }}>
                        <Box sx={{ p: 1, bgcolor: 'primary.main', color: 'white', borderRadius: 1 }}>Item 1</Box>
                        <Box sx={{ p: 1, bgcolor: 'primary.main', color: 'white', borderRadius: 1 }}>Item 2</Box>
                    </Stack>
                );
            case 'Paper':
                return <Paper elevation={3} sx={{ p: 2, maxWidth: 200 }}>Paper Example</Paper>;

            // Navigation Components
            case 'Tabs':
                return (
                    <Box sx={{ maxWidth: 300, borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={0}>
                            <Tab label="Tab 1" />
                            <Tab label="Tab 2" />
                        </Tabs>
                    </Box>
                );
            case 'IconButton':
                return <IconButton><CodeIcon /></IconButton>;

            // Form Components
            case 'TextField':
                return <TextField size="small" label="Text Field" sx={{ maxWidth: 200 }} />;
            case 'Select':
                return (
                    <FormControl size="small" sx={{ maxWidth: 200 }}>
                        <Select value="1">
                            <MenuItem value="1">Option 1</MenuItem>
                            <MenuItem value="2">Option 2</MenuItem>
                        </Select>
                    </FormControl>
                );
            case 'RadioGroup':
                return (
                    <RadioGroup row value="1">
                        <FormControlLabel value="1" control={<Radio size="small" />} label="Option 1" />
                        <FormControlLabel value="2" control={<Radio size="small" />} label="Option 2" />
                    </RadioGroup>
                );
            case 'Checkbox':
                return <FormControlLabel control={<Checkbox size="small" />} label="Checkbox" />;
            case 'Switch':
                return <FormControlLabel control={<Switch size="small" />} label="Switch" />;
            case 'Autocomplete':
                return (
                    <Autocomplete
                        options={['Option 1', 'Option 2']}
                        renderInput={(params) => <TextField {...params} size="small" label="Autocomplete" />}
                        sx={{ maxWidth: 200 }}
                    />
                );

            // Data Display Components
            case 'Table':
                return (
                    <Table size="small" sx={{ maxWidth: 300 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Header 1</TableCell>
                                <TableCell>Header 2</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>Data 1</TableCell>
                                <TableCell>Data 2</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                );
            case 'Tooltip':
                return <Tooltip title="Tooltip Example" arrow open><Button size="small">Hover Me</Button></Tooltip>;
            case 'Badge':
                return <Badge badgeContent={4} color="primary"><CodeIcon /></Badge>;
            case 'Chip':
                return <Chip label="Chip Example" onDelete={() => {}} />;
            case 'Avatar':
                return <Avatar>JD</Avatar>;

            // Feedback Components
            case 'Alert':
                return <Alert severity="info" sx={{ maxWidth: 300 }}>Alert Example</Alert>;
            case 'CircularProgress':
                return <CircularProgress size={24} />;
            case 'LinearProgress':
                return <LinearProgress sx={{ maxWidth: 200 }} />;
            case 'Skeleton':
                return <Skeleton variant="rectangular" width={200} height={40} />;

            // Chart Components
            case 'Bar Chart':
                const mockData = {
                    labels: ['Engineering', 'Product', 'Sales'],
                    datasets: [
                        {
                            label: 'Team Members',
                            data: [8, 5, 6],
                            backgroundColor: [
                                alpha(theme.palette.primary.main, 0.8),
                                alpha(theme.palette.secondary.main, 0.8),
                                alpha(theme.palette.info.main, 0.8),
                            ],
                            borderWidth: 1
                        }
                    ]
                };

                const options = {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top' as const,
                            labels: {
                                color: theme.palette.text.primary
                            }
                        },
                        title: {
                            display: true,
                            text: 'Team Distribution',
                            color: theme.palette.text.primary,
                            font: {
                                size: 16,
                                weight: 500
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                stepSize: 1,
                                color: theme.palette.text.secondary
                            },
                            grid: {
                                color: theme.palette.mode === 'dark'
                                    ? 'rgba(255, 255, 255, 0.1)'
                                    : 'rgba(0, 0, 0, 0.1)'
                            }
                        },
                        x: {
                            ticks: {
                                color: theme.palette.text.secondary
                            },
                            grid: {
                                color: theme.palette.mode === 'dark'
                                    ? 'rgba(255, 255, 255, 0.1)'
                                    : 'rgba(0, 0, 0, 0.1)'
                            }
                        }
                    }
                };

                return (
                    <Box sx={{ height: 300, p: 2 }}>
                        <Bar data={mockData} options={options} />
                    </Box>
                );

            // Custom Components
            case 'UserCard':
                const mockUser = {
                    id: 1,
                    name: 'John Doe',
                    team: 'Design',
                    location: 'San Francisco',
                    jobRole: 'UI Designer',
                    email: 'john.doe@company.com',
                    phone: '+1 (555) 000-0000',
                    linkedin: 'https://linkedin.com/in/john-doe',
                    managerId: undefined
                };
                return (
                    <Card sx={{ maxWidth: 345 }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Avatar
                                    sx={{
                                        width: 56,
                                        height: 56,
                                        mr: 2,
                                        bgcolor: stringToColor(mockUser.name),
                                        fontSize: '1.2rem',
                                        fontWeight: 500
                                    }}
                                >
                                    {mockUser.name.split(' ').map(n => n[0]).join('')}
                                </Avatar>
                                <Box>
                                    <Typography variant="h6" component="div">
                                        {mockUser.name}
                                    </Typography>
                                    <Typography color="textSecondary">
                                        {mockUser.jobRole}
                                    </Typography>
                                </Box>
                            </Box>

                            <Box sx={{ mt: 2, mb: 2 }}>
                                <Typography variant="body2" color="textSecondary">
                                    Team: {mockUser.team}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Location: {mockUser.location}
                                </Typography>
                            </Box>

                            <Accordion 
                                elevation={0} 
                                sx={{ 
                                    '&:before': { display: 'none' },
                                    boxShadow: 'none',
                                    bgcolor: 'transparent'
                                }}
                            >
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography>Contact Information</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Stack spacing={1}>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <EmailIcon sx={{ mr: 1 }} />
                                            <Link href={`mailto:${mockUser.email}`}>
                                                {mockUser.email}
                                            </Link>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <PhoneIcon sx={{ mr: 1 }} />
                                            <Link href={`tel:${mockUser.phone}`}>
                                                {mockUser.phone}
                                            </Link>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <LinkedInIcon sx={{ mr: 1 }} />
                                            <Link href={mockUser.linkedin} target="_blank" rel="noopener">
                                                LinkedIn Profile
                                            </Link>
                                        </Box>
                                    </Stack>
                                </AccordionDetails>
                            </Accordion>
                        </CardContent>
                    </Card>
                );

            case 'Dashboard Card':
                const mockTeamData = {
                    teamName: 'Engineering',
                    memberCount: 12,
                    locations: ['New York', 'London', 'Singapore'],
                    topSkills: ['JavaScript', 'React', 'TypeScript']
                };

                return (
                    <Card sx={{ maxWidth: 345, m: 2 }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <AssessmentIcon sx={{ mr: 1, color: 'primary.main' }} />
                                <Typography variant="h6" component="div">
                                    {mockTeamData.teamName} Team
                                </Typography>
                            </Box>
                            
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <PeopleAltIcon sx={{ mr: 1, fontSize: 'small', color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                    {mockTeamData.memberCount} Members
                                </Typography>
                            </Box>
                            
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <LocationOnIcon sx={{ mr: 1, fontSize: 'small', color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                    {mockTeamData.locations.join(', ')}
                                </Typography>
                            </Box>
                            
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 2, mb: 1 }}>
                                Top Skills:
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {mockTeamData.topSkills.map((skill) => (
                                    <Chip
                                        key={skill}
                                        label={skill}
                                        size="small"
                                        sx={{ 
                                            backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                            color: 'primary.main'
                                        }}
                                    />
                                ))}
                            </Box>
                        </CardContent>
                    </Card>
                );

            default:
                return null;
        }
    };

    // Register ChartJS components
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        ChartTitle,
        ChartTooltip,
        ChartLegend
    );

    return (
        <Box sx={{ width: '100%', p: 3 }}>
            <Typography
                component="h1"
                sx={{
                    mb: 3,
                    fontWeight: headingFontWeights?.pageTitle || 700,
                    fontSize: pageTitleFontSize,
                    fontFamily: headingFont
                }}
            >
                Settings
            </Typography>
            <Paper 
                elevation={0}
                sx={{ 
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
                }}
            >
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs 
                        value={tabValue} 
                        onChange={handleTabChange}
                        aria-label="settings tabs"
                        sx={{
                            '& .MuiTab-root': {
                                color: 'text.secondary',
                                '&.Mui-selected': {
                                    color: 'primary.main',
                                }
                            },
                            '& .MuiTabs-indicator': {
                                backgroundColor: 'primary.main',
                            }
                        }}
                    >
                        <Tab label="Appearance" {...a11yProps(0)} />
                        <Tab label="User Management" {...a11yProps(1)} />
                        <Tab label="Components" {...a11yProps(2)} />
                    </Tabs>
                </Box>

                <TabPanel value={tabValue} index={0}>
                    <Stack spacing={4}>
                        {/* Theme Mode */}
                        <FormControl component="fieldset">
                            <FormLabel 
                                component="legend"
                                sx={{
                                    color: 'text.primary',
                                    '&.Mui-focused': {
                                        color: 'text.primary'
                                    }
                                }}
                            >
                                Theme Mode
                            </FormLabel>
                            <RadioGroup
                                row
                                value={mode}
                                onChange={(e) => setMode(e.target.value as 'light' | 'dark')}
                            >
                                <FormControlLabel 
                                    value="light" 
                                    control={
                                        <Radio 
                                            sx={{
                                                color: 'text.secondary',
                                                '&.Mui-checked': {
                                                    color: 'primary.main'
                                                }
                                            }}
                                        />
                                    } 
                                    label="Light" 
                                    sx={{
                                        color: 'text.primary'
                                    }}
                                />
                                <FormControlLabel 
                                    value="dark" 
                                    control={
                                        <Radio 
                                            sx={{
                                                color: 'text.secondary',
                                                '&.Mui-checked': {
                                                    color: 'primary.main'
                                                }
                                            }}
                                        />
                                    } 
                                    label="Dark"
                                    sx={{
                                        color: 'text.primary'
                                    }}
                                />
                            </RadioGroup>
                        </FormControl>

                        {/* Typography Settings */}
                        <Accordion 
                            defaultExpanded
                            sx={{ 
                                bgcolor: 'background.paper',
                                '&:before': {
                                    display: 'none',
                                },
                            }}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                sx={{
                                    borderBottom: 1,
                                    borderColor: 'divider'
                                }}
                            >
                                <Typography variant="h6">Typography</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Stack spacing={3}>
                                    {/* Font Settings */}
                                    <Box>
                                        <Typography variant="subtitle1" sx={{ mb: 2 }}>Font settings</Typography>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={6}>
                                                <FormControl fullWidth>
                                                    <FormLabel sx={{ mb: 1 }}>Heading Font</FormLabel>
                                                    <Select
                                                        value={headingFont}
                                                        onChange={(e) => setHeadingFont(e.target.value)}
                                                        size="small"
                                                    >
                                                        {fontOptions.map((font) => (
                                                            <MenuItem key={font.value} value={font.value}>
                                                                {font.label}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <FormControl fullWidth>
                                                    <FormLabel sx={{ mb: 1 }}>Body Font</FormLabel>
                                                    <Select
                                                        value={bodyFont}
                                                        onChange={(e) => setBodyFont(e.target.value)}
                                                        size="small"
                                                    >
                                                        {fontOptions.map((font) => (
                                                            <MenuItem key={font.value} value={font.value}>
                                                                {font.label}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </Box>

                                    {/* Font Weights */}
                                    <Box>
                                        <Typography variant="subtitle1" sx={{ mb: 2 }}>Font weights</Typography>
                                        <Grid container spacing={2}>
                                            {headingLevels.map((heading) => (
                                                <Grid item xs={12} sm={6} key={heading}>
                                                    <FormControl fullWidth>
                                                        <FormLabel sx={{ mb: 1 }}>
                                                            {heading === 'pageTitle' ? 'Page Title' : heading.toUpperCase()}
                                                        </FormLabel>
                                                        <Select
                                                            value={headingFontWeights?.[heading] || defaultHeadingWeights[heading]}
                                                            onChange={(e) => handleFontWeightChange(heading, Number(e.target.value))}
                                                            size="small"
                                                        >
                                                            {fontWeightOptions.map((weight) => (
                                                                <MenuItem key={weight.value} value={weight.value}>
                                                                    {weight.label}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Box>
                                </Stack>
                            </AccordionDetails>
                        </Accordion>

                        {/* Colors Settings */}
                        <Accordion 
                            defaultExpanded
                            sx={{ 
                                bgcolor: 'background.paper',
                                '&:before': {
                                    display: 'none',
                                },
                            }}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                sx={{
                                    borderBottom: 1,
                                    borderColor: 'divider'
                                }}
                            >
                                <Typography variant="h6">Colors</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Stack spacing={3}>
                                    <Box>
                                        <Typography variant="subtitle1" sx={{ mb: 2 }}>Theme colors</Typography>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={6}>
                                                <FormControl fullWidth>
                                                    <FormLabel sx={{ mb: 1 }}>Primary color</FormLabel>
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: 2
                                                        }}
                                                    >
                                                        <Box
                                                            sx={{
                                                                width: 40,
                                                                height: 40,
                                                                borderRadius: 1,
                                                                bgcolor: primaryColor,
                                                                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
                                                            }}
                                                        />
                                                        <input
                                                            type="color"
                                                            value={primaryColor}
                                                            onChange={(e) => setPrimaryColor(e.target.value)}
                                                            style={{ width: '100%' }}
                                                        />
                                                    </Box>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <FormControl fullWidth>
                                                    <FormLabel sx={{ mb: 1 }}>Secondary color</FormLabel>
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: 2
                                                        }}
                                                    >
                                                        <Box
                                                            sx={{
                                                                width: 40,
                                                                height: 40,
                                                                borderRadius: 1,
                                                                bgcolor: secondaryColor,
                                                                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
                                                            }}
                                                        />
                                                        <input
                                                            type="color"
                                                            value={secondaryColor}
                                                            onChange={(e) => setSecondaryColor(e.target.value)}
                                                            style={{ width: '100%' }}
                                                        />
                                                    </Box>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Stack>
                            </AccordionDetails>
                        </Accordion>

                        {/* Action Buttons */}
                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                            <Button
                                variant="outlined"
                                onClick={resetToDefaults}
                                sx={{
                                    borderColor: 'divider',
                                    color: 'text.primary',
                                    '&:hover': {
                                        borderColor: 'primary.main',
                                    }
                                }}
                            >
                                Reset to Defaults
                            </Button>
                            <Button
                                variant="contained"
                                onClick={saveSettings}
                                startIcon={<SaveIcon />}
                            >
                                Save Changes
                            </Button>
                        </Box>
                    </Stack>
                </TabPanel>

                <TabPanel value={tabValue} index={1}>
                    <Typography variant="h5" gutterBottom>
                        User Management
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                        <Stack spacing={3}>
                            <Box>
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <Typography variant="h6">
                                        Import Users
                                    </Typography>
                                    <Tooltip title="Upload a CSV file with the following headers: name, team, location, jobRole, email, phone">
                                        <IconButton size="small">
                                            <HelpOutlineIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Stack>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 2 }}>
                                    Upload a CSV file containing user information. The file should include headers for name, team, location, job role, email, and phone.
                                </Typography>
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <input
                                        type="file"
                                        accept=".csv"
                                        onChange={handleFileUpload}
                                        style={{ display: 'none' }}
                                        ref={fileInputRef}
                                    />
                                    <Button
                                        variant="outlined"
                                        startIcon={<CloudUploadIcon />}
                                        onClick={() => fileInputRef.current?.click()}
                                        sx={{
                                            borderColor: alpha(theme.palette.divider, 0.2),
                                            color: 'text.primary',
                                            '&:hover': {
                                                borderColor: 'primary.main',
                                                bgcolor: alpha(theme.palette.primary.main, 0.04)
                                            }
                                        }}
                                    >
                                        Choose CSV File
                                    </Button>
                                    <Button
                                        variant="contained"
                                        startIcon={<SaveIcon />}
                                        onClick={handleSaveUsers}
                                        sx={{
                                            bgcolor: 'primary.main',
                                            color: 'primary.contrastText',
                                            '&:hover': {
                                                bgcolor: 'primary.dark'
                                            }
                                        }}
                                    >
                                        Save Users
                                    </Button>
                                </Stack>
                            </Box>
                            
                            {uploadStatus && (
                                <Alert 
                                    severity={uploadStatus.severity}
                                    onClose={() => setUploadStatus(null)}
                                    sx={{ 
                                        '& .MuiAlert-message': { 
                                            color: 'text.primary' 
                                        } 
                                    }}
                                >
                                    {uploadStatus.message}
                                </Alert>
                            )}

                            <Typography variant="body2" color="text.secondary">
                                Current Users: {users.length}
                            </Typography>
                        </Stack>
                    </Box>
                </TabPanel>

                <TabPanel value={tabValue} index={2}>
                    <Box sx={{ width: '100%' }}>
                        {componentsList.map((category, index) => (
                            <React.Fragment key={category.name}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        mb: 2,
                                        mt: index > 0 ? 4 : 0,
                                        color: 'primary.main',
                                        fontWeight: 500
                                    }}
                                >
                                    {category.name}
                                </Typography>
                                <List>
                                    {category.components.map((component) => {
                                        const componentName = component.split(' - ')[0];
                                        const componentDescription = component.split(' - ')[1];
                                        const example = getComponentExample(componentName);

                                        return (
                                            <ListItem 
                                                key={component}
                                                sx={{
                                                    flexDirection: 'column',
                                                    alignItems: 'flex-start',
                                                    gap: 1
                                                }}
                                            >
                                                <Box sx={{ display: 'flex', width: '100%', mb: 1 }}>
                                                    <ListItemIcon>
                                                        <CodeIcon sx={{ color: 'text.secondary' }} />
                                                    </ListItemIcon>
                                                    <ListItemText 
                                                        primary={componentName}
                                                        secondary={componentDescription}
                                                        primaryTypographyProps={{
                                                            sx: { fontWeight: 500 }
                                                        }}
                                                    />
                                                </Box>
                                                {example && (
                                                    <Box 
                                                        sx={{ 
                                                            pl: 6,
                                                            width: '100%',
                                                            '& > *': { mb: 1 }
                                                        }}
                                                    >
                                                        {example}
                                                    </Box>
                                                )}
                                            </ListItem>
                                        );
                                    })}
                                </List>
                                {index < componentsList.length - 1 && (
                                    <Divider sx={{ my: 2 }} />
                                )}
                            </React.Fragment>
                        ))}
                    </Box>
                </TabPanel>
            </Paper>
        </Box>
    );
};

export default Settings;