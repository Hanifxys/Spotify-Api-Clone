const express = require('express');

const router = express.Router();

router.get('/error', (req, res) => {
   const html = `<html>
   <head>
       <style>
           body {
               font-family: Arial, sans-serif;
               background-color: #f2f2f2;
               height: 100vh;
               margin: 0;
               color: #333;
               display: flex;
               align-items: center;
               justify-content: center;
           }
   
           .error-container {
               background-color: #fff;
               padding: 20px;
               border-radius: 8px;
               box-shadow: 0 0 15px rgba(0,0,0,0.1);
               text-align: center;
           }
   
           .error-title {
               font-size: 24px;
               margin-bottom: 20px;
           }
   
           .error-message {
               font-size: 18px;
               color: #e74c3c; // Warna merah untuk pesan error
           }
       </style>
   </head>
   <body>
       <div class="error-container">
           <div class="error-title">Terjadi Kesalahan</div>
           <div class="error-message">Maaf, terjadi kesalahan saat menghubungkan ke Spotify. Silakan coba lagi nanti.</div>
       </div>
   </body>
   </html>   
    `;

    res.status(500).send(html);
});

module.exports = router;
