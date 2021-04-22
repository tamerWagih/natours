import axios from 'axios';
import { showAlert } from './alerts';

export const bookTour = async (tourId) => {
  const stripe = Stripe(
    'pk_test_51IP61eBvvxnof5LoS4NOodpuQmYYzb1mk0vfIokQUR8aNuHu29FTvK5nqvUYP3xPAvmioa1vIU6ikRk0AhiOInHT000gGQCZNI'
  ); // <==== PUT THE VARIABLE HERE

  try {
    // 1. Get checkout session from the API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    console.log(session);

    // 2. Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
