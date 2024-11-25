import { sendMail } from "../mail/mailer"
import { welcomeEmail } from "../mail/welcomeMail"

export const checkout = async(req: any, res: any) => {
    const { email, totalCost } = req.body;
    const { cartList } = req.body;
    await sendMail(
        email,
        "Welcome Message",
        totalCost,
        // cartList
      )
  
}