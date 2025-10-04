import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function sanitizeInput(input: string): string {
  return input.trim().slice(0, 1000); // Basic sanitization and length limit
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body as ContactFormData;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate email format
    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      message: sanitizeInput(message),
    };

    // Validate lengths
    if (sanitizedData.name.length < 2) {
      return NextResponse.json(
        { error: "Name must be at least 2 characters" },
        { status: 400 }
      );
    }

    if (sanitizedData.message.length < 10) {
      return NextResponse.json(
        { error: "Message must be at least 10 characters" },
        { status: 400 }
      );
    }

    // Send email via Resend
    try {
      await resend.emails.send({
        from: "contact@cyberdrew.dev",
        to: "drew@cyberdrew.dev",
        subject: `Contact form: ${sanitizedData.name}`,
        replyTo: sanitizedData.email,
        text: `From: ${sanitizedData.name} <${sanitizedData.email}>\n\n${sanitizedData.message}`,
      });
    } catch (emailError) {
      console.error("Failed to send email:", emailError);
      return NextResponse.json(
        { error: "Failed to send email. Please try again later." },
        { status: 500 }
      );
    }

    // Log successful submission for monitoring
    console.log("Contact form submission sent:", {
      name: sanitizedData.name,
      email: sanitizedData.email,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      { 
        success: true,
        message: "Message received successfully" 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
