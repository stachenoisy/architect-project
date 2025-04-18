export default defineEventHandler(async (event) => {
    const { id } = event.context.params;
    const storage = useStorage();

    // Blog verilerini storage'dan al
    const blogs = (await storage.getItem('blogs')) || [];

    // ID'ye göre blogu bul
    const blog = blogs.find((b) => b.id === parseInt(id));

    if (!blog) {
        return {
            statusCode: 404,
            message: 'Blog bulunamadı',
        };
    }

    return {
        statusCode: 200,
        message: 'Blog başarıyla alındı',
        blog,
    };
});
