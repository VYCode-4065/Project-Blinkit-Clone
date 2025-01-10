import stripe from 'stripe';

const StripeValue =  stripe(process.env.STRIPE_SECRET_KEY)

export default StripeValue;