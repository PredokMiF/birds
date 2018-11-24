async function task({ pgAsync }) {
    await pgAsync.transaction(async (pgAsync) => {
        await pgAsync.query(`
            CREATE TABLE "user_roles" (
                user_id serial NOT NULL,
                role_name character varying(30),
                PRIMARY KEY (user_id),
                FOREIGN KEY (user_id) REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE CASCADE,
                FOREIGN KEY (role_name) REFERENCES roles(role) ON UPDATE CASCADE ON DELETE CASCADE
            );
        `)

        await pgAsync.query(`
            INSERT INTO "user_roles" (user_id, role_name) VALUES (1, 'admin');
        `)
    })
}

module.exports = task
