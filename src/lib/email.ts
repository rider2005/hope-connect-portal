
import type { Donor, Donation, Hospital, Receiver } from './db';

export const sendDonationConfirmation = (
  donor: Donor, 
  donation: Donation, 
  hospital: Hospital
): void => {
  console.log('-------------------------');
  console.log('EMAIL SENT: Donation Confirmation');
  console.log('To:', donor.email);
  console.log('Subject: HopeConnect - Your Organ Donation Registration');
  console.log('-------------------------');
  console.log(`Dear Donor,

Thank you for registering your intent to donate ${donation.organ}. Your contribution can save up to 8 lives.

Donation Details:
- Organ: ${donation.organ}
- Blood Group: ${donation.bloodGroup}
- Hospital: ${hospital.hospitalName}

We have scheduled your health check appointment on ${donation.appointmentDate}. 
Please visit ${hospital.hospitalName} for your medical evaluation.

Your unique Donor ID is: ${donation.id.substring(0, 8)}

The hospital will contact you with more details about the appointment.

Thank you for your compassion and generosity.

Regards,
HopeConnect Team`);
  console.log('-------------------------');
};

export const sendHealthCheckResultsEmail = (
  donor: Donor, 
  donation: Donation, 
  hospital: Hospital
): void => {
  console.log('-------------------------');
  console.log('EMAIL SENT: Health Check Results');
  console.log('To:', donor.email);
  console.log('Subject: HopeConnect - Your Health Check Results');
  console.log('-------------------------');
  console.log(`Dear Donor,

Your health check at ${hospital.hospitalName} has been completed.

Results:
- Donor Health: ${donation.donorHealth}
- Organ Health: ${donation.organHealth}

${donation.status === 'test_completed' 
  ? 'We are pleased to inform you that your health check was successful. Your information has been added to our donation registry.' 
  : 'Unfortunately, based on the health check results, we are unable to proceed with your donation at this time.'}

${donation.status === 'test_completed' 
  ? 'Thank you for your generosity. Your donation can save lives.' 
  : 'Thank you for your willingness to donate. If you have any questions, please contact the hospital.'}

Regards,
HopeConnect Team
In collaboration with ${hospital.hospitalName}`);
  console.log('-------------------------');
};

export const sendOrganMatchNotification = (
  hospital: Hospital,
  receiver: Receiver,
  matchedDonation: Donation
): void => {
  console.log('-------------------------');
  console.log('EMAIL SENT: Organ Match Notification');
  console.log('To:', hospital.email);
  console.log('Subject: HopeConnect - Organ Match Found');
  console.log('-------------------------');
  console.log(`Dear ${hospital.hospitalName},

Our AI matching system has found a potential match for your organ request.

Request Details:
- Receiver ID: ${receiver.receiverId}
- Needed Organ: ${receiver.neededOrgan}
- Blood Group: ${receiver.bloodGroup}

Matched Donation:
- Donor ID: ${matchedDonation.id.substring(0, 8)}
- Organ: ${matchedDonation.organ}
- Blood Group: ${matchedDonation.bloodGroup}

Please log in to your HopeConnect dashboard to review and confirm this match.

Thank you for your partnership in saving lives.

Regards,
HopeConnect AI Matching System`);
  console.log('-------------------------');
};

export const sendHopeTokensConfirmation = (
  donor: Donor,
  tokens: number
): void => {
  console.log('-------------------------');
  console.log('EMAIL SENT: Hope Tokens Confirmation');
  console.log('To:', donor.email);
  console.log('Subject: HopeConnect - Your Hope Tokens');
  console.log('-------------------------');
  console.log(`Dear Donor,

Thank you for your incredible gift of life through organ donation.

As a token of our appreciation and recognition of your selfless contribution, we have awarded you ${tokens} Hope Tokens.

These tokens can be redeemed for various benefits including:
- Health insurance discounts
- Tax benefits
- Community service recognition

Please log in to your HopeConnect account to view and redeem your Hope Tokens.

Thank you again for your life-saving contribution.

Regards,
HopeConnect Team`);
  console.log('-------------------------');
};

export const sendTransplantSuccessNotification = (
  hospital: Hospital,
  receiver: Receiver
): void => {
  console.log('-------------------------');
  console.log('EMAIL SENT: Transplant Success Notification');
  console.log('To:', hospital.email);
  console.log('Subject: HopeConnect - Transplant Success Recorded');
  console.log('-------------------------');
  console.log(`Dear ${hospital.hospitalName},

Thank you for updating the status of the transplant procedure.

The following transplant has been recorded as successful:
- Receiver ID: ${receiver.receiverId}
- Transplanted Organ: ${receiver.neededOrgan}

This update has been recorded in our blockchain registry, ensuring transparent and immutable record-keeping.

Thank you for your partnership in saving lives.

Regards,
HopeConnect System`);
  console.log('-------------------------');
};
