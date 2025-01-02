import React from 'react';
import {
    Box,
    Typography,
    Paper,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Divider,
    useTheme,
} from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';

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
            'Bar - Bar chart from Chart.js',
            'Line - Line chart from Chart.js',
            'Pie - Pie chart from Chart.js',
            'Doughnut - Doughnut chart from Chart.js',
            'HeatMap - Custom heat map component'
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
            'UserCard - User profile card',
            'LegendSelect - Chart legend with selection',
            'ThemeProvider - Custom theme provider'
        ]
    }
];

const ComponentsList: React.FC = () => {
    const theme = useTheme();

    return (
        <Box sx={{ width: '100%', p: 3 }}>
            <Typography
                component="h1"
                sx={{
                    mb: 3,
                    fontWeight: 700,
                    fontSize: '2rem'
                }}
            >
                UI Components
            </Typography>
            <Paper sx={{ p: 3 }}>
                {componentsList.map((category, index) => (
                    <React.Fragment key={category.name}>
                        <Typography
                            variant="h6"
                            sx={{
                                mb: 2,
                                mt: index > 0 ? 4 : 0,
                                color: theme.palette.primary.main
                            }}
                        >
                            {category.name}
                        </Typography>
                        <List>
                            {category.components.map((component) => (
                                <ListItem key={component}>
                                    <ListItemIcon>
                                        <CodeIcon sx={{ color: theme.palette.text.secondary }} />
                                    </ListItemIcon>
                                    <ListItemText 
                                        primary={component.split(' - ')[0]}
                                        secondary={component.split(' - ')[1]}
                                    />
                                </ListItem>
                            ))}
                        </List>
                        {index < componentsList.length - 1 && <Divider />}
                    </React.Fragment>
                ))}
            </Paper>
        </Box>
    );
};

export default ComponentsList;