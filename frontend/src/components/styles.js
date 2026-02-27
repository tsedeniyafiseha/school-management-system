import {
    TableCell,
    TableRow,
    styled,
    tableCellClasses,
    Drawer as MuiDrawer,
    AppBar as MuiAppBar,
} from "@mui/material";

const drawerWidth = 240

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
        color: '#ffffff',
        fontWeight: 600,
        fontSize: '0.85rem',
        letterSpacing: '0.025em',
        padding: '14px 16px',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        color: '#334155',
        padding: '12px 16px',
    },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: '#f8fafc',
    },
    '&:hover': {
        backgroundColor: 'rgba(37, 99, 235, 0.04)',
        transition: 'background-color 0.2s ease',
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
    transition: 'background-color 0.2s ease',
}));

export const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

export const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            background: '#fafbfc',
            borderRight: '1px solid rgba(0,0,0,0.06)',
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);
