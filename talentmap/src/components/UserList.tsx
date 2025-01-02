import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useUsers } from './UserContext';
import {
    Grid,
    Card,
    CardContent,
    Typography,
    TextField,
    Box,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Pagination,
    IconButton,
    Button,
    useTheme as useMuiTheme,
    useMediaQuery,
    Stack,
    Collapse,
    Tooltip,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Avatar,
    Link,
    Drawer,
    alpha
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useTheme } from './ThemeContext';
import { User } from '../types/User';

const ITEMS_PER_PAGE = 20;

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

const UserList: React.FC = () => {
    const muiTheme = useMuiTheme();
    const { headingFontWeights, pageTitleFontSize, headingFont } = useTheme();
    const { users } = useUsers();
    const [showFilters, setShowFilters] = useState(true);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const [teamFilter, setTeamFilter] = useState('');
    const [locationFilter, setLocationFilter] = useState('');
    const [roleFilter, setRoleFilter] = useState('');
    const [page, setPage] = useState(1);

    // Debounce search term
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 300);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    // Memoize filtered users
    const filteredUsers = useMemo(() => {
        let filtered = users;

        if (debouncedSearchTerm) {
            const searchTermLower = debouncedSearchTerm.toLowerCase();
            filtered = filtered.filter(user =>
                user.name.toLowerCase().includes(searchTermLower) ||
                user.team.toLowerCase().includes(searchTermLower) ||
                user.location.toLowerCase().includes(searchTermLower) ||
                user.jobRole.toLowerCase().includes(searchTermLower)
            );
        }

        if (teamFilter) {
            filtered = filtered.filter(user => user.team === teamFilter);
        }

        if (locationFilter) {
            filtered = filtered.filter(user => user.location === locationFilter);
        }

        if (roleFilter) {
            filtered = filtered.filter(user => user.jobRole === roleFilter);
        }

        return filtered;
    }, [users, debouncedSearchTerm, teamFilter, locationFilter, roleFilter]);

    // Memoize paginated users
    const paginatedUsers = useMemo(() => {
        return filteredUsers.slice(
            (page - 1) * ITEMS_PER_PAGE,
            page * ITEMS_PER_PAGE
        );
    }, [filteredUsers, page]);

    // Reset page when filters change
    useEffect(() => {
        setPage(1);
    }, [debouncedSearchTerm, teamFilter, locationFilter, roleFilter]);

    const teams = Array.from(new Set(users.map(user => user.team)));
    const locations = Array.from(new Set(users.map(user => user.location)));
    const roles = Array.from(new Set(users.map(user => user.jobRole)));

    const exportToCSV = useCallback(() => {
        const headers = [
            'Name',
            'Team',
            'Location',
            'Job Role',
            'Email',
            'Phone',
            'LinkedIn'
        ];

        const csvData = filteredUsers.map(user => [
            user.name,
            user.team,
            user.location,
            user.jobRole,
            user.email,
            user.phone,
            user.linkedin
        ]);

        const csvContent = [
            headers.join(','),
            ...csvData.map(row => row.join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'users.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }, [filteredUsers]);

    const handlePageChange = useCallback((event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    }, []);

    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    }, []);

    const handleResetFilters = useCallback(() => {
        setSearchTerm('');
        setTeamFilter('');
        setLocationFilter('');
        setRoleFilter('');
    }, []);

    const filterSectionContent = useMemo(() => (
        <Box sx={{ p: 2 }}>
            <Stack spacing={2}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="subtitle1" sx={{ mb: 1 }}>Filters</Typography>
                    <Button
                        size="small"
                        onClick={handleResetFilters}
                        startIcon={<CloseIcon />}
                        disabled={!searchTerm && !teamFilter && !locationFilter && !roleFilter}
                    >
                        Reset
                    </Button>
                </Box>
                <TextField
                    fullWidth
                    label="Search by name"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    autoComplete="off"
                    inputProps={{
                        spellCheck: false
                    }}
                />
                <FormControl fullWidth>
                    <InputLabel>Team</InputLabel>
                    <Select
                        value={teamFilter}
                        label="Team"
                        onChange={(e) => setTeamFilter(e.target.value)}
                    >
                        <MenuItem value="">All Teams</MenuItem>
                        {teams.map((team) => (
                            <MenuItem key={team} value={team}>{team}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel>Location</InputLabel>
                    <Select
                        value={locationFilter}
                        label="Location"
                        onChange={(e) => setLocationFilter(e.target.value)}
                    >
                        <MenuItem value="">All Locations</MenuItem>
                        {locations.map((location) => (
                            <MenuItem key={location} value={location}>{location}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel>Role</InputLabel>
                    <Select
                        value={roleFilter}
                        label="Role"
                        onChange={(e) => setRoleFilter(e.target.value)}
                    >
                        <MenuItem value="">All Roles</MenuItem>
                        {roles.map((role) => (
                            <MenuItem key={role} value={role}>{role}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button
                    variant="contained"
                    startIcon={<FileDownloadIcon />}
                    onClick={exportToCSV}
                >
                    Export to CSV
                </Button>
            </Stack>
        </Box>
    ), [searchTerm, teamFilter, locationFilter, roleFilter, teams, locations, roles, exportToCSV, handleSearchChange, handleResetFilters]);

    const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));

    return (
        <Box sx={{ p: 3 }}>
            <Typography 
                component="h1" 
                sx={{ 
                    mb: 3,
                    fontWeight: headingFontWeights?.pageTitle || 700,
                    fontSize: pageTitleFontSize,
                    fontFamily: headingFont
                }}
            >
                People ({filteredUsers.length})
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                {isMobile ? (
                    <>
                        <IconButton onClick={() => setDrawerOpen(true)}>
                            <FilterListIcon />
                        </IconButton>
                        <Drawer
                            anchor="right"
                            open={drawerOpen}
                            onClose={() => setDrawerOpen(false)}
                        >
                            <Box sx={{ width: 250 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
                                    <IconButton onClick={() => setDrawerOpen(false)}>
                                        <CloseIcon />
                                    </IconButton>
                                </Box>
                                {filterSectionContent}
                            </Box>
                        </Drawer>
                    </>
                ) : (
                    <Button
                        startIcon={<FilterListIcon />}
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        {showFilters ? 'Hide Filters' : 'Show Filters'}
                    </Button>
                )}
            </Box>

            <Grid container spacing={2}>
                {!isMobile && (
                    <Grid item xs={12} md={3}>
                        <Collapse in={showFilters}>
                            <Card>
                                {filterSectionContent}
                            </Card>
                        </Collapse>
                    </Grid>
                )}

                <Grid item xs={12} md={showFilters ? 9 : 12}>
                    <Grid container spacing={2}>
                        {paginatedUsers.map((user) => (
                            <Grid item xs={12} sm={6} md={4} key={user.name}>
                                <Card sx={{ height: '100%' }}>
                                    <CardContent>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                            <Avatar
                                                sx={{
                                                    width: 56,
                                                    height: 56,
                                                    mr: 2,
                                                    bgcolor: 'secondary.main',
                                                    fontSize: '1.2rem',
                                                    fontWeight: 500
                                                }}
                                            >
                                                {user.name.split(' ').map(n => n[0]).join('')}
                                            </Avatar>
                                            <Box>
                                                <Typography variant="h6" component="div">
                                                    {user.name}
                                                </Typography>
                                                <Typography color="textSecondary">
                                                    {user.jobRole}
                                                </Typography>
                                            </Box>
                                        </Box>

                                        <Box sx={{ mt: 2, mb: 2 }}>
                                            <Typography variant="body2" color="textSecondary">
                                                Team: {user.team}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                Location: {user.location}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                                                Manager: {users.find(u => u.id === user.managerId)?.name || 'None'}
                                            </Typography>
                                        </Box>

                                        <Accordion 
                                            elevation={0} 
                                            sx={{ 
                                                '&:before': { display: 'none' },
                                                boxShadow: 'none',
                                                bgcolor: 'transparent',
                                                mt: 2
                                            }}
                                        >
                                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                <Typography>Contact Information</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Stack spacing={1}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                        <EmailIcon sx={{ mr: 1 }} />
                                                        <Link href={`mailto:${user.email}`}>
                                                            {user.email}
                                                        </Link>
                                                    </Box>
                                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                        <PhoneIcon sx={{ mr: 1 }} />
                                                        <Link href={`tel:${user.phone}`}>
                                                            {user.phone}
                                                        </Link>
                                                    </Box>
                                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                        <LinkedInIcon sx={{ mr: 1 }} />
                                                        <Link href={user.linkedin} target="_blank" rel="noopener">
                                                            LinkedIn Profile
                                                        </Link>
                                                    </Box>
                                                </Stack>
                                            </AccordionDetails>
                                        </Accordion>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    {filteredUsers.length > ITEMS_PER_PAGE && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                            <Pagination
                                count={Math.ceil(filteredUsers.length / ITEMS_PER_PAGE)}
                                page={page}
                                onChange={handlePageChange}
                                color="primary"
                            />
                        </Box>
                    )}
                </Grid>
            </Grid>
        </Box>
    );
};

export default UserList;
