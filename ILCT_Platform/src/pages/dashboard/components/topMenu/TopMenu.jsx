import SettingsIcon from '@mui/icons-material/Settings';
import { Divider, IconButton, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import DeleteChannelModal from '../deleteChannelModal/DeleteChannelModal';
import RenameChannelModal from '../renameChannelModal/RenameChannelModal';
import { deleteChannel, renameChannel } from '../../../../api/channelService';
import { useChannel } from '../context/channelContent';
import MembersModal from '../membersModal/membersModal';
import AboutModal from '../aboutModal/AboutModal';

export default function TopMenu() {
    const { selectedChannel, setSelectedChannel } = useChannel()
    const [anchorEl, setAnchorEl] = useState(null);
    const [deleteModalOpen, setDeleteModal] = useState(false)
    const [renameModalOpen, setRenameModal] = useState(false);
    const [membersModal, setMembersModal] = useState(false)
    const [aboutModal, setAboutModal] = useState(false)

    const open = Boolean(anchorEl);

    const handleDeleteToggle = () => {
        setAnchorEl(null)
        setDeleteModal(prev => !prev)
    }

    const handleDeleteChannel = async () => {
        if (await deleteChannel(selectedChannel.id)) {
            setSelectedChannel(null)
        } else {
            console.log("Error while deleting channel!")
        }
    };

    const handleAboutToggle = () => setAboutModal(prev => !prev)


    const handleOpen = () => {
        setAnchorEl(null)
        setRenameModal(true)
    }
    const handleClose = () => setRenameModal(false);
    const handleMembersModal = () => {
        setAnchorEl(null)
        setMembersModal(prev => !prev)
    };

    const handleRename = (newName, isPrivate) => renameChannel(selectedChannel.id, newName, isPrivate)

    return (
        <>
            <IconButton
                onClick={(event) => setAnchorEl(event.currentTarget)}
            >
                <SettingsIcon />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleOpen}>Setting</MenuItem>
                <MenuItem onClick={handleMembersModal}>Members</MenuItem>
                <Divider />
                <MenuItem onClick={handleDeleteToggle} sx={{ color: 'error.main' }}>
                    Delete
                </MenuItem>
                <MenuItem onClick={handleAboutToggle} sx={{ color: 'primary.main' }}>
                    About
                </MenuItem>
            </Menu>
            <DeleteChannelModal
                deleteModalOpen={deleteModalOpen}
                channelName={selectedChannel.name}
                onCancel={setDeleteModal}
                onDelete={handleDeleteChannel}
            />
            <RenameChannelModal
                open={renameModalOpen}
                handleClose={handleClose}
                handleRename={handleRename}
            />
            <MembersModal
                open={membersModal}
                handleClose={handleMembersModal}
            />
            <AboutModal
                open={aboutModal}
                handleClose={handleAboutToggle}
            />
        </>
    )
}