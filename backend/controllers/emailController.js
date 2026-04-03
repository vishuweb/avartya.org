const nodemailer = require("nodemailer");
const Volunteer = require("../models/Volunteer");

const sendBulkEmail = async (req, res) => {
  try {
    const { subject, body, filterCity, filterInterest } = req.body;

    if (!subject || !body) {
      return res.status(400).json({ message: "Subject and body are required" });
    }

    // Build volunteer filter
    const filter = { status: "active" };
    if (filterCity) filter.city = new RegExp(filterCity, "i");
    if (filterInterest) filter.motivation = filterInterest;

    const volunteers = await Volunteer.find(filter).select("email name");

    if (!volunteers.length) {
      return res.status(404).json({ message: "No matching volunteers found" });
    }

    // Configure transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send emails in batches to avoid rate limits
    const batchSize = 10;
    let sent = 0;
    let failed = 0;
    const errors = [];

    for (let i = 0; i < volunteers.length; i += batchSize) {
      const batch = volunteers.slice(i, i + batchSize);

      await Promise.allSettled(
        batch.map(async (volunteer) => {
          try {
            await transporter.sendMail({
              from: process.env.EMAIL_FROM,
              to: volunteer.email,
              subject,
              html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                  <div style="background: #2d6a4f; padding: 20px; text-align: center;">
                    <h2 style="color: white; margin: 0;">Avartya Foundation</h2>
                  </div>
                  <div style="padding: 30px; background: #f9f9f9;">
                    <p>Dear ${volunteer.name},</p>
                    <div>${body}</div>
                    <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;" />
                    <p style="font-size: 12px; color: #888;">
                      You received this email because you are a registered volunteer of Avartya Foundation.
                    </p>
                  </div>
                </div>
              `,
            });
            sent++;
          } catch (err) {
            failed++;
            errors.push({ email: volunteer.email, error: err.message });
          }
        })
      );
    }

    console.log(`[Email Bulk] Sent: ${sent}, Failed: ${failed}`);

    res.json({
      message: `Emails sent: ${sent} succeeded, ${failed} failed`,
      sent,
      failed,
      totalTargeted: volunteers.length,
    });
  } catch (error) {
    console.error("[Email Controller Error]", error.message);
    res.status(500).json({ message: "Server error sending emails" });
  }
};

module.exports = { sendBulkEmail };
