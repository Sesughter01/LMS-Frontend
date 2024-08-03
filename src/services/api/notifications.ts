import { ApiRequestClient } from "@/shared/utils/api-client"


export const GetAllUnreadNotifications = async () : Promise<Notification[]> => {
    const response = await ApiRequestClient.get('/api/v1/notifications?isRead=false');

    return response.data;
}