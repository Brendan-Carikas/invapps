import React, { useEffect, useState } from 'react';
import Tree, { RawNodeDatum, CustomNodeElementProps } from 'react-d3-tree';
import { User } from '../types/User';
import { useUsers } from './UserContext';
import {
  Box,
  Card,
  Avatar,
  Typography,
  useTheme as useMuiTheme,
  alpha,
  IconButton
} from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import { useTheme } from './ThemeContext';

type NodeAttributes = {
  name: string;
  role: string;
  team: string;
  location: string;
  email: string;
}

// Update the TreeNodeAttributes interface to include the additional fields
type TreeNodeAttributes = Record<keyof NodeAttributes, string> & {
  id: string;
  hasChildren: boolean;
};

interface OrgChartNodeData {
  name: string;
  attributes?: TreeNodeAttributes;
  children?: OrgChartNodeData[];
  id: string;
}

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

const convertToRawNodeDatum = (node: OrgChartNodeData): RawNodeDatum => {
  return {
    name: node.name,
    attributes: node.attributes,
    children: node.children?.map(convertToRawNodeDatum)
  };
};

const OrgChart: React.FC = () => {
  const muiTheme = useMuiTheme();
  const { headingFontWeights, pageTitleFontSize, headingFont } = useTheme();
  const { users } = useUsers();
  const [treeData, setTreeData] = useState<OrgChartNodeData | null>(null);
  const [dimensions, setDimensions] = useState({ 
    width: window.innerWidth, 
    height: window.innerHeight 
  });
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [isAllExpanded, setIsAllExpanded] = useState(false);

  // Update dimensions on window resize
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const buildTreeData = (users: User[]): OrgChartNodeData | null => {
      if (!users.length) return null;

      const userMap = new Map(users.map(user => [user.id, user]));
      
      // Find John Doe or fallback to the root
      const root = users.find(user => 
        user.name === "John Doe" || (
          !user.managerId && (
            user.jobRole.toLowerCase().includes('ceo') || 
            user.jobRole.toLowerCase().includes('chief') ||
            user.directReports?.length
          )
        )
      ) || users[0];

      const buildNode = (user: User): OrgChartNodeData => {
        const directReportIds = new Set<number>();
        
        if (user.directReports) {
          user.directReports.forEach(id => directReportIds.add(id));
        }
        
        users.forEach(u => {
          if (u.managerId === user.id) {
            directReportIds.add(u.id);
          }
        });

        const children = Array.from(directReportIds)
          .map(id => userMap.get(id))
          .filter((u): u is User => u !== undefined)
          .map(child => buildNode(child));

        const hasChildren = children.length > 0;

        return {
          name: user.name,
          id: user.id.toString(),
          attributes: {
            name: user.name,
            role: user.jobRole,
            team: user.team,
            location: user.location,
            email: user.email,
            id: user.id.toString(),
            hasChildren
          },
          children: hasChildren ? children : undefined
        };
      };

      const data = buildNode(root);
      
      // Only expand the root node initially
      setExpandedNodes(new Set([data.id]));
      return data;
    };

    const data = buildTreeData(users);
    setTreeData(data);
  }, [users]);

  // Function to collect all node IDs except root and its immediate children
  const getCollapsibleNodeIds = (node: OrgChartNodeData, isRoot: boolean = true): string[] => {
    const ids: string[] = [];
    
    if (node.children) {
      node.children.forEach((child, index) => {
        // For root's children, only include their descendants
        if (isRoot) {
          ids.push(...getCollapsibleNodeIds(child, false));
        } else {
          // For non-root nodes, include the node and all its descendants
          ids.push(child.id);
          ids.push(...getCollapsibleNodeIds(child, false));
        }
      });
    }
    
    return ids;
  };

  // Function to get all node IDs including root and all descendants
  const getAllNodeIds = (node: OrgChartNodeData): string[] => {
    const ids: string[] = [node.id];
    if (node.children) {
      node.children.forEach(child => {
        ids.push(...getAllNodeIds(child));
      });
    }
    return ids;
  };

  // Function to get root and its immediate children IDs
  const getRootAndImmediateChildren = (node: OrgChartNodeData): string[] => {
    const ids = [node.id];
    if (node.children) {
      node.children.forEach(child => ids.push(child.id));
    }
    return ids;
  };

  const toggleAllNodes = () => {
    if (!treeData) return;

    const newIsExpanded = !isAllExpanded;
    let newExpandedNodes: Set<string>;

    if (newIsExpanded) {
      // Expand all nodes
      newExpandedNodes = new Set(getAllNodeIds(treeData));
      console.log('Expanding all nodes:', Array.from(newExpandedNodes));
    } else {
      // Collapse all except root and immediate children
      newExpandedNodes = new Set(getRootAndImmediateChildren(treeData));
      console.log('Collapsing to root level:', Array.from(newExpandedNodes));
    }

    setIsAllExpanded(newIsExpanded);
    setExpandedNodes(newExpandedNodes);
  };

  // Update toggle state when individual nodes are toggled
  const toggleNode = (nodeId: string) => {
    setExpandedNodes(prev => {
      const next = new Set(prev);
      if (next.has(nodeId)) {
        // When collapsing, also remove all descendant nodes
        const removeDescendants = (node: OrgChartNodeData) => {
          next.delete(node.id);
          node.children?.forEach(removeDescendants);
        };
        
        const findNode = (nodeToFind: string, currentNode: OrgChartNodeData): OrgChartNodeData | null => {
          if (currentNode.id === nodeToFind) return currentNode;
          if (!currentNode.children) return null;
          
          for (const child of currentNode.children) {
            const found = findNode(nodeToFind, child);
            if (found) return found;
          }
          return null;
        };

        if (treeData) {
          const nodeToCollapse = findNode(nodeId, treeData);
          if (nodeToCollapse) {
            removeDescendants(nodeToCollapse);
            next.delete(nodeId);
          }
        }
      } else {
        next.add(nodeId);
      }

      // Update isAllExpanded state based on the number of expanded nodes
      if (treeData) {
        const allNodes = getAllNodeIds(treeData);
        setIsAllExpanded(allNodes.every(id => next.has(id)));
      }

      return next;
    });
  };

  const processTreeData = (node: OrgChartNodeData): RawNodeDatum => {
    return {
      name: node.name,
      attributes: {
        ...node.attributes,
        id: node.id,
        hasChildren: Boolean(node.children && node.children.length > 0)
      },
      children: expandedNodes.has(node.id) 
        ? node.children?.map(processTreeData)
        : undefined
    };
  };

  const renderCustomNode = ({ nodeDatum }: CustomNodeElementProps): React.ReactElement => {
    const attrs = nodeDatum.attributes as TreeNodeAttributes;
    const isMobile = dimensions.width < 600;
    
    // Return a default node if attributes are missing
    if (!attrs) {
      return (
        <g>
          <foreignObject 
            x={isMobile ? -40 : -60} 
            y={isMobile ? -20 : -25} 
            width={isMobile ? 80 : 120} 
            height={isMobile ? 40 : 50}
          >
            <Card
              variant="outlined"
              sx={{
                p: 1,
                width: '100%',
                height: '100%',
                bgcolor: alpha(muiTheme.palette.background.paper, 0.98),
                borderRadius: '8px',
                transition: 'all 0.2s ease-in-out',
                borderColor: alpha(muiTheme.palette.divider, 0.8),
                '&:hover': {
                  borderColor: muiTheme.palette.primary.main,
                }
              }}
            >
              <Typography 
                variant={isMobile ? "caption" : "body2"} 
                align="center" 
                display="block"
                sx={{ fontWeight: 500 }}
              >
                {nodeDatum.name}
              </Typography>
            </Card>
          </foreignObject>
        </g>
      );
    }

    const initials = attrs.name.split(' ').map(n => n[0]).join('');
    const hasChildren = attrs.hasChildren;
    const isExpanded = expandedNodes.has(attrs.id);

    return (
      <g>
        <foreignObject 
          x={isMobile ? -75 : -100} 
          y={isMobile ? -40 : -50} 
          width={isMobile ? 150 : 200} 
          height={isMobile ? 80 : 100}
        >
          <Card
            variant="outlined"
            sx={{
              width: '100%',
              height: '100%',
              bgcolor: alpha(muiTheme.palette.background.paper, 0.98),
              borderRadius: '12px',
              overflow: 'visible',
              position: 'relative',
              cursor: hasChildren ? 'pointer' : 'default',
              transition: 'all 0.2s ease-in-out',
              borderColor: alpha(muiTheme.palette.divider, 0.8),
              '&:hover': hasChildren ? {
                borderColor: muiTheme.palette.primary.main,
                bgcolor: alpha(muiTheme.palette.background.paper, 0.99),
                '& .MuiIconButton-root': {
                  color: muiTheme.palette.primary.main,
                  bgcolor: alpha(muiTheme.palette.primary.main, 0.08),
                }
              } : {}
            }}
            onClick={() => hasChildren && toggleNode(attrs.id)}
          >
            {hasChildren && (
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleNode(attrs.id);
                }}
                sx={{
                  position: 'absolute',
                  right: '8px',
                  top: '8px',
                  width: '24px',
                  height: '24px',
                  p: 0.5,
                  color: muiTheme.palette.text.secondary,
                  bgcolor: alpha(muiTheme.palette.background.paper, 1),
                  border: `1px solid ${alpha(muiTheme.palette.divider, 0.8)}`,
                  '&:hover': {
                    bgcolor: alpha(muiTheme.palette.primary.main, 0.08),
                    color: muiTheme.palette.primary.main,
                    borderColor: muiTheme.palette.primary.main,
                  }
                }}
              >
                {isExpanded ? <RemoveIcon fontSize="small" /> : <AddIcon fontSize="small" />}
              </IconButton>
            )}
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: isMobile ? 1 : 1.5,
                p: isMobile ? 1.25 : 1.5,
              }}
            >
              <Avatar
                sx={{
                  width: isMobile ? 38 : 48,
                  height: isMobile ? 38 : 48,
                  bgcolor: 'secondary.main',
                  fontSize: isMobile ? '1rem' : '1.2rem',
                  fontWeight: 600,
                }}
              >
                {initials}
              </Avatar>
              <Box sx={{ minWidth: 0, flex: 1 }}>
                <Typography 
                  variant={isMobile ? "body2" : "subtitle1"}
                  sx={{ 
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    fontSize: isMobile ? '0.875rem' : '1rem',
                    lineHeight: 1.2,
                    mb: 0.5,
                    pr: hasChildren ? 3 : 0,
                    color: muiTheme.palette.text.primary
                  }}
                >
                  {attrs.name}
                </Typography>
                <Typography 
                  variant="caption" 
                  sx={{
                    display: 'block',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    fontSize: isMobile ? '0.75rem' : '0.8125rem',
                    lineHeight: 1.2,
                    mb: 0.25,
                    color: muiTheme.palette.text.secondary,
                    fontWeight: 500
                  }}
                >
                  {attrs.role}
                </Typography>
                <Typography 
                  variant="caption" 
                  sx={{
                    display: 'block',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    fontSize: isMobile ? '0.75rem' : '0.8125rem',
                    lineHeight: 1.2,
                    color: muiTheme.palette.primary.main,
                    fontWeight: 500
                  }}
                >
                  {attrs.team}
                </Typography>
              </Box>
            </Box>
          </Card>
        </foreignObject>
      </g>
    );
  };

  if (!treeData) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Loading organization chart...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ height: '100vh', p: 3 }}>
      <Box sx={{ 
        mb: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Typography 
          component="h1" 
          sx={{ 
            fontWeight: headingFontWeights?.pageTitle || 700,
            fontSize: pageTitleFontSize,
            fontFamily: headingFont
          }}
        >
          Organization chart
        </Typography>
        <IconButton
          onClick={toggleAllNodes}
          sx={{
            border: `1px solid ${alpha(muiTheme.palette.divider, 0.8)}`,
            borderRadius: 1,
            p: 1,
            color: muiTheme.palette.text.secondary,
            '&:hover': {
              bgcolor: alpha(muiTheme.palette.primary.main, 0.08),
              color: muiTheme.palette.primary.main,
              borderColor: muiTheme.palette.primary.main,
            }
          }}
        >
          {isAllExpanded ? <RemoveIcon /> : <AddIcon />}
        </IconButton>
      </Box>
      <Box sx={{ width: '100%', height: 'calc(100vh - 64px)' }}>
        <Tree
          data={treeData ? processTreeData(treeData) : { name: 'No Data' }}
          renderCustomNodeElement={renderCustomNode}
          orientation="vertical"
          pathFunc="step"
          translate={{ 
            x: dimensions.width / 2, 
            y: Math.min(100, dimensions.height * 0.1) 
          }}
          separation={{ 
            siblings: 2, 
            nonSiblings: 2 
          }}
          zoom={0.6}
          nodeSize={{ 
            x: 300, 
            y: 150 
          }}
          enableLegacyTransitions={true}
          transitionDuration={800}
          scaleExtent={{ min: 0.1, max: 2 }}
          hasInteractiveNodes={true}
        />
      </Box>
    </Box>
  );
};

export default OrgChart;