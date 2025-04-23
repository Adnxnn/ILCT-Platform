import { LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";

export default function PasswordStrength({ password }) {
    const [strength, setStrength] = useState(0);

    useEffect(() => {
        const score = Math.min(
            (password.length >= 12 ? 40 : password.length * 2.5) +
            (/\d/.test(password) ? 20 : 0) +
            (/[a-z]/.test(password) && /[A-Z]/.test(password) ? 20 : 0) +
            (/[@$!%*?&#]/.test(password) ? 20 : 0),
            100
        );
        setStrength(score);
    }, [password]);

    return (
        password && <LinearProgress variant="determinate" value={strength > 60 ? 100 : strength} color={strength <= 30 ? 'error' : strength <= 60 ? 'warning' : 'success'} />
    );
}
