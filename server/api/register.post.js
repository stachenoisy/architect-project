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

    const existingUser = users.find((u) => u.email === body.email);

    if (existingUser) {
        return {
            statusCode: 409,
            message: 'Bu e-posta adresi zaten kayıtlı',
        };
    }

    // Yeni kullanıcıyı ekle
    const newUser = {
        email: body.email,
        password: body.password,
        name: body.name,
    };
    users.push(newUser);

    // Kullanıcı verilerini storage'a kaydet
    await storage.setItem('users', users);

    return {
        statusCode: 201,
        message: 'Kayıt başarılı',
        user: { name: newUser.name, email: newUser.email },
    };
});
