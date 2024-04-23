const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'ferma',
    password: '123',
    port: 5432,
    client_encoding: 'win866',
});

pool.connect((err) => {
    if (err) {
        console.error('Error connecting to PostgreSQL:', err);
    } else {
        console.log('Connected to PostgreSQL');
    }
});

app.get('/', (req, res) => {
    res.send('Answer_to_client');
});

app.get('/api/entry/:i', (req, res) => {
    const i = req.params.i;
    let str = "";
    if (i === '0') {
        str = `SELECT 
        CASE 
            WHEN EXTRACT(MONTH FROM Дата) IN (12, 1, 2) THEN 'Зима' 
            WHEN EXTRACT(MONTH FROM Дата) IN (3, 4, 5) THEN 'Весна' 
            WHEN EXTRACT(MONTH FROM Дата) IN (6, 7, 8) THEN 'Лето'
            WHEN EXTRACT(MONTH FROM Дата) IN (9, 10, 11) THEN 'Осень' 
        END AS Время_года, 
        STRING_AGG(CAST(Секция_Идентификатор AS TEXT), ',' ORDER BY Секция_Идентификатор) AS Секция_идентификатор,
        SUM(Сумма) AS Объем_затрат
    FROM
        Затраты
    WHERE
        Секция_Идентификатор BETWEEN 1 AND 20 
    GROUP BY
        Время_года;`;

    } else if (i === '1') {
        str = `SELECT
        Секция_Идентификатор,
        SUM(Сумма) AS Объем_затрат,
        STRING_AGG(CONCAT(Описание, ' (', Сумма, ')'), ', ') AS Описание_Затрат_и_Сумма
    FROM
        Затраты
    GROUP BY
        Секция_Идентификатор
    ORDER BY
    Секция_Идентификатор ASC;`;
    }
    else if (i == '2')
    {
        str = `select * from Затраты`;
    }
     pool.query(
            str,
            (err, result) => {
                if (err) {
                    console.error('Error executing query:', err);
                    res.status(500).json({ error: 'Internal Server Error' });
                } else {
                    res.json(result.rows);
                }
            }
        );
});


app.post('/api/items', (req, res) => {
    const { name, description } = req.body;

    pool.query(
        'INSERT INTO test (name, description) VALUES ($1, $2) RETURNING *',
        [name, description],
        (err, result) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                res.json(result.rows[0]);
            }
        }
    );
});

app.put('/api/items/:id', (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    pool.query(
        'UPDATE test SET name = $1, description = $2 WHERE id = $3 RETURNING *',
        [name, description, id],
        (err, result) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            } else if (result.rows.length === 0) {
                res.status(404).json({ error: 'Item not found' });
            } else {
                res.json(result.rows[0]);
            }
        }
    );
});

app.delete('/api/items/:id', (req, res) => {
    const { id } = req.params;

    pool.query(
        'DELETE FROM test WHERE id = $1 RETURNING *',
        [id],
        (err, result) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            } else if (result.rows.length === 0) {
                res.status(404).json({ error: 'Item not found' });
            } else {
                res.json(result.rows[0]);
            }
        }
    );
});