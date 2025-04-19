import nodemailer from 'nodemailer';
import { ContactFormValues } from '@/lib/validators/contact';

/**
 * Sends a notification email when a new contact form is submitted
 * @param contact Contact form data
 */
export async function sendContactNotificationEmail(contact: ContactFormValues): Promise<void> {
  // Get email configuration from environment variables
  const emailServer = process.env.EMAIL_SERVER;
  const emailFrom = process.env.EMAIL_FROM;
  const adminEmail = process.env.ADMIN_EMAIL;
  
  // If email is not configured, log and throw error
  if (!emailServer || !emailFrom || !adminEmail) {
    const missingVars = [
      !emailServer ? 'EMAIL_SERVER' : null,
      !emailFrom ? 'EMAIL_FROM' : null,
      !adminEmail ? 'ADMIN_EMAIL' : null
    ].filter(Boolean).join(', ');
    
    const errorMessage = `Email notification not sent: Missing environment variables: ${missingVars}`;
    console.warn(errorMessage);
    throw new Error(errorMessage);
  }
  
  try {
    // Create transporter with explicit configuration
    const transporter = nodemailer.createTransport(emailServer, {
      // SMTP接続のタイムアウトを長めに設定
      connectionTimeout: 10000, // 10秒
      greetingTimeout: 10000,
      socketTimeout: 15000,
    });
    
    // Create email content
    const emailContent = `
      新しいお問い合わせが届きました。
      
      名前: ${contact.name}
      メールアドレス: ${contact.email}
      電話番号: ${contact.phone || 'なし'}
      
      メッセージ:
      ${contact.message}
      
      管理画面から確認してください。
    `;
    
    // Send email
    await transporter.sendMail({
      from: emailFrom,
      to: adminEmail,
      subject: '【With-you】新しいお問い合わせ',
      text: emailContent,
    });
    
    console.log('Contact notification email sent successfully');
  } catch (error) {
    console.error('Failed to send contact notification email:', error);
    throw new Error(`メール送信に失敗しました: ${error instanceof Error ? error.message : '不明なエラー'}`);
  }
}

/**
 * Sends an auto-reply email to the contact
 * @param contact Contact form data
 */
export async function sendContactAutoReplyEmail(contact: ContactFormValues): Promise<void> {
  // Get email configuration from environment variables
  const emailServer = process.env.EMAIL_SERVER;
  const emailFrom = process.env.EMAIL_FROM;
  
  // If email is not configured, log and throw error
  if (!emailServer || !emailFrom) {
    const missingVars = [
      !emailServer ? 'EMAIL_SERVER' : null,
      !emailFrom ? 'EMAIL_FROM' : null
    ].filter(Boolean).join(', ');
    
    const errorMessage = `Auto-reply email not sent: Missing environment variables: ${missingVars}`;
    console.warn(errorMessage);
    throw new Error(errorMessage);
  }
  
  try {
    // Create transporter with explicit configuration
    const transporter = nodemailer.createTransport(emailServer, {
      // SMTP接続のタイムアウトを長めに設定
      connectionTimeout: 10000, // 10秒
      greetingTimeout: 10000,
      socketTimeout: 15000,
    });
    
    // Create email content
    const emailContent = `
      ${contact.name} 様
      
      With-youへのお問い合わせありがとうございます。
      
      以下の内容でお問い合わせを受け付けました。
      担当者より2営業日以内にご連絡いたします。
      
      ■お問い合わせ内容
      名前: ${contact.name}
      メールアドレス: ${contact.email}
      電話番号: ${contact.phone || 'なし'}
      
      メッセージ:
      ${contact.message}
      
      ※このメールは自動送信されています。返信はできませんのでご了承ください。
      
      --
      With-you
      〒XXX-XXXX
      東京都XX区XXXXX
      XXXビル 3階
      TEL: 03-XXXX-XXXX
      Email: info@with-you-edu.jp
    `;
    
    // Send email
    await transporter.sendMail({
      from: emailFrom,
      to: contact.email,
      subject: '【With-you】お問い合わせありがとうございます',
      text: emailContent,
    });
    
    console.log('Contact auto-reply email sent successfully');
  } catch (error) {
    console.error('Failed to send contact auto-reply email:', error);
    throw new Error(`自動返信メール送信に失敗しました: ${error instanceof Error ? error.message : '不明なエラー'}`);
  }
}
