import { SelectTaxonomy } from '@/lib/db';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Github, BookOpen, User, Package } from 'lucide-react';
import Tooltip from '@mui/material/Tooltip';

const warmColors = [
    "#FFD1DC", "#D4A5A5", "#AEC6CF", "#77DD77",
    "#FD4596", "#FFB347", "#FF6961", "#C3FDB8",
    "#C3B1E1", "#FFDAB9", "#FF9AA2", "#99C5C4",
    "#B2EBF2", "#B2FBA5", "#F5F5DC", "#FFCDF3",
    "#CAE5FF", "#A0D6B4", "#F7CAC9", "#D1B3A1"
];

function getColorForChar(char: string) {
    // const randomIndex = char.charCodeAt(0) % warmColors.length;
    const randomIndex = Math.floor(Math.random() * warmColors.length);
    return warmColors[randomIndex];
}

export function TaxonomyCard({ taxonomy }: { taxonomy: SelectTaxonomy }) {
    return (
        <Card sx={{ maxWidth: 600, display: 'flex', flexDirection: 'column' }}>
        <CardHeader
            avatar={
            <Avatar sx={{ bgcolor: getColorForChar(taxonomy.title.charAt(0)) }} aria-label="recipe">
                {taxonomy.title.charAt(0)}
            </Avatar>
            }
            title={taxonomy.title}
            subheader={taxonomy.taxon_id}
        />
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            {taxonomy.description && (
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>                       
                {taxonomy.description.length > 275
                    ? `${taxonomy.description.substring(0, 275)}...`
                    : taxonomy.description}
            </Typography>
            )}
            <br />
            <div>
                {taxonomy.purl && (
                <>
                    <Box component="span" sx={{ backgroundColor: 'darkgrey', borderRadius: '12px', padding: '2px 8px', color: 'white', display: 'inline-block', marginRight: '8px', fontSize: '0.875rem' }}>
                        PURL
                    </Box>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1.5, display: 'inline' }}>
                        <a href={taxonomy.purl} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                            {taxonomy.purl}
                        </a>
                    </Typography>
                </>
                )}
            </div>
        </CardContent>
        <CardActions disableSpacing>
            <Tooltip title="View GitHub repository">
                <a href={taxonomy.repo_url} target="_blank" rel="noopener noreferrer">
                    <IconButton aria-label="taxonomy repository">
                        <Github />
                    </IconButton>
                </a>
            </Tooltip>
            {taxonomy.doc_url && (
            <Tooltip title="View documentation">
                <a href={taxonomy.doc_url} target="_blank" rel="noopener noreferrer">
                    <IconButton aria-label="online documentation">
                        <BookOpen />
                    </IconButton>
                </a>
            </Tooltip>
            )}
            {taxonomy.h5ad_url && (
            <Tooltip title="Download H5AD file">
                <a href={taxonomy.h5ad_url} target="_blank" rel="noopener noreferrer">
                    <IconButton aria-label="h5ad file">
                        <Package />
                    </IconButton>
                </a>
            </Tooltip>
            )}
            {taxonomy.author_orcid && (
            <Tooltip title="View author">
                <a href={taxonomy.author_orcid} target="_blank" rel="noopener noreferrer">
                    <IconButton aria-label="author">
                        <User />
                    </IconButton>
                </a>
            </Tooltip>
            )}
        </CardActions>
        </Card>
    );
}   