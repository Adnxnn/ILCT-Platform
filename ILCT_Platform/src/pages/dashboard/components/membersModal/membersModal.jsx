import { Avatar, Box, IconButton, List, ListItem, ListItemAvatar, ListItemText, Modal, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from "react";
import { useChannel } from "../context/channelContent";
import { channel_members } from "../../../../api/channelService";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


export default function MembersModal({ open, handleClose }) {
    const { selectedChannel } = useChannel()
    const [members, setMembers] = useState([])

    const handleLoadMembers = async () => setMembers(await channel_members(selectedChannel.id))

    useEffect(() => {
        handleLoadMembers()
    }, [open])
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 2,
                    borderRadius: 2,
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ pl: 2 }}>Channel Members</Typography>
                    <IconButton
                        onClick={handleClose}
                        size="small"
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>
                <List>
                    {
                        members.length > 0 ?
                            members.map(users => (
                                <ListItem key={users.id}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <AccountCircleIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={`${users.first_name} ${users.last_name}`} secondary={users.email} />
                                </ListItem>
                            ))
                            : "Loading ... "
                    }
                </List>
            </Box>
        </Modal>
    )
}