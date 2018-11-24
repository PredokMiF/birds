async function task({ pgAsync }) {
    await pgAsync.transaction(async (pgAsync) => {
        await pgAsync.query(`
            CREATE TABLE "roles" (
                role character varying(30),
                PRIMARY KEY (role)
            );
        `)

        await pgAsync.query(`
            INSERT INTO "roles" (role) VALUES ('admin');
            INSERT INTO "roles" (role) VALUES ('user');
        `)
    })
}

module.exports = task
