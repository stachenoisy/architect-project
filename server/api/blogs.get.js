export default defineEventHandler(async () => {
    const storage = useStorage();

    // Blog verilerini storage'dan al
    const blogs = (await storage.getItem('blogs')) || [];

    return {
        statusCode: 200,
        message: 'Bloglar başarıyla alındı',
        blogs,
    };
});
