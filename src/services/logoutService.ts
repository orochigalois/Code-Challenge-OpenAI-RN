// Mock logout function (can replace with actual API call in the future)
export const mockLogout = async (): Promise<null> => {
    // Implement logout logic
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(null);
        }, 500); // Simulating async logout
    });
};