// We are using mock authentication function (can replace with actual API call in the future)
export const mockAuthenticate = async (username: string, password: string): Promise<string> => {
    // Implement authentication logic
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (username === 'Caremaster' && password === 'caremaster') {
                resolve('mockAuthTokenxxxxxx');
            } else {
                reject('Invalid credentials');
            }
        }, 1000); // Simulating async API call
    });
};