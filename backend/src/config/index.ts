require('dotenv').config()

export const config = {
  webeorToken: process.env.WEBEOR_BOT_TOKEN || '',
  adminId: process.env.ADMIN_ID || '',
}