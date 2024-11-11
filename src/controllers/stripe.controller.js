
const Stripe = require("stripe");
const stripe = Stripe("sk_test_51E2DZkBjtrgHLEWNXTM2BgmY62nG5IOQ66sKz52ndmpdTsrF9OdddY4ftQf9DNiyJ6tPFwXRSXiDKLSIwf5uhHq000quyy0a4N"); // Replace with your Secret Key

const paymentIntent = async (req, res) => {
    try {

        const customerAddress = {
            "line1": "123 Main St",
            "line2": "",
            "city": "Mumbai",
            "state": "MH",
            "postal_code": "400001",
            "country": "IN"
        }
        // Check if amount is present
        if (!req.body.amount) {
            return res.status(400).json({ error: 'Amount is required.' });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: req.body.amount * 100,
            currency: 'eur',
            payment_method_types: ['card'],
            description: 'Export of electronic goods - Model XYZ123.',
            shipping: {
                name: "John Doe",
                address: {
                    line1: customerAddress.line1,
                    line2: customerAddress.line2 || '',
                    city: customerAddress.city,
                    state: customerAddress.state,
                    postal_code: customerAddress.postal_code,
                    country: customerAddress.country,
                },
            },
        });


        const confirmIntent = await stripe.paymentIntents.confirm(paymentIntent.id, {
            payment_method: "pm_card_visa"
        });

        res.json({ success: true, confirmIntent });

       // res.json({ clientSecret: paymentIntent.client_secret });


    } catch (error) {
        // Enhanced error logging
        console.error("Error creating payment intent:", error);
        res.status(500).json({ error: error.message });
    }
  };

  module.exports = {
    paymentIntent
  };