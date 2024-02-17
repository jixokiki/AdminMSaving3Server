const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Bekasibarat12',
  database: 'formulir',
});

db.connect((err) => {
  if (err) {
    console.error('Koneksi ke database gagal: ' + err.stack);
    return;
  }
  console.log('Terhubung ke database dengan ID ' + db.threadId);
});

app.post('/formulir', (req, res) => {
  const {
    name,
    birthdate,
    address,
    salaryRange,
    bankName,
    accountNumber,
    accountHolderName,
  } = req.body;

  const sql = `
    INSERT INTO persetujuan (name, birthdate, address, salaryRange, bankName, accountNumber, accountHolderName)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [name, birthdate, address, salaryRange, bankName, accountNumber, accountHolderName], (err) => {
    if (err) {
      console.error('Gagal menyimpan persetujuan ke database: ' + err.stack);
      return res.status(500).json({ error: 'Gagal menyimpan persetujuan ke database.' });
    }

    res.status(201).json({ message: 'Persetujuan berhasil disimpan.' });
  });
});

app.get('/formulir', (req, res) => {
  const sql = 'SELECT * FROM persetujuan';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Gagal mengambil data dari database: ' + err.stack);
      return res.status(500).json({ error: 'Gagal mengambil data dari database.' });
    }

    res.status(200).json(results);
  });
});


app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
