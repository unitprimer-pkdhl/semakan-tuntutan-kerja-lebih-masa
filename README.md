# Semakan Tuntutan Kerja Lebih Masa & Elaun

Alat semakan tuntutan kerja lebih masa (ELM), OT extended hours, on-call (ETAP), Elaun Lokum dan Elaun Bersedia Atas Panggilan, untuk kegunaan Unit Primer, PKD Hulu Langat.

Laman:
- Tuntutan OT & Elaun: https://unitprimer-pkdhl.github.io/semakan-tuntutan-kerja-lebih-masa/
- Tuntutan Perjalanan (WP1.4, berkuat kuasa 1 Mei 2026; Semenanjung dan Sabah / Sarawak / Labuan): https://unitprimer-pkdhl.github.io/semakan-tuntutan-kerja-lebih-masa/perjalanan/

- Simulator Aliran Pesakit OPD (data simulasi, bukan data pesakit): https://unitprimer-pkdhl.github.io/aliran-pesakit/ (repo berasingan; alamat lama di sini dilencongkan)

- Satu fail HTML bagi setiap halaman (`index.html`, `perjalanan/index.html`), tiada pelayan. Isian disimpan dalam pelayar pengguna sahaja dan dipadam sendiri selepas 30 hari tanpa kemas kini.
- Semakan automatik bukan kelulusan rasmi. Dokumen dan kelayakan perlu disahkan oleh penyelia / Unit Kewangan.

## Aplikasi (PWA)
- `manifest.webmanifest`, `sw.js` dan `icons/`: laman boleh dipasang ke skrin utama telefon / komputer (butang **Pasang aplikasi** dalam pengenalan; iPhone guna Safari > Kongsi > Add to Home Screen).
- Halaman dimuat dari rangkaian dahulu supaya kadar terkini sentiasa dipakai; salinan simpanan hanya digunakan bila luar talian.
- Bila `sw.js` diubah, naikkan `VERSI` supaya salinan lama dibuang.

