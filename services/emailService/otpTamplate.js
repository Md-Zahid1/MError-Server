export default {
    otpToUser: {
        subject: "Hello ✔",
        html: `<div style="font-family: Arial, sans-serif;border: 2px solid;width: 100%;padding: 4px;">
        <p>Hello <strong>{{name}}</strong>,</p>
      
        <p>Thanks for choosing MError. Your Verification Code for registration is <strong>{{OTP}}</strong>.</p>
      
        <p>Verification Code is valid for 30 Minutes.</p>
      
        <p>Best Regards,<br>Team MError </p>
        </div>`
    }
}