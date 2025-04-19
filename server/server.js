import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(express.static(path.resolve("dist"))); 

// Telegram webhook
app.post("/send-message", async (req, res) => {
  const { name, contact, project, price, activeType } = req.body;

  const message = `📝 <b>Новая заявка с сайта</b>:

👤 <b>Имя:</b> ${name}
📞 <b>Способ связи:</b> ${activeType}
📧 <b>Контакт:</b> ${contact}
📝 <b>О проекте:</b> <i>${project}</i>
💰 <b>Бюджет:</b> ${price} Руб.`;

  try {
    const response = await fetch(`https://api.telegram.org/bot${process.env.TG_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: process.env.TG_CHAT_ID,
        text: message,
        parse_mode: "HTML",
      }),
    });

    const data = await response.json();
    res.status(200).json({ ok: true, result: data });
  } catch (err) {
    console.error("Ошибка при отправке в телеграм:", err);
    res.status(500).json({ ok: false, error: err });
  }
});

// SPA fallback (если нужен)
app.get("*", (req, res) => {
  res.sendFile(path.resolve("dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
