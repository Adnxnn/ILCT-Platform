import { useEffect, useState } from "react"
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { Typography } from "@mui/material";

export default function PasswordConfirmation({ password, confirmPassword }) {
    const [confirmed, setConfirmed] = useState(false)
    useEffect(() => {
        if (password && confirmPassword) {
            if (password === confirmPassword) {
                setConfirmed(true)
            } else {
                setConfirmed(false)
            }
        }
    }, [password, confirmPassword])
    return (
        <>
            {
                password && confirmPassword ?
                    confirmed ?
                        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                            <CheckCircleIcon color="success" /> Password Confirmed
                        </Typography>
                        :
                        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                            <ErrorIcon color="error" /> Password Mismatched
                        </Typography>
                    : ""
            }
        </>
    )
}