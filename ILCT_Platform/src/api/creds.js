export const getCreds = () => {
    const user_id = localStorage.getItem('user_id');
    const user_email = localStorage.getItem('user_email');
    const token = localStorage.getItem('token');

    return { user_id, user_email, token };
};