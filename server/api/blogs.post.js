export default defineEventHandler(async (event) => {
    const body = await readMultipartFormData(event); // FormData ile gelen veriyi okuyun
    const storage = useStorage();

    // Debug: Gelen veriyi kontrol edin
    if (!body || body.length === 0) {
        return {
            statusCode: 400,
            message: 'Form verileri eksik',
        };
    }

    // Blog verilerini storage'dan al
    const blogs = (await storage.getItem('blogs')) || [];

    // Yeni blogu oluştur
    const newBlog = {
        id: blogs.length + 1,
        title: body.find((field) => field.name === 'title')?.data.toString() || '',
        summary: body.find((field) => field.name === 'summary')?.data.toString() || '',
        content: body.find((field) => field.name === 'content')?.data.toString() || '',
        banner: null,
        date: new Date().toISOString(),
        author: 'Mevcut Kullanıcı', // Kullanıcı oturumundan alınabilir
    };

    // Banner dosyasını işleyin
    const bannerField = body.find((field) => field.name === 'banner');
    if (bannerField && bannerField.filename) {
        const bannerPath = `/uploads/${bannerField.filename}`;
        await storage.setItem(bannerPath, bannerField.data); // Dosyayı kaydedin
        newBlog.banner = bannerPath;
    }

    // Yeni blogu listeye ekle
    blogs.push(newBlog);

    // Blog verilerini storage'a kaydet
    await storage.setItem('blogs', blogs);

    return {
        statusCode: 201,
        message: 'Blog başarıyla oluşturuldu',
        blog: newBlog,
    };
});
