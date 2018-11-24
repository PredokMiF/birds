async function task({ pgAsync }) {
    await pgAsync.transaction(async (pgAsync) => {
        await pgAsync.query(`
            CREATE TABLE "user" (
                id serial NOT NULL,
                login character varying(255),
                pass character varying(255),
                PRIMARY KEY (id)
            );
        `)

        await pgAsync.query(`INSERT INTO "user" (login, pass) VALUES ('admin', 'admin');`);
        await pgAsync.query(`INSERT INTO "user" (login, pass) VALUES ('manager', 'manager');`);
        await pgAsync.query(`INSERT INTO "user" (login, pass) VALUES ('reporter', 'reporter');`)
    })
}

module.exports = task
