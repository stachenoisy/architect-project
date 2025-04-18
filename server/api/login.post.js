export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const storage = useStorage();

    // Kullanıcı verilerini storage'dan al
    const users = (await storage.getItem('users')) || [
        {
            email: "root@gmail.com",
            password: "123456",
            name: "root",
            isroot: true,
        }
    ];

    const user = users.find(
        (u) => u.email === body.email && u.password === body.password
    );

    if (!user) {
        return {
            statusCode: 401,
            message: 'Geçersiz e-posta veya şifre',
        };
    }

    return {
        statusCode: 200,
        message: 'Giriş başarılı',
        user: { name: user.name, email: user.email, isroot: user.isroot },
    };
});
