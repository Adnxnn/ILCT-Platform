import { Avatar, Box, Divider, Typography } from "@mui/material";

export default function Inbox({ messages }) {
    return (
        <>
            {messages.map((message) => (
                <Box key={message.id} sx={{ mb: 1, display: 'flex' }}>
                    <Avatar alt={message.email} src={message.profilePicture} sx={{ mr: 2, width: 24, height: 24 }}>
                        {message.email[0]}
                    </Avatar>
                    <Box>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                            {message.email}
                        </Typography>
                        <Typography variant="body1">{message.content}</Typography>
                    </Box>
                </Box>
            ))}
        </>
    )
}