import bridge from "@vkontakte/vk-bridge"

export const getUserName = async (): Promise<string> => {
    try {
        const userInfo = await bridge.send('VKWebAppGetUserInfo');

        if (userInfo.id) return `${userInfo.first_name} ${userInfo.last_name}`;
        else throw new Error("Отсуствует id");
    } catch(e) {
        throw e;
    };
};