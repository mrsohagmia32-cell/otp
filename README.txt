MiahSMS Telegram Bot - Fixed Package

Fixed:
- Corrected the unterminated RANGE_GROUP_LINK string in main.py.
- No other application logic was intentionally changed.
- Existing BOT_TOKEN, API_KEY, ADMINS and OTP_GROUP_ID values remain embedded as supplied.

Install:
pip install -r requirements.txt

Run:
python main.py

Security note: the bot token and API key are credentials. Do not publish this ZIP or commit it to a public repository. If these credentials have been exposed publicly, rotate/revoke them before production use.
