
import { Donor, Donation, Hospital } from './db';
import { toast } from '@/hooks/use-toast';

interface EmailProps {
  to: string;
  subject: string;
  body: string;
}

// Function to simulate sending an email
export const sendEmail = ({ to, subject, body }: EmailProps) => {
  console.log(`Simulating email to: ${to}`);
  console.log(`Subject: ${subject}`);
  console.log(`Body: ${body}`);
  
  // Show a toast notification to simulate email being sent
  toast({
    title: "Email Sent",
    description: `An email has been sent to ${to}`,
  });
  
  return true;
};

// Send donation confirmation email
export const sendDonationConfirmation = (
  donor: Donor, 
  donation: Donation, 
  hospital: Hospital
) => {
  const { organ, bloodGroup, appointmentDate } = donation;
  const emailBody = `
    Dear ${donor.name || donor.email},

    Thank you for your generous pledge to donate ${organ}. Your donation can save lives and make a significant impact.

    Donation Details:
    - Organ: ${organ}
    - Blood Group: ${bloodGroup}
    - Hospital: ${hospital.hospitalName}
    - Donor ID: ${donation.donorId}

    We have scheduled a health check appointment for you on ${appointmentDate} at ${hospital.hospitalName}.
    Please ensure you arrive 15 minutes before your scheduled appointment.

    If you need to reschedule, please contact us as soon as possible.

    Thank you again for your generosity.

    Warm regards,
    The HopeConnect Team
  `;

  return sendEmail({
    to: donor.email,
    subject: "Thank You for Your Organ Donation Pledge",
    body: emailBody
  });
};

// Send health check results email
export const sendHealthCheckResultsEmail = (
  donor: Donor,
  donation: Donation,
  hospital: Hospital
) => {
  const { organ, donorHealth, organHealth } = donation;
  
  const emailBody = `
    Dear ${donor.name || donor.email},

    Your health check results from ${hospital.hospitalName} are now available.

    Results Summary:
    - Overall Health: ${donorHealth}
    - ${organ} Health: ${organHealth}
    
    Please log in to your HopeConnect account to view more details.

    Thank you for your commitment to organ donation.

    Warm regards,
    The HopeConnect Team
  `;

  return sendEmail({
    to: donor.email,
    subject: "Your Health Check Results",
    body: emailBody
  });
};
