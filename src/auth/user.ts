import type { User } from '../types';
import http from '../utilities/http';

export const fetchUser = async () => {
    try {
        const response = await http.get('/user');
        console.log(response);
        const user = response.data.user;
        if (validateUser(user)) {
            return user;
        }
    } catch (exception: any) {
        if (exception.response.status === 401) {
            return null;
        }
    }
};

const validateUser = (data: unknown): data is User => {
    return true;
};
