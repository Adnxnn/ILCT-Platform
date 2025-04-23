import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useChannel } from '../../context/channelContent';
import { load_session } from '../../../../../api/jamboardService';
import socket from '../../../../../utils/socket';

export default function LoadSessionButton({ setCode, disabled }) {
    const { selectedChannel } = useChannel()
    const [sessions, setSessions] = React.useState([])
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (session) => {
        if (session.code) setCode(session.code)
        socket.emit('code_change', { channel_id: selectedChannel.id, code_update: session.code });
        setAnchorEl(null);
    };

    const handleLoadSessions = async () => {
        setSessions(await load_session(selectedChannel.id))
    }

    React.useEffect(() => {
        handleLoadSessions()
    }, [])

    return (
        <>
            <Button
                id="demo-positioned-button"
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                disabled={!sessions.length || disabled}
            >
                Load session
            </Button>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                {
                    sessions.map(session => <MenuItem onClick={() => handleClose(session)} key={session.id}>{session.name}</MenuItem>)
                }
            </Menu>
        </>
    );
}
