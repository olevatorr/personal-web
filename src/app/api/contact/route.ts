import nodemailer from 'nodemailer'
import { NextRequest, NextResponse } from 'next/server'

interface ContactFormData {
  name: string
  email: string
  message: string
}

interface ApiResponse {
  message?: string
  error?: string
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse>> {
  try {
    const { name, email, message }: ContactFormData = await request.json()

    // 驗證必需字段
    if (!name || !email || !message) {
      return NextResponse.json({ error: '所有欄位都是必需的' }, { status: 400 })
    }

    // 創建郵件傳送器
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS // 使用 App Password
      }
    })

    // 郵件內容
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // 發送到自己的郵箱
      subject: `個人網站聯絡表單：${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #4F46E5; padding-bottom: 10px;">
            新的聯絡表單訊息
          </h2>
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0 0 10px 0;"><strong>姓名：</strong> ${name}</p>
            <p style="margin: 0 0 10px 0;"><strong>Email：</strong> ${email}</p>
          </div>
          <div style="background-color: #fff; padding: 20px; border-left: 4px solid #4F46E5; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">訊息內容：</h3>
            <p style="color: #666; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #9ca3af;">
            <p>此訊息來自您的個人網站聯絡表單</p>
          </div>
        </div>
      `,
      text: `
        新的聯絡表單訊息
        
        姓名：${name}
        Email：${email}
        
        訊息內容：
        ${message}
        
        ---
        此訊息來自您的個人網站聯絡表單
      `
    }

    // 發送郵件
    await transporter.sendMail(mailOptions)

    return NextResponse.json({ message: '郵件發送成功' }, { status: 200 })
  } catch (error) {
    console.error('郵件發送失敗:', error)
    return NextResponse.json(
      { error: '郵件發送失敗，請稍後再試' },
      { status: 500 }
    )
  }
}

// 處理其他 HTTP 方法
export async function GET(): Promise<NextResponse<ApiResponse>> {
  return NextResponse.json({ error: '方法不允許' }, { status: 405 })
}
