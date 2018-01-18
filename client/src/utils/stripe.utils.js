import Stripe from "tipsi-stripe";
import config from "../../config";

const initializeStripe = () => {
    const { STRIPE_PUBLISHABLE_KEY: publishableKey } = config;
    Stripe.init({
        publishableKey
    });
};

export const stripeUtils = {
    initializeStripe
};