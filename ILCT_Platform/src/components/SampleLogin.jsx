import { Button, Card, CardContent, Divider, Typography } from '@mui/material';
import GirlIcon from '@mui/icons-material/Girl';
import BoyIcon from '@mui/icons-material/Boy';

export default function SampleLogin({ setEmail, setPassword }) {
    const useAlexCredentials = () => {
        setEmail('alex42madison@gmail.com')
        setPassword('@l3x_p@55w0rd')
    }
    const useJulieCredentials = () => {
        setEmail('juliecat008@gmail.com')
        setPassword('jul13_p@55w0rd')
    }
    return (
        <Card sx={{ mt: 2 }}>
            <CardContent>
                <Typography variant="h6">Need test accounts?</Typography>
                <Typography variant='body1'>Login with the following accounts</Typography>
                <Divider sx={{ my: 2 }} />
                <Button variant='contained' color='secondary' startIcon={<GirlIcon />} sx={{ mr: 2 }} onClick={useJulieCredentials}>Julie</Button>
                <Button variant='contained' color='success' startIcon={<BoyIcon />} onClick={useAlexCredentials}>Alex</Button>
            </CardContent>
        </Card>
    )
}