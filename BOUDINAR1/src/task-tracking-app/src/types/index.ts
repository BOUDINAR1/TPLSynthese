export interface Activity {
    id: string;
    description: string;
    startTime: Date;
    elapsedTime: number; // in seconds
}

export interface ApiResponse {
    success: boolean;
    message: string;
    data?: Activity;
}