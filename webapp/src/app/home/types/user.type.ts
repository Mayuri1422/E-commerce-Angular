export interface user {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    pin: string;
    email: string;
    password: string;
}

export interface loginUser {
    email: string;
    password: string;
}

export interface loginToken {
    token: string;
    expiresInSeconds: number;
    user:loggedInUser;
}


export interface loggedInUser {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    pin: string;
    email:string;
}