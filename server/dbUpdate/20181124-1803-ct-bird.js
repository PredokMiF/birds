async function task({ pgAsync }) {
    await pgAsync.transaction(async (pgAsync) => {
        await pgAsync.query(`
            CREATE TABLE "bird" (
                id serial UNIQUE NOT NULL,
                date_of_record date NOT NULL,
                latitude varchar(255) NOT NULL,
                longitude varchar(255) NOT NULL,
                bird_type varchar(255) NOT NULL,
                metal_ring_id varchar(255) NOT NULL,
                bird_gender varchar(255) NOT NULL,
                bird_age varchar(255) NOT NULL,
                circumstances text NOT NULL,
                approved boolean NOT NULL,
                user_id serial NOT NULL,
                approver_id numeric NOT NULL,
                PRIMARY KEY (id),
                FOREIGN KEY (user_id) REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE CASCADE
                FOREIGN KEY (approver_id) REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE CASCADE
            );
        `)
    })
}

module.exports = task
